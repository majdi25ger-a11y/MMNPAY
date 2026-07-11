import { useLocation, useParams } from "wouter";
import Sidebar from "@/components/Sidebar";
import InvoiceForm, { InvoiceFormValues } from "@/components/InvoiceForm";

function pick(...values: any[]) {

  for (const value of values) {

    if (value !== undefined && value !== null && value !== "") {
      return value;
    }

  }

  return undefined;

}

function getInvoiceNumber(item: any): string {

  return pick(item.invoiceNumber, item.number, item.id) ?? "";

}

export default function EditInvoice() {

  const { invoiceNumber } = useParams();
  const [, navigate] = useLocation();

  const invoices = JSON.parse(
    localStorage.getItem("invoices") || "[]"
  );

  const rawInvoices = Array.isArray(invoices) ? invoices : [];

  const invoiceIndex = rawInvoices.findIndex(
    (item: any) => String(getInvoiceNumber(item)) === String(invoiceNumber)
  );

  const invoice = invoiceIndex >= 0 ? rawInvoices[invoiceIndex] : null;

  function cancel() {
    navigate("/invoices");
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
    customerName: pick(invoice.customerName, invoice.customer, invoice.merchant, ""),
    email: pick(invoice.email, ""),
    amount: String(pick(invoice.amount, invoice.total, "")),
    currency: pick(invoice.currency, "EUR"),
    description: pick(invoice.description, ""),
    dueDate: pick(invoice.dueDate, invoice.due_date, invoice.due, "")
  };

  function saveInvoice(values: InvoiceFormValues) {

    const updatedInvoices = rawInvoices.map((item: any, index: number) => {

      if (index !== invoiceIndex) {
        return item;
      }

      return {
        ...item,
        customerName: values.customerName,
        email: values.email,
        amount: values.amount,
        currency: values.currency,
        description: values.description,
        dueDate: values.dueDate
      };

    });

    localStorage.setItem(
      "invoices",
      JSON.stringify(updatedInvoices)
    );

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
          Update the details for {getInvoiceNumber(invoice)}.
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
