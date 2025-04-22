document.addEventListener("DOMContentLoaded", () => {
  const eventList = document.querySelector(".event-list");

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

        const card = document.createElement("div");
        card.classList.add("event-card");

        card.innerHTML = `
          <img src="${poster}" alt="${title}" class="event-poster">
          <div class="event-info">
            <h3 class="event-title">${title}</h3>
            <p class="event-date">📅 ${date}</p>
            <p class="event-location">📍 ${location}</p>
            <p class="event-price">💸 ${price}</p>
            <a href="/BRONIROVANIE/booking.html?id=${id}" class="buy-btn">Купить билет</a>
          </div>
        `;

        eventList.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Ошибка при загрузке XML:", error);
    });
});
