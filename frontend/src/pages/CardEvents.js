import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import Collapse from "@mui/material/Collapse";
import D from "./oo.png";
import { ShareDialog } from '@mui/material';

import MoreVertIcon from "@mui/icons-material/MoreVert";
// import illustration from "../pages/bb.jpg";
import axios from "axios";
import { Row, Col } from "reactstrap";
import { Fragment, useEffect, useState } from "react";
import { CardActions, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Qr from "./QRCODE";
import { FacebookShareButton } from 'react-share';

const CardMeetup = () => {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/Event");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const updateFavorit = async (id) => {
    try {
      const response = await axios.put(`/api/Eventfv/${id}`, {
        favorit: true,
      });
      fetchData(); // refetch the data to update the UI
    } catch (error) {
      console.error(error);
    }
  };
  const handleClick = () => {
    navigator.share({
      title: 'My Event',
      text: 'Check out this cool event!',
      url: 'https://example.com/my-event',
    });
  };
  


  const shareOnFacebook = (link) => {
    window.FB.ui(
      {
        method: 'share',
        href: link,
      },
      function(response) {
        console.log(response);
      }
    );
  };
  return (
    <Fragment>
      <div
        style={{ backgroundImage: `url(${D})`, backgroundSize: "100% auto" }}
      >
        <Row style={{ marginLeft: 10, width: 1500 }}>
          {users.map((item, index) => {
            return (
              <Col key={index} lg="3" md="8" sm="10" style={{ margin: 25 }}>
                <Card sx={{ maxWidth: 600 }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {item.Nom}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={item.Nom}
                    subheader={item.Date}
                  />

                  <CardMedia
                    component="img"
                    height="194"
                    image={`http://localhost:3600/uploads/images/${item.image}`} // Include the "uploads/images" directory path
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      This impressive paella is a perfect party dish and a fun
                      meal to cook together with your guests. Add 1 cup of
                      frozen peas along with the mussels, if you like.
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton
                      aria-label="add to favorites"
                      onClick={() => updateFavorit(item._id)}
                    >
                      <FavoriteIcon
                        color={item.favorit ? "error" : "inherit"}
                      />
                    </IconButton>
                    <IconButton aria-label="share" onClick={handleClick}>
                      <ShareIcon />
                    </IconButton>
                    <span className="badge bg-info">
                      {/* <Link to={`/Payment/${item._id}`} className="text-white">
                    <i className="fas fa-edit"></i>
                  </Link> */}
                      <Link to={`/Payment/${item._id}`} className="text-white">
                        <i className="fas fa-edit"></i>
                      </Link>
                    </span>
                  </CardActions>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </Fragment>
  );
};
export default CardMeetup;
