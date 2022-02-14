const addToCartBtnText = 'Add to cart'
const minusSymbol = '-'
const plusSymbol = '+'
// let quantity = 1

const itemList = document.querySelector('.store--item-list')
const cart = document.querySelector('#cart-ul')
const totalPrice = document.querySelector('.total-number')

function renderShop() {
	clearStore()
	renderItemsList()
	renderCart()
	priceUpdate()
}

renderShop()

function renderItemsList() {
	for (const item of state.items) {
		const liEl = document.createElement('li')
		const divEl = document.createElement('div')
		const imgEl = document.createElement('img')
		const addToCartBtn = document.createElement('button')
		divEl.setAttribute('class', 'store--item-icon')
		imgEl.setAttribute('src', `assets/icons/${item.id}.svg`)
		imgEl.setAttribute('alt', `${item.name}`)
		addToCartBtn.innerText = addToCartBtnText
		addToCartBtn.addEventListener('click', function() {
			if (isItemInCart(item)) {
				console.log(state.cart)
				alert(`${item.name} already in the cart`)
				return
			}
			addItemToCart(item)
			renderShop()
		})
		itemList.append(liEl)
		divEl.append(imgEl)
		liEl.append(divEl, addToCartBtn)
	}
}

function clearStore() {
	itemList.innerHTML = ''
	cart.innerHTML = ''
}

function renderCart() {
	for (const item of state.cart) {
		renderItemInCart(item)
	}
}

function renderItemInCart(cartItem) {
	const liEl = document.createElement('li')
	cart.append(liEl)
	const imgEl = document.createElement('img')
	imgEl.setAttribute('class', 'cart--item-icon')
	imgEl.setAttribute('src', `assets/icons/${cartItem.product.id}.svg`)
	imgEl.setAttribute('alt', `${cartItem.product.name}`)
	const pEl = document.createElement('p')
	pEl.innerText = cartItem.product.name
	const removeBtn = document.createElement('button')
	removeBtn.setAttribute('class', 'quantity-btn remove-btn center')
	removeBtn.innerText = minusSymbol
	removeBtn.addEventListener('click', function() {
		if (cartItem.quantity <= 1) {
			state.cart.splice(state.cart.indexOf(cartItem), 1)
		}
		decrementQuantity(cartItem)
		renderShop()
	})
	const quantityDisplay = document.createElement('span')
	quantityDisplay.setAttribute('class', 'quantity-text center')
	quantityDisplay.innerText = cartItem.quantity
	const addBtn = document.createElement('button')
	addBtn.setAttribute('class', 'quantity-btn add-btn center')
	addBtn.innerText = plusSymbol
	addBtn.addEventListener('click', function() {
		if (isItemInCart(cartItem.product)) {
			incrementQuantity(cartItem)
			renderShop()
			return
		}
		addItemToCart(cartItem)
		renderShop()
	})
	liEl.append(imgEl, pEl, removeBtn, quantityDisplay, addBtn)
}

function addItemToCart(item) {
	const cartItem = {
		product: item,
		quantity: 1,
	}
	state.cart.push(cartItem)
}

function incrementQuantity(cartItem) {
	cartItem.quantity++
}

function decrementQuantity(cartItem) {
	cartItem.quantity--
}

function updateIncrementQuantity(item) {
	const cartItem = isItemInCart(item)
	cartItem.quantity++
}

function updateDecrementQuantity(item) {
	const cartItem = isItemInCart(item)
	cartItem.quantity--
}

function isItemInCart(item) {
	return state.cart.find(element => element.product === item)
}

function priceUpdate() {
	let total = 0
	for (const cartItem of state.cart) {
		total += cartItem.product.price * cartItem.quantity
	}
	return totalPrice.innerText = total.toFixed(2)
}
