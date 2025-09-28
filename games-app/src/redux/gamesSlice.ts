import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { fetchGamesApi } from "../api/free2play";

// Definiši tip za jednu igru
interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

// Definiši tip za slice state
interface IGamesState {
  games: Game[];
  time: number;
  gamesbyName: Game[];
}

// Početno stanje
const initialState: IGamesState = {
  games: [],

  time: 0,
  gamesbyName: [],
};

// Async thunk za dohvatanje igara
export const fetchAllGames = createAsyncThunk(
  "games/fetchAllGames",
  async () => {
    const startTime = performance.now();
    const data = await fetchGamesApi();
    const endTime = performance.now();
    const duration = endTime - startTime;

    return { data, duration }; // Vraćamo data i duration
  }
);

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    clearGames: (state) => {
      state.games = [];
      state.time = 0; // Reset time takođe
      state.gamesbyName = [];
    },
    searchGamebyName: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.gamesbyName = state.games.filter((g) =>
        g.title.toLowerCase().startsWith(searchTerm)
      );
    },
    clearSearchResults: (state) => {
      state.gamesbyName = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllGames.fulfilled, (state, action) => {
      state.games = action.payload.data; // Uzmi data iz payload-a
      state.time = action.payload.duration; // Uzmi duration iz payload-a
    });
  },
});

export const { clearGames, searchGamebyName } = gamesSlice.actions;

// Selektori
export const selectGames = (state: RootState) => state.allGames.games;
export const selectTime = (state: RootState) => state.allGames.time;
export const selectGamesbyName = (state: RootState) =>
  state.allGames.gamesbyName;

export default gamesSlice.reducer;
