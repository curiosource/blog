'use client';
import Script from 'next/script';

const Adsense = () => {
  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_AD_ID}`}
        crossOrigin="anonymous"
      />
    </>
  );
};

export default Adsense;
