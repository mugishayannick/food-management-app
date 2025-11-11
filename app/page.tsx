"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
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
import { useFoodModal } from "@/context/FoodModalContext";
import { toast } from "react-hot-toast";
import { foodApi } from "@/lib/api";
import { Button } from "@/components/Button";
import { LOADING_MESSAGES, SUCCESS_MESSAGES } from "@/constants";
import imgImageBase from "@/public/img/Food_image.png";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"delivery" | "pickup">("delivery");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [searchResults, setSearchResults] = useState<FoodItem[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const { isModalOpen, editingItem, openModal, closeModal } = useFoodModal();

  const {
    foods,
    isLoading: isLoadingFoods,
    error: foodsError,
    refetch,
  } = useFoods();

  // Memoize displayed foods to avoid recalculating on every render
  const displayedFoods = useMemo(
    () => (searchResults !== null ? searchResults : foods),
    [searchResults, foods]
  );

  const handleOperationSuccess = useCallback(() => {
    refetch();
    setSearchResults(null);
    setSearchQuery("");
  }, [refetch]);

  const {
    createFood,
    updateFood,
    deleteFood,
    isLoading: isOperationLoading,
  } = useFoodOperations(handleOperationSuccess);

  const handleEditFood = useCallback(
    (item: FoodItem) => {
      openModal(item);
    },
    [openModal]
  );

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

      const item = foods.find((food) => food.id === id);
      if (!item) return;

      setItemToDelete({
        id,
        name: item.food_name || item.name || "this food item",
      });
      setDeleteModalOpen(true);
    },
    [foods]
  );

  const handleConfirmDelete = useCallback(async () => {
    if (!itemToDelete) return;

    toast.promise(deleteFood(itemToDelete.id), {
      loading: LOADING_MESSAGES.DELETING,
      success: SUCCESS_MESSAGES.FOOD_DELETED,
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

  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const query = searchQuery.trim();

      if (!query) {
        setSearchResults(null);
        toast.error("Please enter a search term");
        return;
      }

      setIsSearching(true);
      try {
        const results = await foodApi.search(query);
        setSearchResults(results);

        if (results.length > 0) {
          toast.success(
            `Found ${results.length} food item${results.length > 1 ? "s" : ""}`
          );
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to search food items. Please try again.";
        toast.error(errorMessage);
        setSearchResults(null);
      } finally {
        setIsSearching(false);
      }
    },
    [searchQuery]
  );

  const handleSearchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);

      if (!value.trim()) {
        setSearchResults(null);
      }
    },
    []
  );

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="food-hero bg-hero relative overflow-hidden w-full">
        <div className="relative min-h-[400px] sm:min-h-[500px] lg:h-[628px] overflow-hidden">
          {/* Background Image - Desktop Only */}
          <div className="absolute top-[182px] left-[1098px] w-[604px] h-[505px] hidden lg:flex items-center justify-center">
            <Image
              src={
                typeof imgImageBase === "string"
                  ? imgImageBase
                  : imgImageBase.src || ""
              }
              alt="Food illustration"
              className="object-contain"
              width={604}
              height={505}
              priority={false}
            />
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
                <Button
                  onClick={() => setActiveTab("delivery")}
                  variant={
                    activeTab === "delivery" ? "tab-active" : "tab-inactive"
                  }
                  size="md"
                  icon={<Bike className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />}
                  iconPosition="left"
                  className="food-tab leading-none"
                  data-test-id="food-delivery-tab"
                >
                  Delivery
                </Button>
                <Button
                  onClick={() => setActiveTab("pickup")}
                  variant={
                    activeTab === "pickup" ? "tab-active" : "tab-inactive"
                  }
                  size="md"
                  icon={
                    <ShoppingBag className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                  }
                  iconPosition="left"
                  className="food-tab leading-none"
                  data-test-id="food-pickup-tab"
                >
                  Pickup
                </Button>
              </div>

              {/* Divider */}
              <div className="h-[1px] bg-border-custom mx-4 sm:mx-6 my-4" />

              {/* Search */}
              <form
                onSubmit={handleSearch}
                className="food-search p-4 sm:p-6 pt-0"
              >
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                  <div className="food-search-input md:flex-1 bg-search-input-bg rounded-[8px] flex items-center gap-2 sm:gap-3 px-3 sm:px-4 h-[48px] sm:h-[56px] min-w-0">
                    <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-primary flex-shrink-0 font-bold" />
                    <input
                      id="food-search"
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                      placeholder="What do you like to eat today?"
                      className="flex-1 bg-transparent outline-none text-text-secondary placeholder:text-search-placeholder text-sm sm:text-base lg:text-[18px] leading-[1.4] min-w-0 w-full font-normal h-full"
                      data-test-id="food-search-input"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="coral"
                    size="md"
                    icon={
                      !isSearching ? (
                        <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-white" />
                      ) : undefined
                    }
                    iconPosition="left"
                    isLoading={isSearching}
                    loadingText={LOADING_MESSAGES.SEARCHING}
                    fullWidth
                    className="food-find-button h-[48px] sm:h-[56px] w-full sm:w-auto sm:px-8 lg:px-[48px] leading-none"
                    data-test-id="food-find-button"
                  >
                    <span className="text-sm sm:text-base lg:text-[18px] font-bold">
                      Find Meal
                    </span>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Meals */}
      <main className="food-main w-full px-4 sm:px-6 md:px-8 lg:px-[100px] xl:px-[220px] py-8 sm:py-12 lg:py-20">
        <section className="food-featured w-full max-w-full">
          <h2 className="text-text-primary text-[28px] sm:text-[32px] md:text-[38px] lg:text-[43px] text-center mb-8 sm:mb-12 lg:mb-[88px] leading-[1.12] font-bold">
            Featured Meals
          </h2>

          {/* Error State */}
          {foodsError && (
            <div className="food-error-message flex items-center justify-center gap-3 py-[100px] text-error text-[18px]">
              <AlertCircle className="w-6 h-6" />
              <span>{foodsError}</span>
            </div>
          )}

          {/* Loading State */}
          {isLoadingFoods && !foodsError && (
            <div className="food-loading flex items-center justify-center py-[100px]">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {/* Food Items Grid */}
          {!isLoadingFoods && !foodsError && (
            <>
              {displayedFoods.length > 0 ? (
                <div className="food-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-[24px] mb-8 sm:mb-12 lg:mb-[88px] w-full">
                  {displayedFoods.map((item) => (
                    <FoodCard
                      key={item.id}
                      item={item}
                      onEdit={handleEditFood}
                      onDelete={handleDeleteFood}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-state-message text-center py-[100px] text-text-tertiary text-[24px]">
                  {searchResults !== null && searchResults.length === 0
                    ? "No items found matching your search"
                    : "No food items available"}
                </div>
              )}

              {displayedFoods.length > 0 && (
                <div className="food-load-more flex justify-center">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={<ChevronRight className="w-[18px] h-[18px]" />}
                    iconPosition="right"
                    className="food-load-button leading-none"
                    data-test-id="food-load-more-btn"
                  >
                    <span className="text-[18px] font-bold">Load more</span>
                  </Button>
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
        isLoading={isOperationLoading}
      />
    </div>
  );
}
