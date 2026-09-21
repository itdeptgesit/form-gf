import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function ItemsSection({ items, onChange, showToast }) {
  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    onChange('items', updated);
  };

  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      name: 'Item Baru',
      qty: 1,
      price: 0
    };
    onChange('items', [...items, newItem]);
  };

  const handleRemoveItem = (index) => {
    if (items.length <= 1) {
      showToast('Minimal harus ada 1 item biaya', 'warning');
      return;
    }
    const updated = items.filter((_, i) => i !== index);
    onChange('items', updated);
  };

  const totalCost = items.reduce((acc, item) => acc + (Number(item.qty || 0) * Number(item.price || 0)), 0);

  return (
    <div className="space-y-3 text-xs pt-3">
      <div className="flex items-center justify-between">
        <p className="text-dim text-[11px]">Rincian biaya permohonan</p>
        <button
          type="button"
          onClick={handleAddItem}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-wash hover:bg-surface-hover border border-border text-ink text-[11px] font-medium rounded-md transition"
        >
          <Plus className="w-3 h-3" />
          <span>Tambah</span>
        </button>
      </div>

      <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
        {items.map((item, index) => {
          const subtotal = Number(item.qty || 0) * Number(item.price || 0);
          return (
            <div
              key={item.id || index}
              className="flex items-center gap-2 p-2 bg-wash border border-border rounded-md group hover:border-border-strong transition-colors"
            >
              <span className="w-5 text-center font-medium text-dim shrink-0 text-[11px]">
                {index + 1}
              </span>
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                placeholder="Deskripsi"
                className="flex-1 min-w-0 bg-surface border border-border rounded px-2 py-1.5 text-ink placeholder-dim focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:border-accent transition text-[11px]"
              />
              <input
                type="number"
                min="1"
                value={item.qty}
                onChange={(e) => handleItemChange(index, 'qty', parseInt(e.target.value) || 0)}
                className="w-14 bg-surface border border-border rounded px-2 py-1.5 text-center text-ink focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:border-accent transition text-[11px]"
              />
              <input
                type="number"
                min="0"
                step="1000"
                value={item.price}
                onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value) || 0)}
                placeholder="Harga"
                className="w-28 bg-surface border border-border rounded px-2 py-1.5 text-ink focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:border-accent transition text-[11px]"
              />
              <div className="w-24 text-right font-mono text-[11px] text-dim shrink-0 hidden sm:block">
                Rp{subtotal.toLocaleString('id-ID')}
              </div>
              <button
                type="button"
                onClick={() => handleRemoveItem(index)}
                className="p-1.5 text-border-strong hover:text-danger rounded transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between p-3 bg-wash border border-border rounded-md">
        <span className="text-dim text-[11px]">Total</span>
        <span className="text-sm font-semibold font-mono text-ink">
          Rp{totalCost.toLocaleString('id-ID')}
        </span>
      </div>
    </div>
  );
}
