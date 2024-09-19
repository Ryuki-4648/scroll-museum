"use client"
/** 
 * クライアントコンポーネントとして宣言
 * use clientを使うとき：クライアントサイドでのみ動作する機能を使う場合
 * 例）useEffect、useState、DOM操作、外部ライブラリのクライアントサイドでの実行
 * 必要なのコンポーネントや処理に限定して使うのが良い
 */

import Image from "next/image";
import dayjs from "dayjs";
import Lenis from '@studio-freight/lenis'
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation"; // next/routerの場合NextRouter was not mounted.のエラーとなる
import { useInView } from "react-intersection-observer";


const useTypingObserver = () => {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("is-visible")
            }, index * 30000)
            observer.current?.unobserve(entry.target)
          }
        });
      },
      { threshold: 0.8 }
    );

    const items = document.querySelectorAll(".typing-item");
    items.forEach((item) => observer.current?.observe(item));

    return () => {
      observer.current?.disconnect();
    };
  }, []);
};

export default function Home() {

  useTypingObserver();

  const router = useRouter()

  useEffect(() => { // クライアントサイドでのみ実行

    /** 慣性スクロール */
    const lenis = new Lenis({
      lerp: 0.08, // スクロールの速さ、デフォルトは 0.1
      duration: 1.2, // アニメーションの長さ（秒）, 一定時間でスクロールを終える
      // smoothWheel: true,  マウスホイールでのスクロールをスムーズにするか, デフォルトは true
      // smoothTouch: false, タッチデバイスでのスクロールをスムーズにするか, デフォルトは false
    })
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)
  }, []) // コンポーネントのマウント時にのみ実行

  /** どちらかを選択して詳細に遷移させる */
  const handleSelected = (selection: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    router.push(`/detail?selection=${selection}`) // 選択した情報をURLのクエリパラメータに含める
  }

  return (
    <main className="pt-36 pb-[80rem] bg-bg01 font-mono relative">

      <p className="text-center text-[2rem] font-cabin leading-3 tracking-widest">
        Our Profile and History
      </p>
      <p className="absolute left-24 top-[30rem] text-[8.2rem] font-ten">
        生い立ちと<br />プロフィール
      </p>
      <p className="absolute left-24 top-[30rem] text-[8.2rem] font-ten fade-in">生い立ちと<br />プロフィール</p>
      {/* <p className="text-[6rem] w-full text-center">INTRO</p> */}
      {/* <p className="font-ten text-[3rem] opacity-20">皆様には ご健勝のこととお慶び申し上げます<br />このたび お越しいただき誠にありがとうございます<br />つきましては<br />ご挨拶をかねて心ばかりの小宴を催したいと思います</p> */}

      <section className="text-center text-[6rem] font-cabin tracking-wider pt-[70rem]" id="section-groom">
        <p>Chapter 1</p>
      </section>

      <section className="flex items-baseline relative" id="section-groom">
        <Image
          src="/prod/img_groom01.jpg"
          alt="Picture of the author"
          className="mt-[40rem] rounded-tr-[14rem]"
          width={600}
          height={300}
        />
        <div className="absolute bottom-[0rem] left-[54rem] hover:text-accent01 duration-500">
          <a href="/detail" className="text-[16rem] leading-none font-cabin" onClick={handleSelected('groom')}>GROOM</a>
        </div>
        <p className="text-[9.5rem] font-ten c-textVertical ml-[2.5rem] leading-none tracking-widest">
          {process.env.NEXT_PUBLIC_GROOM_NAME}
        </p>
        <div className="absolute ml-[55rem] bottom-[18rem]">
          <ul className="text-[2.8rem] font-ten leading-loose">
            <li>{dayjs(process.env.NEXT_PUBLIC_GROOM_BIRTHDAY).format('YYYY年M月DD日')}生まれ</li>
            <li>出身：{process.env.NEXT_PUBLIC_GROOM_BIRTH_PLACE}</li>
            <li>血液型：{process.env.NEXT_PUBLIC_GROOM_BLOOD_TYPE}</li>
            <li>職業：{process.env.NEXT_PUBLIC_GROOM_OCCUPATION}</li>
            <li>趣味：{process.env.NEXT_PUBLIC_GROOM_HOBBY}</li>
            <li>好きなもの：{process.env.NEXT_PUBLIC_GROOM_FAVORITE01}</li>
            <li>{process.env.NEXT_PUBLIC_GROOM_FAVORITE02}</li>
          </ul>
        </div>
      </section>

      <section className="text-center text-[6rem] font-cabin tracking-wider pt-[30rem]" id="section-bride">
        <p>Chapter 2</p>
      </section>

      <section className="relative mt-[30rem] flex">
        <p className="text-[11rem] ml-[6rem] font-ten w-full leading-none tracking-widest">
          {process.env.NEXT_PUBLIC_BRIDE_NAME}
        </p>
        <Image
          src="/prod/img_bride01.jpg"
          alt="Picture of the author"
          className="rounded-tl-[14rem]"
          width={600}
          height={300}
        />
        <div className="absolute left-[6rem] top-[14rem]">
          <ul className="text-[2.8rem] font-ten leading-loose typing-list">
            <li className="typing-item">{dayjs(process.env.NEXT_PUBLIC_BRIDE_BIRTHDAY).format('YYYY年M月DD日')}生まれ</li>
            <li className="typing-item">出身：{process.env.NEXT_PUBLIC_BRIDE_BIRTH_PLACE}</li>
            <li className="typing-item">血液型：{process.env.NEXT_PUBLIC_BRIDE_BLOOD_TYPE}</li>
            <li className="typing-item">職業：{process.env.NEXT_PUBLIC_BRIDE_OCCUPATION}</li>
            <li className="typing-item">趣味：{process.env.NEXT_PUBLIC_BRIDE_HOBBY}</li>
            <li className="typing-item">好きなもの：{process.env.NEXT_PUBLIC_BRIDE_FAVORITE01}<br />{process.env.NEXT_PUBLIC_BRIDE_FAVORITE02}</li>
          </ul>
        </div>
        <div className="absolute right-[22rem] top-[16rem] block rotate-90 hover:text-accent01 duration-500">
          <a href="/detail" className="text-[17rem] leading-none font-cabin tracking-wide" onClick={handleSelected('bride')}>
            BRIDE
          </a>
        </div>
      </section>

      <section className="mt-[30rem]" id="section-end">
        <h2>hoge</h2>
      </section>
        
    </main>
  );
}
