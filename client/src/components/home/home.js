import React, { useState, useEffect } from "react";
import './home.scss';
import axiosService from "../../helpers/axios";
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Home(props) {
  const axiosHelper = new axiosService()
  const navigate = useNavigate();
  const USER = JSON.parse(localStorage.getItem("User"));

  const [selectedItem, setSelectedItem] = useState(null);
  const [category, setCategory] = useState("General");
  const [service, setService] = useState(null);
  const [location, setLocation] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [description, setDescription] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [userRequests, setUsersRequests] = useState([]);
  const [allRequests, setAllRequests] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const USERNAME = USER.username;

    const REQUEST_DATA = {
      internalId: "R-" + (uuidv4().substring(0, 5)),
      username: USERNAME,
      category: category,
      service: service,
      location: location,
      schedule: schedule,
      description: description,
      status: "Requested"
    }
    console.log('REQUEST DATA: ', REQUEST_DATA);
    const config = {
      url: 'http://localhost:3002/servicesRequest/save-one',
      method: 'POST',
      data: REQUEST_DATA
    };
    axios(config)
      .then((resp) => {
        setIsSubmitted(true);
        console.log("RESPONSE: ", resp)
      })
      .catch(function (error) {
        console.log("Error: ", error);
      });
  };
  
  async function getUserRequests() {
    const REQ_URL = "/servicesRequest/get-many-by-username/" + USER.username;
    const RET_VAL = await axiosHelper.getData(REQ_URL);
    setUsersRequests(RET_VAL)
  }

  async function getAllRequests() {
    const REQ_URL = "/servicesRequest/get-all";
    const RET_VAL = await axiosHelper.getData(REQ_URL);
    setAllRequests(RET_VAL)
  }

  useEffect(() => {
    getUserRequests();
  }, [selectedItem]); 

  useEffect(() => {
    getAllRequests();
  }, []); 

  function renderServicesOptions() {
    console.log('CATEGORY', category);
    if (category === "General") {
      return (
        <select
          defaultValue="----"
          className="navegacion__enlace navegacion__enlace--activo"
          onChange={event => setService(event.target.value)}
          required
          >
          <option value="----">----</option>
          <option value="Network">Network</option>
          <option value="Software installation">Software installation</option>
          <option value="Data backup">Data backup</option>
          </select>
      )
    } else if (category === "Failure") {
      return (
        <select
          defaultValue="----"
          className="navegacion__enlace navegacion__enlace--activo"
          onChange={event => setService(event.target.value)}
          required
          >
            <option value="----">----</option>
            <option value="Mobile">Mobile</option>
            <option value="System">System</option>
            <option value="Computer equipment">Computer equipment</option>
            </select>
      )
    } else if (category === "Other") {
      return (
        <select
          defaultValue="----"
          className="navegacion__enlace navegacion__enlace--activo"
          onChange={event => setService(event.target.value)}
          required
          >
          <option value="----">----</option>
          <option value="Data reoirt">Data report</option>
          <option value="Password change">Password change</option>
          <option value="Equipment adquisition">Equipment adquisition</option>
        </select>
      )
    }
  }

  function renderServiceRequest() {
    if (selectedItem === "generate") {
      return (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Category </label>
              <select
                  defaultValue="General"
                  className="navegacion__enlace navegacion__enlace--activo"
                  onChange={event => setCategory(event.target.value)}
                  required
              >
                  <option value="General">General</option>
                  <option value="Failure">Failure</option>
                  <option value="Other">Other</option>
              </select>
            </div>
            <div className="input-container">
              <label>Service</label>
                  {renderServicesOptions()}
            </div>
            <div className="input-container">
              <label>Location</label>
              <input type="text" name="location" required onChange={event => setLocation(event.target.value)} />
            </div>
            <div className="input-container">
              <label>Schedule</label>
              <input type="text" name="schedule" required onChange={event => setSchedule(event.target.value)} />
            </div>
            <div className="input-container">
              <label>Description</label>
              <input type="text" name="description" required onChange={event => setDescription(event.target.value)} />
            </div>

            <div className="button-container">
              <input type="submit" />
            </div>
          </form>
        </div>
      )
    } else if (selectedItem === "show") {
      if (userRequests.length === 0) {
        return <h1>LOADING...</h1>
      } else {
        return (userRequests.map((request, index) => {
          return (
            <div key={index}>
              <p>{request.internalId}</p>
              <p>{request.status}</p>
              <p>{request.category}</p>
              <p>{request.service}</p>
              <p>{request.location}</p>
              <p>{request.schedule}</p>
              <p>{request.description}</p>
            </div>
          )
        })
        )
      }
    } else if (selectedItem === "exit") {
      //localStorage.removeItem('User');
      navigate('/')
    } else {
      return (<div></div>)
    }
  }

  function exitApp() {
    localStorage.removeItem('User');
    navigate('/')
  }

  function renderAdminRequests() {
    if (allRequests.length === 0) {
      return <h1>LOADING...</h1>
    } else {
      return (allRequests.map((request, index) => {
        const URL = `/request/${request.internalId}`;
        return (
          <div className="request" key={index}>
            <Link to={URL}>
              <p>{request.internalId}</p>
              <p>{request.username}</p>
              <p>{request.status}</p>
            </Link>
          </div>
        )
      })
      )
    }
  }

  return (
    <div>
      <main className="contenedor">
        <h1>Services Operations</h1>
        {
          USER.username === "admin" ?
            (<div>
              <h1>REQUESTS</h1>
              <p onClick={exitApp} className="homeListItem">Logout</p>
              {renderAdminRequests()}
            </div>) :
          ( <div>
            <ul className="homeNav">
              <li onClick={() => { setSelectedItem("generate") }} className="homeListItem">Request Service</li>
              <li onClick={() => { setSelectedItem("show") }} className="homeListItem">Show requests</li>
              <li onClick={() => { setSelectedItem("exit") }} className="homeListItem">Logout</li>
            </ul>
            {renderServiceRequest()}
          </div>)
        }
      </main>
    </div>
  )
}
