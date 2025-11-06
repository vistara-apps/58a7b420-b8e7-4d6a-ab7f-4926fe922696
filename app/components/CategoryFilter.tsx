'use client';

import { Package, Shirt, Droplet, UtensilsCrossed, Smartphone, MoreHorizontal } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All', icon: Package },
  { id: 'jacket', label: 'Jackets', icon: Shirt },
  { id: 'water_bottle', label: 'Bottles', icon: Droplet },
  { id: 'lunch_box', label: 'Lunch', icon: UtensilsCrossed },
  { id: 'electronics', label: 'Tech', icon: Smartphone },
  { id: 'other', label: 'Other', icon: MoreHorizontal },
];

interface CategoryFilterProps {
  selected: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 px-4 py-3 min-w-max">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selected === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onChange(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-primary text-white shadow-button'
                  : 'bg-surface text-muted hover:bg-bg hover:text-fg border border-border'
              }`}
            >
              <Icon className="w-4 h-4" />
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
