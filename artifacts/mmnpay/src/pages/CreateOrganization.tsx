import { useState } from "react";
import { useLocation } from "wouter";

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Ireland",
  "Germany",
  "France",
  "Netherlands",
  "Spain",
  "Italy",
  "Portugal",
  "Sweden",
  "Canada",
  "Australia",
  "Other"
];

const CURRENCIES = ["EUR", "USD", "GBP"];

const TIMEZONES = [
  "UTC",
  "Europe/London",
  "Europe/Dublin",
  "Europe/Berlin",
  "Europe/Paris",
  "Europe/Madrid",
  "Europe/Lisbon",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Australia/Sydney"
];

interface OrganizationForm {
  companyName: string;
  ownerName: string;
  businessEmail: string;
  phone: string;
  country: string;
  defaultCurrency: string;
  timezone: string;
}

const DEFAULT_FORM: OrganizationForm = {
  companyName: "",
  ownerName: "",
  businessEmail: "",
  phone: "",
  country: COUNTRIES[0],
  defaultCurrency: CURRENCIES[0],
  timezone: TIMEZONES[0]
};

function generateOrganizationId(): string {
  return "ORG" + Date.now();
}

export default function CreateOrganization() {

  const [, navigate] = useLocation();
  const [form, setForm] = useState<OrganizationForm>(DEFAULT_FORM);
  const [created, setCreated] = useState(false);

  function update<K extends keyof OrganizationForm>(key: K, value: OrganizationForm[K]) {

    setForm((prev) => ({
      ...prev,
      [key]: value
    }));

    setCreated(false);

  }

  function createOrganization() {

    if (!form.companyName || !form.ownerName || !form.businessEmail) {
      alert("Please fill in Company Name, Owner Name and Business Email");
      return;
    }

    const organization = {
      ...form,
      organizationId: generateOrganizationId(),
      createdAt: new Date().toLocaleString(),
      plan: "Starter"
    };

    localStorage.setItem(
      "organization",
      JSON.stringify(organization)
    );

    const existingSettings = localStorage.getItem("settings");

    if (!existingSettings) {

      const defaultSettings = {
        companyName: form.companyName,
        email: form.businessEmail,
        phone: "",
        website: "",
        address: "",
        logoUrl: "",
        primaryColor: "#635bff",
        defaultCurrency: form.defaultCurrency,
        defaultDescription: "",
        vatEnabled: false,
        vatPercentage: ""
      };

      localStorage.setItem(
        "settings",
        JSON.stringify(defaultSettings)
      );

    }

    setCreated(true);

    setTimeout(() => {
      navigate("/dashboard");
    }, 1200);

  }

  return (

    <div className="min-h-screen bg-[#0a2540] flex items-center justify-center p-6">

      <div className="w-full max-w-2xl">

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-white">
            MMNPAY
          </h1>

          <p className="text-white/60 mt-2">
            Let's set up your organization to start accepting payments.
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-8 md:p-10">

          <h2 className="text-2xl font-bold text-[#0a2540] mb-1">
            Create Your Organization
          </h2>

          <p className="text-gray-500 mb-8">
            This information helps us personalize your MMNPAY dashboard.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="md:col-span-2">

              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Company Name
              </label>

              <input
                className="w-full border rounded-xl p-3"
                placeholder="Acme Inc."
                value={form.companyName}
                onChange={(e) => update("companyName", e.target.value)}
              />

            </div>

            <div>

              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Owner Name
              </label>

              <input
                className="w-full border rounded-xl p-3"
                placeholder="Jane Doe"
                value={form.ownerName}
                onChange={(e) => update("ownerName", e.target.value)}
              />

            </div>

            <div>

              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Business Email
              </label>

              <input
                type="email"
                className="w-full border rounded-xl p-3"
                placeholder="owner@company.com"
                value={form.businessEmail}
                onChange={(e) => update("businessEmail", e.target.value)}
              />

            </div>

            <div>

              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Phone
              </label>

              <input
                className="w-full border rounded-xl p-3"
                placeholder="+1 555 000 0000"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />

            </div>

            <div>

              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Country
              </label>

              <select
                className="w-full border rounded-xl p-3"
                value={form.country}
                onChange={(e) => update("country", e.target.value)}
              >
                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>

            </div>

            <div>

              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Default Currency
              </label>

              <select
                className="w-full border rounded-xl p-3"
                value={form.defaultCurrency}
                onChange={(e) => update("defaultCurrency", e.target.value)}
              >
                {CURRENCIES.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>

            </div>

            <div>

              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Timezone
              </label>

              <select
                className="w-full border rounded-xl p-3"
                value={form.timezone}
                onChange={(e) => update("timezone", e.target.value)}
              >
                {TIMEZONES.map((timezone) => (
                  <option key={timezone} value={timezone}>
                    {timezone}
                  </option>
                ))}
              </select>

            </div>

          </div>

          <button
            onClick={createOrganization}
            className="w-full bg-[#635bff] text-white py-4 rounded-xl font-bold mt-8"
          >
            Create Organization
          </button>

          {created && (

            <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 text-center">

              <p className="text-green-700 font-semibold">
                Organization created successfully.
              </p>

              <p className="text-green-600 text-sm mt-1">
                You're all set up on the Starter plan.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}
