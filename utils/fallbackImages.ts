/**
 * Fallback image URLs for when API images are missing
 */

export const FALLBACK_IMAGES = {
  food: "/img/Indian_spicy_soup.png",
  restaurant: "/logo/restaurant-logo.png",
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
