export default function StatusCard() {
  const isRunning = true; // This would come from your bot's state
  
  return (
    <div className="bg-gray-800/30 backdrop-blur-xl p-5 rounded-xl shadow-xl">
      <h2 className="text-lg font-semibold mb-3 text-white">Bot Status</h2>
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-green-400 animate-pulse' : 'bg-red-500'}`}></div>
        <p className={`${isRunning ? 'text-green-400' : 'text-red-500'} font-bold`}>
          {isRunning ? 'Running' : 'Stopped'}
        </p>
      </div>
      <p className="text-sm text-gray-300">Uptime: 12h 45m</p>
      <p className="text-sm text-gray-300">Last Action: Sell PEPE (2 mins ago)</p>
    </div>
  );
}