import { FoodItem } from "@/types/food";
import { RESTAURANT_STATUS } from "@/constants";

/**
 * Helper functions for normalizing and extracting food item data
 * Centralizes logic for handling API response variations
 */

/**
 * Gets the price from a food item, handling both Price and price fields
 */
export const getFoodPrice = (item: FoodItem): string => {
  return item.Price || item.price || "0.00";
};

/**
 * Gets the rating from a food item, handling both food_rating and rating fields
 */
export const getFoodRating = (item: FoodItem): number => {
  return item.food_rating || item.rating || 0;
};

/**
 * Gets the restaurant name from a food item
 */
export const getRestaurantName = (item: FoodItem): string => {
  return item.restaurant_name || item.name || "";
};

/**
 * Gets the restaurant logo URL from a food item
 */
export const getRestaurantLogoUrl = (item: FoodItem): string => {
  return item.avatar || item.logo || item.restaurant_image || "";
};

/**
 * Gets the restaurant status from a food item
 */
export const getRestaurantStatus = (
  item: FoodItem
): (typeof RESTAURANT_STATUS)[keyof typeof RESTAURANT_STATUS] | null => {
  if (item.restaurant_status) {
    return item.restaurant_status as (typeof RESTAURANT_STATUS)[keyof typeof RESTAURANT_STATUS];
  }
  if (item.open !== undefined) {
    return item.open ? RESTAURANT_STATUS.OPEN : RESTAURANT_STATUS.CLOSED;
  }
  return null;
};

/**
 * Gets the food name from a food item
 */
export const getFoodName = (item: FoodItem): string => {
  return item.food_name || item.name || "Unnamed Food";
};
