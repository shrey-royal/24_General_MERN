import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendMail = async({ to, subject, html }) => {
    const info = await transporter.sendMail({
        from: `"${process.env.EMAIL_FROM_NAME || "Multivendor Store"}" <${process.env.EMAIL_FROM_EMAIL || process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    });
    return info;
};