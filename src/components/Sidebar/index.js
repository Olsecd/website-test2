import React from "react";
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
  SidebarRoute,
  SideBtnWrap,
  SidebarMenuItem,
} from "./SidebarElements";
import axios from "axios";

const Sidebar = ({
  isOpen,
  toggle,
  auth,
  handleAuth,
  displayState,
  displayStateHandler,
}) => {
  const handleLogout = (e) => {
    displayStateHandler("0");
    e.preventDefault();
    //console.log("clicked");
    //Cookies.remove("PHPSESSID");
    const url = "/react-backend/logout.php";
    axios
      .get(url)
      .then((res) => {
        handleAuth(false);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarMenuItem to='/Table' onClick={toggle}>
            {" "}
            NY COVID-19 Test Data{" "}
          </SidebarMenuItem>
          <SidebarMenuItem to='/SearchBusiness' onClick={toggle}>
            {" "}
            Search Businesses{" "}
          </SidebarMenuItem>
          {auth ? (
            ""
          ) : (
            <SidebarMenuItem to='/ChooseRegister' onClick={toggle}>
              {" "}
              Sign Up{" "}
            </SidebarMenuItem>
          )}
          {displayState === "1" && (
            <SidebarMenuItem to='/PatronMain'>
              Visited Businesses
            </SidebarMenuItem>
          )}
          {displayState === "2" && (
            <SidebarMenuItem to='/SelectBusiness'>
              Select/Add Business
            </SidebarMenuItem>
          )}
        </SidebarMenu>
        <SideBtnWrap>
          {auth ? (
            <SidebarRoute onClick={handleLogout}>Log Out</SidebarRoute>
          ) : (
            <SidebarRoute to='/Login'>Sign In</SidebarRoute>
          )}
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
