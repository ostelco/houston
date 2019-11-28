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
  DropdownMenu,
  Input
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

const EmptyRegions = () => {
  return (
    <Card>
      <CardHeader>Issue Sim Card</CardHeader>
      <CardBody>
        <Row>
          <Col xs={12} md={8}>
            There are no approved regions for this user. To issue a new sim, the
            user has do eKYC
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

const ProvisionSim = props => {
  const { regions, provisionSim } = props;
  const [regionIndex, setRegionIndex] = useState(0);
  const [profileIndex, setProfileIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [alias, setAlias] = useState('');

  // Render only if we have regions
  if (_.isEmpty(regions)) return <EmptyRegions />;

  let profileTypes = [
    { id: 'iphone', name: 'iPhone' },
    { id: 'android', name: 'Android' },
    { id: 'TEST', name: 'Dummy eSim' }
  ];

  // construct parameters for the provisioning API
  const parameters = {
    regionId: regions[regionIndex].id,
    regionName: regions[regionIndex].name,
    profileType: profileTypes[profileIndex].id,
    alias
  };
  const modalHeading = 'Confirm Provisioning';
  const modalText = `Do you want to provision new SIM for Region: ${parameters.regionName} with Profile Type: ${parameters.profileType} ?`;

  function onChange(e) {
    setAlias(e.target.value);
  }

  const confirmed = () => {
    provisionSim(parameters.regionId, parameters.profileType, parameters.alias);
    setShowModal(false);
    setAlias('');
  };
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
          <Col xs={2} md={2}>
            Alias
          </Col>
          <Col xs={12} md={8}>
            <Input
              type="text"
              value={alias}
              onChange={onChange}
              placeholder="Enter the alias for simcard"
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
  return {
    regions,
    latestSim
  };
}
const mapDispatchToProps = {
  provisionSim: subscriberActions.provisionSim
};
export default connect(mapStateToProps, mapDispatchToProps)(ProvisionSim);
