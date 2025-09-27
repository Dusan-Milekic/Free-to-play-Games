import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks/hook";

export default function Game() {
  const games = useAppSelector((state) => state.allGames.games);
  const time = useAppSelector((state) => state.allGames.time);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (time > 0) {
      // Čeka da se API završi
      setTimeout(() => {
        setLoad(false);
      }, time);
    }
  }, [time]); // ← Dodajte time ovde!

  if (load) {
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

  return (
    <>
      <div className="container my-4">
        <h2 className="text-center mb-4">Total Games: {games.length}</h2>

        <div className="row g-4">
          {games.map((g) => (
            <div
              className="col-lg-3 col-md-4 col-g-xl-5 col-sm-6 col-12"
              key={g.id}
            >
              <div className="card h-100">
                <img src={g.thumbnail} className="card-img-top" alt={g.title} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{g.title}</h5>
                  <p className="card-text flex-grow-1">{g.short_description}</p>
                  <div className="mt-auto">
                    <span className="badge bg-secondary mb-2">{g.genre}</span>
                    <br />
                    <a
                      href={g.game_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Play Game
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
