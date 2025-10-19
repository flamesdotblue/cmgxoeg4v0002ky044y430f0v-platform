import { Trash2 } from 'lucide-react';

export default function EntriesList({ entries, onDelete }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">Entries</h3>
      <p className="text-slate-500 text-sm mb-3">All items logged for the selected day.</p>

      {entries.length === 0 ? (
        <div className="text-slate-500 text-sm border border-dashed border-slate-300 rounded-lg p-6 text-center">
          No entries yet. Add your first item.
        </div>
      ) : (
        <ul className="divide-y divide-slate-200">
          {entries.map((e) => (
            <li key={e.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-900">{e.name}</div>
                <div className="text-sm text-slate-500">{e.protein} g protein</div>
              </div>
              <button
                onClick={() => onDelete(e.id)}
                className="text-slate-500 hover:text-red-600 p-2 rounded-md hover:bg-red-50"
                aria-label={`Delete ${e.name}`}
                title="Delete"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
