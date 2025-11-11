import Header from "./components/Header";
import StatusCard from "./components/StatusCard";
import WalletInfo from "./components/WalletInfo";
import TradesTable from "./components/TradesTable";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatusCard />
        <WalletInfo />
      </div>

      <div className="p-6">
        <TradesTable />
      </div>
    </div>
  );
}
