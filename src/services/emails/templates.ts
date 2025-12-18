export const buildEmailTemplate = ({
  title,
  content,
  buttonText,
  buttonUrl,
  image,
  previewText,
  accentColor = "#e67e22",
}: {
  title: string;
  content: string;
  buttonText?: string;
  buttonUrl?: string;
  image?: string;
  previewText?: string;
  accentColor?: string;
}) => {

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : "230,126,34";
  };

  const adjustBrightness = (hex: string, percent: number): string => {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (
      0x1000000 +
      (R < 255 ? R < 0 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 0 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 0 ? 0 : B : 255)
    ).toString(16).slice(1);
  };

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <style>
      /* Reset */
      body, html { margin:0; padding:0; width:100%; background:#f8fafc; font-family: Arial, sans-serif; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
      img { border:0; display:block; line-height:100%; outline:none; text-decoration:none; }
      a { text-decoration:none; }
      table { border-collapse:collapse !important; }

      /* Container */
      .email-container { max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; }

      /* Header */
      .email-header { background:${accentColor}; text-align:center; padding:28px 20px; }
      .email-header h2 { color:#ffffff; font-size:24px; margin:0; font-weight:bold; }
      .email-header img { width:120px; height:auto; margin-bottom:12px; }

      /* Hero Image */
      .email-image { width:100%; max-height:280px; object-fit:cover; display:block; }

      /* Body */
      .email-body { padding:32px 24px; color:#475569; font-size:16px; line-height:1.6; }
      .email-body h1 { color:#0f172a; font-size:22px; margin-bottom:20px; font-weight:bold; }
      .email-body p { margin-bottom:16px; }

      /* Button */
      .cta-button {
        display:inline-block;
        background:${accentColor};
        color:#ffffff;
        padding:14px 28px;
        border-radius:8px;
        font-weight:bold;
        font-size:16px;
        text-decoration:none;
        margin-top:20px;
      }
      .cta-button:hover { background:${adjustBrightness(accentColor, -15)}; }

      /* Footer */
      .email-footer { background:#f8fafc; text-align:center; padding:24px 20px; font-size:12px; color:#64748b; }
      .email-footer a { color:${accentColor}; text-decoration:none; margin:0 6px; font-weight:500; }
      .social-links a { margin:0 6px; font-size:13px; color:#64748b; text-decoration:none; }

      /* Responsive */
      @media screen and (max-width:600px){
        .email-body { padding:24px 16px; }
        .cta-button { display:block; width:100%; text-align:center; }
      }
    </style>
  </head>
  <body>
    <span style="display:none;font-size:1px;color:#fff;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${previewText || ''}</span>
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center">
          <table class="email-container" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td class="email-header">
                <img src="${process.env.FRONTEND_URL}/main-logo.svg" alt="Jinua Hanji Trading LTD Logo" />
                <h2>${title}</h2>
              </td>
            </tr>

            ${image ? `<tr><td><img src="${image}" alt="Banner" class="email-image" /></td></tr>` : ''}

            <tr>
              <td class="email-body">
                ${content.split('\n').map(p => `<p>${p}</p>`).join('')}
                ${buttonText && buttonUrl ? `<p style="text-align:center;"><a href="${buttonUrl}" class="cta-button" target="_blank">${buttonText}</a></p>` : ''}
              </td>
            </tr>

            <tr>
              <td class="email-footer">
                <div class="social-links">
                  <a href="#">Instagram</a> | <a href="#">Facebook</a> | <a href="#">Twitter</a> | <a href="#">Pinterest</a>
                </div>
                <div style="margin:12px 0;">
                  <a href="${process.env.FRONTEND_URL}/contact">Contact Us</a> |
                  <a href="${process.env.FRONTEND_URL}/help">Help Center</a> |
                  <a href="${process.env.FRONTEND_URL}/unsubscribe">Unsubscribe</a> |
                  <a href="${process.env.FRONTEND_URL}/privacy">Privacy Policy</a>
                </div>
                <p style="margin-top:8px;">© ${new Date().getFullYear()} Jinua Hanji Trading LTD. All rights reserved.</p>
                <p><small>123 Art Street, Creative City, CA 94107</small></p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};
