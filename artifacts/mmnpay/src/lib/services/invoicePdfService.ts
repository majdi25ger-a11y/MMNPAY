// Reusable invoice PDF generation service.
//
// This is the single place that knows how to render a professional MMNPAY
// invoice document. It is deliberately decoupled from the delivery channel
// (browser download, browser print, or a future server-side email
// attachment) -- `buildInvoicePdfDocument` returns a jsPDF instance that any
// channel can consume: doc.save() for downloads, doc.output("blob") /
// doc.output("arraybuffer") / doc.output("datauristring") for attachments
// or previews.
//
// Callers (pages) never build jsPDF documents themselves -- they gather the
// invoice + organization data (already loaded from Supabase) into an
// `InvoicePdfInput` and hand it to this service.

import jsPDF from "jspdf";
import { APP_NAME } from "@/lib/config";

export interface InvoicePdfOrganization {
  name: string;
  email?: string;
  phone?: string;
  country?: string;
}

export interface InvoicePdfInput {
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  description: string;
  status: string;
  issueDate: string;
  dueDate: string;
  organization: InvoicePdfOrganization;
}

const BRAND_COLOR: [number, number, number] = [99, 91, 255]; // #635bff
const NAVY: [number, number, number] = [10, 37, 64]; // #0a2540
const MUTED: [number, number, number] = [138, 150, 163];

// Builds the branded A4 invoice PDF document and returns the jsPDF
// instance itself so callers decide how to deliver it.
export function buildInvoicePdfDocument(invoice: InvoicePdfInput): jsPDF {

  const doc = new jsPDF({ unit: "mm", format: "a4" });

  const pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 18;

  // Header band: MMNPAY logo/title plus the organization's own identity.
  doc.setFillColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.rect(0, 0, pageWidth, 44, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(APP_NAME, marginX, 15);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("Payments Platform", marginX, 20);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(invoice.organization.name || APP_NAME, marginX, 31);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  const orgContact = [
    invoice.organization.email,
    invoice.organization.phone,
    invoice.organization.country
  ]
    .filter(Boolean)
    .join("  |  ");

  if (orgContact) {
    doc.text(orgContact, marginX, 37);
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("INVOICE", pageWidth - marginX, 17, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(invoice.invoiceNumber || "-", pageWidth - marginX, 25, { align: "right" });

  // Accent rule
  doc.setFillColor(BRAND_COLOR[0], BRAND_COLOR[1], BRAND_COLOR[2]);
  doc.rect(0, 44, pageWidth, 2, "F");

  let cursorY = 62;

  doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Billed To", marginX, cursorY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(invoice.customerName || "Unknown customer", marginX, cursorY + 7);

  doc.setFontSize(9);
  doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
  doc.text(invoice.customerEmail || "-", marginX, cursorY + 13);

  doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Invoice Details", pageWidth - marginX, cursorY, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  const detailLines = [
    `Issue Date: ${invoice.issueDate || "-"}`,
    `Due Date: ${invoice.dueDate || "-"}`,
    `Status: ${invoice.status || "Draft"}`,
    `Currency: ${invoice.currency || "-"}`
  ];

  detailLines.forEach((line, index) => {
    doc.text(line, pageWidth - marginX, cursorY + 7 + index * 5.5, { align: "right" });
  });

  cursorY += 44;

  // Line-items table
  const tableTop = cursorY;
  const tableWidth = pageWidth - marginX * 2;

  doc.setFillColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.rect(marginX, tableTop, tableWidth, 10, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Description", marginX + 4, tableTop + 6.5);
  doc.text("Amount", pageWidth - marginX - 4, tableTop + 6.5, { align: "right" });

  const rowTop = tableTop + 10;
  const rowHeight = 16;

  doc.setFillColor(246, 249, 252);
  doc.rect(marginX, rowTop, tableWidth, rowHeight, "F");

  doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(
    invoice.description || "Services rendered",
    marginX + 4,
    rowTop + 9,
    { maxWidth: tableWidth - 60 }
  );

  const amount = Number(invoice.amount) || 0;

  doc.text(
    `${amount.toFixed(2)} ${invoice.currency}`,
    pageWidth - marginX - 4,
    rowTop + 9,
    { align: "right" }
  );

  let summaryY = rowTop + rowHeight + 12;

  doc.setDrawColor(230, 235, 241);
  doc.line(pageWidth - marginX - 70, summaryY - 6, pageWidth - marginX, summaryY - 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Subtotal", pageWidth - marginX - 70, summaryY);
  doc.text(
    `${amount.toFixed(2)} ${invoice.currency}`,
    pageWidth - marginX,
    summaryY,
    { align: "right" }
  );

  summaryY += 10;

  doc.setFillColor(BRAND_COLOR[0], BRAND_COLOR[1], BRAND_COLOR[2]);
  doc.rect(pageWidth - marginX - 70, summaryY - 6, 70, 12, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Total Due", pageWidth - marginX - 66, summaryY + 2);
  doc.text(
    `${amount.toFixed(2)} ${invoice.currency}`,
    pageWidth - marginX - 4,
    summaryY + 2,
    { align: "right" }
  );

  const footerY = doc.internal.pageSize.getHeight() - 16;

  doc.setDrawColor(230, 235, 241);
  doc.line(marginX, footerY - 8, pageWidth - marginX, footerY - 8);

  doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("Generated by MMNPAY", marginX, footerY);
  doc.text("Thank you for your business.", pageWidth - marginX, footerY, { align: "right" });

  return doc;

}

// Suggests a filename for the given invoice's PDF.
export function getInvoicePdfFilename(invoice: InvoicePdfInput): string {

  return `Invoice-${invoice.invoiceNumber || "MMNPAY"}.pdf`;

}

// Returns the invoice PDF as a Blob. Useful for in-browser previews or
// upload flows that need raw bytes rather than a triggered download.
export function getInvoicePdfBlob(invoice: InvoicePdfInput): Blob {

  const doc = buildInvoicePdfDocument(invoice);

  return doc.output("blob");

}

// Returns the invoice PDF as base64-encoded data (no data-URI prefix).
// This is the shape a future "email this invoice" feature would need to
// attach the PDF to an outgoing message.
export function getInvoicePdfBase64(invoice: InvoicePdfInput): string {

  const doc = buildInvoicePdfDocument(invoice);

  const dataUri = doc.output("datauristring");

  return dataUri.split(",")[1] ?? "";

}

// Triggers a browser download of the invoice PDF.
export function downloadInvoicePdfDocument(invoice: InvoicePdfInput): void {

  const doc = buildInvoicePdfDocument(invoice);

  doc.save(getInvoicePdfFilename(invoice));

}

// Opens the browser's print dialog for a print-ready HTML rendition of the
// same invoice data. Kept as HTML (rather than rendering the PDF binary)
// so it prints crisply at any zoom/DPI, matching the native browser print
// flow instead of an embedded PDF viewer.
export function printInvoiceDocument(invoice: InvoicePdfInput): void {

  const printWindow = window.open("", "_blank", "width=850,height=1100");

  if (!printWindow) {
    window.alert("Please allow pop-ups to print this invoice.");
    return;
  }

  const amount = Number(invoice.amount) || 0;

  const orgContact = [
    invoice.organization.email,
    invoice.organization.phone,
    invoice.organization.country
  ]
    .filter(Boolean)
    .join(" &nbsp;|&nbsp; ");

  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Invoice ${invoice.invoiceNumber || ""}</title>
    <style>
      @page { size: A4; margin: 0; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        color: #0a2540;
      }
      .sheet { padding: 28px 36px 48px; }
      .header {
        background: #0a2540;
        color: #fff;
        margin: -28px -36px 0;
        padding: 22px 36px 20px;
      }
      .header .row { display: flex; justify-content: space-between; align-items: flex-start; }
      .logo { font-size: 20px; font-weight: 700; }
      .logo-tag { font-size: 10px; opacity: 0.7; margin-top: 2px; }
      .company { font-size: 20px; font-weight: 700; margin-top: 10px; }
      .contact { font-size: 12px; margin-top: 6px; opacity: 0.85; }
      .invoice-label { font-size: 18px; font-weight: 700; text-align: right; }
      .invoice-number { font-size: 12px; text-align: right; margin-top: 4px; }
      .accent { height: 4px; background: #635bff; margin: 0 -36px 28px; }
      .meta { display: flex; justify-content: space-between; margin-bottom: 28px; gap: 24px; }
      .meta .block { font-size: 13px; }
      .meta .label { font-size: 11px; letter-spacing: 0.05em; text-transform: uppercase; color: #8a96a3; margin-bottom: 4px; }
      .meta .sub { font-size: 12px; color: #6e7883; margin-top: 2px; }
      .meta .detail-row { font-size: 12px; margin-top: 4px; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
      thead th {
        background: #0a2540;
        color: #fff;
        text-align: left;
        font-size: 12px;
        padding: 10px 12px;
      }
      thead th.amount { text-align: right; }
      tbody td { padding: 14px 12px; background: #f6f9fc; font-size: 13px; }
      tbody td.amount { text-align: right; }
      .summary { display: flex; justify-content: flex-end; }
      .summary-box { width: 260px; }
      .summary .row { display: flex; justify-content: space-between; font-size: 13px; padding: 6px 0; }
      .summary .total {
        background: #635bff;
        color: #fff;
        font-weight: 700;
        font-size: 14px;
        padding: 10px 12px;
        border-radius: 4px;
        margin-top: 6px;
      }
      .footer { margin-top: 40px; font-size: 11px; color: #8a96a3; display: flex; justify-content: space-between; border-top: 1px solid #e6ebf1; padding-top: 12px; }
    </style>
  </head>
  <body>
    <div class="sheet">
      <div class="header">
        <div class="row">
          <div>
            <div class="logo">MMNPAY</div>
            <div class="logo-tag">Payments Platform</div>
            <div class="company">${invoice.organization.name || "MMNPAY"}</div>
            ${orgContact ? `<div class="contact">${orgContact}</div>` : ""}
          </div>
          <div>
            <div class="invoice-label">INVOICE</div>
            <div class="invoice-number">${invoice.invoiceNumber || ""}</div>
          </div>
        </div>
      </div>
      <div class="accent"></div>

      <div class="meta">
        <div class="block">
          <div class="label">Billed To</div>
          <div>${invoice.customerName || "Unknown customer"}</div>
          <div class="sub">${invoice.customerEmail || "-"}</div>
        </div>
        <div class="block" style="text-align:right;">
          <div class="label">Invoice Details</div>
          <div class="detail-row">Issue Date: ${invoice.issueDate || "-"}</div>
          <div class="detail-row">Due Date: ${invoice.dueDate || "-"}</div>
          <div class="detail-row">Status: ${invoice.status || "Draft"}</div>
          <div class="detail-row">Currency: ${invoice.currency || "-"}</div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th class="amount">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${invoice.description || "Services rendered"}</td>
            <td class="amount">${amount.toFixed(2)} ${invoice.currency}</td>
          </tr>
        </tbody>
      </table>

      <div class="summary">
        <div class="summary-box">
          <div class="row"><span>Subtotal</span><span>${amount.toFixed(2)} ${invoice.currency}</span></div>
          <div class="total row"><span>Total Due</span><span>${amount.toFixed(2)} ${invoice.currency}</span></div>
        </div>
      </div>

      <div class="footer">
        <span>Generated by MMNPAY</span>
        <span>Thank you for your business.</span>
      </div>
    </div>
  </body>
</html>`;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();

  printWindow.onload = () => {
    printWindow.focus();
    printWindow.print();
  };

}
