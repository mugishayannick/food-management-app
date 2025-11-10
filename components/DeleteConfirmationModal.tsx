"use client";

import { X, Loader2, AlertTriangle } from "lucide-react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
  isLoading?: boolean;
}

/**
 * Delete Confirmation Modal Component
 * Follows project requirements: Modal for "Delete Food" action
 * All modals must have 100% width on mobile and be centered on desktop
 */
export const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  isLoading = false,
}: DeleteConfirmationModalProps) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div
      className="food-modal-overlay fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      data-testid="food-delete-modal"
    >
      <div
        className="food-modal bg-white rounded-[16px] w-full max-w-[500px] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="food-modal-header flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-[#212121] text-[24px] font-semibold">
              Delete Food
            </h2>
          </div>
          <button
            onClick={onClose}
            className="food-close-button p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150"
            aria-label="Close modal"
            disabled={isLoading}
          >
            <X className="w-6 h-6 text-[#424242]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="food-modal-body p-6">
          <p className="text-[#424242] text-[16px] leading-relaxed">
            Are you sure you want to delete{" "}
            <span className="font-semibold">
              {itemName ? `"${itemName}"` : "this food item"}
            </span>
            ? This action cannot be undone.
          </p>
        </div>

        {/* Modal Footer */}
        <div className="food-modal-footer flex gap-4 p-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="food-cancel-button flex-1 px-6 py-3 border border-gray-300 rounded-lg text-[#424242] hover:bg-gray-50 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="food-delete-cancel-btn"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isLoading}
            className="food-delete-button flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            data-testid="food-delete-confirm-btn"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Deleting Food...</span>
              </>
            ) : (
              "Delete Food"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
