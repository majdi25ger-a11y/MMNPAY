import { useLocation } from "wouter";
import Sidebar from "@/components/Sidebar";
import InvoiceForm, { InvoiceFormValues } from "@/components/InvoiceForm";
import * as authRepository from "@/lib/repositories/authRepository";
import * as organizationRepository from "@/lib/repositories/organizationRepository";
import * as invoiceRepository from "@/lib/repositories/invoiceRepository";

export default function CreateInvoice() {

  const [, navigate] = useLocation();

  async function saveInvoice(values: InvoiceFormValues) {

    const currentUser = await authRepository.getCurrentUser();

    if (!currentUser) {
      alert("You must be signed in to create an invoice.");
      return;
    }

    const organization = await organizationRepository.getOrganizationByUser(
      currentUser.id
    );

    if (!organization) {
      alert("You must create an organization before adding invoices.");
      return;
    }

    const invoiceNumber = "INV" + Date.now();

    await invoiceRepository.createInvoice({
      organization_id: organization.id,
      invoice_number: invoiceNumber,
      customer_name: values.customerName,
      email: values.email,
      amount: Number(values.amount) || 0,
      currency: values.currency,
      description: values.description,
      due_date: values.dueDate,
      status: "Draft"
    });

    navigate("/invoices");

  }

  function cancel() {
    navigate("/invoices");
  }

  return (

    <div className="flex min-h-screen bg-[#f6f9fc]">

      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold text-[#0a2540]">
          Create Invoice
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          Bill a customer and track the payment status.
        </p>

        <InvoiceForm
          onSubmit={saveInvoice}
          submitLabel="Save Invoice"
          onCancel={cancel}
        />

      </main>

    </div>

  );

}
