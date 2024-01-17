import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./Login.css";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import ipConfig from "./ipConfig";


const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login,setToken } = useAuth();

  const handleLogin = async () => {
    try {
      if (userName !== "" && password !== "") {

        let userInfo = {
          username: userName,
          password: password,
        };
        
        axios
          .post(`https://${ipConfig.id_adresse}:4012/api/auth/login`, {
            ...userInfo,
          })
          .then((resLogin) => {

            setToken(resLogin.data.token)
            toast.success("Authentification reussie", {
              position: "top-right",
              autoClose: 3000, // Durée d'affichage en millisecondes
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            toast.onChange((payload) => {
              switch (payload.status) {
                case "removed":
                  navigate(`/delete-account`, { state: { userName } });
                  login();
                  break;
                default:
                  break;
              }
            });
          })
          .catch((errorLogin) => {
            toast.error("Erreur d'authentification", {
              position: "top-right",
              autoClose: 3000, // Durée d'affichage en millisecondes
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          });
      } else {
        toast.error("Tous les champs sont nécessaires", {
          position: "top-right",
          autoClose: 3000, // Durée d'affichage en millisecondes
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (errorLogin) {
      toast.error("Login failed", {
        position: "top-right",
        autoClose: 3000, // Durée d'affichage en millisecondes
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h2>AllJobs</h2>
        <label>Nom d'utilisateur:</label>
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required />
        <label>Mot de passe:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
