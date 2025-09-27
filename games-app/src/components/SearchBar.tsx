export default function SearchBar() {
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
              ></input>
              <div className="btn btn-dark w-25">search</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
