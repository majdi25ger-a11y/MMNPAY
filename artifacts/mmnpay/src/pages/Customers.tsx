import { useMemo, useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function Customers() {

  const [search, setSearch] = useState("");

  const transactions = JSON.parse(
    localStorage.getItem("transactions") || "[]"
  );

  const customers = useMemo(() => {

    const groups: Record<string, {
      merchant: string;
      totalPayments: number;
      totalRevenue: number;
      lastPaymentDate: string;
    }> = {};

    transactions.forEach((tx: any) => {

      const merchant = tx.merchant || "Unknown";

      if (!groups[merchant]) {
        groups[merchant] = {
          merchant,
          totalPayments: 0,
          totalRevenue: 0,
          lastPaymentDate: tx.date
        };
      }

      groups[merchant].totalPayments += 1;
      groups[merchant].totalRevenue += Number(tx.amount) || 0;

      const currentLast = new Date(groups[merchant].lastPaymentDate).getTime();
      const candidate = new Date(tx.date).getTime();

      if (!isNaN(candidate) && (isNaN(currentLast) || candidate > currentLast)) {
        groups[merchant].lastPaymentDate = tx.date;
      }

    });

    return Object.values(groups);

  }, [transactions]);

  const filteredCustomers = useMemo(() => {

    return customers.filter((item) =>

      item.merchant
        .toLowerCase()
        .includes(search.toLowerCase())

    );

  }, [customers, search]);

  return (

    <div className="flex min-h-screen bg-[#f6f9fc]">

      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold text-[#0a2540]">
          Customers
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          See how much revenue each merchant has generated.
        </p>

        <div className="bg-white rounded-2xl shadow p-8">

          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

            <h2 className="text-2xl font-bold">
              Merchants
            </h2>

            <input
              className="border rounded-xl p-3 md:w-80"
              placeholder="Search merchant..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          {filteredCustomers.length === 0 ? (

            <div className="text-center py-12">

              <p className="text-gray-500">
                No customers found.
              </p>

            </div>

          ) : (

            filteredCustomers.map((item) => (

              <div
                key={item.merchant}
                className="border-b py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >

                <div>

                  <h3 className="font-bold text-lg">
                    {item.merchant}
                  </h3>

                  <p className="text-gray-500">
                    {item.totalPayments} payment
                    {item.totalPayments === 1 ? "" : "s"}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Last payment: {item.lastPaymentDate}
                  </p>

                </div>

                <div className="text-right">

                  <p className="font-bold text-xl">
                    €{item.totalRevenue.toFixed(2)}
                  </p>

                  <p className="text-gray-500 text-sm">
                    Total revenue
                  </p>

                </div>

              </div>

            ))

          )}

        </div>

      </main>

    </div>

  );

}
