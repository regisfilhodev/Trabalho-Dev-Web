import axios from "axios";

// Para desenvolvimento local, usar as API routes
const endpoint = process.env.NODE_ENV === 'production' 
  ? process.env.REACT_APP_API_URL || '/api'
  : '/api';

export const api = axios.create({
  baseURL: endpoint,
});
