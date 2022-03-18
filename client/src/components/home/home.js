import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './home.scss';
import axiosService from "../../helpers/axios";

export default function Home(props){
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState({
    type: "None",
    category: "None"
  })
  const axios = new axiosService()

  async function getProductsData() {
    //const REQ_URL = "/products/get-many-by-type?type=Clothe"
    const REQ_URL = "/products/get-many-by-filters/" + filters.type + "/" + filters.category;
    setProducts(await axios.getData(REQ_URL))
  }

  function renderLoading() {
    if (products.length === 0) {
      return <h1>LOADING...</h1>
    } else {
      return (products.map((product, index) => {
        const URL = `/products/${product.internalId}`;
        return (
          <div className="producto" key={index}>
            <Link to={URL}>
              <img
                className="producto__imagen"
                src={require("../../img/" + product.imageUrl + ".jpg")}
                alt="imagen camisa"
              ></img>
              <div className="producto__informacion">
                <p className="producto__nombre">{product.name}</p>
                <p className="producto__precio">${product.cost}</p>
              </div>
            </Link>
          </div>
        )
      })
      )
    }
  }

  useEffect(() => {
    getProductsData();
  }, [filters]); 


  return (
    <div>
      <nav className="navegacion">
        <select
          defaultValue="0"
          name="OS"
          className="navegacion__enlace navegacion__enlace--activo"
          onChange={event => setFilters({
            ...filters,
            type: event.target.value
          })}
        >
          <option value="None"> Tipos de Articulos </option>
          <option value="Clothe">Ropa</option>
          <option value="Figures">Figuras</option>
          <option value="Collectables">Coleccionables</option>
        </select>
        <select
          defaultValue="0"
          name="OS"
          className="navegacion__enlace navegacion__enlace--activo"
          onChange={event => setFilters({
            ...filters,
            category: event.target.value
          })}
        >
          <option value="None"> Categorias </option>
          <option value="Movies">Peliculas</option>
          <option value="Series">Series</option>
          <option value="Anime">Anime</option>
          <option value="Videogames">Videojuegos</option>
        </select>
      </nav>

      <main className="contenedor">
        <h1>Nuestros Productos</h1>
        <div className="grid productsContainer">
          {renderLoading()}
        </div>
      </main>
      </div>
    )
}
