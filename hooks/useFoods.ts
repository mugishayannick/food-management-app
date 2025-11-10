import { useState, useEffect, useCallback } from "react";
import { FoodItem } from "@/types/food";
import { foodApi, handleApiError } from "@/lib/api";
import toast from "react-hot-toast";

interface UseFoodsReturn {
  foods: FoodItem[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for fetching and managing food items
 * Follows Single Responsibility Principle - handles only data fetching
 */
export const useFoods = (): UseFoodsReturn => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFoods = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await foodApi.getAll();
      setFoods(data);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      setFoods([]);
      toast.error(`Failed to load food items: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  return {
    foods,
    isLoading,
    error,
    refetch: fetchFoods,
  };
};
