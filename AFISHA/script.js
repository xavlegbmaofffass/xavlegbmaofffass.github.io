document.addEventListener("DOMContentLoaded", () => {
  const eventList = document.querySelector(".event-list");
  const categoryItems = document.querySelectorAll(".category-item");

  fetch("events.xml")
    .then((response) => response.text())
    .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
    .then((data) => {
      const events = data.querySelectorAll("event");

      events.forEach((event) => {
        const id = event.querySelector("id").textContent;
        const title = event.querySelector("title").textContent;
        const date = event.querySelector("date").textContent;
        const location = event.querySelector("location").textContent;
        const price = event.querySelector("price").textContent;
        const poster = event.querySelector("poster").textContent;
        const category = event.getAttribute("category");

        const card = document.createElement("div");
        card.classList.add("event-card");
        card.setAttribute("data-category", category);

        card.innerHTML = `
          <img src="${poster}" alt="${title}" class="event-poster">
          <div class="event-info">
            <h3 class="event-title">${title}</h3>
            <p class="event-date">📅 ${date}</p>
            <p class="event-location">📍 ${location}</p>
            <p class="event-price">💸 ${price}</p>
            <a href="/BRON/booking.html?id=${id}" class="buy-btn">Купить билет</a>
          </div>
        `;

        eventList.appendChild(card);
      });

      categoryItems.forEach((item) => {
        item.addEventListener("click", function () {
          const selectedCategory = this.getAttribute("data-category");
          const allCards = document.querySelectorAll(".event-card");

          categoryItems.forEach((i) => i.classList.remove("active"));
          this.classList.add("active");

          allCards.forEach((card) => {
            const cardCategory = card.getAttribute("data-category");
            if (selectedCategory === "all" || cardCategory === selectedCategory) {
              card.style.display = "";
            } else {
              card.style.display = "none";
            }
          });
        });
      });
    })
    .catch((error) => {
      console.error("Ошибка при загрузке XML:", error);
    });
});