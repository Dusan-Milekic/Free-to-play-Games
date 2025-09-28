import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks/hook";
import {
  selectGames,
  selectGamesbyName,
  selectTime,
} from "../redux/gamesSlice";

export default function Game() {
  const games = useAppSelector(selectGames);
  const filteredByName = useAppSelector(selectGamesbyName);
  const time = useAppSelector(selectTime);

  // Lokalni loading state - počinje sa true
  const [localLoad, setLocalLoad] = useState(true);

  useEffect(() => {
    // Ako nema igara, ostaje loading
    if (games.length === 0) {
      setLocalLoad(true);
    } else {
      // Ako ima igara, isključi loading
      setLocalLoad(false);
    }
  }, [games.length]);

  // Opciono: dodajte kratko kašnjenje kad se igre učitaju
  useEffect(() => {
    if (games.length > 0) {
      // Kratko kašnjenje za smooth UX
      const timer = setTimeout(() => {
        setLocalLoad(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [games.length]);

  // Loading state
  if (localLoad) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h1 className="fw-light">Loading... Please Wait</h1>
          <p className="text-muted">Fetching amazing games for you!</p>
        </div>
      </div>
    );
  }

  // Određuje koje igre da prikaže
  const gamesToShow = filteredByName.length > 0 ? filteredByName : games;

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">
        {filteredByName.length > 0
          ? `Filtered Games: ${filteredByName.length}`
          : `Total Games: ${games.length}`}
      </h2>

      {gamesToShow.length === 0 ? (
        <div className="text-center py-5">
          <h4 className="text-muted">No games found</h4>
          <p>Try adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="row g-4">
          {gamesToShow.map((game) => (
            <div
              className="col-lg-3 col-md-4 col-xl-2 col-sm-6 col-12"
              key={game.id}
            >
              <div className="card h-100 shadow-sm">
                <img
                  src={game.thumbnail}
                  className="card-img-top"
                  alt={game.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate" title={game.title}>
                    {game.title}
                  </h5>
                  <p className="card-text flex-grow-1 small">
                    {game.short_description.length > 100
                      ? `${game.short_description.substring(0, 100)}...`
                      : game.short_description}
                  </p>
                  <div className="mt-auto">
                    <div className="mb-2">
                      <span className="badge bg-secondary me-1">
                        {game.genre}
                      </span>
                      <span className="badge bg-info">{game.platform}</span>
                    </div>
                    <a
                      href={game.game_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm w-100"
                    >
                      Play Game
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info o vremenu učitavanja */}
      {time > 0 && (
        <div className="mt-4 text-center">
          <small className="text-muted">
            Games loaded in {(time / 1000).toFixed(2)} seconds
          </small>
        </div>
      )}
    </div>
  );
}
