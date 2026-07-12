// Invoice export helpers: generates a professional A4 invoice PDF and a
// print-friendly invoice document, both branded with the merchant's company
// settings (falling back to MMNPAY defaults when settings are empty).
//
// These helpers are purely presentational -- they read existing invoice /
// settings data and never mutate localStorage or invoice status.

import jsPDF from "jspdf";
import { getSettings } from "@/lib/storage";
import { APP_NAME } from "@/lib/config";

export interface ExportableInvoice {
  invoiceNumber: string;
  customerName: string;
  amount: number;
  currency: string;
  description: string;
  status: string;
  dueDate: string;
}

interface InvoiceBranding {
  companyName: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  primaryColor: string;
  vatEnabled: boolean;
  vatPercentage: string;
}

function getBranding(): InvoiceBranding {

  const settings = getSettings();

  return {
    companyName: settings.companyName || APP_NAME,
    email: settings.email || "",
    phone: settings.phone || "",
    website: settings.website || "",
    address: settings.address || "",
    primaryColor: settings.primaryColor || "#635bff",
    vatEnabled: Boolean(settings.vatEnabled),
    vatPercentage: settings.vatPercentage || "0"
  };

}

function hexToRgb(hex: string): [number, number, number] {

  const normalized = hex.replace("#", "");

  const bigint = parseInt(normalized.length === 3
    ? normalized.split("").map((c) => c + c).join("")
    : normalized, 16);

  if (isNaN(bigint)) {
    return [99, 91, 255];
  }

  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];

}

function computeTotals(invoice: ExportableInvoice, branding: InvoiceBranding) {

  const subtotal = Number(invoice.amount) || 0;

  const vatRate = branding.vatEnabled ? (Number(branding.vatPercentage) || 0) / 100 : 0;

  const vatAmount = subtotal * vatRate;

  const total = subtotal + vatAmount;

  return { subtotal, vatRate, vatAmount, total };

}

// Builds the branded A4 PDF document for a single invoice and returns the
// jsPDF instance (caller decides whether to save() or open it).
function buildInvoicePdf(invoice: ExportableInvoice): jsPDF {

  const branding = getBranding();

  const [r, g, b] = hexToRgb(branding.primaryColor);

  const navy: [number, number, number] = [10, 37, 64];

  const doc = new jsPDF({ unit: "mm", format: "a4" });

  const pageWidth = doc.internal.pageSize.getWidth();

  const marginX = 18;

  // Header band
  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.rect(0, 0, pageWidth, 38, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(branding.companyName, marginX, 22);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const contactLine = [branding.email, branding.phone, branding.website]
    .filter(Boolean)
    .join("  |  ");

  if (contactLine) {
    doc.text(contactLine, marginX, 30);
  }

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", pageWidth - marginX, 22, { align: "right" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(invoice.invoiceNumber || "-", pageWidth - marginX, 30, { align: "right" });

  // Accent rule
  doc.setFillColor(r, g, b);
  doc.rect(0, 38, pageWidth, 2, "F");

  let cursorY = 54;

  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Billed To", marginX, cursorY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(invoice.customerName || "Unknown customer", marginX, cursorY + 7);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Status", pageWidth - marginX, cursorY, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.text(invoice.status || "Draft", pageWidth - marginX, cursorY + 7, { align: "right" });

  cursorY += 20;

  doc.setFont("helvetica", "bold");
  doc.text("Due Date", pageWidth - marginX, cursorY, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.text(invoice.dueDate || "-", pageWidth - marginX, cursorY + 7, { align: "right" });

  if (branding.address) {
    doc.setFont("helvetica", "bold");
    doc.text("From", marginX, cursorY);
    doc.setFont("helvetica", "normal");
    doc.text(branding.address, marginX, cursorY + 7, { maxWidth: 90 });
  }

  cursorY += 24;

  // Line-items table
  const tableTop = cursorY;
  const tableWidth = pageWidth - marginX * 2;

  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.rect(marginX, tableTop, tableWidth, 10, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Description", marginX + 4, tableTop + 6.5);
  doc.text("Amount", pageWidth - marginX - 4, tableTop + 6.5, { align: "right" });

  const rowTop = tableTop + 10;
  const rowHeight = 14;

  doc.setFillColor(246, 249, 252);
  doc.rect(marginX, rowTop, tableWidth, rowHeight, "F");

  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(invoice.description || "Services rendered", marginX + 4, rowTop + 9, { maxWidth: tableWidth - 60 });

  const { subtotal, vatRate, vatAmount, total } = computeTotals(invoice, branding);

  doc.text(
    `${subtotal.toFixed(2)} ${invoice.currency}`,
    pageWidth - marginX - 4,
    rowTop + 9,
    { align: "right" }
  );

  let summaryY = rowTop + rowHeight + 10;

  doc.setDrawColor(230, 235, 241);
  doc.line(pageWidth - marginX - 70, summaryY - 6, pageWidth - marginX, summaryY - 6);

  doc.setFont("helvetica", "normal");
  doc.text("Subtotal", pageWidth - marginX - 70, summaryY);
  doc.text(`${subtotal.toFixed(2)} ${invoice.currency}`, pageWidth - marginX, summaryY, { align: "right" });

  if (branding.vatEnabled) {
    summaryY += 7;
    doc.text(`VAT (${(vatRate * 100).toFixed(1)}%)`, pageWidth - marginX - 70, summaryY);
    doc.text(`${vatAmount.toFixed(2)} ${invoice.currency}`, pageWidth - marginX, summaryY, { align: "right" });
  }

  summaryY += 10;

  doc.setFillColor(r, g, b);
  doc.rect(pageWidth - marginX - 70, summaryY - 6, 70, 12, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Total Due", pageWidth - marginX - 66, summaryY + 2);
  doc.text(`${total.toFixed(2)} ${invoice.currency}`, pageWidth - marginX - 4, summaryY + 2, { align: "right" });

  const footerY = doc.internal.pageSize.getHeight() - 20;

  doc.setTextColor(160, 170, 180);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(
    `Generated by ${branding.companyName === APP_NAME ? APP_NAME : `${branding.companyName} via ${APP_NAME}`}`,
    marginX,
    footerY
  );

  doc.text("Thank you for your business.", pageWidth - marginX, footerY, { align: "right" });

  return doc;

}

// Triggers a browser download of the branded invoice PDF.
export function downloadInvoicePdf(invoice: ExportableInvoice): void {

  const doc = buildInvoicePdf(invoice);

  const filename = `Invoice-${invoice.invoiceNumber || "MMNPAY"}.pdf`;

  doc.save(filename);

}

// Builds a standalone, print-ready HTML document for the invoice and opens
// the browser print dialog for it in a new window, leaving the current page
// untouched.
export function printInvoice(invoice: ExportableInvoice): void {

  const branding = getBranding();

  const { subtotal, vatRate, vatAmount, total } = computeTotals(invoice, branding);

  const printWindow = window.open("", "_blank", "width=850,height=1100");

  if (!printWindow) {
    window.alert("Please allow pop-ups to print this invoice.");
    return;
  }

  const vatRow = branding.vatEnabled
    ? `<div class="row"><span>VAT (${(vatRate * 100).toFixed(1)}%)</span><span>${vatAmount.toFixed(2)} ${invoice.currency}</span></div>`
    : "";

  const contactLine = [branding.email, branding.phone, branding.website]
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
        padding: 28px 36px 20px;
      }
      .header .row { display: flex; justify-content: space-between; align-items: flex-start; }
      .company { font-size: 26px; font-weight: 700; }
      .contact { font-size: 12px; margin-top: 6px; opacity: 0.85; }
      .invoice-label { font-size: 18px; font-weight: 700; text-align: right; }
      .invoice-number { font-size: 12px; text-align: right; margin-top: 4px; }
      .accent { height: 4px; background: ${branding.primaryColor}; margin: 0 -36px 28px; }
      .meta { display: flex; justify-content: space-between; margin-bottom: 28px; gap: 24px; }
      .meta .block { font-size: 13px; }
      .meta .label { font-size: 11px; letter-spacing: 0.05em; text-transform: uppercase; color: #8a96a3; margin-bottom: 4px; }
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
        background: ${branding.primaryColor};
        color: #fff;
        font-weight: 700;
        font-size: 14px;
        padding: 10px 12px;
        border-radius: 4px;
        margin-top: 6px;
      }
      .status {
        display: inline-block;
        padding: 3px 10px;
        border-radius: 999px;
        background: rgba(255,255,255,0.15);
        font-size: 12px;
      }
      .footer { margin-top: 40px; font-size: 11px; color: #8a96a3; display: flex; justify-content: space-between; }
    </style>
  </head>
  <body>
    <div class="sheet">
      <div class="header">
        <div class="row">
          <div>
            <div class="company">${branding.companyName}</div>
            ${contactLine ? `<div class="contact">${contactLine}</div>` : ""}
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
          ${branding.address ? `<div class="label" style="margin-top:10px;">From</div><div>${branding.address}</div>` : ""}
        </div>
        <div class="block" style="text-align:right;">
          <div class="label">Status</div>
          <div>${invoice.status || "Draft"}</div>
          <div class="label" style="margin-top:10px;">Due Date</div>
          <div>${invoice.dueDate || "-"}</div>
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
            <td class="amount">${subtotal.toFixed(2)} ${invoice.currency}</td>
          </tr>
        </tbody>
      </table>

      <div class="summary">
        <div class="summary-box">
          <div class="row"><span>Subtotal</span><span>${subtotal.toFixed(2)} ${invoice.currency}</span></div>
          ${vatRow}
          <div class="total row"><span>Total Due</span><span>${total.toFixed(2)} ${invoice.currency}</span></div>
        </div>
      </div>

      <div class="footer">
        <span>Generated by ${branding.companyName === APP_NAME ? APP_NAME : `${branding.companyName} via ${APP_NAME}`}</span>
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
