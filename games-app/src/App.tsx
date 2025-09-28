import { useEffect } from "react";
import "./App.css";

import { fetchAllGames } from "./redux/gamesSlice";
import { useAppDispatch } from "./redux/hooks/hook";

import Game from "./components/Game";
import SearchBar from "./components/SearchBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // ako treba JS

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllGames());
  }, [dispatch]);
  return (
    <>
      <div className="bg-white">
        <SearchBar></SearchBar>
        <Game></Game>
      </div>
    </>
  );
}

export default App;
