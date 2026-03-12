# Bellavita Smart Homes

A modern, high-performance smart home automation website built with Next.js 14, TypeScript, and TailwindCSS.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **Premium Animations**: Framer Motion for smooth interactions
- **Email Integration**: Nodemailer for contact forms
- **Responsive Design**: Mobile-first approach
- **SEO Optimized**: Meta tags, sitemap, robots.txt
- **Component Architecture**: Reusable UI components
- **Dark Theme**: Premium tech aesthetic

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── solutions/         # Solutions page
│   ├── locations/         # Locations page
│   ├── franchise/         # Franchise page
│   ├── contact/           # Contact page
│   ├── api/               # API routes
│   │   └── sendEmail/     # Email endpoint
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── sitemap.ts         # SEO sitemap
│   └── robots.ts          # SEO robots
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── ScrollReveal.tsx
│   │   ├── ParallaxSection.tsx
│   │   ├── FloatingElement.tsx
│   │   └── AnimatedCounter.tsx
│   ├── layout/            # Layout components
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── home/              # Home page sections
│       ├── Hero.tsx
│       ├── Vision.tsx
│       ├── WhyChooseUs.tsx
│       ├── Products.tsx
│       ├── Services.tsx
│       └── Testimonials.tsx
└── globals.css            # Global styles
```

## 🛠️ Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
COMPANY_EMAIL=info@bellavita.com
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📧 Email Setup

For Gmail integration:
1. Enable 2-factor authentication on your Gmail account
2. Generate an app-specific password
3. Use the app password as `SMTP_PASS` in your environment variables

## 🎨 Design Features

- **Animated Navbar**: Sticky navigation with dropdown menu
- **Hero Section**: Full-screen video background with CTA buttons
- **Interactive Elements**: Hotspots, carousels, and hover effects
- **Glassmorphism**: Modern card designs with backdrop blur
- **Scroll Animations**: Smooth reveal animations on scroll
- **Responsive Layout**: Optimized for all device sizes

## 📱 Pages

- **Home**: Hero, Vision, Why Choose Us, Products, Services, Testimonials
- **About**: Company story, values, and milestones
- **Solutions**: Detailed service descriptions with features
- **Locations**: Project showcase with city coverage
- **Franchise**: Franchise opportunities with application form
- **Contact**: Contact form with company information

## 🔧 Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🌟 Key Components

### UI Components
- **Button**: Animated button with multiple variants
- **Card**: Glassmorphic card with hover effects
- **ScrollReveal**: Scroll-triggered animations
- **ParallaxSection**: Parallax scrolling effects
- **FloatingElement**: Continuous floating animation
- **AnimatedCounter**: Animated number counter

### Layout Components
- **Navbar**: Animated navigation with dropdown
- **Footer**: Company information and links

## 📊 Performance Features

- **Next.js Image Optimization**: Automatic image optimization
- **Lazy Loading**: Components load as needed
- **SEO Meta Tags**: Complete SEO optimization
- **Structured Data**: Semantic HTML structure

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is proprietary and confidential.

---

**Built with ❤️ for Bellavita Smart Homes**
