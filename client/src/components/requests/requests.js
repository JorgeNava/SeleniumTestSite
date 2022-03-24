import React, { useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import axiosService from "../../helpers/axios";
import './requests.scss';

export default function Requests(props) {
    const [request, setRequest] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [requestStatus, setRequestStatus] = useState(null);
    const { internalId } = useParams();
    const axios = new axiosService()
    
    useEffect(() => {
        getRequestData();
    }, [submitted]); 

    async function getRequestData() {
        setRequest(await axios.getData("/requests/get-one-by-internal-id/" + internalId))
    }

    async function updateRequestStatus() {
        const NEW_REQUEST = request;
        NEW_REQUEST.status = requestStatus;
        setRequest(NEW_REQUEST);
        console.log('NEW_REQUEST', NEW_REQUEST);
        setSubmitted(!submitted);
        await axios.postData("/requests/update-one", NEW_REQUEST);
    }

    function renderRequestDetails() {
        if (request != null) {
            return (
                <div className="detailsContainer">
                    <div>
                        <div>{request.internalId}</div>
                        <div>{request.status}</div>
                        <div>{request.username}</div>
                        <div>{request.category}</div>
                        <div>{request.service}</div>
                        <div>{request.location}</div>
                        <div>{request.schedule}</div>
                        <div>{request.description}</div>
                    </div>
                    <div>
                        <select
                            defaultValue={request.status}
                            className="navegacion__enlace navegacion__enlace--activo"
                            onChange={event => setRequestStatus(event.target.value)}
                        >
                            <option value="Requestesd">Requested</option>
                            <option value="In process">In process</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <button onClick={updateRequestStatus}>UPDATE</button>
                    </div>
                </div>
            )
        } else {
            return (<h1>Loading...</h1>)
        }
    }

    return (
        <div>
            <nav className="navegacion">
                <Link className="navegacion__enlace navegacion__enlace--activo" to="/home">Home</Link>
            </nav>

            <main className="contenedor">
                <h1>REQUEST {internalId}</h1>
                {renderRequestDetails()}
            </main>
        </div>     
    );
}
