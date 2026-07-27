import { Card } from '../../../components/ui/Card';

export function ResultsCard({ title, value, subtitle }) {
  return (
    <Card className="p-4 bg-black/40 border-white/5 text-center flex flex-col justify-center">
      <div className="text-gray-400 text-sm mb-1">{title}</div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      {subtitle && <div className="text-xs text-orange-500">{subtitle}</div>}
    </Card>
  );
}
