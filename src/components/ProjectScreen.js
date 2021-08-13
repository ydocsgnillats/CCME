import React from "react";
import styled from "@emotion/styled";
import useWallets from "../graphql/useWallets";
import WalletContent from "./WalletContent";
import WalletDetailModal from "./WalletDetailModal";
import EditPermissionsModal from "./EditPermissionsModal";
import Card from "./Card";
import Button from "@leafygreen-ui/button";
import ButtonGroup from "./ButtonGroup";
import TextInput from "@leafygreen-ui/text-input";
import { uiColors } from "@leafygreen-ui/palette";
import Loading from "./Loading";

export default function ProjectScreen({
  isEditingPermissions,
  setIsEditingPermissions,
}) {
  return (
    <Container>
      {<WalletList />}
      <EditPermissionsModal
        isEditingPermissions={isEditingPermissions}
        setIsEditingPermissions={setIsEditingPermissions}
      />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  grid-area: main;
  background: ${uiColors.gray.light2};
`;

function useDraftWallet({ addWallet }) {
  const [draftWallet, setDraftWallet] = React.useState(null);
  const createDraftWallet = () => {
    setDraftWallet({ name: "", address: "", description: "" });
  };
  const deleteDraftWallet = () => {
    setDraftWallet(null);
  };
  const setDraftWalletName = (name) => {
    setDraftWallet({ name });
  };
  const setDraftWalletAddress = (address) => {
    setDraftWallet({ address });
  };
  const setDraftWalletDescription = (description) => {
    setDraftWallet({ description });
  };
  const submitDraftWallet = async () => {
    await addWallet(draftWallet);
    setDraftWallet(null);
  };
  return {
    draftWallet,
    createDraftWallet,
    deleteDraftWallet,
    setDraftWalletName,
    setDraftWalletAddress,
    setDraftWalletDescription,
    submitDraftWallet,
  };
}

function WalletList() {
  const { Wallets, addWallet, loading } = useWallets();
  const getWalletById = (id) => Wallets.find((Wallet) => Wallet._id === id);
  const [selectedWalletId, setSelectedWalletId] = React.useState(null);
  const selectedWallet = getWalletById(selectedWalletId);

  const {
    draftWallet,
    createDraftWallet,
    deleteDraftWallet,
    setDraftWalletName,
    setDraftWalletAddress,
    setDraftWalletDescription,
    submitDraftWallet,
  } = useDraftWallet({ addWallet });

  return loading ? (
    <Loading />
  ) : (
    <>
      <List>
        {Wallets.length === 0 ? (
          <WalletListHeader>
            <h1>No Wallets</h1>
            <p>Click the button below to add a Wallet to this profile</p>
          </WalletListHeader>
        ) : (
          Wallets.map((wallet) => (
            <ListItem key={wallet._id}>
              <Card onClick={() => setSelectedWalletId(wallet._id)}>
                <WalletContent Wallet={wallet} />
              </Card>
            </ListItem>
          ))
        )}
        {draftWallet ? (
          <ListItem>
            <Card>
              <TextInput
                type="text"
                aria-labelledby="Wallet Name"
                placeholder="Wallet Type/Name"
                onChange={(e) => {
                  setDraftWalletName(e.target.value);
                }}
                value={draftWallet.name}
              />
              <TextInput
                type="text"
                aria-labelledby="Wallet address"
                placeholder="Public Address"
                onChange={(e) => {
                  setDraftWalletAddress(e.target.value);
                }}
                value={draftWallet.address}
              />
              <TextInput
                type="text"
                aria-labelledby="Wallet Description"
                placeholder="Wallet Description"
                onChange={(e) => {
                  setDraftWalletDescription(e.target.value);
                }}
                value={draftWallet.description}
              />
              <ButtonGroup>
                <Button
                  variant="primary"
                  disabled={!draftWallet.name}
                  onClick={() => {
                    submitDraftWallet();
                  }}
                >
                  Add
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    deleteDraftWallet();
                  }}
                >
                  Cancel
                </Button>
              </ButtonGroup>
            </Card>
          </ListItem>
        ) : (
          <ListItem>
            <Card>
              <Button onClick={() => createDraftWallet()}>Add Wallet</Button>
            </Card>
          </ListItem>
        )}
      </List>
      <WalletDetailModal
        Wallet={selectedWallet}
        unselectWallet={setSelectedWalletId}
      />
    </>
  );
}

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
  width: 400px;
`;
const ListItem = styled.li`
  :not(:first-of-type) {
    margin-top: 8px;
  }
`;

const WalletListHeader = styled.div`
  line-height: 24px;
  letter-spacing: 0px;
  text-align: center;
  font-size: 16px;
`;
