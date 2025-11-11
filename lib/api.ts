// API utility functions for Food Management App
import axios from "axios";
import { FoodItem, FoodFormData } from "@/types/food";

const API_BASE_URL = "https://6852821e0594059b23cdd834.mockapi.io";

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Food items API endpoints
export const foodApi = {
  // Get all food items
  getAll: async (): Promise<FoodItem[]> => {
    const response = await apiClient.get<FoodItem[]>("/Food");
    return response.data;
  },

  // Search food items by name or food_name
  // API endpoints: /Food?name=[searchParam] and /Food?food_name=[searchParam]
  // Searches both fields to ensure comprehensive results
  search: async (searchParam: string): Promise<FoodItem[]> => {
    if (!searchParam || !searchParam.trim()) {
      throw new Error("Search parameter cannot be empty");
    }

    const trimmedParam = searchParam.trim();
    const encodedParam = encodeURIComponent(trimmedParam);

    // Make parallel API calls to search both 'name' and 'food_name' fields
    const [nameResults, foodNameResults] = await Promise.allSettled([
      apiClient.get<FoodItem[]>(`/Food?name=${encodedParam}`),
      apiClient.get<FoodItem[]>(`/Food?food_name=${encodedParam}`),
    ]);

    // Combine results from both searches
    const allResults: FoodItem[] = [];

    // Process name search results
    if (nameResults.status === "fulfilled") {
      const data = nameResults.value.data || [];
      allResults.push(...data);
    }

    // Process food_name search results
    if (foodNameResults.status === "fulfilled") {
      const data = foodNameResults.value.data || [];
      allResults.push(...data);
    }

    // Remove duplicates based on item ID
    const uniqueResults = Array.from(
      new Map(allResults.map((item) => [item.id, item])).values()
    );

    // If both API calls failed, throw an error
    if (
      nameResults.status === "rejected" &&
      foodNameResults.status === "rejected"
    ) {
      throw new Error(
        "Failed to search food items. Please check your connection and try again."
      );
    }

    return uniqueResults;
  },

  // Get a single food item by ID
  getById: async (id: string): Promise<FoodItem> => {
    const response = await apiClient.get<FoodItem>(`/Food/${id}`);
    return response.data;
  },

  // Create a new food item
  create: async (data: FoodFormData): Promise<FoodItem> => {
    const response = await apiClient.post<FoodItem>("/Food", data);
    return response.data;
  },

  // Update an existing food item
  update: async (id: string, data: FoodFormData): Promise<FoodItem> => {
    const response = await apiClient.put<FoodItem>(`/Food/${id}`, data);
    return response.data;
  },

  // Delete a food item
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/Food/${id}`);
  },
};

// Error handling utility
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message || error.message || "An error occurred"
    );
  }
  return "An unexpected error occurred";
};
