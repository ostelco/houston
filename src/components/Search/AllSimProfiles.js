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

const Option = props => {
  const { selected, setSelected, items } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);
  const click = (e, index) => setSelected(index);
  let listItems = null;
  if (!Array.isArray(items)) return null;

  listItems = items.map((item, index) => (
    <DropdownItem
      key={index}
      active={index === selected}
      onClick={e => click(e, index)}
    >
      {item.iccId}
    </DropdownItem>
  ));

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>{items[selected].iccId}</DropdownToggle>
      <DropdownMenu>{listItems}</DropdownMenu>
    </Dropdown>
  );
};

const AllSimProfiles = props => {
  const { allSimProfiles } = props;
  const [simIndex, setSimIndex] = useState(0);

  if (_.isEmpty(allSimProfiles)) return null;

  return (
    <Card>
      <CardHeader>Simcard Details</CardHeader>
      <CardBody>
        <Row>
          <Col xs={2} md={2}>
            Simcards
          </Col>
          <Col xs={12} md={8}>
            <Option
              items={allSimProfiles}
              selected={simIndex}
              setSelected={setSimIndex}
            />
          </Col>
        </Row>
        <br />
        <SimProfileQRCode simProfile={allSimProfiles[simIndex]} />
      </CardBody>
    </Card>
  );
};

AllSimProfiles.propTypes = {
  allSimProfiles: PropTypes.array
};

function mapStateToProps(state) {
  const { allSimProfiles } = state;
  return {
    allSimProfiles
  };
}
export default connect(mapStateToProps)(AllSimProfiles);
