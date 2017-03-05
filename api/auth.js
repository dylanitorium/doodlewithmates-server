import FB from 'fb';
import config from '../config/environment';

const getAccessTokenParameters = code => ({
  client_id: config.FB.APP_ID,
  client_secret: config.FB.APP_SECRET,
  redirect_uri: config.FB.REDIRECT_URI,
  code,
});

const hasError = response => (!response || response.error);

const formatValidResponse = ({ access_token, expires }) => ({
  access_token,
  expires,
});

const handleAccessTokenResponse = (resolve, reject) => (
  (response) => {
    if (hasError(response)) {
      reject(response);
    }
    resolve(formatValidResponse(response));
  }
);

export const getAccessToken = code => (
  new Promise((resolve, reject) => {
    FB.api(
      'oauth/access_token',
      getAccessTokenParameters(code),
      handleAccessTokenResponse(resolve, reject),
    );
  })
);

export const fetchFacebookAccount = code => (
  new Promise((resolve, reject) => {
    getAccessToken(code).then(({ access_token }) => {
      FB.api('/me', { access_token }, (response) => {
        if (hasError(response)) {
          reject(response);
        }
        resolve(response);
      });
    }).catch(({ error }) => (console.error(error)));
  })
);
