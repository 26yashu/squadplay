export function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-indigo transition-all ${className}`}
      {...props}
    />
  );
}
