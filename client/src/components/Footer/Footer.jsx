import { Button, Drawer } from 'antd';
import React, { useState } from 'react';
import ProfilUpdate from '../../views/ProfilUpdate';

const Footer = () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const showDrawer2 = () => {
    setVisible2(true);
  };

  const onClose2 = () => {
    setVisible2(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Update Profile
      </Button>
      <Drawer title="Update Profile" placement="top" onClose={onClose} visible={visible}>
        <ProfilUpdate/>
      </Drawer>
    </>
  );
};

export default Footer;