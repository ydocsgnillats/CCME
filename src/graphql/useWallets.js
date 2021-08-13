import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import useWalletMutations from "./useWalletMutations";

const useWallets = () => {
  const { wallets, loading } = useAllWallets();
  const { addWallet, updateWallet } = useWalletMutations();
  return {
    loading,
    wallets,
    updateWallet,
    addWallet,
  };
};
export default useWallets;

function useAllWallets() {
  const { data, loading, error } = useQuery(
    gql`
      query GetAllWalletsForUser() {
        wallets() {
          _id
          name
          address
          description
        }
      }
    `
  );
  if (error) {
    throw new Error(`Failed to fetch wallets: ${error.message}`);
  }

  // If the query has finished, return the Wallets from the result data
  // Otherwise, return an empty list
  const wallets = data?.wallets ?? [];
  return { wallets, loading };
}
