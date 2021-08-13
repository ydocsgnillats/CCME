import React from "react";
import WalletContent from "./WalletContent";
import Modal from "@leafygreen-ui/modal";

export default function WalletDetailModal({ wallet, unselectwallet }) {
  return (
    <Modal
      open={Boolean(wallet)} // Show the modal if we passed a wallet into the wallet prop.
      setOpen={unselectwallet} // When the user tries to close the modal, unset the wallet to stop showing the modal
    >
      {wallet && (
        <>
          <WalletContent wallet={wallet} />
        </>
      )}
    </Modal>
  );
}
