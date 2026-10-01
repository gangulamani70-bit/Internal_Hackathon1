import { useApp } from '../context/AppContext';

export default function DemoBanner() {
  const { dispatch } = useApp();
  return (
    <div className="bg-amber-400 text-amber-900 text-center py-2 px-4 text-sm font-semibold sticky top-0 z-50 flex items-center justify-center gap-3">
      <span>⚠️ Demo Mode — All data shown is prototype/demo data for SIH 2026 presentation.</span>
      <button
        onClick={() => dispatch({ type: 'TOGGLE_DEMO_MODE' })}
        className="underline hover:no-underline text-xs"
      >
        Exit Demo
      </button>
    </div>
  );
}
