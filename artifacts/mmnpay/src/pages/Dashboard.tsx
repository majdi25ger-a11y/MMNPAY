import React, { useState } from "react";

export default function Dashboard() {

  const [merchant, setMerchant] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  function createLink() {
    const id = "MMN" + Math.floor(Math.random() * 100000);

    setLink(
      `${window.location.origin}/pay/${id}`
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f9fc] flex items-center justify-center p-6">

      <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-xl">

        <h1 className="text-3xl font-bold text-[#0a2540] mb-2">
          MMNPAY Dashboard
        </h1>

        <p className="text-gray-500 mb-8">
          Create a new payment link
        </p>


        <input
          className="w-full border p-3 rounded-xl mb-4"
          placeholder="Merchant name"
          value={merchant}
          onChange={(e)=>setMerchant(e.target.value)}
        />


        <input
          className="w-full border p-3 rounded-xl mb-4"
          placeholder="Amount EUR"
          value={amount}
          onChange={(e)=>setAmount(e.target.value)}
        />


        <input
          className="w-full border p-3 rounded-xl mb-4"
          placeholder="Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />


        <button
          onClick={createLink}
          className="w-full bg-[#635bff] text-white py-4 rounded-xl font-bold"
        >
          Create Payment Link
        </button>


        {link && (
          <div className="mt-6 bg-gray-100 p-4 rounded-xl">

            <p className="text-sm text-gray-500">
              Your Payment Link:
            </p>

            <p className="break-all font-bold mt-2">
              {link}
            </p>

          </div>
        )}

      </div>

    </div>
  );
}