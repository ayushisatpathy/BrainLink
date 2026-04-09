import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

let socket: Socket | null = null;

export const getSocket = () => {
  if (typeof window === 'undefined') return null as any;
  if (!socket) {
    socket = io(SOCKET_URL);
  }
  return socket;
};
