"use client";

import { Button } from "./Button";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
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
  isLoading = false,
}: DeleteConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="food-modal-overlay fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
      data-test-id="food-delete-modal"
    >
      <div
        className="food-modal bg-white rounded-[16px] w-full max-w-[700px] animate-slide-up shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Body */}
        <div className="food-modal-body p-6 sm:p-14">
          {/* Title */}
          <h2 className="text-secondary text-center text-[28px] sm:text-[32px] font-bold mb-4">
            Delete Meal
          </h2>

          {/* Body Text */}
          <p className="text-text-tertiary text-[16px] sm:text-[18px] leading-relaxed mb-6">
            Are you sure you want to delete this meal? Actions cannot be
            reversed.
          </p>

          {/* Action Buttons */}
          <div className="food-modal-footer flex gap-4">
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={onConfirm}
              isLoading={isLoading}
              loadingText="Deleting..."
              fullWidth
              className="food-delete-confirm-button flex-1 rounded-[14px]"
              data-test-id="food-delete-confirm-btn"
            >
              Yes
            </Button>
            <Button
              type="button"
              variant="white-border-2"
              size="md"
              onClick={onClose}
              disabled={isLoading}
              fullWidth
              className="food-cancel-button flex-1 rounded-[14px]"
              data-test-id="food-delete-cancel-btn"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
