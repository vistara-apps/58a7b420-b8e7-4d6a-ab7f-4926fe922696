'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { Search, Filter, Plus, Package, Clock, CheckCircle2 } from 'lucide-react';
import ItemCard from './components/ItemCard';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';

// Mock data for demonstration
const mockItems = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=300&fit=crop',
    category: 'jacket',
    tags: ['blue', 'nike', 'zip-up'],
    description: 'Blue Nike jacket found in gym',
    status: 'available' as const,
    uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 88 * 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop',
    category: 'water_bottle',
    tags: ['blue', 'hydroflask', 'stickers'],
    description: 'Blue Hydro Flask with unicorn sticker',
    status: 'available' as const,
    uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 85 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
    category: 'lunch_box',
    tags: ['red', 'spiderman'],
    description: 'Red Spiderman lunch box',
    status: 'claimed' as const,
    uploadedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 80 * 24 * 60 * 60 * 1000),
    claimedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop',
    category: 'sweatshirt',
    tags: ['gray', 'adidas', 'hoodie'],
    description: 'Gray Adidas hoodie',
    status: 'available' as const,
    uploadedAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 55 * 24 * 60 * 60 * 1000),
  },
];

const stats = [
  { label: 'Total Items', value: '47', icon: Package, color: 'text-accent' },
  { label: 'Pending Claims', value: '8', icon: Clock, color: 'text-warning' },
  { label: 'Claimed Today', value: '3', icon: CheckCircle2, color: 'text-success' },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredItems, setFilteredItems] = useState(mockItems);

  // CRITICAL: Call sdk.actions.ready() to prevent infinite loading
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  useEffect(() => {
    let filtered = mockItems;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.tags.some(tag => tag.toLowerCase().includes(query)) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }

    setFilteredItems(filtered);
  }, [searchQuery, selectedCategory]);

  return (
    <main className="min-h-screen bg-bg pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-fg">FoundIt</h1>
              <p className="text-sm text-muted">Center Elementary School</p>
            </div>
            <button 
              className="p-2 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-bg rounded-lg p-3 text-center">
                <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
                <div className="text-xl font-bold text-fg">{stat.value}</div>
                <div className="text-xs text-muted">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by color, brand, or item type..."
          />
        </div>
      </header>

      {/* Category Filter */}
      <div className="sticky top-[180px] z-40 bg-bg border-b border-border">
        <CategoryFilter 
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>

      {/* Items Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-fg">
            {selectedCategory === 'all' ? 'All Items' : selectedCategory.replace('_', ' ')}
            <span className="text-muted ml-2">({filteredItems.length})</span>
          </h2>
          <button className="flex items-center gap-2 text-sm text-accent hover:text-primary-hover transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 mx-auto mb-4 text-muted" />
            <h3 className="text-lg font-semibold text-fg mb-2">No items found</h3>
            <p className="text-muted">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button 
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-modal hover:bg-primary-hover transition-all hover:scale-110 flex items-center justify-center z-50"
        aria-label="Upload new item"
      >
        <Plus className="w-6 h-6" />
      </button>
    </main>
  );
}
