const products = [
  { id: 1, name: "Running Shoes", price: 2999, image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/88c35e4e-9a89-4ced-8247-c194da41b173/NIKE+VOMERO+18.png" },
  { id: 2, name: "Denim Jacket", price: 1499, image: "https://m.media-amazon.com/images/I/71DhXoZOH8L._UY1000_.jpg" },
  { id: 3, name: "Smart Watch", price: 1999, image: "https://c4.wallpaperflare.com/wallpaper/959/271/655/5c1cdef0c8eb3-wallpaper-preview.jpg" },
  { id: 4, name: "Sunglasses", price: 999, image: "https://greatsouthernsunnies.com.au/cdn/shop/files/Mens-ray-ban-mobile.jpg" },
  { id: 5, name: "Hoodie", price: 1299, image: "https://m.media-amazon.com/images/I/61QJ0E2P1eL._SX342_.jpg" },
];

let cart = [];

const productList = document.getElementById("product-list");
const cartPanel = document.getElementById("cart-panel");
const cartIcon = document.getElementById("cart-icon");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const searchInput = document.getElementById("searchInput");

// Render Products
function renderProducts(filter = "") {
  productList.innerHTML = "";
  const filtered = products.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));
  filtered.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product-card");
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

// Add to Cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

// Update Cart
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement("div");
    div.innerHTML = `${item.name} - ₹${item.price} <button onclick="removeFromCart(${index})">❌</button>`;
    cartItems.appendChild(div);
  });
  cartCount.textContent = cart.length;
  cartTotal.textContent = total;
}

// Remove from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Toggle Cart Panel
cartIcon.addEventListener("click", () => {
  cartPanel.style.display = cartPanel.style.display === "flex" ? "none" : "flex";
});

// Live Search
searchInput.addEventListener("input", (e) => {
  renderProducts(e.target.value);
});

// Init
renderProducts();
