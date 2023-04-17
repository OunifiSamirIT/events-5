const Event = require("../models/Event.models");
const ValidateUser = require("../validation/Users.validation");
// const AddEvents = async (req, res) => {
//   const { errors, isValid } = ValidateUser(req.body);
//   try {
//     if (!isValid) {
//       res.status(404).json(errors);
//     } else {
//       await Event.findOne({ Date: req.body.Date }).then(async (exist) => {
//         if (exist) {
//           errors.Email = "Date Exist";
//           res.status(404).json(errors);
//         } else {
//           await Event.create(req.body);
//           res.status(201).json({ message: "Event added with success" });
//         }
//       });
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// };


// const AddEvents = async (req, res) => {
 
//   const { Nom,Date,Artistes,Lien,Image } = req.body;

//   console.log(req.body.cv)
//   const verif = await Event.findOne({ Date });
//   if (verif) {
//       console.log("Event With the same Date already exists")
//       res.status(403).send({ error: "Event with the same Date already exists ! Please USe An Other Date" });
//   } else {
//       console.log("adedd Success")
//       const newEvent = new Event();
//       newEvent.Nom = Nom;
//       newEvent.Date = Date;
//       newEvent.Artistes = Artistes;
//       newEvent.Lien = Lien;
     
//       if (req.image) {

//           console.log(req.image.path);
//           let txt = req.image.path;
//           let nextTXT = txt.replace("uploads", "");
//           let last = nextTXT.replace("images", "");
           
          
//           newEvent.Image = last;
//       }
//       newEvent.save();
//       /*
//       Todo Notify all The users that there new Offer Published
//       */
//       res.status(201).send( newEvent);
//   }



// };
const path = require('path');


const AddEvents = async (req, res) => {
  const { Nom, Date, Artistes ,Lien} = req.body;
  
  // Create a new Event object with the provided data
  const event = new Event({
    Nom,
    Date,
    Artistes,Lien ,
    image: path.basename(req.file.path) // Get only the image name without directory path
  });

  // Save the event object to the database
  event.save(function (err) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(event);
  });
};
















const FindAllEvents = async (req, res) => {
  try {
    const data = await Event.find();
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

const FindSinglEvents = async (req, res) => {
  try {
    const data = await Event.findOne({ _id: req.params.id });
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

const UpdateEvents = async (req, res) => {
  const { errors, isValid } = ValidateUser(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      const data = await Event.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.status(201).json(data);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const DeleteEvents = async (req, res) => {
  try {
    await Event.deleteOne({ _id: req.params.id });
    res.status(201).json({ message: "Events deleted with success" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  AddEvents,
  FindAllEvents,
  FindSinglEvents,
  UpdateEvents,
  DeleteEvents,
};
