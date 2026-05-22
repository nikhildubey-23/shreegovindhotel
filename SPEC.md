# Hotel O Shri Govind - Luxury Hotel Website Specification

## Project Overview
- **Project Name**: Hotel O Shri Govind - A Luxury Hotel Website
- **Type**: Multi-page luxury hotel website
- **Core Functionality**: Premium hotel website showcasing luxury accommodations, facilities, and enabling bookings
- **Target Users**: Affluent travelers seeking luxury accommodation

---

## UI/UX Specification

### Layout Structure

**Global Layout**
- Fixed navbar with glassmorphism effect (backdrop-blur)
- Full-width sections with max-width container (1440px)
- Footer with 4-column layout

**Responsive Breakpoints**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Visual Design

**Color Palette**
- Primary Gold: #C9A962
- Secondary Gold: #D4AF37
- Deep Black: #0D0D0D
- Rich Black: #1A1A1A
- Pure White: #FFFFFF
- Off White: #F5F5F5
- Text Gray: #666666
- Border Gray: #333333

**Typography**
- Headings: Playfair Display (serif) - elegant luxury feel
- Body: Inter (sans-serif) - clean readability
- Hero Title: 72px desktop / 40px mobile
- Section Titles: 48px desktop / 32px mobile
- Body Text: 16px / 18px
- Small Text: 14px

**Spacing System**
- Section Padding: 120px vertical desktop / 60px mobile
- Container Padding: 24px horizontal
- Card Gap: 32px
- Element Gap: 16px / 24px

**Visual Effects**
- Glassmorphism: background rgba(255,255,255,0.05), backdrop-blur(20px), border 1px solid rgba(255,255,255,0.1)
- Gradient overlays: linear-gradient(135deg, rgba(201,169,98,0.1), transparent)
- Box shadows: 0 25px 50px -12px rgba(0,0,0,0.5)
- Hover transitions: 0.4s cubic-bezier(0.4, 0, 0.2, 1)

### Components

**Navbar**
- Logo (left)
- Navigation links (center): Home, About, Rooms, Gallery, Contact
- "Book Now" CTA button (right)
- Mobile: Hamburger menu with slide-in drawer
- States: Scrolled (darker background), Default (transparent)

**Hero Section**
- Full viewport height
- Background: High-quality hotel image with gradient overlay
- Centered content with animated title
- Scroll indicator at bottom

**Room Cards**
- Image with zoom on hover (scale 1.1)
- Glassmorphism overlay at bottom
- Room type badge (Gold)
- Price display
- "View Details" button
- Hover: lift effect with shadow

**Facility Cards**
- Icon (gold)
- Title
- Description
- Hover: icon scale, color change

**Testimonial Cards**
- Quote icon
- Customer photo (circular)
- Name and location
- Rating stars (gold)
- Text

**Gallery Grid**
- Masonry layout
- Image hover: zoom + overlay with icon
- Lightbox on click

**Buttons**
- Primary: Gold background, black text, hover: scale 1.05
- Secondary: Transparent with gold border, hover: gold background
- Border radius: 0 (sharp luxury feel) or 4px

**Form Inputs**
- Dark background (#1A1A1A)
- Gold border on focus
- Floating labels
- Validation states

---

## Functionality Specification

### Pages

#### 1. Home Page

**Hero Section**
- Background: Luxury hotel interior image (placeholder)
- Animated text reveal: "Luxury Stay Experience"
- Tagline: "Where Elegance Meets Comfort"
- Book Now button with pulse animation
- Scroll indicator with bounce animation

**Highlights Section**
- 4 cards: Premium Rooms, Fine Dining, Spa & Wellness, 24/7 Service
- Counter animation on scroll
- Icons with hover effects

**Room Preview Section**
- 3 featured rooms (one of each type)
- Section title: "Luxurious Accommodations"
- "View All Rooms" link

**Facilities Section**
- 6 facilities: Swimming Pool, Restaurant, Spa, Gym, Conference Hall, Room Service
- Grid layout (3x2 desktop, 2x3 tablet, 1x6 mobile)

**Testimonials Section**
- 3 testimonial cards
- Auto-scroll or manual navigation

**Gallery Preview**
- 6 images in grid
- "View All" link to Gallery page

**Contact Section**
- Brief contact info
- CTA to Contact page

#### 2. About Page

**Hero Banner**
- Smaller hero with title "About Us"
- Background image with overlay

**Introduction Section**
- Hotel story
- Mission statement
- Image + text layout

**Luxury Experience Section**
- What sets us apart
- 4 key differentiators

**Timeline Section**
- Animated vertical timeline
- Key milestones (Hotel establishment, Renovations, Awards)

#### 3. Rooms Page

**Hero Banner**
- Title: "Our Rooms & Suites"
- Subtitle: "Experience unparalleled comfort"

**Room Categories**
- Tab navigation: All, Classic/Non AC, Deluxe/AC, Suite
- Filter animation

**Room Grid**
- 12 room cards total

**Room Types & Details**
1. Classic / Non AC (3 rooms: 101, 102, 103)
   - Starting Price: ₹1,500/night
   - Amenities: WiFi, TV, Clean Bedding, Attached Bathroom
   - Size: 200 sq ft

2. Deluxe / AC (6 rooms: 201, 202, 203, 301, 302, 303)
   - Starting Price: ₹2,500/night
   - Amenities: WiFi, TV, AC, Mini Fridge, Room Service, Safe
   - Size: 300 sq ft

3. Triple Bed Suite (3 rooms: 401, 402, 403)
   - Starting Price: ₹4,000/night
   - Amenities: WiFi, TV, AC, Living Area, Mini Fridge, Premium Bath, Balcony
   - Size: 450 sq ft

**Room Cards**
- Image
- Room number badge
- Type badge
- Amenities icons
- Price
- Book Now button

**Room Modal**
- Full details
- Image gallery
- Amenities list
- Booking CTA

#### 4. Gallery Page

**Hero Banner**
- Title: "Our Gallery"
- Subtitle: "Capturing moments of luxury"

**Filter Tabs**
- All, Rooms, Restaurant, Facilities, Exterior

**Masonry Grid**
- 12+ images
- Responsive columns (4 desktop, 3 tablet, 2 mobile)

**Lightbox**
- Full-screen image
- Navigation arrows
- Close button
- Image counter

#### 5. Contact Page

**Hero Banner**
- Title: "Contact Us"
- Subtitle: "We'd love to hear from you"

**Two Column Layout**
- Left: Contact form
  - Name (required)
  - Email (required)
  - Phone (required)
  - Check-in Date
  - Check-out Date
  - Room Type (dropdown)
  - Guests (number)
  - Message
  - Submit button

- Right: Contact Information
  - Address
  - Phone numbers
  - Email
  - GSTIN: 22AATFH3393Q1ZL

**Map Section**
- Embedded Google Map (placeholder)
- Location details

---

## Animations Specification

### Page Transitions
- Fade in/out between pages
- Duration: 0.5s

### Scroll Reveal
- Elements fade in and slide up on scroll
- Stagger delay: 0.1s between items
- Trigger: 20% in viewport

### Hero Animations
- Title: Letter-by-letter reveal (0.05s per letter)
- Subtitle: Fade up with delay
- Button: Scale in with delay

### Hover Animations
- Cards: translateY(-10px), shadow increase
- Images: scale(1.1)
- Buttons: scale(1.05)
- Links: color transition to gold

### Parallax
- Hero background: subtle parallax on scroll
- Speed: 0.5

### Floating Elements
- Decorative gold circles/shapes
- Slow float animation (20s duration)
- Opacity: 0.1

### Counter Animation
- Numbers count up from 0
- Duration: 2s
- Easing: ease-out

---

## Technical Implementation

### Tech Stack
- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion
- TypeScript

### Project Structure
```
/app
  /layout.tsx
  /page.tsx (Home)
  /about/page.tsx
  /rooms/page.tsx
  /gallery/page.tsx
  /contact/page.tsx
/components
  /Navbar.tsx
  /Footer.tsx
  /Hero.tsx
  /RoomCard.tsx
  /GalleryModal.tsx
  /RoomModal.tsx
  /Animations.tsx
/lib
  /data.ts (rooms, facilities, etc.)
/public
  /images (placeholder)
```

### Image Sources (Placeholder)
- Use Unsplash for high-quality hotel images
- Keywords: luxury hotel, hotel room, hotel lobby, hotel pool, hotel restaurant

---

## Acceptance Criteria

### Visual Checkpoints
- [ ] Gold, black, white color scheme consistently applied
- [ ] Playfair Display font for headings
- [ ] Glassmorphism effects visible on cards
- [ ] Smooth hover animations on all interactive elements
- [ ] Responsive on mobile, tablet, desktop

### Functionality Checkpoints
- [ ] All 5 pages navigable
- [ ] Room filtering works
- [ ] Gallery lightbox opens/closes
- [ ] Contact form has validation
- [ ] Mobile menu works

### Animation Checkpoints
- [ ] Page transitions smooth
- [ ] Scroll reveal animations trigger
- [ ] Hero text animations play on load
- [ ] Hover effects smooth (no jank)
- [ ] Parallax effect visible

### Performance
- [ ] Page loads without errors
- [ ] No console errors
- [ ] Images load properly
