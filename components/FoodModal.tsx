import { useState, useEffect, FormEvent } from "react";
import { FoodItem, FormErrors, FoodFormData } from "../types/food";
import { X, Loader2 } from "lucide-react";

interface FoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: FoodFormData) => Promise<void>;
  editItem?: FoodItem | null;
  isLoading?: boolean;
}

export const FoodModal = ({
  isOpen,
  onClose,
  onSave,
  editItem,
  isLoading = false,
}: FoodModalProps) => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    food_name: "",
    food_rating: "",
    Price: "",
    food_image: "",
    restaurant_name: "",
    avatar: "",
    restaurant_status: "Open Now" as "Open Now" | "Closed",
  });

  useEffect(() => {
    if (editItem) {
      const price = editItem.Price || editItem.price || "0";
      const rating = editItem.food_rating || editItem.rating || 0;
      const restaurantLogo =
        editItem.avatar || editItem.logo || editItem.restaurant_image || "";
      const restaurantName = editItem.restaurant_name || editItem.name || "";
      const status =
        editItem.restaurant_status ||
        (editItem.open !== undefined
          ? editItem.open
            ? "Open Now"
            : "Closed"
          : "Open Now");

      setFormData({
        food_name: editItem.food_name || "",
        food_rating: rating.toString(),
        Price: price,
        food_image: editItem.food_image || "",
        restaurant_name: restaurantName,
        avatar: restaurantLogo,
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
        restaurant_status: "Open Now" as "Open Now" | "Closed",
      });
    }
    setErrors({});
  }, [editItem, isOpen]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.food_name.trim()) {
      newErrors.food_name = "Food Name is required";
    }

    const rating = parseFloat(formData.food_rating);
    if (!formData.food_rating || isNaN(rating) || rating < 1 || rating > 5) {
      newErrors.food_rating = "Food Rating must be a number between 1 and 5";
    }

    if (!formData.food_image.trim()) {
      newErrors.food_image = "Food Image URL is required";
    }

    if (!formData.restaurant_name.trim()) {
      newErrors.restaurant_name = "Restaurant Name is required";
    }

    if (!formData.avatar.trim()) {
      newErrors.avatar = "Restaurant Logo URL is required";
    }

    if (!formData.Price.trim()) {
      newErrors.Price = "Food Price is required";
    }

    if (
      !formData.restaurant_status ||
      (formData.restaurant_status !== "Open Now" &&
        formData.restaurant_status !== "Closed")
    ) {
      newErrors.restaurant_status =
        "Restaurant Status must be 'Open Now' or 'Closed'";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const foodFormData: FoodFormData = {
        food_name: formData.food_name.trim(),
        food_rating: parseFloat(formData.food_rating),
        Price: formData.Price.trim(),
        food_image: formData.food_image.trim(),
        restaurant_name: formData.restaurant_name.trim(),
        avatar: formData.avatar.trim(),
        restaurant_status: formData.restaurant_status,
        open: formData.restaurant_status === "Open Now",
      };

      await onSave(foodFormData);
      onClose();
    } catch (error) {
      setErrors({
        ...errors,
        _general: "Failed to save food item. Please try again.",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="food-modal-overlay fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="food-modal bg-white rounded-[16px] w-full max-w-[600px] max-h-[90vh] overflow-y-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        data-testid="food-modal"
      >
        {/* Modal Header */}
        <div className="food-modal-header flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-[#212121] text-[28px]">
            {editItem ? "Edit Food" : "Add Food"}
          </h2>
          <button
            onClick={onClose}
            className="food-close-button p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-[#424242]" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="food-form p-6 space-y-6">
          {/* General Error Message */}
          {errors._general && (
            <div className="food-error-general bg-red-50 border border-red-200 rounded-lg p-4 text-[#ff3b30] text-[14px]">
              {errors._general}
            </div>
          )}
          {/* Food Name */}
          <div className="food-input-group">
            <label
              htmlFor="food-name-input"
              className="food-label block mb-2 text-[#424242]"
            >
              Food Name
            </label>
            <input
              id="food-name-input"
              type="text"
              name="food_name"
              value={formData.food_name}
              onChange={(e) =>
                setFormData({ ...formData, food_name: e.target.value })
              }
              placeholder="Enter food name"
              className="food-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f17228]"
              aria-describedby="food-name-error"
              data-testid="food-name-input"
            />
            {errors.food_name && (
              <p
                id="food-name-error"
                className="food-error text-[#ff3b30] text-[14px] mt-1"
              >
                {errors.food_name}
              </p>
            )}
          </div>

          {/* Food Rating */}
          <div className="food-input-group">
            <label
              htmlFor="food-rating-input"
              className="food-label block mb-2 text-[#424242]"
            >
              Food Rating
            </label>
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
              placeholder="Enter food rating (1-5)"
              className="food-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f17228]"
              aria-describedby="food-rating-error"
              data-testid="food-rating-input"
            />
            {errors.food_rating && (
              <p
                id="food-rating-error"
                className="food-error text-[#ff3b30] text-[14px] mt-1"
              >
                {errors.food_rating}
              </p>
            )}
          </div>

          {/* Food Price */}
          <div className="food-input-group">
            <label
              htmlFor="food-price-input"
              className="food-label block mb-2 text-[#424242]"
            >
              Food Price
            </label>
            <input
              id="food-price-input"
              type="text"
              name="Price"
              value={formData.Price}
              onChange={(e) =>
                setFormData({ ...formData, Price: e.target.value })
              }
              placeholder="Food price ($)"
              className="food-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f17228]"
              data-testid="food-price-input"
              aria-describedby="food-price-error"
            />
            {errors.Price && (
              <p
                id="food-price-error"
                className="food-error text-[#ff3b30] text-[14px] mt-1"
              >
                {errors.Price}
              </p>
            )}
          </div>

          {/* Food Image URL */}
          <div className="food-input-group">
            <label
              htmlFor="food-image-input"
              className="food-label block mb-2 text-[#424242]"
            >
              Food Image URL
            </label>
            <input
              id="food-image-input"
              type="url"
              name="food_image"
              value={formData.food_image}
              onChange={(e) =>
                setFormData({ ...formData, food_image: e.target.value })
              }
              placeholder="Enter food image URL"
              className="food-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f17228]"
              aria-describedby="food-image-error"
              data-testid="food-image-input"
            />
            {errors.food_image && (
              <p
                id="food-image-error"
                className="food-error text-[#ff3b30] text-[14px] mt-1"
              >
                {errors.food_image}
              </p>
            )}
          </div>

          {/* Restaurant Name */}
          <div className="food-input-group">
            <label
              htmlFor="restaurant-name-input"
              className="food-label block mb-2 text-[#424242]"
            >
              Restaurant Name
            </label>
            <input
              id="restaurant-name-input"
              type="text"
              name="restaurant_name"
              value={formData.restaurant_name}
              onChange={(e) =>
                setFormData({ ...formData, restaurant_name: e.target.value })
              }
              placeholder="Enter restaurant name"
              className="food-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f17228]"
              aria-describedby="restaurant-name-error"
              data-testid="food-restaurant-input"
            />
            {errors.restaurant_name && (
              <p
                id="restaurant-name-error"
                className="food-error text-[#ff3b30] text-[14px] mt-1"
              >
                {errors.restaurant_name}
              </p>
            )}
          </div>

          {/* Restaurant Logo URL */}
          <div className="food-input-group">
            <label
              htmlFor="restaurant-logo-input"
              className="food-label block mb-2 text-[#424242]"
            >
              Restaurant Logo URL
            </label>
            <input
              id="restaurant-logo-input"
              type="url"
              name="avatar"
              value={formData.avatar}
              onChange={(e) =>
                setFormData({ ...formData, avatar: e.target.value })
              }
              placeholder="Enter restaurant logo URL"
              className="food-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f17228]"
              aria-describedby="restaurant-logo-error"
              data-testid="food-logo-input"
            />
            {errors.avatar && (
              <p
                id="restaurant-logo-error"
                className="food-error text-[#ff3b30] text-[14px] mt-1"
              >
                {errors.avatar}
              </p>
            )}
          </div>

          {/* Restaurant Status */}
          <div className="food-input-group">
            <label
              htmlFor="restaurant-status-select"
              className="food-label block mb-2 text-[#424242]"
            >
              Restaurant Status
            </label>
            <select
              id="restaurant-status-select"
              name="restaurant_status"
              value={formData.restaurant_status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  restaurant_status: e.target.value as "Open Now" | "Closed",
                })
              }
              className="food-select w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f17228]"
              aria-describedby="restaurant-status-error"
              data-testid="food-status-select"
            >
              <option value="Open Now">Open Now</option>
              <option value="Closed">Closed</option>
            </select>
            {errors.restaurant_status && (
              <p
                id="restaurant-status-error"
                className="food-error text-[#ff3b30] text-[14px] mt-1"
              >
                {errors.restaurant_status}
              </p>
            )}
          </div>

          {/* Modal Footer */}
          <div className="food-modal-footer flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="food-cancel-button flex-1 px-6 py-3 border border-gray-300 rounded-lg text-[#424242] hover:bg-gray-50 transition-colors duration-150"
              data-testid="food-cancel-btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="food-save-button flex-1 px-6 py-3 bg-[#f17228] text-white rounded-lg hover:bg-[#e06520] transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              data-testid="food-save-btn"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {editItem ? "Updating Food..." : "Adding Food..."}
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
