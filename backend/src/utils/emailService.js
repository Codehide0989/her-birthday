const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
      html,
    });

    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
};

const sendWelcomeEmail = async (user) => {
  const subject = 'Welcome to StudySphere!';
  const html = `
    <h1>Welcome to StudySphere, ${user.name}!</h1>
    <p>Thank you for joining our learning platform.</p>
    <p>Your 14-day free trial has started. Explore all our premium features!</p>
    <p>Start learning today: <a href="${process.env.FRONTEND_URL}/dashboard">Go to Dashboard</a></p>
  `;
  const text = `Welcome to StudySphere, ${user.name}! Your 14-day trial has started.`;

  return sendEmail({ to: user.email, subject, html, text });
};

const sendTrialEndingEmail = async (user, daysLeft) => {
  const subject = `Your StudySphere trial ends in ${daysLeft} days`;
  const html = `
    <h1>Hi ${user.name},</h1>
    <p>Your free trial will end in ${daysLeft} days.</p>
    <p>Upgrade now to continue accessing all premium features.</p>
    <p><a href="${process.env.FRONTEND_URL}/subscription">View Plans</a></p>
  `;
  const text = `Your trial ends in ${daysLeft} days. Upgrade to continue learning!`;

  return sendEmail({ to: user.email, subject, html, text });
};

const sendSubscriptionConfirmationEmail = async (user, subscription) => {
  const subject = 'Subscription Confirmed - StudySphere';
  const html = `
    <h1>Thank you for subscribing, ${user.name}!</h1>
    <p>Your ${subscription.planType} subscription is now active.</p>
    <p>Next billing date: ${new Date(subscription.currentPeriodEnd).toLocaleDateString()}</p>
    <p><a href="${process.env.FRONTEND_URL}/subscription">Manage Subscription</a></p>
  `;
  const text = `Your ${subscription.planType} subscription is active. Next billing: ${new Date(subscription.currentPeriodEnd).toLocaleDateString()}`;

  return sendEmail({ to: user.email, subject, html, text });
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendTrialEndingEmail,
  sendSubscriptionConfirmationEmail,
};
