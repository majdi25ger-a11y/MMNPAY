import React, { useState } from "react";
import { useParams } from "wouter";
import { CreditCard, Building } from "lucide-react";

export default function Pay() {

  const { id } = useParams();

  const [method,setMethod] = useState("card");

  const payment = {
    merchant: "Demo Store",
    amount: "100.00",
    currency: "EUR",
    description: "Online Order"
  };

  return (
    <div className="min-h-screen bg-[#f6f9fc] flex items-center justify-center p-6">

      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0a2540]">
            MMNPAY
          </h1>

          <p className="text-gray-500 mt-2">
            Secure Checkout
          </p>
        </div>


        <div className="border rounded-xl p-5 mb-6">

          <p className="text-gray-500">
            Merchant
          </p>

          <h2 className="font-bold text-xl">
            {payment.merchant}
          </h2>


          <div className="mt-4 text-3xl font-bold">
            €{payment.amount}
          </div>


          <p className="text-gray-500 mt-2">
            {payment.description}
          </p>

        </div>


        <h3 className="font-bold mb-3">
          Payment Method
        </h3>


        <button
        onClick={()=>setMethod("card")}
        className={`w-full p-4 border rounded-xl mb-3 ${
          method==="card" ? "border-blue-600" : ""
        }`}
        >
          💳 Visa / Mastercard
        </button>


        <button
        onClick={()=>setMethod("paypal")}
        className="w-full p-4 border rounded-xl mb-3"
        >
          🅿️ PayPal
        </button>


        <button
        onClick={()=>setMethod("bank")}
        className="w-full p-4 border rounded-xl mb-6"
        >
          🏦 Bank Transfer
        </button>


        <button
        className="w-full bg-[#635bff] text-white py-4 rounded-xl font-bold"
        >
          Pay Now
        </button>


        <p className="text-center text-xs text-gray-400 mt-6">
          Secured by MMNPAY
        </p>

      </div>

    </div>
  );
}