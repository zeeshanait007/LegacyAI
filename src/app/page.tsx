"use client";

import React, { useState, useEffect } from "react";
import {
  Film,
  History,
  Sparkles,
  Play,
  Pause,
  Download,
  RefreshCw,
  Image as ImageIcon,
  Mic,
  Settings,
  CheckCircle2,
  Clock,
  Layout,
  Edit3,
  Save,
  Terminal,
  FileText,
  LucideIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Heritage Scenes with Real Asset Paths
const INITIAL_HERITAGE_SCENES: Scene[] = [
  {
    id: 1,
    title: "The Visionary Dream (1907)",
    description: "Founding of TISCO by Jamsetji Tata",
    caption: "Sir Dorabji Tata fulfills his father's dream, establishing India's first steel plant in the jungles of Sakchi.",
    status: "idle",
    timestamp: 0,
    image: "/assets/tata/tata_founding_1907_1773071872422.png",
    motion: {
      parallax: { x: 20, y: 10, scale: 1.15 },
      particles: "dust" as const,
      objects: [{ icon: "History", label: "Founding Vision", x: 25, y: 40, delay: 2 }]
    }
  },
  {
    id: 2,
    title: "First Ingot (1912)",
    description: "The Birth of Indian Steel",
    caption: "The first steel ingot is rolled, marking India's entry into the global industrial revolution.",
    status: "idle",
    timestamp: 20,
    image: "/assets/tata/tata_first_ingot_1912_1773071893816.png",
    motion: {
      parallax: { x: -15, y: -5, scale: 1.1 },
      particles: "embers" as const,
      objects: [{ icon: "Sparkles", label: "Molten Steel", x: 60, y: 50, delay: 1.5 }]
    }
  },
  {
    id: 3,
    title: "Social Pioneering (1920)",
    description: "Legacy of Welfare",
    caption: "The Enterprise introduces the 8-hour workday and leave-with-pay, decades before they become global standards.",
    status: "idle",
    timestamp: 45,
    image: "/assets/tata/tata_welfare_1920s_1773071976811.png",
    motion: {
      parallax: { x: 10, y: 15, scale: 1.05 },
      particles: "dust" as const,
      objects: [{ icon: "CheckCircle2", label: "Welfare Charter", x: 30, y: 30, delay: 3 }]
    }
  },
  {
    id: 4,
    title: "Industrial Backbone (1940s)",
    description: "War Effort & Howrah Bridge",
    caption: "Supplying 23,000 tonnes of steel for the iconic Howrah Bridge, a testament to enduring strength.",
    status: "idle",
    timestamp: 70,
    image: "/assets/tata/tata_howrah_bridge_1940s_1773071912965.png",
    motion: {
      parallax: { x: 0, y: -20, scale: 1.2 },
      particles: "dust" as const,
      objects: [{ icon: "Layout", label: "Structural Core", x: 50, y: 40, delay: 2.5 }]
    }
  },
  {
    id: 5,
    title: "Global Reach (2007)",
    description: "Corus Acquisition",
    caption: "The Enterprise goes global, acquiring international partners and becoming one of the top ten industry leaders worldwide.",
    status: "idle",
    timestamp: 95,
    image: "/assets/tata/tata_global_modern_plant_1773071934794.png",
    motion: {
      parallax: { x: -20, y: 10, scale: 1.1 },
      particles: "digital" as const,
      objects: [{ icon: "Settings", label: "Global Network", x: 70, y: 30, delay: 2 }]
    }
  },
  {
    id: 6,
    title: "Green Steel Future (Present)",
    description: "Sustainability & Innovation",
    caption: "Pioneering hydrogen-ready pipes and carbon-neutral steel for a cleaner, greener planet.",
    status: "idle",
    timestamp: 120,
    image: "/assets/tata/tata_green_steel_future_1773071956870.png",
    motion: {
      parallax: { x: 15, y: -10, scale: 1.25 },
      particles: "digital" as const,
      objects: [{ icon: "Sparkles", label: "Clean Emission", x: 40, y: 60, delay: 3 }]
    }
  }
];

const INITIAL_FULL_SCRIPT = `[NARRATOR]
In the heart of the wilderness, a dream began to solidify. 1907. Sakchi. A place where the jungles met the future. Jamsetji Tata's vision, brought to life by his son, wasn't just about steel. It was about India.

[SCENE #1: THE DREAM]
(Visual: Sepia-toned wilderness, blueprints unfurling)
Jamsetji's spirit lived in every brick laid. The Founding Enterprise was born, a beacon of self-reliance.

[SCENE #2: THE FIRST INGOT]
(Visual: Molten metal, 1912)
1912. The first ingot is rolled. The heat was immense, but the resolve was greater. India was no longer just a consumer; it was a creator.

[SCENE #3: THE HUMAN STORY]
(Visual: Clean townships, happy families)
"We also make people before we make steel." Welfare was the foundation. 8-hour workdays. Clean hospitals. Jamshedpur became a model of dignity.

[SCENE #4: STRENGTH IN ADVERSITY]
(Visual: Howrah Bridge construction)
War. Depression. The bridge that held the nation together was made of Heritage Steel. Every rivet, a promise of endurance.

[SCENE #5: GLOBAL ASCENT]
(Visual: Modern plant, global horizon)
2007. Global expansion. From local roots to the shores of Europe, the Enterprise became a global force, proving that excellence knows no borders.

[SCENE #6: THE HORIZON]
(Visual: Green steel facility, clean energy)
Today, the mission continues. Hydrogen. Sustainability. Green Steel. Because the legacy we leave behind is as important as the strength we forge today.
`;

const NARRATIVE_THEME_POOL = [
  {
    id: "heritage",
    title: "The Century of Steel",
    desc: "A deep dive into founding principles and the rise of Jamshedpur.",
    prompt: "Generate a historical narrative focusing on the early 20th-century industrial revolution in India, highlighting the challenges of the Sakchi wilderness and the fulfillment of Jamsetji's vision."
  },
  {
    id: "impact",
    title: "Nation Builder",
    desc: "How the Enterprise became the backbone of national identity.",
    prompt: "Focus on the strategic importance of steel production in post-independence India, emphasizing nation-building projects like the Howrah Bridge and the role of steel in industrial self-reliance."
  },
  {
    id: "human",
    title: "People First",
    desc: "A narrative centered on ethical leadership and welfare.",
    prompt: "Highlight the pioneering social welfare initiatives of the Enterprise, specifically the 8-hour workday, leave with pay, and the holistic development of the industrial township."
  },
  {
    id: "innovation",
    title: "Future Forge",
    desc: "Technological leaps and sustainable industrialization.",
    prompt: "A forward-looking script focusing on R&D, green steel initiatives, and the digital transformation of the heritage facilities."
  }
];

const VIDEO_DURATION = 140;

interface MotionObject {
  icon: string;
  label: string;
  x: number;
  y: number;
  delay: number;
}

interface Scene {
  id: number;
  title: string;
  description: string;
  caption: string;
  status: "idle" | "loading" | "ready";
  timestamp: number;
  image: string;
  motion?: {
    parallax: { x: number; y: number; scale: number };
    particles: "embers" | "dust" | "digital" | "none";
    objects: MotionObject[];
  };
}

interface EngineConfig {
  voiceSynthesis: boolean;
  eraStyling: boolean;
  archiveSpidering: boolean;
  livingHeritage: boolean;
  notarizedVault: boolean;
  era: string;
  fidelity: number;
}

const ParticleField = ({ type }: { type: "embers" | "dust" | "digital" | "none" }) => {
  const [particles] = useState(() =>
    Array.from({ length: 40 }).map(() => ({ // Increased to 40
      width: Math.random() * 6 + 2, // Larger
      height: Math.random() * 6 + 2,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 3 + 2, // Much faster
      delay: Math.random() * 2,
      yDest: -150 - Math.random() * 300,
      xDest: (Math.random() - 0.5) * 100,
    }))
  );

  if (type === "none") return null;
  const color = type === "embers" ? "bg-orange-600/70" : type === "dust" ? "bg-gold/50" : "bg-blue-300/60"; // Higher opacity

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className={cn("absolute rounded-full blur-[1px]", color)}
          style={{ width: p.width, height: p.height, left: p.left, top: p.top }}
          animate={{
            y: [0, p.yDest],
            x: [0, p.xDest],
            opacity: [0, 1, 0.4, 0],
            scale: [1, 2, 0.5]
          }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay }}
        />
      ))}
    </div>
  );
};

const LivingDiorama = ({ scene, isPlaying }: { scene: Scene; isPlaying: boolean }) => {
  if (!scene.motion) return <img src={scene.image} className="w-full h-full object-cover grayscale brightness-75" alt="Scene" />;

  const { parallax, particles, objects } = scene.motion;
  const ICON_MAP: Record<string, LucideIcon> = { History, Sparkles, CheckCircle2, Layout, Settings };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black rounded-[inherit]">
      {/* Background Layer: Slow Dramatic Drift */}
      <motion.img
        src={scene.image}
        className="absolute inset-x-[-30%] inset-y-[-30%] w-[160%] h-[160%] object-cover grayscale brightness-[0.4] blur-[4px] scale-150"
        animate={{
          x: isPlaying ? [-parallax.x * 2, parallax.x * 2] : [-parallax.x / 2, parallax.x / 2],
          y: isPlaying ? [-parallax.y * 2, parallax.y * 2] : [-parallax.y / 2, parallax.y / 2],
        }}
        transition={{ duration: isPlaying ? 12 : 30, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
        alt="Background"
      />

      {/* Midground Layer: Extreme Ken Burns */}
      <motion.img
        src={scene.image}
        className="absolute inset-[-20%] w-[140%] h-[140%] object-cover grayscale brightness-[0.8] contrast-150 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        animate={{
          x: isPlaying ? [parallax.x * 3, -parallax.x * 3] : [0, 5],
          y: isPlaying ? [parallax.y * 3, -parallax.y * 3] : [0, 5],
          scale: isPlaying ? [1.2, 1.2 + (parallax.scale - 1) * 3] : 1.2
        }}
        transition={{ duration: isPlaying ? 15 : 40, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        alt="Midground"
      />

      <ParticleField type={particles} />

      {/* Neural Entities Overlay: High Impact Presence */}
      {objects.map((obj, idx) => {
        const Icon = ICON_MAP[obj.icon] || Sparkles;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0, y: 50 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: isPlaying ? [25, -25, 25] : [5, -5, 5],
              y: isPlaying ? [-25, 25, -25] : [-5, 5, -5]
            }}
            transition={{
              delay: obj.delay,
              duration: 2.0,
              x: { duration: isPlaying ? 6 : 12, repeat: Infinity, ease: "easeInOut" },
              y: { duration: isPlaying ? 8 : 15, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute z-20 pointer-events-none"
            style={{ left: `${obj.x}%`, top: `${obj.y}%` }}
          >
            <div className="flex flex-col items-center gap-3">
              <motion.div
                animate={isPlaying ? { y: [0, -10, 0], scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-14 h-14 rounded-2xl bg-black/80 border-2 border-gold/50 backdrop-blur-3xl flex items-center justify-center text-gold shadow-[0_0_50px_rgba(212,175,55,0.4)] ring-2 ring-white/10"
              >
                <Icon className="w-7 h-7" />
                <motion.div className="absolute inset-0 border-2 border-gold/40 rounded-2xl" animate={{ opacity: [0.4, 1.0, 0.4], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 4 }} />
              </motion.div>
              <div className="bg-black/95 px-4 py-2 rounded-xl border border-gold/20 backdrop-blur-2xl shadow-2xl">
                <span className="text-[10px] font-black text-gold uppercase tracking-[0.3em] whitespace-nowrap drop-shadow-md">
                  {obj.label}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Neural Active Badge */}
      <div className="absolute top-6 left-6 z-40 flex items-center gap-3 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-gold/20 shadow-2xl">
        <div className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse shadow-[0_0_10px_rgba(212,175,55,1)]" />
        <span className="text-[8px] font-black text-gold/80 uppercase tracking-widest">Neural Motion Active</span>
      </div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)] pointer-events-none z-30 opacity-60" />
    </div>
  );
};

export default function Dashboard() {
  const [status, setStatus] = useState<"idle" | "uploading" | "analyzing" | "scripting" | "generating" | "complete">("idle");
  const [globalProgress, setGlobalProgress] = useState(0);
  const [selectedScript, setSelectedScript] = useState<string | null>(null);
  const [showScript, setShowScript] = useState(false);
  const [narrativeThemes, setNarrativeThemes] = useState<typeof NARRATIVE_THEME_POOL>([]);

  const [scenes, setScenes] = useState<Scene[]>(INITIAL_HERITAGE_SCENES);
  const [masterScript, setMasterScript] = useState(INITIAL_FULL_SCRIPT);
  const [editingSceneId, setEditingSceneId] = useState<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [showPromptId, setShowPromptId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [engineConfig, setEngineConfig] = useState<EngineConfig>({
    voiceSynthesis: true,
    eraStyling: true,
    archiveSpidering: false,
    livingHeritage: false,
    notarizedVault: true,
    era: "1900s",
    fidelity: 85
  });

  const handleUpload = () => {
    setStatus("uploading");
    setNarrativeThemes([]);
    let p = 0;
    const interval = setInterval(() => {
      p += 1.5;
      setGlobalProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStatus("analyzing");

        // Simulated AI Theme Generation
        setTimeout(() => {
          setNarrativeThemes(NARRATIVE_THEME_POOL.slice(0, 3));
          setStatus("scripting");
          setGlobalProgress(0);
        }, 2000);
      }
    }, 40);
  };

  const handleRegenerateScene = (sceneId: number) => {
    setScenes(prev => prev.map(s => s.id === sceneId ? { ...s, status: "loading" } : s));

    setTimeout(() => {
      setScenes(prev => prev.map(s => {
        if (s.id === sceneId) {
          return {
            ...s,
            status: "ready" as const,
            caption: s.caption + " (Refined for cinematic impact.)"
          };
        }
        return s;
      }));
    }, 2000);
  };

  const handleRefineScript = () => {
    setStatus("analyzing");
    setGlobalProgress(10);
    setTimeout(() => {
      setStatus("scripting");
      setGlobalProgress(0);
      alert("Narrative models refined. New script parameters applied.");
    }, 1500);
  };

  const startMasterGeneration = () => {
    if (!selectedScript) return;
    setStatus("generating");
    setGlobalProgress(0);

    const generateScene = (idx: number) => {
      if (idx >= scenes.length) {
        setStatus("complete");
        return;
      }

      setScenes(prev => prev.map((s, i) => i === idx ? { ...s, status: "loading" } : s));

      setTimeout(() => {
        setScenes(prev => prev.map((s, i) => i === idx ? { ...s, status: "ready" } : s));
        setGlobalProgress(((idx + 1) / scenes.length) * 100);
        // Sequential call to next scene
        setTimeout(() => generateScene(idx + 1), 500);
      }, 1500);
    };

    generateScene(0);
  };

  const togglePlayback = () => {
    if (!scenes.every(s => s.status === "ready")) return;
    setIsPlaying(!isPlaying);
  };

  const [activeSceneIdx, setActiveSceneIdx] = useState(0);

  // Voice-Over & Seamless Transition Logic
  useEffect(() => {
    if (isPlaying && scenes[activeSceneIdx]?.status === "ready") {
      const synth = window.speechSynthesis;
      synth.cancel();

      const utterance = new SpeechSynthesisUtterance(scenes[activeSceneIdx].caption);

      const voices = synth.getVoices();
      const preferredVoice = voices.find(v => v.name.includes("Male") || v.name.includes("UK English")) || voices[0];
      if (preferredVoice) utterance.voice = preferredVoice;

      utterance.pitch = 1.15;
      utterance.rate = 1.05;
      utterance.volume = 1.0;

      utterance.onend = () => {
        if (activeSceneIdx < scenes.length - 1) {
          // Advance to next scene immediately
          setActiveSceneIdx(prev => prev + 1);
          // Update currentTime to match new scene "theoretical" timestamp for progress bar
          setCurrentTime(scenes[activeSceneIdx + 1].timestamp);
        } else {
          setIsPlaying(false);
          setActiveSceneIdx(0);
          setCurrentTime(0);
        }
      };

      synth.speak(utterance);
    } else {
      window.speechSynthesis.cancel();
    }
  }, [activeSceneIdx, isPlaying, scenes]);

  // Smoother Progress Bar Animation (visual only)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= VIDEO_DURATION) return prev;
          return prev + 0.1;
        });
      }, 100);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isPlaying]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMaximized(false);
        setIsSettingsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <main className="max-w-[1600px] mx-auto p-6 lg:p-10 space-y-8 h-screen flex flex-col overflow-hidden bg-obsidian text-slate-300">
      {/* Premium Header */}
      <nav className="flex items-center justify-between pb-6 border-b border-gold/10 flex-shrink-0 relative z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gold flex items-center justify-center rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.2)]">
              <History className="text-obsidian w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-white tracking-tight">LegacyAI</h1>
              <p className="text-[10px] text-gold/60 font-black uppercase tracking-[0.3em]">Institutional Memory Engine</p>
            </div>
          </div>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gold/5 border border-gold/10 rounded-xl hover:bg-gold/10 transition-all group"
          >
            <Settings className="w-4 h-4 text-gold group-hover:rotate-90 transition-all duration-500" />
            <span className="text-[9px] font-black text-slate-400 group-hover:text-gold uppercase tracking-widest">Neural Config</span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-10 text-[11px] font-bold uppercase tracking-widest text-slate-500">
          <a href="#" className="text-gold border-b-2 border-gold/40 pb-1">Production Hub</a>
          <a href="#" className="hover:text-gold transition-all">Archival Library</a>
          <a href="#" className="hover:text-gold transition-all">AI Engine v2.4</a>
          <a href="#" className="hover:text-gold transition-all">Support</a>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-white">Demo</span>
            <span className="text-[9px] text-gold/60 font-medium">Enterprise License</span>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-gold/20 p-0.5 shadow-xl">
            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center font-bold text-gold text-xs">TS</div>
          </div>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start flex-1 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent pointer-events-none" />

        {/* Left: Engine Metadata */}
        <div className="lg:col-span-3 space-y-6 h-full overflow-y-auto pr-2 scrollbar-none">
          <section className="glass p-6 space-y-6 border-gold/10 hover:border-gold/20 transition-all duration-500">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-black tracking-widest text-gold uppercase flex items-center gap-2">
                <Terminal className="w-4 h-4" /> ENGINE STATUS
              </h2>
              {status === "complete" && <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />}
            </div>

            <AnimatePresence mode="wait">
              {status === "idle" ? (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={handleUpload}
                  className="border border-gold/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-5 hover:border-gold/30 transition-all group cursor-pointer bg-gold/[0.02] shadow-inner"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gold/5 border border-gold/10 flex items-center justify-center group-hover:bg-gold/10 group-hover:scale-105 transition-all duration-500">
                    <FileText className="text-gold w-7 h-7" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-slate-200 uppercase tracking-widest mb-1">Upload Archive</p>
                    <p className="text-[9px] text-slate-600 font-medium leading-relaxed">Accepting PDF, DOCX, and Legacy Media Archives.</p>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                        <RefreshCw className="w-3 h-3 text-gold" />
                      </motion.div>
                      <span className="text-[10px] font-bold uppercase text-gold tracking-widest">{status}</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-500">{Math.floor(globalProgress)}%</span>
                  </div>
                  <div className="h-1 bg-slate-900 rounded-full overflow-hidden shadow-inner">
                    <motion.div className="h-full bg-gradient-to-r from-gold/50 to-gold" animate={{ width: `${globalProgress}%` }} />
                  </div>
                  <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800 font-mono text-[9px] text-slate-500 leading-normal">
                    {status === "uploading" ? "> Ingesting TATASTEEL_HERITAGE.PDF...\n> Buffer sync 4k/4k..." :
                      status === "analyzing" ? "> Extracting milestones...\n> Key found: 1907 Sakchi Foundry" :
                        "> Script generated. Waiting for narrative lock."}
                  </div>
                  {(status === "scripting" || status === "complete") && (
                    <button
                      onClick={() => setShowArchive(true)}
                      className="w-full py-2.5 rounded-xl border border-gold/20 bg-gold/5 text-[9px] font-black text-gold uppercase tracking-[0.2em] hover:bg-gold/10 transition-all flex items-center justify-center gap-2"
                    >
                      <FileText className="w-3 h-3" /> View Source Archive
                    </button>
                  )}
                </div>
              )}
            </AnimatePresence>

            <div className="space-y-4 pt-4 border-t border-gold/5">
              <div className="flex items-center justify-between mb-4">
                <label className="text-[9px] uppercase tracking-widest text-slate-600 font-black">NARRATIVE THEMES</label>
                {(status === "scripting" || status === "complete") && (
                  <button
                    onClick={handleRefineScript}
                    className="text-[8px] font-bold text-gold uppercase hover:underline flex items-center gap-1 bg-gold/5 px-2 py-1 rounded border border-gold/10"
                  >
                    <RefreshCw className="w-2.5 h-2.5" /> REGENERATE SCRIPT
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {narrativeThemes.length === 0 && (status === "idle" || status === "uploading" || status === "analyzing") && (
                  <div className="p-8 border border-dashed border-slate-800 rounded-xl text-center space-y-2 opacity-40">
                    <Sparkles className="w-5 h-5 text-slate-700 mx-auto" />
                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600">Waiting for Data Ingestion</p>
                  </div>
                )}
                {narrativeThemes.map((opt) => (
                  <div key={opt.id} className="space-y-2">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        if (!(status === "idle" || status === "uploading" || status === "analyzing")) {
                          setSelectedScript(opt.id);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          if (!(status === "idle" || status === "uploading" || status === "analyzing")) {
                            setSelectedScript(opt.id);
                          }
                        }
                      }}
                      className={cn(
                        "w-full p-4 rounded-xl border text-left transition-all relative overflow-hidden group shadow-sm cursor-pointer",
                        selectedScript === opt.id ? "border-gold/40 bg-gold/[0.05]" : "border-slate-800 bg-slate-900/30 hover:border-slate-700",
                        (status === "idle" || status === "uploading" || status === "analyzing") && "opacity-20 grayscale cursor-not-allowed"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <p className="text-[10px] font-black text-white uppercase tracking-widest">{opt.title}</p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowPromptId(showPromptId === opt.id ? null : opt.id);
                            }}
                            className={cn(
                              "p-1.5 rounded-lg transition-all duration-300",
                              showPromptId === opt.id ? "bg-gold/20 text-gold shadow-[0_0_10px_rgba(212,175,55,0.2)]" : "text-slate-600 hover:text-gold hover:bg-gold/10"
                            )}
                            title="Show Engine Prompt"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {selectedScript === opt.id && <div className="w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_8px_rgba(212,175,55,1)]" />}
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-medium">{opt.desc}</p>
                    </div>

                    <AnimatePresence>
                      {showPromptId === opt.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 rounded-xl bg-slate-950/50 border border-gold/10 mb-2">
                            <p className="text-[8px] font-black text-gold/60 uppercase tracking-widest mb-2 flex items-center gap-2">
                              <Terminal className="w-2.5 h-2.5" /> Engine Prompt
                            </p>
                            <p className="text-[9px] text-slate-400 font-mono leading-relaxed italic">
                              &ldquo;{opt.prompt}&rdquo;
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Script Console Overlay */}
          <AnimatePresence>
            {showScript && (
              <motion.section
                initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="glass p-5 bg-black/80 border-gold/20 overflow-hidden font-mono text-[8px] text-gold/80 leading-relaxed max-h-[300px] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-3 border-b border-gold/10 pb-2 flex-shrink-0">
                  <span className="flex items-center gap-2 uppercase tracking-widest font-black text-gold">AI SCRIPT OUTPUT</span>
                  <button onClick={() => setShowScript(false)} className="hover:text-white">✕</button>
                </div>
                <textarea
                  className="w-full bg-transparent border-none text-[8px] text-slate-400 font-mono leading-relaxed focus:outline-none resize-none scrollbar-none flex-1 min-h-[200px]"
                  value={masterScript}
                  onChange={(e) => setMasterScript(e.target.value)}
                />
                <div className="mt-4 pt-2 border-t border-gold/5 flex justify-end flex-shrink-0">
                  <span className="text-[7px] font-black text-gold uppercase tracking-widest flex items-center gap-1 opacity-50"><Save className="w-2 h-2" /> Auto-syncing to narrative engine</span>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        {/* Center: Interactive Storyboard */}
        <div className="lg:col-span-5 flex flex-col h-full overflow-hidden">
          <section className="glass p-6 flex flex-col flex-1 overflow-hidden shadow-3xl bg-obsidian border-gold/5">
            <div className="flex items-center justify-between border-b border-gold/10 pb-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold/5 border border-gold/10 flex items-center justify-center">
                  <Film className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h2 className="text-sm font-black text-white uppercase tracking-[0.1em]">Storyboard</h2>
                  <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-0.5">Production Status: {status === "complete" ? "Verified" : status === "generating" ? "Synthesizing" : "Standby"}</p>
                </div>
              </div>
              <Settings
                onClick={() => setIsSettingsOpen(true)}
                className="w-4 h-4 text-slate-700 hover:text-gold cursor-pointer transition-all"
              />
            </div>

            <div className="flex-1 overflow-y-auto pr-3 space-y-4 mt-6 scrollbar-thin scrollbar-thumb-gold/10">
              <AnimatePresence initial={false}>
                {status === "idle" || status === "uploading" || status === "analyzing" ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-12 space-y-8">
                    <div className="relative">
                      <Layout className="w-20 h-20 text-slate-900" />
                      <motion.div
                        className="absolute inset-0 border border-gold/20 rounded-2xl"
                        animate={{ opacity: [0, 1, 0], scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-[11px] font-black text-slate-800 uppercase tracking-[0.3em]">Neural Interface Offline</p>
                      <p className="text-[10px] text-slate-600 max-w-[200px] leading-relaxed mx-auto uppercase tracking-tighter">Please initiate archive ingestion to visualize heritage sequence.</p>
                    </div>
                  </div>
                ) : (
                  scenes.map((scene, idx) => (
                    <motion.div
                      key={scene.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: activeSceneIdx === idx && isPlaying ? 1.03 : 1 }}
                      className={cn(
                        "p-5 rounded-2xl border transition-all duration-700 relative group overflow-hidden shadow-sm",
                        activeSceneIdx === idx && isPlaying ? "border-gold bg-gold/5 shadow-[0_0_30px_rgba(212,175,55,0.05)] ring-1 ring-gold/20" :
                          scene.status === "ready" ? "border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:shadow-lg" :
                            "border-slate-900 bg-slate-950/20 opacity-30 blur-[1px]"
                      )}
                    >
                      {activeSceneIdx === idx && isPlaying && (
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gold shadow-[0_0_15px_rgba(212,175,55,1)]" />
                      )}

                      <div className="flex gap-6">
                        {/* High Fidelity Thumbnail */}
                        <div className="w-40 h-24 rounded-xl bg-black overflow-hidden relative flex-shrink-0 border border-slate-800 group-hover:border-gold/30 transition-all duration-500">
                          {scene.status === "loading" ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80">
                              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}>
                                <RefreshCw className="w-6 h-6 text-gold/30" />
                              </motion.div>
                            </div>
                          ) : scene.status === "ready" ? (
                            <LivingDiorama scene={scene} isPlaying={false} />
                          ) : (
                            <Clock className="w-7 h-7 text-slate-900 m-auto mt-8" />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-2.5">
                            <span className="text-[9px] font-black text-gold uppercase tracking-[0.2em]">{formatTime(scene.timestamp)}</span>
                          </div>
                        </div>

                        {/* Story Content */}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xs font-black text-white uppercase tracking-widest">{scene.title}</h3>
                              <p className="text-[9px] text-gold/60 font-black uppercase tracking-[0.1em] mt-0.5">{scene.description}</p>
                            </div>
                            {scene.status === "ready" && !isPlaying && (
                              <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <button
                                  onClick={() => setEditingSceneId(scene.id)}
                                  className="p-1.5 hover:bg-slate-800 rounded text-slate-500 hover:text-gold border border-transparent hover:border-gold/20"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleRegenerateScene(scene.id)}
                                  className="p-1.5 hover:bg-slate-800 rounded text-slate-500 hover:text-gold border border-transparent hover:border-gold/20"
                                >
                                  <RefreshCw className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </div>

                          <AnimatePresence>
                            {editingSceneId === scene.id ? (
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 pt-2">
                                <textarea
                                  className="w-full bg-slate-950 border border-gold/40 rounded-xl p-3 text-[10px] text-slate-300 focus:outline-none h-20 shadow-inner"
                                  defaultValue={scene.caption}
                                  onBlur={(e) => {
                                    const val = e.target.value;
                                    setScenes(prev => prev.map(s => s.id === scene.id ? { ...s, caption: val } : s));
                                    setEditingSceneId(null);
                                  }}
                                  autoFocus
                                />
                                <div className="flex justify-end gap-2 text-[8px] font-black uppercase tracking-widest text-gold cursor-pointer hover:underline">
                                  <Save className="w-2.5 h-2.5" /> Commit Change
                                </div>
                              </motion.div>
                            ) : (
                              <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic border-l-2 border-gold/10 pl-3">&quot;{scene.caption}&quot;</p>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            <div className="pt-6 border-t border-gold/5 flex-shrink-0">
              <button
                onClick={startMasterGeneration}
                disabled={!selectedScript || status === "generating" || (status === "complete")}
                className={cn(
                  "w-full py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] transition-all relative overflow-hidden group shadow-2xl active:scale-[0.99] border",
                  selectedScript && status !== "complete" && status !== "generating"
                    ? "bg-gold text-obsidian border-gold/50 shadow-gold/10"
                    : "bg-slate-900 border-slate-800 text-slate-700 grayscale"
                )}
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <Sparkles className="w-4 h-4" />
                  {status === "generating" ? "Synthesizing Heritage Sequence..." : status === "complete" ? "Master Export Primed" : "Initiate Heritage Synthesis"}
                </div>
                {status === "generating" && (
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    initial={{ width: 0 }} animate={{ width: `${globalProgress}%` }}
                  />
                )}
              </button>
            </div>
          </section>
        </div>

        {/* Right: Master Heritage Player */}
        <div className="lg:col-span-4 h-full flex flex-col overflow-hidden space-y-8">
          <section className="glass p-8 rounded-[2rem] flex flex-col space-y-8 border-gold/10 shadow-3xl bg-obsidian relative overflow-hidden group/player">
            <div className="absolute top-0 left-0 w-full h-1 bg-gold/5 overflow-hidden">
              <motion.div className="h-full bg-gold/20" animate={{ x: ["-100%", "100%"] }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} />
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-xs font-black tracking-widest text-gold uppercase flex items-center gap-3">
                <Sparkles className="w-5 h-5" /> MASTER PLAYER
              </h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMaximized(true)}
                  className="p-1.5 hover:bg-slate-800 rounded text-slate-500 hover:text-gold border border-transparent hover:border-gold/20 transition-all"
                  title="Cinematic Mode"
                >
                  <Layout className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="p-1.5 hover:bg-slate-800 rounded text-slate-500 hover:text-gold border border-transparent hover:border-gold/20 transition-all"
                  title="Neural Settings"
                >
                  <Settings className="w-3.5 h-3.5" />
                </button>
                <div className="flex gap-1">
                  {[1, 2, 3].map(i => <div key={i} className="w-1 h-3 bg-gold/20 rounded-full" />)}
                </div>
              </div>
            </div>

            {/* Cinematic Video Player */}
            <div className="aspect-video bg-black rounded-2xl border border-slate-800 relative group overflow-hidden shadow-2xl ring-1 ring-gold/10">
              <AnimatePresence mode="wait">
                {!scenes.every(s => s.status === "ready") ? (
                  <motion.div
                    key="locked"
                    className="absolute inset-0 flex flex-col items-center justify-center bg-obsidian/90 backdrop-blur-xl z-20 space-y-6"
                  >
                    <div className="w-24 h-24 rounded-full border-2 border-gold/10 flex items-center justify-center bg-gold/[0.02] relative">
                      <History className="text-gold/10 w-12 h-12" />
                      <motion.div
                        className="absolute inset-0 border-2 border-gold/30 rounded-full border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                      />
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gold/30">Archives Locked</p>
                      <p className="text-[9px] text-slate-700 font-bold uppercase tracking-widest tracking-tighter">Synthesize assets to unlock production deck</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="active"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black"
                  >
                    {/* Cinematic Visual Feed: Living Diorama Engine */}
                    <AnimatePresence>
                      <motion.div
                        key={activeSceneIdx}
                        initial={{ opacity: 0, filter: "blur(20px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, transition: { duration: 1.0 } }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute inset-0"
                      >
                        <LivingDiorama scene={scenes[activeSceneIdx]} isPlaying={isPlaying} />
                      </motion.div>
                    </AnimatePresence>

                    {/* Dramatic Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 z-10" />
                    <div className="absolute inset-0 border-[40px] border-black/20 pointer-events-none z-10" />

                    <motion.div
                      key={activeSceneIdx + "_text"}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2, delay: 0.5 }}
                      className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center space-y-6 z-20"
                    >
                      <motion.span
                        initial={{ width: 0 }} animate={{ width: "auto" }}
                        className="text-[9px] text-gold font-black tracking-[0.5em] uppercase border-b border-gold/40 pb-1"
                      >
                        HISTORIC • HERITAGE ARCHIVE
                      </motion.span>
                      <h4 className="text-3xl font-serif font-bold text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] px-10 italic">
                        {scenes[activeSceneIdx].title}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium max-w-[320px] leading-relaxed tracking-wide drop-shadow-lg">
                        {scenes[activeSceneIdx].caption}
                      </p>
                    </motion.div>

                    {/* Master Play Controls */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center z-50">
                      <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: "#D4AF37" }} whileTap={{ scale: 0.9 }}
                        onClick={togglePlayback}
                        className="w-24 h-24 rounded-full bg-gold/90 flex items-center justify-center shadow-[0_0_60px_rgba(212,175,55,0.3)] transition-all"
                      >
                        {isPlaying ? <Pause className="text-obsidian w-10 h-10" /> : <Play className="text-obsidian w-10 h-10 ml-2" />}
                      </motion.button>
                    </div>

                    {/* Pro Timeline */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 pt-20 bg-gradient-to-t from-black via-black/80 to-transparent z-40">
                      <div className="relative h-1.5 bg-slate-800 rounded-full mb-5 overflow-hidden cursor-pointer group/timeline" onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const percent = (e.clientX - rect.left) / rect.width;
                        setCurrentTime(percent * VIDEO_DURATION);
                      }}>
                        <motion.div
                          className="h-full bg-gold relative"
                          animate={{ width: `${(currentTime / VIDEO_DURATION) * 100}%` }}
                          transition={{ type: "tween", ease: "linear" }}
                        >
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full scale-0 group-hover/timeline:scale-100 transition-all shadow-[0_0_15px_rgba(212,175,55,0.8)]" />
                        </motion.div>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-black text-gold uppercase tracking-[0.2em] drop-shadow-md">
                        <div className="flex gap-4">
                          <span>{formatTime(currentTime)} / {formatTime(VIDEO_DURATION)}</span>
                          <span className="text-slate-600">|</span>
                          <span>SEQ_{activeSceneIdx + 1}</span>
                        </div>
                        <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" /> REC • MASTER</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-8 pt-2">
              <div className="flex items-center justify-between border-b border-gold/10 pb-8">
                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-white uppercase tracking-widest">Heritage Cinema Export</h4>
                  <div className="flex gap-3 text-[9px] font-black text-slate-600 uppercase tracking-widest">
                    <span>4K UHD</span>
                    <span>24.00 FPS</span>
                    <span>10-Bit Color</span>
                  </div>
                </div>
                <button
                  disabled={!scenes.every(s => s.status === "ready")}
                  className={cn(
                    "px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all active:scale-95 shadow-xl",
                    scenes.every(s => s.status === "ready") ? "bg-gold text-obsidian border-gold/50 shadow-gold/10 hover:brightness-110" : "bg-slate-900 border-slate-800 text-slate-700"
                  )}
                >
                  <Download className="w-4 h-4 mr-2 inline" /> Final Export
                </button>
              </div>

              {/* Narrator Engine */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-700">Audio Synthesis Engine</h4>
                <div className="p-6 bg-gold/[0.03] rounded-2xl border border-gold/10 flex items-center justify-between group/audio">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-gold shadow-2xl group-hover/audio:border-gold/30 transition-all">
                      <Mic className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white uppercase tracking-widest">The Pioneer Voice</p>
                      <p className="text-[10px] text-slate-500 font-medium">ElevenLabs • Cinematic Baritone • Visionary Deep</p>
                    </div>
                  </div>
                  <div className="flex items-end gap-1 h-6">
                    {isPlaying ? [0, 1, 2, 3, 4, 5].map(i => (
                      <motion.div key={i} animate={{ height: [4, 16, 8, 20, 6, 12] }} transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }} className="w-1 bg-gold/60 rounded-full" />
                    )) : [0, 1, 2, 3, 4, 5].map(i => <div key={i} className="w-1 h-1 bg-slate-800 rounded-full" />)}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Stats */}
          <section className="glass p-6 border-gold/10 flex items-center justify-around text-center flex-shrink-0">
            <div className="space-y-1">
              <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Render Time</p>
              <p className="text-xs font-bold text-white">4.2s / Scene</p>
            </div>
            <div className="w-px h-6 bg-gold/10" />
            <div className="space-y-1">
              <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">AI Fidelity</p>
              <p className="text-xs font-bold text-gold">ULTRA-PRO</p>
            </div>
            <div className="w-px h-6 bg-gold/10" />
            <div className="space-y-1">
              <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Archival Acc.</p>
              <p className="text-xs font-bold text-white">98.4%</p>
            </div>
          </section>
        </div>
      </div>
      {/* Cinematic Modal Player */}
      <AnimatePresence>
        {isMaximized && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-obsidian/95 backdrop-blur-2xl flex flex-col p-8 lg:p-16"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold flex items-center justify-center rounded-xl">
                  <History className="text-obsidian w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-xl font-serif font-bold text-white tracking-tight">Cinematic Mode</h2>
                  <p className="text-[10px] text-gold/60 font-black uppercase tracking-widest">Master Production Preview</p>
                </div>
              </div>
              <button
                onClick={() => setIsMaximized(false)}
                className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-slate-500 hover:text-gold hover:border-gold/60 transition-all bg-slate-900/50"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 relative rounded-3xl overflow-hidden border border-gold/20 bg-black shadow-[0_0_100px_rgba(212,175,55,0.1)] group">
              <AnimatePresence>
                {scenes[activeSceneIdx] && (
                  <motion.div
                    key={scenes[activeSceneIdx].id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 1.0 } }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <div className="absolute inset-0">
                      <LivingDiorama scene={scenes[activeSceneIdx]} isPlaying={isPlaying} />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-12 lg:p-20 flex flex-col justify-end">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl space-y-6"
                      >
                        <span className="text-[10px] text-gold font-black tracking-[0.5em] uppercase border-b border-gold/40 pb-2 inline-block">
                          CINEMATIC HERITAGE PRODUCTION
                        </span>
                        <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white italic leading-tight">
                          {scenes[activeSceneIdx].title}
                        </h1>
                        <p className="text-lg lg:text-xl text-slate-300 font-medium leading-relaxed max-w-2xl">
                          {scenes[activeSceneIdx].caption}
                        </p>
                      </motion.div>
                    </div>

                    {/* Controls in Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                      <button
                        onClick={togglePlayback}
                        className="w-32 h-32 rounded-full bg-gold flex items-center justify-center shadow-[0_0_80px_rgba(212,175,55,0.4)]"
                      >
                        {isPlaying ? <Pause className="text-obsidian w-12 h-12" /> : <Play className="text-obsidian w-12 h-12 ml-2" />}
                      </button>
                    </div>

                    {/* Timeline in Overlay */}
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gold"
                          animate={{ width: `${(currentTime / VIDEO_DURATION) * 100}%` }}
                        />
                      </div>
                      <div className="mt-4 flex justify-between text-[10px] text-gold font-bold uppercase tracking-widest">
                        <span>{formatTime(currentTime)}</span>
                        <span className="flex items-center gap-2"><div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" /> REC • 4K MASTER PREVIEW</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Advanced Neural Configuration Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass max-w-2xl w-full p-10 space-y-10 border-gold/20 shadow-[0_0_100px_rgba(212,175,55,0.1)] relative overflow-hidden bg-obsidian/80"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold/10 border border-gold/20 flex items-center justify-center rounded-2xl">
                    <Settings className="w-6 h-6 text-gold animate-[spin_10s_linear_infinite]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-serif font-bold text-white tracking-tight text-gold">Neural Configuration</h2>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">Advanced AI Inference Settings</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="w-10 h-10 rounded-full border border-gold/10 flex items-center justify-center text-slate-500 hover:text-gold transition-all"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Style Engine */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gold/60 border-b border-gold/10 pb-2">Aesthetic Rendering</h4>
                  <div className="space-y-4">
                    <label className="block space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Historical Era Target</span>
                      <select
                        value={engineConfig.era}
                        onChange={(e) => setEngineConfig({ ...engineConfig, era: e.target.value })}
                        className="w-full bg-slate-950 border border-gold/10 rounded-xl px-4 py-3 text-xs text-slate-300 focus:border-gold/40 transition-all outline-none"
                      >
                        <option value="1900s">1900s - Orthochromatic</option>
                        <option value="1950s">1950s - Kodachrome</option>
                        <option value="1980s">1980s - Analog Corporate</option>
                        <option value="modern">Modern - Cinematic 4K</option>
                      </select>
                    </label>

                    <div className="space-y-3">
                      <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500">
                        <span>Authenticity Fidelity</span>
                        <span className="text-gold">{engineConfig.fidelity}%</span>
                      </div>
                      <input
                        type="range"
                        min="0" max="100"
                        value={engineConfig.fidelity}
                        onChange={(e) => setEngineConfig({ ...engineConfig, fidelity: parseInt(e.target.value) })}
                        className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-gold"
                      />
                    </div>
                  </div>
                </div>

                {/* Sub-System Toggles */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gold/60 border-b border-gold/10 pb-2">Active Sub-Systems</h4>
                  <div className="space-y-5">
                    {[
                      { id: "voiceSynthesis", label: "Founder Voice Cloning", icon: Mic },
                      { id: "eraStyling", label: "Era-Specific Texturing", icon: ImageIcon },
                      { id: "archiveSpidering", label: "Semantic Archive Spider", icon: History },
                      { id: "livingHeritage", label: "Dynamic Live Ingest", icon: RefreshCw },
                      { id: "notarizedVault", label: "Blockchain Notarization", icon: CheckCircle2 },
                    ].map((item) => {
                      const Icon = item.icon;
                      const configId = item.id as keyof EngineConfig;
                      const active = engineConfig[configId] as boolean;
                      return (
                        <div
                          key={item.id}
                          className="flex items-center justify-between group cursor-pointer"
                          onClick={() => setEngineConfig({ ...engineConfig, [configId]: !active })}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={cn("w-4 h-4 transition-all", active ? "text-gold" : "text-slate-700")} />
                            <span className={cn("text-[11px] font-bold uppercase tracking-tight transition-all", active ? "text-slate-200" : "text-slate-600")}>{item.label}</span>
                          </div>
                          <div className={cn("w-8 h-4 rounded-full relative transition-all duration-300", active ? "bg-gold/40" : "bg-slate-900 border border-slate-800")}>
                            <motion.div
                              animate={{ x: active ? 16 : 0 }}
                              className={cn("absolute top-0.5 left-0.5 w-3 h-3 rounded-full", active ? "bg-gold shadow-[0_0_10px_rgba(212,175,55,1)]" : "bg-slate-700")}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-10 py-4 bg-gold text-obsidian text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:brightness-110 active:scale-95 transition-all shadow-2xl"
                >
                  Apply Configuration
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Source Archive Modal */}
      <AnimatePresence>
        {showArchive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-end bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              className="w-full max-w-xl h-full bg-white shadow-2xl overflow-y-auto p-12 transition-all"
            >
              <div className="flex items-center justify-between mb-12 border-b border-slate-100 pb-6">
                <div>
                  <h2 className="text-2xl font-serif font-black text-slate-900 tracking-tight">TATASTEEL_HERITAGE.pdf</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 italic">Source Document • Original Scan (1907-2024)</p>
                </div>
                <button onClick={() => setShowArchive(false)} className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500 transition-all">✕</button>
              </div>

              <div className="space-y-12">
                <section className="space-y-6">
                  <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest border-l-4 border-blue-600 pl-4">Institutional Abstract</h3>
                  <div className="p-8 bg-slate-50 rounded-2xl text-[13px] leading-relaxed text-slate-600 font-medium italic shadow-inner">
                    &quot;This document serves as the primary historical record of the Tata Iron and Steel Company (TISCO), established in 1907. It tracks the evolution from a singular dream in the jungles of India to a global powerhouse defining the modern industrial age.&quot;
                  </div>
                </section>

                <div className="grid grid-cols-2 gap-8">
                  <div className="p-6 border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-3">Milestone Count</p>
                    <p className="text-3xl font-serif font-bold text-slate-900">142+</p>
                  </div>
                  <div className="p-6 border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-3">Narrative Confidence</p>
                    <p className="text-3xl font-serif font-bold text-slate-900">98.4%</p>
                  </div>
                </div>

                <section className="space-y-6">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Extracted Fragments</h3>
                  <div className="space-y-4">
                    {[
                      "FOUNDING: Jamsetji Tata identifies Sakchi for its proximity to iron ore, coal, and water.",
                      "1912: First steel ingot produced. Landmark for Asian industrialization.",
                      "1919: 8-hour day introduction. Global first in labor welfare.",
                      "MODERN: Transition to green hydrogen and sustainable steel manufacturing."
                    ].map((text, i) => (
                      <div key={i} className="flex gap-4 p-5 hover:bg-slate-50 rounded-xl border border-transparent hover:border-slate-100 transition-all cursor-default group">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0 group-hover:scale-125 transition-transform" />
                        <p className="text-[12px] text-slate-500 font-medium leading-relaxed">{text}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <footer className="pt-12 border-t border-slate-100 text-center">
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">LegacyAI Analysis Engine • Verified Signature: [SHA-256-D4A-F37]</p>
                </footer>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
