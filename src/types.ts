export interface Stylist {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: string;
  imageUrl: string;
  portfolio: string[];
  isVerified?: boolean;
  pricePerHour?: number;
  location?: string;
}

export interface Salon {
  id: string;
  name: string;
  address: string;
  rating: number;
  distance: string;
  imageUrl: string;
  queueCount: number;
  estimatedWait: number;
  advanceBookings: number;
  locationTag: string;
  stylists: Stylist[];
  availableTimeSlots?: string[];
}

export interface UserSubscription {
  tier: 'basic' | 'standard' | 'premium';
  status: 'active' | 'expired';
}
