import { auth, firestore } from 'firebase';
import { authConstanst } from './constants';
import { getRealtimeUsers } from './user.actions';

export const signup = (user) => async (dispatch) => {
  const db = firestore();

  dispatch({ type: `${authConstanst.USER_LOGIN}_REQUEST` });

  auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      console.log(data);
      const { currentUser } = auth();
      const name = `${user.firstName} ${user.lastName}`;

      const { known, unknown, interests } = user;
      currentUser.updateProfile({
        displayName: name,
      })
        .then(() => {
          // if you are here means it is updated successfully
          db.collection('users')
            .doc(data.user.uid)
            .set({
              firstName: user.firstName,
              lastName: user.lastName,
              uid: data.user.uid,
              createdAt: new Date(),
              isOnline: true,
              known: known.split(', '),
              unknown: unknown.split(', '),
              interests: interests.split(', '),
            })
            .then(() => {
              // succeful
              const loggedInUser = {
                firstName: user.firstName,
                lastName: user.lastName,
                uid: data.user.uid,
                email: user.email,
                known: known.split(', '),
                unknown: unknown.split(', '),
                interests: interests.split(', '),
              };
              localStorage.setItem('user', JSON.stringify(loggedInUser));
              console.log('User logged in successfully...!');
              dispatch({
                type: `${authConstanst.USER_LOGIN}_SUCCESS`,
                payload: { user: loggedInUser },
              });
            })
            .catch((error) => {
              console.log(error);
              dispatch({
                type: `${authConstanst.USER_LOGIN}_FAILURE`,
                payload: { error },
              });
            });
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signin = (user) => async (dispatch) => {
  dispatch({ type: `${authConstanst.USER_LOGIN}_REQUEST` });
  auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(async (data) => {
      console.log({ data });

      const db = firestore();

      const currUser = await (await db.collection('users').doc(data.user.uid).get()).data();
      console.log({ currUser });

      db.collection('users')
        .doc(data.user.uid)
        .update({
          isOnline: true,
        })
        .then(() => {
          const name = data.user.displayName.split(' ');
          const firstName = name[0];
          const lastName = name[1];

          const loggedInUser = {
            firstName,
            lastName,
            uid: data.user.uid,
            email: data.user.email,
            interests: currUser.interests,
            known: currUser.known,
            unknown: currUser.unknown,
          };

          localStorage.setItem('user', JSON.stringify(loggedInUser));

          dispatch({
            type: `${authConstanst.USER_LOGIN}_SUCCESS`,
            payload: { user: loggedInUser },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: `${authConstanst.USER_LOGIN}_FAILURE`,
        payload: { error },
      });
    });
};

export const isLoggedInUser = () => async (dispatch) => {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  if (user) {
    dispatch({
      type: `${authConstanst.USER_LOGIN}_SUCCESS`,
      payload: { user },
    });
  } else {
    dispatch({
      type: `${authConstanst.USER_LOGIN}_FAILURE`,
      payload: { error: 'Login again please' },
    });
  }
};

export const logout = (uid) => async (dispatch) => {
  dispatch({ type: `${authConstanst.USER_LOGOUT}_REQUEST` });
  // Now lets logout user

  const db = firestore();
  db.collection('users')
    .doc(uid)
    .update({
      isOnline: false,
    })
    .then(() => {
      auth()
        .signOut()
        .then(() => {
          // successfully
          localStorage.clear();
          dispatch({ type: `${authConstanst.USER_LOGOUT}_SUCCESS` });
        })
        .catch((error) => {
          console.log(error);
          dispatch({ type: `${authConstanst.USER_LOGOUT}_FAILURE`, payload: { error } });
        });
    })
    .catch((error) => {
      console.log(error);
    });
};
