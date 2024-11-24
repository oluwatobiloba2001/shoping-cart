// Grabbing DOM elements
let shop = document.getElementById('shop');
let cartContainer = document.getElementById('cartContainer');
let cartAmount = document.getElementById('cartAmount');
let cartIcon = document.querySelector('.cart');

// Retrieving cart data from localStorage or initializing it
let basket = JSON.parse(localStorage.getItem("data")) || [];

// Sample product data
let shopItemsData = [
    { id: 'hhauuauu', name: 'Casual Shirt', price: 45, desc: "A comfortable casual shirt.", img: 'images/img-1.jpg' },
    { id: 'jajfds', name: 'Office Shirt', price: 55, desc: "Perfect for office wear.", img: 'images/img-2.jpg' },
    { id: 'svsinq', name: 'T-Shirt', price: 100, desc: "Relaxed and comfy.", img: 'images/img-3.jpg' },
    { id: 'sjivnsi', name: 'Men’s Suit', price: 300, desc: "Elegant and stylish.", img: 'images/img-4.jpg' }
];

// Function to generate products in the shop
let generateShop = () => {
    shop.innerHTML = shopItemsData.map((item) => {
        let { id, name, price, desc, img } = item;
        let search = basket.find((x) => x.id === id) || {};
        return `
            <div class="item" id="product-id-${id}">
                <img width="220" src=${img} alt="${name}">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price-quantity">
                        <h2>$${price}</h2>
                        <div class="buttons">
                            <i onclick="decrement('${id}')" class="bi bi-dash-lg"></i>
                            <div id=${id} class="quantity">${search.item || 0}</div>
                            <i onclick="increment('${id}')" class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
};
generateShop();

// Increment function to add items to the basket
let increment = (id) => {
    let search = basket.find((x) => x.id === id);
    if (!search) {
        basket.push({ id: id, item: 1 });
    } else {
        search.item += 1;
    }
    localStorage.setItem("data", JSON.stringify(basket));
    update(id);
    renderCart();
};

// Decrement function to remove items from the basket
let decrement = (id) => {
    let search = basket.find((x) => x.id === id);
    if (!search || search.item === 0) return;

    search.item -= 1;
    if (search.item === 0) {
        basket = basket.filter((x) => x.id !== id); // Remove item if quantity is 0
    }
    localStorage.setItem("data", JSON.stringify(basket));
    update(id);
    renderCart();
};

// Update the quantity displayed for a specific item
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search ? search.item : 0;
    calculation();
};

// Calculate and display the total items in the cart
let calculation = () => {
    cartAmount.innerText = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();

// Render the cart details dynamically
// Render the cart details dynamically
let renderCart = () => {
    if (basket.length === 0) {
        cartContainer.innerHTML = `<h2>Your Cart is Empty</h2>`;
        return;
    }

    let totalPrice = basket.reduce((acc, cartItem) => {
        let product = shopItemsData.find((x) => x.id === cartItem.id);
        return acc + (product.price * cartItem.item);
    }, 0);

    cartContainer.innerHTML = basket.map((cartItem) => {
        let { id, item } = cartItem;
        let product = shopItemsData.find((x) => x.id === id);
        return `
            <div class="cart-item">
                <img src="${product.img}" width="100" alt="${product.name}">
                <div class="details">
                    <h4>${product.name}</h4>
                    <p>Price: $${product.price}</p>
                    <p>Quantity: ${item}</p>
                    <h4>Total: $${item * product.price}</h4>
                    <button onclick="removeItem('${id}')">Remove</button>
                </div>
            </div>
        `;
    }).join('') + `
        <div class="cart-total">
            <h3>Total Price: $${totalPrice}</h3>
        </div>
    `;
};


// Remove an item completely from the cart
let removeItem = (id) => {
    basket = basket.filter((x) => x.id !== id); // Remove item from basket
    localStorage.setItem("data", JSON.stringify(basket));
    renderCart();
    calculation();
    update(id);
};

// Toggle cart visibility when clicking on the cart icon
cartIcon.addEventListener('click', () => {
    cartContainer.classList.toggle('hidden');
});

// Initialize the cart on page load
renderCart();
