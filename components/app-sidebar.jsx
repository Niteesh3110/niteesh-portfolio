"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroupLabel,
  SidebarRail,
} from "@/components/ui/sidebar";
import { FaLinkedin } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Chat" },
  { href: "/about-me", label: "About Me" },
  { href: "/projects", label: "Projects" },
  { href: "/experiences", label: "Experiences" },
  { href: "/education", label: "Education" },
  { href: "/resume", label: "Resume" },
  { href: "/schedule", label: "Schedule a Call" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <p className="text-xl font-bold font-main-heading">
              {"Niteesh's Portfolio"}
            </p>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-md lg:text-sm uppercase tracking-wider opacity-60">
            Content
          </SidebarGroupLabel>
          <SidebarMenu className="mt-1 space-y-1">
            {navItems.map(({ href, label }) => (
              <SidebarMenuItem key={href}>
                <Link
                  href={href}
                  className={`nav-link text-lg lg:text-base font-sub-heading inline-block py-1 ${
                    pathname === href ? "nav-link-active" : ""
                  }`}
                >
                  {label}
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarGroupLabel className="text-md lg:text-sm uppercase tracking-wider opacity-60">
            Socials
          </SidebarGroupLabel>
          <SidebarMenuItem className="flex w-full h-full justify-start gap-5 pt-1">
            <Link
              href="https://github.com/Niteesh3110"
              className="transition-all duration-200 hover:text-focus-dark hover:scale-110"
            >
              <FaGithub className="text-2xl lg:text-xl" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/niteesh-panchal/"
              className="transition-all duration-200 hover:text-focus-dark hover:scale-110"
            >
              <FaLinkedin className="text-2xl lg:text-xl" />
            </Link>
            <a
              href="mailto:niteeshpanchal@gmail.com?subject=Portfolio Inquiry&body=Hi Niteesh, I saw your portfolio and wanted to connect."
              className="transition-all duration-200 hover:text-focus-dark hover:scale-110"
            >
              <SiGmail className="text-2xl lg:text-xl" />
            </a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
