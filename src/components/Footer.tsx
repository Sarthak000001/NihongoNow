"use client";

import { Github } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  
  // Don't show footer on chat pages for immersion
  if (pathname?.startsWith('/chat/')) return null;

  return (
    <footer style={{
      padding: "24px",
      borderTop: "1px solid rgba(245,240,235,0.06)",
      display: "flex", 
      flexDirection: "column",
      gap: "12px",
      maxWidth: 1200, 
      margin: "0 auto",
      width: "100%"
    }}>
      <div style={{
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        width: "100%"
      }}>
        <div style={{ fontSize: 12, fontFamily: "sans-serif", color: "rgba(245,240,235,0.25)" }}>
          © {new Date().getFullYear()} NihongoNow · 日本語を学ぼう
        </div>
        
        {/* Signature in the middle */}
        <Link 
          href="https://github.com/Sarthak000001" 
          target="_blank" 
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "8px",
            textDecoration: "none",
            opacity: 0.4,
            transition: "opacity 0.2s"
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
          onMouseLeave={e => e.currentTarget.style.opacity = "0.4"}
        >
          <span style={{ fontSize: 11, fontFamily: "sans-serif", color: "#f5f0eb" }}>
            Created By <span style={{ fontWeight: 700 }}>Sarthak Nirgude</span>
          </span>
          <Github size={14} color="#f5f0eb" />
        </Link>

        <div style={{ fontSize: 14, letterSpacing: "0.18em", color: "rgba(249,168,201,0.25)", fontFamily: "serif" }}>
          桜 · 富士 · 言語
        </div>
      </div>
    </footer>
  );
}
