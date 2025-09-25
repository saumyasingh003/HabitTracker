import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addHabit } from "../store/habitSlice";
import type { AppDispatch } from "../store/store";

const AddHabitForm: React.FC = () => {
  // State to store the habit name input
  const [name, setName] = useState<string>("");

  // State to store the selected frequency, default is "daily"
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");

  // Redux dispatch function to send actions to the store
  const dispatch = useDispatch<AppDispatch>();

  /**
   * Handle form submission
   * @param e - Form event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh

    // Only dispatch if habit name is not empty
    if (name.trim()) {
      dispatch(
        addHabit({
          name,      // Habit name from state
          frequency, // Selected frequency from state
        })
      );

      // Reset form fields after submission
      setName("");
      setFrequency("daily");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form layout using a vertical Box with spacing */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        
        {/* Text input for habit name */}
        <TextField
          label="Habit Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Habit Name"
          fullWidth
          required
        />

        {/* Frequency selection dropdown */}
        <FormControl fullWidth>
          <InputLabel>Frequency</InputLabel>
          <Select
            value={frequency}
            label="Frequency"
            onChange={(e) =>
              setFrequency(e.target.value as "daily" | "weekly")
            }
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
          </Select>
        </FormControl>

        {/* Submit button */}
        <Button type="submit" variant="contained" color="success">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default AddHabitForm;
