export interface PhotoItem {
  id: string;
  url: string;
  title: string;
  caption: string;
  date: string;
  category: 'trips' | 'everyday' | 'celebrations' | 'favorites';
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}

export interface MilestoneItem {
  id: string;
  year: string;
  date: string;
  title: string;
  description: string;
  tag: string;
  iconName: string;
  location?: string;
}

export interface BirthdayConfig {
  recipientName: string;
  nickName: string;
  birthDate: string; // YYYY-MM-DD
  headline: string;
  subheadline: string;
  loveLetterTitle: string;
  loveLetterContent: string[];
  loveLetterSender: string;
  wishesPrompt: string;
  defaultWishes: string[];
  gallery: PhotoItem[];
  timeline: MilestoneItem[];
}

export const birthdayData: BirthdayConfig = {
  recipientName: "Sophia",
  nickName: "Soph",
  birthDate: "2026-07-23", // Today!
  headline: "Celebrating the Most Extraordinary Soul",
  subheadline: "A journey through unforgettable memories, endless laughs, and infinite love.",
  loveLetterTitle: "To My Dearest Sophia,",
  loveLetterContent: [
    "From the very first moment our paths crossed, you brought an unmistakable light and warmth into my world that transformed everything.",
    "Every laughter we've shared, every quiet late-night conversation, and every spontaneous adventure has become a cherished chapter in my heart.",
    "Today, on your birthday, I want to remind you of how deeply loved, admired, and appreciated you are—not just today, but every single day.",
    "May this year bring you all the magic, joy, success, and boundless happiness that your incredible heart brings to everyone around you."
  ],
  loveLetterSender: "Forever & Always ❤️",
  wishesPrompt: "Leave a special birthday wish for Sophia!",
  defaultWishes: [
    "✨ May all your wildest dreams come true this year!",
    "🎂 Wishing you a year filled with endless adventures & joy!",
    "💖 Keep shining bright, wonderful soul!",
    "🌸 Happy Birthday to the most amazing person ever!"
  ],
  gallery: [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
      title: "Sunset Serenade",
      caption: "Golden hour glow on our favorite beach walk.",
      date: "August 2025",
      category: "trips",
      aspectRatio: "portrait"
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      title: "Laughter in the Park",
      caption: "Spontaneous picnics and sunny afternoon smiles.",
      date: "October 2025",
      category: "everyday",
      aspectRatio: "square"
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
      title: "Midnight Celebration",
      caption: "Sparklers, wishes, and unforgettable cake moments.",
      date: "New Year 2026",
      category: "celebrations",
      aspectRatio: "landscape"
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
      title: "Cozy Coffee Dates",
      caption: "Endless conversations over hot chocolate.",
      date: "December 2025",
      category: "favorites",
      aspectRatio: "portrait"
    },
    {
      id: "5",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      title: "Mountain Getaway",
      caption: "Breathtaking views and crisp mountain air.",
      date: "May 2025",
      category: "trips",
      aspectRatio: "square"
    },
    {
      id: "6",
      url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
      title: "Starlit Nights",
      caption: "Underneath a sky full of stars dreaming together.",
      date: "June 2025",
      category: "favorites",
      aspectRatio: "portrait"
    }
  ],
  timeline: [
    {
      id: "t1",
      year: "2023",
      date: "The First Spark",
      title: "Where It All Began",
      description: "Our paths crossed for the first time. One conversation led to hours of non-stop talking.",
      tag: "Beginning",
      iconName: "Sparkles",
      location: "Central Café"
    },
    {
      id: "t2",
      year: "2024",
      date: "First Big Trip",
      title: "Chasing Horizons Together",
      description: "Packed our bags and explored coastal towns, capturing unforgettable sunsets.",
      tag: "Adventure",
      iconName: "Compass",
      location: "Coastal Highway"
    },
    {
      id: "t3",
      year: "2025",
      date: "Uncountable Smiles",
      title: "Building Our Sanctuary",
      description: "From cozy rainy day movie marathons to celebrating every small win together.",
      tag: "Milestone",
      iconName: "Heart",
      location: "Home Sweet Home"
    },
    {
      id: "t4",
      year: "2026",
      date: "Today & Beyond",
      title: "Another Glorious Chapter",
      description: "Today we celebrate YOU! Wishing for a year as luminous and enchanting as your soul.",
      tag: "Celebration",
      iconName: "Gift",
      location: "Under the Birthday Sky"
    }
  ]
};
