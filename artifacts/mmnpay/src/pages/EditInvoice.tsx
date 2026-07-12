import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import Sidebar from "@/components/Sidebar";
import InvoiceForm, { InvoiceFormValues } from "@/components/InvoiceForm";
import * as authRepository from "@/lib/repositories/authRepository";
import * as organizationRepository from "@/lib/repositories/organizationRepository";
import * as invoiceRepository from "@/lib/repositories/invoiceRepository";
import type { Invoice } from "@/lib/repositories/invoiceRepository";

export default function EditInvoice() {

  const { invoiceNumber } = useParams();
  const [, navigate] = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const [invoice, setInvoice] = useState<Invoice | null>(null);

  useEffect(() => {

    let isMounted = true;

    async function load() {

      const currentUser = await authRepository.getCurrentUser();

      if (!currentUser) {
        if (isMounted) {
          setIsLoading(false);
        }
        return;
      }

      const organization = await organizationRepository.getOrganizationByUser(
        currentUser.id
      );

      if (!organization || !invoiceNumber) {
        if (isMounted) {
          setIsLoading(false);
        }
        return;
      }

      const found = await invoiceRepository.getInvoiceByNumber(
        organization.id,
        invoiceNumber
      );

      if (isMounted) {
        setInvoice(found);
        setIsLoading(false);
      }

    }

    load();

    return () => {
      isMounted = false;
    };

  }, [invoiceNumber]);

  function cancel() {
    navigate("/invoices");
  }

  if (isLoading) {

    return (

      <div className="flex min-h-screen bg-[#f6f9fc]">

        <Sidebar />

        <main className="flex-1 p-8">

          <div className="bg-white rounded-2xl shadow p-10 text-center max-w-2xl">

            <p className="text-gray-500">
              Loading invoice...
            </p>

          </div>

        </main>

      </div>

    );

  }

  if (!invoice) {

    return (

      <div className="flex min-h-screen bg-[#f6f9fc]">

        <Sidebar />

        <main className="flex-1 p-8">

          <div className="bg-white rounded-2xl shadow p-10 text-center max-w-2xl">

            <h1 className="text-2xl font-bold text-red-600 mb-3">
              Invoice Not Found
            </h1>

            <p className="text-gray-500 mb-6">
              This invoice does not exist.
            </p>

            <button
              onClick={cancel}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold"
            >
              Back to Invoices
            </button>

          </div>

        </main>

      </div>

    );

  }

  const initialValues: Partial<InvoiceFormValues> = {
    customerName: invoice.customer_name || "",
    email: invoice.email || "",
    amount: String(invoice.amount ?? ""),
    currency: invoice.currency || "EUR",
    description: invoice.description || "",
    dueDate: invoice.due_date || ""
  };

  async function saveInvoice(values: InvoiceFormValues) {

    if (!invoice) {
      return;
    }

    await invoiceRepository.updateInvoice(invoice.id, {
      customer_name: values.customerName,
      email: values.email,
      amount: Number(values.amount) || 0,
      currency: values.currency,
      description: values.description,
      due_date: values.dueDate
    });

    navigate("/invoices");

  }

  return (

    <div className="flex min-h-screen bg-[#f6f9fc]">

      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold text-[#0a2540]">
          Edit Invoice
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          Update the details for {invoice.invoice_number}.
        </p>

        <InvoiceForm
          initialValues={initialValues}
          onSubmit={saveInvoice}
          submitLabel="Save Changes"
          onCancel={cancel}
        />

      </main>

    </div>

  );

}
