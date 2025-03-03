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
    // Якщо ми прокрутили вгору занадто далеко, переходимо до кінця
    position += textWidth;
  }

  // Застосовуємо трансформацію
  marqueeWrapper.style.transform = `translateX(${position}px)`;
});

//slider
document.addEventListener("DOMContentLoaded", function () {
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const dots = document.querySelectorAll(".dot");
  const slides = document.querySelectorAll(".slide");
  let currentIndex = 0;

  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let sliderWidth = sliderWrapper.clientWidth;
  let slideMargin = 20; // Відступ між слайдами

  window.addEventListener("resize", () => {
    sliderWidth = sliderWrapper.clientWidth;
    setPositionByIndex();
  });

  function updateSlider() {
    setPositionByIndex();

    dots.forEach((dot) => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
  }

  function setPositionByIndex() {
    currentTranslate = currentIndex * -(sliderWidth + slideMargin); // Враховуємо відступ
    prevTranslate = currentTranslate;
    setSliderPosition();
  }

  function setSliderPosition() {
    sliderWrapper.style.transform = `translateX(${currentTranslate}px)`;
  }

  sliderWrapper.addEventListener("touchstart", touchStart);
  sliderWrapper.addEventListener("touchmove", touchMove);
  sliderWrapper.addEventListener("touchend", touchEnd);

  sliderWrapper.addEventListener("mousedown", touchStart);
  sliderWrapper.addEventListener("mousemove", touchMove);
  sliderWrapper.addEventListener("mouseup", touchEnd);
  sliderWrapper.addEventListener("mouseleave", touchEnd);

  function touchStart(event) {
    if (event.type === "mousedown") {
      event.preventDefault();
    }

    isDragging = true;
    startPos = getPositionX(event);
    cancelAnimationFrame(animationID);
  }

  function touchMove(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event);
      currentTranslate = prevTranslate + currentPosition - startPos;

      if (currentTranslate > 0) {
        currentTranslate = currentTranslate * 0.3;
      } else if (currentTranslate < -(slides.length - 1) * (sliderWidth + slideMargin)) {
        const over = currentTranslate - -(slides.length - 1) * (sliderWidth + slideMargin);
        currentTranslate = -(slides.length - 1) * (sliderWidth + slideMargin) + over * 0.3;
      }

      setSliderPosition();
    }
  }

  function touchEnd() {
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentIndex < slides.length - 1) {
      currentIndex += 1;
    }

    if (movedBy > 100 && currentIndex > 0) {
      currentIndex -= 1;
    }

    updateSlider();
  }

  function getPositionX(event) {
    return event.type.includes("mouse") ? event.pageX : event.touches[0].pageX;
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      currentIndex = parseInt(this.getAttribute("data-index"));
      updateSlider();
    });
  });

  sliderWrapper.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  });

  updateSlider();
});
