import React, { useMemo, useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  getPayments,
  savePayments,
  getTransactions,
  saveTransactions,
  getInvoices,
  getSettings,
  saveSettings,
  savePaymentRecord
} from "@/lib/storage";

const CURRENCY_SYMBOLS: Record<string, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£"
};

export default function Dashboard() {

  const settings = getSettings();

  const companyName = settings.companyName || "Dashboard";
  const defaultCurrency = settings.defaultCurrency || "EUR";
  const currencySymbol = CURRENCY_SYMBOLS[defaultCurrency] || defaultCurrency + " ";

  const [merchant, setMerchant] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [currency, setCurrency] = useState(defaultCurrency);
  const [search, setSearch] = useState("");
  const [link, setLink] = useState("");

  const paymentLinks = getPayments();

  const transactions = getTransactions();

  const revenue = transactions.reduce(
    (sum: number, item: any) => sum + Number(item.amount),
    0
  );

  const invoices = getInvoices();

  const totalCustomers = new Set(
    transactions.map((item: any) => item.merchant)
  ).size;

  const totalInvoices = invoices.length;

  const draftInvoices = invoices.filter(
    (item: any) => item.status === "Draft"
  ).length;

  const sentInvoices = invoices.filter(
    (item: any) => item.status === "Sent"
  ).length;

  const paidInvoices = invoices.filter(
    (item: any) => item.status === "Paid"
  ).length;

  const filteredLinks = useMemo(() => {

    return paymentLinks.filter((item: any) =>

      item.merchant
        .toLowerCase()
        .includes(search.toLowerCase())

    );

  }, [paymentLinks, search]);

  function createLink() {

    if (!merchant || !amount) {
      alert("Please enter merchant and amount");
      return;
    }

    const id = "MMN" + Date.now();

    const payment = {
      id,
      merchant,
      amount,
      description,
      currency,
      status: "Active",
      createdAt: new Date().toLocaleString()
    };

    savePaymentRecord(payment);

    const payments = getPayments();

    payments.unshift(payment);

    savePayments(payments);

    setLink(
      `${window.location.origin}/pay/${id}`
    );

    setMerchant("");
    setAmount("");
    setDescription("");

  }

  return (

    <div className="flex min-h-screen bg-[#f6f9fc]">

      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold text-[#0a2540]">
          {companyName}
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          Create and manage your payment links.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500 text-sm">
              Payment Links
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {paymentLinks.length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500 text-sm">
              Transactions
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {transactions.length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500 text-sm">
              Revenue
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {currencySymbol}{revenue.toFixed(2)}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500 text-sm">
              Currency
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {currency}
            </h2>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500 text-sm">
              Total Customers
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {totalCustomers}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500 text-sm">
              Total Invoices
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {totalInvoices}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500 text-sm">
              Draft Invoices
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {draftInvoices}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500 text-sm">
              Sent Invoices
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {sentInvoices}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500 text-sm">
              Paid Invoices
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {paidInvoices}
            </h2>
          </div>

        </div>

        <div className="bg-white rounded-2xl shadow p-8 mb-8">

          <h2 className="text-2xl font-bold mb-6">
            Create Payment Link
          </h2>

          <input
            className="w-full border rounded-xl p-3 mb-4"
            placeholder="Merchant name"
            value={merchant}
            onChange={(e) => setMerchant(e.target.value)}
          />

          <input
            className="w-full border rounded-xl p-3 mb-4"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <textarea
            className="w-full border rounded-xl p-3 mb-4"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="w-full border rounded-xl p-3 mb-6"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
          </select>

          <button
            onClick={createLink}
            className="w-full bg-[#635bff] text-white py-4 rounded-xl font-bold"
          >
            Create Payment Link
          </button>

          {link && (

            <div className="mt-6 bg-gray-100 rounded-xl p-4">

              <p className="text-sm text-gray-500">
                Payment Link
              </p>

              <div className="flex justify-between items-center mt-2">

                <p className="font-bold break-all">
                  {link}
                </p>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(link);
                    alert("Copied!");
                  }}
                  className="text-blue-600 font-bold"
                >
                  Copy
                </button>

              </div>

            </div>

          )}

        </div>
        <div className="bg-white rounded-2xl shadow p-8">

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

          <h2 className="text-2xl font-bold">
            Payment Links
          </h2>

          <input
            className="border rounded-xl p-3 md:w-80"
            placeholder="Search merchant..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {filteredLinks.length === 0 ? (

          <div className="text-center py-12">

            <p className="text-gray-500">
              No payment links found.
            </p>

          </div>

        ) : (

          filteredLinks.map((item: any) => (

            <div
              key={item.id}
              className="border-b py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >

              <div>

                <h3 className="font-bold text-lg">
                  {item.merchant}
                </h3>

                <p className="text-gray-500">
                  {item.amount} {item.currency}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {item.createdAt}
                </p>

              </div>

              <div className="flex items-center gap-3 flex-wrap">

                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                  {item.status}
                </span>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.origin}/pay/${item.id}`
                    );
                    alert("Link copied!");
                  }}
                  className="text-green-600 font-bold"
                >
                  Copy
                </button>

                <a
                  href={`/pay/${item.id}`}
                  className="text-blue-600 font-bold"
                >
                  Open
                </a>

                <button
                  onClick={() => {

                    const updated = paymentLinks.filter(
                      (p: any) => p.id !== item.id
                    );

                    savePayments(updated);

                    window.location.reload();

                  }}
                  className="text-red-600 font-bold"
                >
                  Delete
                </button>

              </div>

            </div>

          ))

        )}
                  </div>

                </main>

              </div>

            );

          }