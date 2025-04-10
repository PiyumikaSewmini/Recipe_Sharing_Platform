// src/utils/recipeUtils.ts

/**
 * Extracts the number of minutes from a cooking instruction
 * @param instruction The cooking instruction text
 * @returns The number of minutes found in the instruction, or null if not found
 */
export const extractTimerMinutes = (instruction: string): number | null => {
    const timePatterns = [
      /(\d+)(?:-\d+)?\s*minutes?/i,
      /(\d+)(?:-\d+)?\s*mins?/i,
      /for\s*(\d+)(?:-\d+)?\s*(?:minutes?|mins?)/i,
    ];
  
    for (const pattern of timePatterns) {
      const match = instruction.match(pattern);
      if (match && match[1]) return parseInt(match[1], 10);
    }
    return null;
  };
  
  /**
   * Maps recipe image paths to their corresponding imported assets
   * @param imagePath The path to the recipe image
   * @returns The appropriate image source
   */
  export const getImagePath = (imagePath: string, imageAssets: Record<string, string>): string => {
    // If it's a data URL, return it directly
    if (imagePath.startsWith('data:image')) return imagePath;
    
    // Check if path matches any of the keys in the assets
    for (const [key, value] of Object.entries(imageAssets)) {
      if (imagePath.includes(key)) return value;
    }
    
    // Return placeholder if no match found
    return 'https://via.placeholder.com/500x350?text=Food+Image';
  };
  
  /**
   * Formats seconds into MM:SS format
   * @param seconds The number of seconds to format
   * @returns Formatted time string in MM:SS format
   */
  export const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };