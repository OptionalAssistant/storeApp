import type { Metadata } from "next";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./_components/Header";
import { Container } from "react-bootstrap";

export const metadata: Metadata = {
  title: "Simple store app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Container className="container">
          <Header />
          {children}
        </Container>
      </body>
    </html>
  );
}
