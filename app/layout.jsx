import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "sonner";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#174d38",
};

const SITE_URL = "https://niteesh-portfolio-tan.vercel.app";
const DESCRIPTION =
  "Niteesh Panchal is a full-stack software engineer at HOS Management building multi-tenant platforms with Next.js, React, TypeScript, PostgreSQL, and Google Cloud. Ask his AI assistant anything about his work, projects, and experience.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Niteesh Panchal | Software Engineer",
    template: "%s | Niteesh Panchal",
  },
  description: DESCRIPTION,
  applicationName: "Niteesh Panchal Portfolio",
  authors: [{ name: "Niteesh Panchal", url: SITE_URL }],
  creator: "Niteesh Panchal",
  keywords: [
    "Niteesh Panchal",
    "Software Engineer",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "PostgreSQL",
    "Portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Niteesh Panchal",
    title: "Niteesh Panchal | Software Engineer",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Niteesh Panchal | Software Engineer",
    description: DESCRIPTION,
  },
};

const googleSans = localFont({
  src: "../public/fonts/Google_Sans/GoogleSans-Regular.ttf",
  variable: "--font-google-sans",
  weight: "400",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${googleSans.variable} ${poppins.variable} h-screen bg-main-dark overflow-x-hidden`}
      >
        {/* Subtle grain overlay for depth (sits behind content, above bg) */}
        <div aria-hidden="true" className="grain-overlay" />

        <TooltipProvider>
          <SidebarProvider>
            <div className="flex h-dvh w-full [--sidebar-width:200px]">
              <AppSidebar />

              <main
                className="
                  flex flex-1 flex-col min-w-0
                  transition-[margin-left] duration-200 ease-out
                  group-data-[state=expanded]:ml-[--sidebar-width]
                "
              >
                <div className="z-20 border-b bg-main-dark shrink-0 h-auto">
                  <SidebarTrigger
                    className="static top-auto right-auto left-auto text-accent-dark hover:bg-main-dark hover:text-accent-dark hover:cursor-pointer"
                    iconClassName={"size-5 xl:size-6 2xl:size-7"}
                  />
                </div>

                <Toaster />

                <div className="mx-auto w-full min-w-0 max-w-5xl flex-1 min-h-0 overflow-x-hidden overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {children}
                </div>
              </main>
            </div>
          </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
