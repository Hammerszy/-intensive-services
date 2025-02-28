const marqueeWrapper = document.getElementById('marqueeWrapper');
    
    // Define the text and create multiple instances
    const text = "Loader_if";
    const repetitions = 1; // Enough repetitions to fill the screen width
    
    // Create the elements
    for (let i = 0; i < repetitions; i++) {
      const textElement = document.createElement('span');
      textElement.className = 'marquee__text';
      textElement.textContent = text;
      marqueeWrapper.appendChild(textElement);
    }
    
    // Get all text elements
    const textElements = document.querySelectorAll('.marquee__text');
    
    // Calculate the width of a single text element
    const textWidth = textElements[0].offsetWidth + parseInt(getComputedStyle(textElements[0]).marginRight);
    
    // Calculate total width of all text elements
    const totalWidth = textWidth * repetitions;
    
    // Initial position and scroll position
    let position = 0;
    let lastScrollY = window.scrollY;
    
    // Make sure the wrapper starts at position 0
    marqueeWrapper.style.transform = `translateX(0px)`;
    
    // Add scroll event listener
    window.addEventListener('scroll', function() {
      // Calculate scroll delta
      const scrollDelta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      
      // Move the text based on scroll direction (speed multiplier: 1.5)
      // Positive scrollDelta (scrolling down) moves text right
      position -= scrollDelta * 1.5;
      
      // Create loop effect
      if (position <= -textWidth) {
        // If we've scrolled past one instance width, loop back
        position += textWidth;
      } else if (position > 0) {
        // If we've scrolled up past the beginning, loop to the end
        position -= textWidth;
      }
      
      // Apply the transform
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
    let animationID = 0;
    let sliderWidth = sliderWrapper.clientWidth;

    window.addEventListener("resize", () => {
      sliderWidth = sliderWrapper.clientWidth;
      setPositionByIndex();
    });

    function updateSlider() {
      setPositionByIndex();

      // Update active dot
      dots.forEach((dot) => dot.classList.remove("active"));
      dots[currentIndex].classList.add("active");
    }

    function setPositionByIndex() {
      currentTranslate = currentIndex * -sliderWidth;
      prevTranslate = currentTranslate;
      setSliderPosition();
    }

    function setSliderPosition() {
      sliderWrapper.style.transform = `translateX(${currentTranslate}px)`;
    }

    // Add touch events
    sliderWrapper.addEventListener("touchstart", touchStart);
    sliderWrapper.addEventListener("touchmove", touchMove);
    sliderWrapper.addEventListener("touchend", touchEnd);

    // Add mouse events
    sliderWrapper.addEventListener("mousedown", touchStart);
    sliderWrapper.addEventListener("mousemove", touchMove);
    sliderWrapper.addEventListener("mouseup", touchEnd);
    sliderWrapper.addEventListener("mouseleave", touchEnd);

    function touchStart(event) {
      // Prevent default behavior only for mouse events
      if (event.type === "mousedown") {
        event.preventDefault();
      }

      isDragging = true;
      startPos = getPositionX(event);

      // Stop automatic sliding when user interacts
      clearInterval(autoSlideInterval);

      // Stop any ongoing animation
      cancelAnimationFrame(animationID);
    }

    function touchMove(event) {
      if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;

        // Add some resistance at the edges
        if (currentTranslate > 0) {
          currentTranslate = currentTranslate * 0.3;
        } else if (currentTranslate < -(slides.length - 1) * sliderWidth) {
          const over = currentTranslate - -(slides.length - 1) * sliderWidth;
          currentTranslate = -(slides.length - 1) * sliderWidth + over * 0.3;
        }

        setSliderPosition();
      }
    }

    function touchEnd() {
      isDragging = false;
      const movedBy = currentTranslate - prevTranslate;

      // If moved enough negative, move to next slide
      if (movedBy < -100 && currentIndex < slides.length - 1) {
        currentIndex += 1;
      }

      // If moved enough positive, move to previous slide
      if (movedBy > 100 && currentIndex > 0) {
        currentIndex -= 1;
      }

      updateSlider();

      // Restart automatic sliding
      startAutoSlide();
    }

    function getPositionX(event) {
      return event.type.includes("mouse") ? event.pageX : event.touches[0].pageX;
    }

    // Add click event to dots
    dots.forEach((dot) => {
      dot.addEventListener("click", function () {
        currentIndex = parseInt(this.getAttribute("data-index"));
        updateSlider();

        // Reset auto slide timer
        clearInterval(autoSlideInterval);
        startAutoSlide();
      });
    });

    // Prevent context menu on right click
    sliderWrapper.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    });

    // Auto slide function
    let autoSlideInterval;

    function startAutoSlide() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(function () {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
      }, 5000);
    }

    // Initial setup
    updateSlider();
    startAutoSlide();
  });