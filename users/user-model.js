const db = require("../config/dbConfig");

module.exports = {
  addUser,
  findUserById,
  updateUser,
  findTouristBy,
  addTourist,
  findTourists,
  findTouristById,
};

// Add user to db
async function addUser(user) {
  try {
    const checkUser = await findUserById(user.uid);
    if (checkUser) return checkUser;
  } catch (error) {
    console.log(error);
  }

  try {
    const [uid] = await db("users").insert(user);
    return await findUserById(uid).select(
      "isTourGuide",
      "first_name",
      "last_name",
      "phone_number"
    );
  } catch (error) {
    console.log("Error>>>>>>>: ", error);
    return error;
  }
}

// Find a single user by uid
function findUserById(uid) {
  return db("users").where({ uid }).first();
}

// Update user info
async function updateUser(uid, changes) {
  try {
    await db("users").where({ uid }).update(changes);
    return await findUserById(uid);
  } catch (error) {
    console.log("update in user-model err", error);
    return error;
  }
}

function findTouristById(id) {
  return db("tourists").where({ id }).first();
}

async function addTourist(tourist) {
  const [id] = await db("tourists").insert(tourist);

  console.log("modal", id);

  return await findTouristById(id).select(
    "id",
    "username",
    "isTourGuide",
    "email",
    "firstname",
    "lastname",
    "phonenumber",
    "profilepicture",
    "bannerpicture"
  );
}

function findTouristBy(filter) {
  return db("tourists").where(filter).first();
}

function findTourists() {
  return db("tourists").select(
    "id",
    "username",
    "isTourGuide",
    "email",
    "firstname",
    "lastname",
    "phonenumber",
    "profilepicture",
    "bannerpicture"
  );
}
