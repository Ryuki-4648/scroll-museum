"use client"

import { useRef, useEffect } from "react";
import Image from "next/image";

import "../globals.scss";

import history01 from "../../data/history01.json";
import history02 from "../../data/history02.json";
import { useSearchParams } from "next/navigation";

export default function DetailPage() {

  /** クエリパラメータを取得 */
  const searchParams = useSearchParams()
  const selectedItem = searchParams.get("selection")

  /** 選択した値によってデータを切り替える */
  const displayData = selectedItem === "bride" ? history01 : history02

  /** 横スクロール */
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
      <div className="l-history">
        <div className="l-history__inner">
          <p className="text-[20px] tracking-wider w-full flex text-gray-50 absolute top-8 left-4">
            Chapter<span className="mx-1">{selectedItem === 'groom' ? '1.' : '2.'}</span>
          </p>
          <div className="overflow-x-scroll flex items-center l-history__wrap" ref={containerRef}>
            <div className="l-history__index h-screen flex items-center border-r-2 border-white">
              <h1 className="rotate-90 text-[120px] leading-none text-gray-50 drop-shadow-lg">
                {selectedItem?.toUpperCase()}
              </h1>
            </div>
            <ul className="flex items-center l-history__list" style={{ minWidth: `${history01.length * 1024}px` }}>
              {displayData.map((item: any, index: number) => (
                <li key={item.id} className="l-history__item h-screen flex flex-wrap items-center content-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="l-history__image mb-12 drop-shadow-2xl mx-auto"
                    priority
                    width={600}
                    height={300}
                  />
                  <div className="w-full">
                    <p className="text-3xl mb-4 text-white">{item.title}</p>
                    <p className="text-2xl text-white">{item.date}</p>
                    <p className="text-2xl text-white">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            {selectedItem === 'groom' && (
              <div className="l-history__last">
                <a href="">BRIDE</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
