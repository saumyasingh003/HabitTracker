import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Button,
  LinearProgress,
  Paper,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import type { AppDispatch, RootState } from "../store/store";
import { removeHabit, toggleHabit, type Habit } from "../store/habitSlice";

const HabitList: React.FC = () => {
  // Select habits array from Redux store
  const habits = useSelector((state: RootState) => state.habits.habits);
  const dispatch = useDispatch<AppDispatch>();

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  /**
   * Calculate the current streak of completed days for a habit
   * @param habit - Habit object
   * @returns number of consecutive days the habit was completed
   */
  const getStreak = (habit: Habit) => {
    let streak = 0;
    const currentDate = new Date();

    while (true) {
      const dateString = currentDate.toISOString().split("T")[0];
      if (habit.completedDates.includes(dateString)) {
        streak++; // Increment streak if habit completed on that day
        currentDate.setDate(currentDate.getDate() - 1); // Go one day back
      } else {
        break; // Stop counting if habit not completed
      }
    }

    return streak;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
      {/* Loop through all habits */}
      {habits.map((habit) => (
        <Paper key={habit.id} elevation={2} sx={{ p: 2 }}>
          {/* Container for habit info and buttons */}
          <Grid spacing={2} className="flex justify-between">
            
            {/* Habit name and frequency */}
            <Grid>
              <Typography variant="h6">{habit.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {habit.frequency.charAt(0).toUpperCase() +
                  habit.frequency.slice(1)}
              </Typography>
            </Grid>

            {/* Buttons: Mark Complete / Completed and Remove */}
            <Grid>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                <Button
                  variant="outlined"
                  color={habit.completedDates.includes(today) ? "success" : "primary"}
                  onClick={() =>
                    dispatch(toggleHabit({ id: habit.id, date: today }))
                  }
                  startIcon={<CheckCircleIcon />}
                >
                  {habit.completedDates.includes(today)
                    ? "Completed"
                    : "Mark Complete"}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => dispatch(removeHabit(habit.id))}
                  startIcon={<DeleteIcon />}
                >
                  Remove
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* Display current streak and progress bar */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              Current Streak: {getStreak(habit)} days
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(getStreak(habit) / 30) * 100} // Show progress relative to 30-day goal
              sx={{ mt: 1 }}
            />
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default HabitList;
