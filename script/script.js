const buttons = document.querySelectorAll(".filter-btn");
const dropdownElements = {
  type: document.querySelector("#type-options"),
  distance: document.querySelector("#distance-options"),
  category: document.querySelector("#category-options"),
};

let openDropdown = null;

const selectedFilters = {
  type: "Any type",
  distance: "Any distance",
  category: "Any category",
};

const eventsStore = [
  {
    title: "INFJ Personality Type - Coffee Shop Meet & Greet",
    description: "Being an INFJ",
    date: new Date(2024, 2, 23, 15),
    image:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format&fit=crop",
    type: "offline",
    attendees: 99,
    category: "Hobbies and Passions",
    distance: 50,
  },
  {
    title:
      "NYC AI Users - AI Tech Talks, Demo & Social: RAG Search and Customer Experience",
    description: "New York AI Users",
    date: new Date(2024, 2, 23, 11, 30),
    image:
      "https://images.unsplash.com/photo-1696258686454-60082b2c33e2?q=80&w=870&auto=format&fit=crop",
    type: "offline",
    attendees: 43,
    category: "Technology",
    distance: 25,
  },
  {
    title: "Book 40+ Appointments Per Month Using AI and Automation",
    description: "New Jersey Business Network",
    date: new Date(2024, 2, 16, 14),
    image:
      "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1032&auto=format&fit=crop",
    type: "online",
    category: "Technology",
    distance: 10,
  },
  {
    title: "Dump writing group weekly meetup",
    description: "Dump writing group",
    date: new Date(2024, 2, 13, 11),
    image:
      "https://plus.unsplash.com/premium_photo-1678453146992-b80d66df9152?q=80&w=870&auto=format&fit=crop",
    type: "online",
    attendees: 77,
    category: "Business",
    distance: 100,
  },
  {
    title: "Over 40s, 50s, & 60s Senior Singles Chat, Meet & Dating Community",
    description: "Over 40s, 50s, 60s Singles Chat, Meet & Dating Community",
    date: new Date(2024, 2, 14, 11),
    image:
      "https://plus.unsplash.com/premium_photo-1706005542509-a460d6efecb0?q=80&w=870&auto=format&fit=crop",
    type: "online",
    category: "Social Activities",
    distance: 74,
  },
  {
    title: "All Nations - Manhattan Missions Church Bible Study",
    description: "Manhattan Bible Study Meetup Group",
    date: new Date(2024, 2, 14, 11),
    image:
      "https://plus.unsplash.com/premium_photo-1679488248784-65a638a3d3fc?q=80&w=870&auto=format&fit=crop",
    type: "offline",
    category: "Health and Wellbeing",
    distance: 15,
  },
];

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const type = btn.dataset.type;
    const dropdown = dropdownElements[type];

    if (openDropdown && openDropdown !== dropdown) {
      openDropdown.style.display = "none";
    }

    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
    openDropdown = dropdown.style.display === "block" ? dropdown : null;
  });
});

Object.entries(dropdownElements).forEach(([type, dropdown]) => {
  dropdown.addEventListener("click", (e) => {
    const selected = e.target.textContent;
    if (!selected) return;

    const btnLabel = document.querySelector(
      `.filter-btn[data-type="${type}"] .label`
    );
    if (btnLabel) btnLabel.textContent = selected;

    selectedFilters[type] = selected;
    dropdown.style.display = "none";
    openDropdown = null;

    renderEvents();
  });
});

document.addEventListener("click", () => {
  if (openDropdown) {
    openDropdown.style.display = "none";
    openDropdown = null;
  }
});

function renderEvents() {
  const container = document.querySelector(".eventContainer");
  container.innerHTML = "";

  const filtered = eventsStore.filter((event) => {
    const typeMatch =
      selectedFilters.type === "Any type" ||
      event.type === selectedFilters.type;
    const categoryMatch =
      selectedFilters.category === "Any category" ||
      event.category === selectedFilters.category;
    const distanceMatch =
      selectedFilters.distance === "Any distance" ||
      event.distance <= +selectedFilters.distance;

    return typeMatch && categoryMatch && distanceMatch;
  });

  if (filtered.length === 0) {
    container.innerHTML = "<p>No events match your filters.</p>";
    return;
  }

  filtered.forEach((event) => {
    const div = document.createElement("div");
    div.className = "eventsNy";

    const img = document.createElement("img");
    img.className = "passionImg";
    img.src = event.image;
    img.alt = event.title;

    const info = document.createElement("div");
    info.className = "infoNYC";

    const dateP = document.createElement("p");
    dateP.textContent = event.date.toUTCString();

    const titleP = document.createElement("p");
    titleP.textContent = event.title;

    const categoryP = document.createElement("p");
    categoryP.textContent = `${event.category} (${event.distance} km)`;

    info.appendChild(dateP);
    info.appendChild(titleP);
    info.appendChild(categoryP);

    div.appendChild(img);
    div.appendChild(info);

    container.appendChild(div);
  });
}

renderEvents();
