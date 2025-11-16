import { LucideIcon } from 'lucide-react';

interface CarSummaryCardProps {
  title: string;
  count: number;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  onClick?: () => void;
}

export default function CarSummaryCard({
  title,
  count,
  description,
  icon: Icon,
  iconColor,
  iconBgColor,
  onClick,
}: CarSummaryCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${
        onClick ? 'cursor-pointer hover:ring-2 hover:ring-blue-500' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className={`p-2 rounded-lg ${iconBgColor}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
      </div>
      <div className="mt-2">
        <p className="text-3xl font-bold text-gray-900">{count}</p>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
      {onClick && (
        <p className="text-xs text-blue-600 mt-3">Click to view details</p>
      )}
    </div>
  );
}
