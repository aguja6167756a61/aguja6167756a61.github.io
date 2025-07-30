import { useState, useEffect } from "react";

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const newPosition = {
        x: (clientX / window.innerWidth) * 100,
        y: (clientY / window.innerHeight) * 100,
      };
      setMousePosition(newPosition);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div
        style={{ left: `${mousePosition.x}%`, top: 0 }}
        className="pointer-events-none fixed z-50 h-screen w-[1px] cursor-crosshair bg-white/20"
      />
      <div
        style={{ left: 0, top: `${mousePosition.y}%` }}
        className="pointer-events-none fixed z-50 h-[1px] w-full cursor-crosshair bg-white/20"
      />
    </>
  );
}
