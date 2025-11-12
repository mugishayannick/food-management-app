"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

export type ButtonVariant =
  | "primary"
  | "coral"
  | "white"
  | "white-border-2"
  | "tab-active"
  | "tab-inactive";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  children: ReactNode;
}

export const Button = ({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  isLoading = false,
  loadingText,
  fullWidth = false,
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) => {
  // Base classes
  const baseClasses =
    "inline-flex items-center justify-center font-bold transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  // Variant styles
  const variantClasses = {
    primary:
      "bg-gradient-to-l from-primary to-secondary text-white hover:opacity-90 shadow-[0px_5px_10px_0px_rgba(255,174,0,0.26),0px_20px_40px_0px_rgba(255,174,0,0.29)] hover:shadow-lg",
    coral: "bg-button-coral text-white hover:opacity-90",
    white: "bg-white border border-secondary text-black hover:bg-gray-50",
    "white-border-2":
      "bg-white border-2 border-secondary text-black hover:bg-primary/5",
    "tab-active": "bg-tab-active-bg text-tab-active",
    "tab-inactive": "bg-white text-tab-inactive hover:bg-gray-50",
  };

  // Icon color classes for tabs
  const getIconColorClass = () => {
    if (variant === "tab-active") return "text-primary";
    if (variant === "tab-inactive") return "text-tab-inactive-icon";
    return "";
  };

  // Size styles
  const sizeClasses = {
    sm: "px-3 py-2 text-sm gap-2 rounded-[8px]",
    md: "px-4 sm:px-6 py-3 text-sm sm:text-base gap-2 sm:gap-[10px] rounded-[8px]",
    lg: "px-[24px] py-[21px] text-[18px] gap-[10px] rounded-[14px]",
  };

  // Tab-specific size (for delivery/pickup tabs)
  const tabSizeClasses =
    variant === "tab-active" || variant === "tab-inactive"
      ? "px-3 sm:px-6 py-2 sm:py-[10px] text-sm sm:text-base gap-2 sm:gap-[10px] rounded-[8px]"
      : "";

  // Full width
  const widthClass = fullWidth ? "w-full" : "";

  // Combine all classes
  const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${tabSizeClasses || sizeClasses[size]}
    ${widthClass}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  // Determine icon to show
  const showIcon = !isLoading && icon;
  const showLoadingIcon = isLoading;

  // Icon size based on button size
  const iconSizeClass =
    size === "sm"
      ? "w-4 h-4"
      : size === "md"
      ? "w-4 h-4 sm:w-[18px] sm:h-[18px]"
      : "w-[18px] h-[18px]";

  return (
    <button
      className={combinedClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {showLoadingIcon && (
        <Loader2 className={`${iconSizeClass} animate-spin`} />
      )}
      {showLoadingIcon && loadingText && <span>{loadingText}</span>}
      {!showLoadingIcon && iconPosition === "left" && showIcon && (
        <span className={`${iconSizeClass} ${getIconColorClass()}`}>
          {icon}
        </span>
      )}
      {!showLoadingIcon && (
        <span
          className={
            variant === "tab-active" || variant === "tab-inactive"
              ? "font-bold"
              : ""
          }
        >
          {children}
        </span>
      )}
      {!showLoadingIcon && iconPosition === "right" && showIcon && (
        <span className={`${iconSizeClass} ${getIconColorClass()}`}>
          {icon}
        </span>
      )}
    </button>
  );
};
