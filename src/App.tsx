
import { Provider } from "react-redux";
import store from "./store/store";
import { Container, Typography } from "@mui/material";
import AddHabitForm from "./components/AddHabitForm";
import HabitList from "./components/HabitList";
import HabitStats from "./components/HabitStats";

const App = () => {
  return (
    <Provider store={store}>
      <Container maxWidth="md">
        <Typography component="h1" align="center" variant="h2" gutterBottom>
          Habit Tracker
        </Typography>
        <AddHabitForm />
        <HabitList/>
        <HabitStats/>
      </Container>
    </Provider>
  );
};

export default App;
