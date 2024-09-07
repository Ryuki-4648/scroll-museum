"use client"

import Image from "next/image";
import "../globals.css";
import { useRef, useEffect } from "react";
import history01 from "../../data/history01.json";

export default function DetailPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleWheelScroll = (event: WheelEvent) => {
      if (event.deltaY !== 0 && containerRef.current) {
        event.preventDefault();
        containerRef.current.scrollLeft += event.deltaY;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheelScroll, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheelScroll);
      }
    };
  }, []);

  return (
    <>
      <div className="overflow-x-scroll w-[1000px]" ref={containerRef}>
        <ul className="flex">
          {history01.map((item, index) => (
            <li key={item.id}>
              <Image
                  src={item.image}
                  alt={item.title}
                  className="dark:invert"
                  priority
                  width={600}
                  height={400}
                />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}