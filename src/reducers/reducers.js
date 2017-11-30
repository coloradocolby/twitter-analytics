export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.user
      };
    case 'LOGOUT':
      return {};
    case 'STORE_CREDENTIAL':
      return {
        ...state,
        credential: action.credential
      };
    default:
      return state;
  }
};
