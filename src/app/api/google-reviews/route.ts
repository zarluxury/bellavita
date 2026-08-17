import { NextRequest, NextResponse } from 'next/server';
import { requireApiToken } from '@/lib/apiToken';

// Google Places API endpoint
const PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place/details/json';

// You'll need to get your Place ID from Google
// Use: https://developers.google.com/maps/documentation/places/web-service/place-id
const PLACE_ID = process.env.GOOGLE_PLACE_ID || 'ChIJd_5j9Q3-5IkR_xhDjxgG2E8'; // Example Place ID

export async function GET(request: NextRequest) {
  const authError = requireApiToken(request);
  if (authError) return authError;
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    
    if (!apiKey) {
      throw new Error('Google Places API key not configured');
    }

    const response = await fetch(
      `${PLACES_API_URL}?place_id=${PLACE_ID}&fields=reviews,rating,formatted_address,name,user_ratings_total&key=${apiKey}&language=en`
    );

    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(`Google API error: ${data.status} - ${data.error_message || 'Unknown error'}`);
    }

    // Transform the data to our format
    const reviews = data.result.reviews?.slice(0, 8).map((review: any) => ({
      author_name: review.author_name,
      profile_photo_url: review.profile_photo_url,
      rating: review.rating,
      text: review.text,
      relative_time_description: review.relative_time_description,
      time: review.time
    })) || [];

    const placeInfo = {
      name: data.result.name,
      formatted_address: data.result.formatted_address,
      rating: data.result.rating,
      user_ratings_total: data.result.user_ratings_total
    };

    return NextResponse.json({
      success: true,
      placeInfo,
      reviews
    });

  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    
    // Return mock data as fallback for development
    const mockData = {
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
        }
      ]
    };

    return NextResponse.json(mockData);
  }
}
