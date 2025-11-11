import { useState } from 'react';

export default function WalletInfo() {
  const [copied, setCopied] = useState(false);
  const walletAddress = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"; // Example address

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="bg-gray-800/30 backdrop-blur-xl p-5 rounded-xl shadow-xl">
      <h2 className="text-lg font-semibold mb-3 text-white">Wallet Overview</h2>
      <p className="text-gray-100 text-xl font-mono">1.45 ETH <span className="text-gray-400 text-base">($2,465.50)</span></p>
      <div className="flex items-center justify-between mt-2">
        <p className="text-sm text-gray-300 font-mono truncate">
          Address: {walletAddress}
        </p>
        <button onClick={handleCopy} className="text-xs bg-gray-700/50 px-2 py-1 rounded hover:bg-gray-600 transition-colors">
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}