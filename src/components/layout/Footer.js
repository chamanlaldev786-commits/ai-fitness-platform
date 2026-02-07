"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 text-white py-6 mt-12 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <p className="mb-2 md:mb-0 text-center md:text-left">
          © {new Date().getFullYear()} AI Health Dashboard. All rights reserved.
        </p>

        {/* Right Section */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
          <Link
            href="/privacy"
            className="hover:text-yellow-300 transition-all duration-300"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="hover:text-yellow-300 transition-all duration-300"
          >
            Terms
          </Link>
          <Link
            href="/contact"
            className="hover:text-yellow-300 transition-all duration-300"
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Optional Subtext */}
      <div className="mt-4 text-center text-gray-200 text-sm">
        Build smarter, live healthier. Powered by AI & Next.js
      </div>
    </footer>
  );
}
