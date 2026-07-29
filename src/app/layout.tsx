import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Sidebar from "../components/sidebar";
import { createClient } from "../utils/supabase/client";
import "@fortawesome/fontawesome-svg-core/styles.css";


config.autoAddCss = false;

const supabase = createClient();

const { data: projects } = await supabase.from("projects").select("*");

const { data: components } = await supabase.from("components").select("*");

const _projectsCount = projects?.length || 0;
const _componentsCount = components?.length || 0;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bench",
  description: "Application made for makers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950">
        <Sidebar />
        <div className="pt-16 md:pt-0 md:ml-64 flex-1">{children}</div>
      </body>
    </html>
  );
}
