"use client";

import { useState } from "react";

interface Question {
  id: number;
  text: string;
  options: string[];
  answer: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Qual è il framework React più usato per il Web?",
    options: ["Angular", "Next.js", "Vue", "Svelte"],
    answer: "Next.js",
  },
  {
    id: 2,
    text: "Cosa significa 'SSR' in Next.js?",
    options: ["Server Side Rendering", "Simple State React", "Static Site Return", "Super Speed Route"],
    answer: "Server Side Rendering",
  },
  {
    id: 3,
    text: "Quale hook si usa per gestire lo stato in React?",
    options: ["useEffect", "useRouter", "useState", "useContext"],
    answer: "useState",
  },
  {
    id: 4,
    text: "Quale comando si usa per creare un nuovo progetto Next.js?",
    options: ["npm start next", "npx create-next-app", "install next-project", "make-next-web"],
    answer: "npx create-next-app",
  },
  {
    id: 5,
    text: "In Tailwind CSS, quale classe si usa per rendere un testo rosso?",
    options: ["color-red-500", "font-red", "text-red-500", "paint-red"],
    answer: "text-red-500",
  },
  {
    id: 6,
    text: "Quale file gestisce il layout principale nell'App Router?",
    options: ["main.tsx", "index.html", "layout.tsx", "app.config.js"],
    answer: "layout.tsx",
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (selectedOption: string) => {
    if (selectedOption === QUESTIONS[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < QUESTIONS.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  // Calcolo della percentuale di successo per il messaggio finale
  const percentage = Math.round((score / QUESTIONS.length) * 100);

  return (
    <div className="min-h-screen bg-indigo-600 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg transition-all">
        {!showResult ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                  Progresso
                </span>
                <div className="w-32 h-2 bg-gray-100 rounded-full mt-1">
                  <div 
                    className="h-full bg-indigo-500 rounded-full transition-all duration-300" 
                    style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">
                Punti: {score}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-8 leading-tight">
              {QUESTIONS[currentQuestion].text}
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {QUESTIONS[currentQuestion].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left p-4 border-2 border-gray-100 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 group active:scale-[0.98]"
                >
                  <span className="font-medium text-gray-700 group-hover:text-indigo-700">{option}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="text-6xl mb-4">
              {percentage === 100 ? "🔥" : percentage >= 50 ? "👏" : "📚"}
            </div>
            <h2 className="text-3xl font-black text-gray-800 mb-2">
              {percentage === 100 ? "Incredibile!" : "Bel lavoro!"}
            </h2>
            <p className="text-gray-500 mb-8 text-lg">
              Hai risposto correttamente a <span className="font-bold text-indigo-600">{score}</span> domande su {QUESTIONS.length} ({percentage}%)
            </p>
            
            <button
              onClick={resetQuiz}
              className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transition-colors shadow-lg active:scale-95"
            >
              Riprova il Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}