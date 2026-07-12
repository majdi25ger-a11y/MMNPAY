// Centralized localStorage access for MMNPAY.
//
// Every read is wrapped in a JSON.parse try/catch and falls back to a safe
// default (an empty array or null) if the stored value is missing,
// corrupted, or not the shape we expect. Every write serializes safely and
// never throws.

export interface Payment {
  id: string;
  invoiceId?: string;
  merchant: string;
  amount: number | string;
  description?: string;
  currency: string;
  status: string;
  createdAt?: string;
  [key: string]: unknown;
}

export interface Transaction {
  id: number | string;
  paymentId?: string;
  merchant: string;
  amount: number | string;
  currency?: string;
  description?: string;
  method?: string;
  status?: string;
  date: string;
  [key: string]: unknown;
}

export interface CustomerSummary {
  merchant: string;
  totalPayments: number;
  totalRevenue: number;
  lastPaymentDate: string;
}

export interface CompanySettings {
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
  [key: string]: unknown;
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

const KEYS = {
  payments: "payments",
  transactions: "transactions",
  settings: "settings"
} as const;

// Reads a JSON-encoded array from localStorage. Returns [] if the key is
// missing, the JSON is invalid, or the parsed value is not an array.
function readArray<T>(key: string): T[] {

  try {

    const raw = localStorage.getItem(key);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    return Array.isArray(parsed) ? (parsed as T[]) : [];

  } catch {

    return [];

  }

}

// Writes an array to localStorage as JSON. Silently does nothing if
// serialization fails (e.g. circular references), rather than throwing.
function writeArray<T>(key: string, value: T[]): void {

  try {

    localStorage.setItem(key, JSON.stringify(value));

  } catch {

    // Intentionally swallowed: storage should never crash the UI.

  }

}

// Reads a JSON-encoded object from localStorage. Returns null if the key is
// missing, the JSON is invalid, or the parsed value is not an object.
function readObject<T>(key: string): T | null {

  try {

    const raw = localStorage.getItem(key);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return null;
    }

    return parsed as T;

  } catch {

    return null;

  }

}

// Writes an object to localStorage as JSON. Silently does nothing if
// serialization fails.
function writeObject<T>(key: string, value: T): void {

  try {

    localStorage.setItem(key, JSON.stringify(value));

  } catch {

    // Intentionally swallowed: storage should never crash the UI.

  }

}

// ---- Payments ----

export function getPayments(): Payment[] {
  return readArray<Payment>(KEYS.payments);
}

export function savePayments(payments: Payment[]): void {
  writeArray<Payment>(KEYS.payments, payments);
}

export function getPaymentById(id: string): Payment | null {

  const listPayment = getPayments().find(
    (item) => String(item.id) === String(id)
  );

  if (listPayment) {
    return listPayment;
  }

  return readObject<Payment>("payment_" + id);

}

export function savePaymentRecord(payment: Payment): void {
  writeObject<Payment>("payment_" + payment.id, payment);
}

// ---- Transactions ----

export function getTransactions(): Transaction[] {
  return readArray<Transaction>(KEYS.transactions);
}

export function saveTransactions(transactions: Transaction[]): void {
  writeArray<Transaction>(KEYS.transactions, transactions);
}

// ---- Customers (derived from transactions) ----

// Groups transactions by merchant, returning aggregate stats per customer.
// There is no dedicated "customers" storage key -- customers are derived
// from transaction history.
export function getCustomers(): CustomerSummary[] {

  const transactions = getTransactions();

  const groups: Record<string, CustomerSummary> = {};

  transactions.forEach((tx) => {

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

}

// ---- Settings ----

export function getSettings(): CompanySettings {

  const stored = readObject<Partial<CompanySettings>>(KEYS.settings);

  if (!stored) {
    return { ...DEFAULT_SETTINGS };
  }

  return {
    ...DEFAULT_SETTINGS,
    ...stored
  };

}

export function saveSettings(settings: CompanySettings): void {
  writeObject<CompanySettings>(KEYS.settings, settings);
}
