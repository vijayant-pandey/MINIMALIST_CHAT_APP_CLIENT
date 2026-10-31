import { createContext, useMemo, useContext, useEffect } from "react";
import io from "socket.io-client";
import { server } from "./constants/config";

const SocketContext = createContext();

const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const socket = useMemo(
    () =>
      io(server, {
        withCredentials: true,
        // Proxied through Vercel (see vercel.json), which doesn't support WebSockets
        transports: ["polling"],
      }),
    []
  );

  // Close the connection on logout (provider unmounts) so it doesn't keep
  // receiving the previous user's events; connect() is a no-op if already open
  useEffect(() => {
    socket.connect();
    return () => socket.disconnect();
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, getSocket };
