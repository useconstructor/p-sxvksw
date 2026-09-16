import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marisol | Modern Mexican Kitchen",
  description: "Fresh tacos, burritos, aguas frescas, and Mexican desserts made with heart.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
