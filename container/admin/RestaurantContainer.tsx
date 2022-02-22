import React from 'react';
import RegisterForm from '../../components/admin/RegisterForm';
import useInputs from '../../lib/hooks/useInputs';
import * as RestaurantAPI from '../../lib/api/restaurants';
import RestaurantList from '../../components/admin/RestaurantList';

const RegisterFormContainer = () => {
  const [inputs, onChange] = useInputs({
    name: '',
    tel: '',
    address: '',
    location: '',
  });

  const onRegister = () => {
    RestaurantAPI.registerRestaurant({
      name: inputs.name,
      tel: inputs.tel,
      address: inputs.address,
      location: { x: 56, y: 87 },
      types: [],
      categories: [],
      menus: [],
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/* <RestaurantList /> */}
      <RegisterForm onChange={onChange} onRegister={onRegister} />
    </>
  );
};

export default RegisterFormContainer;
