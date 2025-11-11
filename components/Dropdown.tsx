"use client";

import { useEffect, useRef, ReactNode } from "react";
import { useOnClickOutside } from "usehooks-ts";

export interface DropdownItem {
  label: string;
  onClick: () => void;
  variant?: "default" | "error";
  icon?: ReactNode;
}

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  items: DropdownItem[];
  width?: string;
  position?: "top" | "bottom" | "left" | "right";
  align?: "start" | "end" | "center";
  triggerRef?: React.RefObject<HTMLElement | HTMLButtonElement | null>;
}

/**
 * Reusable Dropdown Component
 * Matches the styling of the restaurant status dropdown
 * Follows SOLID principles:
 * - Single Responsibility: Handles dropdown display and interaction
 * - Open/Closed: Extensible through props
 * - Dependency Inversion: Depends on abstractions (props interface)
 */
export const Dropdown = ({
  isOpen,
  onClose,
  items,
  width = "auto",
  position = "bottom",
  align = "end",
  triggerRef,
}: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use lodash's useOnClickOutside hook to handle clicks outside
  useOnClickOutside(
    [dropdownRef, triggerRef].filter(Boolean) as React.RefObject<HTMLElement>[],
    onClose
  );

  if (!isOpen || items.length === 0) return null;

  const positionClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2",
  };

  const alignClasses = {
    start: "left-0",
    end: "right-0",
    center: "left-1/2 -translate-x-1/2",
  };

  return (
    <>
      {/* Dropdown Menu */}
      <div
        ref={dropdownRef}
        className={`food-dropdown absolute ${positionClasses[position]} ${alignClasses[align]} bg-white box-border flex flex-col items-stretch shadow-2xl border-0 z-[9999] rounded-lg min-w-[120px] overflow-hidden`}
        style={{ width }}
        role="menu"
        aria-orientation="vertical"
      >
        {items.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => {
              item.onClick();
              onClose();
            }}
            className={`food-dropdown-item flex gap-3 items-center px-4 py-3 w-full hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors duration-150 cursor-pointer text-left ${
              item.variant === "error" ? "text-error" : "text-text-primary"
            }`}
            role="menuitem"
          >
            {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
            <span className="text-[14px] leading-[1.4] font-bold">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </>
  );
};
