const db = require("../config/dbConfig");

module.exports = {
  find,
  findbyId,
  getOfferedTours,
  add,
  addBookedTour,
};

function find() {
  return db("users")
    .join("tours", "users.uid", "tours.user_id")
    .select(
      "tours.id",
      "tours.tourname",
      "tours.tourdescription",
      "tours.tourguidephonenumber",
      "tours.recommendedage",
      "tours.whattobring",
      "tours.price",
      "tours.durationhrs",
      "tours.meetingaddress",
      "users.first_name",
      "users.last_name",
      "users.email",
      "users.phone_number",
      "users.profilePhoto"
    );
}

function findbyId(id) {
  console.log(id);
  return db("users")
    .join("tours", "users.uid", "tours.user_id")
    .where({ id })
    .first()
    .select(
      "tours.id",
      "tours.tourname",
      "tours.tourdescription",
      "tours.tourguidephonenumber",
      "tours.recommendedage",
      "tours.whattobring",
      "tours.price",
      "tours.durationhrs",
      "tours.meetingaddress",
      "users.first_name",
      "users.last_name",
      "users.email",
      "users.phone_number",
      "users.profilePhoto"
    );
}

// Find a guides offered tours
function getOfferedTours(uid) {
  return db("tours").where({ user_id: uid });
}

async function add(tour) {
  console.log("In the model", tour);
  try {
    const [id] = await db("tours").insert(tour);
    console.log("ID: ", id);
    return await findbyId(id);
  } catch (error) {
    console.log("Add Tour model error: ", error);
  }
}

function findBookedTourById(id) {
  return db("bookedTours").where({ id }).first();
}

async function addBookedTour(bookedTour) {
  const [id] = await db("bookedTours").insert(bookedTour);

  return await findBookedTourById(id);
}
