require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Participant = require("./models/Participant");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");

const Team = require("./models/Team");

mongoose
  .connect(process.env.MONGO_URI)
  .catch((error) => {
    console.log("Connection to database failed:", error);
  })
  .then(() => {
    console.log("Successfully connected to database");
  });

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.post(
  "/register",
  [
    check("firstName", "First name is required!").not().isEmpty(),
    check("lastName", "Last name is required!").not().isEmpty(),
    check("email", "Invalid email").isEmail().not().isEmpty(),
    check("phone", "Phone number is required!").not().isEmpty(),
    check("university", "University is required!").not().isEmpty(),
    check("major", "Major is required!").not().isEmpty(),
    check("level", "Level is required!").not().isEmpty(),
    check("isPresenting").optional().isBoolean(),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ err: true, errors: errors.array() });
      }

      const {
        firstName,
        lastName,
        email,
        phone,
        university,
        major,
        level,
        isPresenting,
        presentationTitle,
        presentationDescription,
      } = req.body;

      if (isPresenting && (!presentationDescription || !presentationTitle)) {
        return res.status(400).json({
          err: true,
          errors: [
            {
              msg: "When the participant is a presenter, presentationDescription and presentationTitle must be provided",
            },
          ],
        });
      }

      const exists = await Participant.findOne({ email }).exec();
      if (exists)
        return res
          .status(409)
          .json({ err: true, errors: [{ msg: "Email already registered!" }] });

      const newParticipant = new Participant({
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        email: email.toLowerCase(),
        phone,
        university,
        major,
        level,
        isPresenting: isPresenting || false,
        presentationTitle: presentationTitle || "",
        presentationDescription: presentationDescription || "",
      });

      const result = await newParticipant.save();
      return res
        .status(200)
        .json({ err: false, msg: "Successfully registered!", result });
    } catch (err) {
      console.log("Something went wrong: " + err.message);
      return res
        .status(500)
        .json({ err: true, errors: [{ msg: "Something went wrong!" }] });
    }
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
