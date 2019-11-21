import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';

export default function Subscription(props) {
  const { subscription } = props;
  return (
    <Row>
      <Col xs={2} md={2}>Phone number:</Col>
      <Col xs={12} md={8}>{`${subscription.msisdn}`}</Col>
    </Row>);
}

Subscription.propTypes = {
  subscription: PropTypes.shape({
    msisdn: PropTypes.string,
    alias: PropTypes.string
  })
};
