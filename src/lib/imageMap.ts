// Centralized image imports for the entire application
// Add all your images here with descriptive names

import eventWorkshop from '@/assets/event-workshop.jpg';
import eventCompetition from '@/assets/event-competition.jpg';
import heroStudents from '@/assets/hero-students.jpg';

// Board members placeholder - add real images here
// Example: import memberSusana from '@/assets/team/susana.jpg';

export const imageMap: Record<string, string> = {
  // Events and courses
  eventWorkshop,
  eventCompetition,
  
  // Hero images
  heroStudents,
  
  // Board members - add real member photos here
  // Example: memberSusana: memberSusana,
  // For now, using emoji fallback handled in the component
};

export const getImage = (imageName: string): string | undefined => {
  return imageMap[imageName];
};
