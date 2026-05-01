"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navigation() {
  return (
    <header className="relative z-20 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3">
        {/* Torii gate inspired logo mark */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ position: "relative", width: 36, height: 36 }}>
            <svg viewBox="0 0 36 36" style={{ width: 36, height: 36 }}>
              <rect x="2" y="6" width="32" height="4" rx="2" fill="#dc2626" />
              <rect x="0" y="2" width="36" height="4" rx="2" fill="#dc2626" />
              <rect x="5" y="10" width="4" height="26" rx="2" fill="#dc2626" />
              <rect x="27" y="10" width="4" height="26" rx="2" fill="#dc2626" />
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: "serif", fontWeight: 700, fontSize: 20, letterSpacing: "0.05em", color: "#f5f0eb", lineHeight: 1.1 }}>NihongoNow</div>
            <div style={{ fontSize: 9, letterSpacing: "0.3em", color: "rgba(249,168,201,0.7)", fontFamily: "'Georgia', serif" }}>日本語を学ぼう</div>
          </div>
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-8" style={{ fontSize: 13, fontFamily: "sans-serif" }}>
        {[
          ["Characters", "/characters", "キャラ"],
          ["Scenarios", "/scenarios", "場面"],
        ].map(([label, href, ja]) => (
          <Link key={href} href={href}
            style={{ color: "rgba(245,240,235,0.55)", transition: "color 0.2s", textDecoration: "none" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#f9a8c9"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(245,240,235,0.55)"; }}
          >
            <span style={{ display: "block" }}>{label}</span>
            <span style={{ display: "block", fontSize: 9, color: "rgba(249,168,201,0.4)", textAlign: "center", letterSpacing: "0.15em" }}>{ja}</span>
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <SignedOut>
          <Link href="/sign-in" style={{ fontSize: 13, fontFamily: "sans-serif", color: "rgba(245,240,235,0.55)", textDecoration: "none" }}>
            Log in
          </Link>
          <Link href="/sign-up" style={{
            fontSize: 13, fontFamily: "sans-serif", padding: "8px 20px",
            borderRadius: 24, background: "#dc2626", color: "white",
            textDecoration: "none", fontWeight: 600, letterSpacing: "0.02em",
            border: "1px solid rgba(220,38,38,0.5)"
          }}>
            始める
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
}
