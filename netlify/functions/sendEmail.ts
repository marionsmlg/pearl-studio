import { Handler } from '@netlify/functions';
import * as nodemailer from 'nodemailer';

const handler: Handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { industry, goal, scope, existing, email } = JSON.parse(event.body || '{}');

    // Validation
    if (!email || !industry || !goal) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // HTML email template with Pearl style
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background-color: #F8F9FA;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #FFFFFF;
      border-radius: 2px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
    }
    .header {
      background: linear-gradient(135deg, #F0EDF4 0%, #EEF0F5 50%, #F2EEF3 100%);
      padding: 48px 40px;
      text-align: center;
      border-bottom: 1px solid rgba(108, 117, 125, 0.1);
    }
    .header h1 {
      margin: 0;
      font-size: 32px;
      font-weight: 700;
      letter-spacing: 0.15em;
      color: #2D3748;
    }
    .header p {
      margin: 12px 0 0;
      font-size: 14px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #718096;
    }
    .content {
      padding: 40px;
    }
    .field {
      margin-bottom: 32px;
      border-bottom: 1px solid rgba(108, 117, 125, 0.08);
      padding-bottom: 20px;
    }
    .field:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }
    .field-label {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #718096;
      margin-bottom: 8px;
    }
    .field-value {
      font-size: 18px;
      font-weight: 300;
      line-height: 1.6;
      color: #2D3748;
      margin: 0;
    }
    .footer {
      padding: 32px 40px;
      background: #F8F9FA;
      text-align: center;
      border-top: 1px solid rgba(108, 117, 125, 0.1);
    }
    .footer p {
      margin: 0;
      font-size: 12px;
      color: #A0AEC0;
      line-height: 1.5;
    }
    .email-contact {
      color: #2D3748;
      text-decoration: none;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>PEARL</h1>
      <p>New Project Request</p>
    </div>

    <!-- Content -->
    <div class="content">
      <div class="field">
        <div class="field-label">Industry</div>
        <p class="field-value">${industry}</p>
      </div>

      <div class="field">
        <div class="field-label">Project Goal</div>
        <p class="field-value">${goal}</p>
      </div>

      <div class="field">
        <div class="field-label">Scope</div>
        <p class="field-value">${scope}</p>
      </div>

      <div class="field">
        <div class="field-label">Current Status</div>
        <p class="field-value">${existing}</p>
      </div>

      <div class="field">
        <div class="field-label">Contact Email</div>
        <p class="field-value">
          <a href="mailto:${email}" class="email-contact">${email}</a>
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>This message was sent from pearl-agency.com contact form</p>
      <p style="margin-top: 8px;">© ${new Date().getFullYear()} Pearl Studio</p>
    </div>
  </div>
</body>
</html>
    `;

    // Send email
    await transporter.sendMail({
      from: `"Pearl Studio" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `New Project Request from ${email}`,
      html: htmlContent,
      text: `
New Project Request

Industry: ${industry}
Goal: ${goal}
Scope: ${scope}
Current Status: ${existing}
Contact: ${email}
      `,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('Email error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};

export { handler };
