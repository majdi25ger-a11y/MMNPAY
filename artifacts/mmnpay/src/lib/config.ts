// Central configuration for MMNPAY. Keeps app-wide constants (name,
// version, default currency) and the canonical set of localStorage keys
// in one place, so other modules can reference them instead of
// hardcoding strings.

export const APP_NAME = "MMNPAY";

export const APP_VERSION = "1.0.0-beta";

export const DEFAULT_CURRENCY = "EUR";

export interface StorageKeys {
  users: string;
  currentUser: string;
  organization: string;
  settings: string;
  invoices: string;
  payments: string;
  transactions: string;
  paymentProvider: string;
}

export const STORAGE_KEYS: StorageKeys = {
  users: "users",
  currentUser: "currentUser",
  organization: "organization",
  settings: "settings",
  invoices: "invoices",
  payments: "payments",
  transactions: "transactions",
  paymentProvider: "paymentProvider"
};
