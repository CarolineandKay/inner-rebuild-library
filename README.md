# Inner Rebuild Library - MVP Dashboard

A gamified ebook reading platform that transforms self-help books into engaging quests with XP, streaks, badges, and reflection prompts.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📱 Features

### Core Loop
- **Buy** → **Read 10 mins** → **Get XP** → **Quick reflection** → **Badge/streak** → **Come back tomorrow**

### Pages
- **Store**: Browse and purchase ebooks with Stripe integration
- **Library**: View owned books and reading progress
- **Reader**: Timer-based reading sessions with XP rewards
- **Journal**: Reflection prompts and mood tracking

### Gamification
- **XP System**: Earn points for reading, reflecting, and completing quests
- **Streaks**: Daily reading streaks with bonus XP
- **Badges**: Identity-based achievements (The Finisher, Boundary Babe, etc.)
- **Progress Tracking**: Visual progress rings and session history

## 🛠 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Icons**: Lucide React
- **Storage**: LocalStorage (MVP) → Supabase (later)
- **Payments**: Stripe Payment Links
- **Deployment**: Netlify

## 📊 Data Structure

### User Progress
```javascript
{
  xp: 0,
  level: 1,
  streak: 0,
  dailyGoal: 50,
  totalReadingTime: 0,
  booksCompleted: 0,
  reflectionsCount: 0
}
```

### XP Rules
- Reading: +10 XP per 10 minutes (caps at +30/day)
- Reflection: +15 XP per entry
- Quest Step: +25 XP
- Chapter Complete: +50 XP
- Streak Bonus: +5 XP/day (caps at +50)

## 🎯 MVP Monetization

### Unlock Codes (Demo)
- `HEAL2024` → Healing From Within
- `BOUND2024` → Boundaries in Love  
- `LOVE2024` → Loving Yourself First
- `BUNDLE2024` → All 3 books

### Stripe Integration
Each book has a Payment Link that redirects to unlock page after purchase.

## 🚀 Deployment

### Netlify (Recommended)
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Auto-deploys on push to main

### Manual Deploy
```bash
npm run build
# Upload dist/ folder to any static host
```

## 📈 Future Enhancements

### Phase 2
- User accounts (Supabase Auth)
- Cloud data sync
- Social features (reading groups)
- Advanced analytics

### Phase 3
- Mobile app (React Native)
- AI-powered reading recommendations
- Community challenges
- Premium subscription tiers

## 🎨 Brand Guidelines

### Colors
- **Primary**: Blue (#0ea5e9) - Trust, clarity
- **Warm**: Orange (#f97316) - Energy, motivation  
- **Neutral**: Gray scale - Clean, minimal

### Typography
- **Font**: Inter (clean, readable)
- **Hierarchy**: Bold titles, medium body, light captions

### Voice
- Encouraging but not overwhelming
- "You did something today" vs "You're amazing!"
- Focus on progress over perfection

## 📝 Content Strategy

### Ebook Categories
- **Self-Worth Series**: Cool colors (blue/teal)
- **Relationships Series**: Warm colors (peach/gold)
- **Consistent branding**: Same template, controlled palette

### Quest Structure (Per Book)
1. Start (read 10 mins)
2. Checkpoint (answer 1 question)  
3. Apply (micro-action)
4. Reflect (journal prompt)
5. Progress (read another 10 mins)
6. Chapter complete
7. Finish book
8. Integration week (optional)

## 🔧 Development Notes

### Local Storage Keys
- `inner_rebuild_user` - User progress data
- `inner_rebuild_sessions` - Reading sessions
- `inner_rebuild_journal` - Journal entries
- `inner_rebuild_owned` - Owned book IDs
- `inner_rebuild_badges` - Earned badges

### Component Structure
```
src/
├── components/
│   └── Header.jsx
├── pages/
│   ├── Store.jsx
│   ├── Library.jsx
│   ├── Reader.jsx
│   └── Journal.jsx
├── data/
│   └── ebooks.js
└── utils/
    └── storage.js
```

## 📞 Support

For questions about the Inner Rebuild Library platform, please contact the development team.

---

**Remember**: Boring converts. Keep it clean, clear, and focused on the core loop. Glitter is for later. 💎