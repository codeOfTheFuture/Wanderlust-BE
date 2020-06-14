const router = require("express").Router();
const isAuthenticated = require("../auth/auth-middleware");

const Tours = require("../tours/tours-model");

// Get all tours
router.get("/", isAuthenticated, async (req, res) => {
  try {
    console.log("It's working");
    const tours = await Tours.find();

    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error`, error });
  }
});

// Add a tour
router.post("/", isAuthenticated, async (req, res) => {
  const tour = req.body,
    user_id = req.user.uid;

  tour.user_id = user_id;

  try {
    const addedTour = await Tours.add(tour);
    console.log("added", addedTour);

    res.status(201).json(addedTour);
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error`, error });
  }
});

// Tour booked by tourist
router.post("/:id/book-tour", async (req, res) => {
  const {
    params: { id },
  } = req;

  const touristId = req.user.subject;

  const bookedTour = { tour_id: id, tourist_id: touristId };

  try {
    const touristBooked = await Tours.addBookedTour(bookedTour);

    res.status(201).json(touristBooked);
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error`, error });
  }
});

module.exports = router;
