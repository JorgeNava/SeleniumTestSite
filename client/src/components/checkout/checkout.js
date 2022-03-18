import React, { useState } from "react";
import './checkout.scss';
import axiosService from "../../helpers/axios";
import { v4 as uuidv4 } from 'uuid';

export default function Home(props) {
    const [paymentMethod, setPaymentMethod] = useState({});
    const axios = new axiosService()

    async function savePaymentMethod() {
        const PURCHASED_DETAILS = JSON.parse(localStorage.getItem("purchasedDetails"));
        const USER = JSON.parse(localStorage.getItem("User"));

        const NEW_PURCHASED_DETAILS = {
            purchasedProductDetails: PURCHASED_DETAILS.purchasedProductDetails,
            product: PURCHASED_DETAILS.product,
            paymentMethod: paymentMethod
        }
        localStorage.setItem('purchasedDetails', JSON.stringify(NEW_PURCHASED_DETAILS))
        const SUBTOTAL = PURCHASED_DETAILS.product.cost * PURCHASED_DETAILS.purchasedProductDetails.quantity;
        const TOTAL = SUBTOTAL * 1.11;
        const NEW_PURCHASE_REGISTER = {
            internalId: "P-"+(uuidv4().substring(0,5)),
            buyerUsername: USER.username,
            paymentMethodId: NEW_PURCHASED_DETAILS.paymentMethod.paymentMethodIdentifier,
            product: {
                internalId : PURCHASED_DETAILS.product.internalId,
                name: PURCHASED_DETAILS.product.name,
                size: PURCHASED_DETAILS.purchasedProductDetails.size,
                color: PURCHASED_DETAILS.purchasedProductDetails.color,
                quantity: PURCHASED_DETAILS.purchasedProductDetails.quantity,
                cost: PURCHASED_DETAILS.product.cost,
            },
            deliveryAdress: PURCHASED_DETAILS.paymentMethod.adress,
            subtotal: SUBTOTAL,
            total: TOTAL
        }
        await axios.postData("/sales/save-one", NEW_PURCHASE_REGISTER);
        await axios.postData("/products/save-one", { internalId: NEW_PURCHASED_DETAILS.product.internalId, quantity: NEW_PURCHASED_DETAILS.product.quantity - NEW_PURCHASED_DETAILS.purchasedProductDetails.quantity })
        try {
            await axios.postData("/emai/send-one", { to: USER.email })
        } catch (error) {
            console.log('> Error sending message: ', error);
        }
        window.open("https://secure.payzen.eu/vads-payment/", "_blank");
        window.location.href = "/"
    }

    function renderPaymentMethodFields() {
        if (paymentMethod.hasOwnProperty("type")) {
            if (paymentMethod.type == "Paypal") {
                return (
                    <div>
                        <p className="formulario__submitpago">Numero de tarjeta</p>
                        <input className="formulario__submitpagox" type="email" name="signature" placeholder="Correo Paypal"
                            onChange={event => setPaymentMethod({
                                ...paymentMethod,
                                paymentMethodIdentifier: event.target.value
                            })}
                        />
                    </div>
                    )
            }else if(paymentMethod.type == "NONE") {
                return (
                    <div></div>
                )
            }else{
                return (
                    <div>
                        <p className="formulario__submitpago">Numero de tarjeta</p>
                        <input className="formulario__submitpagox" name="signature" placeholder="Numero de tarjeta"
                            onChange={event => setPaymentMethod({
                                ...paymentMethod,
                                paymentMethodIdentifier: event.target.value
                            })}
                        />
                        <input className="formulario__submitpagox" name="expirationDate" placeholder="Fecha de expirtacion"/>
                        <input className="formulario__submitpagox" name="pin" placeholder="PIN"/>
                    </div>
                )
            }
        }
        return (
            <div></div>
        ) 
    }

    return (
        <div>
            <p className="formulario__submitpago" >Metodo de Pago</p>
            <form >
                <select defaultValue="NONE" className="formulario__submitpagox" name="" id=""onChange={event => setPaymentMethod({
                    ...paymentMethod,
                    type: event.target.value
                })}>
                    <option value="NONE" disabled>--Metodos de Pago--</option>
                    <option value="Paypal">Paypal</option>
                    <option value="Credito">Tarjeta de Credito</option>
                    <option value="Debito">Debito</option>
                </select>
                <input className="formulario__submitpagox" name="parametre1" placeholder="Nombre"
                    onChange={event => setPaymentMethod({
                        ...paymentMethod,
                        ownerName: event.target.value
                    })}
                />
                <input className="formulario__submitpagox" name="parametre2" placeholder="Apellido"
                    onChange={event => setPaymentMethod({
                        ...paymentMethod,
                        ownerLastName: event.target.value
                    })}
                />
                <input className="formulario__submitpagox" name="parametre3" placeholder="Numero celular"
                    onChange={event => setPaymentMethod({
                        ...paymentMethod,
                        phone: event.target.value
                    })}
                />
                <input className="formulario__submitpagox" name="parametre4" placeholder="Dirección de envio"
                    onChange={event => setPaymentMethod({
                        ...paymentMethod,
                        adress: event.target.value
                    })}
                />
                {renderPaymentMethodFields()}
            </form>
            <button  className="formulario__submitpago submitButtonCheckout" onClick={savePaymentMethod} type="submit" name="payer" value="Pagar">Pagar</button>
        </div>
    );
}
