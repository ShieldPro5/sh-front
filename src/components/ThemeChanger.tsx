import { Palette } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeChanger() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { value: 'blue', name: 'Ocean Blue', colors: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { value: 'green', name: 'Forest Green', colors: 'bg-gradient-to-r from-green-500 to-emerald-500' },
    { value: 'purple', name: 'Royal Purple', colors: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { value: 'orange', name: 'Sunset Orange', colors: 'bg-gradient-to-r from-orange-500 to-red-500' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {isOpen && (
          <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 w-48 mb-2">
            <p className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200">Choose Theme</p>
            <div className="space-y-2">
              {themes.map((t) => (
                <button
                  key={t.value}
                  onClick={() => {
                    setTheme(t.value as any);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all ${
                    theme === t.value
                      ? 'bg-gray-100 dark:bg-gray-700 scale-105'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className={`w-8 h-8 rounded ${t.colors}`}></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{t.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn-theme p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="Change theme"
        >
          <Palette className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
