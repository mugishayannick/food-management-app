import { renderHook, waitFor } from "@testing-library/react";
import { useFoods } from "@/hooks/useFoods";
import { foodApi, handleApiError } from "@/lib/api";
import toast from "react-hot-toast";

// Mock the API
jest.mock("@/lib/api", () => ({
  foodApi: {
    getAll: jest.fn(),
  },
  handleApiError: jest.fn((err) => {
    if (err instanceof Error) return err.message;
    return "An error occurred";
  }),
}));

// Mock react-hot-toast
jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    error: jest.fn(),
  },
}));

describe("useFoods Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 3: API Mocking - Successful data fetch
  describe("API Mocking - Successful Data Fetch", () => {
    it("should fetch and return food items successfully", async () => {
      const mockFoods = [
        {
          id: "1",
          food_name: "Burger",
          food_rating: 4.5,
          Price: "15.99",
        },
        {
          id: "2",
          food_name: "Pizza",
          food_rating: 4.8,
          Price: "20.99",
        },
      ];

      (foodApi.getAll as jest.Mock).mockResolvedValue(mockFoods);

      const { result } = renderHook(() => useFoods());

      // Initially loading
      expect(result.current.isLoading).toBe(true);
      expect(result.current.foods).toEqual([]);

      // Wait for data to load
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Verify foods are loaded
      expect(result.current.foods).toEqual(mockFoods);
      expect(result.current.error).toBeNull();
      expect(foodApi.getAll).toHaveBeenCalledTimes(1);
    });
  });

  // Test 4: API Mocking - Error handling
  describe("API Mocking - Error Handling", () => {
    it("should handle API errors gracefully and show error message", async () => {
      const errorMessage = "Failed to fetch foods";
      (foodApi.getAll as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(() => useFoods());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Verify error state - foods should be empty array
      expect(result.current.foods).toEqual([]);
      // Verify error is set
      expect(result.current.error).toBeTruthy();
      // Verify toast error was called
      expect(toast.error).toHaveBeenCalled();
    });
  });
});
