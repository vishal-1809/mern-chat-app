import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import "../style.scss";

const ChatInput = ({ handleSendMessage }) => {
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmoji = () => {
    setEmojiPicker(!emojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMessage(msg);
      setMsg("");
    }
  };
  return (
    <>
      <div className="chat-input">
        <div className="container-chatInput">
          <div className="emoji">
            <BsEmojiSmileFill onClick={handleEmoji} />
            {emojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
          </div>
        </div>
        <form className="input-container" onSubmit={(e) => sendChat(e)}>
          <input
            type="text"
            placeholder="Type your message here..."
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />
          <button className="submit">
            <IoMdSend />
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatInput;
