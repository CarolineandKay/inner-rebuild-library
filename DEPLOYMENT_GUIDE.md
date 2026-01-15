# Deployment Guide - Inner Rebuild Library

## 🚀 Quick Deploy to Netlify

### Option 1: GitHub + Netlify (Recommended)

#### 1. Push to GitHub
```bash
cd ebook-dashboard
git init
git add .
git commit -m "Initial Inner Rebuild Library MVP"
git branch -M main
git remote add origin https://github.com/CarolineandKay/inner-rebuild-path.git
git push -u origin main
```

#### 2. Connect to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Choose GitHub and select your repository
4. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Base directory**: `ebook-dashboard`
5. Click "Deploy site"

#### 3. Custom Domain (Optional)
1. In Netlify dashboard → Domain settings
2. Add custom domain: `innerrebuildlibrary.com`
3. Follow DNS setup instructions

### Option 2: Manual Deploy

#### 1. Build Locally
```bash
cd ebook-dashboard
npm install
npm run build
```

#### 2. Upload to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `dist` folder
3. Your site is live instantly!

## 🔧 Environment Setup

### Development
```bash
# Clone and setup
git clone https://github.com/CarolineandKay/inner-rebuild-path.git
cd inner-rebuild-path/ebook-dashboard
npm install
npm run dev
```

### Production Environment Variables
Add these to Netlify environment variables:
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_key
VITE_APP_URL=https://your-domain.com
```

## 📱 Testing Checklist

### Before Going Live
- [ ] All pages load correctly
- [ ] Store → Library → Reader flow works
- [ ] XP system awards points correctly
- [ ] Journal saves entries
- [ ] Unlock codes work
- [ ] Mobile responsive design
- [ ] Fast loading times

### User Journey Test
1. **New User**: Visit store → preview book → see unlock section
2. **Purchase Flow**: Click buy → redirect to Stripe → return with code
3. **Unlock**: Enter code → book appears in library
4. **Reading**: Start session → timer works → earn XP
5. **Reflection**: Complete journal entry → earn more XP
6. **Streak**: Return next day → streak increments

## 🎯 Launch Strategy

### Soft Launch (Week 1)
- **Audience**: Close friends, beta testers
- **Goal**: Find bugs, gather feedback
- **Metrics**: Basic usage tracking

### Public Launch (Week 2)
- **Audience**: Social media, email list
- **Goal**: First real sales
- **Metrics**: Conversion rates, user engagement

### Growth Phase (Month 1)
- **Audience**: Paid ads, partnerships
- **Goal**: Sustainable revenue
- **Metrics**: Customer lifetime value, retention

## 📊 Analytics Setup

### Google Analytics 4
Add to `index.html`:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YOUR-ID');
</script>
```

### Key Events to Track
- Page views (automatic)
- Purchase attempts
- Successful unlocks
- Reading sessions started
- Journal entries completed

## 🔒 Security Headers

Add to `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

## 🚀 Performance Optimization

### Image Optimization
- Use WebP format when possible
- Compress images to <100KB
- Implement lazy loading for book covers

### Code Splitting
```javascript
// Lazy load pages
const Reader = lazy(() => import('./pages/Reader'));
const Journal = lazy(() => import('./pages/Journal'));
```

### Caching Strategy
```toml
# netlify.toml
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"
```

## 📈 Monitoring

### Uptime Monitoring
- Use Netlify's built-in monitoring
- Set up alerts for downtime

### Error Tracking
```javascript
// Simple error boundary
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error('App error:', error, errorInfo);
    // Send to error tracking service
  }
}
```

## 🔄 Updates & Maintenance

### Regular Updates
- **Weekly**: Check analytics, user feedback
- **Monthly**: Update content, add features
- **Quarterly**: Review pricing, strategy

### Backup Strategy
- **Code**: GitHub (automatic)
- **User data**: LocalStorage (user's device)
- **Analytics**: Google Analytics (retained)

---

**You're ready to launch! 🎉**

Your MVP is complete and ready for real users. Start selling this week and iterate based on actual customer feedback.