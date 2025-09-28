import { useState } from "react";
import { useAppDispatch } from "../redux/hooks/hook";
import { searchGamebyName } from "../redux/gamesSlice"; // ISPRAVKA: Import AKCIJU, ne selektor

export default function SearchBar() {
  const [text, setText] = useState<string>("");

  const dispatch = useAppDispatch();

  const filterbyName = () => {
    dispatch(searchGamebyName(text)); // ISPRAVKA: Koristite searchGamebyName akciju
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="search-container">
              <input
                type="text"
                className="form-control search-input"
                placeholder="Game name..."
                onChange={(e) => setText(e.currentTarget.value.toLowerCase())}
              ></input>
              <div className="btn btn-dark w-25" onClick={filterbyName}>
                search
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
