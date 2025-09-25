import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Typography, Box, LinearProgress } from "@mui/material";
import type { AppDispatch, RootState } from "../store/store";
import { fetchHabits, type Habit } from "../store/habitSlice";

const HabitStats: React.FC = () => {
  // Select habits data, loading state, and error from Redux store
  const { habits, isLoading, error } = useSelector(
    (state: RootState) => state.habits
  );

  const dispatch = useDispatch<AppDispatch>();

  /**
   * Fetch habits when the component mounts
   */
  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  /**
   * Get the total number of habits
   * @returns number
   */
  const getTotalHabits = () => habits.length;

  /**
   * Get the number of habits completed today
   * @returns number
   */
  const getCompletedToday = () => {
    const today = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format
    return habits.filter((habit) => habit.completedDates.includes(today))
      .length;
  };

  /**
   * Get the longest streak among all habits
   * @returns number of consecutive days
   */
  const getLongestStreak = () => {
    // Calculate streak for a single habit
    const getStreak = (habit: Habit) => {
      let streak = 0;
      const currentDate = new Date();

      while (true) {
        const dateString = currentDate.toISOString().split("T")[0];
        if (habit.completedDates.includes(dateString)) {
          streak++; // Increment streak if completed
          currentDate.setDate(currentDate.getDate() - 1); // Go one day back
        } else {
          break; // Stop if a day is missed
        }
      }

      return streak;
    };

    // Return the maximum streak across all habits, default 0
    return Math.max(...habits.map(getStreak), 0);
  };

  // Show loading indicator while fetching data
  if (isLoading) {
    return <LinearProgress />;
  }

  // Show error message if any error occurred
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  // Display statistics inside a Paper component
  return (
    <Paper elevation={2} sx={{ p: 2, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Habit Statistics
      </Typography>

      {/* Statistics details */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="body1">
          Total Habits: {getTotalHabits()}
        </Typography>
        <Typography variant="body1">
          Completed Today: {getCompletedToday()}
        </Typography>
        <Typography variant="body1">
          Longest Streak: {getLongestStreak()} days
        </Typography>
      </Box>
    </Paper>
  );
};

export default HabitStats;
