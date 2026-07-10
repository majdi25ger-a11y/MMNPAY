import React, { useState } from "react";
import { useParams } from "wouter";
import { Shield, Lock } from "lucide-react";

export default function Pay() {

  const { id } = useParams();

  const stored = localStorage.getItem("payment_" + id);

  const [method, setMethod] = useState("card");

  const payment = stored
    ? JSON.parse(stored)
    : {
        id: id || "MMN-000001",
        merchant: "MMNPAY Merchant",
        amount: "100.00",
        currency: "EUR",
        description: "Payment Request"
          };
  console.log(payment);

  return (
    <div className="min-h-screen bg-[#f6f9fc] flex items-center justify-center p-5">

      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-[#0a2540]">
            MMNPAY
          </h1>

          <p className="text-gray-500 mt-2">
            Secure Global Payments
          </p>

        </div>


        <div className="bg-[#0a2540] text-white rounded-xl p-6 mb-6">

          <p className="text-sm text-white/60">
            Payment ID
          </p>

          <p className="font-bold mb-4">
            {payment.id}
          </p>


          <p className="text-sm text-white/60">
            Amount
          </p>

          <h2 className="text-4xl font-bold">
            €{payment.amount}
          </h2>

        </div>



        <div className="mb-6">

          <p className="text-sm text-gray-500">
            Merchant
          </p>

          <h3 className="font-bold text-lg">
            {payment.merchant}
          </h3>


          <p className="text-gray-500 mt-2">
            {payment.description}
          </p>

        </div>



        <h3 className="font-bold mb-3">
          Select payment method
        </h3>


        {[
          ["card","💳 Card"],
          ["paypal","🅿️ PayPal"],
          ["bank","🏦 Bank Transfer"],
          ["apple","🍎 Apple Pay"]
        ].map(([key,label]) => (

          <button
            key={key}
            onClick={()=>setMethod(key)}
            className={`w-full p-4 mb-3 rounded-xl border text-left ${
              method===key 
              ? "border-blue-600 bg-blue-50"
              : "border-gray-200"
            }`}
          >
            {label}
          </button>

        ))}



        <button className="w-full bg-[#635bff] hover:bg-[#0a2540] text-white py-4 rounded-xl font-bold mt-4">

          Pay Now

        </button>



        <div className="flex justify-center gap-4 text-xs text-gray-400 mt-6">

          <span className="flex items-center gap-1">
            <Lock size={12}/>
            SSL Secure
          </span>

          <span className="flex items-center gap-1">
            <Shield size={12}/>
            MMNPAY Protected
          </span>

        </div>


      </div>

    </div>
  );
}