/* ────────────────────────────────────────────
   Demo / Prototype Data for SIH 2026
   IMPORTANT: This is mock data for demonstration
   purposes only. Not real-time government data.
   ──────────────────────────────────────────── */

export interface Market {
  id: string;
  name: string;
  district: string;
  state: string;
  lat: number;
  lng: number;
}

export interface BuyerPrice {
  id: string;
  buyerName: string;
  buyerType: string;
  cropId: string;
  marketId: string;
  price: number;
  quantity: number;
  quality: string;
  publishedAt: string;
  validUntil: string;
  status: 'verified' | 'buyer-published' | 'demo' | 'expired';
}

export interface Crop {
  id: string;
  name: string;
  icon: string;
  category: string;
}

export interface StorageFacility {
  id: string;
  name: string;
  location: string;
  district: string;
  lat: number;
  lng: number;
  cropSupported: string[];
  capacity: number;
  availability: 'available' | 'limited' | 'unavailable';
  estimatedCost: number;
}

export interface MarketResult {
  market: Market;
  distance: number;
  avgBuyerPrice: number;
  estTravelExpense: number;
  buyerCount: number;
  lastUpdated: string;
  storageAvailability: 'available' | 'limited' | 'unavailable';
}

export interface PriceHistory {
  date: string;
  min: number;
  max: number;
  avg: number;
}

export interface Notification {
  id: string;
  message: string;
  time: string;
  read: boolean;
}

/* ───── Crops ───── */
export const crops: Crop[] = [
  { id: 'tomato', name: 'Tomato', icon: '🍅', category: 'Vegetable' },
  { id: 'paddy', name: 'Paddy', icon: '🌾', category: 'Cereal' },
  { id: 'cotton', name: 'Cotton', icon: '🏵️', category: 'Cash Crop' },
  { id: 'maize', name: 'Maize', icon: '🌽', category: 'Cereal' },
  { id: 'onion', name: 'Onion', icon: '🧅', category: 'Vegetable' },
  { id: 'chilli', name: 'Chilli', icon: '🌶️', category: 'Spice' },
  { id: 'wheat', name: 'Wheat', icon: '🌿', category: 'Cereal' },
  { id: 'groundnut', name: 'Groundnut', icon: '🥜', category: 'Oilseed' },
  { id: 'soybean', name: 'Soybean', icon: '🫘', category: 'Oilseed' },
  { id: 'turmeric', name: 'Turmeric', icon: '🟡', category: 'Spice' },
  { id: 'sugarcane', name: 'Sugarcane', icon: '🎋', category: 'Cash Crop' },
];

/* ───── Markets ───── */
export const markets: Market[] = [
  { id: 'sangareddy', name: 'Sangareddy', district: 'Sangareddy', state: 'Telangana', lat: 17.6166, lng: 78.0862 },
  { id: 'hyderabad', name: 'Hyderabad', district: 'Hyderabad', state: 'Telangana', lat: 17.385, lng: 78.4867 },
  { id: 'zaheerabad', name: 'Zaheerabad', district: 'Sangareddy', state: 'Telangana', lat: 17.6814, lng: 77.6073 },
  { id: 'pune', name: 'Pune', district: 'Pune', state: 'Maharashtra', lat: 18.5204, lng: 73.8567 },
  { id: 'vijayawada', name: 'Vijayawada', district: 'Krishna', state: 'Andhra Pradesh', lat: 16.5062, lng: 80.6480 },
  { id: 'nagpur', name: 'Nagpur', district: 'Nagpur', state: 'Maharashtra', lat: 21.1458, lng: 79.0882 },
  { id: 'nashik', name: 'Nashik', district: 'Nashik', state: 'Maharashtra', lat: 19.9975, lng: 73.7898 },
  { id: 'warangal', name: 'Warangal', district: 'Warangal', state: 'Telangana', lat: 17.9784, lng: 79.5941 },
];

/* ───── Buyer Prices ───── */
export const buyerPrices: BuyerPrice[] = [
  // Sangareddy - Tomato
  { id: 'bp1', buyerName: 'Sri Lakshmi Traders', buyerType: 'Trader', cropId: 'tomato', marketId: 'sangareddy', price: 2200, quantity: 80, quality: 'Grade A', publishedAt: '2026-09-26T08:00:00', validUntil: '2026-09-28', status: 'buyer-published' },
  { id: 'bp2', buyerName: 'Raju Wholesale', buyerType: 'Wholesaler', cropId: 'tomato', marketId: 'sangareddy', price: 2150, quantity: 200, quality: 'Grade A/B', publishedAt: '2026-09-26T07:30:00', validUntil: '2026-09-28', status: 'buyer-published' },
  // Hyderabad - Tomato
  { id: 'bp3', buyerName: 'Fresh Mart Pvt Ltd', buyerType: 'Retailer', cropId: 'tomato', marketId: 'hyderabad', price: 2600, quantity: 150, quality: 'Grade A', publishedAt: '2026-09-26T09:00:00', validUntil: '2026-09-29', status: 'verified' },
  { id: 'bp4', buyerName: 'Deccan Agro Processors', buyerType: 'Processor', cropId: 'tomato', marketId: 'hyderabad', price: 2550, quantity: 500, quality: 'Grade A/B', publishedAt: '2026-09-25T16:00:00', validUntil: '2026-09-28', status: 'verified' },
  { id: 'bp5', buyerName: 'Hyderabad Vegetables Hub', buyerType: 'Wholesaler', cropId: 'tomato', marketId: 'hyderabad', price: 2480, quantity: 300, quality: 'Grade B', publishedAt: '2026-09-25T14:00:00', validUntil: '2026-09-27', status: 'buyer-published' },
  // Zaheerabad - Tomato
  { id: 'bp6', buyerName: 'Zaheerabad Fresh Foods', buyerType: 'Trader', cropId: 'tomato', marketId: 'zaheerabad', price: 2750, quantity: 100, quality: 'Grade A', publishedAt: '2026-09-26T10:30:00', validUntil: '2026-09-29', status: 'verified' },
  { id: 'bp7', buyerName: 'Raj Agro Trading', buyerType: 'Trader', cropId: 'tomato', marketId: 'zaheerabad', price: 2680, quantity: 75, quality: 'Grade A/B', publishedAt: '2026-09-26T09:00:00', validUntil: '2026-09-28', status: 'buyer-published' },
  { id: 'bp8', buyerName: 'Green Valley Exports', buyerType: 'Institutional Buyer', cropId: 'tomato', marketId: 'zaheerabad', price: 2720, quantity: 150, quality: 'Grade A', publishedAt: '2026-09-25T11:00:00', validUntil: '2026-09-28', status: 'verified' },
  { id: 'bp9', buyerName: 'Kisan Mandi Corp', buyerType: 'Wholesaler', cropId: 'tomato', marketId: 'zaheerabad', price: 2650, quantity: 200, quality: 'Grade B', publishedAt: '2026-09-25T10:00:00', validUntil: '2026-09-27', status: 'buyer-published' },
  // Pune - Tomato
  { id: 'bp10', buyerName: 'Maharashtra Agri Corp', buyerType: 'Institutional Buyer', cropId: 'tomato', marketId: 'pune', price: 3100, quantity: 500, quality: 'Grade A', publishedAt: '2026-09-26T06:00:00', validUntil: '2026-09-30', status: 'verified' },
  { id: 'bp11', buyerName: 'Pune Fresh Market', buyerType: 'Retailer', cropId: 'tomato', marketId: 'pune', price: 3050, quantity: 100, quality: 'Grade A', publishedAt: '2026-09-25T15:00:00', validUntil: '2026-09-29', status: 'buyer-published' },
  // Paddy buyers
  { id: 'bp12', buyerName: 'Telangana Rice Mills', buyerType: 'Processor', cropId: 'paddy', marketId: 'sangareddy', price: 2300, quantity: 1000, quality: 'Grade A', publishedAt: '2026-09-26T08:00:00', validUntil: '2026-10-05', status: 'verified' },
  { id: 'bp13', buyerName: 'Hyderabad Grain Market', buyerType: 'Wholesaler', cropId: 'paddy', marketId: 'hyderabad', price: 2450, quantity: 2000, quality: 'Grade A/B', publishedAt: '2026-09-25T12:00:00', validUntil: '2026-10-05', status: 'verified' },
  { id: 'bp13b', buyerName: 'Warangal Agro Procure', buyerType: 'Institutional Buyer', cropId: 'paddy', marketId: 'warangal', price: 2380, quantity: 800, quality: 'Grade A', publishedAt: '2026-09-26T09:30:00', validUntil: '2026-10-04', status: 'verified' },
  { id: 'bp13c', buyerName: 'Krishna Delta Millers', buyerType: 'Processor', cropId: 'paddy', marketId: 'vijayawada', price: 2420, quantity: 1500, quality: 'Grade A', publishedAt: '2026-09-25T14:00:00', validUntil: '2026-10-03', status: 'buyer-published' },
  // Cotton buyers
  { id: 'bp14', buyerName: 'Maharashtra Cotton Fed', buyerType: 'Institutional Buyer', cropId: 'cotton', marketId: 'nagpur', price: 7100, quantity: 500, quality: 'Grade A', publishedAt: '2026-09-26T07:00:00', validUntil: '2026-10-10', status: 'verified' },
  { id: 'bp15', buyerName: 'Nashik Textile Traders', buyerType: 'Processor', cropId: 'cotton', marketId: 'nashik', price: 7250, quantity: 300, quality: 'Grade A', publishedAt: '2026-09-25T09:00:00', validUntil: '2026-10-05', status: 'buyer-published' },
  { id: 'bp15b', buyerName: 'Warangal Cotton Yarn Co', buyerType: 'Processor', cropId: 'cotton', marketId: 'warangal', price: 7150, quantity: 400, quality: 'Grade A/B', publishedAt: '2026-09-26T08:30:00', validUntil: '2026-10-08', status: 'verified' },
  { id: 'bp15c', buyerName: 'Sangareddy Ginning Mills', buyerType: 'Trader', cropId: 'cotton', marketId: 'sangareddy', price: 6980, quantity: 250, quality: 'Grade B', publishedAt: '2026-09-26T10:00:00', validUntil: '2026-10-04', status: 'buyer-published' },
  // Onion buyers
  { id: 'bp16', buyerName: 'Nashik Onion Traders', buyerType: 'Trader', cropId: 'onion', marketId: 'nashik', price: 1800, quantity: 200, quality: 'Grade A', publishedAt: '2026-09-26T10:00:00', validUntil: '2026-09-29', status: 'verified' },
  { id: 'bp17', buyerName: 'Pune Vegetable Mkt', buyerType: 'Wholesaler', cropId: 'onion', marketId: 'pune', price: 1950, quantity: 500, quality: 'Grade A/B', publishedAt: '2026-09-26T08:00:00', validUntil: '2026-09-30', status: 'buyer-published' },
  { id: 'bp17b', buyerName: 'Deccan Onion Wholesale', buyerType: 'Wholesaler', cropId: 'onion', marketId: 'hyderabad', price: 1880, quantity: 350, quality: 'Grade A', publishedAt: '2026-09-26T07:45:00', validUntil: '2026-09-29', status: 'verified' },
  { id: 'bp17c', buyerName: 'Sangareddy Kisan Sabha', buyerType: 'Trader', cropId: 'onion', marketId: 'sangareddy', price: 1720, quantity: 150, quality: 'Grade B', publishedAt: '2026-09-25T16:00:00', validUntil: '2026-09-28', status: 'buyer-published' },
  // Maize buyers
  { id: 'bp18', buyerName: 'Sangareddy Poultry Feeds', buyerType: 'Processor', cropId: 'maize', marketId: 'sangareddy', price: 1980, quantity: 400, quality: 'Grade A', publishedAt: '2026-09-26T08:30:00', validUntil: '2026-10-02', status: 'verified' },
  { id: 'bp19', buyerName: 'Warangal Feeds & Starch', buyerType: 'Processor', cropId: 'maize', marketId: 'warangal', price: 2050, quantity: 600, quality: 'Grade A', publishedAt: '2026-09-26T09:00:00', validUntil: '2026-10-05', status: 'verified' },
  { id: 'bp20', buyerName: 'Hyderabad Animal Nutrition', buyerType: 'Wholesaler', cropId: 'maize', marketId: 'hyderabad', price: 2100, quantity: 800, quality: 'Grade A/B', publishedAt: '2026-09-25T15:00:00', validUntil: '2026-10-04', status: 'buyer-published' },
  { id: 'bp21', buyerName: 'Zaheerabad Grain Traders', buyerType: 'Trader', cropId: 'maize', marketId: 'zaheerabad', price: 1950, quantity: 300, quality: 'Grade B', publishedAt: '2026-09-26T07:00:00', validUntil: '2026-09-30', status: 'buyer-published' },
  // Chilli buyers
  { id: 'bp22', buyerName: 'Warangal Red Spice Exporters', buyerType: 'Institutional Buyer', cropId: 'chilli', marketId: 'warangal', price: 9200, quantity: 150, quality: 'Teja Supreme', publishedAt: '2026-09-26T09:30:00', validUntil: '2026-10-08', status: 'verified' },
  { id: 'bp23', buyerName: 'Guntur-Vijayawada Spices Co', buyerType: 'Trader', cropId: 'chilli', marketId: 'vijayawada', price: 9400, quantity: 250, quality: 'Grade A (334)', publishedAt: '2026-09-26T08:00:00', validUntil: '2026-10-06', status: 'verified' },
  { id: 'bp24', buyerName: 'Hyderabad Spice Hub', buyerType: 'Wholesaler', cropId: 'chilli', marketId: 'hyderabad', price: 8900, quantity: 180, quality: 'Grade A/B', publishedAt: '2026-09-25T11:00:00', validUntil: '2026-10-02', status: 'buyer-published' },
  { id: 'bp25', buyerName: 'Sangareddy Local Spices', buyerType: 'Trader', cropId: 'chilli', marketId: 'sangareddy', price: 8400, quantity: 80, quality: 'Grade B', publishedAt: '2026-09-26T10:00:00', validUntil: '2026-09-29', status: 'buyer-published' },
  // Wheat buyers
  { id: 'bp26', buyerName: 'Sangareddy Roller Flour Mills', buyerType: 'Processor', cropId: 'wheat', marketId: 'sangareddy', price: 2320, quantity: 500, quality: 'Sharbati A', publishedAt: '2026-09-26T08:00:00', validUntil: '2026-10-05', status: 'verified' },
  { id: 'bp27', buyerName: 'Hyderabad Food Products Ltd', buyerType: 'Processor', cropId: 'wheat', marketId: 'hyderabad', price: 2420, quantity: 1200, quality: 'Lokwan Grade A', publishedAt: '2026-09-26T09:15:00', validUntil: '2026-10-08', status: 'verified' },
  { id: 'bp28', buyerName: 'Pune Bakeries Association', buyerType: 'Institutional Buyer', cropId: 'wheat', marketId: 'pune', price: 2480, quantity: 800, quality: 'Grade A', publishedAt: '2026-09-25T16:30:00', validUntil: '2026-10-06', status: 'verified' },
  { id: 'bp29', buyerName: 'Zaheerabad Flour Hub', buyerType: 'Wholesaler', cropId: 'wheat', marketId: 'zaheerabad', price: 2350, quantity: 300, quality: 'Grade A/B', publishedAt: '2026-09-26T07:30:00', validUntil: '2026-10-01', status: 'buyer-published' },
  // Groundnut buyers
  { id: 'bp30', buyerName: 'Sangareddy Oil Expellers', buyerType: 'Processor', cropId: 'groundnut', marketId: 'sangareddy', price: 5500, quantity: 200, quality: 'Bold Grade A', publishedAt: '2026-09-26T08:45:00', validUntil: '2026-10-04', status: 'verified' },
  { id: 'bp31', buyerName: 'Zaheerabad Agro Seeds', buyerType: 'Trader', cropId: 'groundnut', marketId: 'zaheerabad', price: 5650, quantity: 150, quality: 'Grade A', publishedAt: '2026-09-26T09:30:00', validUntil: '2026-10-03', status: 'buyer-published' },
  { id: 'bp32', buyerName: 'Hyderabad Edible Oils', buyerType: 'Processor', cropId: 'groundnut', marketId: 'hyderabad', price: 5800, quantity: 600, quality: 'Grade A', publishedAt: '2026-09-25T14:00:00', validUntil: '2026-10-06', status: 'verified' },
  { id: 'bp33', buyerName: 'Vijayawada Seed Corporation', buyerType: 'Institutional Buyer', cropId: 'groundnut', marketId: 'vijayawada', price: 5750, quantity: 400, quality: 'Grade A/B', publishedAt: '2026-09-26T10:00:00', validUntil: '2026-10-05', status: 'verified' },
  // Soybean buyers
  { id: 'bp34', buyerName: 'Nagpur Soya Extraction Corp', buyerType: 'Processor', cropId: 'soybean', marketId: 'nagpur', price: 4950, quantity: 1000, quality: 'Yellow Grade A', publishedAt: '2026-09-26T08:00:00', validUntil: '2026-10-09', status: 'verified' },
  { id: 'bp35', buyerName: 'Nashik Agro Solvents', buyerType: 'Processor', cropId: 'soybean', marketId: 'nashik', price: 4880, quantity: 800, quality: 'Grade A', publishedAt: '2026-09-26T09:00:00', validUntil: '2026-10-07', status: 'verified' },
  { id: 'bp36', buyerName: 'Sangareddy Bio Feeds', buyerType: 'Trader', cropId: 'soybean', marketId: 'sangareddy', price: 4620, quantity: 300, quality: 'Grade A/B', publishedAt: '2026-09-25T13:00:00', validUntil: '2026-10-02', status: 'buyer-published' },
  { id: 'bp37', buyerName: 'Pune Animal Nutrition Ltd', buyerType: 'Wholesaler', cropId: 'soybean', marketId: 'pune', price: 4920, quantity: 500, quality: 'Grade A', publishedAt: '2026-09-26T07:15:00', validUntil: '2026-10-05', status: 'verified' },
  // Turmeric buyers
  { id: 'bp38', buyerName: 'Warangal Spices & Curcumin', buyerType: 'Institutional Buyer', cropId: 'turmeric', marketId: 'warangal', price: 8300, quantity: 200, quality: 'Finger Double Polish', publishedAt: '2026-09-26T08:30:00', validUntil: '2026-10-12', status: 'verified' },
  { id: 'bp39', buyerName: 'Sangareddy Herbal Mart', buyerType: 'Trader', cropId: 'turmeric', marketId: 'sangareddy', price: 7900, quantity: 100, quality: 'Finger Grade A', publishedAt: '2026-09-26T09:45:00', validUntil: '2026-10-05', status: 'buyer-published' },
  { id: 'bp40', buyerName: 'Hyderabad Ayurvedic Herbs', buyerType: 'Processor', cropId: 'turmeric', marketId: 'hyderabad', price: 8450, quantity: 350, quality: 'Grade A Supreme', publishedAt: '2026-09-25T15:30:00', validUntil: '2026-10-10', status: 'verified' },
  { id: 'bp41', buyerName: 'Pune Masala Mahasangh', buyerType: 'Wholesaler', cropId: 'turmeric', marketId: 'pune', price: 8600, quantity: 400, quality: 'Grade A', publishedAt: '2026-09-26T07:45:00', validUntil: '2026-10-08', status: 'verified' },
  // Sugarcane buyers
  { id: 'bp42', buyerName: 'Pune Sahakari Sakhar Karkhana', buyerType: 'Processor', cropId: 'sugarcane', marketId: 'pune', price: 3400, quantity: 2500, quality: 'High Recovery Co-86032', publishedAt: '2026-09-26T08:00:00', validUntil: '2026-10-15', status: 'verified' },
  { id: 'bp43', buyerName: 'Nashik Agro Biofuels Ltd', buyerType: 'Processor', cropId: 'sugarcane', marketId: 'nashik', price: 3350, quantity: 2000, quality: 'Grade A', publishedAt: '2026-09-26T09:00:00', validUntil: '2026-10-12', status: 'verified' },
  { id: 'bp44', buyerName: 'Zaheerabad Sugar Industries', buyerType: 'Processor', cropId: 'sugarcane', marketId: 'zaheerabad', price: 3250, quantity: 1800, quality: 'Standard Mill Cane', publishedAt: '2026-09-25T14:00:00', validUntil: '2026-10-10', status: 'verified' },
  { id: 'bp45', buyerName: 'Sangareddy Cane Procurement Co', buyerType: 'Trader', cropId: 'sugarcane', marketId: 'sangareddy', price: 3180, quantity: 1000, quality: 'Standard Grade', publishedAt: '2026-09-26T07:30:00', validUntil: '2026-10-06', status: 'buyer-published' },
];

/* ───── Storage Facilities ───── */
export const storageFacilities: StorageFacility[] = [
  { id: 'sf1', name: 'Sangareddy Cold Storage', location: 'Sangareddy', district: 'Sangareddy', lat: 17.62, lng: 78.09, cropSupported: ['tomato', 'onion', 'chilli'], capacity: 500, availability: 'available', estimatedCost: 150 },
  { id: 'sf2', name: 'Telangana Warehousing Corp', location: 'Sangareddy', district: 'Sangareddy', lat: 17.61, lng: 78.08, cropSupported: ['paddy', 'wheat', 'maize', 'soybean'], capacity: 2000, availability: 'available', estimatedCost: 80 },
  { id: 'sf3', name: 'Hyderabad Central Warehouse', location: 'Hyderabad', district: 'Hyderabad', lat: 17.39, lng: 78.49, cropSupported: ['paddy', 'wheat', 'cotton', 'groundnut', 'soybean', 'turmeric'], capacity: 5000, availability: 'available', estimatedCost: 120 },
  { id: 'sf4', name: 'Pune Agri Storage', location: 'Pune', district: 'Pune', lat: 18.52, lng: 73.86, cropSupported: ['onion', 'tomato', 'groundnut', 'soybean'], capacity: 3000, availability: 'limited', estimatedCost: 200 },
  { id: 'sf5', name: 'Zaheerabad Grain Godown', location: 'Zaheerabad', district: 'Sangareddy', lat: 17.68, lng: 77.61, cropSupported: ['paddy', 'wheat', 'maize'], capacity: 1000, availability: 'available', estimatedCost: 70 },
];

/* ───── Helper: Distance from Sangareddy (demo baseline) ───── */
const distanceFromSangareddy: Record<string, number> = {
  sangareddy: 15,
  hyderabad: 55,
  zaheerabad: 70,
  pune: 500,
  vijayawada: 280,
  nagpur: 520,
  nashik: 560,
  warangal: 160,
};

const COST_PER_KM = 25;

export function getDistance(marketId: string): number {
  return distanceFromSangareddy[marketId] ?? 100;
}

export function getEstTravelExpense(marketId: string): number {
  return getDistance(marketId) * COST_PER_KM;
}

/* ───── Market Results for a crop ───── */
export function getMarketResults(cropId: string, customBuyerPrices?: BuyerPrice[]): MarketResult[] {
  const source = customBuyerPrices && customBuyerPrices.length > 0 ? customBuyerPrices : buyerPrices;
  const normalizedCropId = (cropId || 'tomato').toLowerCase();
  const cropBuyers = source.filter((bp) => bp.cropId.toLowerCase() === normalizedCropId);
  const marketIds = [...new Set(cropBuyers.map((bp) => bp.marketId))];

  return marketIds
    .map((mId) => {
      const market = markets.find((m) => m.id === mId) || {
        id: mId,
        name: mId.charAt(0).toUpperCase() + mId.slice(1),
        district: mId.charAt(0).toUpperCase() + mId.slice(1),
        state: 'Telangana',
        lat: 17.5,
        lng: 78.2,
      };
      const marketBuyers = cropBuyers.filter((bp) => bp.marketId === mId);
      const avgPrice = Math.round(
        marketBuyers.reduce((s, b) => s + b.price, 0) / marketBuyers.length
      );
      const dist = getDistance(mId);
      const storage = storageFacilities.find(
        (sf) => sf.location.toLowerCase() === market.name.toLowerCase() && sf.cropSupported.includes(normalizedCropId)
      );
      return {
        market,
        distance: dist,
        avgBuyerPrice: avgPrice,
        estTravelExpense: dist * COST_PER_KM,
        buyerCount: marketBuyers.length,
        lastUpdated: marketBuyers
          .map((b) => b.publishedAt)
          .sort()
          .reverse()[0] || 'Recently',
        storageAvailability: storage?.availability ?? ('unavailable' as const),
      };
    })
    .sort((a, b) => a.distance - b.distance);
}

/* ───── Price History (generated demo) ───── */
export function getPriceHistory(cropId: string, _marketId: string): PriceHistory[] {
  const basePrices: Record<string, number> = {
    tomato: 2400, paddy: 2200, cotton: 7000, maize: 1900, onion: 1700,
    chilli: 8500, wheat: 2300, groundnut: 5500, soybean: 4200, turmeric: 7800, sugarcane: 3100,
  };
  const base = basePrices[cropId] ?? 2000;
  const history: PriceHistory[] = [];
  const now = new Date('2026-09-26');

  for (let i = 30; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const variation = Math.sin(i * 0.5) * base * 0.08;
    const min = Math.round(base - Math.abs(variation) - 100 + Math.random() * 50);
    const max = Math.round(base + Math.abs(variation) + 100 + Math.random() * 50);
    const avg = Math.round((min + max) / 2);
    history.push({
      date: d.toISOString().split('T')[0],
      min,
      max,
      avg,
    });
  }
  return history;
}

/* ───── Notifications ───── */
export const notifications: Notification[] = [
  { id: 'n1', message: 'A buyer updated the price for Tomato in Zaheerabad.', time: '10 min ago', read: false },
  { id: 'n2', message: 'New buyer price available in Hyderabad for Paddy.', time: '1 hour ago', read: false },
  { id: 'n3', message: 'Storage information updated near Sangareddy.', time: '2 hours ago', read: true },
  { id: 'n4', message: 'A price you viewed for Tomato was updated.', time: '5 hours ago', read: true },
  { id: 'n5', message: 'New buyer for Cotton registered in Nagpur.', time: 'Yesterday', read: true },
];

/* ───── Location Lists ───── */
export const states = ['Telangana', 'Maharashtra', 'Andhra Pradesh', 'Karnataka', 'Tamil Nadu'];
export const districts: Record<string, string[]> = {
  Telangana: ['Sangareddy', 'Hyderabad', 'Warangal', 'Medak', 'Nizamabad'],
  Maharashtra: ['Pune', 'Nagpur', 'Nashik', 'Mumbai', 'Aurangabad'],
  'Andhra Pradesh': ['Krishna', 'Guntur', 'East Godavari', 'Kurnool'],
  Karnataka: ['Bangalore', 'Mysore', 'Dharwad', 'Belgaum'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
};
