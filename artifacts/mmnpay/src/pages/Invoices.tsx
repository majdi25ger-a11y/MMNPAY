import { useMemo, useState } from "react";
import Sidebar from "@/components/Sidebar";

type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Overdue";

interface Invoice {
  invoiceNumber: string;
  customerName: string;
  amount: number;
  currency: string;
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

export default function Invoices() {

  const [search, setSearch] = useState("");

  const invoices: Invoice[] = useMemo(() => {

    const raw = JSON.parse(
      localStorage.getItem("invoices") || "[]"
    );

    if (!Array.isArray(raw)) {
      return [];
    }

    return raw.map((item: any) => ({
      invoiceNumber: pick(item.invoiceNumber, item.number, item.id) ?? "",
      customerName: pick(item.customerName, item.customer, item.merchant) ?? "",
      amount: Number(pick(item.amount, item.total, 0)),
      currency: pick(item.currency, "EUR"),
      status: (pick(item.status, "Draft") as InvoiceStatus),
      dueDate: pick(item.dueDate, item.due_date, item.due) ?? ""
    }));

  }, []);

  const filteredInvoices = useMemo(() => {

    const query = search.toLowerCase();

    return invoices.filter((invoice) =>

      invoice.invoiceNumber.toLowerCase().includes(query) ||
      invoice.customerName.toLowerCase().includes(query)

    );

  }, [invoices, search]);

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

            <input
              className="border rounded-xl p-3 md:w-80"
              placeholder="Search invoice or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

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

              {filteredInvoices.map((invoice, index) => (

                <div
                  key={`${invoice.invoiceNumber}-${index}`}
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

                </div>

              ))}

            </div>

          )}

        </div>

      </main>

    </div>

  );

}
