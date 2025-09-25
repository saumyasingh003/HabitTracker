import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

// Define the Habit interface
export interface Habit {
  id: string;                       // Unique identifier for the habit
  name: string;                     // Habit name
  frequency: "daily" | "weekly";    // Habit frequency
  completedDates: string[];         // Array of dates when habit was completed
  createdAt: string;                // Date when the habit was created
}

// Define the slice state interface
interface HabitState {
  habits: Habit[];                  // Array of habits
  isLoading: boolean;               // Loading state for async operations
  error: string | null;             // Error message if API fails
}

// Initial state
const initialState: HabitState = {
  habits: [],
  isLoading: false,
  error: null,
};

/**
 * Async thunk to fetch habits (simulated API call)
 */
export const fetchHabits = createAsyncThunk("habits/fetchHabits", async () => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock habits data
  const mockHabits: Habit[] = [
    {
      id: "1",
      name: "Read",
      frequency: "daily",
      completedDates: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Exercise",
      frequency: "daily",
      completedDates: [],
      createdAt: new Date().toISOString(),
    },
  ];

  return mockHabits;
});

// Create the habit slice
const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    /**
     * Add a new habit
     */
    addHabit: (
      state,
      action: PayloadAction<{ name: string; frequency: "daily" | "weekly" }>
    ) => {
      const newHabit: Habit = {
        id: Date.now().toString(),       // Generate unique id using timestamp
        name: action.payload.name,
        frequency: action.payload.frequency,
        completedDates: [],              // Initially no completed dates
        createdAt: new Date().toISOString(),
      };
      state.habits.push(newHabit);       // Add habit to state
    },

    /**
     * Remove a habit by id
     */
    removeHabit: (state, action: PayloadAction<string>) => {
      state.habits = state.habits.filter(
        (habit) => habit.id !== action.payload
      );
    },

    /**
     * Toggle completion status of a habit for a given date
     */
    toggleHabit: (
      state,
      action: PayloadAction<{ id: string; date: string }>
    ) => {
      console.log(action); // Optional: for debugging

      const habit = state.habits.find((h) => h.id === action.payload.id);
      if (habit) {
        const index = habit.completedDates.indexOf(action.payload.date);
        if (index > -1) {
          habit.completedDates.splice(index, 1); // Remove date if already completed
        } else {
          habit.completedDates.push(action.payload.date); // Add date if not completed
        }
      }
    },
  },

  /**
   * Handle async actions (fetchHabits)
   */
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.isLoading = true; // Set loading state
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.isLoading = false; // Stop loading
        state.habits = action.payload; // Set fetched habits
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch habits"; // Handle error
      });
  },
});

// Export actions
export const { addHabit, removeHabit, toggleHabit } = habitSlice.actions;

// Export reducer
export default habitSlice.reducer;
