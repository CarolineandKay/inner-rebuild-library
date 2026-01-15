# Stripe Integration Guide - Inner Rebuild Library

## 🚀 Quick Monetization Setup

### Phase 1: Stripe Payment Links (Fastest Revenue)

#### 1. Create Stripe Account
1. Go to [stripe.com](https://stripe.com)
2. Sign up for account
3. Complete business verification
4. Get your **Publishable Key** and **Secret Key**

#### 2. Create Payment Links

**For each product, create a Payment Link:**

```
Product: Healing From Within
Price: $19.99
Success URL: https://your-app.com/unlock?code=HEAL2024&book=healing-from-within
Cancel URL: https://your-app.com/store
```

**Bundle Example:**
```
Product: Complete Inner Rebuild Bundle  
Price: $39.99
Success URL: https://your-app.com/unlock?code=BUNDLE2024&books=all
Cancel URL: https://your-app.com/store
```

#### 3. Update Store.jsx

Replace the demo payment function:

```javascript
const handlePurchase = () => {
  // Replace with your actual Stripe Payment Links
  const paymentLinks = {
    'healing-from-within': 'https://buy.stripe.com/test_your_link_1',
    'boundaries-in-love': 'https://buy.stripe.com/test_your_link_2', 
    'loving-yourself-first': 'https://buy.stripe.com/test_your_link_3',
    'complete-rebuild': 'https://buy.stripe.com/test_your_bundle_link'
  };
  
  const paymentUrl = paymentLinks[book.id];
  if (paymentUrl) {
    window.open(paymentUrl, '_blank');
  }
};
```

#### 4. Create Unlock Page

```javascript
// src/pages/Unlock.jsx
import { useSearchParams } from 'react-router-dom';
import { unlockBookWithCode } from '../utils/storage';

const Unlock = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  
  useEffect(() => {
    if (code) {
      const success = unlockBookWithCode(code);
      if (success) {
        // Show success message, redirect to library
      }
    }
  }, [code]);
  
  // Render unlock success/failure UI
};
```

### Phase 2: Enhanced Stripe Integration

#### 1. Install Stripe SDK
```bash
npm install @stripe/stripe-js
```

#### 2. Create Checkout Sessions
```javascript
// utils/stripe.js
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_your_publishable_key');

export const createCheckoutSession = async (priceId) => {
  const stripe = await stripePromise;
  
  const { error } = await stripe.redirectToCheckout({
    lineItems: [{ price: priceId, quantity: 1 }],
    mode: 'payment',
    successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${window.location.origin}/store`,
  });
  
  if (error) {
    console.error('Stripe error:', error);
  }
};
```

#### 3. Webhook for Automatic Unlocking
```javascript
// netlify/functions/stripe-webhook.js
exports.handler = async (event) => {
  const sig = event.headers['stripe-signature'];
  
  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      event.body, 
      sig, 
      process.env.STRIPE_WEBHOOK_SECRET
    );
    
    if (stripeEvent.type === 'checkout.session.completed') {
      const session = stripeEvent.data.object;
      // Send unlock code via email
      // Update database with purchase
    }
    
    return { statusCode: 200, body: 'Success' };
  } catch (err) {
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }
};
```

## 💰 Pricing Strategy

### Individual Books
- **Price Point**: $19.99 each
- **Positioning**: "Less than a coffee shop visit per week"
- **Value Prop**: "Transform your inner world for the price of lunch"

### Bundle Pricing
- **Individual Total**: $59.97 (3 × $19.99)
- **Bundle Price**: $39.99
- **Savings**: $19.98 (33% off)
- **Positioning**: "Complete transformation journey"

### Psychological Pricing
- **$19.99** feels more accessible than $20
- **$39.99** creates clear value vs individual purchases
- **Under $40** keeps bundle in "impulse buy" range

## 📧 Email Automation

### Purchase Confirmation Email
```
Subject: Your Inner Rebuild Library Access 🔓

Hi [Name],

Welcome to your transformation journey! 

Your unlock code: HEAL2024
Access your book: [App Link]

What's next:
1. Open the Inner Rebuild Library app
2. Enter your unlock code  
3. Start your first 10-minute reading session
4. Earn your first XP and begin building your streak!

Questions? Reply to this email.

To your growth,
The Inner Rebuild Team
```

### 7-Day Follow-up Sequence
**Day 1**: Welcome + how to get started  
**Day 3**: "How's your first reading session going?"  
**Day 7**: "Your first week of growth" + encourage reflection  
**Day 14**: Share success stories + introduce other books  
**Day 30**: "One month of inner work" + advanced tips  

## 🔒 Security Considerations

### MVP Security (Good Enough)
- **Unlock codes** in localStorage
- **Client-side validation** only
- **No user accounts** required
- **Simple but functional**

### Production Security (Later)
- **Server-side validation**
- **User authentication** (Supabase/Firebase)
- **Encrypted purchase records**
- **Secure API endpoints**

## 📊 Revenue Tracking

### Key Metrics to Track
- **Conversion rate**: Store visits → purchases
- **Average order value**: Individual vs bundle preference  
- **Customer lifetime value**: Repeat purchases
- **Engagement**: Reading sessions post-purchase

### Simple Analytics Setup
```javascript
// Track purchase events
const trackPurchase = (bookId, price) => {
  // Google Analytics 4
  gtag('event', 'purchase', {
    transaction_id: Date.now(),
    value: price,
    currency: 'USD',
    items: [{ item_id: bookId, item_name: book.title }]
  });
};
```

## 🚀 Launch Checklist

### Pre-Launch
- [ ] Stripe account verified
- [ ] Payment links created and tested
- [ ] Unlock codes working
- [ ] Email templates ready
- [ ] Analytics tracking setup

### Launch Day
- [ ] Test complete purchase flow
- [ ] Monitor for any payment issues
- [ ] Respond to customer questions quickly
- [ ] Track conversion metrics

### Week 1
- [ ] Analyze purchase patterns
- [ ] Gather customer feedback
- [ ] Optimize based on user behavior
- [ ] Plan next book releases

---

**Remember**: Start simple with Payment Links. You can be selling within 24 hours. Perfect the experience, then add complexity.