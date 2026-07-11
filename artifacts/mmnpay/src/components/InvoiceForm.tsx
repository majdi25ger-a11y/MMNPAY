import { useState } from "react";

export interface InvoiceFormValues {
  customerName: string;
  email: string;
  amount: string;
  currency: string;
  description: string;
  dueDate: string;
}

interface InvoiceFormProps {
  initialValues?: Partial<InvoiceFormValues>;
  onSubmit: (values: InvoiceFormValues) => void;
  submitLabel: string;
  onCancel: () => void;
}

const DEFAULT_VALUES: InvoiceFormValues = {
  customerName: "",
  email: "",
  amount: "",
  currency: "EUR",
  description: "",
  dueDate: ""
};

export default function InvoiceForm({
  initialValues,
  onSubmit,
  submitLabel,
  onCancel
}: InvoiceFormProps) {

  const [customerName, setCustomerName] = useState(
    initialValues?.customerName ?? DEFAULT_VALUES.customerName
  );

  const [email, setEmail] = useState(
    initialValues?.email ?? DEFAULT_VALUES.email
  );

  const [amount, setAmount] = useState(
    initialValues?.amount ?? DEFAULT_VALUES.amount
  );

  const [currency, setCurrency] = useState(
    initialValues?.currency ?? DEFAULT_VALUES.currency
  );

  const [description, setDescription] = useState(
    initialValues?.description ?? DEFAULT_VALUES.description
  );

  const [dueDate, setDueDate] = useState(
    initialValues?.dueDate ?? DEFAULT_VALUES.dueDate
  );

  function handleSubmit() {

    if (!customerName || !email || !amount || !dueDate) {
      alert("Please fill in customer name, email, amount and due date");
      return;
    }

    onSubmit({
      customerName,
      email,
      amount,
      currency,
      description,
      dueDate
    });

  }

  return (

    <div className="bg-white rounded-2xl shadow p-8 max-w-2xl">

      <h2 className="text-2xl font-bold mb-6">
        Invoice Details
      </h2>

      <label className="block text-sm font-semibold text-gray-600 mb-2">
        Customer Name
      </label>

      <input
        className="w-full border rounded-xl p-3 mb-4"
        placeholder="Customer name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />

      <label className="block text-sm font-semibold text-gray-600 mb-2">
        Email
      </label>

      <input
        type="email"
        className="w-full border rounded-xl p-3 mb-4"
        placeholder="customer@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

        <div>

          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Amount
          </label>

          <input
            className="w-full border rounded-xl p-3"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

        </div>

        <div>

          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Currency
          </label>

          <select
            className="w-full border rounded-xl p-3"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
          </select>

        </div>

      </div>

      <label className="block text-sm font-semibold text-gray-600 mb-2">
        Description
      </label>

      <textarea
        className="w-full border rounded-xl p-3 mb-4"
        placeholder="What is this invoice for?"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label className="block text-sm font-semibold text-gray-600 mb-2">
        Due Date
      </label>

      <input
        type="date"
        className="w-full border rounded-xl p-3 mb-6"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <div className="flex flex-col md:flex-row gap-4">

        <button
          onClick={handleSubmit}
          className="w-full md:flex-1 bg-[#635bff] text-white py-4 rounded-xl font-bold"
        >
          {submitLabel}
        </button>

        <button
          onClick={onCancel}
          className="w-full md:flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-bold"
        >
          Cancel
        </button>

      </div>

    </div>

  );

}
