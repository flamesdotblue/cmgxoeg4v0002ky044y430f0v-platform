import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function AddEntryForm({ selectedDate, onAdd }) {
  const [name, setName] = useState('');
  const [protein, setProtein] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const grams = Number(protein);
    if (!name.trim() || Number.isNaN(grams) || grams <= 0) return;
    onAdd({ name: name.trim(), protein: grams, date: selectedDate });
    setName('');
    setProtein('');
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">Add Entry</h3>
      <p className="text-slate-500 text-sm mb-3">Log a meal or supplement for {selectedDate}.</p>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Food or supplement"
            className="md:col-span-2 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            min={0}
            step="1"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            placeholder="Protein (g)"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Entry
        </button>
      </form>
    </div>
  );
}
