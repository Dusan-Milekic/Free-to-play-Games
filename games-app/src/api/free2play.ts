export const fetchGamesApi = async () => {
  const response = await fetch("/api/games");
  return await response.json();
};
