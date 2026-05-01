export const CHARACTER_IMAGES: Record<string, string> = {
  yuki: "/characters/yuki.jpeg",
  takeshi: "/characters/takeshi.jpeg",
  sakura: "/characters/sakura.jpeg"
};

export const CHARACTER_COLORS: Record<string, { color: string; gradient: string; kanji: string }> = {
  yuki: { color: "#f9a8c9", gradient: "linear-gradient(160deg,#2d0a1a,#4a1030,#1a0810)", kanji: "雪" },
  takeshi: { color: "#93c5fd", gradient: "linear-gradient(160deg,#030d1f,#0a1f40,#020c1a)", kanji: "武" },
  sakura: { color: "#f0abfc", gradient: "linear-gradient(160deg,#1a0a2e,#2d1050,#100820)", kanji: "桜" }
};

export const DEFAULT_COLORS = { color: "#f9a8c9", gradient: "linear-gradient(160deg,#1a0810,#2d1020,#0d0508)", kanji: "語" };
