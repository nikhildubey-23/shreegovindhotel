export interface Room {
  id: number;
  type: "Classic" | "Standard" | "Suite";
  floor: string;
  price: number;
  size: string;
  amenities: string[];
  description: string;
  images: string[];
  available: boolean;
}

export interface Facility {
  id: number;
  name: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
  image: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  category: string;
  alt: string;
}

export const rooms: Room[] = [
  {
    id: 1,
    type: "Classic",
    floor: "Ground Floor",
    price: 1000,
    size: "200 sq ft",
    amenities: ["WiFi", "TV", "Cooler","Clean Bedding"],
    description: "A cozy haven thoughtfully appointed with every essential comfort, where simplicity meets serene elegance for a truly restful retreat.",
    images: ["/nonac.png", "/nonac2.png", "/nonac3.png", "/washroom.png"],
    available: true,
  },
  {
    id: 2,
    type: "Standard",
    floor: "1st Floor",
    price: 1500,
    size: "300 sq ft",
    amenities: ["WiFi", "TV", "AC", "Mini Fridge", "Room Service", "Safe"],
    description: "An expansive air-conditioned sanctuary adorned with modern elegance, featuring premium amenities and meticulous attention to every detail.",
    images: ["/singlebed.jpeg", "/singlebed2.jpeg", "/singlebed (2).jpeg", "/washroom.png"],
    available: true,
  },
  {
    id: 3,
    type: "Suite",
    floor: "3rd Floor",
    price: 2000,
    size: "450 sq ft",
    amenities: ["WiFi", "TV", "AC", "Living Area", "Mini Fridge", "Premium Bath", "Balcony"],
    description: "Our crowning jewel — a palatial triple-bed suite with a private living area, opulent bathroom, and a balcony overlooking serene vistas, where grandeur knows no bounds.",
    images: ["/doublebed.jpeg", "/doublebed (2).jpeg", "/doublebed.png", "/washroom1.png"],
    available: true,
  },
];

export const facilities: Facility[] = [
  {
    id: 1,
    name: "AC",
    description: "Perfect climate control in every room, ensuring your comfort in every season.",
    icon: "❄️",
  },
  {
    id: 2,
    name: "Free Wifi",
    description: "Seamlessly connected with blazing-fast internet, available throughout the entire estate.",
    icon: "📶",
  },
  {
    id: 3,
    name: "TV",
    description: "Flat-screen TVs with premium channels for your entertainment.",
    icon: "📺",
  },
  {
    id: 4,
    name: "Geyser",
    description: "24/7 hot water supply available in all attached bathrooms.",
    icon: "🚿",
  },
  {
    id: 5,
    name: "Power backup",
    description: "Uninterrupted power supply to ensure your comfort never stops.",
    icon: "⚡",
  },
  {
    id: 6,
    name: "Elevator",
    description: "Easy access to all floors with our modern and safe lift facility.",
    icon: "🛗",
  },
  {
    id: 7,
    name: "In-built Kitchen",
    description: "Guest kitchen facilities available for self-cooking needs.",
    icon: "🍳",
  },
  {
    id: 8,
    name: "Parking",
    description: "Secure parking space available for all guests.",
    icon: "🅿️",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sameer Takri",
    location: "",
    text: "All god. The room is nice , Cleanliness is also taken good care of.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
  },
  {
    id: 2,
    name: "Vijay Dewangan",
    location: "",
    text: "Best hotel in Bilaspur.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
  },
  {
    id: 3,
    name: "Kashyap Art",
    location: "",
    text: "Very nice service. Receptionist (sajan) id a very good guy.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
  },
  {
    id: 4,
    name: "Debashish Nayak",
    location: "",
    text: "Very clean.. great place to stay.... staffs are also very supportive...",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
  },
  {
    id: 5,
    name: "Sajan kumar",
    location: "",
    text: "I love tha stay",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
  },
  {
    id: 6,
    name: "Mohammad Iqbal",
    location: "",
    text: "Shree govind hotel is excellent; the rooms here are airy and spacious, and the toilets and bathrooms are clean and hygienic.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
  },
];

export const galleryImages: GalleryImage[] = [
  { id: 1, src: "/mainimg.png", category: "Exterior", alt: "Hotel Main Building Exterior" },
  { id: 2, src: "/corridor1.png", category: "Facilities", alt: "Luxury Hotel Corridor" },
  { id: 3, src: "/recept.png", category: "Facilities", alt: "Modern Hotel Reception" },
  { id: 4, src: "/recept1.png", category: "Rooms", alt: "Premium AC Room" },
  { id: 5, src: "/classic1.png", category: "Rooms", alt: "Classic Deluxe Room" },
  { id: 6, src: "/doublebed.jpeg", category: "Rooms", alt: "Double Bed Suite" },
  { id: 7, src: "/doublebed (2).jpeg", category: "Rooms", alt: "Double bed room" },
  { id: 8, src: "/singlebed.jpeg", category: "Rooms", alt: "AC Guest Room Interior" },
  { id: 9, src: "/washroom1.png", category: "Facilities", alt: "Modern Clean Washroom" },
  { id: 10, src: "/singlebed4.jpeg", category: "Rooms", alt: "Standard Bedroom" },
  { id: 11, src: "/singlebed2.jpeg", category: "Rooms", alt: "Executive AC Room" },
  { id: 12, src: "/main1.png", category: "Exterior", alt: "Hotel Front View" },
  { id: 13, src: "/doublebed.png", category: "Rooms", alt: "Spacious Double Bedroom" },
  { id: 14, src: "/washroom.png", category: "Facilities", alt: "Modern Clean Washroom" },
];

export const highlights = [
  { id: 1, number: 12, label: "Premium Rooms", suffix: "" },
  { id: 2, number: 8, label: "World-Class Facilities", suffix: "" },
  { id: 3, number: 24, label: "Hours Service", suffix: "/7" },
  { id: 4, number: 98, label: "Customer Satisfaction", suffix: "%" },
];