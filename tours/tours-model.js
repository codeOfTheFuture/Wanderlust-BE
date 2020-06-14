const db = require("../config/dbConfig");

module.exports = {
  find,
  findbyId,
  add,
  addBookedTour,
};

function find() {
  return db("tours");
  // .innerJoin("users", "users.uid", "tours.user_id")
  // .select(
  //   "tours.id",
  //   "tours.tourname",
  //   "tours.tourdescription",
  //   "tours.tourguidephonenumber",
  //   "tours.recommendedage",
  //   "tours.whattobring",
  //   "tours.category",
  //   "tours.area",
  //   "tours.price",
  //   "tours.durationhrs",
  //   "tours.meetingaddress",
  //   "tours.user_id as user_id"
  // );
}

function findbyId(id) {
  console.log(id);
  return db("tours").where({ id }).first();
}

async function add(tour) {
  console.log("In the model", tour);

  const [id] = await db("tours").insert(tour);
  console.log("ID: ", id);
  return await findbyId(id);
}

function findBookedTourById(id) {
  return db("bookedTours").where({ id }).first();
}

async function addBookedTour(bookedTour) {
  const [id] = await db("bookedTours").insert(bookedTour);

  return await findBookedTourById(id);
}
