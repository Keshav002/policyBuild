// App.js

import React, { useState, useEffect, useRef } from "react";
import Nav from ".././components/Nav";
import "./Meetings.css";
import { FaRegCalendarPlus, FaTrash } from "react-icons/fa";
import { FaComment, FaCalendar, FaFilter, FaPlus } from "react-icons/fa";
import Cookies from "js-cookie";
import { API_URL } from "../ConfigApi";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { PiCaretDownLight } from "react-icons/pi";
import { FaRegPaperPlane } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import { FadeLoader } from "react-spinners";
import { MdOutlineRefresh } from "react-icons/md";
import { FiRefreshCcw, FiRefreshCw } from "react-icons/fi";
// const users = [
//   {
//     id: 1,
//     name: "Keshav Tayal",
//     avatar: "https://cdn-icons-png.flaticon.com/128/727/727399.png",
//   },
//   {
//     id: 2,
//     name: "Amarjeet Kumar",
//     avatar: "https://cdn-icons-png.flaticon.com/128/727/727399.png",
//   },
//   // Add more users as needed
// ];

function Meetings() {
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentView, setCurrentView] = useState("chats");
  const [showNewMeetingForm, setShowNewMeetingForm] = useState(false);
  const loggedInUserData = useSelector((state) => state.user.userData);
  const chatContainerRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [editedFormData, setEditedFormData] = useState({});
  const optionsRef = useRef(null);
  const enterEditMode = () => {
    setIsEditing(true);
    setEditedFormData({
      title: selectedMeeting.title,
      agenda: selectedMeeting.agenda,
      date: selectedMeeting.date,
      time: selectedMeeting.time,
      meetTo: selectedMeeting.participants,
    });
  };

  const handleEditMeeting = async (e, meetingId) => {
    e.preventDefault();
    try {
      // Send a request to update the meeting details
      const response = await fetch(`${API_URL}/main/meeting/${meetingId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        body: JSON.stringify(editedFormData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update meeting. Status: ${response.status}`);
      }

      // After successful update, exit edit mode and fetch meetings
      setIsEditing(false);
      fetchAllMeetings();
      setSelectedMeeting({
        ...selectedMeeting,
        title: editedFormData.title,
        agenda: editedFormData.agenda,
        date: editedFormData.date,
        time: editedFormData.time,
        participants: editedFormData.meetTo,
      });
    } catch (error) {
      console.error("Error updating meeting:", error);
    }
  };

  const handleDeleteMeeting = async (meetingId) => {
    try {
      // Send a request to delete the meeting
      const response = await fetch(`${API_URL}/main/meeting/${meetingId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete meeting. Status: ${response.status}`);
      }
      setIsEditing(false);
      setSelectedMeeting(null);
      fetchAllMeetings();
    } catch (error) {
      console.error("Error deleting meeting:", error);
    }
  };

  const toggleMeetingForm = () => {
    setSelectedMeeting(null);
    setShowNewMeetingForm(true);
  };

  const upcomingMeetings = [
    {
      id: 1,
      title: "Project Review",
      date: "2022-03-20",
      time: "2:00 PM",
      host: "Keshav Tayal",
      description:
        "This meeting is dedicated to the comprehensive review and discussion of the ongoing project. We'll delve into the project's status, milestones achieved, and any challenges faced. It's an opportunity for team members to share insights and collaborate on strategies for further improvement.",
      participants: ["John Doe", "Alice Smith", "Bob Johnson"],
    },
    {
      id: 2,
      title: "Marketing Campaign Planning",
      date: "2022-03-25",
      time: "10:30 AM",
      host: "Amarjeet Kumar",
      description:
        "Join us for an in-depth planning session focused on the upcoming marketing campaign. We'll discuss target audiences, key messaging, and creative strategies to make our campaign a success. Your input and ideas are crucial to shaping the campaign's direction.",
      participants: ["Emma Brown", "David Wilson", "Sophie Miller"],
    },
    {
      id: 3,
      title: "Team Standup",
      date: "2022-03-30",
      time: "9:00 AM",
      host: "Keshav",
      description:
        "This daily standup meeting is a quick and efficient way for our team to sync up on progress and challenges. Each team member will provide a brief update on their tasks, discuss any roadblocks, and seek support if needed. It's a great opportunity to foster communication and maintain a collaborative environment.",
      participants: ["Michael Johnson", "Eva Davis", "Chris Martin"],
    },
  ];

  const [formData, setFormData] = useState({
    title: "",
    agenda: "",
    date: "",
    time: "",
    meetTo: [],
  });

  const [showUserList, setShowUserList] = useState(false);
  const [users, setUsers] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openMeetingLink = (link) => {
    window.open(link, "_blank");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDateTime = `${formData.date}T${formData.time}:00.000Z`;
    const meetLink = `https://meet.google.com/new?name=${encodeURIComponent(
      formData.title
    )}&date=${encodeURIComponent(formattedDateTime)}`;

    const newMeetingData = {
      host: loggedInUserData.username,
      participants: formData.meetTo,
      title: formData.title,
      agenda: formData.agenda,
      date: formData.date,
      time: formData.time,
      link: meetLink,
    };

    try {
      // Send a request to the backend to create a new meeting
      const response = await fetch(`${API_URL}/main/meeting/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        body: JSON.stringify(newMeetingData),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to create a new meeting. Status: ${response.status}`
        );
      }
      fetchAllMeetings();
      setFormData({
        title: "",
        agenda: "",
        date: "",
        time: "",
        meetTo: [],
      });
    } catch (error) {
      console.error("Error creating a new meeting:", error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/chat/list-users-by-latest-message/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch users. Status: ${response.status}`);
      }
      const users = await response.json();
      if (users.length > 0) {
        setSelectedUser(users[0]);
      }
      console.log("users", users);
      setUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      return null;
    }
  };
  const toggleCheckbox = (userId) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      meetTo: prevFormData.meetTo.includes(userId)
        ? prevFormData.meetTo.filter((id) => id !== userId)
        : [...prevFormData.meetTo, userId],
    }));
  };

  const editMeetTo = (userId) => {
    setEditedFormData((prevEditedFormData) => ({
      ...prevEditedFormData,
      meetTo: prevEditedFormData.meetTo.includes(userId)
        ? prevEditedFormData.meetTo.filter((id) => id !== userId)
        : [...prevEditedFormData.meetTo, userId],
    }));
  };

  const [meetings, setMeetings] = useState([]);

  const fetchAllMeetings = async () => {
    try {
      const response = await fetch(`${API_URL}/main/meeting`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch meetings. Status: ${response.status}`);
      }

      const meetingsData = await response.json();
      console.log("meetings", meetingsData);
      setMeetings(meetingsData);
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  const [conversation, setConversation] = useState([]);

  // Function to fetch conversation between current user and clicked user
  // const fetchConversation = async (clickedUserId) => {
  //   try {
  //     const response = await fetch(
  //       `${API_URL}/api/chat/messages/${clickedUserId}/`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${Cookies.get("accessToken")}`,
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(
  //         `Failed to fetch conversation. Status: ${response.status}`
  //       );
  //     }

  //     const conversationData = await response.json();
  //     console.log("convo", conversationData);
  //     setConversation(conversationData);
  //   } catch (error) {
  //     console.error("Error fetching conversation:", error);
  //   }
  // };

  // Function to fetch conversation between current user and clicked user with pagination

  // Define state for clickedUserId and currentPage
  const [clickedUserId, setClickedUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [messageCount, setMessageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  // Function to fetch conversation between current user and clicked user with pagination
  const fetchConversationWithPagination = async (clickedUserId, page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/api/chat/messages/${clickedUserId}/?page=${page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );

      setLoading(false);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch conversation. Status: ${response.status}`
        );
      }

      const conversationData = await response.json();
      console.log("convo", conversationData);
      setMessageCount(conversationData.count);
      // Check if conversationData is iterable (array)
      if (Array.isArray(conversationData.results)) {
        // Append the new messages to the existing conversation
        if (page === 1) {
          setConversation(conversationData.results);
        } else {
          // Append the new messages to the existing conversation
          setConversation((prevConversation) => [
            ...prevConversation,
            ...conversationData.results,
          ]);
        }
      } else {
        console.error("Invalid conversation data format:", conversationData);
      }
    } catch (error) {
      console.error("Error fetching conversation:", error);
      setLoading(false);
    }
  };

  // This is the modified fetchConversation function with pagination
  const fetchConversation = async (clickedUserId) => {
    setCurrentPage(1);
    await fetchConversationWithPagination(clickedUserId);
  };

  // Handle scroll event to load more messages

  const formattedTimestamp = (timestamp) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return new Date(timestamp).toLocaleString("en-US", options);
  };

  const handleSendMessageOrEdit = async (messageContent) => {
    try {
      // Check if the message content is not empty
      if (messageContent.trim() === "") {
        return;
      }

      if (editMode) {
        // If in edit mode, send a request to the backend to update the message
        const editedMessageData = {
          content: messageContent,
        };

        const response = await fetch(
          `${API_URL}/api/chat/edit-message/${editedMessage.messageId}/`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
            body: JSON.stringify(editedMessageData),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to edit message. Status: ${response.status}`);
        }

        // Optionally, you can handle the response if needed
        const responseData = await response.json();
        console.log("Message edited successfully:", responseData);
        setEditMode(false);
      } else {
        // If not in edit mode, send a request to the backend to send the message
        const newMessageData = {
          receiver_id: selectedUser.id,
          content: messageContent,
        };

        const response = await fetch(`${API_URL}/api/chat/send-message/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
          body: JSON.stringify(newMessageData),
        });

        if (!response.ok) {
          throw new Error(`Failed to send message. Status: ${response.status}`);
        }

        // Optionally, you can handle the response if needed
        const responseData = await response.json();
        console.log("Message sent successfully:", responseData);
      }

      // Clear the edited content
      setEditedMessage({
        messageId: null,
        content: "",
      });

      // You may want to update the UI or fetch the updated conversation here
      fetchConversation(selectedUser.id);
    } catch (error) {
      console.error("Error sending/editing message:", error);
    }
  };

  const [openMenu, setOpenMenu] = useState(null);

  const handleMenuToggle = (message) => {
    setOpenMenu((prevOpenMenu) =>
      prevOpenMenu === message.id ? null : message.id
    );
  };
  const handleMouseLeave = () => {
    setOpenMenu(null);
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      // Send a request to the backend to delete the message
      const response = await fetch(
        `${API_URL}/api/chat/delete-sent-message/${messageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete message. Status: ${response.status}`);
      }

      // Optionally, you can handle the response if needed
      const responseData = await response.json();
      console.log("Message deleted successfully:", responseData);

      // You may want to update the UI or fetch the updated conversation here
      fetchConversation(selectedUser.id);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const [editMode, setEditMode] = useState(false);
  const [editedMessage, setEditedMessage] = useState({
    messageId: null,
    content: "",
  });

  const handleEditClick = (message) => {
    setOpenMenu((prevOpenMenu) =>
      prevOpenMenu === message.id ? null : message.id
    );

    // If the edit button is clicked, set the message content in the input box
    if (message.sender === loggedInUserData.user_id) {
      setEditMode(true);
      setEditedMessage({
        messageId: message.id,
        content: message.content,
      });
    }
  };
  // const scrollToBottom = () => {
  //   if (chatContainerRef.current) {
  //     chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  //   }
  // };

  useEffect(() => {
    fetchAllUsers();
    fetchAllMeetings();
  }, []);
  
  useEffect(() => {
    if(selectedUser){

      fetchConversation(selectedUser.id);
    }
  }, [selectedUser]);
  

  const [userScrolledManually, setUserScrolledManually] = useState(false);

  // ... Other state and functions ...

  const handleScrollUp = async () => {
    console.log("scrollup called");
    await fetchConversationWithPagination(selectedUser.id, currentPage + 1);
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const CustomTooltip = ({ children, tooltipText }) => {
    return (
      <div className="custom-tooltip">
        {children}
        <span className="tooltip-text">{tooltipText}</span>
      </div>
    );
  };

  function isMessageEditable(messageTimestamp) {
    const currentTime = new Date().getTime();
    const messageTime = new Date(messageTimestamp).getTime();
    const timeDifferenceInHours =
      (currentTime - messageTime) / (1000 * 60 * 60);

    // Allow editing within one hour
    return timeDifferenceInHours <= 1;
  }
  return (
    <>
      <Nav />
      <div className="mnc_app">
        <div className="mnc_sidebar">
          <div className="mnc_view_buttons">
            <button
              onClick={() => setCurrentView("chats")}
              className={`chats ${currentView === "chats" ? "active" : ""}`}
            >
              <FaComment /> Chats
            </button>
            <button
              onClick={() => setCurrentView("meetings")}
              className={`meetings ${
                currentView === "meetings" ? "active" : ""
              }`}
            >
              <FaCalendar /> Meetings
            </button>
          </div>
          {currentView === "chats" ? (
            <>
              <div className="mnc_search_bar" title="Will be updated soon...">
                <input
                  type="text"
                  // placeholder="Search or start a new chat (Updated Soon)" />
                  placeholder="Updating Soon ..."
                />

                <FaFilter className="mnc_icon" />
                {/* <FaVideo className="mnc_icon" /> */}
              </div>
              <ul>
                {users.map((user) => (
                  <li
                    key={user.id}
                    onClick={() => {
                      setSelectedUser(user);
                      setConversation([]);
                      fetchConversation(user.id);
                    }}
                    className={
                      selectedUser?.id === user.id ? "mnc_selected_user" : ""
                    }
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/727/727399.png"
                      alt="User Avatar"
                      className="mnc_user_avatar"
                    />
                    {user.username}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <div className="mnc_search_bar">
                <input
                  type="text"
                  // placeholder="Search for upcoming meetings(Updated Soon)"
                  placeholder="Updating Soon ..."
                  title="Will be updated soon..."
                />
                <FaFilter
                  className="mnc_icon"
                  title="Will be updated soon..."
                />
                <FaRegCalendarPlus
                  className="mnc_icon"
                  onClick={() => toggleMeetingForm()}
                />
              </div>

              <ul className="mnc_upcoming_meetings">
                {meetings.map((meeting) => (
                  <li
                    key={meeting.id}
                    className={`mnc_meeting_item ${
                      selectedMeeting && selectedMeeting.id === meeting.id
                        ? "mnc_selected_meeting"
                        : ""
                    }`}
                    onClick={() => setSelectedMeeting(meeting)}
                  >
                    <div className="mnc_meeting_info">
                      <h3 className="mnc_meeting_title">{meeting.title}</h3>
                      <p className="mnc_meeting_details">
                        <strong>Date:</strong> {meeting.date} |{" "}
                        <strong>Time:</strong> {meeting.time}
                      </p>
                      <p className="mnc_meeting_details">
                        <strong>Host:</strong> {meeting.host}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="mnc_content" id="mnc_content">
          {currentView === "chats" ? (
            <>
              <div className="mnc_top_bar">
                {selectedUser ? (
                  <>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/727/727399.png"
                      alt="User Avatar"
                      className="mnc_avatar"
                    />
                    <span>{selectedUser.name}</span>
                    <FiRefreshCcw
                      onClick={() => fetchConversation(selectedUser.id)}
                      className="chat-refresh-icon"
                    />
                  </>
                ) : (
                  <span style={{ padding: "10px" }}>Select a user to chat</span>
                )}
              </div>
              {selectedUser && (
                <>
                  {/* <div className="mnc_messages" ref={chatContainerRef} onScroll={handleScroll}> */}
                  {/* <div className="mnc_chatbox" id="mnc_chatbox"> */}
                  {/* <div className="mnc_messages" id="mnc_messages"> */}
                  {/* <div
                    id="scrollableDiv"
                    style={{
                      overflow: "auto",
                      display: "flex",
                      flexDirection: "column-reverse",
                      height: "200px", // Set the height as needed
                    }}
                  > */}
                  <InfiniteScroll
                    dataLength={conversation.length}
                    next={handleScrollUp}
                    inverse={true}
                    style={{
                      display: "flex",
                      flexDirection: "column-reverse",
                    }}
                    hasMore={messageCount !== conversation.length}
                    loader={
                      <FadeLoader
                        color="#A9A9A9"
                        loading={loading}
                        className="custom-chat-loader"
                      />
                    }
                    height={500}
                  >
                    {conversation.length > 0 ? (
                      conversation.map((message, index) => (
                        <div
                          key={index}
                          className={
                            message.receiver === selectedUser.id
                              ? "mnc_sent"
                              : "mnc_received"
                          }
                          ref={optionsRef}
                          onMouseLeave={handleMouseLeave}
                        >
                          {message.sender == loggedInUserData.user_id && (
                            <>
                              {openMenu === message.id && (
                                <div
                                  className="mnc_message-options"
                                  ref={optionsRef}
                                  onMouseLeave={handleMouseLeave}
                                >
                                  <div onClick={() => handleEditClick(message)}>
                                    Edit
                                  </div>
                                  <div
                                    onClick={() =>
                                      handleDeleteMessage(message.id)
                                    }
                                  >
                                    Delete
                                  </div>
                                </div>
                              )}
                              <div className="message-actions">
                                <PiCaretDownLight
                                  className="mnc_edit-button"
                                  onClick={() => handleMenuToggle(message)}
                                  style={{
                                    display: isMessageEditable(
                                      message.timestamp
                                    )
                                      ? "block"
                                      : "none",
                                  }}
                                />
                              </div>
                            </>
                          )}
                          <p>{message.content}</p>
                          <span className="mnc_messages_time">
                            {formattedTimestamp(message.timestamp)}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div style={{textAlign:"center", marginBottom:"auto"}}>No messages</div>
                    )}
                  </InfiniteScroll>
                  {/* </div> */}
                  {/* </div> */}
                  {/* </div> */}
                  {/* </div> */}
                  <div className="mnc_input">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={editedMessage.content}
                      onChange={(e) =>
                        setEditedMessage({
                          ...editedMessage,
                          content: e.target.value,
                        })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessageOrEdit(editedMessage.content);
                          setEditedMessage({
                            messageId: null,
                            content: "",
                          });
                        }
                      }}
                    />
                    <button
                      className="mnc_send_button"
                      onClick={() => {
                        handleSendMessageOrEdit(editedMessage.content);
                        setEditedMessage({
                          messageId: null,
                          content: "",
                        });
                      }}
                    >
                      <FaRegPaperPlane />
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="mnc_meeting_view">
              {selectedMeeting ? (
                <>
                  <div className="mnc_meeting_info_right">
                    {loggedInUserData.username === selectedMeeting.host &&
                      (isEditing ? (
                        <></>
                      ) : (
                        <div className="mnc_edit_delete_buttons">
                          <FaTrash
                            className="mnc_edit_icon"
                            onClick={() =>
                              handleDeleteMeeting(selectedMeeting.id)
                            }
                          />
                          <FaEdit
                            className="mnc_edit_icon"
                            onClick={() => enterEditMode()}
                          />
                        </div>
                      ))}
                    {isEditing ? (
                      <div className="mnc_new_meeting_form">
                        <h2 className="mnc_meeting_form_title">
                          Edit meeting details
                        </h2>
                        <form
                          className="mnc_meeting_form"
                          onSubmit={(e) =>
                            handleEditMeeting(e, selectedMeeting.id)
                          }
                        >
                          <label className="mnc_meeting_form_label">
                            Title:
                          </label>
                          <input
                            className="mnc_meeting_form_input"
                            type="text"
                            name="title"
                            value={editedFormData.title}
                            onChange={(e) =>
                              setEditedFormData({
                                ...editedFormData,
                                title: e.target.value,
                              })
                            }
                            required
                          />
                          {/* Reuse other input fields for agenda, date, time, participants */}
                          <label className="mnc_meeting_form_label">
                            Agenda:
                          </label>
                          <textarea
                            className="mnc_meeting_form_textarea"
                            name="agenda"
                            value={editedFormData.agenda}
                            onChange={(e) =>
                              setEditedFormData({
                                ...editedFormData,
                                agenda: e.target.value,
                              })
                            }
                            required
                          />

                          <label className="mnc_meeting_form_label">
                            Meet To:
                          </label>
                          <div className="mnc_dropdown">
                            <div
                              className="mnc_selected_users"
                              onClick={() => setShowUserList(!showUserList)}
                            >
                              {editedFormData.meetTo.length > 0 ? (
                                editedFormData.meetTo.map((userId) => (
                                  <span key={userId}>
                                    {
                                      users.find((user) => user.id === userId)
                                        .username
                                    }
                                    ,
                                  </span>
                                ))
                              ) : (
                                <span>Select users</span>
                              )}
                            </div>
                            {showUserList && (
                              <div className="mnc_dropdown_list">
                                {users.map((user) => (
                                  <div
                                    key={user.id}
                                    className="mnc_dropdown_item"
                                  >
                                    <input
                                      type="checkbox"
                                      id={`userCheckbox-${user.id}`}
                                      value={user.id}
                                      checked={editedFormData.meetTo.includes(
                                        user.id
                                      )}
                                      onChange={() => editMeetTo(user.id)}
                                    />
                                    <label htmlFor={`userCheckbox-${user.id}`}>
                                      {user.username}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          <label className="mnc_meeting_form_label">
                            Date:
                          </label>
                          <input
                            className="mnc_meeting_form_input"
                            type="date"
                            name="date"
                            value={editedFormData.date}
                            onChange={(e) =>
                              setEditedFormData({
                                ...editedFormData,
                                date: e.target.value,
                              })
                            }
                            required
                          />
                          <label className="mnc_meeting_form_label">
                            Time:
                          </label>
                          <input
                            className="mnc_meeting_form_input"
                            type="time"
                            name="time"
                            value={editedFormData.time}
                            onChange={(e) =>
                              setEditedFormData({
                                ...editedFormData,
                                time: e.target.value,
                              })
                            }
                            required
                          />
                          <div className="mnc_edit_meeting_buttons">
                            <button type="submit">Save Changes</button>

                            <button
                              type="button"
                              onClick={() => setIsEditing(false)}
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteMeeting(selectedMeeting.id)
                              }
                            >
                              Delete Meeting
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <>
                        <h2>{selectedMeeting.title}</h2>
                        <p className="mnc_meeting_description">
                          <strong>Description:</strong> {selectedMeeting.agenda}
                        </p>
                        <div className="mnc_meeting_host_right">
                          <p>
                            <strong>Host:</strong> {selectedMeeting.host}
                          </p>
                        </div>
                        <div className="mnc_meeting_details_right">
                          <div className="mnc_meeting_datetime_right">
                            <p>
                              <strong>Date:</strong> {selectedMeeting.date}
                            </p>
                            <p>| </p>
                            <p>
                              {" "}
                              <strong>Time:</strong> {selectedMeeting.time}
                            </p>
                          </div>
                          <div></div>

                          <p className="mnc_participants">
                            <strong>Participants:</strong>
                            <ul className="mnc_participants_list">
                              {selectedMeeting.participants.map(
                                (participant, index) => (
                                  <li key={index}>{participant.username}</li>
                                )
                              )}
                            </ul>
                          </p>
                        </div>
                        <button
                          className="mnc_join_button"
                          onClick={() => openMeetingLink(selectedMeeting.link)}
                        >
                          Join Meeting
                        </button>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div className="mnc_new_meeting_form">
                  <h2 className="mnc_meeting_form_title">
                    Schedule a New Meeting
                  </h2>
                  <form className="mnc_meeting_form" onSubmit={handleSubmit}>
                    <label className="mnc_meeting_form_label">Title:</label>
                    <input
                      className="mnc_meeting_form_input"
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                    <label className="mnc_meeting_form_label">Agenda:</label>
                    <textarea
                      className="mnc_meeting_form_textarea"
                      name="agenda"
                      value={formData.agenda}
                      onChange={handleChange}
                      required
                    />

                    <label className="mnc_meeting_form_label">Meet To:</label>
                    <div className="mnc_dropdown">
                      <div
                        className="mnc_selected_users"
                        onClick={() => setShowUserList(!showUserList)}
                      >
                        {formData.meetTo.length > 0 ? (
                          formData.meetTo.map((userId) => (
                            <span key={userId}>
                              {
                                users.find((user) => user.id === userId)
                                  .username
                              }
                              ,
                            </span>
                          ))
                        ) : (
                          <span>Select users</span>
                        )}
                      </div>
                      {showUserList && (
                        <div className="mnc_dropdown_list">
                          {users.map((user) => (
                            <div key={user.id} className="mnc_dropdown_item">
                              <input
                                type="checkbox"
                                id={`userCheckbox-${user.id}`}
                                value={user.id}
                                checked={formData.meetTo.includes(user.id)}
                                onChange={() => toggleCheckbox(user.id)}
                              />
                              <label htmlFor={`userCheckbox-${user.id}`}>
                                {user.username}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <label className="mnc_meeting_form_label">Date:</label>
                    <input
                      className="mnc_meeting_form_input"
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                    <label className="mnc_meeting_form_label">Time:</label>
                    <input
                      className="mnc_meeting_form_input"
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                    />
                    <button className="mnc_meeting_form_submit" type="submit">
                      Schedule Meet
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Meetings;
