import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export const SoundToggle = () => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <button
      onClick={() => setIsMuted(!isMuted)}
      className="fixed top-5 right-5 z-50 w-9 h-9 rounded-full glass-nav flex items-center justify-center hover:bg-secondary/50 transition-colors"
      aria-label={isMuted ? "Enable sound" : "Disable sound"}
    >
      {isMuted ? (
        <VolumeX className="w-3.5 h-3.5 text-muted-foreground" />
      ) : (
        <Volume2 className="w-3.5 h-3.5 text-foreground" />
      )}
    </button>
  );
};
