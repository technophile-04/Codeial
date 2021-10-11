import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import styles from '../styles/home.module.css';

const FriendList = () => {
  const auth = useAuth();
  const { friends = [] } = auth.user;

  return (
    <div className={styles.friendsList}>
      <div className={styles.header}>Friends</div>
      {friends?.length === 0 ? (
        <div className={styles.noFriends}>No friends found</div>
      ) : (
        friends.map((friend) => (
          <div key={`friend-${friend._id}`}>
            <Link className={styles.friendsItem} to={`/user/${friend._id}`}>
              <div className={styles.friendsImg}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/17/17004.png"
                  alt="img"
                />
              </div>
              <div className={styles.friendsName}>{friend.to_user.email}</div>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default FriendList;
