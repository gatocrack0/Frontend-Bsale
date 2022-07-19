const host = 'http://localhost:8080'
const fragment = document.createDocumentFragment()
let cart = {}
let categoryId = null
let searchValue = ''

/*
* Html References
*/

/* Nav */
const searchForm = document.getElementById('searchForm')
const searchInput = document.getElementById('searchInput')
const lblCartCount = document.getElementById('lblCartCount')

/* Modal */
const cartItems = document.getElementById('cartItems')
const cartTemplate = document.getElementById('cartTemplate').content
const cartId = cartTemplate.getElementById('cartId')
const cartName = cartTemplate.getElementById('cartName')
const cartPrice = cartTemplate.getElementById('cartPrice')
const cartBtn1 = cartTemplate.getElementById('cartBtn1')
const cartQuantity = cartTemplate.getElementById('cartQuantity')
const cartBtn2 = cartTemplate.getElementById('cartBtn2')
const cartTotal = cartTemplate.getElementById('cartTotal')

const cartFooter = document.getElementById('cartFooter')
const cartFooterTemplate = document.getElementById('cartFooterTemplate').content
const cartFooterTotalQuantity = cartFooterTemplate.getElementById('cartFooterTotalQuantity')
const cartFooterTotalPrice = cartFooterTemplate.getElementById('cartFooterTotalPrice')
const cartBtnClean = document.getElementById('cartBtnClean')

/* Section */
// Dropdown Categories
const categoriesDropDown = document.getElementById('categoriesDropDown')
const allCategories = document.getElementById('allCategories')
// Cards
const cardsContainer = document.getElementById('cardsContainer')
const cardTemplate = document.getElementById('cardTemplate').content
const cardImage = cardTemplate.getElementById('cardImage')
const cardName = cardTemplate.getElementById('cardName')
const cardPriceLbl = cardTemplate.getElementById('cardPriceLbl')
const cardPriceDiscountLbl = cardTemplate.getElementById('cardPriceDiscountLbl')
const cardBtn = cardTemplate.getElementById('cardBtn')
// Pagination
const paginationContainer = document.getElementById('paginationContainer')
const paginationTemplate = document.getElementById('paginationTemplate').content

/*
* End Html References
*/

document.addEventListener('DOMContentLoaded', async () => {
  await getProducts()
  await getCategories()
})

const getProducts = async (page = 1, limit = 8) => {
  try {
    cardsContainer.innerHTML = ''
    const resp = await fetch(`${host}/api/products?limit=${limit}&page=${page}`)
    const { data } = await resp.json()
    generateCards(data.products)
    generatePages(data.totalPages, limit)
  } catch (error) {
    console.log(error)
  }
}

const generateCards = (products) => {
  products.forEach(product => {
    const newPrice = Math.ceil(product.price * (100 - product.discount) / 100)
    product.url_image
      ? cardImage.setAttribute('src', product.url_image)
      : cardImage.setAttribute('src', './assets/img/no-image.png')
    cardImage.setAttribute('alt', product.name)
    cardName.textContent = product.name
    cardPriceLbl.textContent = `$${product.price}`
    if (product.discount !== 0) {
      cardPriceLbl.classList.add('text-decoration-line-through')
      cardPriceDiscountLbl.textContent = `Nuevo precio: $${newPrice}`
      cardPriceDiscountLbl.classList.add('bg-color')
      cardPriceDiscountLbl.style.cssText = 'color:white;'
    } else {
      cardPriceLbl.classList = ''
      cardPriceDiscountLbl.textContent = ''
    }
    cardBtn.dataset.id = product.id
    cardBtn.dataset.name = product.name
    cardBtn.dataset.price = newPrice
    cardBtn.dataset.discount = product.discount

    const node = cardTemplate.cloneNode(true)
    fragment.appendChild(node)
  })
  cardsContainer.appendChild(fragment)
}

const getCategories = async () => {
  try {
    const resp = await fetch(`${host}/api/categories`)
    const { data } = await resp.json()
    generateCategories(data.categories)
  } catch (error) {
    console.log(error)
  }
}

const generateCategories = (categories) => {
  categories.forEach(category => {
    const liDropDown = document.createElement('li')
    const aDropDown = document.createElement('a')
    aDropDown.classList.add('dropdown-item')
    aDropDown.innerText = category.name.toUpperCase()
    liDropDown.appendChild(aDropDown)
    liDropDown.addEventListener('click', async () => {
      searchInput.value = ''
      categoryId = category.id
      await getProductsByIdCategory(category.id)
    })
    categoriesDropDown.appendChild(liDropDown)
  })
}

const getProductsByIdCategory = async (categoryId, page = 1, limit = 8) => {
  try {
    cardsContainer.innerHTML = ''
    const resp = await fetch(`${host}/api/products/filter/${categoryId}?page=${page}&limit=${limit}`)
    const { data } = await resp.json()
    generateCards(data.products)
    generatePages(data.totalPages, limit)
  } catch (error) {
    console.log(error)
  }
}

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  const searchInputValue = searchInput.value
  searchInputValue ? await searchProducts(searchInputValue, 1, 8) : await getProducts()
})

const searchProducts = async (value, page = 1, limit = 8) => {
  searchValue = value
  try {
    cardsContainer.innerHTML = ''
    const resp = await fetch(`${host}/api/products/find/${value}?page=${page}&limit=${limit}`)
    const { data } = await resp.json()
    generateCards(data.products)
    generatePages(data.totalPages, limit, value)
  } catch (error) {
    console.log(error)
  }
}

cardsContainer.addEventListener('click', (e) => {
  if (e.target.id === 'cardBtn') {
    const cardBtnDataset = e.target.dataset
    const product = {
      id: cardBtnDataset.id,
      name: cardBtnDataset.name,
      price: cardBtnDataset.price,
      quantity: 1
    }
    if (Object.prototype.hasOwnProperty.call(cart, product.id)) product.quantity = cart[product.id].quantity + 1
    cart[product.id] = product
    generateCart()
  }
})

const generateCart = () => {
  cartItems.innerHTML = ''
  Object.values(cart).forEach(product => {
    cartId.textContent = product.id
    cartName.textContent = product.name
    cartPrice.textContent = `$${product.price}`
    cartBtn1.dataset.id = product.id
    cartQuantity.textContent = product.quantity
    cartBtn2.dataset.id = product.id
    cartTotal.textContent = `$${product.price * product.quantity}`

    const node = cartTemplate.cloneNode(true)
    fragment.appendChild(node)
  })
  cartItems.appendChild(fragment)
  generateCartFooter()
}

const generateCartFooter = () => {
  cartFooter.innerHTML = ''
  const cartTotalQuantity = Object.values(cart).reduce((acc, { quantity }) => acc + quantity, 0)
  lblCartCount.textContent = cartTotalQuantity
  cartFooterTotalQuantity.textContent = cartTotalQuantity
  if (cartTotalQuantity === 0) cartFooter.style.display = 'none'
  const cartTotalPrice = Object.values(cart).reduce((acc, { quantity, price }) => acc + (quantity * price), 0)
  cartFooterTotalPrice.textContent = `$${cartTotalPrice}`

  const clone = cartFooterTemplate.cloneNode(true)
  fragment.appendChild(clone)
  cartFooter.appendChild(fragment)
}

cartItems.addEventListener('click', (e) => {
  if (e.target.id === 'cartBtn1') {
    const product = cart[e.target.dataset.id]
    product.quantity--
    if (product.quantity === 0) delete cart[e.target.dataset.id]
  }
  if (e.target.id === 'cartBtn2') {
    const product = cart[e.target.dataset.id]
    product.quantity++
    cart[e.target.dataset.id] = product
  }
  generateCart()
})

cartBtnClean.addEventListener('click', () => {
  cart = {}
  lblCartCount.textContent = 0
  generateCart()
})

allCategories.addEventListener('click', async () => {
  categoryId = ''
  searchValue = ''
  searchInput.value = ''
  await getProducts()
})

const limitProducts = async (limit) => {
  if (categoryId) {
    await getProductsByIdCategory(categoryId, 1, limit)
    return
  }
  if (searchValue) {
    await searchProducts(searchValue, 1, limit)
    return
  }
  await getProducts(1, limit)
}

const generatePages = (totalPages, limit, search) => {
  paginationContainer.innerHTML = ''
  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
    const page = paginationTemplate.cloneNode(true)
    page.querySelector('a').textContent = pageNumber
    page.querySelector('a').addEventListener('click', async () => {
      if (categoryId) {
        await getProductsByIdCategory(categoryId, pageNumber, limit)
        return
      }
      if (search) {
        await searchProducts(search, pageNumber, limit)
        return
      }
      await getProducts(pageNumber, limit)
    })
    paginationContainer.appendChild(page)
  }
}
