import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import SearchIcon from "@mui/icons-material/Search";
import ConversationBox from "../conversationItems/ConversationBox";
import { useNavigate } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../Features/themeslice";
import "./sidebar.css";
import { IconButton } from "@mui/material";
import Cookies from "js-cookie";
import axios from "axios";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lighttheme = useSelector((state) => state.themeKey);
  const [conversation, setConversation] = useState([]);

  const userData = JSON.parse(Cookies.get("userData"));

  if (!userData) {
    console.log("User not authenticated");
  }

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    axios.get("http://localhost:5000/chat/", config).then((response) => {
      console.log("Data redresh in sidebar", response.data);
      setConversation(response.data);
    });
  });

  return (
    <div className={"sidebar"}>
      <div className={"sb-header " + (lighttheme ? "" : "dark")}>
        <div>
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </div>
        <div className="other-icons">
          <IconButton
            onClick={() => {
              navigate("users");
            }}
          >
            <PersonAddIcon className={"icon " + (lighttheme ? "" : "dark")} />
          </IconButton>
          <IconButton>
            <GroupAddIcon className={"icon " + (lighttheme ? "" : "dark")} />
          </IconButton>
          <IconButton
            onClick={() => {
              navigate("create-groups");
            }}
          >
            <AddCircleIcon className={"icon " + (lighttheme ? "" : "dark")} />
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch(toggleTheme());
            }}
          >
            {lighttheme ? (
              <NightlightRoundIcon
                className={"icon " + (lighttheme ? "" : "dark")}
              />
            ) : (
              <LightModeIcon className={"icon " + (lighttheme ? "" : "dark")} />
            )}
          </IconButton>
        </div>
      </div>
      <div className={"sb-search-container " + (lighttheme ? "" : "dark")}>
        <div className={"sb-search " + (lighttheme ? "" : "dark")}>
          <IconButton>
            <SearchIcon className={"icon " + (lighttheme ? "" : "dark")} />
          </IconButton>
          <input
            type="text"
            placeholder="Search"
            className={lighttheme ? "" : "dark"}
          />
        </div>
      </div>
      <div className={"sb-conversation " + (lighttheme ? "" : "dark")}>
        {conversation.map((conversation) => {
          return (
            <ConversationBox props={conversation} key={conversation.name} />
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
