import React, { useState } from "react";
import { useLocation, useParams } from "wouter";
import { Lock, Shield } from "lucide-react";

// Picks the first defined, non-null, non-empty-string value from a list of
// candidates. Used to normalize a payment record loaded from localStorage,
// since it may come from either the "payments" list or the per-id
// "payment_<id>" record, and either copy may be missing a field.
function pick(...values: any[]) {
  for (const v of values) {
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
}

export default function Pay() {

  const { id } = useParams();
  const [, navigate] = useLocation();

  const [method, setMethod] = useState("card");

  const payments = JSON.parse(
    localStorage.getItem("payments") || "[]"
  );

  const listPayment = payments.find(
    (item: any) => String(item.id) === String(id)
  );

  // The dashboard also writes a full, untouched copy of every payment under
  // its own "payment_<id>" key at creation time. That copy is used as a
  // fallback source so a stale or partially-updated entry in the "payments"
  // array (e.g. one missing amount/currency/description) never results in
  // blank fields on the payment page.
  let singlePayment: any = null;

  if (id) {
    try {
      const rawSingle = localStorage.getItem("payment_" + id);
      singlePayment = rawSingle ? JSON.parse(rawSingle) : null;
    } catch {
      singlePayment = null;
    }
  }

  const payment = listPayment || singlePayment
    ? {
        id: pick(listPayment?.id, singlePayment?.id, id),
        merchant: pick(listPayment?.merchant, singlePayment?.merchant, ""),
        amount: pick(
          listPayment?.amount,
          singlePayment?.amount,
          listPayment?.value,
          singlePayment?.value,
          listPayment?.total,
          singlePayment?.total,
          listPayment?.price,
          singlePayment?.price,
          ""
        ),
        currency: pick(listPayment?.currency, singlePayment?.currency, "EUR"),
        description: pick(listPayment?.description, singlePayment?.description, ""),
        status: pick(listPayment?.status, singlePayment?.status, "Active"),
        createdAt: pick(listPayment?.createdAt, singlePayment?.createdAt, ""),
      }
    : null;

  if (!payment) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-[#f6f9fc]">

        <div className="bg-white rounded-2xl shadow-xl p-10 text-center">

          <h1 className="text-3xl font-bold text-red-600 mb-3">
            Payment Not Found
          </h1>

          <p className="text-gray-500">
            This payment link does not exist.
          </p>

        </div>

      </div>

    );

  }

  function payNow() {

    if (!payment) {
      return;
    }

    const transactions = JSON.parse(
      localStorage.getItem("transactions") || "[]"
    );

    const exists = transactions.find(
      (tx: any) => tx.paymentId === payment.id
    );

    if (exists) {
      alert("This payment has already been completed.");
      return;
    }
    transactions.unshift({
      id: Date.now(),
      paymentId: payment.id,
      merchant: payment.merchant,
      amount: payment.amount,
      currency: payment.currency,
      description: payment.description,
      method,
      status: "Paid",
      date: new Date().toLocaleString()
    });

    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );

    const updatedPayments = payments.map((item: any) =>

      String(item.id) === String(payment.id)
        ? {
            ...item,
            status: "Paid"
          }
        : item

    );

    localStorage.setItem(
      "payments",
      JSON.stringify(updatedPayments)
    );

    alert("Payment Successful!");

    navigate("/transactions");

    }

    return (

    <div className="min-h-screen bg-[#f6f9fc] flex items-center justify-center p-6">

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
          ["card", "💳 Card"],
          ["paypal", "🅿️ PayPal"],
          ["bank", "🏦 Bank Transfer"],
          ["apple", "🍎 Apple Pay"]
        ].map(([key, label]) => (

          <button
            key={key}
            onClick={() => setMethod(key)}
            className={`w-full p-4 mb-3 rounded-xl border text-left ${
              method === key
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200"
            }`}
          >
            {label}
          </button>

        ))}

        {/* TEMPORARY DEBUG OUTPUT — remove after inspection */}
        <pre className="text-xs bg-gray-100 rounded-xl p-4 mt-4 overflow-auto">{JSON.stringify(payment, null, 2)}</pre>

        <button
          onClick={payNow}
          className="w-full bg-[#635bff] hover:bg-[#0a2540] text-white py-4 rounded-xl font-bold mt-4"
        >
          Pay Now
        </button>

        <div className="flex justify-center gap-4 text-xs text-gray-400 mt-6">

          <span className="flex items-center gap-1">
            <Lock size={12} />
            SSL Secure
          </span>

          <span className="flex items-center gap-1">
            <Shield size={12} />
            MMNPAY Protected
          </span>

        </div>

        </div>

        </div>

        );

        }
