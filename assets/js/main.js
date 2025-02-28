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