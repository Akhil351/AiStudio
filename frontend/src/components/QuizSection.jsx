import { useState } from 'react';
import { Brain, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

export default function QuizSection() {
  const [difficulty, setDifficulty] = useState('easy');
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateQuestion = async () => {
    setLoading(true);
    setQuestion(null);
    setSelectedAnswer(null);
    setShowResult(false);

    try {
      const response = await fetch(`http://localhost:3510/api/v1.0/questions?difficult=${difficulty}`);
      const data = await response.json();
      setQuestion(data);
    } catch (error) {
      console.error('Error generating question:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const submitAnswer = () => {
    setShowResult(true);
  };

  const resetQuiz = () => {
    setQuestion(null);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="bg-gradient-to-r from-green-500 to-teal-500 p-3 rounded-2xl">
          <Brain className="text-white" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-white">AI Quiz Generator</h2>
      </div>

      {!question && (
        <div className="text-center py-8">
          <div className="mb-8">
            <label className="block text-white/80 font-medium mb-4">
              Select Difficulty Level
            </label>
            <div className="flex justify-center space-x-4">
              {['easy', 'medium', 'hard'].map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                    difficulty === level
                      ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg transform scale-105'
                      : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generateQuestion}
            disabled={loading}
            className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 disabled:opacity-50 text-white py-4 px-8 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 disabled:hover:scale-100 flex items-center space-x-2 mx-auto"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Generating Question...</span>
              </>
            ) : (
              <>
                <Brain size={20} />
                <span>Generate Question</span>
              </>
            )}
          </button>
        </div>
      )}

      {question && (
        <div className="animate-fade-in space-y-6">
          <div className="bg-white/5 border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-2">{question.title}</h3>
            <p className="text-white/90 text-lg leading-relaxed">{question.question}</p>
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correct_answer_id;
              const showCorrectness = showResult;

              let buttonClass = 'w-full p-4 rounded-2xl text-left transition-all duration-300 border-2 ';
              
              if (showCorrectness) {
                if (isCorrect) {
                  buttonClass += 'bg-green-500/20 border-green-500 text-green-100';
                } else if (isSelected && !isCorrect) {
                  buttonClass += 'bg-red-500/20 border-red-500 text-red-100';
                } else {
                  buttonClass += 'bg-white/5 border-white/20 text-white/70';
                }
              } else if (isSelected) {
                buttonClass += 'bg-white/20 border-white/40 text-white transform scale-105';
              } else {
                buttonClass += 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {showCorrectness && (
                      <>
                        {isCorrect && <CheckCircle className="text-green-400\" size={24} />}
                        {isSelected && !isCorrect && <XCircle className="text-red-400" size={24} />}
                      </>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {!showResult && selectedAnswer !== null && (
            <button
              onClick={submitAnswer}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-4 px-8 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
            >
              Submit Answer
            </button>
          )}

          {showResult && (
            <div className="animate-fade-in space-y-4">
              <div className="bg-white/5 border border-white/20 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-white mb-3">Explanation:</h4>
                <p className="text-white/90 leading-relaxed">{question.explanation}</p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={generateQuestion}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Brain size={20} />
                  <span>New Question</span>
                </button>
                
                <button
                  onClick={resetQuiz}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <RotateCcw size={20} />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}