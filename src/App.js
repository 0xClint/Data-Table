import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Home from "./pages/Home";
import { fetchAppName } from "./redux/AppReducer";
import { dataSort, fetchData } from "./redux/DataReducer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAppName());
    dispatch(fetchData({ startDate: "2021-06-01", endDate: "2021-06-30" }));
  }, []);

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
