import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursor = (e: { clientX: number; clientY: number; }) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateCursor);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
    };
  }, []);

  return (
    <div
    className='fixed w-[80px] h-[80px] bg-midium-gray rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-10 opacity-50'
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
}
