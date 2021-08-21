import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addWallet } from '../../actions/profile';

const AddWallet = ({ addWallet, history }) => {
  const [formData, setFormData] = useState({
    type: '',
    address: '',
    description: ''
  });

  const { type, address, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className="large text-primary">Add A Wallet</h1>
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          addWallet(formData, history);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* Type"
            name="type"
            value={type}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* PUBLIC address"
            name="address"
            value={address}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Description"
            value={description}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/settings">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

export default connect(null, { addWallet })(AddWallet);
