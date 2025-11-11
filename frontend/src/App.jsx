import Header from './components/Header';
import StatusCard from './components/StatusCard';
import WalletInfo from './components/WalletInfo';
import TradesTable from './components/TradesTable';
import ControlPanel from './components/ControlPanel'; // 1. Import it

export default function App() {
  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      <Header />
      <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Left Column */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <StatusCard />
            <WalletInfo />
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 flex flex-col gap-6">
             {/* 2. Add the Control Panel */}
            <ControlPanel />
          </div>
        </div>

        {/* Trades Table below the grid */}
        <div className="mt-6">
          <TradesTable />
        </div>

      </main>
    </div>
  );
}