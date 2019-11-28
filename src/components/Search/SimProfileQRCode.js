import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Spinner } from 'reactstrap';
import QRCode from 'qrcode.react';

const SimProfileQRCode = props => {
  const { simProfile } = props;
  if (_.isEmpty(simProfile) || simProfile.error) return null;
  if (simProfile.loading) {
    return <Spinner style={{ width: '3rem', height: '3rem' }} />;
  }
  if (_.isEmpty(simProfile.iccId)) {
    return null;
  }
  return (
    <div>
      <Row>
        <Col xs={2} md={2}>
          ICCID
        </Col>
        <Col xs={12} md={8}>
          {simProfile.iccId}
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={2} md={2}>
          Alias
        </Col>
        <Col xs={12} md={8}>
          {_.isEmpty(simProfile.alias) ? 'Not specified' : simProfile.alias}
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={2} md={2}>
          <QRCode value={simProfile.eSimActivationCode} />
        </Col>
        <Col xs={12} md={8}></Col>
      </Row>
    </div>
  );
};

SimProfileQRCode.propTypes = {
  simProfile: PropTypes.oneOfType([
    PropTypes.shape({
      iccId: PropTypes.string,
      eSimActivationCode: PropTypes.string
    }),
    PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.string
    })
  ])
};

export default SimProfileQRCode;
