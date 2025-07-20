import React from "react";

import "./globals.css";
import Example, { MyNav } from "./nav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="dark:bg-black">
          <MyNav />
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
