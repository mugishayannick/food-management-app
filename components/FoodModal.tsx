import { useState, useEffect, FormEvent, useRef, memo } from "react";
import { FoodItem, FormErrors, FoodFormData } from "../types/food";
import {
  getFoodPrice,
  getFoodRating,
  getRestaurantName,
  getRestaurantLogoUrl,
  getRestaurantStatus,
} from "@/utils/foodHelpers";
import {
  ERROR_MESSAGES,
  RESTAURANT_STATUS,
  LOADING_MESSAGES,
} from "@/constants";
import { Dropdown } from "./Dropdown";
import { Button } from "./Button";

interface FoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: FoodFormData) => Promise<void>;
  editItem?: FoodItem | null;
  isLoading?: boolean;
}

export const FoodModal = memo(
  ({
    isOpen,
    onClose,
    onSave,
    editItem,
    isLoading = false,
  }: FoodModalProps) => {
    const [errors, setErrors] = useState<FormErrors>({});
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const statusButtonRef = useRef<HTMLButtonElement>(null);
    const [formData, setFormData] = useState({
      food_name: "",
      food_rating: "",
      Price: "",
      food_image: "",
      restaurant_name: "",
      avatar: "",
      restaurant_status: RESTAURANT_STATUS.OPEN as "Open Now" | "Closed",
    });

    useEffect(() => {
      if (editItem) {
        const status = getRestaurantStatus(editItem) || RESTAURANT_STATUS.OPEN;
        setFormData({
          food_name: editItem.food_name || "",
          food_rating: getFoodRating(editItem).toString(),
          Price: getFoodPrice(editItem),
          food_image: editItem.food_image || "",
          restaurant_name: getRestaurantName(editItem),
          avatar: getRestaurantLogoUrl(editItem),
          restaurant_status: status as "Open Now" | "Closed",
        });
      } else {
        setFormData({
          food_name: "",
          food_rating: "",
          Price: "",
          food_image: "",
          restaurant_name: "",
          avatar: "",
          restaurant_status: RESTAURANT_STATUS.OPEN as "Open Now" | "Closed",
        });
      }
      setErrors({});
      setIsStatusDropdownOpen(false);
    }, [editItem, isOpen]);

    const validate = (): boolean => {
      const newErrors: FormErrors = {};

      if (!formData.food_name.trim()) {
        newErrors.food_name = ERROR_MESSAGES.FOOD_NAME_REQUIRED;
      }

      const rating = parseFloat(formData.food_rating);
      if (!formData.food_rating || isNaN(rating) || rating < 1 || rating > 5) {
        newErrors.food_rating = ERROR_MESSAGES.FOOD_RATING_INVALID;
      }

      if (!formData.food_image.trim()) {
        newErrors.food_image = ERROR_MESSAGES.FOOD_IMAGE_REQUIRED;
      }

      if (!formData.restaurant_name.trim()) {
        newErrors.restaurant_name = ERROR_MESSAGES.RESTAURANT_NAME_REQUIRED;
      }

      if (!formData.avatar.trim()) {
        newErrors.avatar = ERROR_MESSAGES.RESTAURANT_LOGO_REQUIRED;
      }

      if (
        !formData.restaurant_status ||
        (formData.restaurant_status !== RESTAURANT_STATUS.OPEN &&
          formData.restaurant_status !== RESTAURANT_STATUS.CLOSED)
      ) {
        newErrors.restaurant_status = ERROR_MESSAGES.RESTAURANT_STATUS_INVALID;
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();

      if (!validate()) {
        return;
      }

      try {
        const status = formData.restaurant_status;
        const foodFormData: FoodFormData = {
          food_name: formData.food_name.trim(),
          food_rating: parseFloat(formData.food_rating),
          Price: formData.Price.trim() || "0.00", // Default to 0.00 if not provided
          food_image: formData.food_image.trim(),
          restaurant_name: formData.restaurant_name.trim(),
          avatar: formData.avatar.trim(),
          restaurant_status: status as "Open Now" | "Closed",
          open: status === RESTAURANT_STATUS.OPEN,
        };

        await onSave(foodFormData);
        onClose();
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : ERROR_MESSAGES.SAVE_FAILED;
        setErrors({
          ...errors,
          _general: errorMessage,
        });
      }
    };

    if (!isOpen) return null;

    return (
      <div
        className="food-modal-overlay fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="food-modal bg-white rounded-[16px] w-full max-w-[700px] max-h-[90vh] overflow-y-auto animate-slide-up shadow-lg p-10"
          onClick={(e) => e.stopPropagation()}
          data-test-id="food-modal"
        >
          {/* Modal Body */}
          <form
            onSubmit={handleSubmit}
            className="food-form p-6 sm:p-14 space-y-6"
          >
            {/* Title */}
            <h2 className="text-primary text-center text-[28px] sm:text-[32px] font-bold mb-6">
              {editItem ? "Edit Meal" : "Add a meal"}
            </h2>
            {/* General Error Message */}
            {errors._general && (
              <div className="food-error-general bg-red-50 border border-red-200 rounded-lg p-4 text-error text-[14px]">
                {errors._general}
              </div>
            )}
            {/* Food Name */}
            <div className="food-input-group">
              {editItem && (
                <label
                  htmlFor="food-name-input"
                  className="food-label block mb-2 text-text-secondary text-[16px]"
                >
                  Food name
                </label>
              )}
              <input
                id="food-name-input"
                type="text"
                name="food_name"
                value={formData.food_name}
                onChange={(e) =>
                  setFormData({ ...formData, food_name: e.target.value })
                }
                placeholder="Food name"
                className="food-input w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text-primary"
                aria-describedby="food-name-error"
                data-test-id="food-name-input"
              />
              {errors.food_name && (
                <p
                  id="food-name-error"
                  className="food-error text-error text-[14px] mt-1"
                >
                  {errors.food_name}
                </p>
              )}
            </div>

            {/* Food Rating */}
            <div className="food-input-group">
              {editItem && (
                <label
                  htmlFor="food-rating-input"
                  className="food-label block mb-2 text-text-secondary text-[16px]"
                >
                  Food rating
                </label>
              )}
              <input
                id="food-rating-input"
                type="number"
                name="food_rating"
                min="1"
                max="5"
                step="0.1"
                value={formData.food_rating}
                onChange={(e) =>
                  setFormData({ ...formData, food_rating: e.target.value })
                }
                placeholder="Food rating"
                className="food-input w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text-primary"
                aria-describedby="food-rating-error"
                data-test-id="food-rating-input"
              />
              {errors.food_rating && (
                <p
                  id="food-rating-error"
                  className="food-error text-error text-[14px] mt-1"
                >
                  {errors.food_rating}
                </p>
              )}
            </div>

            {/* Food Image URL */}
            <div className="food-input-group">
              {editItem && (
                <label
                  htmlFor="food-image-input"
                  className="food-label block mb-2 text-text-secondary text-[16px]"
                >
                  Food image (link)
                </label>
              )}
              <input
                id="food-image-input"
                type="url"
                name="food_image"
                value={formData.food_image}
                onChange={(e) =>
                  setFormData({ ...formData, food_image: e.target.value })
                }
                placeholder="Food image (link)"
                className="food-input w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text-primary"
                aria-describedby="food-image-error"
                data-test-id="food-image-input"
              />
              {errors.food_image && (
                <p
                  id="food-image-error"
                  className="food-error text-error text-[14px] mt-1"
                >
                  {errors.food_image}
                </p>
              )}
            </div>

            {/* Restaurant Name */}
            <div className="food-input-group">
              {editItem && (
                <label
                  htmlFor="restaurant-name-input"
                  className="food-label block mb-2 text-text-secondary text-[16px]"
                >
                  Restaurant name
                </label>
              )}
              <input
                id="restaurant-name-input"
                type="text"
                name="restaurant_name"
                value={formData.restaurant_name}
                onChange={(e) =>
                  setFormData({ ...formData, restaurant_name: e.target.value })
                }
                placeholder="Restaurant name"
                className="food-input w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text-primary"
                aria-describedby="restaurant-name-error"
                data-test-id="food-restaurant-input"
              />
              {errors.restaurant_name && (
                <p
                  id="restaurant-name-error"
                  className="food-error text-error text-[14px] mt-1"
                >
                  {errors.restaurant_name}
                </p>
              )}
            </div>

            {/* Restaurant Logo URL */}
            <div className="food-input-group">
              {editItem && (
                <label
                  htmlFor="restaurant-logo-input"
                  className="food-label block mb-2 text-text-secondary text-[16px]"
                >
                  Restaurant logo (link)
                </label>
              )}
              <input
                id="restaurant-logo-input"
                type="url"
                name="avatar"
                value={formData.avatar}
                onChange={(e) =>
                  setFormData({ ...formData, avatar: e.target.value })
                }
                placeholder="Restaurant logo (link)"
                className="food-input w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text-primary"
                aria-describedby="restaurant-logo-error"
                data-test-id="food-logo-input"
              />
              {errors.avatar && (
                <p
                  id="restaurant-logo-error"
                  className="food-error text-error text-[14px] mt-1"
                >
                  {errors.avatar}
                </p>
              )}
            </div>

            {/* Restaurant Status */}
            <div className="food-input-group">
              {editItem && (
                <label
                  htmlFor="restaurant-status-select"
                  className="food-label block mb-2 text-text-secondary text-[16px]"
                >
                  Restaurant status (open/close)
                </label>
              )}
              <div className="relative">
                <button
                  ref={statusButtonRef}
                  type="button"
                  onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                  className="food-select w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text-primary cursor-pointer text-left flex items-center justify-between"
                  aria-describedby="restaurant-status-error"
                  data-test-id="food-status-select"
                  aria-expanded={isStatusDropdownOpen}
                  aria-haspopup="true"
                >
                  <span>{formData.restaurant_status}</span>
                  <svg
                    className={`w-4 h-4 text-text-secondary transition-transform duration-150 ${
                      isStatusDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <Dropdown
                  isOpen={isStatusDropdownOpen}
                  onClose={() => setIsStatusDropdownOpen(false)}
                  items={[
                    {
                      label: RESTAURANT_STATUS.OPEN,
                      onClick: () =>
                        setFormData({
                          ...formData,
                          restaurant_status: RESTAURANT_STATUS.OPEN,
                        }),
                      variant: "default",
                    },
                    {
                      label: RESTAURANT_STATUS.CLOSED,
                      onClick: () =>
                        setFormData({
                          ...formData,
                          restaurant_status: RESTAURANT_STATUS.CLOSED,
                        }),
                      variant: "error",
                    },
                  ]}
                  width="100%"
                  position="bottom"
                  align="start"
                  triggerRef={statusButtonRef}
                />
              </div>
              {errors.restaurant_status && (
                <p
                  id="restaurant-status-error"
                  className="food-error text-error text-[14px] mt-1"
                >
                  {errors.restaurant_status}
                </p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="food-modal-footer flex gap-4 pt-4">
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isLoading}
                loadingText={
                  editItem ? LOADING_MESSAGES.UPDATING : LOADING_MESSAGES.ADDING
                }
                fullWidth
                className="food-save-button flex-1 rounded-lg"
                data-test-id="food-save-btn"
              >
                {editItem ? "Save" : "Add"}
              </Button>
              <Button
                type="button"
                variant="white"
                size="md"
                onClick={onClose}
                fullWidth
                className="food-cancel-button flex-1 rounded-lg"
                data-test-id="food-cancel-btn"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
);
