/**
 * Fallback image URLs for when API images are missing
 */

export const FALLBACK_IMAGES = {
  food: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
  restaurant:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
};

/**
 * Gets fallback image URL for food items
 */
export const getFoodImage = (imageUrl?: string): string => {
  if (!imageUrl || imageUrl.trim() === "") {
    return FALLBACK_IMAGES.food;
  }
  return imageUrl;
};

/**
 * Gets fallback image URL for restaurant logos
 */
export const getRestaurantLogo = (
  avatar?: string,
  logo?: string,
  restaurant_image?: string
): string => {
  const imageUrl = avatar || logo || restaurant_image;
  if (!imageUrl || imageUrl.trim() === "") {
    return FALLBACK_IMAGES.restaurant;
  }
  return imageUrl;
};
