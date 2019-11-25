import _ from 'lodash';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Col,
  Row,
  Card,
  CardBody,
  CardHeader,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from 'reactstrap';

import SimProfileQRCode from './SimProfileQRCode';
import { subscriberActions } from '../../actions/subscriber.actions';
import WarningModal from '../Shared/WarningModal';

const Option = props => {
  const { selected, setSelected, items } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);
  const click = (e, index) => setSelected(index);
  let listItems = null;
  if (Array.isArray(items)) {
    listItems = items.map((item, index) => (
      <DropdownItem
        key={index}
        active={index === selected}
        onClick={e => click(e, index)}
      >
        {item.name}
      </DropdownItem>
    ));
  }

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>{items[selected].name}</DropdownToggle>
      <DropdownMenu>{listItems}</DropdownMenu>
    </Dropdown>
  );
};

const ProvisionSim = props => {
  const { regions, provisionSim } = props;
  const [regionIndex, setRegionIndex] = useState(0);
  const [profileIndex, setProfileIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  // Render only if we have regions
  if (_.isEmpty(regions)) return null;
  let profileTypes = [{ name: 'iPhone' }, { name: 'Android' }];

  // construct parameters for the provisioning API
  const parameters = {
    regionId: regions[regionIndex].id,
    regionName: regions[regionIndex].name,
    profileType: profileTypes[profileIndex].name
  };
  const modalHeading = 'Confirm Provisioning';
  const modalText = `Do you want to provision new SIM for Region: ${parameters.regionName} with Profile Type: ${parameters.profileType} ?`;

  const confirmed = () => {
    console.log('Confirmed SIM provisioning', parameters);
    provisionSim(parameters.regionId, parameters.profileType);
    setShowModal(false);
  };
  console.log('props.latestSim ', props.latestSim);
  return (
    <Card>
      <CardHeader>Issue Sim Card</CardHeader>
      <CardBody>
        <Row>
          <Col xs={2} md={2}>
            Region
          </Col>
          <Col xs={12} md={8}>
            <Option
              items={regions}
              selected={regionIndex}
              setSelected={setRegionIndex}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={2} md={2}>
            Profile Type
          </Col>
          <Col xs={12} md={8}>
            <Option
              items={profileTypes}
              selected={profileIndex}
              setSelected={setProfileIndex}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={6} md={4}>
            <Button color="danger" onClick={() => setShowModal(true)}>
              Provision new SIM
            </Button>
          </Col>
        </Row>
        <hr />
        <SimProfileQRCode simProfile={props.latestSim} />
        <WarningModal
          heading={modalHeading}
          dangerStyle={true}
          warningText={modalText}
          show={showModal}
          handleConfirm={confirmed}
          handleClose={() => setShowModal(false)}
        />
      </CardBody>
    </Card>
  );
};

ProvisionSim.propTypes = {
  regions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    })
  ),
  provisionSim: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { approvedRegions, latestSim } = state;
  const regions = _.compact(_.map(approvedRegions, 'region'));
  console.log('regions = ', regions);
  return {
    regions,
    latestSim
  };
}
const mapDispatchToProps = {
  provisionSim: subscriberActions.provisionSim
};
export default connect(mapStateToProps, mapDispatchToProps)(ProvisionSim);
