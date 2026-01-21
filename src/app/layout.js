import "./globals.css";
import Sidebar from "@/app/components/Sidebar";
import Navbar from "@/app/components/Navbar";

export const metadata = {
  title: "Midson OGS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0B0F1A] text-white">
        <div className="flex h-screen overflow-hidden">

          <Sidebar />

          <div className="flex flex-col flex-1">
            <Navbar />
            <main className="flex-1 overflow-y-auto p-8 bg-[#0B0F1A]">
              {children}
            </main>
          </div>

        </div>
      </body>
    </html>
  );
}
