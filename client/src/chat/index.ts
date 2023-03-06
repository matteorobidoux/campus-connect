import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { UserClassSection } from '../../../types/UserClassSection';

export interface ChatMessage {
  message: string,
  room: UserClassSection,
  user: string,
  date: Date,
}

export interface UseChatArgs {
  onMessage: (arg: ChatMessage) => void,
  rooms: UserClassSection[],
}

const socket = io();

export const useChat = ({onMessage, rooms}: UseChatArgs) => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const sendMessage = ({message, room, user, date}: ChatMessage) => {
    let tempFix = {...room, _id: undefined}
    socket.send({room: tempFix, message, user, date});
  }

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true)
    });

    socket.on('disconnect', () => setIsConnected(false) );
    socket.on("message", onMessage);

    // rooms.forEach(room => socket.on("message", (message) => onMessage(message)) );

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
      rooms.forEach(room => socket.off(JSON.stringify(room)) );
    }
  }, [])

  useEffect(() => {
    if (!isConnected) return;
    console.log('emitting')
    socket.emit('setRoom', rooms.map(r => ({courseNumber: r.courseNumber, sectionNumber: r.sectionNumber})));
  }, [isConnected])

  return { isConnected, sendMessage };
}
