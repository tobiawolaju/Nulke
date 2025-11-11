import { useState } from 'react';

// Reusable component for each setting row
const SettingRow = ({ label, description, children }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-700/40">
    <div>
      <label className="text-white font-semibold">{label}</label>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
    <div className="flex items-center gap-2">
      {children}
    </div>
  </div>
);

// Toggle Switch Component
const ToggleSwitch = ({ enabled, setEnabled }) => (
  <button
    onClick={() => setEnabled(!enabled)}
    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 ${
      enabled ? 'bg-purple-600' : 'bg-gray-600'
    }`}
  >
    <span
      className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);


export default function ControlPanel() {
  // State for each control
  const [isBotPaused, setIsBotPaused] = useState(false);
  const [slippage, setSlippage] = useState(0.5);
  const [maxSpend, setMaxSpend] = useState(0.1); // in ETH
  const [gasPriority, setGasPriority] = useState('high');
  const [priceOracle, setPriceOracle] = useState('chainlink');

  return (
    <div className="bg-gray-800/30 backdrop-blur-xl p-6 rounded-xl shadow-xl text-white">
      <h2 className="text-2xl font-bold mb-4">Bot Controls</h2>

      {/* === Bot Actions === */}
      <fieldset className="mb-6">
        <legend className="text-lg font-semibold text-purple-400 mb-2">Actions</legend>
        <SettingRow
          label={isBotPaused ? 'Bot Paused' : 'Bot Running'}
          description="Immediately pause or resume all trading activity."
        >
          <span className="mr-2 font-bold">{isBotPaused ? 'PAUSE' : 'RESUME'}</span>
          <ToggleSwitch enabled={!isBotPaused} setEnabled={(val) => setIsBotPaused(!val)} />
        </SettingRow>
      </fieldset>

      {/* === Transaction Settings === */}
      <fieldset>
        <legend className="text-lg font-semibold text-purple-400 mb-2">Transaction Strategy</legend>

        <SettingRow
          label="Gas Fee Priority"
          description="Set default gas fee to prioritize transactions."
        >
          <select
            value={gasPriority}
            onChange={(e) => setGasPriority(e.target.value)}
            className="bg-gray-700/50 border border-gray-600 rounded-md px-3 py-1 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="standard">Standard</option>
            <option value="high">High (Faster)</option>
            <option value="validator_tip">Validator Tip</option>
            <option value="custom_mev">Custom MEV</option>
          </select>
        </SettingRow>

        <SettingRow
          label="Slippage Limit"
          description="Max price change allowed before a trade reverts."
        >
          <input
            type="number"
            step="0.1"
            value={slippage}
            onChange={(e) => setSlippage(parseFloat(e.target.value))}
            className="w-20 bg-gray-700/50 border border-gray-600 rounded-md px-2 py-1 text-right text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <span className="text-gray-400">%</span>
        </SettingRow>

        <SettingRow
          label="Max Spend Per Trade"
          description="Safety limit for a single transaction."
        >
          <input
            type="number"
            step="0.01"
            value={maxSpend}
            onChange={(e) => setMaxSpend(parseFloat(e.target.value))}
            className="w-20 bg-gray-700/50 border border-gray-600 rounded-md px-2 py-1 text-right text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <span className="text-gray-400">ETH</span>
        </SettingRow>
      </fieldset>

      {/* === Data & Strategy === */}
      <fieldset className="mt-6">
         <legend className="text-lg font-semibold text-purple-400 mb-2">Data & Strategy</legend>
        <SettingRow
          label="Price Oracle"
          description="Source for real-time token price data."
        >
          <select
            value={priceOracle}
            onChange={(e) => setPriceOracle(e.target.value)}
            className="bg-gray-700/50 border border-gray-600 rounded-md px-3 py-1 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="chainlink">Chainlink</option>
            <option value="uniswap_v3">Uniswap V3 TWAP</option>
            <option value="pyth">Pyth Network</option>
          </select>
        </SettingRow>
      </fieldset>
    </div>
  );
}