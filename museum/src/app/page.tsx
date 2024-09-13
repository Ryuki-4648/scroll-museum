import Image from "next/image";

export default function Home() {
  return (
    <main className="p-24 bg-bg01 h-screen">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="absolute left-1/2 -translate-1/2 top-4 leading-4 text-md">Out Profile and History</p>
        <p className="absolute left-4 top-8">生い立ちと<br />プロフィール</p>
        <h1 className="text-[6rem] w-full">OUT HISTORY</h1>
        {/* <div>
          <a href="" className="text-[16rem] rotate-90 leading-none absolute -left-80 top-1/2 -translate-y-1/2">GROOM</a>
        </div>
        <div>
          <a href="" className="text-[16rem] rotate-90 leading-none absolute left-1/2 top-1/2 -translate-y-1/2">BRIDE</a>
        </div> */}
        <div>
          <a href="" className="text-[16rem] rotate-90 leading-none">GROOM</a>
        </div>
        <div>
          <a href="" className="text-[16rem] rotate-90 leading-none">BRIDE</a>
        </div>
        <p className="text-[8rem] absolute bottom-12 left-48">白石麻衣</p>
        
        <p className="text-[8rem] absolute bottom-12 right-48">与田祐希</p>
      </div>
    </main>
  );
}
