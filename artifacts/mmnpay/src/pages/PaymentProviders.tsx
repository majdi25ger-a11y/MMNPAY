import Sidebar from "@/components/Sidebar";

function connectStripe() {

  const provider = {
    provider: "stripe",
    connected: true,
    accountId: "",
    mode: "sandbox"
  };

  localStorage.setItem(
    "paymentProvider",
    JSON.stringify(provider)
  );

  alert("Stripe connected (sandbox mode).");

}

export default function PaymentProviders() {

  return (

    <div className="flex min-h-screen bg-[#f6f9fc]">

      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold text-[#0a2540]">
          Payment Providers
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          Connect the providers you use to receive payments.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow p-8 flex flex-col">

            <div className="flex items-center justify-between mb-4">

              <h2 className="text-xl font-bold text-[#0a2540]">
                Stripe
              </h2>

              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm font-semibold">
                Not Connected
              </span>

            </div>

            <p className="text-gray-500 mb-6 flex-1">
              Accept card payments online through Stripe.
            </p>

            <button
              onClick={connectStripe}
              className="w-full bg-[#635bff] text-white py-3 rounded-xl font-bold"
            >
              Connect Stripe
            </button>

          </div>

          <div className="bg-white rounded-2xl shadow p-8 flex flex-col">

            <div className="flex items-center justify-between mb-4">

              <h2 className="text-xl font-bold text-[#0a2540]">
                PayPal
              </h2>

              <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">
                Coming Soon
              </span>

            </div>

            <p className="text-gray-500 mb-6 flex-1">
              Accept payments through PayPal wallets and cards.
            </p>

            <button
              disabled
              className="w-full bg-gray-200 text-gray-500 py-3 rounded-xl font-bold cursor-not-allowed"
            >
              Coming Soon
            </button>

          </div>

          <div className="bg-white rounded-2xl shadow p-8 flex flex-col">

            <div className="flex items-center justify-between mb-4">

              <h2 className="text-xl font-bold text-[#0a2540]">
                Bank Transfer
              </h2>

              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                Available
              </span>

            </div>

            <p className="text-gray-500 mb-6 flex-1">
              Receive manual bank transfers.
            </p>

          </div>

        </div>

      </main>

    </div>

  );

}
