# Bellavita - New Homepage Features

This document outlines the new sections added to the Bellavita homepage to enhance user engagement and showcase social proof.

## 🆕 New Sections Added

### 1. Google Reviews Section
- **Location**: After existing testimonials
- **Component**: `src/components/home/GoogleReviews.tsx`
- **API Route**: `src/app/api/google-reviews/route.ts`

**Features:**
- Real-time Google Reviews integration via Google Places API
- Average rating display with star visualization
- Responsive carousel with 6-8 latest reviews
- Review cards with profile images, names, ratings, and truncated text
- "View All Reviews" button linking to Google
- Fallback to mock data if API fails
- Loading states and error handling

**Setup Required:**
1. Get Google Places API key from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Enable Places API for your project
3. Find your Google Place ID using [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
4. Add to `.env.local`:
   ```
   GOOGLE_PLACES_API_KEY=your_api_key_here
   GOOGLE_PLACE_ID=your_place_id_here
   ```

### 2. Customer Testimonials Carousel
- **Location**: After Google Reviews
- **Component**: `src/components/home/TestimonialsCarousel.tsx`

**Features:**
- Premium glassmorphism design with soft shadows
- Auto-sliding carousel with coverflow effect
- 6 curated testimonials from luxury clients
- Professional images and designations
- Star ratings and compelling testimonial text
- Fully responsive with mobile-first approach
- Subtle animations using Framer Motion
- Statistics section (500+ homes, 98% satisfaction, 15+ years)

### 3. Newsletter Subscription Section
- **Location**: Final section before footer
- **Component**: `src/components/home/Newsletter.tsx`
- **API Route**: `src/app/api/newsletter/route.ts`

**Features:**
- Eye-catching gradient background with animated elements
- Email validation and real-time feedback
- Multiple storage options (JSON file, PostgreSQL, external services)
- Success/error states with appropriate messaging
- Trust indicators and privacy notice
- Mobile-optimized form design

**Storage Options:**
- **JSON File** (Default): Stores in `data/newsletter-subscriptions.json`
- **PostgreSQL**: Uncomment database code in route.ts
- **External Services**: Mailchimp, ConvertKit integration ready

## 📁 File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── google-reviews/
│   │   │   └── route.ts
│   │   └── newsletter/
│   │       └── route.ts
│   └── page.tsx (Updated)
├── components/
│   └── home/
│       ├── GoogleReviews.tsx (New)
│       ├── TestimonialsCarousel.tsx (New)
│       └── Newsletter.tsx (New)
└── lib/
    └── googleReviews.ts (Helper functions)
```

## 🛠 Dependencies Installed

- `swiper`: For carousel functionality
- `framer-motion`: For animations (already installed)

## 🎨 Design Features

### Google Reviews
- Clean, professional layout matching luxury aesthetic
- Smooth carousel transitions
- Hover effects on review cards
- Responsive pagination and navigation

### Testimonials Carousel
- Glassmorphism cards with backdrop blur
- 3D coverflow effect
- Gradient backgrounds and animated elements
- Premium typography and spacing

### Newsletter
- Vibrant gradient background
- Animated floating elements
- Modern form with inline validation
- Trust badges and social proof

## 🔧 Configuration

### Environment Variables
Copy `env-example.txt` to `.env.local` and configure:

```bash
# Required for Google Reviews
GOOGLE_PLACES_API_KEY=your_google_places_api_key
GOOGLE_PLACE_ID=your_google_place_id

# Optional: Database for newsletter
DATABASE_URL=postgresql://username:password@localhost:5432/bellavita

# Optional: External newsletter service
MAILCHIMP_API_KEY=your_mailchimp_api_key
MAILCHIMP_LIST_ID=your_mailchimp_list_id

# Admin API key for subscription management
ADMIN_API_KEY=your_secure_admin_key
```

### Google Places API Setup

1. **Create Project**: Go to [Google Cloud Console](https://console.cloud.google.com/)
2. **Enable APIs**: Enable "Places API"
3. **Create Credentials**: Generate API key
4. **Find Place ID**: Use [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
5. **Configure**: Add credentials to `.env.local`

## 📊 Analytics & Monitoring

### Newsletter Subscriptions
- View subscriptions: `GET /api/newsletter` (with `Authorization: Bearer ADMIN_API_KEY`)
- Stored in `data/newsletter-subscriptions.json`
- Includes IP and user agent for analytics

### Google Reviews
- Automatic fallback to mock data if API fails
- Error logging for debugging
- Performance optimized with caching

## 🚀 Performance Optimizations

- **Lazy Loading**: Components load as needed
- **Image Optimization**: Next.js Image component for all photos
- **API Caching**: Reviews cached to reduce API calls
- **Bundle Optimization**: Tree-shaking for unused imports
- **Responsive Images**: Proper sizing for all viewports

## 🔄 Future Enhancements

### Google Reviews
- Real-time updates without page refresh
- Review filtering and sorting
- Integration with multiple locations
- Review sentiment analysis

### Testimonials
- CMS integration for dynamic content
- Video testimonials support
- Category filtering
- Search functionality

### Newsletter
- Advanced email templates
- A/B testing for subject lines
- Subscriber segmentation
- Automated email campaigns

## 🐛 Troubleshooting

### Google Reviews Not Showing
1. Check API key is valid and has Places API enabled
2. Verify Place ID is correct
3. Check browser console for API errors
4. Ensure `.env.local` is properly configured

### Newsletter Not Working
1. Check `data/` directory permissions
2. Verify email validation regex
3. Check API route logs for errors
4. Test with different email addresses

### Carousel Issues
1. Ensure Swiper CSS is properly imported
2. Check for CSS conflicts
3. Verify responsive breakpoints
4. Test on different screen sizes

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

## 🤝 Support

For issues or questions regarding these new features:
1. Check browser console for errors
2. Verify environment variables
3. Review API route logs
4. Test components individually

---

**Note**: These features are production-ready and include proper error handling, loading states, and fallbacks for a seamless user experience.
