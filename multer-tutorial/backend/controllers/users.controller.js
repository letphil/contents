/** {User}
 * id: number
 * username: strng
 * createdAt: string
 * updatedAt: string
 */

/**
 *
 * @param {Number} id - id of user in db
 * @returns {User} - User Object
 */
async function getUserById(id) {
  // find user in DB -> EXAMPLE await adapter.findById(id)
  return {
    id,
    username: "example",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 *
 * @returns {User[]}
 */
async function getUsersList() {
  return [
    {
      id: 1,
      username: "example",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      username: "example",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 3,
      username: "example",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}

module.exports = {
  getUserById,
  getUsersList,
};
