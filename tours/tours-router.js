const router = require("express").Router();
const isAuthenticated = require("../auth/auth-middleware");

const Tours = require("../tours/tours-model");

// Get all tours
router.get("/", async (req, res) => {
  try {
    console.log("It's working");
    const tours = await Tours.find();

    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error`, error });
  }
});

// Get a tour by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("id: ", id);
  try {
    const tour = await Tours.findbyId(id);

    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
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

// Update a tour by id
router.put("/:id", isAuthenticated, async (req, res) => {
  const {
      params: { id },
    } = req,
    changes = req.body;
  console.log("Update params id >>>", id);
  console.log("Update changes body >>>", changes);

  try {
    const tour = await Tours.findbyId(id);
    console.log(tour);
    if (tour) {
      const updatedTour = await Tours.updateTourById(id, changes);
      console.log("updated tour >>>>>>>", updatedTour);
      res.status(200).json(updatedTour);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// Delete a tour by id
router.delete("/:id", async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const tour = await Tours.findbyId(id);
  } catch (error) {
    res.status(404).json({ message: "tour not found" });
  }

  try {
    await Tours.deleteTour(id);
    res.status(200).json({ message: "Tour successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
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
