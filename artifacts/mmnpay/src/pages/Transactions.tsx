import Sidebar from "@/components/Sidebar";

export default function Transactions() {

  const transactions = JSON.parse(
    localStorage.getItem("transactions") || "[]"
  );

  return (

    <div className="flex min-h-screen bg-[#f6f9fc]">

      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold text-[#0a2540] mb-8">
          Transactions
        </h1>

        {transactions.length === 0 ? (

          <div className="bg-white rounded-2xl shadow p-8">
            No transactions yet.
          </div>

        ) : (

          transactions.map((tx: any) => (

            <div
              key={tx.id}
              className="bg-white rounded-2xl shadow p-6 mb-4 flex justify-between items-center"
            >

              <div>

                <h2 className="font-bold text-lg">
                  {tx.merchant}
                </h2>

                <p className="text-gray-500">
                  {tx.date}
                </p>

              </div>

              <div className="text-right">

                <p className="font-bold text-xl">
                  €{tx.amount}
                </p>

                <p className="text-green-600 font-semibold">
                  Paid
                </p>

              </div>

            </div>

          ))

        )}

      </main>

    </div>

  );

}