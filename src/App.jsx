import { useEffect, useMemo, useState } from 'react';
import HeroCover from './components/HeroCover';
import DailySummary from './components/DailySummary';
import AddEntryForm from './components/AddEntryForm';
import EntriesList from './components/EntriesList';

const STORAGE_KEYS = {
  entries: 'proteinEntries',
  goal: 'proteinGoal',
  selectedDate: 'proteinSelectedDate',
};

function getToday() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export default function App() {
  const [entries, setEntries] = useState([]);
  const [goal, setGoal] = useState(120);
  const [selectedDate, setSelectedDate] = useState(getToday());

  useEffect(() => {
    try {
      const e = JSON.parse(localStorage.getItem(STORAGE_KEYS.entries) || '[]');
      if (Array.isArray(e)) setEntries(e);
    } catch {}
    const g = Number(localStorage.getItem(STORAGE_KEYS.goal));
    if (!Number.isNaN(g) && g > 0) setGoal(g);
    const sd = localStorage.getItem(STORAGE_KEYS.selectedDate);
    if (sd) setSelectedDate(sd);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.entries, JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.goal, String(goal));
  }, [goal]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.selectedDate, selectedDate);
  }, [selectedDate]);

  const dayEntries = useMemo(
    () => entries.filter((e) => e.date === selectedDate),
    [entries, selectedDate]
  );

  const totalProtein = useMemo(
    () => dayEntries.reduce((sum, e) => sum + Number(e.protein || 0), 0),
    [dayEntries]
  );

  function addEntry(entry) {
    const newEntry = { id: crypto.randomUUID(), ...entry };
    setEntries((prev) => [newEntry, ...prev]);
  }

  function deleteEntry(id) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-slate-900">
      <HeroCover />

      <main className="mx-auto max-w-4xl px-4 -mt-24 relative z-10">
        <div className="bg-white/80 backdrop-blur shadow-xl border border-slate-200 rounded-2xl p-6">
          <DailySummary
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            goal={goal}
            onGoalChange={setGoal}
            totalProtein={totalProtein}
          />

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AddEntryForm selectedDate={selectedDate} onAdd={addEntry} />
            <EntriesList entries={dayEntries} onDelete={deleteEntry} />
          </div>
        </div>

        <footer className="text-center text-sm text-slate-500 mt-8 mb-8">
          Built for tracking daily protein intake. Data is saved locally in your browser.
        </footer>
      </main>
    </div>
  );
}
