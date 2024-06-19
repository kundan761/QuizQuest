import { Link } from "react-router-dom";
import "./App.css";
import Router from "./router/Router";
import img from "../src/assets/quiz.png";

function App() {
  return (
    <>
      <div
        style={{ display: "flex", gap: "20px", justifyContent: "space-evenly" }}
      >
        <Link to="/" >
          <img
            style={{ width: "50px", height: "50px", marginTop: "10px" }}
            src={img}
            alt="logo"
          />
        </Link>
        <h2>
          <Link to="/" style={{ textDecoration: "none" }}>
            Home
          </Link>
        </h2>
        <h2>
          <Link to="/quiz" style={{ textDecoration: "none" }}>
            Quiz
          </Link>
        </h2>
        <h2>
          <Link to="/leaderboard" style={{ textDecoration: "none" }}>
            Leaderboard
          </Link>
        </h2>
      </div>
      <Router />
    </>
  );
}

export default App;
