import { useState, useEffect } from "react";

/**
 * Truncates an address or string in the middle based on screen width.
 * Example: 0x123456…abcd
 */
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
    else maxLength = 24; // desktop

    if (address.length <= maxLength) return address;

    const half = Math.floor((maxLength - 1) / 2); // leave 1 char for …
    return `${address.slice(0, half)}…${address.slice(-half)}`;
  };

  return truncate;
}
