"use client"
/** 
 * クライアントコンポーネントとして宣言
 * use clientを使うとき：クライアントサイドでのみ動作する機能を使う場合
 * 例）useEffect、useState、DOM操作、外部ライブラリのクライアントサイドでの実行
 * 必要なのコンポーネントや処理に限定して使うのが良い
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import dayjs from "dayjs";
import Lenis from '@studio-freight/lenis'

import CustomCursor from "./CustomCursor";
import history03 from "../data/prod/history03.json";

export default function Home() {

  const router = useRouter()

  // プロフィール表示をクリック
  const [displayProfile, setDisplayProfile] = useState(false)
  const profileRef = useRef<HTMLParagraphElement | null>(null)
  const handleDisplayProfile = () => {
    setDisplayProfile(true)
  }

  // Our Historyをクリック
  const [displayOurHistory, setDisplayOurHistory] = useState(false)
  const ourHistoryRef = useRef<HTMLParagraphElement | null>(null)
  const handleDisplayOurHistory = () => {
    setDisplayOurHistory(true)
  }

  // プロフィールかOur Historyが表示されたらタイピングアニメーションを実行
  useEffect(() => {
    if (displayProfile && profileRef.current) {
      typeWriter(profileRef.current);
    } else if (displayOurHistory && ourHistoryRef.current) {
      typeWriter(ourHistoryRef.current);
    }
  }, [displayProfile, displayOurHistory]);

  // タイピング風アニメーション
  const typeWriter = (el: HTMLElement) => {
    const text = el.innerHTML;
    el.innerHTML = '';
    (function _type(i = 0) {
      if (i === text.length) return;
      el.innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>'
      setTimeout(() => _type(i + 1), 100); // msごとに1文字ずつ追加
    })();
  };

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

  // Our Historyのフリップ
  const [flipNumber, setFlipNumber] = useState(0)
  const [flipButton, setFlipButton] = useState(true)

  const handleFlipHistory = () => {
    if (flipNumber < history03.length - 1) {
      setFlipNumber(flipNumber + 1)
      setDisplayOurHistory(false)
    }

    if(flipNumber === history03.length - 2) {
      setFlipButton(false)
    }
  }

  return (
    <main className="pt-36 pb-[80rem] bg-bg01 font-mono relative">
      <CustomCursor />

      <h1 className="text-center text-[3.2rem] font-ten leading-3 tracking-widest">Our Profile and History</h1>
      <h2 className="absolute left-24 top-[60rem] text-[8.2rem] font-ten">生い立ちと<br />プロフィール</h2>

      <section className="text-center text-[6rem] font-ten tracking-wider mt-[100rem]" id="section-groom">
        <h3>Chapter 1</h3>
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

      <section className="text-center text-[6rem] font-ten tracking-wider pt-[30rem]" id="section-bride">
        <h3>Chapter 2</h3>
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
          {!displayProfile ?
            (<p className="text-[3rem] font-ten hover:text-accent01 duration-500" onClick={handleDisplayProfile}>Type my profile.</p>) : (
            <p ref={profileRef} className="typing-item text-[2.8rem] font-ten leading-loose text-left font-bold">
              {dayjs(process.env.NEXT_PUBLIC_BRIDE_BIRTHDAY).format('YYYY年M月DD日')}生まれ<br />
              出身：{process.env.NEXT_PUBLIC_BRIDE_BIRTH_PLACE}<br />
              血液型：{process.env.NEXT_PUBLIC_BRIDE_BLOOD_TYPE}<br />
              職業：{process.env.NEXT_PUBLIC_BRIDE_OCCUPATION}<br />
              趣味：{process.env.NEXT_PUBLIC_BRIDE_HOBBY}<br />
              好きなもの：{process.env.NEXT_PUBLIC_BRIDE_FAVORITE01}<br />{process.env.NEXT_PUBLIC_BRIDE_FAVORITE02}
            </p>
          )}
        </div>
        <div className="absolute right-[22rem] top-[16rem] block rotate-90 hover:text-accent01 duration-500">
          <a href="/detail" className="text-[17rem] leading-none font-cabin tracking-wide" onClick={handleSelected('bride')}>
            BRIDE
          </a>
        </div>
      </section>
        
      <section className="text-center text-[6rem] font-ten tracking-wider pt-[30rem]" id="section-end">
        <h3>Chapter 3</h3>
      </section>

      <section className="text-center text-[6rem] tracking-wider pt-[30rem]" id="section-end">
        <div className="max-w-[1024px] mx-auto">
          <ul>
            {history03.map((item, index) => (
              index === flipNumber && (
                <li key={index} className="relative">
                  <h4 className="tracking-wide text-[5rem] absolute left-1/2 -translate-x-1/2 -top-16 font-bold uppercase w-full font-cabin">History</h4>
                  <p className="text-[2rem] font-ten absolute left-1/2 -translate-x-1/2 -top-32">{`[${item.date}]`}</p>
                  <Image src={item.image} alt="" className="w-full block mx-auto border-8 border-white mb-20" width={400} height={300} />
                  <p className="absolute -left-10 bottom-20 leading-none text-[7.8rem] font-ten">{`0${item.id}`}</p>
                  {!displayOurHistory ? 
                  <p className="text-3xl font-ten hover:text-accent01 duration-500" onClick={handleDisplayOurHistory}>
                    Type our history.
                  </p> : <p ref={ourHistoryRef} className="text-3xl font-ten typing-item !text-center">{item.text}</p>}
                  
                  {flipButton && <button className="absolute -right-16 bottom-24 text-[4rem] font-ten leading-none duration-300 hover:text-accent01 cursor-pointer" onClick={handleFlipHistory}>Flip</button>}
              </li>
              )
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
