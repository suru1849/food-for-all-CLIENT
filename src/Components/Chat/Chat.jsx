/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useAuthData from "../../Hooks/useAuthData/useAuthData";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../Config/firebase.config";
import "../Chat/Chat.css";

// eslint-disable-next-line no-unused-vars
function Chat({ requester_email, donar_email }) {
  const { user } = useAuthData();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, "message");

  const roomData =
    donar_email === undefined && requester_email
      ? user?.email.concat("-", requester_email)
      : donar_email.concat("-", user?.email);

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", roomData),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      //   console.log(messages);
      setMessages(messages);
    });

    return () => unsuscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(messages);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      user: user?.displayName,
      room: roomData,
      createdAt: serverTimestamp(),
    });

    setNewMessage("");
  };

  return (
    <div className="chat-app">
      <div className="messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={
              "message py-1" //+
              //   (message.user === user?.displayName ? "text-right" : "text-left")
            }
          >
            <span className="user">
              {message.user === user?.displayName ? "You" : message.user}:
            </span>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          className="new-message-input"
          placeholder="Type your message here...."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button type="submit" className="send-button p-1 rounded-md">
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
