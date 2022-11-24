import { useState, useEffect } from "react";

function getWindowDimensions() {
  const { innerWidth: widthView, innerHeight: heightView } = window;
  return {
    widthView,
    heightView,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
