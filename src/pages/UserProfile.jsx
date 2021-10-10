import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchUserProfile } from '../api';
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../hooks';
import styles from '../styles/settings.module.css';
import { Loader } from '../components';

const UserProfile = () => {
  const auth = useAuth();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const { addToast } = useToasts();
  const history = useHistory();
  useEffect(() => {
    (async function getUser() {
      const res = await fetchUserProfile(userId);

      if (res.success) {
        console.log(res.data.user);
        setUser(res.data.user);
      } else {
        addToast(res.message, {
          appearance: 'error',
          autoDismiss: true,
        });

        return history.push('/');
      }

      setLoading(false);
    })();
  }, [userId, history, addToast]);

  const checkIfUserIsAFrnd = () => {
    const friends = auth.user.friends;

    const friendsIds = friends.map((friend) => friend.to_user._id);

    const index = friendsIds.indexOf(userId);

    if (index !== -1) {
      return true;
    }

    return false;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
          alt=""
        />
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user?.email}</div>
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user?.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsAFrnd() ? (
          <button className={`button  ${styles.saveBtn}`}>Remove friend</button>
        ) : (
          <button className={`button  ${styles.saveBtn}`}>Add friend</button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
