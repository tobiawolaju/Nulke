import trades from '../dummy-trades.json'; // Import the data

// A helper function to format PnL with color
const PnlCell = ({ pnl_percent, pnl_usd }) => {
  const isPositive = pnl_percent >= 0;
  const colorClass = isPositive ? 'text-green-400' : 'text-red-400';

  return (
    <td className={`${colorClass} font-semibold`}>
      {isPositive ? '+' : ''}{pnl_usd.toFixed(2)} USD ({pnl_percent}%)
    </td>
  );
};


export default function TradesTable() {
  const blockExplorerUrl = "https://etherscan.io/tx/";

  return (
    <div className="bg-gray-800/30 backdrop-blur-xl p-6 rounded-xl shadow-xl text-white">
      <h2 className="text-2xl font-bold mb-4">Recent Trades</h2>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="py-3 px-2">Token</th>
              <th className="py-3 px-2">Type</th>
              <th className="py-3 px-2">Amount</th>
              <th className="py-3 px-2">PnL (USD)</th>
              <th className="py-3 px-2">Tx Hash</th>
              <th className="py-3 px-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr key={trade.id} className="border-b border-gray-700/40 hover:bg-gray-700/20 transition-colors">
                <td className="py-3 px-2 flex items-center gap-2">
                  <img
                    src={trade.token.logo}
                    alt={`${trade.token.name} logo`}
                    // --- THIS IS THE CHANGED LINE ---
                    className="w-6 h-6 rounded-md" 
                  />
                  {trade.token.name}
                </td>
                <td className={`py-3 px-2 font-semibold ${trade.type === 'Buy' ? 'text-green-400' : 'text-red-400'}`}>
                  {trade.type}
                </td>
                <td className="py-3 px-2">{trade.amount.toLocaleString()}</td>
                
                <PnlCell pnl_percent={trade.pnl_percent} pnl_usd={trade.pnl_usd} />

                <td className="py-3 px-2">
                  <a
                    href={`${blockExplorerUrl}${trade.tx_hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {`${trade.tx_hash.substring(0, 6)}...${trade.tx_hash.substring(trade.tx_hash.length - 4)}`}
                  </a>
                </td>
                <td className="py-3 px-2 text-gray-300">{trade.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}