import { firestore } from 'firebase';
import { userConstants } from './constants';

export const getRealtimeUsers = (uid) => async (dispatch) => {
  dispatch({ type: `${userConstants.GET_REALTIME_USERS}_REQUEST` });

  const db = firestore();
  const unsubscribe = db.collection('users')
    // .where("uid", "!=", uid)
    .onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().uid !== uid) {
          users.push(doc.data());
        }
      });
      // console.log(users);

      dispatch({
        type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`,
        payload: { users },
      });
    });

  return unsubscribe;
};

export const updateMessage = (msgObj) => async () => {
  const db = firestore();
  db.collection('conversations')
    .add({
      ...msgObj,
      isView: false,
      createdAt: new Date(),
    })
    .then((data) => {
      console.log(data);
      // success
      // dispatch({
      //     type: userConstants.GET_REALTIME_MESSAGES,
      // })
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getRealtimeConversations = (user) => async (dispatch) => {
  const onSnapshot = (querySnapshot) => {
    const conversations = [];

    querySnapshot.docChanges().forEach((doc) => {
      if (doc.type === 'added') conversations.push(doc.doc.data());
    });

    dispatch({
      type: userConstants.GET_REALTIME_MESSAGES,
      payload: { conversations },
    });

    console.log(conversations);
  };

  const db = firestore();
  db.collection('conversations')
    .where('user_uid_1', '==', user.uid_1)
    .orderBy('createdAt', 'asc')
    .onSnapshot(onSnapshot);

  db.collection('conversations')
    .where('user_uid_2', '==', user.uid_1)
    .orderBy('createdAt', 'asc')
    .onSnapshot(onSnapshot);
  // user_uid_1 == 'myid' and user_uid_2 = 'yourId' OR user_uid_1 = 'yourId' and user_uid_2 = 'myId'
};
