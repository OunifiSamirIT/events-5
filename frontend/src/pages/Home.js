import React, { useEffect, useState } from "react";
import InputGroup from "../components/AkremComponents/InputGroupEvent";
import RowDetails from "../components/AkremComponents/RowDetailsEvent";
import axios from "axios";
import Alert from "../components/AkremComponents/Alert";
import { Button, Input } from "reactstrap";
import { AddEvents, GetEvents } from "../redux/actions/eventActions";
import { useDispatch, useSelector } from "react-redux";
import "./akremeventCss.css";
import { Table, Row, Col } from "reactstrap";
import S from "./dd.png";
import D from "./oo.png";
import { height } from "@mui/system";
import { Clock } from "react-feather";

function Home() {
  const [users, setUsers] = useState([]);
  //const [form, setForm] = useState([]);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const errorsss = useSelector((state) => state.errors);
  const events = useSelector((state) => state.events);
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("/api/Event", form)
      .then((res) => {
        setMessage(res.data.message);
        /* hide form after save */
        setForm({});
        /* hide errors after save */
        setErrors({});
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 4000);
      })
      .catch((err) => setErrors(err.response.data));
  };

  //////////////////////////////////////////////////////////

  const [selectedFile, setSelectedFile] = useState(null);
  const [form, setForm] = useState({});
  const create = (event) => {
    event.preventDefault();
    window.location.reload();
    
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("Nom", form.Nom);
    formData.append("Date", form.Date);
    formData.append("Artistes", form.Artistes);
    formData.append("Lien", form.Lien);
  
    dispatch(AddEvents(formData, setShow, setMessage));
  };
  const handleChange = (event) => {
    const { value } = event.target;
    console.log(event);
    setForm({
      ...form,
      Nom: value,
    });
  };

  const handleDateChange = (event) => {
    const { value } = event.target;
    console.log(event);
    setForm({
      ...form,
      Date: value,
    });
  };

  const handleArtistesChange = (event) => {
    const { value } = event.target;
    console.log(event);
    setForm({
      ...form,
      Artistes: value,
    });
  };

  const handleLienChange = (event) => {
    const { value } = event.target;
    console.log(event);
    setForm({
      ...form,
      Lien: value,
    });
  };

  ////////////////////////////////////////

  /* delete */
  const OnDelete = (id__) => {
    if (window.confirm("are you sure to delete this user")) {
      axios.delete(`/api/Event/${id__}`).then((res) => {
        dispatch(GetEvents());
        setMessage(res.data.message);
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 4000);
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      await dispatch(GetEvents());
    }
    fetchData();
  }, []);

  const loadEvents = async () => {
    await axios.get("/api/Event").then((res) => {
      setUsers(res.data);
    });
  };


  const handlePrint = () => {
    const printContents = document.getElementById("zone-to-print").innerHTML;
    const originalContents = document.body.innerHTML;
    const mediaQuery = "print";
  
    document.body.innerHTML = printContents;
  
    window.print();
  
    document.body.innerHTML = originalContents;
  }
  return (
    <div className="row p-4" style={{marginLeft:150, backgroundImage: `url(${D})`, backgroundSize: "100% auto"}} >
      
      <Alert message={message} show={show} />
     
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      > <Col style={{xs:"3"}}><h1 style={{marginLeft:100,width:150,borderRadius:30,textAlign:"center", boxShadow:'1px 20px 9px #290815'}}>Events</h1>   <img style={{marginLeft:95,marginTop:70  }}  src={S} alt=""/> </Col>
     <Col style={{width:50,xs:"4"}}>   <div  style={{width:750,marginRight:750,padding:20,borderRadius:30, marginBottom:20,boxShadow:'10px 5px 14px #290815'}}>
     
          <h5>Nom</h5>
          <Input
            value={form.Nom}
            onChange={handleChange}
            id="titre"
            type="text"
            placeholder="nom"
          />

          <h5>Date</h5>
          <Input
            value={form.Date}
            onChange={handleDateChange}
            id="desc"
            type="text"
            placeholder="date"
          />

          <h5>Artistes</h5>
          <Input
            value={form.Artistes}
            onChange={handleArtistesChange}
            id="desc"
            type="text"
            placeholder="artist"
          />
          <h5>Lien</h5>
          <Input
            value={form.Lien}
            onChange={handleLienChange}
            id="desc"
            type="text"
            placeholder="lien"
          />
          <h5>Image</h5>
          <div class="ta-left mT10">
          <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />

          </div>

          <button className="button-62" onClick={create} type="submit">
            Add Events
          </button>
           </div> </Col> 
      </Row>
      {/* <Button
        
        style={{
          width:"20%",
          marginLeft: 130,
          marginTop: "50px",
          borderRadius: "10px",
          background: "lightgray",
        }}
        icon={<Clock />}
        onClick={() => (typeof window !== "undefined" ? window.print() : null)}
      >
        <b>export PDF</b>
      </Button> */}
      <Button style={{
          width:"20%",
          marginLeft: 130,
          marginTop: "50px",
          borderRadius: "10px",
          background: "black",
        }} onClick={handlePrint}>Print </Button>
      <div className="col-12 col-lg-7"  style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center", marginLeft:120,width:1400, borderRadius:50,
          borderRadius:30
          }}    id="zone-to-print">
        <Table
          dark
          responsive
         
        >
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Date</th>
              <th scope="col">Artistes</th>
              <th scope="col">Lien</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.events.map(({ Nom, Date, Artistes, Lien, _id }) => (
              <RowDetails
                Nom={Nom}
                Date={Date}
                Artistes={Artistes}
                Lien={Lien}
                Id={_id}
                OnDelete={OnDelete}
              />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Home;
