import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mia Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r flex flex-col p-4 gap-4">
          <h1 className="text-xl font-bold mb-6 text-blue-600">MyDash</h1>
          <nav className="flex flex-col gap-2">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded">Home</Link>
            <Link href="/profilo" className="p-2 hover:bg-gray-100 rounded">Profilo</Link>
            <Link href="/impostazioni" className="p-2 hover:bg-gray-100 rounded">Impostazioni</Link>
          </nav>
        </aside>

        {/* Contenuto Principale */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}