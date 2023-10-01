import React from 'react';
import { Tracker } from 'entities/Tracker';
import { useSelector } from 'react-redux';
import { getIsAuth } from 'entities/User';

const MainPage = () => {
  const isAuth = useSelector(getIsAuth);

  return (
    <div>
      <Tracker isDisabled={isAuth}/>
    </div>
  );
};

export default MainPage;