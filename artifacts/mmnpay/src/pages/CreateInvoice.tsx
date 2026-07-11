import { useState } from "react";
import { useLocation } from "wouter";
import Sidebar from "@/components/Sidebar";

export default function CreateInvoice() {

  const [, navigate] = useLocation();

  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  function saveInvoice() {

    if (!customerName || !email || !amount || !dueDate) {
      alert("Please fill in customer name, email, amount and due date");
      return;
    }

    const invoiceNumber = "INV" + Date.now();

    const invoice = {
      invoiceNumber,
      customerName,
      email,
      amount,
      currency,
      description,
      dueDate,
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

        <div className="bg-white rounded-2xl shadow p-8 max-w-2xl">

          <h2 className="text-2xl font-bold mb-6">
            Invoice Details
          </h2>

          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Customer Name
          </label>

          <input
            className="w-full border rounded-xl p-3 mb-4"
            placeholder="Customer name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Email
          </label>

          <input
            type="email"
            className="w-full border rounded-xl p-3 mb-4"
            placeholder="customer@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

            <div>

              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Amount
              </label>

              <input
                className="w-full border rounded-xl p-3"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

            </div>

            <div>

              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Currency
              </label>

              <select
                className="w-full border rounded-xl p-3"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
              </select>

            </div>

          </div>

          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Description
          </label>

          <textarea
            className="w-full border rounded-xl p-3 mb-4"
            placeholder="What is this invoice for?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Due Date
          </label>

          <input
            type="date"
            className="w-full border rounded-xl p-3 mb-6"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <div className="flex flex-col md:flex-row gap-4">

            <button
              onClick={saveInvoice}
              className="w-full md:flex-1 bg-[#635bff] text-white py-4 rounded-xl font-bold"
            >
              Save Invoice
            </button>

            <button
              onClick={cancel}
              className="w-full md:flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-bold"
            >
              Cancel
            </button>

          </div>

        </div>

      </main>

    </div>

  );

}
