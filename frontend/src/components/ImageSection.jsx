import { useState } from 'react';
import { Image, Download, Sparkles } from 'lucide-react';

export default function ImageSection() {
  const [prompt, setPrompt] = useState('');
  const [quality, setQuality] = useState('hd');
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(1024);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setGeneratedImage(null);

    try {
      const url = `http://localhost:3510/api/v1.0/generate-images?prompt=${encodeURIComponent(prompt)}&quality=${quality}&width=${width}&height=${height}`;
      
      // Since the API redirects to the image, we'll set the URL directly
      setGeneratedImage(url);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-3 rounded-2xl">
          <Sparkles className="text-white" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-white">AI Image Generator</h2>
      </div>

      <form onSubmit={handleGenerate} className="space-y-6 mb-8">
        <div>
          <label className="block text-white/80 font-medium mb-3">
            Describe your image
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A majestic mountain landscape at sunset with purple clouds..."
            className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 h-24 resize-none"
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-white/80 font-medium mb-3">Quality</label>
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
              disabled={loading}
            >
              <option value="hd" className="bg-gray-800">HD</option>
              <option value="standard" className="bg-gray-800">Standard</option>
            </select>
          </div>

          <div>
            <label className="block text-white/80 font-medium mb-3">Width</label>
            <select
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value))}
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
              disabled={loading}
            >
              <option value={512} className="bg-gray-800">512px</option>
              <option value={1024} className="bg-gray-800">1024px</option>
              <option value={1536} className="bg-gray-800">1536px</option>
            </select>
          </div>

          <div>
            <label className="block text-white/80 font-medium mb-3">Height</label>
            <select
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value))}
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
              disabled={loading}
            >
              <option value={512} className="bg-gray-800">512px</option>
              <option value={1024} className="bg-gray-800">1024px</option>
              <option value={1536} className="bg-gray-800">1536px</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 disabled:opacity-50 text-white py-4 px-8 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 disabled:hover:scale-100 flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Image size={20} />
              <span>Generate Image</span>
            </>
          )}
        </button>
      </form>

      {generatedImage && (
        <div className="animate-fade-in">
          <div className="bg-white/5 border border-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Generated Image</h3>
              <a
                href={generatedImage}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Download size={20} />
              </a>
            </div>
            <div className="relative rounded-2xl overflow-hidden bg-white/5">
              <img
                src={generatedImage}
                alt="Generated"
                className="w-full h-auto max-h-96 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden absolute inset-0 flex items-center justify-center text-white/60">
                <p>Failed to load image</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}