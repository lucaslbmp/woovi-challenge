import type { Metadata } from "next";
import PaymentDetailsPage from "./component";
import PaymentContextProvider from "@/contexts/global-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <PaymentContextProvider>
      <PaymentDetailsPage>{children}</PaymentDetailsPage>
      </PaymentContextProvider>
    </>
  );
}
