import dbConnect from "@/lib/db";
import Character from "@/models/Character";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Navigation from "@/components/Navigation";
import { SakuraPetal } from "@/components/Decorations";

// ─── Shared decorative components ───

import { CHARACTER_IMAGES, CHARACTER_COLORS, DEFAULT_COLORS } from "@/lib/constants";

// ─── Data fetching ─────────────────────────────────────────────────────────────

async function getCharacters() {
  await dbConnect();

  const count = await Character.countDocuments();
  if (count === 0) {
    await Character.insertMany([
      {
        characterId: "yuki",
        name: "Yuki",
        tagline: "Your Friendly Tokyo Guide",
        avatarUrl: "/characters/yuki.png",
        themeColor: "from-rose-400 to-indigo-500",
        tags: ["Beginner Friendly", "Casual", "Culture"],
        systemPrompt: "You are Yuki, a friendly 25-year-old...",
      },
      {
        characterId: "takeshi",
        name: "Takeshi",
        tagline: "Strict Business Mentor",
        avatarUrl: "/characters/takeshi.png",
        themeColor: "from-slate-700 to-slate-900",
        tags: ["Advanced", "Business", "Keigo"],
        systemPrompt: "You are Takeshi, a 50-year-old...",
      },
      {
        characterId: "sakura",
        name: "Sakura",
        tagline: "Energetic Anime Fan",
        avatarUrl: "/characters/sakura.png",
        themeColor: "from-pink-400 to-purple-500",
        tags: ["Slang", "Pop Culture", "Fast-paced"],
        systemPrompt: "You are Sakura, an 18-year-old...",
      },
    ]);
  }

  const characters = await Character.find({}).lean();
  return characters;
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function CharactersPage() {
  const characters = await getCharacters();

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
        <SakuraPetal style={{ width: 48, top: "6%", left: "4%", opacity: 0.3, transform: "rotate(15deg)" }} />
        <SakuraPetal style={{ width: 32, top: "18%", left: "20%", opacity: 0.15, transform: "rotate(-50deg)" }} />
        <SakuraPetal style={{ width: 56, top: "4%", right: "10%", opacity: 0.25, transform: "rotate(80deg)" }} />
        <SakuraPetal style={{ width: 36, top: "40%", right: "4%", opacity: 0.14, transform: "rotate(-15deg)" }} />
        <SakuraPetal style={{ width: 44, top: "65%", left: "2%", opacity: 0.12, transform: "rotate(45deg)" }} />
        <SakuraPetal style={{ width: 28, bottom: "15%", right: "16%", opacity: 0.18, transform: "rotate(5deg)" }} />

        {/* Japanese sun glow */}
        <div style={{
          position: "absolute", top: -200, right: -200,
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(220,38,38,0.10) 0%,transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: -180, left: -150,
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(244,114,182,0.08) 0%,transparent 70%)",
        }} />

        {/* Vertical text watermarks */}
        <div style={{
          position: "fixed", left: 18, top: "50%", transform: "translateY(-50%)",
          writingMode: "vertical-rl", fontSize: 11, letterSpacing: "0.25em",
          color: "rgba(249,168,201,0.10)", fontFamily: "serif", userSelect: "none",
        }}>先生を選んでください</div>
        <div style={{
          position: "fixed", right: 18, top: "40%", transform: "translateY(-50%)",
          writingMode: "vertical-rl", fontSize: 11, letterSpacing: "0.25em",
          color: "rgba(147,197,253,0.08)", fontFamily: "serif", userSelect: "none",
        }}>ようこそ・NihongoNow</div>
      </div>

      <Navigation />

      {/* ── Page hero ── */}
      <section style={{ padding: "48px 24px 20px", maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        {/* Faint large kanji behind heading */}
        <div style={{
          position: "absolute", right: 24, top: 0,
          fontSize: 220, fontFamily: "serif", fontWeight: 700, lineHeight: 1,
          color: "rgba(249,168,201,0.03)", userSelect: "none", pointerEvents: "none",
        }} aria-hidden>師</div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "5px 14px", borderRadius: 4,
            background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.22)",
            fontSize: 11, fontFamily: "sans-serif", color: "#f87171",
            letterSpacing: "0.12em", marginBottom: 18,
          }}>
            <Sparkles style={{ width: 12, height: 12 }} />
            YOUR AI COMPANIONS · 先生を選ぼう
          </div>

          <h1 style={{
            fontSize: "clamp(30px,4vw,52px)", fontFamily: "serif", fontWeight: 700,
            color: "#f5f0eb", lineHeight: 1.2, marginBottom: 10,
          }}>
            Choose your{" "}
            <span style={{
              background: "linear-gradient(135deg,#f9a8c9,#dc2626)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Sensei</span>
          </h1>

          <p style={{
            fontSize: 15, fontFamily: "sans-serif", color: "rgba(245,240,235,0.45)",
            lineHeight: 1.8, maxWidth: 540, marginBottom: 0,
          }}>
            Each character has their own personality, vocabulary level, and teaching style.
            Pick one and start talking — they remember you.
          </p>

          {/* Thin red rule — Japanese aesthetic */}
          <div style={{ width: 48, height: 2, background: "#dc2626", borderRadius: 1, marginTop: 28, opacity: 0.6 }} />
        </div>
      </section>

      {/* ── Character grid ── */}
      <section style={{ padding: "40px 24px 100px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 24,
        }}>
          {characters.map((char: any) => {
            const id = char.characterId as string;
            const theme = CHARACTER_COLORS[id] ?? DEFAULT_COLORS;
            const img = CHARACTER_IMAGES[id] ?? char.avatarUrl ?? null;

            return (
              <Link
                key={char._id.toString()}
                href={`/chat/${id}`}
                style={{ textDecoration: "none", display: "block" }}
              >
                <div
                  style={{
                    borderRadius: 20, overflow: "hidden",
                    border: `1px solid ${theme.color}22`,
                    background: "rgba(20,10,18,0.6)",
                    backdropFilter: "blur(12px)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "pointer", height: "100%", display: "flex", flexDirection: "column",
                  }}
                >

                  {/* ── Photo area ── */}
                  <div style={{
                    height: 280, position: "relative", overflow: "hidden",
                    background: theme.gradient, flexShrink: 0,
                  }}>
                    {/* Kanji watermark — always behind image */}
                    <div style={{
                      position: "absolute", fontSize: 170, fontFamily: "serif", fontWeight: 700,
                      color: `${theme.color}08`, top: "50%", left: "50%",
                      transform: "translate(-50%,-50%)", userSelect: "none",
                      zIndex: 0, lineHeight: 1, pointerEvents: "none",
                    }}>{theme.kanji}</div>

                    {/* ── Character image ──────────────────────────────────────────
                         Place images in /public/characters/<characterId>.png
                         Recommended: 400×520px portrait, transparent-bg PNG preferred.
                         Edit CHARACTER_IMAGES map at the top of this file to update paths.
                    ────────────────────────────────────────────────────────────── */}
                    {img && (
                      <img
                        src={img}
                        alt={`${char.name} — ${char.tagline}`}
                        style={{
                          position: "absolute", inset: 0,
                          width: "100%", height: "100%",
                          objectFit: "cover", objectPosition: "top center",
                          zIndex: 5,
                          opacity: 1,
                          transition: "opacity 0.4s ease",
                        }}
                      />
                    )}

                    {/* Bottom gradient — blends into card body */}
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0, height: 90,
                      background: "linear-gradient(to bottom, transparent, rgba(12,6,14,0.94))",
                      zIndex: 10,
                    }} />

                    {/* Placeholder (only visible when no image) */}
                    <div style={{
                      position: "absolute", inset: 0, zIndex: 1,
                      display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center", gap: 10,
                    }}>
                      <div style={{
                        width: 60, height: 60, borderRadius: "50%",
                        border: `1.5px dashed ${theme.color}44`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <span style={{ fontSize: 26, fontFamily: "serif", color: `${theme.color}66` }}>
                          {char.name?.[0] ?? "?"}
                        </span>
                      </div>
                      <div style={{ fontSize: 10, fontFamily: "sans-serif", color: `${theme.color}44`, letterSpacing: "0.18em" }}>
                        add photo
                      </div>
                    </div>

                    {/* Level / Sparkles badge top-right */}
                    <div style={{
                      position: "absolute", top: 14, right: 14, zIndex: 3,
                      display: "flex", alignItems: "center", gap: 5,
                      padding: "4px 10px", borderRadius: 20,
                      background: "rgba(12,6,14,0.65)", backdropFilter: "blur(8px)",
                      border: `1px solid ${theme.color}30`,
                    }}>
                      <Sparkles style={{ width: 11, height: 11, color: theme.color }} />
                      <span style={{ fontSize: 10, fontFamily: "sans-serif", color: theme.color, letterSpacing: "0.08em" }}>AI</span>
                    </div>
                  </div>

                  {/* ── Card body ── */}
                  <div style={{ padding: "18px 22px 22px", flex: 1, display: "flex", flexDirection: "column" }}>

                    {/* Name row */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                          <span style={{ fontFamily: "serif", fontWeight: 700, fontSize: 22, color: "#f5f0eb" }}>
                            {char.name}
                          </span>
                          <span style={{ fontFamily: "serif", fontSize: 15, color: theme.color, opacity: 0.6 }}>
                            {theme.kanji}
                          </span>
                        </div>
                        <div style={{
                          fontSize: 12, fontFamily: "sans-serif",
                          color: "rgba(245,240,235,0.4)", marginTop: 2, lineHeight: 1.5,
                        }}>
                          {char.tagline}
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12, flex: 1 }}>
                      {(char.tags ?? []).map((tag: string) => (
                        <span
                          key={tag}
                          style={{
                            padding: "3px 10px", borderRadius: 20,
                            fontSize: 10, fontFamily: "sans-serif",
                            color: theme.color, letterSpacing: "0.06em",
                            background: `${theme.color}0d`,
                            border: `1px solid ${theme.color}28`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div style={{
                      marginTop: 18, paddingTop: 16,
                      borderTop: `1px solid rgba(245,240,235,0.06)`,
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                    }}>
                      <span style={{
                        fontSize: 12, fontFamily: "sans-serif",
                        color: theme.color, letterSpacing: "0.08em",
                      }}>
                        話しかける · Start talking
                      </span>
                      <div style={{
                        width: 28, height: 28, borderRadius: "50%",
                        background: `${theme.color}15`, border: `1px solid ${theme.color}35`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <svg viewBox="0 0 16 16" style={{ width: 14, height: 14 }}>
                          <path d="M3 8h10M9 4l4 4-4 4" stroke={theme.color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>

                </div>
              </Link>
            );
          })}
        </div>

        {/* ── Empty state ── */}
        {characters.length === 0 && (
          <div style={{
            textAlign: "center", padding: "80px 24px",
            color: "rgba(245,240,235,0.3)", fontFamily: "sans-serif",
          }}>
            <div style={{ fontSize: 64, marginBottom: 16 }} aria-hidden>語</div>
            <div style={{ fontSize: 15 }}>No characters yet.</div>
          </div>
        )}
      </section>



    </div>
  );
}