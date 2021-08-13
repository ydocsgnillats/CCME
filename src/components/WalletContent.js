import React from "react";
import styled from "@emotion/styled";

export default function walletContent({ wallet }) {
  return (
    <WalletDescription>
      <WalletName>{wallet.name}</WalletName>
      <WalletName>{wallet.address}</WalletName>
      <WalletName>{wallet.description}</WalletName>
    </WalletDescription>
  );
}

const WalletDescription = styled.div`
  display: flex;
  width: 100%;
`;
const WalletName = styled.span`
  flex-grow: 1;
`;
