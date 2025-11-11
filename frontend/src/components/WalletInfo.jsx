import { useState } from 'react';
// A simple copy icon component, you can use an SVG library like react-icons if you prefer
const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M4 1.5H3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9.5A1.5 1.5 0 0 1 11.5 8H6a1.5 1.5 0 0 1-1.5-1.5V1.5z"/>
    <path d="M6.5 0A1.5 1.5 0 0 1 8 1.5v5A1.5 1.5 0 0 1 6.5 8h-5A1.5 1.5 0 0 1 0 6.5v-5A1.5 1.5 0 0 1 1.5 0h5zM15 4.5a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 7 4.5v-3A1.5 1.5 0 0 1 8.5 0h5A1.5 1.5 0 0 1 15 1.5v3z"/>
  </svg>
);

export default function WalletInfo() {
  const [copied, setCopied] = useState(false);
  const walletAddress = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"; // Example address

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="bg-gray-800/30 backdrop-blur-xl rounded-xl shadow-xl p-6 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-lg font-semibold text-gray-300 mb-2">Wallet Overview</h2>
        
        {/* The Attention-Calling Balance */}
        <p className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-1">
          1.45 ETH
        </p>
        <p className="text-gray-400 text-lg font-mono">
          ($2,465.50 USD)
        </p>
      </div>
      
      {/* Address and Copy Button at the bottom */}
      <div className="mt-6">
        <label className="text-xs text-gray-400">Wallet Address</label>
        <div className="flex items-center justify-between gap-4 mt-1">
          <p className="text-sm text-gray-300 font-mono truncate">
            {walletAddress}
          </p>
          <button 
            onClick={handleCopy} 
            className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-md transition-all duration-200 ${
              copied 
                ? 'bg-green-500/80 text-white' 
                : 'bg-gray-700/50 hover:bg-gray-600/70 text-gray-300'
            }`}
          >
            {copied ? 'Copied!' : <CopyIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}