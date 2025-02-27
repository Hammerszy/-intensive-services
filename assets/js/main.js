const loadText = document.getElementById("loadText");
const marqueeContainer = document.getElementById("marqueeContainer");
const animationContainer = document.getElementById("animationContainer");

// Параметри анімації
let position = -loadText.offsetWidth;
const animationSpeed = 1.7;
let animationId = null;
let isVisible = false;

loadText.style.transform = `translateX(${position}px)`;

function animate() {
  position += animationSpeed;

  const textWidth = loadText.offsetWidth;
  const containerWidth = marqueeContainer.offsetWidth;

  if (position > containerWidth) {
    position = -textWidth;
  }

  loadText.style.transform = `translateX(${position}px)`;

  if (isVisible) {
    animationId = requestAnimationFrame(animate);
  }
}

function checkVisibility() {
  const rect = animationContainer.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  const isNowVisible = rect.top < windowHeight && rect.bottom > 0;

  if (isNowVisible !== isVisible) {
    isVisible = isNowVisible;

    if (isVisible) {
      if (!animationId) {
        animationId = requestAnimationFrame(animate);
      }
    } else {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    }
  }
}

// Перевіряємо видимість при скролі
window.addEventListener("scroll", checkVisibility);

// Перевіряємо видимість при завантаженні сторінки
window.addEventListener("load", checkVisibility);

// Перевіряємо видимість при зміні розміру вікна
window.addEventListener("resize", checkVisibility);
