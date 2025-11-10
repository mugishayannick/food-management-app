import { useMemo } from "react";
import { FoodItem } from "@/types/food";

/**
 * Custom hook for filtering food items by search query
 * Follows Single Responsibility Principle - handles only search logic
 */
export const useSearch = (
  items: FoodItem[],
  searchQuery: string
): FoodItem[] => {
  return useMemo(() => {
    if (!searchQuery.trim()) {
      return items;
    }

    const query = searchQuery.toLowerCase().trim();
    return items.filter(
      (item) =>
        item?.food_name?.toLowerCase().includes(query) ||
        item?.restaurant_name?.toLowerCase().includes(query) ||
        item?.name?.toLowerCase().includes(query)
    );
  }, [items, searchQuery]);
};
