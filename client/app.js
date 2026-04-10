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

function displayItems(items) {
    const list = document.getElementById("itemsList");
    list.innerHTML = "";

    if (!items || items.length === 0) {
        list.innerHTML = "<p>No items available</p>";
        return;
    }

    items.forEach(item => {
        const li = document.createElement("li");
        li.className = "item-listing";

        li.innerHTML = `
            <div class="item-image">
                <img src="${item.image || 'placeholder.png'}" alt="${item.title}">
            </div>
            <div class="item-info">
            <p class="item-price">$${item.price}</p>
            <p class="item-title">${item.title}</p>
            <p class="item-description">${item.description || "No description provided"}</p>
            <p class="item-category">${item.category} · ${item.location || "Location TBD"}</p>
            </div>
        `;

        list.appendChild(li);
    });
}
