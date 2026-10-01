import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { crops, markets, storageFacilities, getDistance, getEstTravelExpense, getMarketResults } from '../data/mockData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Create custom colored SVG pin markers for leaflet to avoid Vite asset bundling issues
const createCustomIcon = (color: string, label: string) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background-color: ${color};
        color: white;
        border-radius: 9999px;
        width: 34px;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        border: 2px solid white;
      ">
        ${label}
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -34],
  });
};

const farmerIcon = createCustomIcon('#15803d', '🧑‍🌾');
const mandiIcon = createCustomIcon('#2563eb', '🏪');
const storageIcon = createCustomIcon('#d97706', '🏬');

export default function MapView() {
  const { state, dispatch } = useApp();

  const [selectedCrop, setSelectedCrop] = useState(state.selectedCrop || 'tomato');
  const [showMandis, setShowMandis] = useState(true);
  const [showStorage, setShowStorage] = useState(true);
  const [selectedPin, setSelectedPin] = useState<{ type: 'mandi' | 'storage'; data: any } | null>(null);

  const currentCropObj = crops.find((c) => c.id === selectedCrop) || crops[0];
  const marketResults = getMarketResults(selectedCrop, state.buyerPrices);

  // Baseline farmer location (Sangareddy)
  const farmerCoords: [number, number] = [17.6166, 78.0862];

  const handleCropChange = (cropId: string) => {
    setSelectedCrop(cropId);
    dispatch({ type: 'SET_CROP', crop: cropId });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8] pb-16 md:pb-0">
      <Header />

      <main className="flex-1 flex flex-col">
        {/* Controls Bar */}
        <div className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 z-20">
          <div className="page-container flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🗺️</span>
              <h1 className="font-display font-extrabold text-lg text-gray-900">
                Interactive Mandi & Storage Map
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Crop Picker */}
              <select
                value={selectedCrop}
                onChange={(e) => handleCropChange(e.target.value)}
                className="select-field font-bold text-xs py-1.5 px-3 bg-white"
              >
                {crops.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>

              {/* Toggles */}
              <div className="flex items-center gap-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setShowMandis(!showMandis)}
                  className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
                    showMandis ? 'bg-blue-50 border-blue-300 text-blue-800' : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <span>🏪 Mandis ({markets.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowStorage(!showStorage)}
                  className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
                    showStorage ? 'bg-amber-50 border-amber-300 text-amber-800' : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <span>🏬 Storages ({storageFacilities.length})</span>
                </button>
              </div>

              <Link to="/farmer/markets" className="btn-secondary text-xs py-1.5 px-3 font-bold">
                List View
              </Link>
            </div>
          </div>
        </div>

        {/* Map Layout */}
        <div className="flex-1 relative flex flex-col md:flex-row h-[calc(100vh-180px)] min-h-[500px]">
          {/* Left / Bottom Floating Details Panel */}
          {selectedPin && (
            <div className="absolute top-4 left-4 z-[1000] w-80 max-w-[calc(100%-2rem)] bg-white rounded-3xl p-5 shadow-2xl border border-gray-100 animate-slide-up">
              <div className="flex justify-between items-start mb-2">
                <span className={`badge text-[10px] font-bold ${
                  selectedPin.type === 'mandi' ? 'badge-blue' : 'badge-yellow'
                }`}>
                  {selectedPin.type === 'mandi' ? '🏪 Mandi Yard' : '🏬 Certified Storage'}
                </span>
                <button
                  onClick={() => setSelectedPin(null)}
                  className="text-gray-400 hover:text-gray-600 font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              {selectedPin.type === 'mandi' ? (
                <div className="space-y-3">
                  <div>
                    <h3 className="font-display font-extrabold text-xl text-gray-900">
                      {selectedPin.data.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {selectedPin.data.district}, {selectedPin.data.state}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-primary-50 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Road Distance:</span>
                      <span className="font-bold text-gray-900">{getDistance(selectedPin.data.id)} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Est. Travel Cost:</span>
                      <span className="font-bold text-amber-800">₹{getEstTravelExpense(selectedPin.data.id)}</span>
                    </div>
                  </div>

                  <Link
                    to={`/farmer/buyer-prices/${selectedPin.data.id}`}
                    className="w-full btn-primary py-2.5 text-center text-xs font-bold block"
                  >
                    View Buyer Quotes →
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <h3 className="font-display font-extrabold text-xl text-gray-900">
                      {selectedPin.data.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      📍 {selectedPin.data.location}, {selectedPin.data.district}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capacity:</span>
                      <span className="font-bold text-gray-900">{selectedPin.data.capacity} Tonnes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Rate:</span>
                      <span className="font-bold text-amber-900">₹{selectedPin.data.estimatedCost} / qtl</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-bold text-emerald-700 capitalize">{selectedPin.data.availability}</span>
                    </div>
                  </div>

                  <Link
                    to="/farmer/storage"
                    className="w-full btn-gold py-2.5 text-center text-xs font-bold block"
                  >
                    Explore Warehouse Booking →
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Leaflet Map Container */}
          <div className="flex-1 w-full h-full relative z-10">
            <MapContainer
              center={farmerCoords}
              zoom={7}
              scrollWheelZoom={true}
              style={{ width: '100%', height: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Farmer Home Base Marker */}
              <Marker position={farmerCoords} icon={farmerIcon}>
                <Popup>
                  <div className="text-xs p-1">
                    <strong className="text-sm font-bold block text-emerald-800">
                      🧑‍🌾 Your Base Location
                    </strong>
                    <span>Sangareddy, Telangana</span>
                  </div>
                </Popup>
              </Marker>

              {/* Mandi Markers */}
              {showMandis &&
                markets.map((m) => {
                  const mandiRes = marketResults.find((r) => r.market.id === m.id);
                  return (
                    <Marker
                      key={m.id}
                      position={[m.lat, m.lng]}
                      icon={mandiIcon}
                      eventHandlers={{
                        click: () => setSelectedPin({ type: 'mandi', data: m }),
                      }}
                    >
                      <Popup>
                        <div className="text-xs p-1">
                          <strong className="text-sm font-bold block text-blue-900">
                            🏪 {m.name} Mandi
                          </strong>
                          <span className="text-gray-500 block">{m.district}, {m.state}</span>
                          <span className="font-bold text-emerald-700 block mt-1">
                            {mandiRes ? `Avg ${currentCropObj.name}: ₹${mandiRes.avgBuyerPrice}/qtl` : 'Active Mandi'}
                          </span>
                          <button
                            onClick={() => setSelectedPin({ type: 'mandi', data: m })}
                            className="text-agri-green font-bold underline mt-1 block"
                          >
                            Show full details
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}

              {/* Storage Markers */}
              {showStorage &&
                storageFacilities.map((sf) => (
                  <Marker
                    key={sf.id}
                    position={[sf.lat, sf.lng]}
                    icon={storageIcon}
                    eventHandlers={{
                      click: () => setSelectedPin({ type: 'storage', data: sf }),
                    }}
                  >
                    <Popup>
                      <div className="text-xs p-1">
                        <strong className="text-sm font-bold block text-amber-900">
                          🏬 {sf.name}
                        </strong>
                        <span className="text-gray-500 block">📍 {sf.location}</span>
                        <span className="font-bold text-gray-800 block mt-1">
                          ₹{sf.estimatedCost} / qtl / month
                        </span>
                        <button
                          onClick={() => setSelectedPin({ type: 'storage', data: sf })}
                          className="text-agri-green font-bold underline mt-1 block"
                        >
                          Show details
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
            </MapContainer>
          </div>
        </div>
      </main>

      <BottomNav />
      <Footer />
    </div>
  );
}
