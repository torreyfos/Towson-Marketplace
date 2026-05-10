const BASE_URL = "http://localhost:5000/api/items"; 

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    if (form) {
        form.addEventListener("submit", handleLogin);
    }

    if (document.getElementById("itemsList")) {
        loadAllItems();
    }
});

function handleLogin(event) {
    event.preventDefault();

    const tuId = document.getElementById("tuId").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const error = document.getElementById("error");

    if (!/^\d{7}$/.test(tuId)) {
        error.textContent = "TU ID must be exactly 7 digits.";
        return;
    }

    if (!email.endsWith("@students.towson.edu")) {
        error.textContent = "Must use a Towson email.";
        return;
    }

    if (!password.trim()) {
        error.textContent = "Password is required.";
        return;
    }
    localStorage.setItem("user", email);

    window.location.href = "tumarketplace_completed.html";
}

async function loadAllItems() {
    try {
        const res = await fetch(BASE_URL);
        const items = await res.json();
        displayItems(items);
    } catch (err) {
        console.error("Error loading items:", err);
    }
}

async function searchItems() {
    const search = document.getElementById("searchInput").value;
    const category = document.getElementById("category").value;

    let url = BASE_URL + "?";

    if (search) url += `search=${search}&`;
    if (category) url += `category=${category}`;

    try {
        const res = await fetch(url);
        const items = await res.json();
        displayItems(items);
    } catch (err) {
        console.error("Search error:", err);
    }
}
function sendMessage() {

    const input =
        document.getElementById("messageInput");

    const chatBox =
        document.getElementById("chatBox");

    if (input.value.trim() === "") return;

    const message =
        document.createElement("div");

    message.classList.add("message", "sent");

    message.textContent = input.value;

    chatBox.appendChild(message);

    input.value = "";

    chatBox.scrollTop = chatBox.scrollHeight;
}

function postItem() {

    const title =
        document.getElementById("itemTitle").value;

    const price =
        document.getElementById("itemPrice").value;

    const description =
        document.getElementById("itemDescription").value;

    const category =
        document.getElementById("itemCategory").value;

    const itemsList =
        document.getElementById("itemsList");

    const item =
        document.createElement("li");

    item.classList.add("item-listing");

    item.innerHTML = `
        <div class="item-info">

            <p class="item-price">
                $${price}
            </p>

            <p class="item-title">
                ${title}
            </p>

            <p class="item-description">
                ${description}
            </p>

            <p class="item-category">
                ${category}
            </p>

            <button class="message-btn">
                Message Seller
            </button>

        </div>
    `;

    itemsList.prepend(item);
}

function displayItems(items) {
    const list = document.getElementById("itemsList");
    list.innerHTML = "";

    if (!items || items.length === 0) {
        list.innerHTML = "<p>No items available</p>";
        return;
    }

    items.forEach(item => {
        const li = document.createElement("li");
        li.className = "item-card";

        li.innerHTML = `
            <h3>${item.title}</h3>
            <p><strong>Price:</strong> $${item.price}</p>
            <p><strong>Category:</strong> ${item.category}</p>
            <p><strong>Location:</strong> ${item.location || "Not specified"}</p>
            <p>${item.description || ""}</p>
        `;

        list.appendChild(li);
    });
}
