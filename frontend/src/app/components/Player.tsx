import { Play, SkipBack, SkipForward, Shuffle, Repeat, Mic2, MonitorSpeaker, Volume2, Maximize2 } from "lucide-react";

export default function Player() {
  return (
    <footer className="h-24 bg-black border-t border-[#282828] flex items-center justify-between px-4 z-50">
      {/* Left: Now Playing Info (Mock) */}
      <div className="flex items-center gap-4 w-[30%]">
        <div className="w-14 h-14 bg-[#282828] rounded flex items-center justify-center shrink-0 shadow-lg">
           <span className="text-[#b3b3b3] text-xs">AI</span>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-white text-sm font-medium hover:underline cursor-pointer">Sonic Discovery</span>
          <span className="text-[#b3b3b3] text-xs hover:underline cursor-pointer">Spotify Sommelier</span>
        </div>
      </div>

      {/* Center: Controls */}
      <div className="flex flex-col items-center max-w-[40%] w-full gap-2">
        <div className="flex items-center gap-6">
          <Shuffle className="w-4 h-4 text-[#b3b3b3] hover:text-white cursor-pointer" />
          <SkipBack className="w-5 h-5 text-[#b3b3b3] hover:text-white cursor-pointer fill-current" />
          <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-105 transition">
            <Play className="w-4 h-4 text-black fill-black ml-1" />
          </button>
          <SkipForward className="w-5 h-5 text-[#b3b3b3] hover:text-white cursor-pointer fill-current" />
          <Repeat className="w-4 h-4 text-[#b3b3b3] hover:text-white cursor-pointer" />
        </div>
        <div className="flex items-center w-full gap-2 text-xs text-[#b3b3b3]">
          <span>0:00</span>
          <div className="h-1 bg-[#4d4d4d] rounded-full w-full flex group cursor-pointer hover:bg-[#5e5e5e]">
            <div className="h-1 bg-white group-hover:bg-[#1db954] w-1/3 rounded-full relative">
               <div className="w-3 h-3 bg-white rounded-full absolute right-[-6px] top-[-4px] opacity-0 group-hover:opacity-100 shadow"></div>
            </div>
          </div>
          <span>3:14</span>
        </div>
      </div>

      {/* Right: Volume & Extras */}
      <div className="flex items-center justify-end gap-4 w-[30%] text-[#b3b3b3]">
        <Mic2 className="w-4 h-4 hover:text-white cursor-pointer" />
        <MonitorSpeaker className="w-4 h-4 hover:text-white cursor-pointer" />
        <div className="flex items-center gap-2 w-24">
          <Volume2 className="w-4 h-4 hover:text-white cursor-pointer" />
          <div className="h-1 bg-[#4d4d4d] rounded-full w-full flex group cursor-pointer hover:bg-[#5e5e5e]">
            <div className="h-1 bg-white group-hover:bg-[#1db954] w-2/3 rounded-full relative">
                <div className="w-3 h-3 bg-white rounded-full absolute right-[-6px] top-[-4px] opacity-0 group-hover:opacity-100 shadow"></div>
            </div>
          </div>
        </div>
        <Maximize2 className="w-4 h-4 hover:text-white cursor-pointer" />
      </div>
    </footer>
  );
}
