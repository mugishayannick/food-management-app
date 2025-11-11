import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FoodCard } from "@/components/FoodCard";
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
      <div data-test-id="food-dropdown">
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

const mockFoodItem: FoodItem = {
  id: "1",
  food_name: "Test Burger",
  food_rating: 4.5,
  food_image: "https://example.com/burger.jpg",
  Price: "15.99",
  restaurant_name: "Burger King",
  restaurant_status: "Open Now",
  avatar: "https://example.com/logo.png",
};

describe("FoodCard Component", () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Component Rendering
  describe("Component Rendering", () => {
    it("should render food card with expected props", () => {
      render(
        <FoodCard
          item={mockFoodItem}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      // Verify food name is displayed
      expect(screen.getByText("Test Burger")).toBeInTheDocument();

      // Verify rating is displayed (helper returns number, component displays it)
      // The rating is displayed inside a paragraph, so we use a more flexible query
      expect(screen.getByText("4.5")).toBeInTheDocument();

      // Verify price is displayed
      expect(screen.getByText("$15.99")).toBeInTheDocument();

      // Verify restaurant name is displayed (in image alt attribute)
      expect(screen.getByAltText("Burger King")).toBeInTheDocument();

      // Verify restaurant status is displayed
      expect(screen.getByText("Open Now")).toBeInTheDocument();

      // Verify card has correct test ID
      const card = screen.getByTestId("food-card");
      expect(card).toBeInTheDocument();
    });

    it("should render food card with missing optional fields gracefully", () => {
      const incompleteItem: FoodItem = {
        id: "2",
        food_name: "Incomplete Food",
      };

      render(
        <FoodCard
          item={incompleteItem}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      expect(screen.getByText("Incomplete Food")).toBeInTheDocument();
    });
  });

  // Test 2: User Interaction
  describe("User Interaction", () => {
    it("should open dropdown menu when menu button is clicked", async () => {
      render(
        <FoodCard
          item={mockFoodItem}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      const menuButton = screen.getByTestId("food-menu-button");
      expect(menuButton).toBeInTheDocument();

      // Click menu button
      fireEvent.click(menuButton);

      // Verify dropdown is open
      await waitFor(() => {
        expect(screen.getByTestId("food-dropdown")).toBeInTheDocument();
      });
    });

    it("should call onEdit when Edit is clicked in dropdown", async () => {
      render(
        <FoodCard
          item={mockFoodItem}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      const menuButton = screen.getByTestId("food-menu-button");
      fireEvent.click(menuButton);

      await waitFor(() => {
        expect(screen.getByTestId("food-dropdown")).toBeInTheDocument();
      });

      const editButton = screen.getByText("Edit");
      fireEvent.click(editButton);

      expect(mockOnEdit).toHaveBeenCalledWith(mockFoodItem);
    });

    it("should call onDelete when Delete is clicked in dropdown", async () => {
      render(
        <FoodCard
          item={mockFoodItem}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      );

      const menuButton = screen.getByTestId("food-menu-button");
      fireEvent.click(menuButton);

      await waitFor(() => {
        expect(screen.getByTestId("food-dropdown")).toBeInTheDocument();
      });

      const deleteButton = screen.getByText("Delete");
      fireEvent.click(deleteButton);

      expect(mockOnDelete).toHaveBeenCalledWith("1");
    });
  });
});
