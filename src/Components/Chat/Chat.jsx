/* eslint-disable react/prop-types */
import { useState } from "react";
import useAuthData from "../../Hooks/useAuthData/useAuthData";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../Config/firebase.config";
import "../Chat/Chat.css";

// eslint-disable-next-line no-unused-vars
function Chat({ requester_email, donar_email }) {
  const { user } = useAuthData();
  const [newMessage, setNewMessage] = useState("");

  const messagesRef = collection(db, "message");

  const roomData =
    donar_email === undefined && requester_email
      ? user?.email.concat("-", requester_email)
      : donar_email.concat("-", user?.email);

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
