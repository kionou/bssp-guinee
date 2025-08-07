// axiosConfig.js
import axios from 'axios';




// Créez une instance d'Axios avec la configuration souhaitée
// https://cors-proxy.fringe.zone/

const axiosInstance = axios.create({
  baseURL: 'https://project-files.org/bspp/public/api/',
  withCredentials: true, // This is essential for sending cookies
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
 
 
});




// Exportez l'instance configurée d'Axios
export default axiosInstance;
