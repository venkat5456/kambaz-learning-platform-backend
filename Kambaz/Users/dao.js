// Kambaz/Users/dao.js
const { v4: uuidv4 } = require("uuid");

module.exports = function UsersDao(db) {
  function findAllUsers() {
    return db.users;
  }

  function findUserById(userId) {
    return db.users.find((user) => user._id === userId);
  }

  function findUserByUsername(username) {
    return db.users.find((user) => user.username === username);
  }

  function findUserByCredentials(username, password) {
    return db.users.find(
      (user) => user.username === username && user.password === password
    );
  }

  function createUser(user) {
    const newUser = { ...user, _id: uuidv4() };
    db.users = [...db.users, newUser];
    return newUser;
  }

  function updateUser(userId, updates) {
    const user = findUserById(userId);
    if (!user) return null;
    Object.assign(user, updates);
    return user;
  }

  function deleteUser(userId) {
    const originalLength = db.users.length;
    db.users = db.users.filter((user) => user._id !== userId);
    return originalLength !== db.users.length;
  }

  return {
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    createUser,
    updateUser,
    deleteUser,
  };
};
