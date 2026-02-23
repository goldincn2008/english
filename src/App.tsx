/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  Info, 
  ChevronRight, 
  RotateCcw, 
  Trophy,
  BookOpen,
  Filter,
  GraduationCap
} from 'lucide-react';
import { QUESTIONS } from './data/questions';
import { Question, Difficulty, GrammarCategory } from './types';

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | 'All'>('All');

  const filteredQuestions = useMemo(() => {
    if (filterDifficulty === 'All') return QUESTIONS;
    return QUESTIONS.filter(q => q.difficulty === filterDifficulty);
  }, [filterDifficulty]);

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const handleOptionSelect = (blankIndex: number, option: string) => {
    if (isSubmitted) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[blankIndex] = option;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (selectedAnswers.length < currentQuestion.correctAnswers.length || selectedAnswers.includes(undefined as any)) {
      alert("Please fill all blanks!");
      return;
    }
    setIsSubmitted(true);
    const isCorrect = selectedAnswers.every((ans, idx) => ans === currentQuestion.correctAnswers[idx]);
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswers([]);
      setIsSubmitted(false);
    } else {
      setShowSummary(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setIsSubmitted(false);
    setScore(0);
    setShowSummary(false);
  };

  const getEncouragement = (score: number, total: number) => {
    const ratio = score / total;
    if (ratio === 1) return "Perfect! You're a Grammar Master! 🌟";
    if (ratio >= 0.8) return "Excellent work! Almost there! 🚀";
    if (ratio >= 0.6) return "Good job! Keep practicing! 👍";
    return "Keep going! Every mistake is a learning chance! 💪";
  };

  if (showSummary) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center border border-slate-100"
        >
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Quiz Complete!</h2>
          <p className="text-slate-500 mb-6">You've finished the {filterDifficulty === 'All' ? 'General' : filterDifficulty} Grammar Lab.</p>
          
          <div className="bg-slate-50 rounded-2xl p-6 mb-8">
            <div className="text-5xl font-black text-indigo-600 mb-2">
              {score}<span className="text-2xl text-slate-400">/{filteredQuestions.length}</span>
            </div>
            <p className="font-medium text-slate-700">
              {getEncouragement(score, filteredQuestions.length)}
            </p>
          </div>

          <button 
            onClick={resetQuiz}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-slate-500 mb-4">No questions found for this level.</p>
          <button onClick={() => setFilterDifficulty('All')} className="text-indigo-600 font-bold">Show All Questions</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">GrammarMaster</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full">
              <Filter className="w-4 h-4 text-slate-500" />
              <select 
                value={filterDifficulty}
                onChange={(e) => {
                  setFilterDifficulty(e.target.value as any);
                  setCurrentQuestionIndex(0);
                  setSelectedAnswers([]);
                  setIsSubmitted(false);
                }}
                className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer"
              >
                <option value="All">All Levels</option>
                <option value={Difficulty.BEGINNER}>{Difficulty.BEGINNER}</option>
                <option value={Difficulty.INTERMEDIATE}>{Difficulty.INTERMEDIATE}</option>
                <option value={Difficulty.ADVANCED}>{Difficulty.ADVANCED}</option>
              </select>
            </div>
            <div className="text-sm font-bold text-slate-400">
              {currentQuestionIndex + 1} / {filteredQuestions.length}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-1.5 rounded-full mb-8 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / filteredQuestions.length) * 100}%` }}
            className="bg-indigo-600 h-full"
          />
        </div>

        {/* Question Card */}
        <motion.div 
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
        >
          <div className="p-6 md:p-10">
            {/* Metadata Tags */}
            <div className="flex gap-2 mb-6">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                currentQuestion.difficulty === Difficulty.BEGINNER ? 'bg-emerald-100 text-emerald-700' :
                currentQuestion.difficulty === Difficulty.INTERMEDIATE ? 'bg-amber-100 text-amber-700' :
                'bg-rose-100 text-rose-700'
              }`}>
                {currentQuestion.difficulty}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider">
                {currentQuestion.category}
              </span>
            </div>

            {/* Sentence with Blanks */}
            <div className="text-xl md:text-3xl font-medium leading-relaxed text-slate-800 mb-10">
              {currentQuestion.sentenceParts.map((part, idx) => (
                <React.Fragment key={idx}>
                  {part}
                  {idx < currentQuestion.sentenceParts.length - 1 && (
                    <span className={`inline-flex items-center justify-center min-w-[120px] h-10 md:h-12 mx-2 border-b-4 transition-all ${
                      isSubmitted 
                        ? selectedAnswers[idx] === currentQuestion.correctAnswers[idx]
                          ? 'border-emerald-500 text-emerald-600 bg-emerald-50'
                          : 'border-rose-500 text-rose-600 bg-rose-50'
                        : selectedAnswers[idx]
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-slate-300'
                    } rounded-t-lg px-4`}>
                      {selectedAnswers[idx] || "____"}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Options */}
            {!isSubmitted && (
              <div className="space-y-6">
                {currentQuestion.options.map((options, blankIdx) => (
                  <div key={blankIdx} className="flex flex-wrap gap-3">
                    {options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleOptionSelect(blankIdx, option)}
                        className={`px-6 py-3 rounded-xl font-bold transition-all border-2 ${
                          selectedAnswers[blankIdx] === option
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-10 flex justify-end">
              {!isSubmitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedAnswers.length < currentQuestion.correctAnswers.length}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-10 py-4 rounded-2xl transition-all shadow-lg shadow-indigo-200 flex items-center gap-2"
                >
                  Submit Answer
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-10 py-4 rounded-2xl transition-all flex items-center gap-2"
                >
                  {currentQuestionIndex < filteredQuestions.length - 1 ? 'Next Question' : 'View Results'}
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Explanation Card */}
          <AnimatePresence>
            {isSubmitted && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className={`border-t ${
                  selectedAnswers.every((ans, idx) => ans === currentQuestion.correctAnswers[idx])
                    ? 'bg-emerald-50/50 border-emerald-100'
                    : 'bg-rose-50/50 border-rose-100'
                }`}
              >
                <div className="p-6 md:p-10">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`p-2 rounded-xl ${
                      selectedAnswers.every((ans, idx) => ans === currentQuestion.correctAnswers[idx])
                        ? 'bg-emerald-100 text-emerald-600'
                        : 'bg-rose-100 text-rose-600'
                    }`}>
                      {selectedAnswers.every((ans, idx) => ans === currentQuestion.correctAnswers[idx]) 
                        ? <CheckCircle2 className="w-6 h-6" /> 
                        : <XCircle className="w-6 h-6" />
                      }
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {selectedAnswers.every((ans, idx) => ans === currentQuestion.correctAnswers[idx]) 
                          ? 'Excellent! That\'s correct.' 
                          : 'Not quite right. Let\'s learn why.'
                        }
                      </h3>
                      <p className="text-slate-600">
                        Correct Answer: <span className="font-bold text-emerald-600">{currentQuestion.correctAnswers.join(', ')}</span>
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-1">Grammar Rule</h4>
                          <p className="text-slate-600 text-sm leading-relaxed">{currentQuestion.explanation.rule}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <BookOpen className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-1">Example</h4>
                          <p className="text-slate-600 text-sm italic">"{currentQuestion.explanation.example}"</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/60 rounded-2xl p-5 border border-slate-200">
                      <h4 className="font-bold text-rose-600 text-sm uppercase tracking-wider mb-2">Common Mistake</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{currentQuestion.explanation.commonMistake}</p>
                      {currentQuestion.explanation.reviewLink && (
                        <a 
                          href={currentQuestion.explanation.reviewLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block mt-4 text-indigo-600 text-xs font-bold hover:underline"
                        >
                          Review this topic →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Footer Info */}
      <footer className="max-w-4xl mx-auto px-4 py-8 text-center text-slate-400 text-xs">
        <p>© 2026 GrammarMaster Lab • Designed for Junior High Excellence</p>
      </footer>
    </div>
  );
}
