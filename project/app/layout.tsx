 import type { Metadata } from "next";
 import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={'h-full'}
    >
      <body className="min-h-screen h-screen flex flex-col">{children}</body>
    </html>
  );
}
