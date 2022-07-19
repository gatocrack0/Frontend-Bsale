class Section extends HTMLElement {
  connectedCallback () {
    this.innerHTML = `
      <section class="py-5">
        <div class="container px-4 px-lg-5 mt-5">
          <div class="d-flex justify-content-between">
            <div class="dropdown mb-3">
              <a class="btn btn-sm bg-color btn-secondary dropdown-toggle" href="#" role="button" id="" data-bs-toggle="dropdown" aria-expanded="false">
                Limitar resultados
              </a>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink" id="limitDropDown">
                <li><a class="dropdown-item" onclick="limitProducts(8)">8</a></li>
                <li><a class="dropdown-item" onclick="limitProducts(16)">16</a></li>
                <li><a class="dropdown-item" onclick="limitProducts(32)">32</a></li>
              </ul>
            </div>

            <div class="dropdown mb-3">
              <a class="btn btn-sm bg-color btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                Categorías
              </a>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink" id="categoriesDropDown">
                <li><a class="dropdown-item" id="allCategories">Todas</a></li>
                <li><hr class="dropdown-divider"></li>
              </ul>
            </div>
          </div>

          <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center" id="cardsContainer"></div>

          <nav class="pagination justify-content-center" id="paginationContainer" aria-label="Page navigation example"></nav>
        </div>
      </section>
    `
  }
}

customElements.define('section-component', Section)
