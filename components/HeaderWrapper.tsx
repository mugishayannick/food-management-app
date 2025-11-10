"use client";

import { Header } from "./Header";
import { useFoodModal } from "@/context/FoodModalContext";

/**
 * Client component wrapper for Header that uses FoodModalContext
 * This allows Header to be used in the layout while accessing modal state
 */
export function HeaderWrapper() {
  const { openModal } = useFoodModal();

  const handleAddMeal = () => {
    openModal();
  };

  return <Header onAddMeal={handleAddMeal} />;
}
