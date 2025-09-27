import React, { useEffect, useState,useRef } from "react";

const BASE_IMG_URL = "https://picsum.photos/seed/sameimage/300";

function App() {
  return <CustomBlur />;
}

const CustomBlur = () => {
  // KODUNUZ BURAYA GELECEK
   const [pos, setPos] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  const maxWidth = 240;

   const handleMouseDown = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      if (!sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      let newX = e.clientX - rect.left; 

      if (newX < 0) newX = 0;
      if (newX > maxWidth) newX = maxWidth;

      setPos(newX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="flex justify-center mt-5 gap-6 flex-col items-center">
      <img
        src={BASE_IMG_URL}
        alt=""
        style={{ filter: `blur(${(pos / 20).toFixed(1)}px)` }}
      />
      <div
        ref={sliderRef}
        className="relative w-60 h-2 bg-gray-200 rounded"
      >
        <div
          onMouseDown={handleMouseDown}
          className="h-3 w-3 rounded-full bg-blue-500 absolute top-[-2px] cursor-pointer"
          style={{ left: `${pos}px` }}
        ></div>
      </div>
    </div>
  );
};

export default App;
