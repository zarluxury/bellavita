// Google Reviews API helper functions

export interface GoogleReview {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  text: string;
  relative_time_description: string;
  time: number;
}

export interface PlaceInfo {
  name: string;
  formatted_address: string;
  rating: number;
  user_ratings_total: number;
}

export interface ReviewsResponse {
  success: boolean;
  placeInfo: PlaceInfo;
  reviews: GoogleReview[];
}

// Mock data for development/testing
export const mockGoogleReviews: ReviewsResponse = {
  success: true,
  placeInfo: {
    name: "Bellavita Smart Homes",
    formatted_address: "123 Luxury Ave, Beverly Hills, CA 90210",
    rating: 4.8,
    user_ratings_total: 127
  },
  reviews: [
    {
      author_name: "Sarah Johnson",
      profile_photo_url: "https://picsum.photos/seed/sarah/100/100.jpg",
      rating: 5,
      text: "Absolutely incredible experience with Bellavita! The smart home features are beyond impressive. The team was professional, knowledgeable, and delivered exactly what we wanted. Our home automation system works flawlessly.",
      relative_time_description: "2 weeks ago",
      time: Date.now() - (14 * 24 * 60 * 60 * 1000)
    },
    {
      author_name: "Michael Chen",
      profile_photo_url: "https://picsum.photos/seed/michael/100/100.jpg",
      rating: 5,
      text: "Bellavita transformed our house into a true smart home. The attention to detail and quality of installation is outstanding. Highly recommend their services!",
      relative_time_description: "1 month ago",
      time: Date.now() - (30 * 24 * 60 * 60 * 1000)
    },
    {
      author_name: "Emily Rodriguez",
      profile_photo_url: "https://picsum.photos/seed/emily/100/100.jpg",
      rating: 4,
      text: "Great service and amazing products. The smart lighting system has completely changed our home ambiance. Only minor issue was installation delay, but overall very satisfied.",
      relative_time_description: "3 weeks ago",
      time: Date.now() - (21 * 24 * 60 * 60 * 1000)
    },
    {
      author_name: "David Thompson",
      profile_photo_url: "https://picsum.photos/seed/david/100/100.jpg",
      rating: 5,
      text: "Professional team, excellent products, and outstanding customer support. Our home security system integration was seamless. Worth every penny!",
      relative_time_description: "1 month ago",
      time: Date.now() - (35 * 24 * 60 * 60 * 1000)
    },
    {
      author_name: "Lisa Anderson",
      profile_photo_url: "https://picsum.photos/seed/lisa/100/100.jpg",
      rating: 5,
      text: "The smart home solutions provided by Bellavita are cutting-edge. The voice control integration works perfectly with all our devices. Very impressed!",
      relative_time_description: "2 weeks ago",
      time: Date.now() - (16 * 24 * 60 * 60 * 1000)
    },
    {
      author_name: "Robert Wilson",
      profile_photo_url: "https://picsum.photos/seed/robert/100/100.jpg",
      rating: 4,
      text: "Excellent quality products and installation. The team was very thorough in explaining all features. Our home automation system works like a dream.",
      relative_time_description: "3 weeks ago",
      time: Date.now() - (23 * 24 * 60 * 60 * 1000)
    },
    {
      author_name: "Jennifer Martinez",
      profile_photo_url: "https://picsum.photos/seed/jennifer/100/100.jpg",
      rating: 5,
      text: "Outstanding service from start to finish! The Bellavita team helped us design the perfect smart home system. The automation features have made our daily life so much easier.",
      relative_time_description: "1 week ago",
      time: Date.now() - (7 * 24 * 60 * 60 * 1000)
    },
    {
      author_name: "Christopher Lee",
      profile_photo_url: "https://picsum.photos/seed/christopher/100/100.jpg",
      rating: 5,
      text: "Bellavita exceeded our expectations in every way. The smart home integration is seamless and the user interface is incredibly intuitive. Highly recommended!",
      relative_time_description: "2 weeks ago",
      time: Date.now() - (12 * 24 * 60 * 60 * 1000)
    }
  ]
};

// Function to fetch Google Reviews from API
export async function fetchGoogleReviews(): Promise<ReviewsResponse> {
  try {
    const response = await fetch('/api/google-reviews');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    // Return mock data as fallback
    return mockGoogleReviews;
  }
}

// Function to format review text
export function formatReviewText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Note: This function should be used within React components
// Import Star from lucide-react in your component and use this logic
export function getStarRatingClasses(rating: number, index: number): string {
  return `w-4 h-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`;
}
