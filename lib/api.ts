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

  // Search food items by name
  search: async (searchParam: string): Promise<FoodItem[]> => {
    const response = await apiClient.get<FoodItem[]>(
      `/Food?name=${encodeURIComponent(searchParam)}`
    );
    return response.data;
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
