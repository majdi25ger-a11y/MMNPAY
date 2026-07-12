import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import Sidebar from "@/components/Sidebar";
import { downloadInvoicePdf, printInvoice } from "@/lib/invoiceExport";
import type { ExportableOrganization } from "@/lib/invoiceExport";
import { APP_NAME } from "@/lib/config";
import * as authRepository from "@/lib/repositories/authRepository";
import * as organizationRepository from "@/lib/repositories/organizationRepository";
import type { Organization } from "@/lib/repositories/organizationRepository";
import * as invoiceRepository from "@/lib/repositories/invoiceRepository";
import type { Invoice as InvoiceRecord } from "@/lib/repositories/invoiceRepository";

type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Overdue";

interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  description: string;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
}

// Builds the organization shape the PDF/print service expects, falling
// back to MMNPAY defaults if the organization hasn't loaded yet.
function toPdfOrganization(organization: Organization | null): ExportableOrganization {

  return {
    name: organization?.name || APP_NAME,
    email: organization?.email || undefined,
    phone: organization?.phone || undefined,
    country: organization?.country || undefined
  };

}

const STATUS_STYLES: Record<string, string> = {
  Draft: "bg-gray-100 text-gray-600",
  Sent: "bg-blue-100 text-blue-700",
  Paid: "bg-green-100 text-green-700",
  Overdue: "bg-red-100 text-red-700"
};

function normalizeInvoice(item: InvoiceRecord): Invoice {

  return {
    id: item.id,
    invoiceNumber: item.invoice_number || "",
    customerName: item.customer_name || "",
    customerEmail: item.email || "",
    amount: Number(item.amount) || 0,
    currency: item.currency || "EUR",
    description: item.description || "",
    status: (item.status as InvoiceStatus) || "Draft",
    issueDate: (item.created_at || "").slice(0, 10),
    dueDate: item.due_date || ""
  };

}

export default function Invoices() {

  const [, navigate] = useLocation();

  const [search, setSearch] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [organization, setOrganization] = useState<Organization | null>(null);

  const [rawInvoices, setRawInvoices] = useState<InvoiceRecord[]>([]);

  const [paymentLinks, setPaymentLinks] = useState<Record<string, string>>({});

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

      if (!organization) {
        if (isMounted) {
          setIsLoading(false);
        }
        return;
      }

      const invoices = await invoiceRepository.getInvoicesByOrganization(
        organization.id
      );

      if (isMounted) {
        setOrganization(organization);
        setRawInvoices(invoices);
        setIsLoading(false);
      }

    }

    load();

    return () => {
      isMounted = false;
    };

  }, []);

  const invoices: Invoice[] = useMemo(() => {

    return rawInvoices.map((item) => normalizeInvoice(item));

  }, [rawInvoices]);

  const filteredInvoices = useMemo(() => {

    const query = search.toLowerCase();

    return invoices.filter((invoice) =>

      invoice.invoiceNumber.toLowerCase().includes(query) ||
      invoice.customerName.toLowerCase().includes(query)

    );

  }, [invoices, search]);

  async function generatePaymentLink(invoice: Invoice) {

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

    const updated = await invoiceRepository.updateInvoice(invoice.id, {
      status: "Sent"
    });

    setRawInvoices((prev) =>
      prev.map((item) => (item.id === invoice.id ? updated : item))
    );

    setPaymentLinks((prev) => ({
      ...prev,
      [invoice.invoiceNumber]: `${window.location.origin}/pay/${paymentId}`
    }));

  }

  function editInvoice(invoice: Invoice) {

    navigate(`/invoices/edit/${invoice.invoiceNumber}`);

  }

  async function deleteInvoice(invoice: Invoice) {

    const confirmed = window.confirm(
      "Are you sure you want to delete this invoice?"
    );

    if (!confirmed) {
      return;
    }

    await invoiceRepository.deleteInvoice(invoice.id);

    setRawInvoices((prev) => prev.filter((item) => item.id !== invoice.id));

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

          {isLoading ? (

            <div className="text-center py-16">

              <p className="text-gray-500">
                Loading invoices...
              </p>

            </div>

          ) : invoices.length === 0 ? (

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

                const link = paymentLinks[invoice.invoiceNumber];

                return (

                  <div
                    key={invoice.id}
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
                        onClick={() => generatePaymentLink(invoice)}
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
                        onClick={() => deleteInvoice(invoice)}
                        className="flex-1 border border-red-200 text-red-600 py-2 rounded-xl font-bold"
                      >
                        Delete
                      </button>

                    </div>

                    <div className="flex gap-3">

                      <button
                        onClick={() => downloadInvoicePdf(invoice, toPdfOrganization(organization))}
                        className="flex-1 border border-gray-200 text-[#0a2540] py-2 rounded-xl font-bold"
                      >
                        Download PDF
                      </button>

                      <button
                        onClick={() => printInvoice(invoice, toPdfOrganization(organization))}
                        className="flex-1 border border-gray-200 text-[#0a2540] py-2 rounded-xl font-bold"
                      >
                        Print
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
