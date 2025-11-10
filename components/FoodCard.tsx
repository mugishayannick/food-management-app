import { useState } from "react";
import { FoodItem } from "../types/food";
import { MoreVertical, Edit2, Trash2 } from "lucide-react";
import { getFoodImage, getRestaurantLogo } from "@/utils/fallbackImages";

interface FoodCardProps {
  item: FoodItem;
  onEdit: (item: FoodItem) => void;
  onDelete: (id: string) => void;
}

export const FoodCard = ({ item, onEdit, onDelete }: FoodCardProps) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <article
      className="food-card content-stretch flex flex-col gap-4 sm:gap-6 items-start overflow-hidden relative rounded-[16px] shrink-0 animate-slide-up w-full max-w-full"
      data-testid="food-card"
    >
      {/* Food Photo */}
      <div className="food-photo bg-gray-100 h-[301px] overflow-hidden relative rounded-[16px] shrink-0 w-full">
        <img
          alt={item.food_name || "Food item"}
          className="absolute inset-0 w-full h-full object-cover"
          src={getFoodImage(item.food_image)}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = getFoodImage();
          }}
        />
        {/* Price Badge */}
        {(item.Price || item.price) && (
          <div className="absolute content-stretch flex gap-[8px] items-start left-[24px] top-[24px]">
            <div className="food-price bg-[#f17228] box-border content-stretch flex gap-[10px] items-center not-italic px-[16px] py-[8px] relative rounded-[8px] shrink-0 text-nowrap text-white">
              <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[18px]">
                <p className="leading-[1.2] text-nowrap whitespace-pre">🏷️</p>
              </div>
              <p className="leading-[1.2] relative shrink-0 text-[22px] whitespace-pre">
                ${item.Price || item.price || "0.00"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Restaurant Info */}
      <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
        <div className="content-stretch flex gap-[24px] items-center relative shrink-0 min-w-0 flex-1">
          <img
            alt={item.restaurant_name || item.name || "Restaurant logo"}
            className="restaurant-logo rounded-full object-cover size-[64px] shrink-0 flex-shrink-0"
            src={getRestaurantLogo(
              item.avatar,
              item.logo,
              item.restaurant_image
            )}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = getRestaurantLogo();
            }}
          />
          <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 min-w-0 flex-1">
            <p className="food-name leading-[1.2] not-italic relative shrink-0 text-[#424242] text-[22px] truncate w-full">
              {item.food_name || item.name || "Unnamed Food"}
            </p>
            <div className="food-rating content-stretch flex gap-[8px] items-start not-italic relative shrink-0 text-[#ffb30e] text-[22px]">
              <span className="leading-[1.06]">⭐</span>
              <p className="leading-[1.2] relative shrink-0">
                {item.food_rating || item.rating || 0}
              </p>
            </div>
          </div>
        </div>

        {/* More Menu */}
        <div className="relative flex items-center justify-center shrink-0">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="food-menu-button flex items-center justify-center p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150"
            data-testid="food-menu-button"
            aria-label="More options"
          >
            <div className="flex-none rotate-[180deg] scale-y-[-100%]">
              <div className="h-[20px] relative w-[4px]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 4 20"
                >
                  <path
                    d="M2 2C2.55228 2 3 1.55228 3 1C3 0.447715 2.55228 0 2 0C1.44772 0 1 0.447715 1 1C1 1.55228 1.44772 2 2 2Z"
                    fill="#424242"
                  />
                  <path
                    d="M2 11C2.55228 11 3 10.5523 3 10C3 9.44771 2.55228 9 2 9C1.44772 9 1 9.44771 1 10C1 10.5523 1.44772 11 2 11Z"
                    fill="#424242"
                  />
                  <path
                    d="M2 20C2.55228 20 3 19.5523 3 19C3 18.4477 2.55228 18 2 18C1.44772 18 1 18.4477 1 19C1 19.5523 1.44772 20 2 20Z"
                    fill="#424242"
                  />
                </svg>
              </div>
            </div>
          </button>

          {showMenu && (
            <>
              {/* Backdrop to close menu when clicking outside */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />
              <div className="food-dropdown absolute right-0 top-[40px] bg-white box-border flex flex-col items-start rounded-[5px] shadow-lg border border-[#edeef1] z-20">
                <button
                  onClick={() => {
                    onEdit(item);
                    setShowMenu(false);
                  }}
                  className="food-edit-button flex gap-[12px] items-center px-[16px] py-[10px] w-full hover:bg-gray-50 transition-colors duration-150"
                  data-testid="food-edit-btn"
                >
                  <Edit2 className="w-4 h-4 text-[#425466]" />
                  <span className="text-[#425466] text-[12px] leading-[14px]">
                    Edit
                  </span>
                </button>
                <button
                  onClick={() => {
                    onDelete(item.id || "");
                    setShowMenu(false);
                  }}
                  className="food-delete-button flex gap-[12px] items-center px-[16px] py-[10px] w-full hover:bg-gray-50 transition-colors duration-150"
                  data-testid="food-delete-btn"
                >
                  <Trash2 className="w-4 h-4 text-[#ff3b30]" />
                  <span className="text-[#ff3b30] text-[12px] leading-[14px]">
                    Delete
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Restaurant Status */}
      {(() => {
        const status =
          item.restaurant_status ||
          (item.open !== undefined
            ? item.open
              ? "Open Now"
              : "Closed"
            : null);
        return status ? (
          <div
            className={`restaurant-status box-border content-stretch flex gap-[10px] items-start px-[16px] py-[8px] relative rounded-[16px] shrink-0 ${
              status === "Open Now"
                ? "bg-[rgba(121,185,60,0.2)]"
                : "bg-[rgba(241,114,40,0.2)]"
            }`}
          >
            <p
              className={`leading-[1.2] not-italic relative shrink-0 text-[22px] text-nowrap whitespace-pre ${
                status === "Open Now" ? "text-[#79b93c]" : "text-[#f17228]"
              }`}
            >
              {status}
            </p>
          </div>
        ) : null;
      })()}
    </article>
  );
};
