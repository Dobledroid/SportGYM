import React, { useState, useEffect } from "react";
import Header from "../../Esquema/Header";
import Footer from "../../Esquema/Footer";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { baseURL } from '../../api.js';

const Carrito = () => {
  const [productos, setProductos] = useState([]);
  const [idItemAEliminar, setIdItemAEliminar] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalStyles = {
    modalTransparent: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)' // Fondo del modal transparente con opacidad
    }
  };

  useEffect(() => {
    const fetchCarrito = async () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (loggedIn) {
        const user = JSON.parse(localStorage.getItem('user'));
        try {
          const response = await fetch(`${baseURL}/carrito-compras/${user.ID_usuario}`);
          if (response.ok) {
            const data = await response.json();
            console.log(data)
            setProductos(data);
          } else {
            console.error("Error al cargar los productos del carrito");
          }
        } catch (error) {
          console.error("Error de red:", error);
        }
      } else {

      }
    };

    fetchCarrito();
  }, []);

  useEffect(() => {
    if (idItemAEliminar !== null) {
    }
  }, [idItemAEliminar]);

  useEffect(() => {
    if (productoAEliminar !== null) {
    }
  }, [productoAEliminar]);
  const handleDecrement = (ID_producto) => {
    setProductos(prevProductos => prevProductos.map(producto => {
      if (producto.ID_producto === ID_producto && producto.cantidad > 1) {
        return { ...producto, cantidad: producto.cantidad - 1 };
      }
      return producto;
    }));
  };

  const handleIncrement = (ID_producto) => {
    setProductos(prevProductos => prevProductos.map(producto => {
      if (producto.ID_producto === ID_producto) {
        return { ...producto, cantidad: producto.cantidad + 1 };
      }
      return producto;
    }));
  };

  const handleDeleteProduct = (ID_carrito, ID_producto) => {
    setIdItemAEliminar(ID_carrito);
    setProductoAEliminar(ID_producto);
    // console.log(productoAEliminar)
    // alert(productoAEliminar)
    setIsModalOpen(true)
  };

  const confirmarEliminacion = async () => {
    // console.log("carrito", idItemAEliminar, "prod", productoAEliminar)
    if (idItemAEliminar) {
      try {
        const response = await fetch(`${baseURL}/carrito-compras/${idItemAEliminar}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setProductos(prevProductos => prevProductos.filter(producto => producto.ID_producto !== productoAEliminar));
          setIdItemAEliminar(null);
          setProductoAEliminar(null);
          setIsModalOpen(false);
        } else {
          console.error('Error al eliminar el producto:', response.status);
        }
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
      }
    }
  };

  const cancelarEliminacion = () => {
    setProductoAEliminar(null);
    setIsModalOpen(false);
  };

  const validacionCarrito = () => {
    const cantidadExcedida = productos.some(producto => producto.cantidad > producto.existencias);
    const cantidadInvalida = productos.some(producto => producto.cantidad < 1);
    return !cantidadExcedida && !cantidadInvalida;
  };

  const handleUpdateCart = () => {
    if (validacionCarrito()) {
      console.log("Datos actuales del carrito:", productos);
      alert("Correcto");
    } else {
      console.log("No es posible actualizar por validaciones");
      alert("No es posible actualizar por validaciones");
    }
  };


  return (
    <>

      <Header />
      <section className="shoping-cart spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="shoping__cart__table">
                <table>
                  <thead>
                    <tr>
                      <th className="shoping__product">Productos</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map((producto) => (
                      <tr key={producto.ID_carrito}>
                        <td className="shoping__cart__item">
                          <img src={producto.imagenUrl} alt={producto.nombre} style={{ width: '81px', height: '90px' }} />
                          <h5>{producto.nombre.slice(0, 50)}...</h5>
                        </td>
                        <td className="shoping__cart__price">${producto.precioFinal}</td>
                        <td className="shoping__cart__quantity">
                          <div className="quantity">
                            <div className="pro-qty" style={{ userSelect: 'none' }}>
                              <span className="dec qtybtn" onClick={() => handleDecrement(producto.ID_producto)}> - </span>
                              <input type="text" value={producto.cantidad} readOnly />
                              <span className="inc qtybtn" onClick={() => handleIncrement(producto.ID_producto, producto.existencias)}> + </span>
                            </div>
                            {producto.cantidad <= 0 && <p style={{ color: 'red', userSelect: 'none' }}>La cantidad debe ser mayor a 0</p>}
                            {producto.cantidad > producto.existencias && <p style={{ color: 'red', userSelect: 'none' }}>No hay suficientes existencias</p>}
                          </div>
                        </td>
                        <td className="shoping__cart__total" style={{ userSelect: 'none' }}>${producto.precioFinal * producto.cantidad}</td>
                        <td className="shoping__cart__item__close">
                          <span className="icon_close" onClick={() => handleDeleteProduct(producto.ID_carrito, producto.ID_producto)}></span>
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="shoping__cart__btns">
                <button className="primary-btn cart-btn" style={{ border: 'none' }}>SEGUIR COMPRANDO</button>
                <button className="primary-btn cart-btn cart-btn-right" style={{ border: 'none' }} onClick={handleUpdateCart}>
                  <span className="icon_loading"></span> ACTUALIZACIÓN DE LA COMPRA
                </button>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="shoping__continue">
                <div className="shoping__discount">
                  <h5>Códigos de descuento</h5>
                  <form action="#">
                    <input type="text" placeholder="Ingrese su código de cupón" />
                    <button type="submit" className="site-btn">APLICAR CUPÓN</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="shoping__checkout">
                <h5>Total del carrito</h5>
                <ul>
                  {/* Aquí puedes calcular el subtotal y total del carrito */}
                </ul>
                <a href="#" className="primary-btn">PAGAR</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} style={modalStyles.modalTransparent}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar este producto del carrito?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelarEliminacion}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={confirmarEliminacion}>
            Sí, eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Carrito;
