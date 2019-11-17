const db = require('../config/dbConfig');

module.exports = {
  findGuides,
  findGuideBy,
  addGuide,
  findGuideById,
  findTouristBy,
};

function findGuides() {
  return db('guides').select(
    'id',
    'username',
    'isTourGuide',
    'email',
    'firstname',
    'lastname',
    'phonenumber',
  );
}

function findGuideBy(filter) {
  return db('guides')
    .where(filter)
    .first();
}

async function addGuide(guide) {
  const [id] = await db('guides').insert(guide);

  return await findGuideById(id).select(
    'id',
    'username',
    'isTourGuide',
    'email',
    'firstname',
    'lastname',
    'phonenumber',
  );
}

function findGuideById(id) {
  return db('guides')
    .where({ id })
    .first();
}

function findTouristBy(filter) {
  return db('tourists').where(filter);
}
