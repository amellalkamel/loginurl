import "./App.css";
import Login from "./Login";
import DeleteAccount from "./DeleteAccount";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/delete-account" element={<DeleteAccount />} />
        </Routes>
      </div>
    </AuthProvider>

  );
}

export default App;
