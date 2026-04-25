import "./globals.css";

export const metadata = {
  title: "Twassel - Student Community",
  description: "Connect and share with your peers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}