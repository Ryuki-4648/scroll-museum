"use client"

import Image from "next/image";
import "../globals.scss";
import { useRef, useEffect, useState } from "react";
import history01 from "../../data/history01.json";

export default function DetailPage() {

  /** 見出し */
  const [displayIndex, setDisplayIndex] = useState(true);

  /** 横スクロール */
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleWheelScroll = (event: WheelEvent) => {
      if (event.deltaY !== 0 && containerRef.current) {
        event.preventDefault();
        containerRef.current.scrollLeft += event.deltaY;
        setDisplayIndex(false)
      } else {
        setDisplayIndex(true)
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
    <div className="l-history">
      <div className="l-history__inner">
        {displayIndex && (<h1 className="absolute -left-[200px] top-56 rotate-90 text-[120px] leading-none">GROOM</h1>)}
        <div className="overflow-x-scroll h-screen flex items-center" ref={containerRef}>
          <ul className="flex px-12" style={{ minWidth: `${history01.length * 1024}px` }}>
            {history01.map((item, index) => (
              <li key={item.id} className="mr-32">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="l-history__image mb-12"
                  priority
                  width={600}
                  height={300}
                />
                <p className="text-3xl mb-4">{item.title}</p>
                <p className="text-2xl">{item.date}</p>
                <p className="text-2xl">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </>
  );
}
