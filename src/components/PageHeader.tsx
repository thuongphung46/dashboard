import { ReactNode } from 'react';
import { Button } from './ui/button';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
  };
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-gray-900">{title}</h1>
        {description && (
          <p className="text-gray-600 mt-1">{description}</p>
        )}
      </div>
      {action && (
        <Button onClick={action.onClick} className="bg-blue-600 hover:bg-blue-700">
          {action.icon}
          {action.label}
        </Button>
      )}
    </div>
  );
}
