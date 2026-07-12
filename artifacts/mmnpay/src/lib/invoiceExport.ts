// Thin invoice export adapter used by pages. Maps the page-level invoice
// (already loaded from Supabase) and its organization into the reusable
// `invoicePdfService` input shape, then delegates the actual PDF/print
// rendering to that service. Pages never build jsPDF documents themselves.

import * as invoicePdfService from "@/lib/services/invoicePdfService";
import type { InvoicePdfOrganization } from "@/lib/services/invoicePdfService";

export interface ExportableInvoice {
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  description: string;
  status: string;
  issueDate: string;
  dueDate: string;
}

export type ExportableOrganization = InvoicePdfOrganization;

function toPdfInput(
  invoice: ExportableInvoice,
  organization: ExportableOrganization
) {

  return {
    invoiceNumber: invoice.invoiceNumber,
    customerName: invoice.customerName,
    customerEmail: invoice.customerEmail,
    amount: invoice.amount,
    currency: invoice.currency,
    description: invoice.description,
    status: invoice.status,
    issueDate: invoice.issueDate,
    dueDate: invoice.dueDate,
    organization
  };

}

// Triggers a browser download of the branded invoice PDF.
export function downloadInvoicePdf(
  invoice: ExportableInvoice,
  organization: ExportableOrganization
): void {

  invoicePdfService.downloadInvoicePdfDocument(
    toPdfInput(invoice, organization)
  );

}

// Opens the browser print dialog for a print-ready invoice document.
export function printInvoice(
  invoice: ExportableInvoice,
  organization: ExportableOrganization
): void {

  invoicePdfService.printInvoiceDocument(
    toPdfInput(invoice, organization)
  );

}
