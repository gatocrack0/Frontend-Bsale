class Nav extends HTMLElement {
  connectedCallback () {
    this.innerHTML = `
      <nav class="navbar navbar-expand-lg navbar-light bg-color fixed-top">
        <div class="container px-lg-5">

          <a class="navbar-brand navbar-brand-color" href="index.html">Bsale - Shop</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
                
          <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <form class="d-flex" id="searchForm">
              <input class="form-control me-2" id="searchInput" type="search" placeholder="Buscar producto..." aria-label="Search" autocomplete="off">
              <button class="btn btn-outline-light" type="submit">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>

          <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <form class="d-flex">
              <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#modal">
                <i class="fa icon">&#xf07a;</i>
                <span class="badge" id="lblCartCount">0</span>
              </button>
            </form>
          </div>

        </div>
      </nav>
    `
  }
}

customElements.define('nav-component', Nav)
