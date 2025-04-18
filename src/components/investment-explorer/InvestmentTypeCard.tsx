
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InvestmentTypeCardProps {
  id: string;
  name: string;
  icon: LucideIcon;
}

const InvestmentTypeCard: React.FC<InvestmentTypeCardProps> = ({ id, name, icon: Icon }) => {
  return (
    <div className="flex items-center">
      <Icon className="h-4 w-4 mr-2 hidden sm:inline-block" />
      <span className="truncate">{name}</span>
    </div>
  );
};

export default InvestmentTypeCard;
