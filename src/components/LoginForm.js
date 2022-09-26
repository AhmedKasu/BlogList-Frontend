import PropTypes from 'prop-types';

const LoginForm = ({ handleLogin, credentials, setCredentials }) => {
  const { username, password } = credentials;
  return (
    <form onSubmit={handleLogin}>
      <h1>log in to application</h1>
      <div>
        {' '}
        username
        <input
          type='text'
          value={username}
          name='Username'
          id='username'
          onChange={({ target }) =>
            setCredentials({ ...credentials, username: target.value })
          }
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          id='password'
          onChange={({ target }) =>
            setCredentials({ ...credentials, password: target.value })
          }
        />
      </div>
      <button id='submit' type='submit'>
        login
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  credentials: PropTypes.object.isRequired,
  setCredentials: PropTypes.func.isRequired,
};

export default LoginForm;
