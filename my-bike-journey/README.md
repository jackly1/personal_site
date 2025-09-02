# My Bike Journey - Interactive 3D Experience

An immersive 3D bike journey experience built with Next.js, Spline, and modern web technologies. Explore landmarks from your personal journey while tracking analytics and engaging with a guestbook system.

## 🚀 Features

### Core Experience

- **3D Bike Journey**: Interactive Spline-powered 3D environment
- **Landmark Exploration**: Click on stop signs to learn about different locations
- **Smooth Animations**: Framer Motion-powered UI transitions
- **Performance Monitoring**: Real-time FPS and performance stats

### Interactive Elements

- **Keyboard Controls**: Space to stop, arrow keys to steer, hotkeys for features
- **Mobile Support**: Touch controls and responsive design
- **Guestbook System**: Leave messages at landmarks
- **Gamification**: Score system and landmark collection

### Analytics & Management

- **Visitor Tracking**: Unique IP tracking and visit analytics
- **Admin Dashboard**: Manage landmarks and view analytics
- **Real-time Stats**: Performance monitoring and user engagement metrics
- **Database Integration**: PostgreSQL with Prisma ORM

## 🛠 Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Spline** - 3D scene rendering
- **Lucide React** - Beautiful icons

### Backend

- **Next.js API Routes** - Serverless functions
- **Prisma** - Modern database ORM
- **PostgreSQL** - Reliable database
- **Zod** - Schema validation

### Infrastructure

- **Vercel** - Deployment platform
- **GitHub** - Version control
- **Cloudflare** - CDN for 3D assets

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd my-bike-journey
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env.local
   ```

   Update `.env.local` with your values:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/bike_journey_db"
   NEXT_PUBLIC_SPLINE_SCENE_URL="https://prod.spline.design/your-scene-url"
   NEXT_PUBLIC_ANALYTICS_ENABLED=true
   ADMIN_SECRET_KEY="your-secret-admin-key"
   ```

4. **Set up the database**

   ```bash
   # Generate Prisma client
   npm run db:generate

   # Push schema to database
   npm run db:push

   # Seed with initial data
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🎮 Controls

### Desktop

- **SPACE** - Stop at landmarks
- **← →** - Steer left/right
- **A** - Open analytics dashboard
- **G** - Open guestbook (when at landmark)
- **P** - Toggle performance stats
- **ESC** - Close modals/landmarks

### Mobile

- **Touch Controls** - Tap buttons to steer and stop
- **Swipe Gestures** - Navigate through content

## 🏗 Project Structure

```
my-bike-journey/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── admin/             # Admin dashboard
│   │   └── page.tsx           # Main page
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   ├── BikeJourney.tsx   # Main 3D component
│   │   ├── AnalyticsDashboard.tsx
│   │   └── GuestbookModal.tsx
│   ├── lib/                  # Utility functions
│   └── types/                # TypeScript types
├── prisma/                   # Database schema and migrations
└── public/                   # Static assets
```

## 🎨 Customization

### Adding New Landmarks

1. **Via Admin Interface**

   - Visit `/admin` in your browser
   - Click "Add Landmark"
   - Fill in the details and Spline object name

2. **Via Database**
   - Use Prisma Studio: `npm run db:studio`
   - Add entries to the `landmarks` table

### Modifying the 3D Scene

1. **Update Spline Scene**

   - Edit your scene in Spline
   - Export and update `NEXT_PUBLIC_SPLINE_SCENE_URL`
   - Ensure object names match your landmark configurations

2. **Custom Animations**
   - Use Spline's animation timeline
   - Trigger events with `app.emitEvent()`
   - Handle events in the React component

## 📊 Analytics

The application tracks:

- **Unique Visitors** - Based on IP addresses
- **Landmark Visits** - Which landmarks are most popular
- **Session Duration** - Time spent at each landmark
- **Performance Metrics** - FPS, object count, memory usage

View analytics at `/admin` or press `A` in the main experience.

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**

   ```bash
   npm i -g vercel
   vercel
   ```

2. **Set Environment Variables**

   - Add all variables from `.env.local` to Vercel dashboard
   - Ensure database URL is accessible from Vercel

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Database Setup

For production, use a managed PostgreSQL service:

- **Vercel Postgres** - Integrated with Vercel
- **Supabase** - Free tier available
- **Railway** - Simple setup
- **Neon** - Serverless PostgreSQL

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database
```

### Database Management

```bash
# Reset database
npx prisma db push --force-reset

# View database
npm run db:studio

# Generate migration
npx prisma migrate dev --name your-migration-name
```

## 🎯 Performance Optimization

### 3D Assets

- Use LOD (Level of Detail) in Spline
- Optimize polygon count for web
- Compress textures appropriately
- Use progressive loading

### Web Performance

- Lazy load landmark details
- Implement virtual scrolling for large lists
- Use React.memo for expensive components
- Optimize bundle size with dynamic imports

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Spline** - For the amazing 3D web platform
- **Framer Motion** - For smooth animations
- **Prisma** - For the excellent database toolkit
- **Vercel** - For seamless deployment

## 📞 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

---

Built with ❤️ using modern web technologies
