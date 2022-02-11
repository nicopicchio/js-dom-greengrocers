const log = value => console.log(value)
const addToCartBtnText = 'Add to cart'
const minusSymbol = '-'
const plusSymbol = '+'
let quantity = 1

// A user can view a selection of items in the store 					[X]
// From the store, a user can add an item to their cart				[X]

let itemList = document.querySelector('.store--item-list')
const cart = document.querySelector('.cart--item-list')
let totalPrice = document.querySelector('.total-number')


function renderItemsList() {
	clearStore()
	for (const element of state.items) {
		const item = document.createElement('li')
		const itemContainer = document.createElement('div')
		const itemImage = document.createElement('img')
		const addToCartBtn = document.createElement('button')
		itemContainer.setAttribute('class', 'store--item-icon')
		itemImage.setAttribute('src', `assets/icons/${element.id}.svg`)
		itemImage.setAttribute('alt', `${element.name}`)
		addToCartBtn.innerText = addToCartBtnText
		addToCartBtn.addEventListener('click', function(event) {
			event.preventDefault()
			if (isItemInCart(element)) {
				incrementQuantity(element)
				return
			}
			renderItemInCart(element)
			addItemToCart(element)
			log(state.cart)
		})
		itemList.append(item)
		itemContainer.append(itemImage)
		item.append(itemContainer, addToCartBtn)
	}
}

function clearStore() {
	const header = document.querySelector('#store')
	itemList.remove()
	itemList = document.createElement('ul')
	itemList.setAttribute('class', '.item-list store--item-list')
	header.appendChild(itemList)
}

function renderItemInCart(element) {
	const liElement = document.createElement('li')
	cart.append(liElement)
	const imgElement = document.createElement('img')
	imgElement.setAttribute('class', 'cart--item-icon')
	imgElement.setAttribute('src', `assets/icons/${element.id}.svg`)
	imgElement.setAttribute('alt', `${element.name}`)
	const pElement = document.createElement('p')
	pElement.innerText = element.name
	const removeBtn = document.createElement('button')
	removeBtn.setAttribute('class', 'quantity-btn remove-btn center')
	removeBtn.innerText = minusSymbol
	removeBtn.addEventListener('click', function(event) {
		event.preventDefault()
		decrementQuantity()
		quantityDisplay.innerText = quantity
	})
	const quantityDisplay = document.createElement('span')
	quantityDisplay.setAttribute('class', 'quantity-text center')
	quantityDisplay.innerText = quantity
	const addBtn = document.createElement('button')
	addBtn.setAttribute('class', 'quantity-btn add-btn center')
	addBtn.innerText = plusSymbol
	addBtn.addEventListener('click', function(event) {
		event.preventDefault()
		incrementQuantity(element)
		quantityDisplay.innerText = quantity
	})
	liElement.append(imgElement, pElement, removeBtn, quantityDisplay, addBtn)
}

function addItemToCart(element) {
	const cartItem = {
		item: element,
		quantity: 1
	}
	state.cart.push(cartItem)
}

// function removeItemFromCart(element) {
// 	start.cart.splice
// }

function incrementQuantity(item) {
	const cartItem = isItemInCart(item)
	log(item)
	cartItem.quantity++
}

function decrementQuantity() {
	if (quantity > 0) {
		quantity--
	}
}

function isItemInCart(item) {
	return state.cart.find(element => element.item === item)
}

renderItemsList()
