const BASE_URL = "http://localhost:5000/api/items"; 

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const darkBtn = document.getElementById("darkModeToggle");

    if (form) {
        form.addEventListener("submit", handleLogin);
    }

    if (darkBtn) {
        darkBtn.addEventListener("click", toggleDarkMode);
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

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
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

            <p><strong>Seller:</strong> ${item.seller}</p>

                <div class="rating-section">
                    <p>Rate Seller:</p>
                    <div class="stars" data-seller="${item.seller}">
                        <span class="star" data-value="1">★</span>
                        <span class="star" data-value="2">★</span>
                        <span class="star" data-value="3">★</span>
                        <span class="star" data-value="4">★</span>
                        <span class="star" data-value="5">★</span>
                    </div>
                </div>
            </div>
        `;
        list.appendChild(li);
    });

    addStarListeners();}

    function addStarListeners() {
    let alreadyRated = false;

    document.querySelectorAll(".star").forEach(star => {
        star.addEventListener("click", function () {

            if (alreadyRated) return;
            alreadyRated = true;

            const rating = this.dataset.value;
            const container = this.parentElement;
            const seller = container.dataset.seller;

            const stars = container.querySelectorAll(".star");

            stars.forEach(s => s.classList.remove("selected"));

            for (let i = 0; i < rating; i++) {
                stars[i].classList.add("selected");
            }

            fetch("http://localhost:5000/rate-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sellerEmail: seller,
                    rating,
                    fromUser: localStorage.getItem("user")
                })
            });
        });
    });
}
