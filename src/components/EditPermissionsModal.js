import React from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import LGButton from "@leafygreen-ui/button";
import Modal from "@leafygreen-ui/modal";

export default function EditPermissionsModal({
  isEditingPermissions,
  setIsEditingPermissions,
}) {
  return (
    <Modal
      open={isEditingPermissions}
      setOpen={setIsEditingPermissions}
      size="small"
    >
      <ContentContainer>
        <ModalHeading>Settings</ModalHeading>
        <ModalText>
          Change your username, bio, and other profile settings
        </ModalText>
        <ModalText>Add a new user by email:</ModalText>
      </ContentContainer>
    </Modal>
  );
}

const Button = styled(LGButton)`
  height: 36px;
`;

const Row = styled.div`
  display: flex;
  align-items: end;
`;
const InputContainer = styled.div`
  flex-grow: 1;
`;
const ModalHeading = styled.h2`
  margin: 0;
  font-size: 24px;
`;
const ModalText = styled.p`
  margin: 8px 2px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
