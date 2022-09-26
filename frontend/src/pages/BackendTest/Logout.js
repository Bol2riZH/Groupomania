import React from 'react';

import Card from '../../UI/Card';
import Button from '../../UI/Button';

const Logout = () => {
  const logoutHandler = () => {
    localStorage.clear();
  };

  return (
    <Card>
      <Button onClick={logoutHandler}>Logout</Button>
    </Card>
  );
};

export default Logout;
