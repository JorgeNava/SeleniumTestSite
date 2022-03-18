import React, { useState, useEffect } from "react";
import './purchases.scss';
import axiosService from "../../helpers/axios";

export default function Purchases(props) {
    const [purchases, setPurchases] = useState(null);
    const axios = new axiosService()

    async function getUserPurchases() {
        const USER = JSON.parse(localStorage.getItem("User"));
        const REQ_URL = "/sales/get-many-by-buyer-id/" + USER.username;
        const RET_VAL = await axios.getData(REQ_URL);
        setPurchases(RET_VAL);
    }
    
    function renderTable() {
        if (!purchases) {        
            return (<tr>
                <td>Loading...</td>
            </tr>)
        } else {
            if ( purchases.length > 0) {
                return purchases.map((purchase, index) => {
                    return (
                        <tr key={index}>
                            <td>{ purchase.product.name }</td>
                            <td>{ purchase.product.size }</td>
                            <td>{ purchase.product.color }</td>
                            <td>{ purchase.product.quantity }</td>
                            <td>${ purchase.product.cost }</td>
                            <td>{ purchase.date }</td>
                            <td>{ purchase.deliveryAdress }</td>
                            <td>{ purchase.paymentMethodId }</td>
                            <td>${ purchase.subtotal.toFixed(2) }</td>
                            <td>${ purchase.total.toFixed(2) }</td>
                        </tr>
                    )
                });
            }
        }
    }

    useEffect(() => {
        getUserPurchases();
    }, []);

    return (
        <div className="tableContainer">
            <table>
                <tbody>
                    <tr>
                        <th>Product Name</th>
                        <th>Size</th>
                        <th>Color</th>
                        <th>Quantity</th>
                        <th>Cost</th>
                        <th>Purchase date</th>
                        <th>Delivery Adress</th>
                        <th>Payment Method</th>
                        <th>Subtotal</th>
                        <th>Total</th>
                    </tr>
                    {renderTable()}
                </tbody>
            </table>
        </div>
    );
}
