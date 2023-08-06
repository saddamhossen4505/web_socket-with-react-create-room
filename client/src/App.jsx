import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import rug from "random-username-generator";
const user = rug.generate();

// Init socket.
const socket = io("http://localhost:5050");

function App() {
  const [msg, setMsg] = useState("");
  const [userName, setUserName] = useState(user);
  const [chat, setChat] = useState([]);
  const [socketID, setSocketID] = useState("");
  const [room, setRoom] = useState("");

  // handleMsgSend.
  const handleMsgSend = (e) => {
    e.preventDefault();
    socket.emit("msg", { msg, userName, room });
    setMsg("");
  };

  // handleJoinRoom,
  const handleJoinRoom = (e) => {
    e.preventDefault();
    socket.emit("room", room);
  };

  useEffect(() => {
    socket.on("chat", (data) => {
      setChat([...chat, data]);
    });

    socket.on("cid", (data) => {
      setSocketID(data);
    });
  }, [chat]);

  return (
    <>
      <h1>User-Name : {userName}</h1>;<h2>Socket-ID : {socketID}</h2>
      <br />
      <br />
      <br />
      <br />
      <br />
      {chat.map((item, index) => {
        return (
          <p key={index}>
            <strong style={{ color: "red" }}>{item.userName}</strong>
            {item.msg}
          </p>
        );
      })}
      <div className="msg_area">
        <form onSubmit={handleMsgSend}>
          <input
            type="text"
            placeholder="Message"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>

        <form onSubmit={handleJoinRoom}>
          <input
            type="text"
            placeholder="Message"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button type="submit">Join</button>
        </form>
      </div>
    </>
  );
}

export default App;
