import io from 'socket.io-client';

const socket_url = 'http://localhost:5000'

export const socket = io(socket_url);

