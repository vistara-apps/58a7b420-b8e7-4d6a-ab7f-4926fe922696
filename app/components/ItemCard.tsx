'use client';

import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface Item {
  id: string;
  imageUrl: string;
  category: string;
  tags: string[];
  description: string;
  status: 'available' | 'claimed' | 'pending';
  uploadedAt: Date;
  expiresAt: Date;
  claimedAt?: Date;
}

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  const daysUntilExpiry = Math.ceil((item.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const isExpiringSoon = daysUntilExpiry <= 30;
  const isClaimed = item.status === 'claimed';

  const statusConfig = {
    available: { bg: 'bg-success', text: 'Available', icon: null },
    claimed: { bg: 'bg-muted', text: 'Claimed', icon: CheckCircle2 },
    pending: { bg: 'bg-warning', text: 'Pending', icon: Clock },
  };

  const status = statusConfig[item.status];
  const StatusIcon = status.icon;

  return (
    <div 
      className={`bg-surface rounded-lg overflow-hidden border border-border hover:shadow-card-hover transition-all duration-200 cursor-pointer ${
        isClaimed ? 'opacity-75' : ''
      } ${isExpiringSoon && !isClaimed ? 'border-l-4 border-l-warning' : ''}`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.description}
          className={`w-full h-full object-cover ${isClaimed ? 'grayscale' : ''}`}
        />
        
        {/* Status Badge */}
        <div className={`absolute top-2 right-2 ${status.bg} text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1`}>
          {StatusIcon && <StatusIcon className="w-3 h-3" />}
          {status.text}
        </div>

        {/* Expiring Soon Badge */}
        {isExpiringSoon && !isClaimed && (
          <div className="absolute top-2 left-2 bg-warning text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1 animate-pulse">
            <AlertCircle className="w-3 h-3" />
            {daysUntilExpiry}d left
          </div>
        )}

        {/* Claimed Overlay */}
        {isClaimed && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-success" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-fg capitalize">
            {item.category.replace('_', ' ')}
          </h3>
          <span className="text-xs text-muted">
            {new Date(item.uploadedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>

        <p className="text-sm text-muted mb-3 line-clamp-2">{item.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {item.tags.map((tag) => (
            <span 
              key={tag}
              className="px-2 py-1 bg-bg text-xs text-fg rounded-md border border-border"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        {!isClaimed && (
          <button className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary-hover transition-colors shadow-button">
            Claim This Item
          </button>
        )}

        {isClaimed && item.claimedAt && (
          <div className="text-xs text-muted text-center">
            Claimed {new Date(item.claimedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        )}
      </div>
    </div>
  );
}
