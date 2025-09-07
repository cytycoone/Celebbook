// Simple in-memory storage for celebrities and bookings
interface Celebrity {
  _id: string;
  name: string;
  profession: string;
  imageUrl: string;
  slug: string;
  bio?: string;
  socialMedia?: any;
  pricing?: any;
  featured?: boolean;
}

interface Booking {
  _id: string;
  celebrityId: string;
  service: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: Date;
  amount: number;
  notes: string;
  paymentMethod: string;
  status: string;
  paymentStatus: string;
  metadata: any;
  createdAt: Date;
}

// Sample celebrities data
const celebrities: Celebrity[] = [
  {
    _id: "1",
    name: "Emma Watson",
    profession: "Actress",
    imageUrl: "/celebrities/emma-watson.jpg",
    slug: "emma-watson",
    bio: "British actress and activist, known for her role as Hermione Granger in the Harry Potter series.",
    featured: true,
    pricing: {
      meetGreet: 1000,
      vipCard: { bronze: 100, silver: 250, gold: 500, platinum: 1000 }
    }
  },
  {
    _id: "2", 
    name: "Gordon Ramsay",
    profession: "Chef",
    imageUrl: "/celebrities/gordon-ramsay.jpg",
    slug: "gordon-ramsay",
    bio: "British celebrity chef, restaurateur, and television personality.",
    featured: true,
    pricing: {
      meetGreet: 1500,
      vipCard: { bronze: 150, silver: 300, gold: 600, platinum: 1200 }
    }
  },
  {
    _id: "3",
    name: "Serena Williams", 
    profession: "Athlete",
    imageUrl: "/celebrities/serena-williams.jpg",
    slug: "serena-williams",
    bio: "American former professional tennis player, widely regarded as one of the greatest tennis players of all time.",
    featured: true,
    pricing: {
      meetGreet: 2000,
      vipCard: { bronze: 200, silver: 400, gold: 800, platinum: 1500 }
    }
  },
  {
    _id: "4",
    name: "John Legend",
    profession: "Musician",
    imageUrl: "/celebrities/john-legend.jpg", 
    slug: "john-legend",
    bio: "American singer, songwriter, pianist, and record producer.",
    featured: true,
    pricing: {
      meetGreet: 1800,
      vipCard: { bronze: 180, silver: 350, gold: 700, platinum: 1400 }
    }
  }
];

// In-memory bookings storage
let bookings: Booking[] = [];
let bookingCounter = 1;

export class MemoryStorage {
  // Celebrity methods
  static getAllCelebrities(page = 1, limit = 12) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return {
      celebrities: celebrities.slice(startIndex, endIndex),
      total: celebrities.length,
      page,
      totalPages: Math.ceil(celebrities.length / limit)
    };
  }

  static getFeaturedCelebrities() {
    return celebrities.filter(c => c.featured);
  }

  static getCelebrityById(id: string) {
    return celebrities.find(c => c._id === id);
  }

  static getCelebrityBySlug(slug: string) {
    return celebrities.find(c => c.slug === slug);
  }

  // Booking methods
  static createBooking(bookingData: Partial<Booking>) {
    const newBooking: Booking = {
      _id: bookingCounter.toString(),
      celebrityId: bookingData.celebrityId || '',
      service: bookingData.service || '',
      customerName: bookingData.customerName || '',
      customerEmail: bookingData.customerEmail || '',
      customerPhone: bookingData.customerPhone || '',
      date: bookingData.date || new Date(),
      amount: bookingData.amount || 0,
      notes: bookingData.notes || '',
      paymentMethod: bookingData.paymentMethod || '',
      status: bookingData.status || 'pending',
      paymentStatus: bookingData.paymentStatus || 'pending',
      metadata: bookingData.metadata || {},
      createdAt: new Date()
    };
    
    bookings.push(newBooking);
    bookingCounter++;
    return newBooking;
  }

  static getBookingById(id: string) {
    return bookings.find(b => b._id === id);
  }

  static getAllBookings() {
    return bookings;
  }

  static updateBookingStatus(id: string, status: string, notes?: string) {
    const booking = bookings.find(b => b._id === id);
    if (booking) {
      booking.status = status;
      if (notes) booking.notes = notes;
      if (status === 'completed') booking.paymentStatus = 'paid';
      return booking;
    }
    return null;
  }

  static updateBookingPaymentStatus(id: string, paymentStatus: string) {
    const booking = bookings.find(b => b._id === id);
    if (booking) {
      booking.paymentStatus = paymentStatus;
      return booking;
    }
    return null;
  }
}