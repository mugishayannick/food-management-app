import { useState, useCallback } from "react";
import { FoodItem, FoodFormData } from "@/types/food";
import { foodApi, handleApiError } from "@/lib/api";
import toast from "react-hot-toast";

interface UseFoodOperationsReturn {
  createFood: (data: FoodFormData) => Promise<FoodItem | null>;
  updateFood: (id: string, data: FoodFormData) => Promise<FoodItem | null>;
  deleteFood: (id: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook for food CRUD operations
 * Follows Single Responsibility Principle - handles only mutations
 */
export const useFoodOperations = (
  onSuccess?: () => void
): UseFoodOperationsReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createFood = useCallback(
    async (data: FoodFormData): Promise<FoodItem | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const newFood = await foodApi.create(data);
        toast.success("Food item added successfully!");
        onSuccess?.();
        return newFood;
      } catch (err) {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
        toast.error(`Failed to add food item: ${errorMessage}`);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess]
  );

  const updateFood = useCallback(
    async (id: string, data: FoodFormData): Promise<FoodItem | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const updatedFood = await foodApi.update(id, data);
        toast.success("Food item updated successfully!");
        onSuccess?.();
        return updatedFood;
      } catch (err) {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
        toast.error(`Failed to update food item: ${errorMessage}`);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess]
  );

  const deleteFood = useCallback(
    async (id: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        await foodApi.delete(id);
        onSuccess?.();
        return true;
      } catch (err) {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess]
  );

  return {
    createFood,
    updateFood,
    deleteFood,
    isLoading,
    error,
  };
};
