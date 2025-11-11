import { useState, useEffect } from 'react';

export default function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 bg-gray-900/30 backdrop-blur-xl border-b border-white/10 z-50">
      <h1 className="text-purple-400 text-2xl font-bold tracking-wider">NULKE</h1>
      <div className="text-gray-300 font-mono text-sm">
        {time.toLocaleTimeString()}
      </div>
    </header>
  );
}