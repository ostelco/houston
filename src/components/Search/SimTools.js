import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { subscriberActions } from '../../actions/subscriber.actions';
import ProvisionSim from './ProvisionSim';
import AllSimProfiles from './AllSimProfiles';

function SimTools(props) {
  return (
    <>
      <ProvisionSim />
      <br />
      <AllSimProfiles />
    </>
  );
}

SimTools.propTypes = {
  profile: PropTypes.shape({
    nickname: PropTypes.string,
    contactEmail: PropTypes.string,
    address: PropTypes.string
  }),
  subscriptions: PropTypes.shape({
    items: PropTypes.array
  }),
  deleteUser: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { currentSubscriber, subscriptions } = state;
  return {
    profile: currentSubscriber,
    subscriptions
  };
}
const mapDispatchToProps = {
  deleteUser: subscriberActions.deleteUser
};
export default connect(mapStateToProps, mapDispatchToProps)(SimTools);
