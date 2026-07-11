// Repository for payment records. This is the single place that knows how
// a "payment" is created, looked up, updated, and removed -- it delegates
// all actual persistence to src/lib/storage.ts rather than touching
// localStorage directly.

import {
  Payment,
  getPayments,
  savePayments,
  getPaymentById,
  savePaymentRecord
} from "@/lib/storage";

function generatePaymentId(): string {
  return "MMN" + Date.now();
}

// Explicit shape for creating a payment, rather than deriving it from the
// Payment interface's index signature (which trips up structural checks
// when spread back into a Payment-typed object).
interface NewPaymentInput {
  id?: string;
  invoiceId?: string;
  merchant: string;
  amount: number | string;
  description?: string;
  currency: string;
  status: string;
  createdAt?: string;
}

// Returns every payment in the "payments" list.
export function getAll(): Payment[] {
  return getPayments();
}

// Looks up a single payment by id, checking both the "payments" list and
// the per-id "payment_<id>" record (via storage.ts).
export function getById(id: string): Payment | null {
  return getPaymentById(id);
}

// Creates a new payment. If no id is supplied, one is generated. The
// payment is appended to the "payments" list and also saved under its own
// "payment_<id>" key, matching how the rest of the app stores payments.
export function create(payment: NewPaymentInput): Payment {

  const newPayment: Payment = {
    ...payment,
    id: payment.id || generatePaymentId()
  };

  const payments = getPayments();

  payments.push(newPayment);

  savePayments(payments);
  savePaymentRecord(newPayment);

  return newPayment;

}

// Updates an existing payment by id with a partial set of fields. Returns
// the updated payment, or null if no payment with that id exists.
export function update(id: string, changes: Partial<Payment>): Payment | null {

  const payments = getPayments();

  const index = payments.findIndex(
    (item) => String(item.id) === String(id)
  );

  if (index === -1) {
    return null;
  }

  const updatedPayment: Payment = {
    ...payments[index],
    ...changes,
    id: payments[index].id
  };

  const updatedPayments = payments.map((item, i) =>
    i === index ? updatedPayment : item
  );

  savePayments(updatedPayments);
  savePaymentRecord(updatedPayment);

  return updatedPayment;

}

// Removes a payment by id from the "payments" list. Returns true if a
// payment was found and removed, false otherwise.
export function remove(id: string): boolean {

  const payments = getPayments();

  const filtered = payments.filter(
    (item) => String(item.id) !== String(id)
  );

  if (filtered.length === payments.length) {
    return false;
  }

  savePayments(filtered);

  return true;

}
