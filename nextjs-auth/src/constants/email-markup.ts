interface markupProps  {
   emailType : string,
   Url : string
}

export const markup = ({emailType, Url} : markupProps) => {
    const html = `
    <html>
       <head>
          <style>
             body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                margin: 0;
                padding: 0;
             }
             .container {
                max-width: 600px;
                margin: 50px auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
             }
             h1 {
                color: #4CAF50;
             }
             p {
                font-size: 16px;
                line-height: 1.5;
             }
             .btn {
                display: inline-block;
                background-color: #4CAF50;
                color: white;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
             }
             .footer {
                margin-top: 20px;
                text-align: center;
                font-size: 12px;
                color: #888;
             }
          </style>
       </head>
       <body>
          <div class="container">
             <h1>${emailType === "VERIFY" ? "Verify your email" : "reset Your Password"}</h1>
             <p>Hello,</p>
             <p>${emailType === "VERIFY" ? "Thank you for registering with us! Please click the button below to verify your email address and activate your account"
              : "click  the link below to reset your password"}</p>
             <p style="text-align: center;">
                <a href="${Url}" class="btn">${emailType === "VERIFY" ? "verify" : "Reset Password"}</a>
             </p>
             <p>If you did not sign up for an account, you can safely ignore this email.</p>
             <p>Thank you!</p>
             <div class="footer">
                <p>&copy; 2024 Your Company Name. All rights reserved.</p>
             </div>
          </div>
       </body>
    </html>
    `;
    return html;
 }

 