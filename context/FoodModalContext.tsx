"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { FoodItem } from "@/types/food";

interface FoodModalContextType {
  isModalOpen: boolean;
  editingItem: FoodItem | null;
  openModal: (item?: FoodItem | null) => void;
  closeModal: () => void;
}

const FoodModalContext = createContext<FoodModalContextType | undefined>(
  undefined
);

export function FoodModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FoodItem | null>(null);

  const openModal = useCallback((item?: FoodItem | null) => {
    setEditingItem(item || null);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingItem(null);
  }, []);

  return (
    <FoodModalContext.Provider
      value={{
        isModalOpen,
        editingItem,
        openModal,
        closeModal,
      }}
    >
      {children}
    </FoodModalContext.Provider>
  );
}

export function useFoodModal() {
  const context = useContext(FoodModalContext);
  if (context === undefined) {
    throw new Error("useFoodModal must be used within a FoodModalProvider");
  }
  return context;
}
