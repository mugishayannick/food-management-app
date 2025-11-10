// Food Management App Types

/**
 * FoodItem Interface - matches the actual API/DB response structure exactly
 */
export interface FoodItem {
  id: string;
  food_name: string;
  food_rating?: number;
  rating?: number;
  food_image?: string;
  Price?: string;
  price?: string;
  restaurant_name?: string;
  name?: string;
  restaurant_status?: "Open Now" | "Closed";
  open?: boolean;
  avatar?: string;
  logo?: string;
  restaurant_image?: string;
  createdAt?: string;
}

export interface FoodFormData {
  food_name: string;
  food_rating: number;
  Price: string;
  food_image: string;
  restaurant_name: string;
  avatar: string;
  restaurant_status: "Open Now" | "Closed";
  open: boolean;
}

export interface FormErrors {
  food_name?: string;
  food_rating?: string;
  Price?: string;
  food_image?: string;
  restaurant_name?: string;
  avatar?: string;
  restaurant_status?: string;
  _general?: string;
}

export type LoadingState = "idle" | "loading" | "success" | "error";
