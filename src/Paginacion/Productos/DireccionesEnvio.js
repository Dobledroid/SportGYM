import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Esquema/Header.js";
import Footer from "../../Esquema/Footer.js";
import { baseURL } from '../../api.js';

const DireccionesEnvio = () => {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [pais, setPais] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [estado, setEstado] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [referencias, setReferencias] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseURL}/direccion-envio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre,
          apellidos,
          pais,
          direccion,
          ciudad,
          estado,
          codigoPostal,
          telefono,
          correoElectronico,
          referencias
        })
      });

      if (response.ok) {
        alert("Dirección de envío guardada exitosamente.");
        navigate("/checkout"); // Redireccionar al checkout u otra página
      } else {
        alert("Error al guardar la dirección de envío.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar la dirección de envío. Por favor, intenta nuevamente.");
    }
  };

  return (
    <>
      <Header />
      <section class="checkout spad">
        <div class="container">
          <div class="checkout__form">
            <h4>Detalles de envio</h4>
            <form onSubmit={handleSubmit}>
              <div class="row">
                <div>
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="checkout__input">
                        <p>Nombre<span>*</span></p>
                        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="checkout__input">
                        <p>Apellidos<span>*</span></p>
                        <input type="text" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
                      </div>
                    </div>
                  </div>
                  <div class="checkout__input">
                    <p>País<span>*</span></p>
                    <input type="text" value={pais} onChange={(e) => setPais(e.target.value)} required />
                  </div>
                  <div class="checkout__input">
                    <p>Dirección<span>*</span></p>
                    <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} required placeholder="Dirección" class="checkout__input__add" />
                  </div>
                  <div class="checkout__input">
                    <p>Ciudad<span>*</span></p>
                    <input type="text" value={ciudad} onChange={(e) => setCiudad(e.target.value)} required />
                  </div>
                  <div class="checkout__input">
                    <p>Estado<span>*</span></p>
                    <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} required />
                  </div>
                  <div class="checkout__input">
                    <p>Código postal<span>*</span></p>
                    <input type="text" value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} required />
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="checkout__input">
                        <p>Teléfono<span>*</span></p>
                        <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="checkout__input">
                        <p>Correo electrónico<span>*</span></p>
                        <input type="text" value={correoElectronico} onChange={(e) => setCorreoElectronico(e.target.value)} required />
                      </div>
                    </div>
                  </div>
                  <div class="checkout__input">
                    <p>Pedidos<span>*</span></p>
                    <input type="text"
                      placeholder="Notas sobre su pedido, por ejemplo, notas especiales de entrega."
                      value={referencias} onChange={(e) => setReferencias(e.target.value)} required />
                  </div>
                  <button type="submit" class="site-btn">Guardar dirreción de envio</button>
                </div>
                
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default DireccionesEnvio;
