import { Calendar, Settings } from 'lucide-react';
import { useState } from 'react';

export default function DailySummary({ selectedDate, onDateChange, goal, onGoalChange, totalProtein }) {
  const [editingGoal, setEditingGoal] = useState(false);
  const [tempGoal, setTempGoal] = useState(String(goal));

  const progress = Math.min(100, Math.round((Number(totalProtein) / Number(goal || 1)) * 100));

  function handleSaveGoal() {
    const g = Number(tempGoal);
    if (!Number.isNaN(g) && g > 0) {
      onGoalChange(g);
      setEditingGoal(false);
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Daily Summary</h2>
          <p className="text-slate-600">Track protein for a specific day and adjust your goal.</p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <label className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm">
            <Calendar className="w-4 h-4 text-slate-500" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="outline-none text-sm"
            />
          </label>

          {!editingGoal ? (
            <button
              onClick={() => {
                setTempGoal(String(goal));
                setEditingGoal(true);
              }}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white shadow-sm hover:bg-slate-50"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm">Goal: {goal} g</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-white border border-blue-200 rounded-lg px-3 py-2 shadow-sm">
              <input
                type="number"
                min={1}
                value={tempGoal}
                onChange={(e) => setTempGoal(e.target.value)}
                className="w-20 text-sm border border-slate-200 rounded px-2 py-1"
              />
              <button onClick={handleSaveGoal} className="text-sm px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">Save</button>
              <button onClick={() => setEditingGoal(false)} className="text-sm px-2 py-1 rounded bg-slate-100 hover:bg-slate-200">Cancel</button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl p-5 shadow">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-sm text-white/80">Total Protein</div>
            <div className="text-3xl font-semibold">{totalProtein} g</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-white/80">Goal</div>
            <div className="text-xl font-medium">{goal} g</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-3 bg-white rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-white/90">{progress}% of goal</div>
        </div>
      </div>
    </div>
  );
}
