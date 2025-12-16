import { useState, useEffect } from "react";

export default function useTruncate() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const truncate = (address: string) => {
    if (!address) return "";

    // Determine max length based on screen width
    let maxLength: number;
    if (screenWidth < 480) maxLength = 10; // mobile
    else if (screenWidth < 768) maxLength = 16; // tablet
    else maxLength = 36; // desktop

    if (address.length <= maxLength) return address;

    const half = Math.floor((maxLength - 1) / 2);
    return `${address.slice(0, half)}…${address.slice(-half)}`;
  };

  return truncate;
}
