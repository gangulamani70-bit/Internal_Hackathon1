import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { buyerPrices as initialBuyerPrices, notifications as initialNotifications, BuyerPrice, Notification } from '../data/mockData';

/* ───────── Types ───────── */
export type UserRole = 'farmer' | 'buyer' | null;
export type CropType = 'short-term' | 'long-term' | null;

export interface FarmerProfile {
  name: string;
  phone: string;
  state: string;
  district: string;
  village: string;
  location: string;
  language: string;
}

export interface BuyerProfile {
  businessName: string;
  phone: string;
  state: string;
  district: string;
  city: string;
  location: string;
  buyerType: string;
  language: string;
}

export interface AppState {
  isAuthenticated: boolean;
  phone: string;
  language: string;
  role: UserRole;
  farmerProfile: FarmerProfile | null;
  buyerProfile: BuyerProfile | null;
  selectedCrop: string;
  selectedLocation: string;
  cropType: CropType;
  quantity: number;
  savedMarkets: string[];
  demoMode: boolean;
  buyerPrices: BuyerPrice[];
  notifications: Notification[];
}

const initialState: AppState = {
  isAuthenticated: false,
  phone: '',
  language: 'en',
  role: null,
  farmerProfile: null,
  buyerProfile: null,
  selectedCrop: 'tomato',
  selectedLocation: 'Sangareddy',
  cropType: 'short-term',
  quantity: 50,
  savedMarkets: ['sangareddy', 'zaheerabad'],
  demoMode: false,
  buyerPrices: initialBuyerPrices,
  notifications: initialNotifications,
};

/* ───────── Actions ───────── */
type Action =
  | { type: 'LOGIN'; phone: string }
  | { type: 'LOGOUT' }
  | { type: 'SET_LANGUAGE'; language: string }
  | { type: 'SET_ROLE'; role: UserRole }
  | { type: 'SET_FARMER_PROFILE'; profile: FarmerProfile }
  | { type: 'SET_BUYER_PROFILE'; profile: BuyerProfile }
  | { type: 'SET_CROP'; crop: string }
  | { type: 'SET_LOCATION'; location: string }
  | { type: 'SET_CROP_TYPE'; cropType: CropType }
  | { type: 'SET_QUANTITY'; quantity: number }
  | { type: 'TOGGLE_SAVED_MARKET'; market: string }
  | { type: 'TOGGLE_DEMO_MODE' }
  | { type: 'DEMO_LOGIN' }
  | { type: 'DEMO_BUYER_LOGIN' }
  | { type: 'ADD_BUYER_PRICE'; price: BuyerPrice }
  | { type: 'UPDATE_BUYER_PRICE'; id: string; updates: Partial<BuyerPrice> }
  | { type: 'DELETE_BUYER_PRICE'; id: string }
  | { type: 'MARK_NOTIFICATION_READ'; id: string }
  | { type: 'CLEAR_NOTIFICATIONS' };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true, phone: action.phone };
    case 'LOGOUT':
      return { ...initialState };
    case 'SET_LANGUAGE':
      return { ...state, language: action.language };
    case 'SET_ROLE':
      return { ...state, role: action.role };
    case 'SET_FARMER_PROFILE':
      return { ...state, farmerProfile: action.profile, selectedLocation: action.profile.location || state.selectedLocation };
    case 'SET_BUYER_PROFILE':
      return { ...state, buyerProfile: action.profile, selectedLocation: action.profile.location || state.selectedLocation };
    case 'SET_CROP':
      return { ...state, selectedCrop: action.crop };
    case 'SET_LOCATION':
      return { ...state, selectedLocation: action.location };
    case 'SET_CROP_TYPE':
      return { ...state, cropType: action.cropType };
    case 'SET_QUANTITY':
      return { ...state, quantity: Math.max(1, action.quantity) };
    case 'TOGGLE_SAVED_MARKET': {
      const exists = state.savedMarkets.includes(action.market);
      return {
        ...state,
        savedMarkets: exists
          ? state.savedMarkets.filter((m) => m !== action.market)
          : [...state.savedMarkets, action.market],
      };
    }
    case 'TOGGLE_DEMO_MODE':
      return { ...state, demoMode: !state.demoMode };
    case 'DEMO_LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        phone: '9876543210',
        language: 'en',
        role: 'farmer',
        selectedLocation: 'Sangareddy',
        selectedCrop: 'tomato',
        cropType: 'short-term',
        quantity: 50,
        savedMarkets: ['sangareddy', 'zaheerabad'],
        farmerProfile: {
          name: 'Ravi Kumar',
          phone: '9876543210',
          state: 'Telangana',
          district: 'Sangareddy',
          village: 'Kandi Village',
          location: 'Sangareddy',
          language: 'en',
        },
        demoMode: true,
      };
    case 'DEMO_BUYER_LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        phone: '9812345678',
        language: 'en',
        role: 'buyer',
        selectedLocation: 'Zaheerabad',
        selectedCrop: 'tomato',
        cropType: 'short-term',
        quantity: 150,
        buyerProfile: {
          businessName: 'Zaheerabad Fresh Agro Trading Co.',
          phone: '9812345678',
          state: 'Telangana',
          district: 'Sangareddy',
          city: 'Zaheerabad',
          location: 'Zaheerabad',
          buyerType: 'Wholesaler / Processor',
          language: 'en',
        },
        demoMode: true,
      };
    case 'ADD_BUYER_PRICE':
      return {
        ...state,
        buyerPrices: [action.price, ...state.buyerPrices],
        notifications: [
          {
            id: 'n-' + Date.now(),
            message: `New requirement published for ${action.price.cropId.toUpperCase()} at ₹${action.price.price}/qtl in ${action.price.marketId}.`,
            time: 'Just now',
            read: false,
          },
          ...state.notifications,
        ],
      };
    case 'UPDATE_BUYER_PRICE':
      return {
        ...state,
        buyerPrices: state.buyerPrices.map((bp) =>
          bp.id === action.id ? { ...bp, ...action.updates } : bp
        ),
      };
    case 'DELETE_BUYER_PRICE':
      return {
        ...state,
        buyerPrices: state.buyerPrices.filter((bp) => bp.id !== action.id),
      };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.id ? { ...n, read: true } : n
        ),
      };
    case 'CLEAR_NOTIFICATIONS':
      return {
        ...state,
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      };
    default:
      return state;
  }
}

/* ───────── Context ───────── */
interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
