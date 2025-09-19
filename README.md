# Personal Site Portfolio

Welcome to my personal website repository! This contains two distinct projects showcasing different aspects of my development work and interests.

## 🚀 Projects

### 1. Interim Site (`/interim-site`)

My personal website built with Next.js and TypeScript.

**Features:**

- Responsive design with Tailwind CSS
- Project showcase with technology stacks
- Personal interests and social links
- Resume download functionality
- PostHog analytics integration

**Tech Stack:**

- Next.js 14
- TypeScript
- Tailwind CSS
- Lucide React Icons
- PostHog Analytics

### 2. Bike Journey (`/my-bike-journey`) (currently in progress, working through the spline models)

An interactive 3D web experience where users ride a bike through a forest, stopping at landmarks representing different interests and projects.

**Features:**

- 3D interactive environment using Spline
- Database-driven landmark system
- Guestbook functionality
- Analytics dashboard
- Mobile-responsive controls
- Achievement system

**Tech Stack:**

- Next.js 15 with Turbopack
- TypeScript
- Spline 3D
- Prisma ORM
- PostgreSQL (Supabase)
- Framer Motion
- React Hook Form + Zod validation

## If you want to duplicate/fork

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (for my-bike-journey)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/personal-site.git
   cd personal-site
   ```

2. **Install dependencies for each project**

   For the interim site:

   ```bash
   cd interim-site
   npm install
   ```

   For the bike journey (currently unfinished):

   ```bash
   cd my-bike-journey
   npm install
   ```

3. **Set up environment variables**

   Copy the example environment files and fill in your values:

   ```bash
   # For interim-site
   cp interim-site/.env.example interim-site/.env.local

   # For my-bike-journey
   cp my-bike-journey/env.example my-bike-journey/.env.local
   ```

4. **Run the development servers**

   Interim site:

   ```bash
   cd interim-site
   npm run dev
   ```

   Bike journey:

   ```bash
   cd my-bike-journey
   npm run dev
   ```

## Project Structure

```
personal-site/
├── interim-site/              # Current personal website view
│   ├── app/                   # Next.js App Router
│   ├── components/            # React components
│   ├── lib/                   # Utilities and types
│   └── public/                # Static assets
├── my-bike-journey/           # 3D interactive experience
│   ├── src/
│   │   ├── app/               # Next.js App Router
│   │   ├── components/        # React components
│   │   ├── lib/               # Database and utilities
│   │   └── types/             # TypeScript types
│   ├── prisma/                # Database schema
│   └── scripts/               # Setup scripts
└── README.md
```

## Proposed controls for Bike Journey site

### Desktop

- **SPACE** - Stop at landmarks
- **← →** - Steer left/right
- **A** - Open analytics dashboard
- **G** - Open guestbook (when at landmark)
- **P** - Toggle performance stats
- **ESC** - Close modals/landmarks

<!-- ### Mobile (to be added)

- **Touch Controls** - Tap buttons to steer and stop
- **Swipe Gestures** - Navigate through content -->

<!-- ## Customization

### Adding New Landmarks (My Bike Journey)

1. **Via Admin Interface**

   - Visit `/admin` in your browser
   - Click "Add Landmark"
   - Fill in the details and Spline object name

2. **Via Database**
   - Use Prisma Studio: `npm run db:studio`
   - Add landmarks directly to the database -->

## Deployment

Both projects are configured for easy deployment on Vercel:

1. **Interim Site**: Standard Next.js deployment
2. **My Bike Journey**: Requires database setup (PostgreSQL/Supabase)

## Analytics

- **Interim Site**: PostHog integration for user analytics
- **My Bike Journey**: Custom analytics dashboard with visitor tracking

## 🛡️ Security

- All sensitive data is stored in environment variables
- Database credentials and API keys are never committed
- Proper `.gitignore` configuration protects sensitive files

## License

This project is open source, available to all.

## Contributing

Feel free to fork this repository and if you're feeling very helpful, submit pull requests for any improvements

## Contact

- **Email**: jacklilleyerington@gmail.com
- **LinkedIn**: [linkedin.com/in/jacklilleyerington](https://linkedin.com/in/jacklilleyerington)
- **GitHub**: [github.com/jackly1](https://github.com/jackly1)
- **Website**: [jacklilleyerington.com](https://jacklilleyerington.com/)

---

_Built with love by Jack Lille Yerington_
