import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number; // Tiempo de expiración en segundos desde epoch
}

export function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000; // Tiempo actual en segundos desde epoch
    return decoded.exp > currentTime;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return false;
  }
}