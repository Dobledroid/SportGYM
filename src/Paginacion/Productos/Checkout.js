import React from 'react';
import Header from "../../Esquema/Header";
import Footer from "../../Esquema/Footer";

const Checkout = () => {
  return (
    <>
      <Header />
      <section class="checkout spad">
        <div class="container">
          <div class="checkout__form">
            <h4>Detalles de facturación</h4>
            <form action="#">
              <div class="row">
                <div class="col-lg-8 col-md-6">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="checkout__input">
                        <p>Nombre<span>*</span></p>
                        <input type="text" />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="checkout__input">
                        <p>Apellidos<span>*</span></p>
                        <input type="text" />
                      </div>
                    </div>
                  </div>
                  <div class="checkout__input">
                    <p>País<span>*</span></p>
                    <input type="text" />
                  </div>
                  <div class="checkout__input">
                    <p>Dirección<span>*</span></p>
                    <input type="text" placeholder="Dirección" class="checkout__input__add" />
                      <input type="text" placeholder="Apartamento, suite, etc... (opcional)" />
                      </div>
                      <div class="checkout__input">
                        <p>Ciudad<span>*</span></p>
                        <input type="text" />
                      </div>
                      <div class="checkout__input">
                        <p>Estado<span>*</span></p>
                        <input type="text" />
                      </div>
                      <div class="checkout__input">
                        <p>Código postal<span>*</span></p>
                        <input type="text" />
                      </div>
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="checkout__input">
                            <p>Teléfono<span>*</span></p>
                            <input type="text" />
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="checkout__input">
                            <p>Correo electrónico<span>*</span></p>
                            <input type="text" />
                          </div>
                        </div>
                      </div>
                      <div class="checkout__input__checkbox">
                        <label for="diff-acc">
                        ¿Envia a una direccion diferente?
                          <input type="checkbox" id="diff-acc" />
                            <span class="checkmark"></span>
                        </label>
                      </div>
                      <div class="checkout__input">
                        <p>Pedidos<span>*</span></p>
                        <input type="text"
                          placeholder="Notas sobre su pedido, por ejemplo, notas especiales de entrega." />
                      </div>
                  </div>
                  <div class="col-lg-4 col-md-6">
                    <div class="checkout__order">
                      <h4>Su pedido</h4>
                      <div class="checkout__order__products">Productos <span>Total</span></div>
                      <ul>
                        <li>Vegetable’s Package <span>$75.99</span></li>
                        <li>Fresh Vegetable <span>$151.99</span></li>
                        <li>Organic Bananas <span>$53.99</span></li>
                      </ul>
                      <div class="checkout__order__subtotal">Subtotal <span>$750.99</span></div>
                      <div class="checkout__order__total">Total <span>$750.99</span></div>

                      <div class="checkout__input__checkbox">
                        <label for="payment">
                          Check Payment
                          <input type="checkbox" id="payment" />
                            <span class="checkmark"></span>
                        </label>
                      </div>
                      <div class="checkout__input__checkbox">
                        <label for="paypal">
                          Paypal
                          <input type="checkbox" id="paypal" />
                            <span class="checkmark"></span>
                        </label>
                      </div>
                      <button type="submit" class="site-btn">REALIZAR PEDIDO</button>
                    </div>
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

export default Checkout;
