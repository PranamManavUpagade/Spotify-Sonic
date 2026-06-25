"use client";

import { useState } from "react";
import { Send, Sparkles, Play } from "lucide-react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string, tracks?: any[]}[]>([]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMessage = prompt;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setPrompt("");
    setLoading(true);

    try {
      const res = await fetch("https://spotify-sonic.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage })
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: data.conversational_response,
        tracks: data.tracks 
      }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: "Oops, something went wrong connecting to the backend!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col relative bg-gradient-to-b from-[#2a2a2a] to-[#121212]">
      {/* Header */}
      <header className="h-16 px-6 flex items-center bg-transparent z-10 sticky top-0 bg-opacity-90 backdrop-blur-md">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <img src="/logo.svg" alt="Spotify Sonic Logo" className="w-8 h-8 object-contain" />
          Spotify Sonic
        </h1>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-6">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-4xl font-bold mb-4">What's your vibe today?</h2>
            <p className="text-neutral-400 max-w-md">
              Describe what you want to listen to. For example, "upbeat jazz for cooking" or "something chill to study to".
            </p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${msg.role === 'user' ? 'bg-[#1db954] text-black font-medium' : 'bg-[#242424] text-white'}`}>
                {msg.content}
              </div>
              
              {/* Display Tracks if AI response */}
              {msg.tracks && msg.tracks.length > 0 && (
                <div className="mt-4 w-full max-w-2xl bg-[#181818] rounded-xl p-4 shadow-lg border border-[#282828]">
                  <h3 className="text-sm font-bold text-neutral-400 mb-3 uppercase tracking-wider">Curated Tracklist</h3>
                  <div className="flex flex-col gap-2">
                    {msg.tracks.map((track, tidx) => (
                      <div key={tidx} className="flex items-center justify-between p-2 hover:bg-[#2a2a2a] rounded-md group transition cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-[#282828] rounded flex items-center justify-center relative">
                            <Play className="w-4 h-4 opacity-0 group-hover:opacity-100 absolute" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-white font-medium line-clamp-1">{track.track_name}</span>
                            <span className="text-sm text-neutral-400 line-clamp-1">{track.artists}</span>
                          </div>
                        </div>
                        <span className="text-xs text-neutral-500 font-mono">
                          {Math.floor(track.duration_ms / 60000)}:{((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
        
        {loading && (
          <div className="flex items-start">
            <div className="bg-[#242424] text-white max-w-[80%] rounded-2xl px-5 py-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#1db954] rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-[#1db954] rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-[#1db954] rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-gradient-to-t from-[#121212] to-transparent">
        <form onSubmit={handleSend} className="max-w-3xl mx-auto relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Tell me what you want to hear..."
            className="w-full bg-[#242424] text-white rounded-full pl-6 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-[#1db954] transition shadow-lg"
          />
          <button 
            type="submit" 
            disabled={!prompt.trim() || loading}
            className="absolute right-2 top-2 bottom-2 w-10 bg-[#1db954] rounded-full flex items-center justify-center text-black disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition"
          >
            <Send className="w-5 h-5 ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
}
