import React from "react";

import "./globals.css";
import { MyNav } from "./nav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark bg-slate-900">
      <body>
        <div className="bg-slate-900">
          <MyNav />
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
