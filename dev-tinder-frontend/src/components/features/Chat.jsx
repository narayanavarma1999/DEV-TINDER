import { useParams } from 'react-router-dom'
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { FiSend, FiPaperclip, FiSmile, FiMoreVertical, FiSearch, FiVideo, FiPhone, FiUserPlus, FiMenu } from 'react-icons/fi';
import { useSelector } from "react-redux";
import { createSocketConnection } from '../../utils/constants/constants'
import { chatMessages } from '../../utils/services/api.service';

const Chat = () => {
  const { targetUserId } = useParams()
  const user = useSelector(store => store.user)
  const userId = user?._id
  const userName = user?.firstName

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeChat, setActiveChat] = useState('Team Standup');
  const [searchQuery, setSearchQuery] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTeamSidebarOpen, setIsTeamSidebarOpen] = useState(true);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  // Memoize static data to prevent recreation on every render
  const chats = useMemo(() => [
    { name: 'Team Standup', unread: 2, lastMessage: 'Jane: See you tomorrow!', time: '10:45 AM' },
    { name: 'Design Review', unread: 0, lastMessage: 'You: The mockups look great', time: 'Yesterday' },
    { name: 'Client Feedback', unread: 5, lastMessage: 'Client: We need some changes...', time: 'Monday' },
    { name: 'Engineering', unread: 0, lastMessage: 'Alex: PR #342 merged', time: '2 days ago' },
  ], []);

  const teamMembers = useMemo(() => [
    { name: 'Jane Cooper', role: 'Product Manager', online: true, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'Alex Morgan', role: 'Backend Engineer', online: true, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Sam Wilson', role: 'Frontend Lead', online: false, avatar: 'https://randomuser.me/api/portraits/men/22.jpg' },
    { name: 'Taylor Swift', role: 'UX Designer', online: true, avatar: 'https://randomuser.me/api/portraits/women/33.jpg' },
  ], []);

  // Helper function to determine if a message is from the current user
  const isMyMessage = useCallback((message) => {
    // Check various possible ways a message might indicate ownership
    return (
      (message.senderId && message.senderId._id === userId) ||
      (message.userId === userId) ||
      (message.sender === userName) ||
      (message.firstName === userName) ||
      (message.isMe === true)
    );
  }, [userId, userName]);

  const handleSendMessage = useCallback(() => {
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: Date.now(),
      sender: userName,
      senderId: { _id: userId, firstName: userName },
      firstName: userName,
      userId,
      text: newMessage,
      targetUserId,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      avatar: null
    };

    setNewMessage('');

    // Send via socket if connected
    if (socketRef.current && connectionStatus === 'connected') {
      socketRef.current.emit("sendmessage", newMsg);
    }
    
  }, [newMessage, userId, targetUserId, userName, connectionStatus]);

  // Initialize socket connection
  useEffect(() => {
    if (!userId) return;

    if (!socketRef.current) {
      const socket = createSocketConnection();
      socketRef.current = socket;

      socket.on("connect", () => {
        setConnectionStatus("connected");
        const room = [userId, targetUserId].sort().join("_");
        socket.emit("join", { userId, targetUserId, userName, room });
      });

      socket.on("disconnect", () => setConnectionStatus("disconnected"));
      socket.on("connect_error", () => setConnectionStatus("error"));

      socket.on("messageReceived", ({ firstName, text, senderId }) => {
        const newMsg = {
          id: Date.now(),
          firstName,
          senderId: senderId || { _id: firstName === userName ? userId : targetUserId, firstName },
          userId: firstName === userName ? userId : targetUserId,
          sender: firstName,
          text,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isMe: firstName === userName,
          avatar: firstName === userName ? null : "https://randomuser.me/api/portraits/men/1.jpg"
        };
        setMessages(prev => [...prev, newMsg]);
      });
    }

    return () => {
      // Clean up socket connection when component unmounts
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [userId, targetUserId, userName]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const response = await chatMessages(targetUserId);
        // Ensure all messages have proper senderId structure
        const formattedMessages = response.chat.messages.map(msg => ({
          ...msg,
          senderId: msg.senderId || { _id: msg.userId, firstName: msg.sender }
        }));
        setMessages(formattedMessages);
      } catch (error) {
        console.log(`Error while fetching chat:${error.message}`);
      }
    };

    fetchChatMessages();
  }, [targetUserId]);

  // Memoize connection status indicator to prevent unnecessary re-renders
  const connectionStatusIndicator = useMemo(() => (
    <div className={`fixed top-4 right-4 z-50 px-3 py-1.5 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm ${connectionStatus === 'connected' ? 'bg-green-500/90 text-white' : connectionStatus === 'connecting' ? 'bg-yellow-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
      {connectionStatus === 'connected' ? 'Connected' : connectionStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
    </div>
  ), [connectionStatus]);

  // Memoize sidebar toggle button
  const sidebarToggleButton = useMemo(() => (
    <button
      className="fixed top-4 left-4 z-40 lg:hidden btn btn-circle btn-sm bg-base-100/80 backdrop-blur-sm"
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
    >
      <FiMenu className="text-lg" />
    </button>
  ), [isSidebarOpen]);

  // Memoize chat list to prevent re-renders when unrelated state changes
  const chatList = useMemo(() => (
    chats.map((chat, index) => (
      <div key={index}
        className={`flex items-center p-3 hover:bg-base-200 cursor-pointer transition-all duration-200 ${activeChat === chat.name ? 'bg-primary/10 border-r-2 border-primary' : ''}`}
        onClick={() => setActiveChat(chat.name)}
      >
        <div className="avatar placeholder">
          <div className="bg-gradient-to-br from-primary to-secondary text-primary-content rounded-full w-10">
            <span className="font-semibold">{chat.name.charAt(0)}</span>
          </div>
        </div>
        <div className="ml-3 flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-sm truncate">{chat.name}</h3>
            <span className="text-xs text-gray-500 whitespace-nowrap">{chat.time}</span>
          </div>
          <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
        </div>
        {chat.unread > 0 && (
          <span className="badge badge-primary badge-sm ml-2 min-h-5 h-5 w-5 p-0 flex items-center justify-center">{chat.unread}</span>
        )}
      </div>
    ))
  ), [chats, activeChat]);

  // Memoize team members list
  const teamMembersList = useMemo(() => (
    teamMembers.map((member, index) => (
      <div key={index} className="flex items-center p-3 hover:bg-base-200 rounded-xl cursor-pointer transition-colors">
        <div className={`avatar ${member.online ? 'online' : 'offline'} ring-2 ring-offset-2 ${member.online ? 'ring-green-400' : 'ring-base-300'} ring-offset-base-100`}>
          <div className="w-12 rounded-full">
            <img src={member.avatar} alt={member.name} />
          </div>
        </div>
        <div className="ml-3">
          <h4 className="font-medium text-sm">{member.name}</h4>
          <p className="text-xs text-gray-500">{member.role}</p>
        </div>
      </div>
    ))
  ), [teamMembers]);

  // Memoize messages rendering to prevent re-renders when unrelated state changes
  const messagesList = useMemo(() => {
    if (messages.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center py-12">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-1">No messages yet</h3>
          <p className="text-gray-500 text-sm">Send a message to start the conversation</p>
        </div>
      );
    }

    return messages.map((message, index) => {
      const isMine = isMyMessage(message);
      return (
        <div key={message._id || message.id || index}
          className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
        > 
          {!isMine && (
            <div className="avatar mr-3 self-end">
              <div className="w-8 rounded-full ring-1 ring-base-300">
                <img src={message.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'} alt={message.sender} />
              </div>
            </div>
          )}
          <div className={`max-w-xs md:max-w-md lg:max-w-lg rounded-3xl p-4 relative ${isMine
            ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-content rounded-br-md'
            : 'bg-base-100 border border-base-300 rounded-bl-md shadow-sm'}`}
          >
            {!isMine && (
              <p className="font-medium text-sm mb-1 text-primary">{message.senderId.firstName}</p>
            )}
            <p className={isMine ? 'text-primary-content' : 'text-base-content'}>
              {message.text}
            </p>
            <p className={`text-xs mt-1.5 flex justify-end ${isMine ? 'text-primary-content/80' : 'text-gray-500'}`}>
              {message.time}
            </p>
          </div>
        </div>
      );
    });
  }, [messages, isMyMessage]);

  return (
    <div className="flex h-screen bg-base-200 font-sans">
      {connectionStatusIndicator}
      {sidebarToggleButton}

      {/* Sidebar */}
      <div className={`w-80 bg-base-100 border-r border-base-300 flex flex-col transition-all duration-300 z-30 fixed lg:static h-full ${isSidebarOpen ? 'left-0' : '-left-80'} lg:left-0`}>
        {/* Header */}
        <div className="p-4 border-b border-base-300">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-primary">Messages</h1>
            <button className="btn btn-ghost btn-sm lg:hidden" onClick={() => setIsSidebarOpen(false)}>
              &times;
            </button>
          </div>
          <div className="relative mt-3">
            <input
              type="text"
              placeholder="Search messages..."
              className="input input-bordered w-full pl-10 input-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400 text-sm" />
          </div>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto">
          {chatList}
        </div>

        {/* User profile */}
        <div className="p-4 border-t border-base-300 flex items-center bg-base-200/50">
          <div className="avatar online">
            <div className="w-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
              <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User" />
            </div>
          </div>
          <div className="ml-3">
            <h3 className="font-medium text-sm">You</h3>
            <p className="text-xs text-gray-500">Online</p>
          </div>
          <button className="ml-auto btn btn-ghost btn-sm">
            <FiMoreVertical />
          </button>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat header */}
        <div className="p-4 border-b border-base-300 flex items-center justify-between bg-base-100">
          <div className="flex items-center">
            <button
              className="btn btn-ghost btn-sm mr-2 lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <FiMenu className="text-lg" />
            </button>
            <div className="avatar-group -space-x-3">
              {teamMembers.filter(m => m.online).slice(0, 3).map((member, index) => (
                <div key={index} className="avatar online">
                  <div className="w-10 ring-2 ring-base-100">
                    <img src={member.avatar} alt={member.name} />
                  </div>
                </div>
              ))}
              {teamMembers.filter(m => m.online).length > 3 && (
                <div className="avatar placeholder">
                  <div className="w-10 bg-neutral text-neutral-content ring-2 ring-base-100">
                    <span className="text-xs">+{teamMembers.filter(m => m.online).length - 3}</span>
                  </div>
                </div>
              )}
            </div>
            <div className="ml-4">
              <h2 className="font-bold text-lg">{activeChat}</h2>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                {teamMembers.filter(m => m.online).length} online
              </p>
            </div>
          </div>
          <div className="flex space-x-1">
            <button className="btn btn-ghost btn-circle btn-sm">
              <FiVideo className="text-lg" />
            </button>
            <button className="btn btn-ghost btn-circle btn-sm">
              <FiPhone className="text-lg" />
            </button>
            <button className="btn btn-ghost btn-circle btn-sm">
              <FiUserPlus className="text-lg" />
            </button>
            <button className="btn btn-ghost btn-circle btn-sm">
              <FiSearch className="text-lg" />
            </button>
            <button
              className="btn btn-ghost btn-circle btn-sm hidden lg:flex"
              onClick={() => setIsTeamSidebarOpen(!isTeamSidebarOpen)}
            >
              <FiMoreVertical className="text-lg" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-base-100 bg-gradient-to-b from-base-100 to-base-200/30">
          <div className="max-w-3xl mx-auto space-y-4">
            {messagesList}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message input */}
        <div className="p-4 border-t border-base-300 bg-base-100">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-center">
              <button className="btn btn-ghost btn-sm mr-2">
                <FiPaperclip className="text-lg" />
              </button>
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="input input-bordered w-full pr-12 py-5 rounded-full"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={connectionStatus !== 'connected'}
                />
                <button className="btn btn-ghost btn-sm absolute right-1 top-1/2 -translate-y-1/2">
                  <FiSmile className="text-lg" />
                </button>
              </div>
              <button
                className="btn btn-primary btn-circle ml-2"
                onClick={handleSendMessage}
                disabled={connectionStatus !== 'connected' || newMessage.trim() === ''}
              >
                <FiSend className="text-lg" />
              </button>
            </div>
            {connectionStatus !== 'connected' && (
              <p className="text-xs text-warning mt-2 text-center">
                {connectionStatus === 'connecting'
                  ? 'Connecting to server...'
                  : 'Not connected to server. Messages will be saved locally only.'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Right sidebar - Team members */}
      <div className={`w-64 bg-base-100 border-l border-base-300 p-4 hidden lg:block overflow-y-auto transition-all duration-300 ${isTeamSidebarOpen ? 'static' : 'hidden'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">Team Members</h3>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setIsTeamSidebarOpen(false)}
          >
            &times;
          </button>
        </div>
        <div className="space-y-3">
          {teamMembersList}
        </div>

        <div className="mt-8">
          <h3 className="font-bold mb-3">Shared Files</h3>
          <div className="space-y-2">
            {['Project Brief.pdf', 'Design Mockups.fig', 'Technical Specs.docx'].map((file, index) => (
              <div key={index} className="flex items-center p-2 hover:bg-base-200 rounded-lg cursor-pointer transition-colors">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <span className="text-primary text-lg">📄</span>
                </div>
                <div className="ml-3 overflow-hidden">
                  <p className="text-sm font-medium truncate">{file}</p>
                  <p className="text-xs text-gray-500">2 days ago • 2.4 MB</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;