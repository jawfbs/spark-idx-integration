import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail(options: EmailOptions) {
  try {
    await transporter.sendMail({
      from: `"${process.env.NEXT_PUBLIC_SITE_NAME}" <${process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
    });
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error };
  }
}

// ============================================
// EMAIL TEMPLATES
// ============================================

export function leadNotificationEmail(lead: {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  mlsNumber?: string;
  source: string;
}) {
  return {
    subject: `New Lead: ${lead.name} - ${lead.source}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1e40af; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .body { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
          .field { margin-bottom: 12px; }
          .label { font-weight: bold; color: #6b7280; font-size: 12px; text-transform: uppercase; }
          .value { font-size: 16px; margin-top: 4px; }
          .footer { text-align: center; padding: 20px; color: #9ca3af; font-size: 12px; }
          .btn { display: inline-block; background: #1e40af; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-top: 16px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin:0">🔥 New Lead Received</h2>
            <p style="margin:4px 0 0;opacity:0.8">Source: ${lead.source}</p>
          </div>
          <div class="body">
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${lead.name}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${lead.email}">${lead.email}</a></div>
            </div>
            ${lead.phone ? `
            <div class="field">
              <div class="label">Phone</div>
              <div class="value"><a href="tel:${lead.phone}">${lead.phone}</a></div>
            </div>` : ''}
            ${lead.mlsNumber ? `
            <div class="field">
              <div class="label">Listing MLS#</div>
              <div class="value">${lead.mlsNumber}</div>
            </div>` : ''}
            ${lead.message ? `
            <div class="field">
              <div class="label">Message</div>
              <div class="value">${lead.message}</div>
            </div>` : ''}
            <a href="mailto:${lead.email}" class="btn">Reply to Lead</a>
          </div>
          <div class="footer">
            ${process.env.NEXT_PUBLIC_SITE_NAME} Lead Notification
          </div>
        </div>
      </body>
      </html>
    `,
  };
}

export function showingRequestEmail(data: {
  name: string;
  email: string;
  phone?: string;
  mlsNumber: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
}) {
  return {
    subject: `Showing Request: MLS# ${data.mlsNumber}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #059669; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .body { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
          .field { margin-bottom: 12px; }
          .label { font-weight: bold; color: #6b7280; font-size: 12px; text-transform: uppercase; }
          .value { font-size: 16px; margin-top: 4px; }
          .btn { display: inline-block; background: #059669; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-top: 16px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin:0">🏠 Showing Request</h2>
            <p style="margin:4px 0 0;opacity:0.8">MLS# ${data.mlsNumber}</p>
          </div>
          <div class="body">
            <div class="field">
              <div class="label">Client</div>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            ${data.phone ? `
            <div class="field">
              <div class="label">Phone</div>
              <div class="value">${data.phone}</div>
            </div>` : ''}
            <div class="field">
              <div class="label">Preferred Date</div>
              <div class="value">${data.preferredDate}</div>
            </div>
            <div class="field">
              <div class="label">Preferred Time</div>
              <div class="value">${data.preferredTime}</div>
            </div>
            ${data.message ? `
            <div class="field">
              <div class="label">Notes</div>
              <div class="value">${data.message}</div>
            </div>` : ''}
            <a href="mailto:${data.email}?subject=Showing Confirmation - MLS# ${data.mlsNumber}" class="btn">Confirm Showing</a>
          </div>
        </div>
      </body>
      </html>
    `,
  };
}

export function savedSearchAlertEmail(data: {
  userName: string;
  searchName: string;
  listings: { mlsNumber: string; address: string; price: string; photo: string; beds: number; baths: number }[];
  searchUrl: string;
}) {
  const listingCards = data.listings.map(l => `
    <div style="display:flex;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:12px;">
      <img src="${l.photo}" width="120" height="90" style="object-fit:cover;" />
      <div style="padding:12px;">
        <div style="font-weight:bold;font-size:16px;">${l.price}</div>
        <div style="color:#6b7280;font-size:14px;">${l.address}</div>
        <div style="color:#6b7280;font-size:13px;">${l.beds} bed · ${l.baths} bath</div>
      </div>
    </div>
  `).join('');

  return {
    subject: `New Listings Match: ${data.searchName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family:Arial,sans-serif;line-height:1.6;color:#333;margin:0;padding:0;">
        <div style="max-width:600px;margin:0 auto;padding:20px;">
          <h2>Hi ${data.userName},</h2>
          <p>New listings match your saved search <strong>"${data.searchName}"</strong>:</p>
          ${listingCards}
          <a href="${data.searchUrl}" style="display:inline-block;background:#1e40af;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;margin-top:16px;">View All Results</a>
          <p style="color:#9ca3af;font-size:12px;margin-top:24px;">
            You're receiving this because you saved a search on ${process.env.NEXT_PUBLIC_SITE_NAME}.
          </p>
        </div>
      </body>
      </html>
    `,
  };
}
