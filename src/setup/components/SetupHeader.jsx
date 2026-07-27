export function SetupHeader({ title, icon: Icon, onBack }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <button onClick={onBack} className="text-white hover:text-gray-300 transition-colors p-2 -ml-2" aria-label="Go Back">
        &larr; Back
      </button>
      <div className="flex items-center gap-2">
        {Icon && <Icon size={20} className="text-gray-400" />}
        <h2 className="font-bold text-lg">{title} Setup</h2>
      </div>
      <div className="w-12"></div> {/* Spacer for centering */}
    </div>
  );
}
