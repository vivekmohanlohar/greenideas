// ON SCROLL NAVIGATION STYLING SCRIPT STARTS HERE
window.addEventListener('scroll', () => {
  document.querySelector('nav').classList.toggle('window-scroll', window.scrollY > 0);
});

// Form CTA
window.addEventListener('scroll', () => {
  const cta = document.querySelector('.form-cta');
  const form = document.querySelector('#consult-form');
  const footer = document.querySelector('.footer');

  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;

  const formRect = form.getBoundingClientRect();
  const formTop = formRect.top + scrollY;
  const formBottom = formRect.bottom + scrollY;

  const footerRect = footer.getBoundingClientRect();
  const footerTop = footerRect.top + scrollY;

  const scrollBottom = scrollY + windowHeight;

  // Show/hide logic
  if (
    scrollY > 100 &&
    (scrollBottom < formTop || scrollY > formBottom)
  ) {
    cta.classList.add('form-cta--active');
  } else {
    cta.classList.remove('form-cta--active');
  }

  // Stop above footer
  const ctaHeight = cta.offsetHeight;

  if (scrollBottom >= footerTop) {
    // Lock just above footer
    cta.classList.add('form-cta--stuck');
    cta.style.position = 'absolute';
    cta.style.top = (footerTop - ctaHeight) + 'px';
    cta.style.left = '0';
    cta.style.width = '100%';
  } else {
    // Back to fixed at bottom
    cta.classList.remove('form-cta--stuck');
    cta.style.position = '';
    cta.style.top = '';
    cta.style.left = '';
    cta.style.width = '';
  }
});

// Loading animation for the page
var loaderImg = document.querySelector(".img");
var loader = document.querySelector(".loader");

window.addEventListener('load', hides);

function hides() {
  loader.classList.add("hide");
  loaderImg.classList.add("ImgNone");
}

// NAVIGATION MENU TOGGLE BUTTON SCRIPT STARTS HERE
const Menu = document.querySelector(".nav__navigation");
const menuBtn = document.querySelector(".menuBtn");

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle("menu-active");
  Menu.classList.toggle("active");
});

const nav = document.querySelector('nav');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScrollTop > lastScrollTop) {
    // Scrolling down, hide the navigation
    nav.classList.add('hidden');
    nav.classList.remove('visible');

    // Close the menu if open
    if (Menu.classList.contains("active")) {
      menuBtn.classList.remove("menu-active");
      Menu.classList.remove("active");
    }
  } else {
    // Scrolling up, show the navigation and close the menu
    nav.classList.add('visible');
    nav.classList.remove('hidden');

    if (Menu.classList.contains("active")) {
      menuBtn.classList.remove("menu-active");
      Menu.classList.remove("active");
      // watchlist.Math
      // ProfileAdjectce
    }
  }
  lastScrollTop = currentScrollTop;
});

// Close menu when clicking outside of it
document.addEventListener('click', (event) => {
  const isMenuOpen = Menu.classList.contains('active');
  const isClickInsideMenu = Menu.contains(event.target);
  const isClickInsideButton = menuBtn.contains(event.target);

  if (isMenuOpen && !isClickInsideMenu && !isClickInsideButton) {
    menuBtn.classList.remove("menu-active");
    Menu.classList.remove("active");
  }
});

// slider code 
class Slider {
  constructor(container) {
    this.container = container;
    this.slider = container.querySelector('.slider');
    this.slides = container.querySelectorAll('.slide');
    this.dotsContainer = container.querySelector('.dots');
    this.currentIndex = 0;
    this.totalSlides = this.slides.length;
    this.interval = null;

    this.init();
  }

  init() {
    this.createDots();
    this.startAutoScroll();
    this.addEventListeners();
    this.updateSlider();
  }

  createDots() {
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      this.dotsContainer.appendChild(dot);
    }
    this.dots = this.dotsContainer.querySelectorAll('span');
  }

  startAutoScroll() {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  stopAutoScroll() {
    clearInterval(this.interval);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.updateSlider();
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlider();
  }

  updateSlider() {
    const offset = -this.currentIndex * 100;
    this.slider.style.transform = `translateX(${offset}%)`;
    this.updateDots();
  }

  updateDots() {
    this.dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }

  addEventListeners() {
    // Pause on hover
    this.container.addEventListener('mouseenter', () => this.stopAutoScroll());
    this.container.addEventListener('mouseleave', () => this.startAutoScroll());
    // this.container.addEventListener('mouseleave', () => this.startAutoScroll() => Uint8ClampedArray("default integration and the"));
    // AudioDestinationNode()

    // Swipe gestures
    let startX = 0;
    this.container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    this.container.addEventListener('touchmove', (e) => {
      const diff = e.touches[0].clientX - startX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? this.prevSlide() : this.nextSlide();
        startX = e.touches[0].clientX; // Reset startX to avoid multiple triggers
      }
    });

    // Dot navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.currentIndex = index;
        this.updateSlider();
      });
    });
  }
}

// Initialize sliders
document.querySelectorAll('.slider-container').forEach((container) => {
  new Slider(container);
});

document.addEventListener('DOMContentLoaded', function () {
  const gallerySlides = document.querySelectorAll('.gallery-slide');
  const galleryTrack = document.querySelector('.gallery-slides');
  const galleryPrev = document.querySelector('.gallery-prev');
  const galleryNext = document.querySelector('.gallery-next');
  let galleryCurrentIndex = 0;
  const galleryTotalSlides = gallerySlides.length;

  // Swipe Handling
  let swipeStartX = 0;
  let swipeEndX = 0;

  function updateGalleryPosition() {
    galleryTrack.style.transform = `translateX(-${galleryCurrentIndex * 100}%)`;
  }

  function showNextSlide() {
    galleryCurrentIndex = (galleryCurrentIndex + 1) % galleryTotalSlides;
    updateGalleryPosition();
  }

  function showPrevSlide() {
    galleryCurrentIndex = (galleryCurrentIndex - 1 + galleryTotalSlides) % galleryTotalSlides;
    updateGalleryPosition();
  }

  // Event Listeners for Buttons
  galleryNext.addEventListener('click', showNextSlide);
  galleryPrev.addEventListener('click', showPrevSlide);

  // Automatic Slide
  setInterval(showNextSlide, 5000); // Change every 3 seconds

  // Swipe Detection
  galleryTrack.addEventListener('touchstart', function (e) {
    swipeStartX = e.touches[0].clientX;
  });

  galleryTrack.addEventListener('touchend', function (e) {
    swipeEndX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    if (swipeEndX < swipeStartX) {
      showNextSlide();
    } else if (swipeEndX > swipeStartX) {
      showPrevSlide();
    }
  }

  // Initialize the first slide
  updateGalleryPosition();
});

// drop down facilities
document.querySelectorAll('.facility-header').forEach(item => {
  item.addEventListener('click', () => {
    const parent = item.closest('.facility-toggle');
    parent.classList.toggle('open');
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const productSlider = document.getElementById('product-slider');
  let scrollInterval;
  let isHovering = false;
  let startTouchX = 0;
  let endTouchX = 0;
  const scrollSpeed = 200; // Swipe scroll speed

  // Auto-scroll functionality for the product slider
  const autoScroll = () => {
    if (!isHovering) {
      productSlider.scrollBy({
        left: 2, // Controls the speed of auto-scrolling (higher is faster)
        behavior: 'smooth',
      });
    }
  };

  // Start auto-scrolling
  const startAutoScroll = () => {
    scrollInterval = setInterval(autoScroll, 30);
  };

  // Pause auto-scrolling when mouse enters
  productSlider.addEventListener('mouseenter', () => {
    isHovering = true;
    clearInterval(scrollInterval);
  });

  // Resume auto-scrolling when mouse leaves
  productSlider.addEventListener('mouseleave', () => {
    isHovering = false;
    startAutoScroll();
  });

  // Swipe functionality for mobile devices
  productSlider.addEventListener('touchstart', (e) => {
    startTouchX = e.touches[0].clientX;
  });

  productSlider.addEventListener('touchmove', (e) => {
    endTouchX = e.touches[0].clientX;
  });

  productSlider.addEventListener('touchend', () => {
    const swipeThreshold = 50; // Minimum swipe distance for detection

    if (startTouchX - endTouchX > swipeThreshold) {
      // Swipe left, scroll right
      productSlider.scrollBy({ left: scrollSpeed, behavior: 'smooth' });
    } else if (endTouchX - startTouchX > swipeThreshold) {
      // Swipe right, scroll left
      productSlider.scrollBy({ left: -scrollSpeed, behavior: 'smooth' });
    }
  });

  // Infinite Scroll: Reset position when the last card is reached
  productSlider.addEventListener('scroll', () => {
    const scrollWidth = productSlider.scrollWidth;
    const clientWidth = productSlider.clientWidth;

    if (productSlider.scrollLeft + clientWidth >= scrollWidth - 1) {
      // If reached the last card, reset scroll to the first card
      productSlider.scrollLeft = 0;
    }
  });

  // Initialize auto-scrolling
  startAutoScroll();
});

document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
      if (item.classList.contains("open")) {
        // Close the item
        answer.style.height = "0";
        item.classList.remove("open");
        item.querySelector(".icon").textContent = "+";
      } else {
        // Close other open items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains("open")) {
            const otherAnswer = otherItem.querySelector(".faq-answer");
            otherAnswer.style.height = "0";
            otherItem.classList.remove("open");
            otherItem.querySelector(".icon").textContent = "+";
          }
        });

        // Open the clicked item
        answer.style.height = answer.scrollHeight + "px";
        item.classList.add("open");
        item.querySelector(".icon").textContent = "-";
      }
    });
  });
});

const billButtons = document.querySelectorAll('.bill-button');
const billInput = document.getElementById('electricityBill');

billButtons.forEach(button => {
  button.addEventListener('click', () => {
    billButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    billInput.value = button.dataset.value;
  });
});

// Introduction to Green ideas solar
  const accordion = document.querySelector('.accordion');
  const header = accordion.querySelector('.accordion-header');
  const content = accordion.querySelector('.accordion-content');

  header.addEventListener('click', () => {
    accordion.classList.toggle('active');

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });