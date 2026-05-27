// Dynamically captures http://localhost:5173 or your deployed CloudFront/custom domain url
const currentBrowserOrigin = window.location.origin;

const cognitoConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_NEdvZEBiA',
      userPoolClientId: 'tlcrksc2u4q8kqh3f787jkul6',
      loginWith: {
        oauth: {
          // Amplify expects ONLY the host domain name here (no protocol or trailing slash)
          domain: 'd9u6so2frcyr9.cloudfront.net',
          scopes: [
            'email',
            'openid',
            'profile',
          ],
          // Replaces the hardcoded array with your browser's current active origin URL
          redirectSignIn: [
            currentBrowserOrigin,
          ],
          redirectSignOut: [
            currentBrowserOrigin,
          ],
          responseType: 'code',
        },
      },
    },
  },
}

export default cognitoConfig