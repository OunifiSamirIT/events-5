const express = require('express');
const {AddEvents,DeleteEvents,FindAllEvents,FindSinglEvents,UpdateEvents } = require('../controllers/Event.controller');
const router = express.Router()
const multer = require("multer");
const path = require("path");
const passport = require("passport");
const { ROLES, inRole } = require("../security/Rolemiddleware");

// Configure Multer storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads/images");
    },
    filename: (req, file, cb) => {
      const newFileName = (+new Date()).toString() + path.extname(file.originalname);
      // Return only the file name without the path
      cb(null, newFileName.split('/').pop());
    }
  });
  
  // Create Multer middleware for single file upload
  const upload = multer({ storage }).single("image");
  
  // Add event route with Multer middleware and authentication middleware
  router.post('/ADDEvent', passport.authenticate("jwt", { session: false }), upload, AddEvents);
  
 

/* add user */

// router.post('/ADDEvent', upload.single("image"),passport.authenticate("jwt", { session: false }),
// AddEvents); 

/* find all users */
router.get('/Event',passport.authenticate("jwt", { session: false }),FindAllEvents)

/* find single user */
router.get('/Event/:id', FindSinglEvents)

/* add user */
router.put('/Event/:id', UpdateEvents)

/* add user */
router.delete('/Event/:id', DeleteEvents)

module.exports = router;