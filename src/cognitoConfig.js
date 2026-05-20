const cognitoConfig = {
  Auth: {
    Cognito: {
      userPoolId:
        'us-east-1_NEdvZEBiA',

      userPoolClientId:
        'tlcrksc2u4q8kqh3f787jkul6',

      loginWith: {
        oauth: {
          domain:
            'https://d9u6so2frcyr9.cloudfront.net/',

          scopes: [
            'email',
            'openid',
            'profile',
          ],

          redirectSignIn: [
            'http://localhost:5173',
          ],

          redirectSignOut: [
            'http://localhost:5173',
          ],

          responseType: 'code',
        },
      },
    },
  },
}

export default cognitoConfig