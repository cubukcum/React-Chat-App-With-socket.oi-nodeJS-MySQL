import React, { useState, useEffect } from 'react'
import InputEmoji from 'react-input-emoji'
import api from '../../services/api';
import {format} from 'timeago.js';

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleChange = (newMessage) => {
    setNewMessage(newMessage)
  }

  useEffect(() => {
    const getMessages = () => {
      api.post("/getmessages", {
        sender: currentUser,
        receiver: chat.id
      }).then(e => {
        setMessages(e.data)
      }).catch(e => {
        console.log(e)
      })
    }
    if (chat !== null) getMessages();
  }, [chat]);

  // Always scroll to last Message
  //   useEffect(()=> {
  //     scroll.current?.scrollIntoView({ behavior: "smooth" });
  //   },[messages])

  const handleSend = (e) => {
    e.preventDefault();
    const messageStruct = {
      sender: parseInt(currentUser),
      receiver: chat.id,
      text: newMessage,
    }
    try {
      api.post("/sendmessage", {
        sender: parseInt(currentUser),
        receiver: chat.id,
        text: newMessage,
      })
      setSendMessage(messageStruct)
      setMessages([...messages, messageStruct])
      setNewMessage("")
    } catch (error) {
      console.log(error)
    }
  }

  // Receive Message from parent component
  useEffect(() => {
    console.log("Message Arrived: ", receivedMessage)
    if (receivedMessage !== null && receivedMessage.receiver === parseInt(currentUser)) {
      setMessages([...messages, receivedMessage]);
    }

  }, [receivedMessage])

  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            {/* chat-header */}
            <div  className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src="https://joeschmoe.io/api/v1/random"
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>
                      {chat?.fname} {chat?.lname}
                    </span>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  width: "95%", border: "0.1px solid #ececec", marginTop: "20px",
                }}
              />
            </div>
            {/* chat-body */}
            <div className="chat-body" >
              {messages.map((message) => (
                <div key={message.id}>
                  <div //ref={scroll}
                    className={
                      message.sender === parseInt(currentUser)
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text}</span>{" "}
                    <span>{format(message.date)}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
              {/* <div onClick={() => imageRef.current.click()}>+</div> */}
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
              />
              <div className="send-button button" onClick={handleSend}>Send</div>
              <input
                type="text"
                name=""
                id=""
                style={{ display: "none" }}
              // ref={imageRef}
              />
            </div>{" "}
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  )
}

export default ChatBox