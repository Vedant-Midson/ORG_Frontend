"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <header
      className="
        relative h-16 px-8 flex items-center justify-between
        bg-gradient-to-r from-[#0B1220] via-[#0E1528] to-[#0B1220]
        border-b border-white/10 overflow-hidden
      "
    >
      {/* Ambient animated glow */}
      <motion.div
        className="
          absolute -top-24 left-1/3 w-96 h-96 rounded-full
          bg-gradient-to-br from-blue-600/20 to-orange-500/20
          blur-3xl
        "
        animate={{ x: [0, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-indigo-500 to-orange-500" />

      {/* LEFT: Context title */}
      <div className="relative z-10">
        <h1 className="text-sm font-medium tracking-wide text-gray-300">
          MIDSON ORG
          <span className="text-gray-500 ml-2">
            · Operations Dashboard
          </span>
        </h1>
      </div>

      {/* RIGHT: User */}
      <div className="relative z-10 flex items-center gap-4">

        {/* User name */}
        <span className="text-sm text-gray-400">
          Vedant Shahi
        </span>

        {/* Avatar */}
        <div
          className="
            h-9 w-9 rounded-xl
            bg-gradient-to-br from-blue-600 to-orange-500
            flex items-center justify-center
            font-semibold text-sm shadow-lg
          "
        >
          VS
        </div>

      </div>
    </header>
  );
}
