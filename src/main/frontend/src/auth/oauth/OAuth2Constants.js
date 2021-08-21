/*const API_BASE_URL = 'http://mentorship-env-1.eba-m6xkjhhf.eu-central-1.elasticbeanstalk.com';*/
const API_BASE_URL = 'http://localhost:5000';

/*const OAUTH2_REDIRECT_URI = 'http://mentorship-react.s3-website.eu-central-1.amazonaws.com/oauth2/redirect';*/
const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect';

export const ACCESS_TOKEN = 'accessToken';

export const GOOGLE_AUTH_URL =
    API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;