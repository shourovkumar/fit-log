export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-white/10 border-t-[#ccff00] rounded-full animate-spin"></div>
      <p className="text-gray-400 text-sm mt-4">Loading workouts…</p>
    </div>
  );
}
