import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./Login.css";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      if (userName !== "" && password !== "") {
        // const id_adresse = "192.168.1.52";
        // const id_adresse = "localhost";

        const id_adresse = "185.98.128.23";

        let userInfo = {
          username: userName,
          password: password,
        };
        axios
          .post(`http://${id_adresse}:4012/api/auth/login`, {
            ...userInfo,
          })
          .then((resLogin) => {
            axios
              .post(`http://${id_adresse}:4012/api/user/valider`, {
                user: {
                  username: userName,
                },
              })
              .then((resDesactivate) => {
                toast.success("Votre compte a été desactiver.", {
                  position: "top-right",
                  autoClose: 6000, // Durée d'affichage en millisecondes
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                });
              })
              .catch((errDesactivate) => {
                toast.error("Erreur de desactivation du compte", {
                    position: "top-right",
                    autoClose: 6000, // Durée d'affichage en millisecondes
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });
              });
          })
          .catch((errorLogin) => {
            toast.error("Erreur d'authentification", {
                position: "top-right",
                autoClose: 6000, // Durée d'affichage en millisecondes
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
          });
      } else {
        toast.error("Tous les champs sont nécessaires", {
          position: "top-right",
          autoClose: 6000, // Durée d'affichage en millisecondes
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (errorLogin) {
        toast.error("Login failed", {
            position: "top-right",
            autoClose: 6000, // Durée d'affichage en millisecondes
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
