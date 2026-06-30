export interface EventItem {
  id: string;
  title: string;
  type: 'concert' | 'lecture' | 'masterclass' | 'international';
  date: string;
  time: string;
  venue: string;
  city: string;
  status: 'upcoming' | 'soldout' | 'completed';
  description: string;
  ticketLink?: string;
}

export interface TrackItem {
  id: string;
  title: string;
  duration: string;
  description: string;
  era: 'traditional' | 'modern' | 'orchestra';
  story?: string;
  audioUrl?: string; // We can use mock or royalty-free, or generate synthesized tones
}

export interface VideoItem {
  id: string;
  title: string;
  duration: string;
  venue: string;
  date: string;
  coverUrl: string;
  videoUrl: string;
  description: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  category: 'performance' | 'academic' | 'media';
  imageUrl?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  content: string;
  date: string;
  status: 'pending' | 'replied';
}
