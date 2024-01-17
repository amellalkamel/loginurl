import React, { useEffect } from "react";
import "./styles.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import ipConfig from "./ipConfig";

const DeleteAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const userName = state.userName;
  const { isAuthenticated, logout } = useAuth();

  const handleDelete = () => {
    axios
      .post(`https://${ipConfig.id_adresse}:4012/api/user/desactiver`, {
        user: {
          username: userName,
        },
      })
      .then((resDesactivate) => {
        toast.success("Votre compte a été desactiver.", {
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
              navigate(`/`, { replace: true });
              logout();
              break;
            default:
              break;
          }
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
  };
  useEffect(() => {
    !isAuthenticated ? navigate(`/`, { replace: true }) : navigate(`/delete-account`, { state: { userName } });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2>Supprimer le compte AllJobs</h2>
      <p>Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.</p>
      <div>
        <p>Veuillez confirmer la suppression de votre compte AllJobs</p>
        <button onClick={handleDelete}>Confirmer la suppression</button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default DeleteAccount;
