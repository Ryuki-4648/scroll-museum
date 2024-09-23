"use client"

import { useRef, useEffect } from "react";
import Image from "next/image";

import "../globals.scss";

import history01 from "../../data/prod/history01.json";
import history02 from "../../data/prod/history02.json";
import { useSearchParams } from "next/navigation";

export default function DetailPage() {

  /** クエリパラメータを取得 */
  const searchParams = useSearchParams()
  const selectedItem = searchParams.get("selection")

  /** 選択した値によってデータを切り替える */
  const displayData = selectedItem === "groom" ? history01 : history02

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
      <div className="l-history overflow-y-hidden">
        <div className="l-history__inner">
          {/* <p className="text-[1.8rem] tracking-wider w-full text-gray-50 absolute top-8 left-4">
            Chapter<span className="mx-1">{selectedItem === 'groom' ? '1.' : '2.'}</span>
          </p> */}
          <div className="overflow-x-scroll flex items-center l-history__wrap" ref={containerRef}>
            <div className={`l-history__index h-screen flex items-center w-[15rem] ${selectedItem === 'groom' ? 'color01' : 'color02'}`}>
              <h1 className="rotate-90 text-[120px] leading-none text-light-gray font-bold drop-shadow-lg">
                {selectedItem?.toUpperCase()}
              </h1>
            </div>
            
            <ul className="flex items-center l-history__list" style={{ minWidth: `${history01.length * 600}px` }}>
              {displayData.map((item: any, index: number) => (
                <li key={item.id} className={`l-history__item h-screen flex flex-wrap items-center content-center ${selectedItem === 'groom' ? 'color01' : 'color02'}`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="l-history__image mb-12 drop-shadow-2xl mx-[4rem]"
                    priority
                    width={400}
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
            {(selectedItem === 'groom' || selectedItem === 'bride') && (
              <div className={`l-history__last h-screen flex items-center w-[150rem] pr-24 ${selectedItem === 'groom' ? 'color01' : 'color02'}`}>
                <a href={`${selectedItem === 'groom' ? '/#section-bride' : '/#section-end'}`} className="text-[60px] leading-none text-light-gray font-bold drop-shadow-lg w-full">
                  Chapter<span className="ml-2">{selectedItem === 'groom' ? '2' : '3'}.</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
