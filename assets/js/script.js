// ON SCROLL NAVIGATION STYLING SCRIPT
const navElement = document.querySelector('nav');
if (navElement) {
  window.addEventListener('scroll', () => {
    navElement.classList.toggle('window-scroll', window.scrollY > 0);
  });
}

// Form CTA Sticky Logic
const cta = document.querySelector('.form-cta');
const form = document.querySelector('#consult-form');
const footer = document.querySelector('.footer');

if (cta && form && footer) {
  window.addEventListener('scroll', () => {
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
}

// Loading animation
var loaderImg = document.querySelector(".img");
var loader = document.querySelector(".loader");

if (loader) {
  window.addEventListener('load', hides);
  function hides() {
    loader.classList.add("hide");
    // Only try to hide loaderImg if it actually exists
    if (loaderImg) {
      loaderImg.classList.add("ImgNone");
    }
  }
}

// NAVIGATION MENU TOGGLE BUTTON
const Menu = document.querySelector(".nav__navigation");
const menuBtn = document.querySelector(".menuBtn");
const nav = document.querySelector('nav');

if (Menu && menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle("menu-active");
    Menu.classList.toggle("active");
  });

  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollTop > lastScrollTop) {
      // Scrolling down
      nav.classList.add('hidden');
      nav.classList.remove('visible');

      if (Menu.classList.contains("active")) {
        menuBtn.classList.remove("menu-active");
        Menu.classList.remove("active");
      }
    } else {
      // Scrolling up
      nav.classList.add('visible');
      nav.classList.remove('hidden');

      if (Menu.classList.contains("active")) {
        menuBtn.classList.remove("menu-active");
        Menu.classList.remove("active");
      }
    }
    lastScrollTop = currentScrollTop;
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    const isMenuOpen = Menu.classList.contains('active');
    const isClickInsideMenu = Menu.contains(event.target);
    const isClickInsideButton = menuBtn.contains(event.target);

    if (isMenuOpen && !isClickInsideMenu && !isClickInsideButton) {
      menuBtn.classList.remove("menu-active");
      Menu.classList.remove("active");
    }
  });
}

// Slider Class
class Slider {
  constructor(container) {
    this.container = container;
    this.slider = container.querySelector('.slider');
    this.slides = container.querySelectorAll('.slide');
    this.dotsContainer = container.querySelector('.dots');

    // Safety check inside class
    if (!this.slider || !this.dotsContainer) return;

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
    }, 5000);
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
    this.container.addEventListener('mouseenter', () => this.stopAutoScroll());
    this.container.addEventListener('mouseleave', () => this.startAutoScroll());

    let startX = 0;
    this.container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    this.container.addEventListener('touchmove', (e) => {
      const diff = e.touches[0].clientX - startX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? this.prevSlide() : this.nextSlide();
        startX = e.touches[0].clientX;
      }
    });

    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.currentIndex = index;
        this.updateSlider();
      });
    });
  }
}

// Initialize sliders (Only if elements exist)
const sliderContainers = document.querySelectorAll('.slider-container');
if (sliderContainers.length > 0) {
  sliderContainers.forEach((container) => {
    new Slider(container);
  });
}

// Gallery Slides
const galleryTrack = document.querySelector('.gallery-slides');
if (galleryTrack) {
  document.addEventListener('DOMContentLoaded', function () {
    const gallerySlides = document.querySelectorAll('.gallery-slide');
    const galleryPrev = document.querySelector('.gallery-prev');
    const galleryNext = document.querySelector('.gallery-next');

    if (!galleryPrev || !galleryNext) return;

    let galleryCurrentIndex = 0;
    const galleryTotalSlides = gallerySlides.length;
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

    galleryNext.addEventListener('click', showNextSlide);
    galleryPrev.addEventListener('click', showPrevSlide);
    setInterval(showNextSlide, 5000);

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
    updateGalleryPosition();
  });
}

// Facility Dropdown
const facilityHeaders = document.querySelectorAll('.facility-header');
if (facilityHeaders.length > 0) {
  facilityHeaders.forEach(item => {
    item.addEventListener('click', () => {
      const parent = item.closest('.facility-toggle');
      parent.classList.toggle('open');
    });
  });
}


// Product Slider with Auto Scroll
const productSlider = document.getElementById('product-slider');
if (productSlider) {
  document.addEventListener('DOMContentLoaded', function () {
    let scrollInterval;
    let isHovering = false;
    let startTouchX = 0;
    let endTouchX = 0;
    const scrollSpeed = 200;

    const autoScroll = () => {
      if (!isHovering) {
        productSlider.scrollBy({
          left: 2,
          behavior: 'smooth',
        });
      }
    };

    const startAutoScroll = () => {
      scrollInterval = setInterval(autoScroll, 30);
    };

    productSlider.addEventListener('mouseenter', () => {
      isHovering = true;
      clearInterval(scrollInterval);
    });

    productSlider.addEventListener('mouseleave', () => {
      isHovering = false;
      startAutoScroll();
    });

    productSlider.addEventListener('touchstart', (e) => {
      startTouchX = e.touches[0].clientX;
    });

    productSlider.addEventListener('touchmove', (e) => {
      endTouchX = e.touches[0].clientX;
    });

    productSlider.addEventListener('touchend', () => {
      const swipeThreshold = 50;
      if (startTouchX - endTouchX > swipeThreshold) {
        productSlider.scrollBy({ left: scrollSpeed, behavior: 'smooth' });
      } else if (endTouchX - startTouchX > swipeThreshold) {
        productSlider.scrollBy({ left: -scrollSpeed, behavior: 'smooth' });
      }
    });

    productSlider.addEventListener('scroll', () => {
      const scrollWidth = productSlider.scrollWidth;
      const clientWidth = productSlider.clientWidth;
      if (productSlider.scrollLeft + clientWidth >= scrollWidth - 1) {
        productSlider.scrollLeft = 0;
      }
    });

    startAutoScroll();
  });
}

// FAQ Accordion
const faqItems = document.querySelectorAll(".faq-item");
if (faqItems.length > 0) {
  document.addEventListener("DOMContentLoaded", () => {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");

      if (question && answer) {
        question.addEventListener("click", () => {
          if (item.classList.contains("open")) {
            answer.style.height = "0";
            item.classList.remove("open");
            item.querySelector(".icon").textContent = "+";
          } else {
            faqItems.forEach((otherItem) => {
              if (otherItem !== item && otherItem.classList.contains("open")) {
                const otherAnswer = otherItem.querySelector(".faq-answer");
                otherAnswer.style.height = "0";
                otherItem.classList.remove("open");
                otherItem.querySelector(".icon").textContent = "+";
              }
            });
            answer.style.height = answer.scrollHeight + "px";
            item.classList.add("open");
            item.querySelector(".icon").textContent = "-";
          }
        });
      }
    });
  });
}

// Google Badge Animation Trigger
const observerOptions = {
  root: null,
  threshold: 0.3 // Trigger when 30% of the element is visible
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Stop observing once animation has played
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const badge = document.getElementById('reviewBadge');
observer.observe(badge);

// Bill Calculator
const billButtons = document.querySelectorAll('.bill-button');
const billInput = document.getElementById('electricityBill');
if (billButtons.length > 0 && billInput) {
  billButtons.forEach(button => {
    button.addEventListener('click', () => {
      billButtons.forEach(btn => btn.classList.remove('selected'));
      button.classList.add('selected');
      billInput.value = button.dataset.value;
    });
  });
}

// Introduction Accordion
const accordion = document.querySelector('.accordion');
if (accordion) {
  const header = accordion.querySelector('.accordion-header');
  const content = accordion.querySelector('.accordion-content');

  if (header && content) {
    header.addEventListener('click', () => {
      accordion.classList.toggle('active');
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  }
}

// Google Reviews Carousel
document.addEventListener('DOMContentLoaded', function () {

  // --- CRITICAL FIX: PREVENT DOUBLE LOADING ---
  const wrapper = document.getElementById('gi-reviews-wrapper');
  if (!wrapper) return;
  if (wrapper.getAttribute('data-initialized') === 'true') return;
  wrapper.setAttribute('data-initialized', 'true');

  // --- 1. REVIEWS DATA (10 items) ---
  const reviewsData = [
    {
      name: "Madhuri Rahane",
      location: "Shegaon",
      date: "2 weeks ago",
      text: "I was amazed that they actually finished the installation in just 8 hours. I had doubts about the speed initially, but seeing them work was impressive. The structure feels very secure.",
      rating: 5
    },
    {
      name: "Laxman Katkar",
      location: "Akola",
      date: "3 weeks ago",
      text: "Honestly, the best structure quality I've seen in the market. I checked with three other vendors before Green Ideas, but their material quality and heavy-duty stands are unmatched.",
      rating: 5
    },
    {
      name: "Ajay Yadav",
      location: "Akola",
      date: "1 month ago",
      text: "Got a 3kW system installed. They promised one-day installation and delivered exactly that. The team came at 9 AM and by evening everything was running smoothly. No mess left behind.",
      rating: 5
    },
    {
      name: "Raju Khandare",
      location: "Akola",
      date: "1 month ago",
      text: "I needed a larger 6kW setup for my home. The Green Ideas team handled the heavy load effortlessly. The structure is rock solid, and I really appreciate the sturdy fabrication work.",
      rating: 5
    },
    {
      name: "Ashok Garkar",
      location: "Khamgaon",
      date: "1 month ago",
      text: "Very happy with my solar setup. The team is skilled and they used high-quality wires and panels. My neighbor has a different system, but mine looks much neater.",
      rating: 5
    },
    {
      name: "Mangesh Sarde",
      location: "Akola",
      date: "2 months ago",
      text: "My 5kW system installation was seamless. They handled all the technical aspects perfectly. It's been two months and the generation is exactly as they predicted.",
      rating: 5
    },
    {
      name: "Mohan Kolhe",
      location: "Shegaon",
      date: "2 months ago",
      text: "The staff is very polite and professional. They explained how to use the net metering clearly. My 4kW system is working great, and the after-sales support call was a nice touch.",
      rating: 5
    },
    {
      name: "Mangesh Daberao",
      location: "Khamgaon",
      date: "2 months ago",
      text: "If you want speed, go with them. They completed my site in a single day (about 8-9 hours). No dragging the work for days like other contractors. Professional service.",
      rating: 5
    },
    {
      name: "Shweta Agrawal",
      location: "Shegaon",
      date: "3 months ago",
      text: "Their technical knowledge is superior. I was worried about wind safety for the panels, but they used a very strong structure design. Complete value for money.",
      rating: 5
    },
    {
      name: "Dhandevi Niwane",
      location: "Akola",
      date: "3 months ago",
      text: "Installed my 3kW system recently. The panels are of top quality and the installation is very clean. I am saving good money on electricity bills now.",
      rating: 5
    }
  ];

  // --- 2. SETUP ---
  const track = document.getElementById('giReviewsTrack');
  const container = document.getElementById('giTrackContainer');
  const dotsContainer = document.getElementById('giReviewsDots');
  const prevBtn = document.querySelector('.gi-rev-prev');
  const nextBtn = document.querySelector('.gi-rev-next');
  const modal = document.getElementById('giReviewModal');
  const modalAuthor = document.getElementById('giModalAuthor');
  const modalText = document.getElementById('giModalText');
  const closeModal = document.querySelector('.gi-modal-close');

  if (!track) return;

  // FIX: Clear existing content completely before starting
  // This guarantees we start fresh, solving the 20-dots issue if code runs twice
  track.innerHTML = '';
  dotsContainer.innerHTML = '';

  // --- 3. RENDER REVIEWS ---
  reviewsData.forEach((review, index) => {
    const initials = review.name.split(' ').map(n => n[0]).join('').substring(0, 2);

    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
      starsHtml += i < review.rating ? '<i class="fas fa-star"></i> ' : '<i class="far fa-star"></i> ';
    }

    const card = document.createElement('div');
    card.className = 'gi-rev-card';
    card.dataset.fullText = review.text;
    card.dataset.author = review.name;
    card.dataset.initials = initials;

    card.innerHTML = `
                    <div class="gi-rev-top">
                        <div class="gi-rev-user">
                            <div class="gi-rev-avatar">${initials}</div>
                            <div class="gi-rev-meta">
                                <h4>${review.name}</h4>
                                <div class="gi-rev-details">
                                    <i class="fas fa-map-marker-alt"></i> 
                                    <span>${review.location}</span> 
                                    <span style="margin-left:8px; opacity:0.6; font-size:0.75rem">${review.date}</span>
                                </div>
                            </div>
                        </div>
                        <img src="./assets/media/googlesmall.svg" class="gi-card-google-icon" alt="G">
                    </div>
                    <div class="gi-rev-stars-small">${starsHtml}</div>
                    <p class="gi-rev-text">${review.text}</p>
                    <button class="gi-rev-readmore-btn">Read more</button>
                `;
    track.appendChild(card);
  });

  // --- 4. RENDER DOTS ---
  reviewsData.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = idx === 0 ? 'gi-rev-dot active' : 'gi-rev-dot';
    dot.addEventListener('click', () => {
      currentIndex = idx;
      updateCarousel();
      resetAutoSlide();
    });
    dotsContainer.appendChild(dot);
  });

  // --- 5. CAROUSEL LOGIC ---
  let currentIndex = 0;
  let autoSlideInterval;

  function updateCarousel() {
    const cards = document.querySelectorAll('.gi-rev-card');
    if (cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth;
    const gap = 24;

    let perPage = 1;
    if (window.innerWidth >= 1024) perPage = 3;
    else if (window.innerWidth >= 768) perPage = 2;

    const maxIndex = cards.length - perPage;

    // Safety clamp only (visual fix)
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    const moveAmount = (cardWidth + gap) * currentIndex;
    track.style.transform = `translateX(-${moveAmount}px)`;

    // Update Dots
    const dots = document.querySelectorAll('.gi-rev-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
      // Smart Fade Logic
      if (Math.abs(idx - currentIndex) > 2) {
        dot.style.opacity = '0.3';
        dot.style.transform = 'scale(0.8)';
      } else {
        dot.style.opacity = '1';
        dot.style.transform = 'scale(1)';
      }
    });

    // Disable/Enable Buttons at limits
    prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
    prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'all';

    nextBtn.style.opacity = currentIndex >= maxIndex ? '0.3' : '1';
    nextBtn.style.pointerEvents = currentIndex >= maxIndex ? 'none' : 'all';
  }

  function moveSlide(direction) {
    const cards = document.querySelectorAll('.gi-rev-card');
    let perPage = 1;
    if (window.innerWidth >= 1024) perPage = 3;
    else if (window.innerWidth >= 768) perPage = 2;

    // Calculate maxIndex FIRST to avoid the "bounce"
    const maxIndex = cards.length - perPage;

    if (direction === 'next') {
      if (currentIndex < maxIndex) {
        currentIndex++;
      } else {
        // Loop to start strictly
        currentIndex = 0;
      }
    } else {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        // Loop to end strictly
        currentIndex = maxIndex;
      }
    }
    updateCarousel();
  }

  nextBtn.addEventListener('click', () => { moveSlide('next'); resetAutoSlide(); });
  prevBtn.addEventListener('click', () => { moveSlide('prev'); resetAutoSlide(); });

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => { moveSlide('next'); }, 4000);
  }
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Hover Stop
  const wrapperHover = document.querySelector('.gi-rev-carousel-container');
  if (wrapperHover) {
    wrapperHover.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    wrapperHover.addEventListener('mouseleave', startAutoSlide);
  }

  // Touch Swipe
  let touchStartX = 0;
  let touchEndX = 0;

  container.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(autoSlideInterval);
  }, { passive: true });

  container.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) moveSlide('next');
    if (touchEndX > touchStartX + 50) moveSlide('prev');
    startAutoSlide();
  }, { passive: true });

  // --- 6. MODAL ---
  document.querySelectorAll('.gi-rev-readmore-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.gi-rev-card');
      modalAuthor.innerHTML = `<span style="color:var(--primary-theme)">${card.dataset.initials}</span> - ${card.dataset.author}`;
      modalText.textContent = card.dataset.fullText;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      clearInterval(autoSlideInterval);
    });
  });

  const hideModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    startAutoSlide();
  };

  closeModal.addEventListener('click', hideModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) hideModal();
  });

  // Initial Start
  startAutoSlide();
  window.addEventListener('resize', updateCarousel);
  setTimeout(updateCarousel, 100);
});