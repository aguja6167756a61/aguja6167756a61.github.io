import { useState, useEffect } from "react";

export default function Player({ embed }: { embed: string }) {
  const [playerOpen, setPlayerOpen] = useState(false);
  const [playListId, setPlayListId] = useState<string | null>(null);

  useEffect(() => {
    const match = embed.match(/playlists\/(\d+)/);
    if (!match) {
      console.warn("No playlist ID found in embed:", embed);
      setPlayListId(null);
      return;
    }
    setPlayListId(match[1]);
  }, [embed]);

  return (
    <div
      className={`fixed bottom-0 z-[150] flex w-full flex-col items-start justify-center transition-all duration-500 ease-in-out ${playerOpen ? "translate-y-[0]" : "translate-y-[400px]"} pointer-events-none`}
    >
      <button
        onClick={() => setPlayerOpen(!playerOpen)}
        className="pointer-events-auto m-4 flex cursor-pointer items-center justify-center rounded-full border px-2 pb-1 text-xl text-white select-none sm:hover:bg-white sm:hover:text-black"
      >
        {playerOpen ? "(X)" : "(~)"}
      </button>
      <div className="pointer-events-auto h-[400px] w-full opacity-95">
        <iframe
          className="grayscale invert"
          width="100%"
          height="400"
          src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${playListId}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=false`}
        ></iframe>
      </div>
    </div>
  );
}
