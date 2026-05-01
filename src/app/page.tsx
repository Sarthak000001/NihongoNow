"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, MapPin, Sparkles, Plane, Mic } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Navigation from "@/components/Navigation";
import { SakuraPetal } from "@/components/Decorations";

// ─── Inline SVG decorations ───────────────────────────────────────────────────

const MountFuji = () => (
  <svg viewBox="0 0 900 280" className="w-full" preserveAspectRatio="none" aria-hidden>
    <defs>
      <linearGradient id="fujiGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e0e7ef" />
        <stop offset="35%" stopColor="#c8d8e8" />
        <stop offset="100%" stopColor="#8faec8" />
      </linearGradient>
      <linearGradient id="snowGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#dde8f0" />
      </linearGradient>
    </defs>
    {/* Mountain body */}
    <polygon points="450,10 110,280 790,280" fill="url(#fujiGrad)" opacity="0.35" />
    {/* Snow cap */}
    <polygon points="450,10 340,120 560,120" fill="url(#snowGrad)" opacity="0.55" />
    {/* Subtle cloud band */}
    <ellipse cx="450" cy="145" rx="260" ry="22" fill="white" opacity="0.18" />
  </svg>
);

const WavePattern = () => (
  <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none" aria-hidden>
    <path d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,80 L0,80 Z"
      fill="#dc2626" opacity="0.06" />
    <path d="M0,50 C200,10 400,70 600,50 C800,30 1000,70 1200,50 C1300,40 1380,55 1440,50 L1440,80 L0,80 Z"
      fill="#be185d" opacity="0.05" />
  </svg>
);

// ─── Character card data ───────────────────────────────────────────────────────
// 📸 TO REPLACE IMAGES: Drop your image files into /public/characters/
//    and update the `image` path below for each character.
//    Recommended size: 400×520px (portrait). Works with any format: .png .jpg .webp
const characters = [
  {
    name: "Yuki",
    kanji: "雪",
    age: "24",
    role: "Barista · Shibuya",
    color: "#f9a8c9",
    accent: "#f472b6",
    emoji: "☕",
    desc: "A warm-hearted café owner who loves matcha lattes and old jazz records.",
    image: "/characters/yuki.jpeg",
    imageFallbackGradient: "linear-gradient(160deg, #2d0a1a 0%, #4a1030 50%, #1a0810 100%)",
  },
  {
    name: "Takeshi",
    kanji: "武",
    age: "50",
    role: "Business Mentor · Tokyo",
    color: "#93c5fd",
    accent: "#60a5fa",
    emoji: "💼",
    desc: "A strict but supportive executive who helps you master formal Keigo and business etiquette.",
    image: "/characters/takeshi.jpeg",
    imageFallbackGradient: "linear-gradient(160deg, #030d1f 0%, #0a1f40 50%, #020c1a 100%)",
  },
  {
    name: "Sakura",
    kanji: "桜",
    age: "18",
    role: "Anime Fan · Akihabara",
    color: "#f0abfc",
    accent: "#d946ef",
    emoji: "🎮",
    desc: "An energetic pop-culture fanatic who speaks in fast-paced internet slang and anime quotes.",
    image: "/characters/sakura.jpeg",
    imageFallbackGradient: "linear-gradient(160deg, #1a0a2e 0%, #2d1050 50%, #100820 100%)",
  }
];

const features = [
  {
    icon: <MessageCircle className="w-6 h-6" style={{ color: "#f9a8c9" }} />,
    title: "Smart Fallback",
    titleJa: "スマート対応",
    desc: "Type in English anytime. Your AI tutor replies in Japanese, complete with Romaji and a translation.",
    accent: "#f9a8c9",
    symbol: "語"
  },
  {
    icon: <MapPin className="w-6 h-6" style={{ color: "#86efac" }} />,
    title: "Scenario Practice",
    titleJa: "シナリオ練習",
    desc: "Practice ordering at a café, checking into a hotel, or navigating a convenience store.",
    accent: "#86efac",
    symbol: "場"
  },
  {
    icon: <Mic className="w-6 h-6" style={{ color: "#93c5fd" }} />,
    title: "Voice & Memory",
    titleJa: "声と記憶",
    desc: "Characters have distinct voices and remember past conversations to build a unique bond with you.",
    accent: "#93c5fd",
    symbol: "声"
  }
];

export default function Home() {
  return (
    <div
      className="min-h-screen overflow-hidden selection:bg-rose-400 selection:text-white"
      style={{
        background: "linear-gradient(170deg, #0d0508 0%, #100a0f 30%, #0a0d14 60%, #0d0d0a 100%)",
        color: "#f5f0eb",
        fontFamily: "'Georgia', 'Times New Roman', serif"
      }}
    >
      {/* ── Decorative sakura petals (static scattered) ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <SakuraPetal style={{ width: 48, top: "8%", left: "6%", opacity: 0.35, transform: "rotate(25deg)" }} />
        <SakuraPetal style={{ width: 32, top: "15%", left: "22%", opacity: 0.2, transform: "rotate(-40deg)" }} />
        <SakuraPetal style={{ width: 56, top: "5%", right: "12%", opacity: 0.3, transform: "rotate(70deg)" }} />
        <SakuraPetal style={{ width: 36, top: "35%", right: "5%", opacity: 0.18, transform: "rotate(-20deg)" }} />
        <SakuraPetal style={{ width: 44, top: "60%", left: "3%", opacity: 0.14, transform: "rotate(55deg)" }} />
        <SakuraPetal style={{ width: 28, bottom: "20%", right: "18%", opacity: 0.2, transform: "rotate(10deg)" }} />
        <SakuraPetal style={{ width: 52, bottom: "8%", left: "30%", opacity: 0.15, transform: "rotate(-60deg)" }} />

        {/* Subtle red circle — Japanese sun motif */}
        <div style={{
          position: "absolute", top: "-200px", right: "-200px",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(220,38,38,0.12) 0%, transparent 70%)"
        }} />
        <div style={{
          position: "absolute", bottom: "-180px", left: "-150px",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(244,114,182,0.1) 0%, transparent 70%)"
        }} />

        {/* Vertical Japanese text watermarks */}
        <div style={{
          position: "fixed", left: 18, top: "50%", transform: "translateY(-50%)",
          writingMode: "vertical-rl", fontSize: 11, letterSpacing: "0.25em",
          color: "rgba(249,168,201,0.12)", fontFamily: "serif", userSelect: "none"
        }}>
          日本語を話しましょう
        </div>
        <div style={{
          position: "fixed", right: 18, top: "40%", transform: "translateY(-50%)",
          writingMode: "vertical-rl", fontSize: 11, letterSpacing: "0.25em",
          color: "rgba(147,197,253,0.1)", fontFamily: "serif", userSelect: "none"
        }}>
          ようこそ・NihongoNow
        </div>
      </div>

      <Navigation />

      <main className="relative z-10">

        {/* ── Hero Section ── */}
        <section style={{ paddingTop: 60, paddingBottom: 80, maxWidth: 1200, margin: "0 auto", padding: "60px 24px 80px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>

            {/* Left: text */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              {/* Japanese badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "6px 14px", borderRadius: 4,
                background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.25)",
                fontSize: 12, fontFamily: "sans-serif", color: "#f87171",
                letterSpacing: "0.1em", marginBottom: 24
              }}>
                <Sparkles style={{ width: 13, height: 13 }} />
                <span>AI-Powered Japanese Tutor</span>
                <span style={{ color: "rgba(248,113,113,0.5)", marginLeft: 4 }}>・ いつでも練習</span>
              </div>

              <h1 style={{
                fontSize: "clamp(36px,4.5vw,62px)", fontFamily: "serif", fontWeight: 700,
                lineHeight: 1.2, marginBottom: 24, color: "#f5f0eb"
              }}>
                Master Japanese<br />
                through{" "}
                <span style={{
                  background: "linear-gradient(135deg, #f9a8c9, #dc2626)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
                }}>real conversations.</span>
              </h1>

              {/* Large decorative kanji */}
              <div style={{
                fontSize: 96, lineHeight: 1, fontFamily: "serif", fontWeight: 700,
                color: "transparent", WebkitTextStroke: "1px rgba(249,168,201,0.15)",
                position: "absolute", left: 20, top: 220, userSelect: "none", pointerEvents: "none"
              }}>語</div>

              <p style={{
                fontSize: 16, fontFamily: "sans-serif", lineHeight: 1.8,
                color: "rgba(245,240,235,0.55)", maxWidth: 480, marginBottom: 36
              }}>
                Chat with AI personas who remember you. Type in English when you're stuck, and get coached in Japanese. Immerse yourself in real-world scenarios from Tokyo cafés to airport immigration.
              </p>

              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <SignedOut>
                  <Link href="/sign-up" style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "14px 30px", borderRadius: 4,
                    background: "linear-gradient(135deg, #dc2626, #be185d)",
                    color: "white", textDecoration: "none",
                    fontFamily: "sans-serif", fontWeight: 600, fontSize: 15,
                    boxShadow: "0 4px 24px rgba(220,38,38,0.3)"
                  }}>
                    Start Your Journey
                    <ArrowRight style={{ width: 16, height: 16 }} />
                  </Link>
                </SignedOut>
                <SignedIn>
                  <Link href="/characters" style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "14px 30px", borderRadius: 4,
                    background: "linear-gradient(135deg, #dc2626, #be185d)",
                    color: "white", textDecoration: "none",
                    fontFamily: "sans-serif", fontWeight: 600, fontSize: 15,
                    boxShadow: "0 4px 24px rgba(220,38,38,0.3)"
                  }}>
                    Continue Learning
                    <ArrowRight style={{ width: 16, height: 16 }} />
                  </Link>
                </SignedIn>

                <div style={{ fontSize: 13, fontFamily: "sans-serif", color: "rgba(245,240,235,0.35)", letterSpacing: "0.08em" }}>
                  無料で始める<br />
                  <span style={{ fontSize: 11 }}>Free forever</span>
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: "flex", gap: 28, marginTop: 40, paddingTop: 28, borderTop: "1px solid rgba(245,240,235,0.08)" }}>
                {[["1,200+", "Active learners", "学習者"], ["4", "AI characters", "キャラ"], ["N5–N1", "All JLPT levels", "全レベル"]].map(([num, label, ja]) => (
                  <div key={label}>
                    <div style={{ fontSize: 22, fontFamily: "serif", fontWeight: 700, color: "#f9a8c9" }}>{num}</div>
                    <div style={{ fontSize: 11, fontFamily: "sans-serif", color: "rgba(245,240,235,0.4)", letterSpacing: "0.05em" }}>{label}</div>
                    <div style={{ fontSize: 10, fontFamily: "serif", color: "rgba(249,168,201,0.35)" }}>{ja}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: hero character showcase */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ position: "relative" }}
            >
              {/* Chat preview card */}
              <div style={{
                background: "rgba(20,10,18,0.8)", border: "1px solid rgba(249,168,201,0.15)",
                borderRadius: 20, padding: 24, backdropFilter: "blur(16px)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.4)"
              }}>
                {/* Character header */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid rgba(245,240,235,0.06)" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,#be185d,#7c3aed)", padding: 2 }}>
                    <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#1a0810", overflow: "hidden" }}>
                      <img
                        src="/characters/yuki.png"
                        alt="Yuki"
                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                        onError={(e) => {
                          // fallback: show emoji initial
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "serif", fontWeight: 600, fontSize: 15, color: "#f5f0eb" }}>Yuki 雪</div>
                    <div style={{ fontSize: 11, fontFamily: "sans-serif", color: "rgba(249,168,201,0.6)" }}>● Online · Shibuya café</div>
                  </div>
                  <div style={{ marginLeft: "auto", fontSize: 20 }}>☕</div>
                </div>

                {/* Chat bubbles */}
                {[
                  { from: "yuki", ja: "今日は何をしますか？", rom: "Kyou wa nani wo shimasu ka?", en: "What are you doing today?" },
                  { from: "user", text: "I want to order coffee please" },
                  { from: "yuki", ja: "コーヒーをください", rom: "Koohii wo kudasai", en: "I'll have a coffee please", tip: "💡 Use ください (kudasai) to politely request things!" },
                ].map((msg, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.3 }}
                    style={{ marginBottom: 14, display: "flex", justifyContent: msg.from === "user" ? "flex-end" : "flex-start" }}
                  >
                    {msg.from === "user" ? (
                      <div style={{
                        background: "rgba(220,38,38,0.2)", border: "1px solid rgba(220,38,38,0.3)",
                        borderRadius: "16px 16px 4px 16px", padding: "10px 14px",
                        maxWidth: "75%", fontSize: 13, fontFamily: "sans-serif", color: "#f5f0eb"
                      }}>
                        {msg.text}
                      </div>
                    ) : (
                      <div style={{
                        background: "rgba(245,240,235,0.05)", border: "1px solid rgba(245,240,235,0.08)",
                        borderRadius: "16px 16px 16px 4px", padding: "12px 14px",
                        maxWidth: "85%", fontSize: 13, fontFamily: "sans-serif"
                      }}>
                        <div style={{ fontSize: 17, fontFamily: "serif", color: "#f5f0eb", marginBottom: 4 }}>{msg.ja}</div>
                        <div style={{ fontSize: 11, color: "#f9a8c9", marginBottom: 2 }}>{msg.rom}</div>
                        <div style={{ fontSize: 12, color: "rgba(245,240,235,0.5)" }}>{msg.en}</div>
                        {msg.tip && <div style={{ fontSize: 11, color: "#fcd34d", marginTop: 6, padding: "4px 8px", background: "rgba(252,211,77,0.08)", borderRadius: 6 }}>{msg.tip}</div>}
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Typing indicator */}
                <div style={{ display: "flex", gap: 5, padding: "8px 14px" }}>
                  {[0, 0.2, 0.4].map((d, i) => (
                    <motion.div key={i}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8, delay: d }}
                      style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(249,168,201,0.5)" }}
                    />
                  ))}
                </div>
              </div>

              {/* Floating sakura */}
              <SakuraPetal style={{ width: 40, position: "absolute", top: -20, right: 20, opacity: 0.6 }} />
              <SakuraPetal style={{ width: 28, position: "absolute", bottom: 30, left: -18, opacity: 0.4 }} />
            </motion.div>
          </div>
        </section>

        {/* ── Mount Fuji divider ── */}
        <div style={{ position: "relative", height: 160, marginTop: -20 }}>
          <MountFuji />
          {/* Wave over Fuji base */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
            <WavePattern />
          </div>
        </div>

        {/* ── Characters Section ── */}
        <section style={{
          padding: "80px 24px",
          background: "linear-gradient(180deg, rgba(15,8,12,0.95) 0%, rgba(10,8,15,0.98) 100%)"
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            {/* Section header */}
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ fontSize: 11, fontFamily: "sans-serif", letterSpacing: "0.4em", color: "rgba(249,168,201,0.5)", marginBottom: 10 }}>YOUR AI COMPANIONS</div>
              <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontFamily: "serif", fontWeight: 700, color: "#f5f0eb", marginBottom: 10 }}>
                Meet your tutors
              </h2>
              <div style={{ fontSize: 22, fontFamily: "serif", color: "rgba(249,168,201,0.4)", letterSpacing: "0.3em" }}>先生たちに会いましょう</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
              {characters.map((char, i) => (
                <motion.div key={char.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div style={{
                    borderRadius: 20, overflow: "hidden",
                    border: `1px solid ${char.color}22`,
                    background: "rgba(20,10,18,0.6)",
                    backdropFilter: "blur(12px)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    cursor: "pointer"
                  }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 50px ${char.color}22`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    {/* Character photo */}
                    <div style={{
                      height: 260, position: "relative", overflow: "hidden",
                      background: char.imageFallbackGradient,
                    }}>
                      {/* Kanji watermark — always visible, sits behind image */}
                      <div style={{
                        position: "absolute", fontSize: 160, fontFamily: "serif", fontWeight: 700,
                        color: `${char.color}09`, top: "50%", left: "50%",
                        transform: "translate(-50%,-50%)", userSelect: "none", zIndex: 0,
                        lineHeight: 1
                      }}>{char.kanji}</div>

                      {/* ── Character image ──────────────────────────────────────
                           Drop your image files into /public/characters/
                           e.g. /public/characters/yuki.png  (400×520px recommended)
                           The `image` path in the `characters` array controls this.
                      ────────────────────────────────────────────────────────── */}
                      <img
                        src={char.image}
                        alt={`${char.name} — ${char.role}`}
                        style={{
                          position: "absolute", inset: 0,
                          width: "100%", height: "100%",
                          objectFit: "cover", objectPosition: "top center",
                          zIndex: 5,
                          // graceful fade-in once loaded
                          transition: "opacity 0.4s ease",
                        }}
                        onError={(e) => {
                          // Hide broken image — fallback gradient + kanji shows through
                          (e.currentTarget as HTMLImageElement).style.opacity = "0";
                        }}
                        onLoad={(e) => {
                          (e.currentTarget as HTMLImageElement).style.opacity = "1";
                        }}
                      />

                      {/* Bottom fade — blends image into card body */}
                      <div style={{
                        position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
                        background: "linear-gradient(to bottom, transparent, rgba(12,6,14,0.92))",
                        zIndex: 10
                      }} />

                      {/* Placeholder overlay — only visible when image is missing */}
                      <div style={{
                        position: "absolute", inset: 0, zIndex: 1,
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center", gap: 8
                      }}>
                        <div style={{
                          width: 52, height: 52, borderRadius: "50%",
                          border: `1.5px dashed ${char.color}55`,
                          display: "flex", alignItems: "center", justifyContent: "center"
                        }}>
                          <span style={{ fontSize: 22 }}>{char.emoji}</span>
                        </div>
                        <div style={{
                          fontSize: 10, fontFamily: "sans-serif",
                          color: `${char.color}55`, letterSpacing: "0.15em"
                        }}>
                          add photo
                        </div>
                      </div>
                    </div>

                    {/* Card info */}
                    <div style={{ padding: "16px 20px 20px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                        <div>
                          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                            <span style={{ fontFamily: "serif", fontWeight: 700, fontSize: 20, color: "#f5f0eb" }}>{char.name}</span>
                            <span style={{ fontFamily: "serif", fontSize: 16, color: char.color, opacity: 0.7 }}>{char.kanji}</span>
                          </div>
                          <div style={{ fontSize: 11, fontFamily: "sans-serif", color: char.color, opacity: 0.7, letterSpacing: "0.05em" }}>{char.role}</div>
                        </div>
                        <span style={{ fontSize: 22 }}>{char.emoji}</span>
                      </div>
                      <p style={{ fontSize: 12, fontFamily: "sans-serif", color: "rgba(245,240,235,0.45)", lineHeight: 1.6, marginBottom: 14 }}>{char.desc}</p>
                      <Link href={`/chat/${char.name.toLowerCase()}`} style={{
                        display: "block", textAlign: "center", padding: "8px",
                        borderRadius: 8, border: `1px solid ${char.color}44`,
                        fontSize: 12, fontFamily: "sans-serif", color: char.color,
                        textDecoration: "none", letterSpacing: "0.06em",
                        transition: "background 0.2s",
                        background: `${char.color}0a`
                      }}>
                        話しかける · Start talking
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features Grid ── */}
        <section id="features" style={{ padding: "80px 24px", position: "relative" }}>
          {/* Subtle bamboo pattern left edge */}
          <div style={{
            position: "absolute", left: 0, top: 0, bottom: 0, width: 40,
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(134,239,172,0.04) 30px, rgba(134,239,172,0.04) 32px)",
            pointerEvents: "none"
          }} />

          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ fontSize: 11, fontFamily: "sans-serif", letterSpacing: "0.4em", color: "rgba(249,168,201,0.5)", marginBottom: 10 }}>HOW IT WORKS</div>
              <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontFamily: "serif", fontWeight: 700, color: "#f5f0eb", marginBottom: 10 }}>
                Not your usual learning app
              </h2>
              <div style={{ fontSize: 18, fontFamily: "serif", color: "rgba(249,168,201,0.4)", letterSpacing: "0.2em" }}>普通じゃないよ</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
              {features.map((feat, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  style={{
                    padding: "32px 28px",
                    borderRadius: 16,
                    background: "rgba(20,12,18,0.7)",
                    border: "1px solid rgba(245,240,235,0.06)",
                    position: "relative", overflow: "hidden"
                  }}
                >
                  {/* Giant symbol watermark */}
                  <div style={{
                    position: "absolute", right: 16, top: 8,
                    fontSize: 80, fontFamily: "serif", fontWeight: 700,
                    color: `${feat.accent}0c`, lineHeight: 1, userSelect: "none"
                  }}>{feat.symbol}</div>

                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: `${feat.accent}12`, border: `1px solid ${feat.accent}25`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 20
                  }}>
                    {feat.icon}
                  </div>
                  <div style={{ fontSize: 18, fontFamily: "serif", fontWeight: 700, color: "#f5f0eb", marginBottom: 4 }}>{feat.title}</div>
                  <div style={{ fontSize: 12, fontFamily: "serif", color: feat.accent, opacity: 0.6, letterSpacing: "0.15em", marginBottom: 14 }}>{feat.titleJa}</div>
                  <p style={{ fontSize: 14, fontFamily: "sans-serif", color: "rgba(245,240,235,0.5)", lineHeight: 1.75 }}>{feat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Boarding Pass CTA ── */}
        <section style={{ padding: "60px 24px 100px", maxWidth: 1000, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              borderRadius: 24, overflow: "hidden",
              border: "1px solid rgba(249,168,201,0.15)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
              display: "flex", flexDirection: "row",
              position: "relative"
            }}
          >
            {/* Left side */}
            <div style={{
              flex: 1, padding: "48px 44px",
              background: "linear-gradient(135deg, rgba(100,10,30,0.9) 0%, rgba(30,10,50,0.95) 100%)",
              position: "relative", overflow: "hidden"
            }}>
              {/* Background kanji */}
              <div style={{
                position: "absolute", right: -20, top: -20, fontSize: 180,
                fontFamily: "serif", color: "rgba(249,168,201,0.04)",
                userSelect: "none", lineHeight: 1
              }}>日</div>
              {/* Torii silhouette */}
              <svg viewBox="0 0 200 160" style={{
                position: "absolute", right: 20, bottom: 0,
                width: 180, opacity: 0.06, pointerEvents: "none"
              }}>
                <rect x="10" y="20" width="180" height="14" rx="7" fill="#f9a8c9" />
                <rect x="30" y="5" width="140" height="12" rx="6" fill="#f9a8c9" />
                <rect x="30" y="34" width="16" height="126" rx="8" fill="#f9a8c9" />
                <rect x="154" y="34" width="16" height="126" rx="8" fill="#f9a8c9" />
              </svg>

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
                  <span style={{
                    padding: "4px 12px", borderRadius: 3,
                    border: "1px solid rgba(249,168,201,0.3)",
                    fontSize: 10, fontFamily: "sans-serif", letterSpacing: "0.2em",
                    color: "#f9a8c9"
                  }}>FIRST CLASS</span>
                  <span style={{ fontSize: 12, fontFamily: "sans-serif", color: "rgba(245,240,235,0.4)" }}>Tokyo, Japan · 東京</span>
                </div>

                <h2 style={{ fontSize: "clamp(28px,3vw,44px)", fontFamily: "serif", fontWeight: 700, color: "#f5f0eb", marginBottom: 12 }}>
                  Ready for takeoff?
                </h2>
                <p style={{ fontSize: 15, fontFamily: "sans-serif", color: "rgba(249,168,201,0.7)", lineHeight: 1.7, maxWidth: 400, marginBottom: 32 }}>
                  Your journey to Japanese fluency begins today. Board the flight and meet your AI tutors.
                </p>

                <div style={{ display: "flex", gap: 32, paddingTop: 24, borderTop: "1px solid rgba(245,240,235,0.1)" }}>
                  {[["Passenger", "You", "乗客"], ["Destination", "Fluency", "目標"], ["Gate", "N5", "門"]].map(([label, val, ja]) => (
                    <div key={label}>
                      <div style={{ fontSize: 9, fontFamily: "sans-serif", letterSpacing: "0.2em", color: "rgba(245,240,235,0.35)", marginBottom: 4 }}>{label.toUpperCase()}</div>
                      <div style={{ fontFamily: "serif", fontSize: 18, fontWeight: 600, color: "#f5f0eb" }}>{val}</div>
                      <div style={{ fontSize: 10, fontFamily: "serif", color: "rgba(249,168,201,0.4)" }}>{ja}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Perforation */}
            <div style={{
              width: 1, borderLeft: "1px dashed rgba(249,168,201,0.2)",
              position: "relative", flexShrink: 0
            }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#0a0408", position: "absolute", top: -10, left: -10 }} />
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#0a0408", position: "absolute", bottom: -10, left: -10 }} />
            </div>

            {/* Right side */}
            <div style={{
              width: 260, padding: "48px 32px",
              background: "rgba(15,8,18,0.95)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              textAlign: "center"
            }}>
              <Plane style={{ width: 28, height: 28, marginBottom: 24, color: "#f9a8c9", transform: "rotate(45deg)" }} />
              <div style={{ fontSize: 28, fontFamily: "serif", marginBottom: 8 }}>🇯🇵</div>
              <SignedOut>
                <Link href="/sign-up" style={{
                  display: "block", width: "100%", padding: "14px",
                  borderRadius: 10, background: "linear-gradient(135deg, #dc2626, #be185d)",
                  color: "white", fontFamily: "sans-serif", fontWeight: 700,
                  fontSize: 15, textDecoration: "none", textAlign: "center",
                  boxShadow: "0 8px 24px rgba(220,38,38,0.3)", marginBottom: 12
                }}>
                  Board Now · 搭乗
                </Link>
                <p style={{ fontSize: 11, fontFamily: "sans-serif", color: "rgba(245,240,235,0.3)" }}>
                  Free forever. No credit card.
                </p>
              </SignedOut>
              <SignedIn>
                <Link href="/characters" style={{
                  display: "block", width: "100%", padding: "14px",
                  borderRadius: 10, background: "linear-gradient(135deg, #dc2626, #be185d)",
                  color: "white", fontFamily: "sans-serif", fontWeight: 700,
                  fontSize: 15, textDecoration: "none", textAlign: "center",
                  boxShadow: "0 8px 24px rgba(220,38,38,0.3)"
                }}>
                  Enter Lounge · ラウンジ
                </Link>
              </SignedIn>
            </div>
          </motion.div>
        </section>

      </main>


    </div>
  );
}