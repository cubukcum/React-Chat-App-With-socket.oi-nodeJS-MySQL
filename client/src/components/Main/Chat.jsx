import React, {useState, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import ChatBox from './ChatBox';
import Contacts from './Contacts';
import api from '../../services/api';
import { io } from 'socket.io-client';


const Chat = () => {
const nav = useNavigate();

useEffect(()=>{
  if (localStorage.getItem('currentUser') === null){
    nav('/');
  }
})


    const [data, setData] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);
    const currentUserId = localStorage.getItem('currentUser')

    const socket = useRef();


    const getPeople = () => {
        api.get("/people", {
        }).then(e => {
            setData(e.data)
        }).catch(e => {
            message.error("Error loading users" + e.message)
        })
    }
    useEffect(() => {
        getPeople();
    }, []);

    // Connect to Socket.io
  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", parseInt(currentUserId));
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [currentUserId]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage!==null) {
      socket.current.emit("send-message", sendMessage);}
  }, [sendMessage]);


  // Get the message from socket server
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceivedMessage(data);
    }

    );
  }, []);

    return (
        <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {data.map((chat) => (
              <div
                onClick={() => {
                  setCurrentChat(chat);
                  console.log(chat.id)
                }}
                key={chat.id}
              >
                <Contacts
                  data={chat}
                  currentUser={currentUserId}
                //   online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          {/* <NavIcons /> */}
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={currentUserId}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
    )
}

export default Chat