

/* core data */
let cart = [];
let total = 0;
let restaurant = "";

/* SECTION HANDLER */
function nextSection(id) {
  document.querySelectorAll("section").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

/* --- RESTAURANT SEARCH --- */
function searchRestaurants() {
  const query = document.getElementById("searchBar").value.toLowerCase();
  const items = document.querySelectorAll(".restaurant-item");

  items.forEach(item => {
    const name = item.textContent.toLowerCase();
    item.style.display = name.includes(query) ? "block" : "none";
  });
}



function selectRestaurant(name) {
  restaurant = name;
  alert("You selected " + name);
  nextSection("address");
}

/* --- CART OPERATIONS --- */
function addToCart(item, price) {
  cart.push({ item, price });
  total += price;
  alert(item + " added to cart!");
  updateCart();
}
function updateCart() {
  const list = document.getElementById("cartList");
  list.innerHTML = "";
  cart.forEach((entry, i) => {
    const li = document.createElement("li");
    li.textContent = `${entry.item} – ₹${entry.price}`;
    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.onclick = () => {
      total -= entry.price;
      cart.splice(i, 1);
      updateCart();
    };
    li.appendChild(btn);
    list.appendChild(li);
  });
  document.getElementById("cartTotal").textContent = total;
}

/* --- SUMMARY --- */



function goToSummary() {
  updateOrderSummary();
  nextSection("orderSummary");
}
function updateOrderSummary() {
  document.getElementById("chosenRestaurant").textContent = restaurant;
  const list = document.getElementById("orderList");
  list.innerHTML = "";
  cart.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.item} – ₹${entry.price}`;
    list.appendChild(li);
  });
  document.getElementById("finalTotal").textContent = total;
}

/* --- RESET --- */
function restart() {
  cart = [];
  total = 0;
  restaurant = "";
  ["cartTotal","finalTotal"].forEach(id => document.getElementById(id).textContent = 0);
  ["cartList","orderList"].forEach(id => document.getElementById(id).innerHTML = "");
  nextSection("login");
}
function goToMenu() {
  const username = document.getElementById("username").value.trim();
  if (!username) {
    alert("Please enter your name.");
    return;
  }
  localStorage.setItem("username", username);
  window.location.href = "menu.html";
}

