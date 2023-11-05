import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Protected from "./components/Protected";
import TodoPage from "./pages/todo";
import Signup from "./pages/signup";
import Login from "./pages/login";


function App() {
  const [user, setUser] = useState(null);


  return (
    <Router>
      <section className="h-full">
        <Routes>
          <Route
            path="/"
            element={
              <Protected user={user}>
                <TodoPage user={user} setUser={setUser} />
              </Protected>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
        </Routes>
      </section>
    </Router>
  );
}

export default App;
