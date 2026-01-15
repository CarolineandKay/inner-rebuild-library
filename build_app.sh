#!/bin/bash

echo "🚀 Building Inner Rebuild Library MVP..."

# Create directory structure
mkdir -p src/{pages,components,data,utils}
mkdir -p public

# Create package.json
cat > package.json << 'EOF'
{
  "name": "inner-rebuild-library",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.1",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "autoprefixer": "^10.4.14",
    "eslint": "^8.45.0",
    "eslint-plugin-react": "^7.32.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "postcss": "^8.4.27",
    "tailwindcss": "^3.3.3",
    "vite": "^4.4.5"
  }
}
EOF

# Create vite.config.js
cat > vite.config.js << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
EOF

# Create tailwind.config.js
cat > tailwind.config.js << 'EOF'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        warm: {
          50: '#fef7ed',
          100: '#fdedd3',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-gentle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
EOF

# Create postcss.config.js
cat > postcss.config.js << 'EOF'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# Create index.html
cat > index.html << 'EOF'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Inner Rebuild Library</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
EOF

# Create netlify.toml
cat > netlify.toml << 'EOF'
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
EOF

echo "✅ Configuration files created!"
echo "🎨 Creating React components..."

# Create src/main.jsx
cat > src/main.jsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF

# Create src/index.css
cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: 'Inter', system-ui, sans-serif;
  }
  
  body {
    @apply bg-neutral-50 text-neutral-900;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200;
  }
  
  .btn-secondary {
    @apply bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200;
  }
  
  .card {
    @apply bg-white rounded-xl shadow-sm border border-neutral-200 p-6;
  }
  
  .xp-badge {
    @apply inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700;
  }
  
  .streak-badge {
    @apply inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warm-100 text-warm-700;
  }
}
EOF

echo "📱 Creating App component..."

# Create src/App.jsx
cat > src/App.jsx << 'EOF'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Store from './pages/Store';
import Library from './pages/Library';
import Reader from './pages/Reader';
import Journal from './pages/Journal';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/store" replace />} />
            <Route path="/store" element={<Store />} />
            <Route path="/library" element={<Library />} />
            <Route path="/reader/:bookId" element={<Reader />} />
            <Route path="/journal" element={<Journal />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
EOF

echo "🎮 Creating data and utilities..."

# This is getting long - let me split this into parts
echo "📚 Part 1 complete! Creating data files..."
EOF

# Save with Ctrl+X, Y, Enter

### Step 3: Make it executable and run it
```bash
chmod +x build_app.sh
./build_app.sh
This creates the basic structure. Now let me create Part 2 of the script for the data and components:

nano build_app_part2.sh
Copy this second part:

#!/bin/bash

echo "📚 Creating data and utility files..."

# Create src/data/ebooks.js
cat > src/data/ebooks.js << 'EOF'
export const ebooks = [
  {
    id: 'healing-from-within',
    title: 'Healing From Within',
    subtitle: 'A Journey to Self-Discovery',
    author: 'Inner Rebuild Library',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&crop=center',
    price: 19.99,
    category: 'self-worth',
    description: 'Transform your relationship with yourself through gentle, proven techniques.',
    outcomes: [
      'Build unshakeable self-worth',
      'Heal past emotional wounds',
      'Create lasting inner peace'
    ],
    chapters: 8,
    readingTime: '2-3 hours',
    isOwned: false
  },
  {
    id: 'boundaries-in-love',
    title: 'Boundaries in Love',
    subtitle: 'Healthy Relationships Start Here',
    author: 'Inner Rebuild Library',
    cover: 'https://images.unsplash.com/photo-1518621012420-8ab10d9f4e25?w=400&h=600&fit=crop&crop=center',
    price: 19.99,
    category: 'relationships',
    description: 'Learn to set loving boundaries that strengthen your relationships.',
    outcomes: [
      'Set clear, loving boundaries',
      'Communicate needs effectively',
      'Build healthier relationships'
    ],
    chapters: 6,
    readingTime: '2 hours',
    isOwned: false
  },
  {
    id: 'loving-yourself-first',
    title: 'Loving Yourself First',
    subtitle: 'The Foundation of All Relationships',
    author: 'Inner Rebuild Library',
    cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=center',
    price: 19.99,
    category: 'self-worth',
    description: 'Discover the transformative power of genuine self-love.',
    outcomes: [
      'Develop authentic self-love',
      'Break negative thought patterns',
      'Create a foundation for healthy relationships'
    ],
    chapters: 7,
    readingTime: '2.5 hours',
    isOwned: true
  }
];

export const bundles = [
  {
    id: 'complete-rebuild',
    title: 'Complete Inner Rebuild Bundle',
    description: 'All 3 foundational books for your transformation journey',
    books: ['healing-from-within', 'boundaries-in-love', 'loving-yourself-first'],
    originalPrice: 59.97,
    bundlePrice: 39.99,
    savings: 19.98,
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop&crop=center'
  }
];

export const xpRules = {
  reading10min: 10,
  reflection: 15,
  questStep: 25,
  chapterComplete: 50,
  streakBonus: 5,
  maxStreakBonus: 50,
  dailyGoal: 50
};

export const badges = [
  { id: '3-day-starter', name: '3-Day Starter', description: 'Read for 3 days in a row', icon: '🔥', category: 'streak' },
  { id: '7-day-builder', name: '7-Day Builder', description: 'One week of consistent reading', icon: '💪', category: 'streak' },
  { id: 'first-session', name: 'First Session', description: 'Completed your first reading session', icon: '📖', category: 'reading' },
  { id: 'honest-mirror', name: 'Honest Mirror', description: '5 journal reflections completed', icon: '🪞', category: 'reflection' },
  { id: 'library-founder', name: 'Library Founder', description: 'Purchased your first book', icon: '🏛️', category: 'purchase' }
];
EOF

echo "🔧 Creating storage utilities..."

# Create src/utils/storage.js (simplified version)
cat > src/utils/storage.js << 'EOF'
const STORAGE_KEYS = {
  USER_DATA: 'inner_rebuild_user',
  READING_SESSIONS: 'inner_rebuild_sessions',
  JOURNAL_ENTRIES: 'inner_rebuild_journal',
  OWNED_BOOKS: 'inner_rebuild_owned',
  BADGES: 'inner_rebuild_badges'
};

export const getUserData = () => {
  const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
  return data ? JSON.parse(data) : {
    xp: 0,
    level: 1,
    streak: 0,
    lastActiveDate: null,
    dailyGoal: 50,
    totalReadingTime: 0,
    booksCompleted: 0,
    reflectionsCount: 0
  };
};

export const saveUserData = (userData) => {
  localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
};

export const getOwnedBooks = () => {
  const owned = localStorage.getItem(STORAGE_KEYS.OWNED_BOOKS);
  return owned ? JSON.parse(owned) : ['loving-yourself-first'];
};

export const unlockBookWithCode = (code) => {
  const unlockCodes = {
    'HEAL2024': 'healing-from-within',
    'BOUND2024': 'boundaries-in-love',
    'LOVE2024': 'loving-yourself-first',
    'BUNDLE2024': ['healing-from-within', 'boundaries-in-love', 'loving-yourself-first']
  };
  
  const bookIds = unlockCodes[code.toUpperCase()];
  if (bookIds) {
    const owned = getOwnedBooks();
    if (Array.isArray(bookIds)) {
      bookIds.forEach(id => {
        if (!owned.includes(id)) owned.push(id);
      });
    } else {
      if (!owned.includes(bookIds)) owned.push(bookIds);
    }
    localStorage.setItem(STORAGE_KEYS.OWNED_BOOKS, JSON.stringify(owned));
    return true;
  }
  return false;
};

export const saveReadingSession = (session) => {
  const sessions = JSON.parse(localStorage.getItem(STORAGE_KEYS.READING_SESSIONS) || '[]');
  sessions.push({
    id: Date.now(),
    ...session,
    date: new Date().toISOString()
  });
  localStorage.setItem(STORAGE_KEYS.READING_SESSIONS, JSON.stringify(sessions));
};

export const getReadingSessions = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.READING_SESSIONS) || '[]');
};
EOF
```bash
chmod +x build_app_part2.sh
./build_app_part2.sh
