import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faImage, faPaperPlane, faBars, faSearch } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim() !== '') {

      const userQuery = {
        'contents': input
      }

      axios.post("https://google-label-reader-backend.vercel.app/api/generate", userQuery).then((response) => {
        setMessages([...messages, { 'from': 'user', 'text': input }, { from: 'bot', text: response }]);
        console.log(response);
      })
      .catch(error => {
        setMessages([...messages, { 'from': 'user', 'text': input }, { from: 'bot', text: 'error' }]);
        console.error(error);
      });
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log('enter');
      handleSendMessage();
    }
  };

  const handleVoiceInput = () => {
    alert('Voice input functionality coming soon!');
  };

  const handleImageUpload = () => {
    alert('Image upload functionality coming soon!');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>LabelController</h1>

        {/* Top Right Corner - Menu and Search */}
        <div className="top-right">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
            <button className="search-button">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>

          <button className="menu-button">
            <FontAwesomeIcon icon={faBars} /> Menu
          </button>
        </div>
      </header>

      {/* Chat Window */}
      <div className="chat-window">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className="chat-message"
              style={{ textAlign: message.from === 'user' ? 'right' : 'left', backgroundColor: message.from === 'user' ? '#e1f5fe' : '#d1ffd6' }}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="chat-input"
          />
          <button className="icon-button" onClick={handleSendMessage}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>

        {/* Input Options - Text, Voice, Image */}
        <div className="chat-options">
          <button className="icon-button" onClick={handleVoiceInput}>
            <FontAwesomeIcon icon={faMicrophone} />
          </button>
          <button className="icon-button" onClick={handleImageUpload}>
            <FontAwesomeIcon icon={faImage} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;