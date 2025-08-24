import { useParams } from 'react-router-dom'
import { useState, useRef, useEffect, useCallback } from 'react';
import { FiSend, FiPaperclip, FiSmile, FiMoreVertical, FiSearch, FiVideo, FiPhone, FiUserPlus } from 'react-icons/fi';
import { useSelector } from "react-redux";
import { createSocketConnection } from '../../utils/constants/constants'
import { chatMessages } from '../../utils/services/api.service';

const Chat = () => {

  const { targetUserId } = useParams()
  const user = useSelector(store => store.user)
  const userId = user?._id
  const userName = user?.firstName

  
  useEffect(() => {
    chatMessages(targetUserId); 
  }, [])

  const [messages, setMessages] = useState([
    { id: 1, sender: 'Jane Cooper', text: 'Hey team! How is the project going?', time: '10:30 AM', isMe: false, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 2, sender: 'You', text: 'Going well! Just finished the UI components.', time: '10:32 AM', isMe: true, avatar: null },
    { id: 3, sender: 'Alex Morgan', text: 'I\'ve completed the backend API integration. We should test it together.', time: '10:35 AM', isMe: false, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 4, sender: 'You', text: 'Great! Let\'s schedule a sync meeting tomorrow morning.', time: '10:36 AM', isMe: true, avatar: null },
    { id: 5, sender: 'Jane Cooper', text: 'Perfect. I\'ll send calendar invites to everyone.', time: '10:38 AM', isMe: false, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [activeChat, setActiveChat] = useState('Team Standup');
  const [searchQuery, setSearchQuery] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  const chats = [
    { name: 'Team Standup', unread: 2, lastMessage: 'Jane: See you tomorrow!', time: '10:45 AM' },
    { name: 'Design Review', unread: 0, lastMessage: 'You: The mockups look great', time: 'Yesterday' },
    { name: 'Client Feedback', unread: 5, lastMessage: 'Client: We need some changes...', time: 'Monday' },
    { name: 'Engineering', unread: 0, lastMessage: 'Alex: PR #342 merged', time: '2 days ago' },
  ];

  const teamMembers = [
    { name: 'Jane Cooper', role: 'Product Manager', online: true, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'Alex Morgan', role: 'Backend Engineer', online: true, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Sam Wilson', role: 'Frontend Lead', online: false, avatar: 'https://randomuser.me/api/portraits/men/22.jpg' },
    { name: 'Taylor Swift', role: 'UX Designer', online: true, avatar: 'https://randomuser.me/api/portraits/women/33.jpg' },
  ];

  const handleSendMessage = useCallback(() => {
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: Date.now(),
      sender: user?.firstName,
      firstName: user?.firstName,
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
  }, [newMessage, userId, targetUserId, user, connectionStatus]);

  // Initialize socket connection
  useEffect(() => {
    if (!userId) return;

    // Create socket connection only once
    if (!socketRef.current) {
      try {
        const socket = createSocketConnection();
        socketRef.current = socket;

        socket.on('connect', () => {
          console.log('Connected to server');
          setConnectionStatus('connected');

          const room = [userId, targetUserId].sort().join('_');
          socket.emit("join", { userId, targetUserId, userName, room });
        });

        socket.on('disconnect', () => {
          console.log('Disconnected from server');
          setConnectionStatus('disconnected');
        });

        socket.on('connect_error', (error) => {
          console.error('Connection error:', error);
          setConnectionStatus('error');
        });

        socket.on("messageReceived", ({ firstName, text }) => {
          console.log(`messageReceived ---> ${firstName} --- ${text}`);
          const newMsg = {
            id: Date.now(),
            firstName,
            userId: firstName === user?.firstName ? userId : targetUserId,
            targetUserId: firstName === user?.firstName ? targetUserId : userId,
            sender: firstName,
            text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: firstName === user?.firstName,
            avatar: firstName === user?.firstName ? null : 'https://randomuser.me/api/portraits/men/1.jpg'
          };

          setMessages(prev => [...prev, newMsg]);
        });

      } catch (error) {
        console.error('Failed to create socket connection:', error);
        setConnectionStatus('error');
      }
    }

    return () => {
      // Don't disconnect on cleanup to maintain connection
      // socketRef.current?.disconnect();
    };
  }, [userId, targetUserId, userName, user]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex h-screen bg-base-200 font-sans">
      {/* Connection status indicator */}
      <div className={`fixed top-4 right-4 z-50 badge ${connectionStatus === 'connected' ? 'badge-success' : connectionStatus === 'connecting' ? 'badge-warning' : 'badge-error'}`}>
        {connectionStatus === 'connected' ? 'Connected' : connectionStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
      </div>

      {/* Sidebar */}
      <div className="w-80 bg-base-100 border-r border-base-300 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-base-300">
          <h1 className="text-xl font-bold text-primary">Messages</h1>
          <div className="relative mt-3">
            <input
              type="text"
              placeholder="Search messages..."
              className="input input-bordered w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat, index) => (
            <div
              key={index}
              className={`flex items-center p-4 hover:bg-base-200 cursor-pointer transition-colors ${activeChat === chat.name ? 'bg-primary/10' : ''}`}
              onClick={() => setActiveChat(chat.name)}
            >
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-10">
                  <span>{chat.name.charAt(0)}</span>
                </div>
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{chat.name}</h3>
                  <span className="text-xs text-gray-500">{chat.time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <span className="badge badge-primary badge-sm ml-2">{chat.unread}</span>
              )}
            </div>
          ))}
        </div>

        {/* User profile */}
        <div className="p-4 border-t border-base-300 flex items-center">
          <div className="avatar online">
            <div className="w-10 rounded-full">
              <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User" />
            </div>
          </div>
          <div className="ml-3">
            <h3 className="font-medium">You</h3>
            <p className="text-xs text-gray-500">Online</p>
          </div>
          <button className="ml-auto btn btn-ghost btn-sm">
            <FiMoreVertical />
          </button>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="p-4 border-b border-base-300 flex items-center justify-between bg-base-100">
          <div className="flex items-center">
            <div className="avatar-group -space-x-4">
              {teamMembers.filter(m => m.online).map((member, index) => (
                <div key={index} className="avatar online">
                  <div className="w-10">
                    <img src={member.avatar} alt={member.name} />
                  </div>
                </div>
              ))}
            </div>
            <div className="ml-4">
              <h2 className="font-bold">{activeChat}</h2>
              <p className="text-sm text-gray-500">
                {teamMembers.filter(m => m.online).length} online
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="btn btn-ghost btn-circle">
              <FiVideo className="text-lg" />
            </button>
            <button className="btn btn-ghost btn-circle">
              <FiPhone className="text-lg" />
            </button>
            <button className="btn btn-ghost btn-circle">
              <FiUserPlus className="text-lg" />
            </button>
            <button className="btn btn-ghost btn-circle">
              <FiSearch className="text-lg" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto bg-base-100">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
              >
                {console.log(`message:${JSON.stringify(message)}`)}
                {!message.isMe && (
                  <div className="avatar mr-3">
                    <div className="w-8 rounded-full">
                      <img src={message.avatar} alt={message.sender} />
                    </div>
                  </div>
                )}
                <div className={`max-w-xs md:max-w-md lg:max-w-lg ${message.isMe ? 'bg-primary text-primary-content' : 'bg-base-300'} rounded-2xl p-4`}>
                  {!message.isMe && (
                    <p className="font-medium text-sm mb-1">{message.sender}</p>
                  )}
                  <p>{message.text}</p>
                  <p className={`text-xs mt-1 ${message.isMe ? 'text-primary-content/70' : 'text-gray-500'}`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message input */}
        <div className="p-4 border-t border-base-300 bg-base-100">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Type your message..."
                className="input input-bordered w-full pr-16"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={connectionStatus !== 'connected'}
              />
              <div className="absolute right-2 top-2 flex space-x-1">
                <button className="btn btn-ghost btn-sm" disabled={connectionStatus !== 'connected'}>
                  <FiSmile className="text-lg" />
                </button>
                <button className="btn btn-ghost btn-sm" disabled={connectionStatus !== 'connected'}>
                  <FiPaperclip className="text-lg" />
                </button>
                <button
                  className="btn btn-primary btn-sm rounded-full"
                  onClick={handleSendMessage}
                  disabled={connectionStatus !== 'connected'}
                >
                  <FiSend className="text-lg" />
                </button>
              </div>
            </div>
            {connectionStatus !== 'connected' && (
              <p className="text-xs text-warning mt-2">
                {connectionStatus === 'connecting'
                  ? 'Connecting to server...'
                  : 'Not connected to server. Messages will be saved locally only.'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Right sidebar - Team members */}
      <div className="w-64 bg-base-100 border-l border-base-300 p-4 hidden lg:block overflow-y-auto">
        <h3 className="font-bold mb-4">Team Members</h3>
        <div className="space-y-3">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex items-center p-2 hover:bg-base-200 rounded-lg cursor-pointer">
              <div className={`avatar ${member.online ? 'online' : 'offline'}`}>
                <div className="w-10 rounded-full">
                  <img src={member.avatar} alt={member.name} />
                </div>
              </div>
              <div className="ml-3">
                <h4 className="font-medium">{member.name}</h4>
                <p className="text-xs text-gray-500">{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="font-bold mb-3">Shared Files</h3>
          <div className="space-y-2">
            {['Project Brief.pdf', 'Design Mockups.fig', 'Technical Specs.docx'].map((file, index) => (
              <div key={index} className="flex items-center p-2 hover:bg-base-200 rounded-lg cursor-pointer">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <span className="text-primary">📄</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{file}</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
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