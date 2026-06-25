import { Home, Search, Library, PlusSquare, Heart } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 flex flex-col gap-2">
      {/* Top Nav */}
      <div className="bg-[#121212] rounded-lg p-4 flex flex-col gap-4">
        <div className="flex items-center gap-4 text-neutral-400 hover:text-white transition cursor-pointer font-bold">
          <Home className="w-6 h-6" />
          <span>Home</span>
        </div>
        <div className="flex items-center gap-4 text-white transition cursor-pointer font-bold">
          {/* Active state for search/discovery */}
          <Search className="w-6 h-6" />
          <span>Sonic Discovery</span>
        </div>
      </div>

      {/* Library */}
      <div className="bg-[#121212] rounded-lg p-4 flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center gap-4 text-neutral-400 hover:text-white transition cursor-pointer font-bold mb-6">
          <Library className="w-6 h-6" />
          <span>Your Library</span>
        </div>
        
        <div className="flex flex-col gap-4 mt-2 overflow-y-auto">
          <div className="flex items-center gap-4 text-neutral-400 hover:text-white transition cursor-pointer">
            <PlusSquare className="w-6 h-6" />
            <span className="font-semibold text-sm">Create Playlist</span>
          </div>
          <div className="flex items-center gap-4 text-neutral-400 hover:text-white transition cursor-pointer">
            <div className="bg-gradient-to-br from-indigo-600 to-blue-300 w-6 h-6 rounded flex items-center justify-center">
               <Heart className="w-3 h-3 text-white fill-white" />
            </div>
            <span className="font-semibold text-sm">Liked Songs</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-neutral-800 text-xs text-neutral-500 font-medium">
          <div className="hover:underline cursor-pointer">Cookies</div>
          <div className="hover:underline cursor-pointer mt-2">Privacy Policy</div>
        </div>
      </div>
    </aside>
  );
}
