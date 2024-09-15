/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import Script from 'next/script'

import { Inter } from "next/font/google";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "scroll-museum （スクロールミュージアム）",
  description: "横スクロール型の美術館。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
        {/* Typekitのカスタムスクリプト */}
        <Script id="typekit-script" strategy="beforeInteractive">
          {`
            (function(d) {
              var config = {
                kitId: 'yca6shm',
                scriptTimeout: 3000,
                async: true
              },
              h=d.documentElement,t=setTimeout(function(){
                h.className=h.className.replace(/\\bwf-loading\\b/g,"")+" wf-inactive";
              },config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;
              h.className+=" wf-loading";
              tk.src='https://use.typekit.net/'+config.kitId+'.js';
              tk.async=true;
              tk.onload=tk.onreadystatechange=function(){
                a=this.readyState;
                if(f||a&&a!="complete"&&a!="loaded") return;
                f=true;
                clearTimeout(t);
                try{Typekit.load(config)}catch(e){}
              };
              s.parentNode.insertBefore(tk,s);
            })(document);
          `}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
