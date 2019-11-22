import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row, Card, CardBody, CardHeader, Button } from 'reactstrap';

import { subscriberActions } from '../../actions/subscriber.actions';
import Subscription from './Subscription';
import WarningModal from '../Shared/WarningModal';

function Profile(props) {
  const [showWarning, setShowWarning] = useState(false);
  const { deleteUser, subscriptions, profile } = props;

  function handleConfirmModal() {
    deleteUser();
    setShowWarning(false);
  }

  const modalHeading = `Confirm remove user`;
  const modalText = `Do you really want to remove this user?`;

  let listItems = null;
  if (Array.isArray(subscriptions.items)) {
    listItems = subscriptions.items.map((subscription, index) => (
      <div key={index}>
        <Subscription subscription={subscription} key={index} />
        <hr />
      </div>
    ));
  }
  return (
    <Card>
      <CardHeader>Customer</CardHeader>
      <CardBody>
        <Row>
          <Col xs={2} md={2}>
            {'Name:'}
          </Col>
          <Col xs={12} md={8}>{`${profile.nickname}`}</Col>
        </Row>
        <Row>
          <Col xs={2} md={2}>
            {'Email:'}
          </Col>
          <Col xs={12} md={8}>{`${profile.contactEmail}`}</Col>
        </Row>
        <Row>
          <Col xs={2} md={2}>
            {'ID:'}
          </Col>
          <Col xs={12} md={8}>{`${props.profile.id}`}</Col>
        </Row>
        <br />
        <Row>
          <Col xs={6} md={4}>
            <Button color="danger" onClick={() => setShowWarning(true)}>
              {'Remove User'}
            </Button>
          </Col>
        </Row>
        <hr />
        {listItems}
        <WarningModal
          heading={modalHeading}
          dangerStyle={true}
          warningText={modalText}
          show={showWarning}
          handleConfirm={handleConfirmModal}
          handleClose={() => setShowWarning(false)}
        />
      </CardBody>
    </Card>
  );
}

Profile.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
