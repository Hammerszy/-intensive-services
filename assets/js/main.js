const text = "Loader_if";
const repetitions = 1; // Достатня кількість повторень для заповнення ширини екрану

// Створюємо елементи
for (let i = 0; i < repetitions; i++) {
  const textElement = document.createElement("span");
  textElement.className = "marquee__text";
  textElement.textContent = text;
  marqueeWrapper.appendChild(textElement);
}

const textElements = document.querySelectorAll(".marquee__text");

// Обчислюємо ширину одного текстового елемента
const textWidth = textElements[0].offsetWidth + parseInt(getComputedStyle(textElements[0]).marginRight);

// Обчислюємо загальну ширину всіх текстових елементів
const totalWidth = textWidth * repetitions;

// Початкова позиція та позиція прокрутки
let position = 0;
let lastScrollY = window.scrollY;

// Переконуємось, що обгортка починається з позиції 0
marqueeWrapper.style.transform = `translateX(0px)`;

// Додаємо слухач події прокрутки
window.addEventListener("scroll", function () {
  // Обчислюємо дельту прокрутки
  const scrollDelta = window.scrollY - lastScrollY;
  lastScrollY = window.scrollY;

  // Змінюємо напрямок руху: додаємо позитивне значення для руху вправо
  // Позитивна scrollDelta (прокрутка вниз) тепер рухає текст вліво
  position += scrollDelta * 1.5;

  // Створюємо ефект циклу
  if (position >= textWidth) {
    // Якщо ми прокрутили далі ширини одного екземпляра, повертаємось на початок
    position -= textWidth;
  } else if (position < -textWidth) {
    position += textWidth;
  }

  marqueeWrapper.style.transform = `translateX(${position}px)`;
});

//slider
      document.addEventListener("DOMContentLoaded", function () {
        const sliderTrack = document.querySelector(".slider-track");
        const slides = document.querySelectorAll(".slide");
        const navDots = document.querySelectorAll(".nav-dot");
        const slideWidth = slides[0].offsetWidth;
        let currentIndex = 0;

        // Initialize slider
        updateSlider();

        // Set up event listeners for nav dots
        navDots.forEach((dot, index) => {
          dot.addEventListener("click", () => {
            currentIndex = index;
            updateSlider();
          });
        });

        // Auto slide (optional)
        // setInterval(() => {
        //     currentIndex = (currentIndex + 1) % slides.length;
        //     updateSlider();
        // }, 5000);

        function updateSlider() {
          sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

          navDots.forEach((dot, index) => {
            if (index === currentIndex) {
              dot.classList.add("active");
            } else {
              dot.classList.remove("active");
            }
          });
        }

        let startX, moveX;
        let isDragging = false;

        sliderTrack.addEventListener("touchstart", (e) => {
          startX = e.touches[0].clientX;
          isDragging = true;
        });

        sliderTrack.addEventListener("touchmove", (e) => {
          if (!isDragging) return;
          moveX = e.touches[0].clientX;
          const diff = moveX - startX;
          const translateX = -currentIndex * 100 + (diff / slideWidth) * 100;

          if (translateX <= 0 && translateX >= -(slides.length - 1) * 100) {
            sliderTrack.style.transform = `translateX(${translateX}%)`;
          }
        });

        sliderTrack.addEventListener("touchend", () => {
          isDragging = false;
          if (!moveX) return;

          const diff = moveX - startX;
          if (diff > 50 && currentIndex > 0) {
            currentIndex--;
          } else if (diff < -50 && currentIndex < slides.length - 1) {
            currentIndex++;
          }

          updateSlider();
          moveX = null;
        });
      });
