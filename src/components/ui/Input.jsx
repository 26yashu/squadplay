export function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-input px-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-theme-accent focus:border-transparent transition-all duration-300 shadow-inner ${className}`}
      {...props}
    />
  );
}
