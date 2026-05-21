/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { VoxelEngine } from './services/VoxelEngine';
import { Generators } from './utils/voxelGenerators';
import { AppState, VoxelData } from './types';
import { germanVocabulary, generateVoxelForWord, GAME_COLORS } from './utils/germanVocabData';
import { 
  Heart, 
  Trophy, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  RotateCcw, 
  BookOpen, 
  HelpCircle, 
  Award, 
  Play, 
  Pause,
  Layers,
  Flame,
  Check,
  X,
  Gauge
} from 'lucide-react';

// Web Audio sound synthesizer for retro arcade game feedback
const playSound = (type: 'correct' | 'wrong' | 'click' | 'gameover' | 'gamewon' | 'level', isMuted: boolean) => {
  if (isMuted) return;
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (!ctx) return;
    
    if (type === 'correct') {
      // Direct upbeat happy synth arpeggio
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16); // G5
      osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.24); // C6
      
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } else if (type === 'wrong') {
      // Disappointment slide-down double-buzzer
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc1.type = 'sawtooth';
      osc2.type = 'sine';
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      
      osc1.frequency.setValueAtTime(180, ctx.currentTime);
      osc1.frequency.linearRampToValueAtTime(90, ctx.currentTime + 0.35);
      
      osc2.frequency.setValueAtTime(185, ctx.currentTime);
      osc2.frequency.linearRampToValueAtTime(95, ctx.currentTime + 0.35);
      
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      
      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.35);
      osc2.stop(ctx.currentTime + 0.35);
    } else if (type === 'click') {
      // Short wood block pop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } else if (type === 'level') {
      // Soft sweeping notes
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(329.63, ctx.currentTime); // E4
      osc.frequency.setValueAtTime(440.00, ctx.currentTime + 0.1); // A4
      osc.frequency.exponentialRampToValueAtTime(880.00, ctx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } else if (type === 'gameover') {
      // Heavy mechanical decay
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(60, ctx.currentTime + 0.82);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.82);
      osc.start();
      osc.stop(ctx.currentTime + 0.82);
    } else if (type === 'gamewon') {
      // Triharmonic chime chords
      const freqs = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.06);
        gain.gain.setValueAtTime(0.06, ctx.currentTime + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.06 + 0.4);
        osc.start(ctx.currentTime + i * 0.06);
        osc.stop(ctx.currentTime + i * 0.06 + 0.45);
      });
    }
  } catch (err) {
    console.warn("Audio Context not yet active", err);
  }
};

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<VoxelEngine | null>(null);

  // --- Layout and General App State ---
  const [appState, setAppState] = useState<AppState>(AppState.STABLE);
  const [voxelCount, setVoxelCount] = useState<number>(0);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  // --- Quiz Levels & Configs ---
  const [quizLevelFilter, setQuizLevelFilter] = useState<'ALL' | 'A1' | 'A2'>('ALL');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  
  // --- Game Mechanics ---
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [highScore, setHighScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Load High Score from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('voxel_deutsch_highscore');
    if (saved) {
      setHighScore(parseInt(saved, 10));
    }
  }, []);

  // Update high score
  const updateHighScore = (newScore: number) => {
    if (newScore > highScore) {
      setHighScore(newScore);
      localStorage.setItem('voxel_deutsch_highscore', newScore.toString());
    }
  };

  // Initialize Three.js VoxelEngine
  useEffect(() => {
    if (!containerRef.current) return;

    const engine = new VoxelEngine(
      containerRef.current,
      (newState) => setAppState(newState),
      (count) => setVoxelCount(count)
    );

    engineRef.current = engine;

    // Load nice warm welcome house voxels
    engine.loadInitialModel(generateVoxelForWord('haus'));
    engine.setAutoRotate(true);

    const handleResize = () => engine.handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      engine.cleanup();
    };
  }, []);

  // Handler to start / restart game
  const handleStartGame = (filter: 'ALL' | 'A1' | 'A2') => {
    playSound('level', isMuted);
    
    // Filter index set of pre-defined 50 elements
    const available = germanVocabulary
      .map((x, idx) => ({ item: x, index: idx }))
      .filter((x) => filter === 'ALL' || x.item.level === filter);

    // Shuffle those indices
    const shuffled = available
      .map(x => x.index)
      .sort(() => Math.random() - 0.5);

    setQuizLevelFilter(filter);
    setShuffledIndices(shuffled);
    setCurrentIdx(0);
    setScore(0);
    setLives(5);
    setStreak(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setIsCorrect(null);
    setShowHint(false);
    setIsGameOver(false);
    setIsGameWon(false);
    setIsPlaying(true);

    // Load first question model using morph rebuild!
    if (shuffled.length > 0 && engineRef.current) {
      const firstWordItem = germanVocabulary[shuffled[0]];
      const data = generateVoxelForWord(firstWordItem.voxelKey);
      
      // Shuffle options for the initial question
      const optCopy = [...firstWordItem.options];
      optCopy.sort(() => Math.random() - 0.5);
      setCurrentOptions(optCopy);
      
      // Let's break the existing welcome house, and build our first question voxel of the quiz!
      engineRef.current.dismantle();
      setTimeout(() => {
        engineRef.current?.rebuild(data);
      }, 900);
    }
  };

  const handleSelectOption = (option: string) => {
    if (isAnswerSubmitted) return;
    playSound('click', isMuted);
    setSelectedAnswer(option);
  };

  const handleCheckAnswer = () => {
    if (!selectedAnswer || isAnswerSubmitted) return;
    
    const activeItem = germanVocabulary[shuffledIndices[currentIdx]];
    const correctFull = `${activeItem.article} ${activeItem.german}`;
    const wasCorrect = selectedAnswer === correctFull;

    setIsAnswerSubmitted(true);
    setIsCorrect(wasCorrect);

    if (wasCorrect) {
      playSound('correct', isMuted);
      const pointsWon = 10 + Math.min(streak, 4) * 2; // Streak bonus up to +18 pts per answer
      const newScore = score + pointsWon;
      setScore(newScore);
      updateHighScore(newScore);
      setStreak(prev => prev + 1);
    } else {
      playSound('wrong', isMuted);
      const newLives = lives - 1;
      setLives(newLives);
      setStreak(0);
      
      // Deduct points, min capping at 0
      setScore(prev => Math.max(0, prev - 5));

      if (newLives <= 0) {
        // Trigger game over
        setTimeout(() => {
          setIsGameOver(true);
          playSound('gameover', isMuted);
        }, 1200);
      }
    }
  };

  const handleNextQuestion = () => {
    if (!isAnswerSubmitted) return;
    
    playSound('click', isMuted);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setIsCorrect(null);
    setShowHint(false);

    const nextOffset = currentIdx + 1;
    if (nextOffset >= shuffledIndices.length) {
      setIsGameWon(true);
      playSound('gamewon', isMuted);
      return;
    }

    setCurrentIdx(nextOffset);
    const nextItem = germanVocabulary[shuffledIndices[nextOffset]];
    const nextData = generateVoxelForWord(nextItem.voxelKey);

    // Shuffle options for the next question
    const optCopy = [...nextItem.options];
    optCopy.sort(() => Math.random() - 0.5);
    setCurrentOptions(optCopy);

    if (engineRef.current) {
      // Breakdown current guessed shape 
      engineRef.current.dismantle();
      // Rebuild into new target question shape dynamically after collapse!
      setTimeout(() => {
        engineRef.current?.rebuild(nextData);
      }, 900);
    }
  };

  const handleQuitToMenu = () => {
    playSound('click', isMuted);
    setIsPlaying(false);
    setIsGameOver(false);
    setIsGameWon(false);
    // Reload friendly house voxel on menu
    engineRef.current?.dismantle();
    setTimeout(() => {
      engineRef.current?.rebuild(generateVoxelForWord('haus'));
    }, 900);
  };

  const handleToggleRotation = () => {
    const nextState = !isAutoRotate;
    setIsAutoRotate(nextState);
    if (engineRef.current) {
      engineRef.current.setAutoRotate(nextState);
    }
    playSound('click', isMuted);
  };

  // Safe category color tag provider
  const getCategoryTheme = (category: string) => {
    switch(category) {
      case 'Essen': return { bg: 'bg-amber-100 text-amber-800 border-amber-200', dot: 'bg-amber-500' };
      case 'Tiere': return { bg: 'bg-purple-100 text-purple-800 border-purple-200', dot: 'bg-purple-500' };
      case 'Transport': return { bg: 'bg-blue-100 text-blue-800 border-blue-200', dot: 'bg-blue-500' };
      case 'Zuhause': return { bg: 'bg-indigo-100 text-indigo-800 border-indigo-200', dot: 'bg-indigo-500' };
      case 'Natur': return { bg: 'bg-emerald-100 text-emerald-800 border-emerald-200', dot: 'bg-emerald-500' };
      default: return { bg: 'bg-rose-100 text-rose-800 border-rose-200', dot: 'bg-rose-500' };
    }
  };

  // Active item in question
  const currentItem = shuffledIndices.length > 0 ? germanVocabulary[shuffledIndices[currentIdx]] : null;
  const currentCategoryInfo = currentItem ? getCategoryTheme(currentItem.category) : null;
  const optionsToRender = currentOptions.length > 0 ? currentOptions : (currentItem ? currentItem.options : []);

  return (
    <div className="relative w-full h-screen bg-[#f0f2f5] overflow-hidden select-none font-sans">
      {/* 3D Canvas Container Background */}
      <div ref={containerRef} className="absolute inset-0 z-0" />

      {/* Glassy Header Bar (Sound controls, rotating toggle, highscore) */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center pointer-events-none">
        {/* Left: Brand badge */}
        <div className="pointer-events-auto bg-white/90 backdrop-blur-md shadow-md border border-slate-200 rounded-2xl px-4 py-2.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white font-black text-lg shadow-sm">
            DE
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-extrabold text-slate-800 tracking-tight leading-none mb-0.5">Voxel Deutsch</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Wortschatz-Quiz</span>
          </div>
        </div>

        {/* Right: Quick Tools */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Persistent High Score Display */}
          <div className="hidden sm:flex items-center gap-2 bg-white/90 backdrop-blur-md shadow-md border border-slate-200 rounded-2xl px-4 py-2.5">
            <Trophy size={18} className="text-amber-500 fill-amber-300 animate-pulse" />
            <div className="text-left leading-none">
              <p className="text-[9px] font-black tracking-wider text-slate-400 uppercase">HIGH SCORE</p>
              <p className="text-sm font-extrabold text-slate-800 font-mono">{highScore}</p>
            </div>
          </div>

          {/* Camera Rotation Toggle */}
          <button
            id="btn-rotate-camera"
            onClick={handleToggleRotation}
            className={`p-3 rounded-2xl border border-slate-200/50 shadow-md backdrop-blur-md transition-all active:scale-90 ${isAutoRotate ? 'bg-amber-400 border-amber-400 text-slate-800 hover:bg-amber-300' : 'bg-white/90 text-slate-600 hover:bg-slate-100'}`}
            title={isAutoRotate ? "Pause kamera berputar" : "Putar kamera otomatis"}
          >
            {isAutoRotate ? <Pause size={18} fill="currentColor" strokeWidth={2.5} /> : <Play size={18} fill="currentColor" strokeWidth={2.5} />}
          </button>

          {/* Sound volume mute */}
          <button
            id="btn-sound-mute"
            onClick={() => {
              setIsMuted(!isMuted);
              playSound('click', !isMuted);
            }}
            className="p-3 rounded-2xl bg-white/90 border border-slate-200/50 shadow-md backdrop-blur-md text-slate-600 hover:bg-slate-100 transition-all active:scale-90"
            title={isMuted ? "Suara hening" : "Mainkan suara"}
          >
            {isMuted ? <VolumeX size={18} className="text-rose-500" strokeWidth={2.5} /> : <Volume2 size={18} className="text-indigo-600" strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* LANDING MENU WINDOW (NOT YET ACTIVE PLAYING STATE)        */}
      {/* ========================================================= */}
      {!isPlaying && (
        <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-xs z-10 flex items-center justify-center p-4">
          <div className="bg-white/95 border border-slate-200/60 shadow-2xl rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center relative overflow-hidden animate-in zoom-in-95 ease-out duration-300">
            {/* Glossy badge decoration */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl" />
            <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-amber-500/10 rounded-full blur-xl" />

            {/* German flag stripes badge */}
            <div className="flex justify-center gap-1 w-20 mx-auto mb-4 h-2.5 rounded-full overflow-hidden shadow-xs">
              <div className="bg-black w-full" />
              <div className="bg-red-600 w-full" />
              <div className="bg-yellow-500 w-full" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight leading-none mb-2">
              VOXEL DEUTSCH
            </h1>
            <p className="text-indigo-600 uppercase text-xs font-black tracking-widest mb-6">
              Belajar Bahasa Jerman • Level A1 - A2
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6 text-left text-slate-600 text-sm space-y-3 leading-relaxed">
              <div className="flex gap-2 text-slate-700">
                <span className="text-rose-500 font-extrabold">1.</span>
                <span>Perhatikan <strong>gambar 3D voxel</strong> yang dirakit di tengah layar. (Seret layar untuk memutar kamera!)</span>
              </div>
              <div className="flex gap-2 text-slate-700">
                <span className="text-rose-500 font-extrabold">2.</span>
                <span>Baca clue <strong>bahasa Inggris</strong> di bagian atas.</span>
              </div>
              <div className="flex gap-2 text-slate-700">
                <span className="text-rose-500 font-extrabold">3.</span>
                <span>Tebak kata benda bahasa Jerman yang tepat beserta artikunya (<strong>der / die / das</strong>).</span>
              </div>
              <div className="flex gap-2 text-slate-700">
                <span className="text-rose-500 font-extrabold">4.</span>
                <span>Setiap jawaban benar mendapat <strong className="text-emerald-600">+10 poin</strong>. Jawaban salah memotong <strong className="text-rose-600">-5 poin</strong> dan memicu <strong className="text-rose-600">minus 1 nyawa ♥</strong>.</span>
              </div>
            </div>

            {/* Highscore section */}
            {highScore > 0 && (
              <div className="flex items-center justify-center gap-2 mb-6 text-slate-700 font-extrabold text-sm border-b border-dashed border-slate-200 pb-4">
                <Trophy size={16} className="text-amber-500 fill-amber-300" />
                <span>Pencapaian Tertinggi: <span className="font-mono text-indigo-600 text-lg">{highScore} Poin</span></span>
              </div>
            )}

            {/* Play Options */}
            <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-3">Mulai dengan Tingkat Kesulitan:</p>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                id="btn-play-all"
                onClick={() => handleStartGame('ALL')}
                className="group flex flex-col items-center justify-center gap-2 p-3 bg-gradient-to-b from-indigo-500 to-indigo-600 text-white font-extrabold text-sm rounded-2xl border-b-4 border-indigo-700 active:border-b-0 active:translate-y-1 shadow-lg shadow-indigo-500/20 active:scale-95 transition-all"
              >
                <Layers size={18} className="group-hover:scale-110 transition-transform" />
                <span>Campur</span>
                <span className="text-[9px] opacity-85 font-black bg-white/15 px-1.5 py-0.5 rounded-full">50 Kata</span>
              </button>
              
              <button
                id="btn-play-a1"
                onClick={() => handleStartGame('A1')}
                className="group flex flex-col items-center justify-center gap-2 p-3 bg-gradient-to-b from-emerald-500 to-emerald-600 text-white font-extrabold text-sm rounded-2xl border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
              >
                <BookOpen size={18} className="group-hover:scale-110 transition-transform" />
                <span>Level A1</span>
                <span className="text-[9px] opacity-85 font-black bg-white/15 px-1.5 py-0.5 rounded-full">32 Kata</span>
              </button>

              <button
                id="btn-play-a2"
                onClick={() => handleStartGame('A2')}
                className="group flex flex-col items-center justify-center gap-2 p-3 bg-gradient-to-b from-purple-500 to-purple-600 text-white font-extrabold text-sm rounded-2xl border-b-4 border-purple-700 active:border-b-0 active:translate-y-1 shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
              >
                <Award size={18} className="group-hover:scale-110 transition-transform" />
                <span>Level A2</span>
                <span className="text-[9px] opacity-85 font-black bg-white/15 px-1.5 py-0.5 rounded-full">18 Kata</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* CORE ACTIVE PLAYING STAGE HUD                             */}
      {/* ========================================================= */}
      {isPlaying && !isGameOver && !isGameWon && currentItem && (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between items-center sm:items-start p-4 z-10 select-none">
          {/* Top Info Ribbon */}
          <div className="w-full max-w-md pointer-events-auto bg-white/92 backdrop-blur-md shadow-xl border border-slate-200/80 rounded-2xl p-4 mt-16 sm:ml-4 flex justify-between items-center animate-in slide-in-from-top-4 duration-300">
            {/* Progress counter */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-slate-500 font-extrabold text-xs uppercase tracking-wide">
                <span>Soal (Question)</span>
                <span className="bg-indigo-100 text-indigo-700 font-mono px-1.5 py-0.5 rounded-md text-[10px] font-black">
                  {currentIdx + 1} / {shuffledIndices.length}
                </span>
              </div>
              <div className="w-40 sm:w-48 bg-slate-100 h-2 px-0.5 mt-2 rounded-full flex items-center border border-slate-200">
                <div 
                  className="h-1 bg-indigo-600 rounded-full transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / shuffledIndices.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Score and Hearts HUD stats */}
            <div className="flex items-center gap-3">
              {/* Score Display */}
              <div className="flex flex-col items-center bg-slate-50 border border-slate-200 px-3 py-1 rounded-xl">
                <span className="text-[9px] font-black text-slate-400 tracking-wider">SKOR</span>
                <span className="text-lg font-black text-slate-800 font-mono leading-none mt-0.5">{score}</span>
              </div>

              {/* Lives Heart tracker */}
              <div className="flex flex-col items-center bg-rose-50 border border-rose-100 px-3 py-1 rounded-xl">
                <span className="text-[9px] font-black text-rose-400 tracking-wider">NYAWA</span>
                <div className="flex gap-0.5 mt-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Heart 
                      key={`heart-${i}`} 
                      size={15} 
                      className={`transition-transform duration-300 ${i < lives ? 'text-rose-500 fill-rose-400 scale-100 animate-pulse' : 'text-slate-200 scale-75'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Core Question Card Box (Riddle card) */}
          <div className="w-full max-w-sm pointer-events-auto bg-white/95 border border-slate-200/90 shadow-2xl rounded-3xl p-5 mb-4 sm:ml-4 sm:mb-8 self-center sm:self-auto flex flex-col gap-4 animate-in slide-in-from-bottom-6 duration-300">
            {/* Clue translation */}
            <div className="border-b border-slate-100 pb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] font-black bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full uppercase tracking-widest">CLUE IN ENGLISH</span>
                {currentItem.level && (
                  <span className="text-[10px] font-extrabold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">{currentItem.level} Class</span>
                )}
              </div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-tight uppercase">
                {currentItem.english}
              </h2>
            </div>

            {/* Category tag */}
            <div className="flex items-center gap-1.5">
              {currentCategoryInfo && (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black border ${currentCategoryInfo.bg}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${currentCategoryInfo.dot}`} />
                  Category: {currentItem.category}
                </span>
              )}
              {streak > 1 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-black bg-amber-50 text-amber-700 border border-amber-200 animate-bounce">
                  <Flame size={13} className="text-amber-500 fill-amber-400" />
                  Streak x{streak}
                </span>
              )}
            </div>

            {/* Answer Options list (A, B, C) */}
            <div className="flex flex-col gap-2.5 my-1">
              <p className="text-[9px] font-black text-slate-400 tracking-wider uppercase">Pilihan Kata Benda (Nouns):</p>
              
              {optionsToRender.map((opt, oIdx) => {
                const optLetter = oIdx === 0 ? 'A' : oIdx === 1 ? 'B' : 'C';
                const correctFullAnswer = `${currentItem.article} ${currentItem.german}`;
                
                // Color states for selections
                let cardStyle = "bg-slate-50 hover:bg-indigo-50 border-slate-200 text-slate-700 hover:border-indigo-200";
                let checkBadge = null;

                if (selectedAnswer === opt) {
                  cardStyle = "bg-indigo-50 border-indigo-600 text-indigo-800 scale-[1.01]";
                }

                if (isAnswerSubmitted) {
                  const isThisCorrect = opt === correctFullAnswer;
                  const isThisSelected = selectedAnswer === opt;

                  if (isThisCorrect) {
                    cardStyle = "bg-emerald-500 border-emerald-600 text-white font-extrabold shadow-emerald-100 scale-[1.01]";
                    checkBadge = <Check className="w-5 h-5 bg-white/20 text-white rounded-full p-0.5 shrink-0" strokeWidth={3} />;
                  } else if (isThisSelected) {
                    cardStyle = "bg-rose-500 border-rose-600 text-white font-extrabold shadow-rose-100 animate-shake";
                    checkBadge = <X className="w-5 h-5 bg-white/20 text-white rounded-full p-0.5 shrink-0" strokeWidth={3} />;
                  } else {
                    cardStyle = "bg-slate-50 opacity-40 border-slate-200 text-slate-400 cursor-not-allowed";
                  }
                }

                return (
                  <button
                    key={`option-${oIdx}`}
                    id={`btn-option-${optLetter.toLowerCase()}`}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(opt)}
                    className={`
                      relative group w-full flex items-center justify-between text-left p-3.5 border-2 rounded-2xl font-bold text-sm transition-all duration-150
                      border-b-[4px] active:border-b-2 active:translate-y-[2px] disabled:active:border-b-2 disabled:active:translate-y-0
                      ${cardStyle}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 shrink-0 rounded-lg flex items-center justify-center font-black text-xs ${isAnswerSubmitted && (opt === correctFullAnswer || selectedAnswer === opt) ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-700'}`}>
                        {optLetter}
                      </span>
                      <span className="text-base uppercase font-extrabold tracking-wide">
                        {opt.toUpperCase()}
                      </span>
                    </div>
                    {checkBadge}
                  </button>
                );
              })}
            </div>

            {/* Visual Help Hint accordion */}
            <div className="border-t border-slate-100 pt-2.5">
              <button
                id="btn-toggle-hint"
                onClick={() => {
                  setShowHint(!showHint);
                  playSound('click', isMuted);
                }}
                className="flex items-center gap-1 text-xs font-extrabold text-slate-400 hover:text-slate-600 transition-colors"
              >
                <HelpCircle size={15} />
                <span>{showHint ? "Sembunyikan Bantuan Petunjuk" : "Lihat Bantuan Petunjuk"}</span>
              </button>

              {showHint && (
                <div className="mt-2 text-xs italic text-slate-500 bg-amber-50 border border-amber-200 rounded-xl p-3 animate-in fade-in zoom-in-95 duration-200 leading-normal">
                  📌 <strong>Petunjuk:</strong> {currentItem.hint} | Level: <strong>{currentItem.level}</strong>
                </div>
              )}
            </div>

            {/* Check/Submit/Next Action Bottom Button */}
            <div className="flex gap-2 border-t border-slate-100 pt-3">
              <button
                id="btn-quit-menu"
                onClick={handleQuitToMenu}
                className="px-4 py-3 bg-slate-100 border-2 border-slate-200 border-b-4 hover:bg-slate-200 text-slate-600 font-black rounded-xl text-sm transition-colors active:border-b-2 active:translate-y-[2px]"
              >
                Kembali
              </button>

              {!isAnswerSubmitted ? (
                <button
                  id="btn-check-answer"
                  disabled={!selectedAnswer}
                  onClick={handleCheckAnswer}
                  className={`
                    flex-1 flex items-center justify-center gap-1.5 py-3 border-2 border-b-4 font-black rounded-xl text-sm transition-all active:border-b-2 active:translate-y-[2px]
                    ${selectedAnswer 
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-700 shadow-lg shadow-indigo-600/10' 
                      : 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed'}
                  `}
                >
                  Periksa Jawaban
                </button>
              ) : (
                <button
                  id="btn-next-question"
                  onClick={handleNextQuestion}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white border-2 border-emerald-700 border-b-4 font-black rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/10 active:border-b-2 active:translate-y-[2px] animate-pulse"
                >
                  <span>Lanjut Soal Berikutnya</span>
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* GAME OVER SCREEN                                          */}
      {/* ========================================================= */}
      {isGameOver && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md z-30 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-rose-100 shadow-2xl rounded-3xl p-6 sm:p-8 max-w-md w-full text-center relative overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-rose-500/15 rounded-full blur-xl" />
            
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Heart size={32} fill="currentColor" />
            </div>

            <h2 className="text-3xl font-black text-slate-800 tracking-tight leading-none mb-1">
              GAME OVER
            </h2>
            <p className="text-rose-500 uppercase text-xs font-black tracking-widest mb-6">
              Kehabisan Nyawa!
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6 text-left space-y-3.5">
              <div className="flex justify-between items-center text-slate-600 font-bold border-b border-slate-100 pb-2">
                <span>Total Nilai Terkumpul:</span>
                <span className="font-mono text-xl font-black text-indigo-600">{score} Poin</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 font-bold border-b border-slate-100 pb-2">
                <span>Soal Terlewati:</span>
                <span className="font-mono text-slate-800">{currentIdx + 1} / {shuffledIndices.length}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 font-bold">
                <span>Akurasi Kuis:</span>
                <span className="font-mono text-emerald-600 font-black">
                  {Math.round(((score / 10) / (currentIdx + 1)) * 100) || 0}%
                </span>
              </div>
            </div>

            <p className="text-slate-500 font-semibold mb-6 italic px-4">
              "Jangan menyerah! Setiap kegagalan adalah langkah lebih dekat untuk fasih berbahasa Jerman."
            </p>

            <div className="flex gap-3">
              <button
                id="btn-gameover-menu"
                onClick={handleQuitToMenu}
                className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 border-2 border-slate-200 border-b-4 text-slate-600 font-extrabold rounded-2xl text-sm transition-all active:border-b-2 active:translate-y-[2px]"
              >
                Menu Utama
              </button>
              <button
                id="btn-gameover-restart"
                onClick={() => handleStartGame(quizLevelFilter)}
                className="flex-[1.5] py-3.5 bg-indigo-600 hover:bg-indigo-500 border-2 border-indigo-700 border-b-4 text-white font-extrabold rounded-2xl text-sm transition-all shadow-lg shadow-indigo-600/15 active:border-b-2 active:translate-y-[2px]"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* VICTORY WINNER SCREEN                                     */}
      {/* ========================================================= */}
      {isGameWon && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md z-30 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-amber-100 shadow-2xl rounded-3xl p-6 sm:p-8 max-w-md w-full text-center relative overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-amber-500/15 rounded-full blur-xl" />
            
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Award size={32} className="fill-amber-300" />
            </div>

            <h2 className="text-3xl font-black text-slate-800 tracking-tight leading-none mb-1">
              WUNDERBAR! 🎉
            </h2>
            <p className="text-amber-500 uppercase text-xs font-black tracking-widest mb-6">
              Hebat! Kamu Menyelesaikan Kuis!
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6 text-left space-y-3.5">
              <div className="flex justify-between items-center text-slate-600 font-bold border-b border-slate-100 pb-2">
                <span>Nilai Akhir:</span>
                <span className="font-mono text-2xl font-black text-emerald-600">{score} Poin</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 font-bold border-b border-slate-100 pb-2">
                <span>Target Level Kuis:</span>
                <span className="font-mono text-slate-800 font-extrabold bg-indigo-50 border border-indigo-100 text-indigo-700 px-2 py-0.5 rounded-lg text-xs">
                  Kelas {quizLevelFilter}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-600 font-bold">
                <span>Nyawa Tersisa:</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: lives }).map((_, i) => (
                    <Heart key={`victory-heart-${i}`} size={14} className="text-rose-500 fill-rose-400" />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-slate-500 font-semibold mb-6 px-4">
              🇩🇪 "Fantastisch! Kamu telah menaklukkan kuis kosa kata bahasa Jerman 3D ini. Pertahankan kemampuan hebat ini!"
            </p>

            <div className="flex gap-3">
              <button
                id="btn-victory-menu"
                onClick={handleQuitToMenu}
                className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 border-2 border-slate-200 border-b-4 text-slate-600 font-extrabold rounded-2xl text-sm transition-all active:border-b-2 active:translate-y-[2px]"
              >
                Menu Utama
              </button>
              <button
                id="btn-victory-restart"
                onClick={() => handleStartGame(quizLevelFilter)}
                className="flex-[1.5] py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 border-2 border-amber-700 border-b-4 text-white font-extrabold rounded-2xl text-sm transition-all shadow-lg active:border-b-2 active:translate-y-[2px]"
              >
                Main Lagi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Helper Legend in stable play state */}
      {isPlaying && !isGameOver && !isGameWon && (
        <div className="absolute bottom-2.5 right-4 z-10 pointer-events-none hidden sm:flex items-center gap-1.5 text-[10px] font-bold text-slate-400 bg-white/70 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-slate-200">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping" />
          <span>Navigasi: Geser / Drag mouse layar 3D untuk memutar objek!</span>
        </div>
      )}
    </div>
  );
};

export default App;
