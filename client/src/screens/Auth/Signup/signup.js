import React, { useContext, useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useStaticQuery, graphql } from 'gatsby';
import { useLocation } from '@reach/router';

import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import { ValidSchema, SignupAuth } from '../helpers';

import ErrorText from '../../../components/Common/errorText';
import InputWrapper from '../../../components/Common/forms/TextInputWrapper';
import Button from '../../../components/Auth/Buttons/authButton';
import AuthCard from '../../../components/Auth/authCard';
import Label from '../../../components/Auth/authFormLabel';
import Input from '../../../components/Common/forms/TextInput';
import ContinueWith from '../../../components/Auth/continueWith';
import GoogleButton from '../../../components/Auth/Buttons/googleButton';
import LoadingOverlay from '../../../components/Common/loadingOverlay';
import SignUpFormHeader from './signupFormHeader';

const Signup = () => {
  const location = useLocation();
  const data = useStaticQuery(staticQuery);
  const domainUrl = data.site.siteMetadata.siteUrl;
  const { firebase, LogIn, LogOut } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const [appId, setAppId] = useState();
  const [isInviteFlow, setInviteFlow] = useState();

  //extract data from query params
  useEffect(() => {
    if (location.search) {
      const queryParams = location.search.split('=');
      setAppId(queryParams[1].split('&')[0]);
      setInviteFlow(queryParams[2]);
    }
  }, [location]);

  useEffect(() => {
    return () => fetchSuccess();
  }, []);

  const handleSubmit = async (values) => {
    fetchInit();

    let email = values.email;
    let password = values.password;
    let username = values.username;

    let authRes = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        fetchFailure(error);
      });

    SignupAuth(authRes, firebase, fetchFailure, username, domainUrl, isInviteFlow, appId);
  };

  //Google OAuth2 Signin
  const GoogleSignin = async () => {
    fetchInit();
    let provider = new firebase.auth.GoogleAuthProvider();

    //wait for firebase to confirm signup
    let authRes = await firebase
      .auth()
      .signInWithPopup(provider)
      .catch((error) => {
        fetchFailure(error);
      });

    SignupAuth(authRes, firebase, fetchFailure, null, domainUrl, isInviteFlow, appId);
  };

  return (
    <div>
      {isLoading && <LoadingOverlay />}
      <SignUpFormHeader />
      <AuthCard>
        <Formik
          validationSchema={ValidSchema}
          initialValues={{ email: '', password: '', username: '' }}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Label htmlFor="email">Email:</Label>
              <InputWrapper>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </InputWrapper>
              {errors.email && touched.email && <ErrorText>{errors.email}</ErrorText>}
              <Label htmlFor="username">First and Last Name:</Label>
              <InputWrapper>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
              </InputWrapper>
              {errors.username && touched.username && <ErrorText>{errors.username}</ErrorText>}
              <Label htmlFor="password">Password:</Label>
              <InputWrapper>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
              </InputWrapper>
              {errors.password && touched.password && <ErrorText>{errors.password}</ErrorText>}
              <Button type="submit">SignUp</Button>
            </form>
          )}
        </Formik>

        <ContinueWith />
        <GoogleButton GoogleSignin={GoogleSignin} />
      </AuthCard>
    </div>
  );
};

export default Signup;

const staticQuery = graphql`
  query GetDomainSignup {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;
