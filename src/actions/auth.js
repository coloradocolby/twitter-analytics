import { firebase, twitterAuthProvider } from '../firebase/firebase';

export const login = (user) => ({
  type: 'LOGIN',
  user
});

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithRedirect(twitterAuthProvider).then(function(result) {
      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      var token = result.credential.accessToken;
      var secret = result.credential.secret;
      console.log('token', token);
      console.log('secrect', secrect);
      
      // The signed-in user info.
      var user = result.user;
      // ...
      console.log('action user', user);
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
