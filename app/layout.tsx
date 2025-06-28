import React from "react";

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="dark:bg-black">
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
