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

import MoreVertIcon from "@mui/icons-material/MoreVert";
// import illustration from "../pages/bb.jpg";
import axios from "axios";
import { Row, Col } from "reactstrap";
import { Fragment, useEffect, useState } from "react";
import { CardActions, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Qr from "./QRCODE"

const CardMeetup = () => {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/Event');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <div style={{ backgroundImage: `url(${D})`, backgroundSize: "100% auto"}}>
      <Row style={{marginLeft:40, width:2000}}>
        {users.map((item, index) => {
          return (
            <Col key={index} lg="3" md="6" sm="12" style={{margin:10}}>
              <Card sx={{ maxWidth: 500 }}>
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
                 image={"http://localhost:3600/images"+item.image}
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun
                    meal to cook together with your guests. Add 1 cup of frozen
                    peas along with the mussels, if you like.
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
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
      </Row></div>
    </Fragment>
  );
};
export default CardMeetup;
