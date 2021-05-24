/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import { getRealtimeUsers, updateMessage, getRealtimeConversations } from '../../actions';

const User = (props) => {
  const { user, onClick } = props;

  return (
    <div onClick={() => onClick(user)} className="displayName">
      <div className="displayPic">
        <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
      </div>
      <div style={{
        display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px',
      }}
      >
        <span style={{ fontWeight: 500 }}>
          {user.firstName}
          {' '}
          {user.lastName}
        </span>
        <span className={user.isOnline ? 'onlineStatus' : 'onlineStatus off'} />
      </div>
    </div>
  );
};

const HomePage = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const [metUsers, setMetUsers] = useState([]);
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState('');
  const [message, setMessage] = useState('');
  const [userUid, setUserUid] = useState(null);
  let unsubscribe;

  useEffect(() => {
    unsubscribe = dispatch(getRealtimeUsers(auth.uid))
      .then((unsub) => unsub)
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // console.log(user);

  // componentWillUnmount
  useEffect(() => () => {
    // cleanup
    unsubscribe.then((f) => f()).catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (auth && auth.uid) {
      dispatch(getRealtimeConversations({ uid_1: auth.uid }));
    }
  }, [auth]);

  useEffect(() => {
    if (user && user.users && user.users.length
      && user.metUsers && user.metUsers.length) {
      setMetUsers(
        user.metUsers.map(
          (id) => user.users.find((user) => user.uid === id) || null,
        ).filter((u) => u !== null),
      );
    }
  }, [user]);

  const initChat = (_user) => {
    setChatStarted(true);
    setChatUser(`${_user.firstName} ${_user.lastName}`);
    setUserUid(_user.uid);

    console.log(_user);
  };

  const submitMessage = () => {
    const msgObj = {
      user_uid_1: auth.uid,
      user_uid_2: userUid,
      message,
    };

    if (message !== '') {
      dispatch(updateMessage(msgObj))
        .then(() => {
          setMessage('');
        });
    }

    // console.log(msgObj);
  };

  const selectNewContact = () => {
    if (user && user.users && user.users.length) {
      const newUsers = user.users.filter((u) => !(user.metUsers.includes(u.uid)));
      return newUsers.filter((u) => {
        let i = 0;
        auth.unknown.forEach((lang) => {
          if (u.known.includes(lang)) i += 1;
        });
        if (i > 0) return true;
        return false;
      }).sort((a, b) => {
        let ai = 0;
        let bi = 0;
        auth.interests.forEach((inter) => {
          if (a.interests.includes(inter)) ai += 1;
          if (b.interests.includes(inter)) bi += 1;
        });
        return bi - ai;
      })[0];
    }
    return null;
  };

  const newConversation = () => {
    const newuser = selectNewContact();

    if (!newuser) return;

    const msgObj = {
      user_uid_1: auth.uid,
      user_uid_2: newuser.uid,
      message: 'Hello!',
    };

    dispatch(updateMessage(msgObj))
      .then(() => {
        setMessage('');
      });

    // console.log(msgObj);
  };

  return (
    <Layout>
      <section className="container">

        <div className="listOfUsers">
          <div style={{ padding: '10px' }}>
            <button onClick={newConversation}>New conversation</button>
          </div>

          {
            metUsers && metUsers.length > 0
              ? metUsers.map((user) => (
                <User
                  onClick={() => initChat(user)}
                  key={user.uid}
                  user={user}
                />
              )) : null
          }

        </div>

        <div className="chatArea">

          <div className="chatHeader">
            {
              chatStarted ? chatUser : ''
            }
          </div>
          <div className="messageSections">
            {
                  chatStarted
                    ? user.conversations.filter(
                      (c) => c.user_uid_1 === (auth && userUid)
                      || c.user_uid_2 === (auth && userUid),
                    ).map((con) => (
                      <div style={{ textAlign: con.user_uid_1 === auth.uid ? 'right' : 'left' }}>
                        <p className="messageStyle">{con.message}</p>
                      </div>
                    ))
                    : null
                }

          </div>
          {
              chatStarted
                ? (
                  <div className="chatControls">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write Message"
                    />
                    <button onClick={submitMessage}>Send</button>
                  </div>
                ) : null
            }

        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
