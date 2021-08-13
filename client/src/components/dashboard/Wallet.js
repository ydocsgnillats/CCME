import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { deleteWallet } from '../../actions/profile';

const Wallet = ({ wallet, deleteWallet }) => {
  const wallets = wallet.map((wal) => (
    <tr key={wal._id}>
      <td>{wal.type}</td>
      <td className="hide-sm">{wal.address}</td>
      <td className="hide-sm">{wal.description}</td>
      <td>
        <button
          onClick={() => deleteWallet(wal._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Wallet Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Type</th>
            <th className="hide-sm">Address</th>
            <th className="hide-sm">Description</th>
            <th />
          </tr>
        </thead>
        <tbody>{wallets}</tbody>
      </table>
    </Fragment>
  );
};

export default connect(null, { deleteWallet })(Wallet);
