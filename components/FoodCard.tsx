import { useState, useRef, memo, useMemo, useCallback } from "react";
import Image from "next/image";
import { FoodItem } from "../types/food";
import { Star, EllipsisVertical, Tag } from "lucide-react";
import { getFoodImage, getRestaurantLogo } from "@/utils/fallbackImages";
import {
  getFoodPrice,
  getFoodRating,
  getRestaurantName,
  getRestaurantStatus,
  getFoodName,
} from "@/utils/foodHelpers";
import { RESTAURANT_STATUS } from "@/constants";
import { Dropdown, DropdownItem } from "./Dropdown";

interface FoodCardProps {
  item: FoodItem;
  onEdit: (item: FoodItem) => void;
  onDelete: (id: string) => void;
}

export const FoodCard = memo(
  ({ item, onEdit, onDelete }: FoodCardProps) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement | null>(null);

    // Memoize computed values to avoid recalculating on every render
    const foodName = useMemo(() => getFoodName(item), [item]);
    const foodRating = useMemo(() => getFoodRating(item), [item]);
    const foodPrice = useMemo(() => getFoodPrice(item), [item]);
    const restaurantName = useMemo(() => getRestaurantName(item), [item]);
    const restaurantStatus = useMemo(() => getRestaurantStatus(item), [item]);
    const foodImageSrc = useMemo(
      () => item.food_image || getFoodImage(),
      [item]
    );
    const restaurantLogoSrc = useMemo(
      () =>
        item.avatar ||
        item.logo ||
        item.restaurant_image ||
        getRestaurantLogo(),
      [item]
    );

    // Memoize handlers to prevent unnecessary re-renders
    const handleEdit = useCallback(() => {
      onEdit(item);
    }, [item, onEdit]);

    const handleDelete = useCallback(() => {
      if (item.id) {
        onDelete(item.id);
      }
    }, [item.id, onDelete]);

    const handleMenuToggle = useCallback(() => {
      setShowMenu((prev) => !prev);
    }, []);

    const handleMenuClose = useCallback(() => {
      setShowMenu(false);
    }, []);

    const handleImageError = useCallback(
      (e: React.SyntheticEvent<HTMLImageElement>) => {
        const target = e.target as HTMLImageElement;
        if (!target.dataset.fallbackSet) {
          target.dataset.fallbackSet = "true";
          target.src = getFoodImage();
        }
      },
      []
    );

    const handleLogoError = useCallback(
      (e: React.SyntheticEvent<HTMLImageElement>) => {
        const target = e.target as HTMLImageElement;
        if (!target.dataset.fallbackSet) {
          target.dataset.fallbackSet = "true";
          target.src = getRestaurantLogo();
        }
      },
      []
    );

    // Memoize dropdown items
    const dropdownItems: DropdownItem[] = useMemo(
      () => [
        {
          label: "Edit",
          onClick: handleEdit,
          variant: "default",
        },
        {
          label: "Delete",
          onClick: handleDelete,
          variant: "error",
        },
      ],
      [handleEdit, handleDelete]
    );

    return (
      <article
        className="food-card flex flex-col gap-4 sm:gap-6 items-start rounded-[16px] animate-slide-up w-full"
        data-test-id="food-card"
      >
        {/* Food Photo */}
        <div className="food-photo bg-gray-100 h-[301px] overflow-hidden relative rounded-[16px] w-full">
          <Image
            alt={foodName || "Food item"}
            className="object-cover rounded-[16px]"
            src={foodImageSrc}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            onError={handleImageError}
            unoptimized={foodImageSrc.startsWith("http")}
          />
          {/* Price Badge */}
          {foodPrice !== "0.00" && (
            <div className="absolute left-[24px] top-[24px]">
              <div className="food-price bg-primary flex gap-[10px] items-center px-[16px] py-[8px] rounded-[8px] text-white">
                <Tag size={20} className="flex-shrink-0" />
                <p className="text-[22px] font-bold whitespace-nowrap">
                  ${foodPrice}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Restaurant Info */}
        <div className="flex items-start justify-between w-full">
          <div className="flex gap-[24px] items-center min-w-0 flex-1">
            <div className="flex-shrink-0 w-16 h-16 relative">
              <Image
                alt={restaurantName || "Restaurant logo"}
                className="rounded-[10px] object-cover"
                src={restaurantLogoSrc}
                fill
                sizes="64px"
                onError={handleLogoError}
                unoptimized={restaurantLogoSrc.startsWith("http")}
              />
            </div>
            <div className="flex flex-col gap-[4px] items-start min-w-0 flex-1">
              <p className="food-name text-text-secondary text-[22px] truncate w-full font-bold">
                {foodName}
              </p>
              <div className="food-rating flex gap-[8px] items-center text-secondary text-[22px]">
                <Star
                  className="text-secondary"
                  fill="currentColor"
                  size={22}
                />
                <p className="font-bold">{foodRating}</p>
              </div>
            </div>
          </div>

          {/* More Menu */}
          <div className="relative flex items-center justify-center shrink-0">
            <button
              ref={menuButtonRef}
              onClick={handleMenuToggle}
              className="food-menu-button flex items-center justify-center p-2 hover:bg-gray-100 rounded-2xl transition-colors duration-150 cursor-pointer"
              data-test-id="food-menu-button"
              aria-label="More options"
              aria-expanded={showMenu}
              aria-haspopup="true"
            >
              <EllipsisVertical className="w-[20px] h-[20px] text-text-secondary" />
            </button>

            <Dropdown
              isOpen={showMenu}
              onClose={handleMenuClose}
              items={dropdownItems}
              width="120px"
              position="bottom"
              align="end"
              triggerRef={menuButtonRef}
            />
          </div>
        </div>

        {/* Restaurant Status */}
        {(() => {
          if (!restaurantStatus) return null;

          const isOpen = restaurantStatus === RESTAURANT_STATUS.OPEN;
          return (
            <div
              className={`restaurant-status flex items-center px-[16px] py-[8px] rounded-[16px] font-bold text-[22px] whitespace-nowrap ${
                isOpen
                  ? "bg-status-open-bg text-status-open"
                  : "bg-status-closed-bg text-status-closed"
              }`}
            >
              {restaurantStatus}
            </div>
          );
        })()}
      </article>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison function for memo
    return (
      prevProps.item.id === nextProps.item.id &&
      prevProps.item.food_name === nextProps.item.food_name &&
      prevProps.item.food_rating === nextProps.item.food_rating &&
      prevProps.item.Price === nextProps.item.Price &&
      prevProps.item.restaurant_name === nextProps.item.restaurant_name &&
      prevProps.item.restaurant_status === nextProps.item.restaurant_status &&
      prevProps.onEdit === nextProps.onEdit &&
      prevProps.onDelete === nextProps.onDelete
    );
  }
);
