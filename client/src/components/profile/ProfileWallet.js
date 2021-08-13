import React from 'react';
import formatDate from '../../utils/formatDate';

const ProfileWallet = ({
  wallet: { type, address, description }
}) => (
  <div>
    <h3 className="text-dark">{type}</h3>
    <p>
      <strong>Type: </strong> {type}
    </p>
    <p>
      <strong>Address: </strong> {address}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
);

export default ProfileWallet;
