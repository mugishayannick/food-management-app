"use client";

import { useState, useCallback } from "react";
import { FoodCard } from "@/components/FoodCard";
import { FoodModal } from "@/components/FoodModal";
import { DeleteConfirmationModal } from "@/components/DeleteConfirmationModal";
import { FoodItem, FoodFormData } from "@/types/food";
import {
  Search,
  Bike,
  ShoppingBag,
  ChevronRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useFoods } from "@/hooks/useFoods";
import { useFoodOperations } from "@/hooks/useFoodOperations";
import { useSearch } from "@/hooks/useSearch";
import { useFoodModal } from "@/context/FoodModalContext";
import { toast } from "react-hot-toast";

// Import images from Figma
import imgImageBase from "@/public/img/Food_image.png";

/**
 * Main page component for Food Management App
 * Follows SOLID principles:
 * - Single Responsibility: Handles UI composition and user interactions
 * - Open/Closed: Extensible through hooks and components
 * - Dependency Inversion: Depends on abstractions (hooks) rather than concrete implementations
 */
export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"delivery" | "pickup">("delivery");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // Modal context
  const { isModalOpen, editingItem, openModal, closeModal } = useFoodModal();

  // Custom hooks for data management
  const {
    foods,
    isLoading: isLoadingFoods,
    error: foodsError,
    refetch,
  } = useFoods();
  const filteredFoods = useSearch(foods, searchQuery);

  const handleOperationSuccess = useCallback(() => {
    refetch();
  }, [refetch]);

  const {
    createFood,
    updateFood,
    deleteFood,
    isLoading: isOperationLoading,
  } = useFoodOperations(handleOperationSuccess);

  // Modal handlers
  const handleEditFood = useCallback(
    (item: FoodItem) => {
      openModal(item);
    },
    [openModal]
  );

  // Food operations
  const handleSaveFood = useCallback(
    async (formData: FoodFormData) => {
      if (editingItem?.id) {
        await updateFood(editingItem.id, formData);
      } else {
        await createFood(formData);
      }
      closeModal();
    },
    [editingItem, createFood, updateFood, closeModal]
  );

  const handleDeleteFood = useCallback(
    (id: string) => {
      if (!id) return;

      const item = foods.find((item) => item.id === id);
      if (item) {
        setItemToDelete({
          id,
          name: item.food_name || "this food item",
        });
        setDeleteModalOpen(true);
      }
    },
    [foods]
  );

  const handleConfirmDelete = useCallback(async () => {
    if (!itemToDelete) return;

    toast.promise(deleteFood(itemToDelete.id), {
      loading: "Deleting food item...",
      success: "Food item deleted successfully!",
      error: (err) =>
        `Failed to delete food item: ${err.message || "Unknown error"}`,
    });

    setDeleteModalOpen(false);
    setItemToDelete(null);
  }, [itemToDelete, deleteFood]);

  const handleCloseDeleteModal = useCallback(() => {
    if (!isOperationLoading) {
      setDeleteModalOpen(false);
      setItemToDelete(null);
    }
  }, [isOperationLoading]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by useSearch hook through filteredFoods
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="food-hero bg-[#FF9900] relative overflow-hidden w-full">
        <div className="relative min-h-[400px] sm:min-h-[500px] lg:h-[628px]">
          {/* Background Image - Desktop Only */}
          <div className="absolute top-[182px] left-[1098px] w-[604px] h-[505px] hidden lg:flex items-center justify-center">
            <div className=" ">
              <div className="relative">
                <img
                  src={
                    typeof imgImageBase === "string"
                      ? imgImageBase
                      : imgImageBase.src || ""
                  }
                  alt=""
                  className="size-full object-contain bg-opacity-0"
                />
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="food-hero-content relative lg:absolute left-0 lg:left-[100px] xl:left-[220px] top-0 lg:top-[132px] max-w-full lg:max-w-[856px] w-full px-4 sm:px-8 md:px-[100px] lg:px-0 py-8 lg:py-0">
            {/* Title */}
            <div className="food-title mb-6 sm:mb-8">
              <h1 className="text-white text-[36px] sm:text-[48px] md:text-[64px] lg:text-[88px] leading-tight mb-3 sm:mb-4 font-bold">
                Are you starving?
              </h1>
              <p className="text-white text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] leading-[1.2] font-normal">
                Within a few clicks, find meals that are accessible near you
              </p>
            </div>

            {/* Search Card */}
            <div className="food-search-card bg-white rounded-[16px] shadow-[0px_5px_10px_0px_rgba(0,0,0,0.1)] overflow-hidden w-full">
              {/* Tabs */}
              <div className="food-tabs flex gap-2 sm:gap-[8px] p-4 sm:p-6 pb-0">
                <button
                  onClick={() => setActiveTab("delivery")}
                  className={`food-tab flex gap-2 sm:gap-[10px] items-center px-3 sm:px-6 py-2 sm:py-[10px] rounded-[8px] leading-none transition-all duration-150 text-sm sm:text-base font-medium ${
                    activeTab === "delivery"
                      ? "bg-[#FFF0EB] text-[#FF7A45]"
                      : "bg-white text-[#4A4A4A] hover:bg-gray-50"
                  }`}
                  data-testid="food-delivery-tab"
                >
                  <Bike
                    className={`w-4 h-4 sm:w-[18px] sm:h-[18px] ${
                      activeTab === "delivery"
                        ? "text-[#FF7A45]"
                        : "text-[#4A4A4A]"
                    }`}
                  />
                  <span>Delivery</span>
                </button>
                <button
                  onClick={() => setActiveTab("pickup")}
                  className={`food-tab flex gap-2 sm:gap-[10px] items-center px-3 sm:px-6 py-2 sm:py-[10px] rounded-[8px] leading-none transition-all duration-150 text-sm sm:text-base font-medium ${
                    activeTab === "pickup"
                      ? "bg-[#FFF0EB] text-[#FF7A45]"
                      : "bg-white text-[#4A4A4A] hover:bg-gray-50"
                  }`}
                  data-testid="food-pickup-tab"
                >
                  <ShoppingBag
                    className={`w-4 h-4 sm:w-[18px] sm:h-[18px] ${
                      activeTab === "pickup"
                        ? "text-[#FF7A45]"
                        : "text-[#4A4A4A]"
                    }`}
                  />
                  <span>Pickup</span>
                </button>
              </div>

              {/* Divider */}
              <div className="h-[1px] bg-[#EEEEEE] mx-4 sm:mx-6 my-4" />

              {/* Search */}
              <form
                onSubmit={handleSearch}
                className="food-search p-4 sm:p-6 pt-0"
              >
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                  <div className="food-search-input flex-1 bg-[#F5F5F5] rounded-[8px] flex items-center gap-2 sm:gap-3 px-3 sm:px-4 h-[48px] sm:h-[56px] min-w-0">
                    <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#A0A0A0] flex-shrink-0" />
                    <input
                      id="food-search"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="What do you like to eat today?"
                      className="flex-1 bg-transparent outline-none text-[#424242] placeholder:text-[#A0A0A0] text-sm sm:text-base lg:text-[18px] leading-[1.4] min-w-0 w-full font-normal h-full"
                      data-testid="food-search-input"
                    />
                  </div>
                  <button
                    type="submit"
                    className="food-find-button bg-[#FF6B4A] flex gap-2 sm:gap-[10px] items-center justify-center px-4 sm:px-8 lg:px-[48px] h-[48px] sm:h-[56px] rounded-[8px] text-white hover:opacity-90 transition-all duration-150 leading-none text-sm sm:text-base lg:text-[18px] font-medium w-full sm:w-auto"
                    data-testid="food-find-button"
                  >
                    <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-white" />
                    <span className="text-sm sm:text-base lg:text-[18px]">
                      Find Meal
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Meals */}
      <main className="food-main w-full px-4 sm:px-6 md:px-8 lg:px-[100px] xl:px-[220px] py-8 sm:py-12 lg:py-20">
        <section className="food-featured w-full max-w-full">
          <h2 className="text-[#212121] text-[28px] sm:text-[32px] md:text-[38px] lg:text-[43px] text-center mb-8 sm:mb-12 lg:mb-[88px] leading-[1.12]">
            Featured Meals
          </h2>

          {/* Error State */}
          {foodsError && (
            <div className="food-error-message flex items-center justify-center gap-3 py-[100px] text-[#ff3b30] text-[18px]">
              <AlertCircle className="w-6 h-6" />
              <span>{foodsError}</span>
            </div>
          )}

          {/* Loading State */}
          {isLoadingFoods && !foodsError && (
            <div className="food-loading flex items-center justify-center py-[100px]">
              <Loader2 className="w-8 h-8 animate-spin text-[#f17228]" />
            </div>
          )}

          {/* Food Items Grid */}
          {!isLoadingFoods && !foodsError && (
            <>
              {filteredFoods.length > 0 ? (
                <div className="food-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-[24px] mb-8 sm:mb-12 lg:mb-[88px] w-full">
                  {filteredFoods.map((item, index) => (
                    <FoodCard
                      key={index}
                      item={item}
                      onEdit={handleEditFood}
                      onDelete={handleDeleteFood}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-state-message text-center py-[100px] text-[#757575] text-[24px]">
                  {searchQuery
                    ? "No items found matching your search"
                    : "No items available"}
                </div>
              )}

              {filteredFoods.length > 0 && (
                <div className="food-load-more flex justify-center">
                  <button
                    className="food-load-button bg-gradient-to-l from-[#f17228] to-[#ffb30e] flex gap-[10px] items-center justify-center px-[48px] py-[21px] rounded-[14px] shadow-[0px_5px_10px_0px_rgba(255,174,0,0.26),0px_20px_40px_0px_rgba(255,174,0,0.29)] text-white hover:shadow-lg transition-all duration-150 leading-none"
                    data-testid="food-load-more-btn"
                  >
                    <span className="text-[18px]">Load more</span>
                    <ChevronRight className="w-[18px] h-[18px]" />
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      {/* Add/Edit Food Modal */}
      <FoodModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveFood}
        editItem={editingItem}
        isLoading={isOperationLoading}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        itemName={itemToDelete?.name}
        isLoading={isOperationLoading}
      />
    </div>
  );
}
