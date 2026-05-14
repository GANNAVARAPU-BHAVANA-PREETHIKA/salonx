import { Salon, Stylist } from './types';

export const FEATURED_SALONS: Salon[] = [
  {
    id: '1',
    name: "Lumiere Studio",
    address: "Bandra West, Mumbai",
    rating: 4.9,
    distance: "1.2 km",
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800",
    queueCount: 3,
    advanceBookings: 2,
    estimatedWait: 45,
    locationTag: "Bandra",
    availableTimeSlots: ['09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM', '08:00 PM'],
    stylists: []
  },
  {
    id: '2',
    name: "Obsidian Grooming",
    address: "Juhu, Mumbai",
    rating: 4.8,
    distance: "2.4 km",
    imageUrl: "https://images.unsplash.com/photo-1621605815841-aa88c82b0ad2?auto=format&fit=crop&q=80&w=800",
    queueCount: 5,
    advanceBookings: 0,
    estimatedWait: 55,
    locationTag: "Juhu",
    availableTimeSlots: ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '03:00 PM', '05:00 PM', '07:00 PM'],
    stylists: []
  },
  {
    id: '3',
    name: "The Royal Cut",
    address: "Kola, Mumbai",
    rating: 4.7,
    distance: "5.1 km",
    imageUrl: "https://images.unsplash.com/photo-1512690196252-75ca33748281?auto=format&fit=crop&q=80&w=800",
    queueCount: 8,
    advanceBookings: 4,
    estimatedWait: 90,
    locationTag: "Colaba",
    availableTimeSlots: ['11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM', '07:00 PM', '09:00 PM'],
    stylists: []
  },
  {
    id: '4',
    name: "The Gilded Razor",
    address: "Worli, Mumbai",
    rating: 4.8,
    distance: "1.8 km",
    imageUrl: "https://images.unsplash.com/photo-1593702295094-ade341424c68?auto=format&fit=crop&q=80&w=800",
    queueCount: 2,
    advanceBookings: 1,
    estimatedWait: 30,
    locationTag: "Worli",
    availableTimeSlots: ['10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM'],
    stylists: []
  },
  {
    id: '5',
    name: "Empire Grooming",
    address: "Powai, Mumbai",
    rating: 4.6,
    distance: "4.5 km",
    imageUrl: "https://images.unsplash.com/photo-1512690196252-720da578d40a?auto=format&fit=crop&q=80&w=800",
    queueCount: 6,
    advanceBookings: 3,
    estimatedWait: 75,
    locationTag: "Powai",
    availableTimeSlots: ['09:30 AM', '11:00 AM', '01:00 PM', '03:30 PM', '06:00 PM', '08:30 PM'],
    stylists: []
  },
  {
    id: '6',
    name: "Velvet & Steel",
    address: "Lokhandwala, Mumbai",
    rating: 4.9,
    distance: "3.2 km",
    imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800",
    queueCount: 1,
    advanceBookings: 2,
    estimatedWait: 15,
    locationTag: "Andheri",
    availableTimeSlots: ['10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'],
    stylists: []
  },
  {
    id: '7',
    name: "The Royal Quarters",
    address: "Nariman Point, Mumbai",
    rating: 4.7,
    distance: "5.1 km",
    imageUrl: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=800",
    queueCount: 4,
    advanceBookings: 5,
    estimatedWait: 50,
    locationTag: "Colaba",
    availableTimeSlots: ['10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM'],
    stylists: []
  }
];

export const TRENDING_STYLISTS: Stylist[] = [
  {
    id: 's1',
    name: "Maya Sharma",
    specialty: "Fade Master",
    rating: 4.9,
    reviews: 128,
    experience: "8 Yrs",
    imageUrl: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=400",
    portfolio: [],
    isVerified: true,
    pricePerHour: 1500,
    location: "Bandra West"
  },
  {
    id: 's2',
    name: "Vikram Raj",
    specialty: "Editorial Hair",
    rating: 5.0,
    reviews: 84,
    experience: "12 Yrs",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1fb727ef23?auto=format&fit=crop&q=80&w=400",
    portfolio: [],
    isVerified: true,
    pricePerHour: 2500,
    location: "Juhu"
  },
  {
    id: 's3',
    name: "Elena Rodriguez",
    specialty: "Master Colorist",
    rating: 4.8,
    reviews: 210,
    experience: "10 Yrs",
    imageUrl: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=400",
    portfolio: [],
    isVerified: true,
    pricePerHour: 3200,
    location: "South Mumbai"
  },
  {
    id: 's4',
    name: "Zayn Malik",
    specialty: "Texture Artist",
    rating: 4.7,
    reviews: 156,
    experience: "6 Yrs",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
    portfolio: [],
    isVerified: false,
    pricePerHour: 1200,
    location: "Andheri East"
  }
];
