"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Layers,
  Gavel,
  Receipt,
  BookOpen,
  Vault,
} from "lucide-react";

const menu = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Clients", path: "/clients", icon: Users },
  { name: "Groups", path: "/groups", icon: Layers },
  { name: "Auctions", path: "/auctions", icon: Gavel },
  { name: "Vouchers", path: "/vouchers", icon: Receipt },
  { name: "Ledgers", path: "/ledgers", icon: BookOpen },
  { name: "Treasury", path: "/treasury", icon: Vault },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="relative w-72 h-screen overflow-hidden bg-[#070B16] border-r border-white/10">
      {/* === AMBIENT GRAPHICS === */}
      <motion.div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full 
                   bg-gradient-to-br from-blue-600/30 to-orange-500/20 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* === BRAND HEADER === */}
      <div className="relative z-10 px-7 py-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          {/* Logo container */}
          <div className="relative">
            <div
              className="
          h-14 w-14 rounded-2xl
          bg-gradient-to-br from-[#111827] to-[#0B1220]
          border border-white/10
          flex items-center justify-center
          shadow-lg
          overflow-hidden
        "
            >
              <Image
                src="/logo.png"
                alt="Organized Grouping System"
                width={120}
                height={120}
                priority
                className="scale-[1.35] transition-transform group-hover:scale-[1.45]"

              />
            </div>

            {/* Accent dot */}
            <span
              className="
          absolute -right-1 -bottom-1
          h-3 w-3 rounded-full
          bg-gradient-to-r from-blue-500 to-orange-500
        "
            />
          </div>

          {/* Brand Text */}
          <div className="leading-tight">
            <h1 className="text-base font-semibold tracking-wide">Organized</h1>
            <p className="text-[11px] text-gray-400 tracking-wide">
              Grouping System
            </p>
          </div>
        </div>
      </div>

      {/* === NAVIGATION === */}
      <nav className="relative z-10 px-4 py-8 space-y-3">
        {menu.map((item) => {
          const active =
            pathname === item.path || pathname.startsWith(item.path + "/");

          const Icon = item.icon;

          return (
            <Link key={item.name} href={item.path}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative flex items-center gap-4 px-5 py-1 rounded-2xl
                  transition-all duration-300
                  ${
                    active
                      ? "bg-gradient-to-r from-blue-600/25 to-orange-500/25 shadow-lg text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                {/* ACTIVE GLOW BAR */}
                {active && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2
                                   h-8 w-1 rounded-full
                                   bg-gradient-to-b from-blue-500 to-orange-500"
                  />
                )}

                <Icon size={20} />
                <span className="font-medium tracking-wide">{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* === TREASURY SNAPSHOT CARD === */}
      <div
        className="relative z-10 mx-5 mt-6 p-5 rounded-2xl
                      bg-gradient-to-br from-[#111827] to-[#0B1220]
                      border border-white/10"
      >
        <p className="text-xs text-gray-400 mb-1">Treasury Available</p>
        <p className="text-xl font-semibold">₹5,20,000</p>
        <div className="mt-2 h-1 rounded-full bg-gradient-to-r from-blue-500 to-orange-500" />
      </div>

      {/* === FOOTER === */}
      <div className="absolute bottom-0 w-full px-6 py-4 border-t border-white/10 text-[11px] text-gray-500 z-10">
        © {new Date().getFullYear()} Midson Finvest
      </div>
    </aside>
  );
}
