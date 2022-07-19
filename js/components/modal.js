class Modal extends HTMLElement {
  connectedCallback () {
    this.innerHTML = `
      <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            
            <div class="modal-header">
                <i class="fa icon">&#xf07a;</i>
                <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>

                <tbody id="cartItems"></tbody>

                <tfoot id="cartFooter"></tfoot>
              </table>
            </div>
                                                                                                        
            <div class="modal-footer justify-content-between">
              <button class="btn btn-danger" id="cartBtnClean" type="button">Vaciar carrito</button>
              <button class="btn btn-success" type="button">Proceder a pagar</button>
            </div>
          </div>
        </div>
      </div>
    `
  }
}

customElements.define('modal-component', Modal)
