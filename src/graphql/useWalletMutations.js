import { ObjectId } from "bson";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

export default function useWalletMutations() {
  return {
    addWallet: useAddWallet(),
    updateWallet: useUpdateWallet(),
    deleteWallet: useDeleteWallet(),
  };
}

const AddWalletMutation = gql`
  mutation AddWallet($wallet: WalletInsertInput!) {
    addedWallet: insertOneWallet(data: $wallet) {
      _id
      name
      address
      description
    }
  }
`;

const UpdateWalletMutation = gql`
  mutation UpdateWallet($walletId: ObjectId!, $updates: WalletUpdateInput!) {
    updatedWallet: updateOneWallet(query: { _id: $walletId }, set: $updates) {
      _id
      name
      address
      description
    }
  }
`;

const DeleteWalletMutation = gql`
  mutation DeleteWallet($walletId: ObjectId!) {
    deletedWallet: deleteOneWallet(query: { _id: walletId }) {
      _id
      name
      address
      description
    }
  }
`;

const WalletFieldsFragment = gql`
  fragment WalletFields on Wallet {
    _id
    name
    address
    description
  }
`;

function useAddWallet() {
  const [addWalletMutation] = useMutation(AddWalletMutation, {
    // Manually save added wallets into the Apollo cache so that wallet queries automatically update
    // For details, refer to https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    update: (cache, { data: { addedWallet } }) => {
      cache.modify({
        fields: {
          wallets: (existingWallets = []) => [
            ...existingWallets,
            cache.writeFragment({
              data: addedWallet,
              fragment: WalletFieldsFragment,
            }),
          ],
        },
      });
    },
  });

  const addWallet = async (wallet) => {
    const { addedWallet } = await addWalletMutation({
      variables: {
        wallet: {
          _id: new ObjectId(),
          ...wallet,
        },
      },
    });
    return addedWallet;
  };

  return addWallet;
}

function useUpdateWallet() {
  const [updateWalletMutation] = useMutation(UpdateWalletMutation);
  const updateWallet = async (wallet, updates) => {
    const { updatedWallet } = await updateWalletMutation({
      variables: { walletId: wallet._id, updates },
    });
    return updatedWallet;
  };
  return updateWallet;
}

function useDeleteWallet() {
  const [deleteWalletMutation] = useMutation(DeleteWalletMutation);
  const deleteWallet = async (wallet) => {
    const { deletedWallet } = await deleteWalletMutation({
      variables: { walletId: wallet._id },
    });
    return deletedWallet;
  };
  return deleteWallet;
}
