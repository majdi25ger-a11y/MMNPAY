import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function Dashboard() {

  const [merchant, setMerchant] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

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
      currency: "EUR"
    };

    localStorage.setItem(
      "payment_" + id,
      JSON.stringify(payment)
    );

    setLink(
      `${window.location.origin}/pay/${id}`
    );

  }

  return (     <div className="flex min-h-screen bg-[#f6f9fc]">

    <Sidebar />

    <main className="flex-1 p-8">

      <h1 className="text-4xl font-bold text-[#0a2540]">
        Dashboard
      </h1>

      <p className="text-gray-500 mt-2 mb-8">
        Create and manage your payment links.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500 text-sm">Payment Links</p>
          <h2 className="text-3xl font-bold mt-2">1</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500 text-sm">Transactions</p>
          <h2 className="text-3xl font-bold mt-2">0</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500 text-sm">Revenue</p>
          <h2 className="text-3xl font-bold mt-2">€0.00</h2>
        </div>

      </div>

      <div className="bg-white rounded-2xl shadow p-8 max-w-xl">

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
          placeholder="Amount (EUR)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          className="w-full border rounded-xl p-3 mb-6"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={createLink}
          className="w-full bg-[#635bff] text-white py-4 rounded-xl font-bold"
        >
          Create Payment Link
        </button>

        {link && (

          <div className="mt-6 bg-[#f6f9fc] rounded-xl p-4">

            <p className="text-sm text-gray-500">
              Payment Link
            </p>

            <p className="break-all font-bold mt-2">
              {link}
            </p>

          </div>

        )}

      </div>
            </main>

          </div>

        );

      }