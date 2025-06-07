import { Brain, Image, HelpCircle } from 'lucide-react';

export default function Navigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'chat', label: 'AI Chat', icon: Brain },
    { id: 'image', label: 'Image Gen', icon: Image },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle },
  ];

  return (
    <nav className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2">
      <div className="flex space-x-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-white text-purple-600 shadow-lg transform scale-105'
                  : 'text-white hover:bg-white/10 hover:transform hover:scale-105'
              }`}
            >
              <Icon size={20} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}