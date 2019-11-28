import React, { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

import Context from './Context';
import DataUsage from './DataUsage';
import Profile from './Profile';
import PaymentHistory from './PaymentHistory';
import SimTools from './SimTools';
import Tools from './Tools';
import AuditLogs from './AuditLogs';

function ResultTabHeader(props) {
  const { title, id, activeTab, setActiveTab } = props;
  const tabId = `${id}`;

  return (
    <NavItem>
      <NavLink
        className={classnames({ active: activeTab === tabId })}
        onClick={() => setActiveTab(tabId)}
      >
        {title}
      </NavLink>
    </NavItem>
  );
}

function ResultTabPane(props) {
  return (
    <TabPane tabId={`${props.id}`}>
      <br />
      {props.children}
    </TabPane>
  );
}

function ProfilePane() {
  return (
    <div>
      <Profile />
      <br />
      <DataUsage />
      <br />
    </div>
  );
}

export default function SubscriberDetails(props) {
  const [activeTab, setActiveTab] = useState('0');

  // Construct tab headers.
  const tabList = [
    'Profile',
    'Purchases',
    'Context',
    'Audit Logs',
    'Sim Tools',
    'Tools'
  ];
  const tabItems = tabList.map((tab, index) => (
    <ResultTabHeader
      title={tab}
      id={index}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      key={index}
    />
  ));
  // Construct tab panes.
  const tabPaneList = [
    <ProfilePane />,
    <PaymentHistory />,
    <Context />,
    <AuditLogs />,
    <SimTools />,
    <Tools />
  ];
  const tabPaneItems = tabList.map((pane, index) => (
    <ResultTabPane id={index} key={index}>
      {tabPaneList[index]}{' '}
    </ResultTabPane>
  ));

  return (
    <div className="container">
      <Nav tabs>{tabItems}</Nav>
      <TabContent activeTab={activeTab}>{tabPaneItems}</TabContent>
    </div>
  );
}
