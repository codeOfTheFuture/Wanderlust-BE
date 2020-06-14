const db = require('../config/dbConfig');

module.exports = {
  findBookedTourById,
  addBookedTour,
};

function findBookedTourById(id) {
  return db('bookedTours')
    .where({ id })
    .first();
}

async function addBookedTour(bookedTour) {
  const [id] = await db('bookedTours').insert(bookedTour);

  return await findBookedTourById(id);
}
