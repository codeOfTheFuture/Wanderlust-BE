const db = require("../config/dbConfig");

module.exports = {
  addUser,
  findUserByUid,
  updateUser,
  findTouristBy,
  addTourist,
  findTourists,
  findTouristById,
};

// Add user to db
async function addUser(user) {
  // try {
  //   const checkUser = await findUserById(user.uid);
  //   if (checkUser) throw new Error();
  // } catch (error) {
  //   console.log(error);
  // }
  console.log("user param from add user>>>", user);
  try {
    await db("users").insert(user);
    const fetchUser = await findUserByUid(user.uid).select(
      "isTourGuide",
      "firstName",
      "lastName",
      "phoneNumber",
      "isRegistered",
      "photoURL",
      "displayName",
      "creationTime",
      "lastSignInTime"
    );
    console.log("fetchUser>>>>>user-model", fetchUser);
    return fetchUser;
  } catch (error) {
    console.log("Error>>>>>>>: ", error);
    return error;
  }
}

// Find a single user by uid
function findUserByUid(uid) {
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
