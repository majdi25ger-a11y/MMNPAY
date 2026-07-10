import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Link2,
  CreditCard,
  FileText,
  Settings
} from "lucide-react";

export default function Sidebar() {
  const [location] = useLocation();

  const items = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard"
    },
    {
      title: "Payment Links",
      icon: Link2,
      href: "/dashboard"
    },
    {
      title: "Transactions",
      icon: CreditCard,
      href: "/transactions"
    },
    {
      title: "Invoices",
      icon: FileText,
      href: "/invoices"
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings"
    }
  ];

  return (
    <aside className="w-64 bg-[#0a2540] text-white min-h-screen p-6">

      <h1 className="text-3xl font-bold mb-10">
        MMNPAY
      </h1>

      <nav className="space-y-2">

        {items.map((item) => {

          const Icon = item.icon;

          const active = location === item.href;

          return (
            <Link key={item.title} href={item.href}>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition ${
                  active
                    ? "bg-[#635bff]"
                    : "hover:bg-white/10"
                }`}
              >
                <Icon size={20} />
                <span>{item.title}</span>
              </div>
            </Link>
          );
        })}

      </nav>

    </aside>
  );
}