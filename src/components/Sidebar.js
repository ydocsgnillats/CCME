import React from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { useRealmApp } from "../RealmApp";
import Card from "./Card";
import { uiColors } from "@leafygreen-ui/palette";

export default function Sidebar({
  setIsEditingPermissions,
}) {
  const app = useRealmApp();

  return (
    <SidebarContainer>
      <Card>
        <SectionHeading>Account</SectionHeading>
        <SectionList>
        <UserDetails
          user={app.currentUser}
          handleLogout={() => {
            app.logOut();
          }}
          handleEditPermissions={() => {
            setIsEditingPermissions(true);
          }}
        />
        </SectionList>
      </Card>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  display: flex;
  background: ${uiColors.gray.light2};
  flex-direction: column;
  padding: 40px;
`;

const SectionHeading = styled.h2`
  margin: 0;
  padding: 8px;
`;
const SectionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

function UserDetails({ user, handleLogout, handleEditPermissions }) {
  return (
    <UserDetailsContainer>
      <Username>{user.profile.email}</Username>
      <TextButton onClick={handleEditPermissions}>Settings</TextButton>
      <TextButton onClick={handleLogout}>Log Out</TextButton>
    </UserDetailsContainer>
  );
}

const UserDetailsContainer = styled.div`
  padding: 8px 0;
  display: flex;
  flex-direction: column;
`;

const Username = styled.div`
  text-align: center;
  margin-bottom: 4px;
`;

const TextButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  color: #069;
  text-decoration: none;
  cursor: pointer;
  color: ${uiColors.green.dark2};
`;
