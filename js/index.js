const pgData = [
  {
    name: "Sunrise PG",
    locality: "Kamla Nagar",
    price: "4000",
  },
  { name: "Greenview PG", locality: "Mukherji Nagar", price: "5000" },
  { name: "Ocean PG", locality: "Shubhash Nagar", price: "5500" },
  { name: "Metro PG", locality: "Patel Nagar", price: "5300" },
  { name: "Skyline PG", locality: "Karol Bagh", price: "6000" },
  { name: "Greenwood PG", locality: "Lajpat Nagar", price: "7500" },
  { name: "Metro View PG", locality: "Saket", price: "8000" },
  { name: "Sunrise PG", locality: "Dwarka", price: "6500" },
  { name: "Elite Living PG", locality: "Hauz Khas", price: "10000" },
  { name: "City Haven PG", locality: "Janakpuri", price: "7000" },
  { name: "Urban Nest PG", locality: "Rajouri Garden", price: "8500" },
  { name: "Blue Sky PG", locality: "Vasant Kunj", price: "9500" },
  { name: "Cozy Home PG", locality: "Preet Vihar", price: "6800" },
];

function filterResults() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let resultsContainer = document.getElementById("searchResults");
  resultsContainer.innerHTML = ""; // Clear previous results
  if (input.trim() === "") return;

  let filteredResults = pgData.filter((pg) =>
    pg.locality.toLowerCase().includes(input)
  );

  if (filteredResults.length === 0) {
    resultsContainer.innerHTML = "<p>No results found</p>";
  } else {
    filteredResults.forEach((pg) => {
      let div = document.createElement("div");
      div.classList.add("result-item");
      div.innerHTML = `<strong>${pg.name}</strong><br>Location: ${pg.locality}<br>Price: ${pg.price}`;
      div.onclick = function () {
        window.location.href = `pglist.html?name=${encodeURIComponent(
          pg.name
        )}&locality=${encodeURIComponent(pg.locality)}&price=${pg.price}`;
      };
      div.style.cursor = "pointer";
      div.style.padding = "10px";
      div.style.border = "1px solid #ddd";
      div.style.margin = "5px";
      div.style.background = "#f9f9f9";

      resultsContainer.appendChild(div);
    });
  }
}
let activeDropdown = null;

function toggleDropdown(id, button) {
  // Close other dropdowns
  document
    .querySelectorAll(".dropdown")
    .forEach((drop) => (drop.style.display = "none"));

  // Open the clicked one
  let dropdown = document.getElementById(id);
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";

  // Update active dropdown reference
  activeDropdown = dropdown.style.display === "block" ? dropdown : null;
}

function selectOption(element, category) {
  // Remove selection from all options inside this dropdown
  document
    .querySelectorAll(`#${category}-dropdown .option`)
    .forEach((el) => el.classList.remove("selected"));

  // Mark the selected one
  element.classList.add("selected");
}

function clearSelection(category) {
  document
    .querySelectorAll(`#${category}-dropdown .option`)
    .forEach((el) => el.classList.remove("selected"));
  document.querySelector(`.dropdown-button[onclick*='${category}']`).innerText =
    category.charAt(0).toUpperCase() + category.slice(1) + " ▾";
}

function saveSelection(category) {
  let selectedOption = document.querySelector(
    `#${category}-dropdown .option.selected`
  );
  let button = document.querySelector(
    `.dropdown-button[onclick*='${category}']`
  );

  if (selectedOption) {
    button.innerText = selectedOption.innerText + " ▾"; // Update button text
  }

  // Hide dropdown after saving
  document.getElementById(`${category}-dropdown`).style.display = "none";

  // Show success popup
  let popup = document.getElementById("popup-msg");
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.display = "none";
  }, 1500);
}

// Close dropdown if clicking outside
document.addEventListener("click", function (event) {
  if (!event.target.closest(".dropdown-container")) {
    if (activeDropdown) activeDropdown.style.display = "none";
  }
});

let selectedFilters = {
  locality: "",
  budget: "",
  gender: "",
  amenities: "",
  occupancy: "",
};

const properties = [
  {
    name: "Property 1",
    locality: "Laxmi Nagar",
    budget: "₹5,000 - ₹10,000",
  },
  { name: "Property 1", locality: "Laxmi Nagar", budget: "₹15,000 - ₹20,000" },
  { name: "Property 2", locality: "Kamla Nagar", budget: "₹10,000 - ₹20,000" },
  { name: "Property 2", locality: "Kamla Nagar", budget: "₹5,000 - ₹10,000" },
  { name: "Property 2", locality: "Kamla Nagar", budget: "₹15,000 - ₹20,000" },
  { name: "Property 3", locality: "GTB Nagar", budget: "₹20,000 - ₹30,000" },
  {
    name: "Property 4",
    locality: "Mukherji Nagar",
    budget: "₹5,000 - ₹10,000",
  },
  {
    name: "Property 4",
    locality: "Mukherji Nagar",
    budget: "₹10,000 - ₹15,000",
  },
];

function toggleDropdown(id, button) {
  if (activeDropdown && activeDropdown !== id) {
    document.getElementById(activeDropdown).style.display = "none";
  }
  let dropdown = document.getElementById(id);
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
  activeDropdown = dropdown.style.display === "block" ? id : null;
}

function selectOption(element, category) {
  document
    .querySelectorAll(`#${category}-dropdown .option`)
    .forEach((opt) => opt.classList.remove("selected"));
  element.classList.add("selected");
  selectedFilters[category] = element.innerText;
}

function clearSelection(category) {
  document
    .querySelectorAll(`#${category}-dropdown .option`)
    .forEach((opt) => opt.classList.remove("selected"));
  selectedFilters[category] = "";
  applyFilters();
}

function applyFilters() {
  document
    .querySelectorAll(".dropdown")
    .forEach((d) => (d.style.display = "none"));
  let filteredResults = properties.filter((property) => {
    return (
      (!selectedFilters.locality ||
        property.locality === selectedFilters.locality) &&
      (!selectedFilters.budget || property.budget === selectedFilters.budget)
    );
  });

  displayResults(filteredResults);
}

function displayResults(results) {
  let resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";
  if (results.length === 0) {
    resultsDiv.innerHTML = "<p>No properties found.</p>";
    return;
  }

  results.forEach((property) => {
    let propertyDiv = document.createElement("div");
    propertyDiv.className = "property";
    propertyDiv.innerHTML = `<strong>${property.name}</strong><br> Locality: ${property.locality} <br> Budget: ${property.budget}`;
    resultsDiv.appendChild(propertyDiv);
  });
}
