# AI Studio

AI Studio is a comprehensive AI-powered platform that combines intelligent conversation, creative image generation, and interactive learning through quizzes. Built with React and powered by Spring Boot AI.

## Features

### 🤖 AI Chat Assistant
- Intelligent conversational AI powered by advanced language models
- Real-time responses with elegant chat interface
- Context-aware conversations

### 🎨 AI Image Generator
- Create stunning images from text descriptions
- Customizable quality settings (HD/Standard)
- Multiple resolution options (512px, 1024px, 1536px)
- Instant preview and download capabilities

### 🧠 Interactive Quiz Generator
- AI-generated questions with multiple difficulty levels
- Instant feedback with detailed explanations
- Educational content across various topics

## Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Vite** - Fast build tool and development server

### Backend
- **Spring Boot** - Java-based backend framework
- **Spring AI** - AI integration framework
- **RESTful APIs** - Clean API architecture

## Getting Started

### Prerequisites
- Node.js 18+ 
- Java 17+
- Spring Boot application running on port 8080

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd ai-studio
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Backend Setup
Ensure your Spring Boot application is running on `http://localhost:8080` with the following endpoints:
- `GET /ask-ai?prompt={prompt}` - Chat functionality
- `GET /generate-images?prompt={prompt}&quality={quality}&width={width}&height={height}` - Image generation
- `GET /questions?difficult={difficulty}` - Quiz generation

## API Endpoints

### Chat Service
```
GET /ask-ai?prompt=your-question-here
```

### Image Generation
```
GET /generate-images?prompt=your-description&quality=hd&width=1024&height=1024
```

### Quiz Generation
```
GET /questions?difficult=easy|medium|hard
```

## Project Structure

```
src/
├── components/
│   ├── Navigation.jsx      # Tab navigation component
│   ├── ChatSection.jsx     # AI chat interface
│   ├── ImageSection.jsx    # Image generation interface
│   └── QuizSection.jsx     # Quiz interface
├── App.jsx                 # Main application component
├── main.jsx               # Application entry point
└── index.css              # Global styles and animations
```

## Features in Detail

### Glass Morphism Design
- Modern glass-like UI elements with backdrop blur effects
- Smooth animations and micro-interactions
- Responsive design for all screen sizes

### Real-time Interactions
- Live chat with typing indicators
- Instant image generation and preview
- Interactive quiz with immediate feedback

### Accessibility
- Keyboard navigation support
- Screen reader friendly
- High contrast color schemes

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- ESLint configuration for React
- Consistent component structure
- Modern JavaScript (ES6+)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Spring AI team for the powerful AI integration framework
- React team for the excellent UI library
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icon set