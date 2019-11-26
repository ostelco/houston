import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, CardBody, CardHeader } from 'reactstrap';

import NotificationEditor from '../Notifications/NotificationEditor';
import { subscriberActions } from '../../actions/subscriber.actions';

function Tools(props) {
  return (
    <>
      <Card>
        <CardHeader>Push Notifications</CardHeader>
        <CardBody>
          <NotificationEditor
            submitLabel="Send a message"
            titleLabel="Title"
            messageLabel="Message"
          />
        </CardBody>
      </Card>
    </>
  );
}

Tools.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(Tools);
