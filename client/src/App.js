import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import NavBar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <div className="App">
      <div></div>
      <NavBar isAuth={isAuth} setIsAuth={setIsAuth} />
      {isAuth ? (
        <>
          <Router>
            <Routes>
              <Route path="*" exact element={<Dashboard />} />
            </Routes>
          </Router>
        </>
      ) : (
        <Register setIsAuth={setIsAuth} />
      )}
    </div>
  );
}

export default App;
