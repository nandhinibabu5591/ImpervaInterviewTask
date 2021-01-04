const crypto = require('crypto');

/*
The below script does the authentication check:
 * The passwords for Test1 and Test2 are hashed by using function getHashedPassword().
 * Going forward, the passwords from UI will be hashed and compared with the below data.
 * On success, it will generate authentication token and send it back
*/

const users = [
  {
    userid: 'Test1',
    password: 'THOGCkim5E82n9fjg4Sqcy7eXkPCGnDH/45UjwhEEzM='
  },
  {
    userid: 'Test2',
    password: 'TaHqWfHq57GS5u9nM89ZB8No6L0k9IN4kRZashUpLgI='
  }
];

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
}

const generateAuthToken = () => {
  return crypto.randomBytes(30).toString('hex');
}

function authenticateUser(data) {
  const { username, password } = data;
  const hashedPwd = getHashedPassword(password);  
  if (users.find(user => (user.userid === username && user.password === hashedPwd))) {
    const authToken = generateAuthToken();
    return authToken;
  } else {
    return null;
  }
}

module.exports.authUser = authenticateUser;