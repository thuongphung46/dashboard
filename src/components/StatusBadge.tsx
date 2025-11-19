import { Badge } from './ui/badge';

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'expired' | 'trial' | 'pending' | 'completed' | 'failed' | 'success' | 'warning' | 'error';
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const variants = {
    active: 'bg-green-100 text-green-700 border-green-200',
    inactive: 'bg-gray-100 text-gray-700 border-gray-200',
    expired: 'bg-red-100 text-red-700 border-red-200',
    trial: 'bg-blue-100 text-blue-700 border-blue-200',
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    completed: 'bg-green-100 text-green-700 border-green-200',
    failed: 'bg-red-100 text-red-700 border-red-200',
    success: 'bg-green-100 text-green-700 border-green-200',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    error: 'bg-red-100 text-red-700 border-red-200',
  };

  const displayLabel = label || status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <Badge variant="outline" className={`${variants[status]} border`}>
      {displayLabel}
    </Badge>
  );
}
