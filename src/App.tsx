import { useState, useEffect } from "react";
import { getImages } from "./sanity/sanity-utils";
import type { Image } from "./types/Image";
import Player from "./components/Player";
import { SOUNDCLOUD_EMBED } from "./constants";
import Loading from "./components/Loading";
import { AnimatePresence, motion } from "framer-motion";
import Credits from "./components/Credits";
import Cursor from "./components/Cursor";

function App() {
  const [images, setImages] = useState<Image[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVideoVisible, setIsVideoVisible] = useState(true);
  const [creditsOpen, setCreditsOpen] = useState(false);

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

  if (isLoading) return <Loading />;

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

      <AnimatePresence mode="wait">
        {isVideoVisible && (
          <motion.div
            key="propulsor-youtube-embed"
            className="pointer-events-none fixed z-[100] flex aspect-video h-screen w-full items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="aspect-video w-full rounded bg-black md:w-3/5">
              <iframe
                width="100%"
                className="pointer-events-auto rounded"
                height="100%"
                src="https://www.youtube.com/embed/flh0wGaj4jM?si=bkwHWlLnAjUQ2u9W"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen={true}
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed top-2 left-4 mb-4 flex flex-col items-start gap-2 px-4 text-xl text-[#fff] sm:px-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsVideoVisible(isVideoVisible ? false : true)}
            className="cursor-pointer sm:hover:bg-[#f00]"
          >
            {isVideoVisible ? "(X) " : "(O) "}
            PROPULSOR
          </button>
          {!isVideoVisible && (
            <motion.div
              className=""
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            >
              &lt;--
            </motion.div>
          )}
        </div>

        <button
          onClick={() => setCreditsOpen(!creditsOpen)}
          className="z-[200] pb-1 leading-none sm:hover:bg-[#f00]"
        >
          (?)
        </button>

        <ul className="fixed top-4 right-4 flex rotate-180 gap-4 text-xs uppercase [writing-mode:vertical-lr]">
          <li className="-ml-1 pl-1 leading-none sm:hover:bg-[#f00]">
            <a
              target="_blank"
              href="https://www.ninaprotocol.com/releases/aguja-m-u-sica-electr-onica-i"
            >
              nina
            </a>
          </li>
          <li className="-ml-1 pl-1 leading-none sm:hover:bg-[#f00]">
            <a
              target="_blank"
              href="https://unun.bandcamp.com/album/un002-m-sica-electr-nica-i"
            >
              bandcamp
            </a>
          </li>
          <li className="-ml-1 pl-1 leading-none sm:hover:bg-[#f00]">
            <a target="_blank" href="https://soundcloud.com/aguja6167756a61">
              soundcloud
            </a>
          </li>
          <li className="-ml-1 pl-1 leading-none sm:hover:bg-[#f00]">
            <a
              target="_blank"
              href="https://www.instagram.com/aguja6167756a61/"
            >
              instagram
            </a>
          </li>
        </ul>
      </div>

      <Player embed={SOUNDCLOUD_EMBED} />

      <AnimatePresence mode="wait">
        {creditsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            key="credits"
          >
            <Credits
              closeCredits={() => {
                setCreditsOpen(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Cursor />
    </>
  );
}

export default App;
