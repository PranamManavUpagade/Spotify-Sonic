import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";

export const metadata: Metadata = {
  title: "Spotify Sonic",
  description: "AI-Native Music Discovery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen w-screen overflow-hidden flex flex-col bg-black text-white selection:bg-[#1DB954] selection:text-black">
        <div className="flex flex-1 overflow-hidden p-2 gap-2 pb-0">
          {/* Sidebar */}
          <Sidebar />
          
          {/* Main Content */}
          <main className="flex-1 bg-[#121212] rounded-lg overflow-hidden relative flex flex-col">
            {children}
          </main>
        </div>
        
        {/* Bottom Player */}
        <Player />
      </body>
    </html>
  );
}
