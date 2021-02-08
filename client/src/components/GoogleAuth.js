import React from 'react';
import Button from '../styles/Auth';
import { GoogleLogin } from 'react-google-login';
import { SignInIcon } from './Icons';
import { authenticate } from 'utils/api-client';

function GoogleAuth() {
  return (
    <GoogleLogin
      clientId='361987034059-u80jcnufuuftjv4i29ri37mi2mgeoab0.apps.googleusercontent.com'
      cookiePolicy='single_host_origin'
      onSuccess={authenticate}
      onFailure={authenticate}
      render={renderProps => (
        <Button
          tabIndex={0}
          type='button'
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}>
          <span className='outer'>
            <span className='inner'>
              <SignInIcon />
            </span>
            sign in
          </span>
        </Button>
      )}
    />
  );
}

export default GoogleAuth;
