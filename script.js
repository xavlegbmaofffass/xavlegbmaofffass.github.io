document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    let intervalId;
    const itemCount = items.length;
    function initCarousel() {
        const firstClone = items[0].cloneNode(true);
        const lastClone = items[itemCount - 1].cloneNode(true);
        firstClone.classList.add('clone');
        lastClone.classList.add('clone');
        carousel.appendChild(firstClone);
        carousel.insertBefore(lastClone, items[0]);
        const allItems = document.querySelectorAll('.carousel-item');
        carousel.style.transform = `translateX(-${100}%)`;
        function updateCarousel() {
            carousel.style.transition = 'transform 0.5s ease-in-out';
            carousel.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;
        }
        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.remove('active');
                if (index === (currentIndex % itemCount)) {
                    dot.classList.add('active');
                }
            });
        }
        function nextSlide() {
            currentIndex++;
            updateCarousel();
            updateDots();
            if (currentIndex >= itemCount) {
                setTimeout(() => {
                    carousel.style.transition = 'none';
                    currentIndex = 0;
                    carousel.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;
                }, 500);
            }
        }
        function prevSlide() {
            currentIndex--;
            updateCarousel();
            updateDots();
            if (currentIndex < 0) {
                setTimeout(() => {
                    carousel.style.transition = 'none';
                    currentIndex = itemCount - 1;
                    carousel.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;
                }, 500);
            }
        }
        function startAutoSlide() {
            intervalId = setInterval(nextSlide, 5000);
        }
        function stopAutoSlide() {
            clearInterval(intervalId);
        }
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                stopAutoSlide();
                currentIndex = parseInt(this.getAttribute('data-index'));
                updateCarousel();
                updateDots();
                startAutoSlide();
            });
        });
        carousel.addEventListener('transitionend', () => {
            if (currentIndex >= itemCount) {
                carousel.style.transition = 'none';
                currentIndex = 0;
                carousel.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;
            } else if (currentIndex < 0) {
                carousel.style.transition = 'none';
                currentIndex = itemCount - 1;
                carousel.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;
            }
        });
        startAutoSlide();
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }
    initCarousel();
});
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); 
  
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
  
    const nameValue = nameInput.value.trim();
    const phoneValue = phoneInput.value.trim();
  
    const nameRegex = /^[А-Яа-яЁёA-Za-z\s\-]+$/;
    const phoneRegex = /^\+375\d{9}$/;
  
    let isValid = true;
  
    if (!nameRegex.test(nameValue)) {
      alert('Имя должно содержать только буквы, пробелы или тире.');
      isValid = false;
    }
  
    if (!phoneRegex.test(phoneValue)) {
      alert('Номер телефона должен быть в формате +375xxxxxxxxx');
      isValid = false;
    }
  
    if (isValid) {
      alert('С вами скоро свяжутся!');
    }
});