import React from 'react';
import { navigate } from 'gatsby';
import { colors, breakpoints, fieldStyles } from '../../../../styles/theme';
import styled from 'styled-components';

const Card = styled.div`
  background-color: ${colors.white};
  width: 100%;
  padding: 1rem;
  border-radius: 0.75rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  @media (min-width: ${breakpoints.large}) {
    width: 75%;
  }
`;

const Paragraph = styled.p`
  font-weight: 700;
`;

const Button = styled.button`
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  border-radius: 0.375rem;
  color: ${colors.white};
  cursor: pointer;
  background-color: ${colors.indigo600};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  &:hover {
    background-color: ${colors.indigo500};
  }
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45);
  }
  &:active {
    background-color: ${colors.indigo600};
  }
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  padding-top: 1.5rem;
`;

const UpdatePasswordCard = () => {
  return (
    <Card>
      <SectionTitle>Update Password</SectionTitle>
      <Paragraph>Please Reset Password on Login Page</Paragraph>
      <Button
        onClick={() => {
          navigate('/auth/login');
        }}
      >
        Go to Login
      </Button>
    </Card>
  );
};

export default UpdatePasswordCard;
