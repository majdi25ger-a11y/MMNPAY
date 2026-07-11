import { useLocation } from "wouter";
import Sidebar from "@/components/Sidebar";
import InvoiceForm, { InvoiceFormValues } from "@/components/InvoiceForm";

export default function CreateInvoice() {

  const [, navigate] = useLocation();

  function saveInvoice(values: InvoiceFormValues) {

    const invoiceNumber = "INV" + Date.now();

    const invoice = {
      invoiceNumber,
      customerName: values.customerName,
      email: values.email,
      amount: values.amount,
      currency: values.currency,
      description: values.description,
      dueDate: values.dueDate,
      status: "Draft",
      createdAt: new Date().toLocaleString()
    };

    const invoices = JSON.parse(
      localStorage.getItem("invoices") || "[]"
    );

    invoices.unshift(invoice);

    localStorage.setItem(
      "invoices",
      JSON.stringify(invoices)
    );

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
