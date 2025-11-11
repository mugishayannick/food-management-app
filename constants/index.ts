/**
 * Application-wide constants
 * Centralizes magic numbers, strings, and configuration values
 */

/**
 * Color constants - Use Tailwind classes instead of these for styling
 * These are kept for reference and programmatic use (e.g., inline styles)
 *
 * For Tailwind classes, use:
 * - primary -> bg-primary, text-primary, border-primary
 * - primary-hover -> hover:bg-primary-hover
 * - secondary -> bg-secondary, text-secondary
 * - hero -> bg-hero
 * - tab-active -> text-tab-active, bg-tab-active-bg
 * - etc.
 */
export const COLORS = {
  primary: "#f17228",
  primaryHover: "#e06520",
  secondary: "#ffb30e",
  hero: "#FF9900",
  tabActive: "#FF7A45",
  tabActiveBg: "#FFF0EB",
  tabInactive: "#4A4A4A",
  tabInactiveIcon: "#757575",
  searchInputBg: "#F5F5F5",
  searchPlaceholder: "#A0A0A0",
  buttonCoral: "#FF6B4A",
  statusOpen: "#79b93c",
  statusClosed: "#f17228",
  statusOpenBg: "rgba(121,185,60,0.2)",
  statusClosedBg: "rgba(241,114,40,0.2)",
  error: "#ff3b30",
  textPrimary: "#212121",
  textSecondary: "#424242",
  textTertiary: "#757575",
  border: "#EEEEEE",
  white: "#FFFFFF",
  black: "#000000",
} as const;

// Restaurant Status
export const RESTAURANT_STATUS = {
  OPEN: "Open Now",
  CLOSED: "Closed",
} as const;

export type RestaurantStatus =
  (typeof RESTAURANT_STATUS)[keyof typeof RESTAURANT_STATUS];

// Validation
export const VALIDATION = {
  RATING_MIN: 1,
  RATING_MAX: 5,
  RATING_STEP: 0.1,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  FOOD_NAME_REQUIRED: "Food Name is required",
  FOOD_RATING_INVALID: "Food Rating must be a number",
  FOOD_IMAGE_REQUIRED: "Food Image URL is required",
  FOOD_PRICE_REQUIRED: "Food Price is required",
  RESTAURANT_NAME_REQUIRED: "Restaurant Name is required",
  RESTAURANT_LOGO_REQUIRED: "Restaurant Logo URL is required",
  RESTAURANT_STATUS_INVALID: "Restaurant Status must be 'Open Now' or 'Closed'",
  SAVE_FAILED: "Failed to save food item. Please try again.",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  FOOD_ADDED: "Food item added successfully!",
  FOOD_UPDATED: "Food item updated successfully!",
  FOOD_DELETED: "Food item deleted successfully!",
} as const;

// Loading Messages
export const LOADING_MESSAGES = {
  DELETING: "Deleting food item...",
  ADDING: "Adding Food...",
  UPDATING: "Updating Food...",
  SEARCHING: "Searching...",
} as const;
