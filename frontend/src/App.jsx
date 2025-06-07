import { useState } from 'react';
import Navigation from './components/Navigation';
import ChatSection from './components/ChatSection';
import ImageSection from './components/ImageSection';
import QuizSection from './components/QuizSection';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('chat');

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatSection />;
      case 'image':
        return <ImageSection />;
      case 'quiz':
        return <QuizSection />;
      default:
        return <ChatSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold text-white mb-4 animate-fade-in">
                AI<span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Studio</span>
              </h1>
              <p className="text-xl text-white/70 animate-slide-up">
                Your intelligent assistant platform for creativity and learning
              </p>
            </div>
            
            <div className="flex justify-center animate-slide-up">
              <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-8 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-fade-in">
              {renderActiveSection()}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-8 px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-white/50">
              Powered by Spring Boot AI & React ✨
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;