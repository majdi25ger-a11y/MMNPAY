import { useState } from "react";
import Sidebar from "@/components/Sidebar";

interface CompanySettings {
  companyName: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  logoUrl: string;
  primaryColor: string;
  defaultCurrency: string;
  defaultDescription: string;
  vatEnabled: boolean;
  vatPercentage: string;
}

const DEFAULT_SETTINGS: CompanySettings = {
  companyName: "",
  email: "",
  phone: "",
  website: "",
  address: "",
  logoUrl: "",
  primaryColor: "#635bff",
  defaultCurrency: "EUR",
  defaultDescription: "",
  vatEnabled: false,
  vatPercentage: ""
};

function loadSettings(): CompanySettings {

  const raw = JSON.parse(
    localStorage.getItem("settings") || "null"
  );

  if (!raw || typeof raw !== "object") {
    return DEFAULT_SETTINGS;
  }

  return {
    ...DEFAULT_SETTINGS,
    ...raw
  };

}

export default function Settings() {

  const [settings, setSettings] = useState<CompanySettings>(loadSettings);
  const [saved, setSaved] = useState(false);

  function update<K extends keyof CompanySettings>(key: K, value: CompanySettings[K]) {

    setSettings((prev) => ({
      ...prev,
      [key]: value
    }));

    setSaved(false);

  }

  function saveSettings() {

    localStorage.setItem(
      "settings",
      JSON.stringify(settings)
    );

    setSaved(true);

  }

  return (

    <div className="flex min-h-screen bg-[#f6f9fc]">

      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold text-[#0a2540]">
          Settings
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          Manage your company profile, branding and payment defaults.
        </p>

        <div className="max-w-3xl space-y-8">

          <div className="bg-white rounded-2xl shadow p-8">

            <h2 className="text-2xl font-bold mb-6">
              Company Information
            </h2>

            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Company Name
            </label>

            <input
              className="w-full border rounded-xl p-3 mb-4"
              placeholder="Acme Inc."
              value={settings.companyName}
              onChange={(e) => update("companyName", e.target.value)}
            />

            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Email
            </label>

            <input
              type="email"
              className="w-full border rounded-xl p-3 mb-4"
              placeholder="billing@company.com"
              value={settings.email}
              onChange={(e) => update("email", e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

              <div>

                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Phone
                </label>

                <input
                  className="w-full border rounded-xl p-3"
                  placeholder="+1 555 000 0000"
                  value={settings.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />

              </div>

              <div>

                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Website
                </label>

                <input
                  className="w-full border rounded-xl p-3"
                  placeholder="https://company.com"
                  value={settings.website}
                  onChange={(e) => update("website", e.target.value)}
                />

              </div>

            </div>

            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Address
            </label>

            <textarea
              className="w-full border rounded-xl p-3"
              placeholder="Street, City, Country"
              value={settings.address}
              onChange={(e) => update("address", e.target.value)}
            />

          </div>

          <div className="bg-white rounded-2xl shadow p-8">

            <h2 className="text-2xl font-bold mb-6">
              Branding
            </h2>

            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Company Logo URL
            </label>

            <input
              className="w-full border rounded-xl p-3 mb-4"
              placeholder="https://company.com/logo.png"
              value={settings.logoUrl}
              onChange={(e) => update("logoUrl", e.target.value)}
            />

            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Primary Color
            </label>

            <div className="flex items-center gap-4">

              <input
                type="color"
                className="w-14 h-12 border rounded-xl p-1"
                value={settings.primaryColor}
                onChange={(e) => update("primaryColor", e.target.value)}
              />

              <input
                className="flex-1 border rounded-xl p-3"
                placeholder="#635bff"
                value={settings.primaryColor}
                onChange={(e) => update("primaryColor", e.target.value)}
              />

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow p-8">

            <h2 className="text-2xl font-bold mb-6">
              Payment Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

              <div>

                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Default Currency
                </label>

                <select
                  className="w-full border rounded-xl p-3"
                  value={settings.defaultCurrency}
                  onChange={(e) => update("defaultCurrency", e.target.value)}
                >
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                  <option value="GBP">GBP</option>
                </select>

              </div>

            </div>

            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Default Payment Description
            </label>

            <textarea
              className="w-full border rounded-xl p-3"
              placeholder="e.g. Payment for services rendered"
              value={settings.defaultDescription}
              onChange={(e) => update("defaultDescription", e.target.value)}
            />

          </div>

          <div className="bg-white rounded-2xl shadow p-8">

            <h2 className="text-2xl font-bold mb-6">
              Tax Settings
            </h2>

            <div className="flex items-center justify-between mb-4">

              <div>

                <p className="font-semibold">
                  VAT Enabled
                </p>

                <p className="text-gray-500 text-sm">
                  Apply VAT to new invoices and payment links.
                </p>

              </div>

              <button
                onClick={() => update("vatEnabled", !settings.vatEnabled)}
                className={`w-14 h-8 rounded-full flex items-center transition px-1 ${
                  settings.vatEnabled ? "bg-[#635bff] justify-end" : "bg-gray-200 justify-start"
                }`}
              >
                <span className="w-6 h-6 rounded-full bg-white shadow" />
              </button>

            </div>

            {settings.vatEnabled && (

              <div>

                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  VAT Percentage
                </label>

                <input
                  className="w-full border rounded-xl p-3"
                  placeholder="e.g. 21"
                  value={settings.vatPercentage}
                  onChange={(e) => update("vatPercentage", e.target.value)}
                />

              </div>

            )}

          </div>

          <div className="flex items-center gap-4">

            <button
              onClick={saveSettings}
              className="bg-[#635bff] text-white px-8 py-4 rounded-xl font-bold"
            >
              Save Settings
            </button>

            {saved && (

              <span className="text-green-600 font-semibold">
                Settings saved
              </span>

            )}

          </div>

        </div>

      </main>

    </div>

  );

}
