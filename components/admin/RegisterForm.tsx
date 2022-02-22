import React from 'react';
import RegisterInput from './RegisterInput';
import styled from 'styled-components';
import Button from '../common/Button';

interface RegisterFormProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRegister: () => void;
}

const Container = styled.div``;

const Row = styled.div`
  display: flex;
  padding: 1rem;
`;

const Title = styled.div`
  width: 10rem;
`;

const RegisterForm: React.FC<RegisterFormProps> = ({
  onChange,
  onRegister,
}) => {
  return (
    <Container>
      <Row>
        <Title>이름</Title>
        <RegisterInput name="name" onChange={onChange} />
      </Row>
      <Row>
        <Title>전화번호</Title>
        <RegisterInput name="tel" onChange={onChange} />
      </Row>
      <Row>
        <Title>주소</Title>
        <RegisterInput name="address" onChange={onChange} />
      </Row>
      <Row>
        <Title>위치</Title>
        <RegisterInput name="location" onChange={onChange} />
      </Row>
      <Row>
        <Button onClick={onRegister}>등록</Button>
      </Row>
    </Container>
  );
};

export default RegisterForm;
