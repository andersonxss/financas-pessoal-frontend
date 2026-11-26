import React, {
	createContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
	socket: Socket | null;
}

export const SocketContext = createContext<SocketContextType>({ socket: null });

interface SocketProviderProps {
	children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		const socketInstance = io(import.meta.env.VITE_API_BASE_URL || "http://localhost:3333", {
			withCredentials: true,
		});

		setSocket(socketInstance);

		return () => {
			socketInstance.disconnect();
		};
	}, []);

	return (
		<SocketContext.Provider value={{ socket }}>
			{children}
		</SocketContext.Provider>
	);
};
