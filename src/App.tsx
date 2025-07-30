import { useState, useEffect } from "react";
import { getImages } from "./sanity/sanity-utils";
import type { Image } from "./types/Image";
import Player from "./components/Player";
import { SOUNDCLOUD_EMBED } from "./constants";

function App() {
  const [images, setImages] = useState<Image[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    async function fetchData() {
      const data = await getImages();
      setImages(data);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const newPosition = {
      x: (clientX / window.innerWidth) * 100,
      y: (clientY / window.innerHeight) * 100,
    };
    setMousePosition(newPosition);
  };

  if (isLoading) return <div>...</div>;

  return (
    <>
      <div
        className="fixed top-0 left-0 h-screen w-screen cursor-crosshair overflow-hidden bg-center opacity-100"
        style={{
          backgroundImage: `url(${
            (images &&
              images[Math.floor(Math.random() * images.length)].file.asset.url +
                "?fm=webp") ||
            ""
          })`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="relative opacity-95 mix-blend-color-burn">
          <div className="absolute top-0 right-0 bottom-0 left-0 h-screen w-[150%] bg-black/70"></div>
          <div
            onMouseMove={handleMouseMove}
            className="absolute top-0 right-0 bottom-0 left-0 h-screen w-full bg-[#fff]"
            style={{
              maskImage: `radial-gradient(ellipse 600px 600px at ${mousePosition.x}% ${mousePosition.y}%, red 10%, transparent 90%)`,
            }}
          ></div>
        </div>
      </div>
      <Player embed={SOUNDCLOUD_EMBED} />
    </>
  );
}

export default App;
