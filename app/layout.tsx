import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import AuthProvider from "../components/AuthProvider/AuthProvider";

const roboto = Roboto({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});
export const metadata: Metadata = {
  title: "NoteHub",
  description: "A simple and efficient app for managing personal notes",
  openGraph: {
    title: "NoteHub",
    description: "A simple and efficient app for managing personal notes",
    url: "https://notehub.com/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub preview image",
      },
    ],
  },
};
export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
            {modal}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
