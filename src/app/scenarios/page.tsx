import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Coffee, Plane, Wallet, LayoutGrid, Users, Sparkles } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import Navigation from "@/components/Navigation";
import { SakuraPetal } from "@/components/Decorations";

// ─── Shared decorative SVG ───

// ─── Scenario data ────────────────────────────────────────────────────────────

const scenarios = [
  {
    id: "cafe-order",
    title: "Ordering at a Café",
    titleJa: "カフェで注文する",
    description: "Practice ordering coffee and pastries in a busy Tokyo café. Learn polite request forms and counter words.",
    icon: <Coffee style={{ width: 26, height: 26, color: "#fcd34d" }} />,
    difficulty: "Beginner",
    difficultyJa: "初級",
    color: "#fcd34d",
    gradient: "linear-gradient(160deg,#1a1000,#3d2800,#1a1000)",
    kanji: "食",
    characterId: "yuki",
    xp: 50,
  },
  {
    id: "airport-immigration",
    title: "Airport Immigration",
    titleJa: "空港の入国審査",
    description: "Answer standard questions at Narita Airport immigration. Practise formal speech and travel vocabulary.",
    icon: <Plane style={{ width: 26, height: 26, color: "#93c5fd" }} />,
    difficulty: "Intermediate",
    difficultyJa: "中級",
    color: "#93c5fd",
    gradient: "linear-gradient(160deg,#030d1f,#0a1f40,#020c1a)",
    kanji: "旅",
    characterId: "takeshi",
    xp: 100,
  },
  {
    id: "lost-wallet",
    title: "Lost Wallet",
    titleJa: "財布を失くした",
    description: "Report a lost item at a local Koban (police box). Learn how to describe objects and ask for help formally.",
    icon: <Wallet style={{ width: 26, height: 26, color: "#f9a8c9" }} />,
    difficulty: "Advanced",
    difficultyJa: "上級",
    color: "#f9a8c9",
    gradient: "linear-gradient(160deg,#2d0a1a,#4a1030,#1a0810)",
    kanji: "助",
    characterId: "takeshi",
    xp: 150,
  },
];

const DIFFICULTY_DOT: Record<string, number> = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ScenariosPage() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  return (
    <div
      className="min-h-screen overflow-hidden selection:bg-rose-400 selection:text-white"
      style={{
        background: "linear-gradient(170deg,#0d0508 0%,#100a0f 30%,#0a0d14 60%,#0d0d0a 100%)",
        color: "#f5f0eb",
        fontFamily: "'Georgia','Times New Roman',serif",
      }}
    >

      {/* ── Fixed ambient decorations ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <SakuraPetal style={{ width: 44, top: "5%", left: "5%", opacity: 0.28, transform: "rotate(20deg)" }} />
        <SakuraPetal style={{ width: 30, top: "20%", left: "18%", opacity: 0.14, transform: "rotate(-45deg)" }} />
        <SakuraPetal style={{ width: 54, top: "3%", right: "9%", opacity: 0.22, transform: "rotate(75deg)" }} />
        <SakuraPetal style={{ width: 34, top: "45%", right: "3%", opacity: 0.13, transform: "rotate(-10deg)" }} />
        <SakuraPetal style={{ width: 42, top: "68%", left: "2%", opacity: 0.11, transform: "rotate(50deg)" }} />
        <SakuraPetal style={{ width: 26, bottom: "12%", right: "14%", opacity: 0.16, transform: "rotate(8deg)" }} />

        {/* Sun glow */}
        <div style={{
          position: "absolute", top: -200, right: -200,
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(220,38,38,0.09) 0%,transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: -180, left: -150,
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(244,114,182,0.07) 0%,transparent 70%)",
        }} />

        {/* Vertical text watermarks */}
        <div style={{
          position: "fixed", left: 18, top: "50%", transform: "translateY(-50%)",
          writingMode: "vertical-rl", fontSize: 11, letterSpacing: "0.25em",
          color: "rgba(249,168,201,0.10)", fontFamily: "serif", userSelect: "none",
        }}>シナリオで練習しよう</div>
        <div style={{
          position: "fixed", right: 18, top: "40%", transform: "translateY(-50%)",
          writingMode: "vertical-rl", fontSize: 11, letterSpacing: "0.25em",
          color: "rgba(147,197,253,0.07)", fontFamily: "serif", userSelect: "none",
        }}>ようこそ・NihongoNow</div>
      </div>

      <Navigation />

      {/* ── Page hero ── */}
      <section style={{ padding: "48px 24px 20px", maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        {/* Huge ambient kanji */}
        <div style={{
          position: "absolute", right: 24, top: -10,
          fontSize: 220, fontFamily: "serif", fontWeight: 700, lineHeight: 1,
          color: "rgba(249,168,201,0.025)", userSelect: "none", pointerEvents: "none",
        }} aria-hidden>場</div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "5px 14px", borderRadius: 4,
            background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.22)",
            fontSize: 11, fontFamily: "sans-serif", color: "#f87171",
            letterSpacing: "0.12em", marginBottom: 18,
          }}>
            <Sparkles style={{ width: 12, height: 12 }} />
            PRACTICE SCENARIOS · 実践練習
          </div>

          <h1 style={{
            fontSize: "clamp(30px,4vw,52px)", fontFamily: "serif", fontWeight: 700,
            color: "#f5f0eb", lineHeight: 1.2, marginBottom: 10,
          }}>
            Real-world{" "}
            <span style={{
              background: "linear-gradient(135deg,#f9a8c9,#dc2626)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Situations</span>
          </h1>

          <p style={{
            fontSize: 15, fontFamily: "sans-serif", color: "rgba(245,240,235,0.45)",
            lineHeight: 1.8, maxWidth: 540,
          }}>
            Apply your Japanese in immersive scenarios.
          </p>

          <div style={{ width: 48, height: 2, background: "#dc2626", borderRadius: 1, marginTop: 28, opacity: 0.6 }} />
        </div>
      </section>

      {/* ── Scenarios grid ── */}
      <section style={{ padding: "40px 24px 100px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 24,
        }}>
          {scenarios.map((scenario) => (
            <Link
              key={scenario.id}
              href={`/chat/${scenario.characterId}?scenario=${scenario.id}`}
              style={{ textDecoration: "none", display: "block" }}
            >
              <div
                style={{
                  borderRadius: 20, overflow: "hidden",
                  border: `1px solid ${scenario.color}22`,
                  background: "rgba(20,10,18,0.6)",
                  backdropFilter: "blur(12px)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer", height: "100%", display: "flex", flexDirection: "column",
                }}
              >

                {/* ── Visual banner ── */}
                <div style={{
                  height: 160, position: "relative", overflow: "hidden",
                  background: scenario.gradient, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {/* Kanji watermark */}
                  <div style={{
                    position: "absolute", fontSize: 160, fontFamily: "serif", fontWeight: 700,
                    color: `${scenario.color}08`, top: "50%", left: "50%",
                    transform: "translate(-50%,-50%)", userSelect: "none",
                    lineHeight: 1, pointerEvents: "none",
                  }}>{scenario.kanji}</div>

                  {/* Icon circle */}
                  <div style={{
                    width: 72, height: 72, borderRadius: "50%", position: "relative", zIndex: 1,
                    background: `${scenario.color}12`,
                    border: `1.5px solid ${scenario.color}35`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    backdropFilter: "blur(8px)",
                  }}>
                    {scenario.icon}
                  </div>

                  {/* Bottom fade */}
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: 60,
                    background: "linear-gradient(to bottom, transparent, rgba(12,6,14,0.92))",
                    zIndex: 1,
                  }} />
                </div>

                {/* ── Card body ── */}
                <div style={{ padding: "20px 22px 22px", flex: 1, display: "flex", flexDirection: "column" }}>

                  {/* Difficulty dots */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <div style={{ display: "flex", gap: 4 }}>
                      {[1, 2, 3].map((n) => (
                        <div key={n} style={{
                          width: 7, height: 7, borderRadius: "50%",
                          background: n <= (DIFFICULTY_DOT[scenario.difficulty] ?? 1)
                            ? scenario.color
                            : `${scenario.color}22`,
                        }} />
                      ))}
                    </div>
                    <span style={{
                      fontSize: 10, fontFamily: "sans-serif",
                      color: scenario.color, letterSpacing: "0.1em",
                    }}>
                      {scenario.difficulty} · {scenario.difficultyJa}
                    </span>
                  </div>

                  {/* Title */}
                  <div>
                    <div style={{ fontFamily: "serif", fontWeight: 700, fontSize: 20, color: "#f5f0eb", marginBottom: 3 }}>
                      {scenario.title}
                    </div>
                    <div style={{
                      fontSize: 12, fontFamily: "serif", color: scenario.color,
                      opacity: 0.6, letterSpacing: "0.15em", marginBottom: 12,
                    }}>
                      {scenario.titleJa}
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{
                    fontSize: 13, fontFamily: "sans-serif",
                    color: "rgba(245,240,235,0.42)", lineHeight: 1.75,
                    flex: 1,
                  }}>
                    {scenario.description}
                  </p>

                  {/* CTA row */}
                  <div style={{
                    marginTop: 18, paddingTop: 16,
                    borderTop: `1px solid rgba(245,240,235,0.06)`,
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}>
                    <span style={{
                      fontSize: 12, fontFamily: "sans-serif",
                      color: scenario.color, letterSpacing: "0.08em",
                    }}>
                      練習する · Start scenario
                    </span>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: `${scenario.color}15`,
                      border: `1px solid ${scenario.color}35`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <svg viewBox="0 0 16 16" style={{ width: 14, height: 14 }}>
                        <path d="M3 8h10M9 4l4 4-4 4" stroke={scenario.color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>



    </div>
  );
}