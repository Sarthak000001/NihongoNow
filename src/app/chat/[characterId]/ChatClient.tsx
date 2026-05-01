"use client";

import { useChat } from "ai/react";
import { Send, User, Bot, ArrowLeft, Volume2, VolumeX, Sparkles, Mic, MicOff } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SakuraPetal } from "@/components/Decorations";
import { CHARACTER_IMAGES, CHARACTER_COLORS, DEFAULT_COLORS } from "@/lib/constants";
import { UserButton } from "@clerk/nextjs";

interface ChatClientProps {
  characterId: string;
  initialMessages: any[];
  characterName: string;
}

export default function ChatClient({ characterId, initialMessages, characterName }: ChatClientProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error, setInput, setMessages } = useChat({
    body: { characterId },
    initialMessages,
    onError: (err) => {
      console.error("Chat Error:", err);
    },
    onFinish: (message) => {
      // ─── User Message Enrichment ───
      // If the AI response contains a USER-TRANSLATION section, update the last user message
      const userTranslationMatch = message.content.match(/USER-TRANSLATION:\s*([\s\S]*?)---/);
      if (userTranslationMatch && userTranslationMatch[1]) {
        const enrichedUserContent = userTranslationMatch[1].trim();
        setMessages(prev => {
          const newMessages = [...prev];
          // Find the last user message before this assistant message
          for (let i = newMessages.length - 1; i >= 0; i--) {
            if (newMessages[i].role === 'user') {
              newMessages[i].content = enrichedUserContent;
              break;
            }
          }
          return newMessages;
        });
      }

      // ─── Text to Speech ───
      if (ttsRef.current) {
        // Only speak the character's Japanese response (skip the user translation part)
        const charResponse = message.content.split('---').pop() || message.content;
        const match = charResponse.match(/Japanese:\s*(.+)/);
        if (match && match[1]) {
          const textToSpeak = match[1].trim();
          const utterance = new SpeechSynthesisUtterance(textToSpeak);
          utterance.lang = 'ja-JP';

          // Try to select a specific voice if available (OS dependent)
          const voices = window.speechSynthesis.getVoices();
          const jpVoices = voices.filter(v => v.lang.includes('ja'));
          if (jpVoices.length > 0) {
            if (charId === 'takeshi') {
              // Try to find a male voice (Windows: Ichiro, macOS: Otoya)
              const maleVoice = jpVoices.find(v => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('ichiro') || v.name.toLowerCase().includes('otoya'));
              if (maleVoice) {
                utterance.voice = maleVoice;
                utterance.pitch = 0.95; // Natural male voice
              } else {
                utterance.voice = jpVoices[0];
                utterance.pitch = 0.67; // Force deep pitch to fake a male voice if only female is available
              }
            } else {
              // Try to find a female voice
              const femaleVoice = jpVoices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('ayumi') || v.name.toLowerCase().includes('haruka') || v.name.toLowerCase().includes('kyoko') || v.name.toLowerCase().includes('nanami'));
              if (femaleVoice) {
                utterance.voice = femaleVoice;
                utterance.pitch = charId === 'sakura' ? 1.2 : 1.1;
                utterance.rate = charId === 'sakura' ? 1.0 : 1.0;
              } else {
                utterance.voice = jpVoices[0];
                utterance.pitch = charId === 'sakura' ? 1.2 : 1.1;
              }
            }
          }

          window.speechSynthesis.speak(utterance);
        }
      }
    }
  });

  const [isTTSOn, setIsTTSOn] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);
  const ttsRef = useRef(isTTSOn);
  const charId = characterId.toLowerCase();
  const theme = CHARACTER_COLORS[charId] || DEFAULT_COLORS;
  const charImage = CHARACTER_IMAGES[charId];

  const setInputRef = useRef(setInput);
  useEffect(() => {
    setInputRef.current = setInput;
  }, [setInput]);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'ja-JP'; 

      recognitionRef.current.onresult = (event: any) => {
        let fullTranscript = "";
        for (let i = 0; i < event.results.length; i++) {
          fullTranscript += event.results[i][0].transcript;
        }
        if (setInputRef.current) {
          setInputRef.current(fullTranscript);
        }
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        if (event.error === 'no-speech') return; 
        console.error("Speech Recognition Error:", event.error);
        setIsRecording(false);
      };
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Try Chrome!");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };

  // Sync state with ref for the onFinish callback
  useEffect(() => {
    ttsRef.current = isTTSOn;
  }, [isTTSOn]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Format messages into blocks (Japanese, Romaji, English, Tip)
  const formatMessage = (content: string, isUser: boolean = false) => {
    // Strip the USER-TRANSLATION part from the assistant's actual bubble display
    const displayContent = !isUser && content.includes('---') 
      ? content.split('---').pop()?.trim() || content 
      : content;

    const lines = displayContent.split('\n');
    return (
      <div className="space-y-3">
        {lines.map((line, i) => {
          if (line.startsWith('Japanese:')) {
            return (
              <div key={i} className={`text-xl font-bold drop-shadow-sm tracking-wide ${isUser ? 'text-white' : 'text-white'}`}>
                {line.replace('Japanese:', '').trim()}
              </div>
            );
          }
          if (line.startsWith('Romaji:')) {
            return (
              <div key={i} className={`text-sm font-medium tracking-wider ${isUser ? 'text-rose-100/70' : 'text-rose-300/80'}`}>
                {line.replace('Romaji:', '').trim()}
              </div>
            );
          }
          if (line.startsWith('English:')) {
            return (
              <div key={i} className={`text-base leading-relaxed italic ${isUser ? 'text-white/80' : 'text-neutral-300/90'}`}>
                {line.replace('English:', '').trim()}
              </div>
            );
          }
          if (line.startsWith('Tip:') && !isUser) {
            return (
              <div key={i} className="mt-3 p-3 bg-white/5 border border-white/10 rounded-xl text-xs text-neutral-400 backdrop-blur-sm">
                <span className="text-rose-400 font-bold mr-2">💡 TIP:</span>
                {line.replace('Tip:', '').trim()}
              </div>
            );
          }
          // Default text for lines without markers
          const text = line.trim();
          if (!text || text === '---' || text.startsWith('USER-TRANSLATION:')) return null;
          return <div key={i} className={isUser ? "text-white" : "text-neutral-300"}>{text}</div>;
        }).filter(Boolean)}
      </div>
    );
  };

  return (
    <div 
      className="flex h-screen overflow-hidden selection:bg-rose-500 selection:text-white"
      style={{
        background: "linear-gradient(170deg,#0d0508 0%,#100a0f 30%,#0a0d14 60%,#0d0d0a 100%)",
        color: "#f5f0eb",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* ── Background Decorations ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <SakuraPetal style={{ width: 44, top: "10%", left: "5%", opacity: 0.15, transform: "rotate(20deg)" }} />
        <SakuraPetal style={{ width: 30, top: "25%", right: "15%", opacity: 0.1, transform: "rotate(-45deg)" }} />
        <SakuraPetal style={{ width: 54, bottom: "15%", left: "10%", opacity: 0.12, transform: "rotate(75deg)" }} />
        
        {/* Ambient Glows */}
        <div style={{
          position: "absolute", top: -200, right: -200,
          width: 600, height: 600, borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.color}15 0%, transparent 70%)`,
        }} />
        <div style={{
          position: "absolute", bottom: -180, left: -150,
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(220,38,38,0.05) 0%, transparent 70%)",
        }} />
      </div>

      {/* ── Left Sidebar: Character Portrait (Desktop) ── */}
      <aside className="hidden lg:flex flex-col w-[400px] border-r border-white/5 relative z-10 overflow-hidden bg-black/20 backdrop-blur-md">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent z-10" />
          {charImage && (
            <motion.img 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              src={charImage} 
              alt={characterName} 
              className="w-full h-full object-cover object-top"
            />
          )}
        </div>
        
        <div className="mt-auto p-8 relative z-20">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-[10px] uppercase tracking-widest text-rose-400 font-bold">Live Sensei</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-emerald-500 font-medium tracking-wider">ONLINE</span>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white mb-2 font-serif">{characterName}</h2>
            <div className="flex gap-2">
              <span className="text-xl text-rose-300 font-serif opacity-60">{theme.kanji}</span>
              <div className="h-px flex-1 bg-gradient-to-r from-rose-500/30 to-transparent self-center ml-2" />
            </div>
          </motion.div>
        </div>
      </aside>

      {/* ── Main Chat Container ── */}
      <div className="flex-1 flex flex-col relative z-10 bg-black/10">
        {/* Header */}

        <header className="flex items-center justify-between px-6 py-5 border-b border-white/5 backdrop-blur-xl bg-neutral-950/40">
          <div className="flex items-center gap-4">
            <Link href="/characters" className="p-2.5 hover:bg-white/5 rounded-full transition-all hover:scale-110 active:scale-95 group">
              <ArrowLeft className="w-5 h-5 text-neutral-400 group-hover:text-white" />
            </Link>
            
            <div className="lg:hidden flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg border border-white/10"
                style={{ background: theme.gradient }}
              >
                <span className="font-bold text-white text-lg">{characterName[0]}</span>
              </div>
              <div>
                <h1 className="font-bold text-white leading-tight font-serif">{characterName}</h1>
                <span className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase">Online</span>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <span className="text-xs text-neutral-500 font-sans tracking-widest uppercase">Conversing with</span>
              <h1 className="text-sm font-bold text-white font-serif tracking-wide">{characterName} Sensei</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                setIsTTSOn(!isTTSOn);
                if (isTTSOn) window.speechSynthesis.cancel();
              }}
              className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 ${
                isTTSOn 
                ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' 
                : 'bg-neutral-800/50 border-white/5 text-neutral-500'
              }`}
            >
              {isTTSOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="text-[10px] font-bold tracking-widest uppercase hidden sm:inline">
                {isTTSOn ? 'Voice On' : 'Muted'}
              </span>
            </button>

            <div className="w-px h-6 bg-white/10 mx-1" />
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto px-4 py-8 md:px-8 space-y-8 scrollbar-hide">
          {messages.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-full text-center space-y-6"
            >
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center animate-pulse">
                <Sparkles className="w-8 h-8 text-rose-400/50" />
              </div>
              <div className="max-w-xs">
                <h3 className="text-xl font-serif font-bold text-white mb-2">Begin your lesson</h3>
                <p className="text-sm text-neutral-500 font-sans leading-relaxed">
                  Start a conversation with {characterName} Sensei. You can practice in Japanese or ask for help in English.
                </p>
              </div>
            </motion.div>
          )}

          <div className="max-w-4xl mx-auto space-y-8">
            <AnimatePresence mode="popLayout">
              {messages.map((m, idx) => (
                <motion.div 
                  key={m.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'assistant' && (
                    <div 
                      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 border border-white/10 shadow-lg"
                      style={{ background: theme.gradient }}
                    >
                      <span className="font-bold text-white text-xs">{characterName[0]}</span>
                    </div>
                  )}
                  
                  <div className={`relative max-w-[85%] md:max-w-[75%] rounded-3xl p-5 md:p-6 shadow-2xl backdrop-blur-xl ${
                    m.role === 'user' 
                      ? 'bg-rose-600/90 text-white rounded-tr-none border border-white/10' 
                      : 'bg-neutral-900/80 border border-white/5 rounded-tl-none'
                  }`}>
                    {m.role === 'user' ? (
                      formatMessage(m.content, true)
                    ) : (
                      formatMessage(m.content)
                    )}
                  </div>

                  {m.role === 'user' && (
                    <div className="w-9 h-9 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center shrink-0 shadow-lg">
                      <User className="w-4 h-4 text-neutral-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-4 justify-start"
              >
                <div 
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 border border-white/10 animate-pulse"
                  style={{ background: theme.gradient }}
                >
                  <span className="font-bold text-white text-xs">{characterName[0]}</span>
                </div>
                <div className="bg-neutral-900/80 border border-white/5 backdrop-blur-md rounded-3xl rounded-tl-none p-5 flex items-center gap-1.5 shadow-xl">
                  <div className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </motion.div>
            )}
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex justify-center"
              >
                <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl px-6 py-3 text-sm text-rose-400 flex items-center gap-3 shadow-xl backdrop-blur-md">
                  <span className="text-lg">🍵</span>
                  <div>
                    <p className="font-bold">Sensei is taking a quick break.</p>
                    <p className="opacity-80">You've hit the API limit. Please wait a minute and try again!</p>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </main>

        {/* Input */}
        <footer className="p-6 bg-neutral-950/50 border-t border-white/5 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500/20 to-indigo-500/20 rounded-full blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
            <div className="relative flex items-center">
              <input
                value={input || ""}
                onChange={handleInputChange}
                placeholder={`Talk to ${characterName} Sensei...`}
                className="w-full bg-neutral-950/80 border border-white/10 rounded-full py-4.5 pl-7 pr-16 text-base font-sans focus:outline-none focus:ring-1 focus:ring-rose-500/30 transition-all placeholder:text-neutral-600"
              />
              <div className="absolute right-2 flex items-center gap-1.5">
                <button 
                  type="button"
                  onClick={toggleRecording}
                  className={`p-2.5 rounded-full transition-all active:scale-90 shadow-lg ${
                    isRecording 
                    ? 'bg-rose-500 text-white animate-pulse' 
                    : 'bg-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                  title={isRecording ? "Stop Recording" : "Start Voice Input"}
                >
                  {isRecording ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </button>

                <button 
                  type="submit" 
                  disabled={!input?.trim() || isLoading}
                  className="p-2.5 bg-rose-500 text-white rounded-full hover:bg-rose-600 active:scale-90 disabled:opacity-30 disabled:hover:bg-rose-500 transition-all shadow-lg shadow-rose-500/20"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </form>
          <div className="max-w-4xl mx-auto mt-3 px-6 flex justify-between items-center text-[10px] text-neutral-600 tracking-widest uppercase font-bold">
            <span> I'll be your Sensei. </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              Conversational Immersion
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
