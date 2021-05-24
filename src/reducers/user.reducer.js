import { userConstants } from '../actions/constants';

const intiState = {
  users: [],
  conversations: [],
  metUsers: [],
};

export default (state = intiState, action) => {
  let newState = {};
  switch (action.type) {
    case `${userConstants.GET_REALTIME_USERS}_REQUEST`:
      break;
    case `${userConstants.GET_REALTIME_USERS}_SUCCESS`:
      newState = {
        ...state,
        users: action.payload.users,
      };
      break;
    case userConstants.GET_REALTIME_MESSAGES:
      newState = {
        ...state,
        conversations: [
          ...(state.conversations && state.conversations.length ? state.conversations : []),
          ...action.payload.conversations,
        ],
      };
      newState.metUsers = newState.conversations.reduce((prev, current) => {
        if (!prev.includes(current.user_uid_1)) prev.push(current.user_uid_1);
        if (!prev.includes(current.user_uid_2)) prev.push(current.user_uid_2);
        return prev;
      }, []);
      break;
    case `${userConstants.GET_REALTIME_MESSAGES}_FAILURE`:
      newState = {
        ...state,
        conversations: [],
      };
      break;
    default:
  }

  return newState;
};
