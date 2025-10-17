// Centralized image handling for the entire application
// This file automatically imports images from the assets folder based on file paths

const imageModules = import.meta.glob('@/assets/**/*.{png,jpg,jpeg,svg,webp}', { eager: true });

/**
 * Get an image by its path relative to src/
 * Example: getImage('assets/event-workshop.jpg') or getImage('assets/team/member1.png')
 */
export const getImage = (imagePath: string): string | undefined => {
  // If it's an emoji or external URL, return as is
  if (!imagePath || imagePath.startsWith('http') || imagePath.startsWith('👤') || imagePath.length < 10) {
    return imagePath;
  }

  // Normalize the path: remove leading slash if present and ensure it starts with 'assets/'
  let normalizedPath = imagePath.replace(/^\/+/, '');
  if (!normalizedPath.startsWith('assets/')) {
    normalizedPath = `assets/${normalizedPath}`;
  }

  // Try to find the image in the imported modules
  const fullPath = `/@/assets/${normalizedPath.replace('assets/', '')}`;
  
  for (const [path, module] of Object.entries(imageModules)) {
    if (path.includes(normalizedPath.replace('assets/', ''))) {
      return (module as any).default;
    }
  }

  console.warn(`Image not found: ${imagePath}`);
  return undefined;
};
