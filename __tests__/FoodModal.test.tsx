import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FoodModal } from "@/components/FoodModal";
import { FoodItem } from "@/types/food";

// Mock the Dropdown component
jest.mock("@/components/Dropdown", () => ({
  Dropdown: ({
    isOpen,
    items,
    onClose,
  }: {
    isOpen: boolean;
    items: Array<{ label: string; onClick: () => void }>;
    onClose: () => void;
  }) =>
    isOpen ? (
      <div data-test-id="food-status-dropdown">
        {items.map((item, index: number) => (
          <button
            key={index}
            onClick={() => {
              item.onClick();
              onClose();
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    ) : null,
}));

// Mock the Button component
jest.mock("@/components/Button", () => ({
  Button: ({
    children,
    onClick,
    type,
    isLoading,
    loadingText,
    className,
    "data-test-id": dataTestId,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    isLoading?: boolean;
    loadingText?: string;
    className?: string;
    "data-test-id"?: string;
  }) => (
    <button
      onClick={onClick}
      type={type}
      className={className}
      data-test-id={dataTestId}
    >
      {isLoading ? loadingText || children : children}
    </button>
  ),
}));

const mockOnSave = jest.fn();
const mockOnClose = jest.fn();

const mockEditItem: FoodItem = {
  id: "1",
  food_name: "Test Burger",
  food_rating: 4.5,
  food_image: "https://example.com/burger.jpg",
  Price: "15.99",
  restaurant_name: "Burger King",
  restaurant_status: "Open Now",
  avatar: "https://example.com/logo.png",
};

describe("FoodModal Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Component Rendering
  describe("Component Rendering", () => {
    it("should render Add Food modal with empty form when editItem is null", () => {
      render(
        <FoodModal
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
          editItem={null}
        />
      );

      expect(screen.getByText("Add a meal")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Food name")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Food rating")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Food image (link)")
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Restaurant name")
      ).toBeInTheDocument();
    });

    it("should render Edit Food modal with pre-filled form when editItem is provided", () => {
      render(
        <FoodModal
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
          editItem={mockEditItem}
        />
      );

      expect(screen.getByText("Edit Meal")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Test Burger")).toBeInTheDocument();
      expect(screen.getByDisplayValue("4.5")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Burger King")).toBeInTheDocument();
    });
  });

  // Test 2: User Interaction - Form Input and Submission
  describe("User Interaction", () => {
    it("should update form fields when user types", () => {
      render(
        <FoodModal
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
          editItem={null}
        />
      );

      const foodNameInput = screen.getByPlaceholderText("Food name");
      fireEvent.change(foodNameInput, { target: { value: "New Food" } });

      expect(foodNameInput).toHaveValue("New Food");
    });

    it("should show validation errors for empty required fields", async () => {
      render(
        <FoodModal
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
          editItem={null}
        />
      );

      const submitButton = screen.getByText("Add");
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Food Name is required")).toBeInTheDocument();
        expect(
          screen.getByText("Food Image URL is required")
        ).toBeInTheDocument();
        expect(
          screen.getByText("Restaurant Name is required")
        ).toBeInTheDocument();
      });
    });

    it("should update form fields when user types", () => {
      render(
        <FoodModal
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
          editItem={null}
        />
      );

      const foodNameInput = screen.getByPlaceholderText("Food name");
      fireEvent.change(foodNameInput, { target: { value: "New Food" } });

      expect(foodNameInput).toHaveValue("New Food");
    });

    it("should submit form when all required fields are filled", async () => {
      mockOnSave.mockResolvedValue(undefined);

      render(
        <FoodModal
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
          editItem={null}
        />
      );

      // Fill in all required fields
      fireEvent.change(screen.getByPlaceholderText("Food name"), {
        target: { value: "Test Food" },
      });
      fireEvent.change(screen.getByPlaceholderText("Food rating"), {
        target: { value: "4.5" },
      });
      fireEvent.change(screen.getByPlaceholderText("Food image (link)"), {
        target: { value: "https://example.com/image.jpg" },
      });
      fireEvent.change(screen.getByPlaceholderText("Restaurant name"), {
        target: { value: "Test Restaurant" },
      });
      fireEvent.change(screen.getByPlaceholderText("Restaurant logo (link)"), {
        target: { value: "https://example.com/logo.jpg" },
      });

      const submitButton = screen.getByText("Add");
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSave).toHaveBeenCalled();
      });
    });
  });
});
