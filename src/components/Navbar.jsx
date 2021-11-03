import { AccountCircle } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchUser } from '../api';
import { useAuth } from '../hooks';
import styles from '../styles/navbar.module.css';

const Navbar = () => {
  const auth = useAuth();
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await searchUser(searchText);

      if (res.success) {
        setResults(res.data.users);
      }
    };

    if (searchText.length > 2) {
      fetchUsers();
    } else {
      setResults([]);
    }
  }, [searchText]);

  const handleUserClick = () => {
    setSearchText('');
  };

  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>

      <div className={styles.searchContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
          alt=""
          className={styles.searchIcon}
        />

        <input
          placeholder="Search users"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {results.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {results.map((user) => (
                <li
                  className={styles.searchResultsRow}
                  key={`user-${user._id}`}
                >
                  <Link to={`/user/${user._id}`} onClick={handleUserClick}>
                    <img
                      src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                      alt=""
                    />
                    <span>{user.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <IconButton>
                <AccountCircle />
              </IconButton>
            </Link>
            <span>{auth.user.name}</span>
          </div>
        )}

        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li>
                  <Button variant="contained" onClick={auth.logout}>
                    Log out{' '}
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Log in</Link>
                </li>

                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
