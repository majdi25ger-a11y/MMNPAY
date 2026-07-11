import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import Sidebar from "@/components/Sidebar";

type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Overdue";

interface Invoice {
  invoiceNumber: string;
  customerName: string;
  amount: number;
  currency: string;
  description: string;
  status: InvoiceStatus;
  dueDate: string;
}

const STATUS_STYLES: Record<string, string> = {
  Draft: "bg-gray-100 text-gray-600",
  Sent: "bg-blue-100 text-blue-700",
  Paid: "bg-green-100 text-green-700",
  Overdue: "bg-red-100 text-red-700"
};

function pick(...values: any[]) {

  for (const value of values) {

    if (value !== undefined && value !== null && value !== "") {
      return value;
    }

  }

  return undefined;

}

function normalizeInvoice(item: any): Invoice {

  return {
    invoiceNumber: pick(item.invoiceNumber, item.number, item.id) ?? "",
    customerName: pick(item.customerName, item.customer, item.merchant) ?? "",
    amount: Number(pick(item.amount, item.total, 0)),
    currency: pick(item.currency, "EUR"),
    description: pick(item.description, "") ?? "",
    status: (pick(item.status, "Draft") as InvoiceStatus),
    dueDate: pick(item.dueDate, item.due_date, item.due) ?? ""
  };

}

export default function Invoices() {

  const [, navigate] = useLocation();

  const [search, setSearch] = useState("");

  const [rawInvoices, setRawInvoices] = useState<any[]>(() => {

    const raw = JSON.parse(
      localStorage.getItem("invoices") || "[]"
    );

    return Array.isArray(raw) ? raw : [];

  });

  const [paymentLinks, setPaymentLinks] = useState<Record<string, string>>({});

  const invoices: Invoice[] = useMemo(() => {

    return rawInvoices.map((item: any) => normalizeInvoice(item));

  }, [rawInvoices]);

  const filteredInvoices = useMemo(() => {

    const query = search.toLowerCase();

    return invoices.filter((invoice) =>

      invoice.invoiceNumber.toLowerCase().includes(query) ||
      invoice.customerName.toLowerCase().includes(query)

    );

  }, [invoices, search]);

  function generatePaymentLink(invoice: Invoice, index: number) {

    const paymentId = "MMN" + Date.now();

    const payment = {
      id: paymentId,
      invoiceId: invoice.invoiceNumber,
      merchant: invoice.customerName,
      amount: invoice.amount,
      description: invoice.description,
      currency: invoice.currency,
      status: "Active",
      createdAt: new Date().toLocaleString()
    };

    localStorage.setItem(
      "payment_" + paymentId,
      JSON.stringify(payment)
    );

    const payments = JSON.parse(
      localStorage.getItem("payments") || "[]"
    );

    payments.push(payment);

    localStorage.setItem(
      "payments",
      JSON.stringify(payments)
    );

    const updatedRawInvoices = rawInvoices.map((item, i) => {

      if (i !== index) {
        return item;
      }

      return {
        ...item,
        status: "Sent"
      };

    });

    setRawInvoices(updatedRawInvoices);

    localStorage.setItem(
      "invoices",
      JSON.stringify(updatedRawInvoices)
    );

    setPaymentLinks((prev) => ({
      ...prev,
      [invoice.invoiceNumber]: `${window.location.origin}/pay/${paymentId}`
    }));

  }

  function editInvoice(invoice: Invoice) {

    navigate(`/invoices/edit/${invoice.invoiceNumber}`);

  }

  function deleteInvoice(index: number) {

    const confirmed = window.confirm(
      "Are you sure you want to delete this invoice?"
    );

    if (!confirmed) {
      return;
    }

    const updatedRawInvoices = rawInvoices.filter((_, i) => i !== index);

    setRawInvoices(updatedRawInvoices);

    localStorage.setItem(
      "invoices",
      JSON.stringify(updatedRawInvoices)
    );

  }

  return (

    <div className="flex min-h-screen bg-[#f6f9fc]">

      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold text-[#0a2540]">
          Invoices
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          Track invoices sent to your customers.
        </p>

        <div className="bg-white rounded-2xl shadow p-8">

          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

            <h2 className="text-2xl font-bold">
              All Invoices
            </h2>

            <div className="flex flex-col md:flex-row gap-3">

              <input
                className="border rounded-xl p-3 md:w-80"
                placeholder="Search invoice or customer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button
                onClick={() => navigate("/invoices/create")}
                className="bg-[#635bff] text-white px-5 py-3 rounded-xl font-bold whitespace-nowrap"
              >
                + New Invoice
              </button>

            </div>

          </div>

          {invoices.length === 0 ? (

            <div className="text-center py-16">

              <div className="w-16 h-16 rounded-full bg-[#f6f9fc] flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🧾</span>
              </div>

              <h3 className="text-lg font-bold text-[#0a2540]">
                No invoices yet
              </h3>

              <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                Invoices you create for your customers will show up here
                once they exist.
              </p>

            </div>

          ) : filteredInvoices.length === 0 ? (

            <div className="text-center py-12">

              <p className="text-gray-500">
                No invoices match your search.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

              {filteredInvoices.map((invoice) => {

                const rawIndex = rawInvoices.findIndex(
                  (item) => normalizeInvoice(item).invoiceNumber === invoice.invoiceNumber
                );

                const link = paymentLinks[invoice.invoiceNumber];

                return (

                  <div
                    key={invoice.invoiceNumber || rawIndex}
                    className="border rounded-2xl p-5 flex flex-col gap-3"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                          Invoice
                        </p>

                        <h3 className="font-bold text-lg break-all">
                          {invoice.invoiceNumber || "—"}
                        </h3>

                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${
                          STATUS_STYLES[invoice.status] || STATUS_STYLES.Draft
                        }`}
                      >
                        {invoice.status}
                      </span>

                    </div>

                    <div>

                      <p className="text-xs text-gray-400 uppercase tracking-wide">
                        Customer
                      </p>

                      <p className="font-semibold">
                        {invoice.customerName || "Unknown"}
                      </p>

                    </div>

                    <div className="flex items-center justify-between mt-2 pt-3 border-t">

                      <div>

                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                          Amount
                        </p>

                        <p className="font-bold text-xl">
                          {invoice.amount.toFixed(2)} {invoice.currency}
                        </p>

                      </div>

                      <div className="text-right">

                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                          Due Date
                        </p>

                        <p className="font-semibold">
                          {invoice.dueDate || "—"}
                        </p>

                      </div>

                    </div>

                    {invoice.status === "Draft" && (

                      <button
                        onClick={() => generatePaymentLink(invoice, rawIndex)}
                        className="w-full bg-[#635bff] text-white py-3 rounded-xl font-bold mt-1"
                      >
                        Generate Payment Link
                      </button>

                    )}

                    {link && (

                      <div className="bg-gray-100 rounded-xl p-3 mt-1">

                        <p className="text-xs text-gray-500 mb-1">
                          Payment Link
                        </p>

                        <div className="flex items-center justify-between gap-3">

                          <p className="text-sm font-semibold break-all">
                            {link}
                          </p>

                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(link);
                              alert("Link copied!");
                            }}
                            className="text-[#635bff] font-bold text-sm whitespace-nowrap"
                          >
                            Copy
                          </button>

                        </div>

                      </div>

                    )}

                    <div className="flex gap-3 mt-1 pt-3 border-t">

                      <button
                        onClick={() => editInvoice(invoice)}
                        className="flex-1 border border-gray-200 text-[#0a2540] py-2 rounded-xl font-bold"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteInvoice(rawIndex)}
                        className="flex-1 border border-red-200 text-red-600 py-2 rounded-xl font-bold"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                );

              })}

            </div>

          )}

        </div>

      </main>

    </div>

  );

}
