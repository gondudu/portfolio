# Eduardo Nogueira - Product Designer Portfolio

A minimalistic portfolio website featuring sophisticated scroll animations and clean typography.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions

## Features

- 🎨 Minimalistic design with generous whitespace
- ✨ Scroll-triggered animations
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Optimized performance with Next.js Image
- 🎯 SEO-friendly with metadata
- ♿ Accessibility considerations (reduced motion support)

## Getting Started

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Home page
│   ├── contact/           # Contact page
│   └── projects/[slug]/   # Dynamic project pages
├── components/
│   ├── home/              # Home page components
│   ├── layout/            # Header, Footer, Navigation
│   ├── projects/          # Project detail components
│   └── shared/            # Reusable components
├── lib/
│   └── projects.ts        # Project data
└── public/                # Static assets
```

## Customization

### Update Your Information

1. **Personal Info**: Edit `app/layout.tsx` and `components/layout/Navigation.tsx`
2. **Contact Details**: Update `app/contact/page.tsx`
3. **Social Links**: Edit `components/layout/Footer.tsx` and `app/contact/page.tsx`

### Add Your Projects

Edit `lib/projects.ts` and update the `projects` array:

```typescript
{
  slug: 'your-project-slug',
  title: 'Your Project Title',
  category: 'Project Category',
  year: '2025',
  role: 'Your Role',
  thumbnail: 'url-to-thumbnail',
  heroImage: 'url-to-hero-image',
  accentColor: '#0061FF',
  overview: 'Project overview...',
  challenge: 'The challenge...',
  solution: 'The solution...',
  results: ['Result 1', 'Result 2', ...],
  images: ['image1.jpg', 'image2.jpg', ...],
}
```

### Customize Colors

Edit `tailwind.config.ts` to change the color palette:

```typescript
colors: {
  primary: '#0061FF',    // Main accent color
  accent1: '#FFD02F',    // Yellow
  accent2: '#FF6B6B',    // Red/Pink
  accent3: '#7B68EE',    // Purple
  accent4: '#00D9B1',    // Cyan/Green
}
```

### Change Fonts

Update `app/layout.tsx` to use different Google Fonts:

```typescript
import { YourFont } from 'next/font/google'

const yourFont = YourFont({
  subsets: ['latin'],
  variable: '--font-your-font',
})
```

## Adding Real Content

### Replace Placeholder Projects

1. Upload your project images to:
   - Public hosting (Cloudinary, Imgur, etc.)
   - Or add to `/public/images/` directory
2. Update image URLs in `lib/projects.ts`
3. Replace Lorem Ipsum with your actual project descriptions

### Update Contact Info

Replace placeholder links and emails in:
- `app/contact/page.tsx` - Email and scheduling links
- `components/layout/Footer.tsx` - Social media links

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Vercel will auto-detect Next.js and deploy

### Deploy to Other Platforms

This is a standard Next.js app and can be deployed to:
- Netlify
- Cloudflare Pages
- AWS Amplify
- Any Node.js hosting

## Performance Tips

1. Use optimized images (WebP format, compressed)
2. Lazy load images below the fold
3. Keep animations smooth (prefer transform/opacity)
4. Test with Lighthouse for performance scores

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This is a personal portfolio template. Feel free to use and customize it for your own portfolio.

---

Built with ❤️ using Next.js and Framer Motion
