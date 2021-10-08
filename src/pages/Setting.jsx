import React, { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../hooks';
import styles from '../styles/settings.module.css';

const Setting = () => {
  const auth = useAuth();

  const [editMode, setEditMode] = useState(true);
  const [userName, setUserName] = useState(auth.user?.name);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const { addToast } = useToasts();

  const clearForm = () => {
    setPassword('');
    setConfirmPassword('');
  };

  const updateProfile = async () => {
    setSavingProfile(true);

    let error = false;

    if (!userName || !password || !confirmPassword) {
      addToast('Please add all fields', {
        appearance: 'error',
        autoDismiss: true,
      });
      error = true;
    }

    if (password !== confirmPassword) {
      addToast('Password does not match', {
        appearance: 'error',
        autoDismiss: true,
      });

      error = true;
    }

    if (error) {
      return setSavingProfile(false);
    }

    const res = await auth.updateUser(
      auth.user._id,
      userName,
      password,
      confirmPassword
    );

    if (res.success) {
      setEditMode(false);
      setSavingProfile(false);

      clearForm();

      return addToast('User updated successfully', {
        appearance: 'success',
        autoDismiss: true,
      });
    } else {
      addToast(res.message, {
        appearance: 'error',
        autoDismiss: true,
      });
    }

    setSavingProfile(false);
  };

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
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {editMode ? (
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        ) : (
          <div className={styles.fieldValue}>{auth.user?.name}</div>
        )}
      </div>

      {editMode && (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            <div className={styles.fieldValue}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Confirm Password</div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </>
      )}

      <div className={styles.btnGrp}>
        {editMode ? (
          <>
            <button
              className={`button  ${styles.saveBtn}`}
              onClick={updateProfile}
              disabled={savingProfile}
            >
              {savingProfile ? 'Saving...' : 'Save Profile'}
            </button>
            <button
              className={`button  ${styles.goBack}`}
              onClick={() => setEditMode(false)}
            >
              Go Back
            </button>
          </>
        ) : (
          <button
            className={`button  ${styles.editBtn}`}
            onClick={(e) => setEditMode(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Setting;
