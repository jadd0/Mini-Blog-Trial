export const actions = {
  async sendEmail({ request }) {
    const { name, email, enquiry, recaptchaToken } = await request.json();

    // Verify reCAPTCHA token with Google API
    const verificationResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: process.env.VITE_PUBLIC_RECAPTCHA_SITE_KEY || import.meta.env.VITE_PUBLIC_RECAPTCHA_SITE_KEY,
        response: recaptchaToken,
      }),
    });

    const verificationResult = await verificationResponse.json();

    if (!verificationResult.success) {
      return { status: 400, body: { message: 'reCAPTCHA validation failed' } };
    }

    // If successful, proceed with email sending logic here...
    // For example, using a service like Nodemailer or an external API

    return { status: 200, body: { message: 'Email sent successfully!' } };
  }
};
