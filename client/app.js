const BASE_URL = "http://localhost:5000/api/items"; // your backend

// LOGIN
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    if (form) {
        form.addEventListener("submit", handleLogin);
    }

    // Auto-load items if on marketplace page
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

    // Validation
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

    // Save session (simple)
    localStorage.setItem("user", email);

    // Redirect
    window.location.href = "tumarketplace_completed.html";
}


// LOAD ALL ITEMS FROM MONGODB
async function loadAllItems() {
    try {
        const res = await fetch(BASE_URL);
        const items = await res.json();
        displayItems(items);
    } catch (err) {
        console.error("Error loading items:", err);
    }
}


// SEARCH ITEMS
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


// DISPLAY ITEMS
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