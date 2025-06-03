document.addEventListener("DOMContentLoaded", () => {
  /* ----- Mobile Menu Toggle ----- */
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      if (navMenu.style.display === "flex") {
        navMenu.style.display = "none";
      } else {
        navMenu.style.display = "flex";
        navMenu.style.flexDirection = "column";
      }
    });
  }

  /* ----- Featured Products Carousel ----- */
  const carouselSlider = document.getElementById("carouselSlider");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let currentIndex = 0;
  const cardWidth = 260; // Adjust if needed based on product card size
  const totalCards = carouselSlider ? carouselSlider.children.length : 0;

  function updateCarousel() {
    if (carouselSlider) {
      carouselSlider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % totalCards;
      updateCarousel();
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + totalCards) % totalCards;
      updateCarousel();
    });
  }
  // Auto-play every 5 seconds
  setInterval(() => {
    if (nextBtn) nextBtn.click();
  }, 5000);

  /* ----- Intersection Observer for Fade-In ----- */
  const faders = document.querySelectorAll(".fade-in");
  const appearOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -50px 0px"
  };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);
  faders.forEach(fader => appearOnScroll.observe(fader));

  /* ----- Modal Popup (for Contact/Order actions) ----- */
  const productModal = document.getElementById("productModal");
  const modalText = document.getElementById("modalText");
  const modalClose = document.querySelector(".modal .close");
  // Bind to both add-to-cart and contact-order buttons
  document.querySelectorAll(".add-to-cart, .contact-order").forEach(btn => {
    btn.addEventListener("click", () => {
      const prod = btn.getAttribute("data-product");
      modalText.textContent = `${prod} inquiry received. We will contact you soon!`;
      productModal.style.display = "flex";
    });
  });
  if (modalClose) {
    modalClose.addEventListener("click", () => {
      productModal.style.display = "none";
    });
  }
  window.addEventListener("click", e => {
    if (e.target === productModal) {
      productModal.style.display = "none";
    }
  });

  /* ----- Order Form Submission ----- */
  const orderForm = document.getElementById("orderForm");
  const orderModal = document.getElementById("orderModal");
  const orderModalText = document.getElementById("orderModalText");
  const orderClose = document.querySelector(".order-close");
  if (orderForm) {
    orderForm.addEventListener("submit", e => {
      e.preventDefault();
      const refCode = document.getElementById("refCode").value;
      orderModalText.textContent = refCode
        ? "Order received! Your referral discount has been applied. Confirmation will be emailed and sent via SMS."
        : "Order received! Confirmation will be emailed and sent via SMS.";
      orderModal.style.display = "flex";
      orderForm.reset();
    });
  }
  if (orderClose) {
    orderClose.addEventListener("click", () => {
      orderModal.style.display = "none";
    });
  }
  window.addEventListener("click", e => {
    if (e.target === orderModal) {
      orderModal.style.display = "none";
    }
  });
  
  /* ----- Contact Form Submission ----- */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      alert("Your message has been sent! We will get back to you shortly.");
      contactForm.reset();
    });
  }

  /* ----- Scroll to Top Button ----- */
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 300) {
      scrollTopBtn.style.display = "block";
    } else {
      scrollTopBtn.style.display = "none";
    }
  });
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ----- Invite/referral button ----- */
  const inviteBtn = document.getElementById("inviteBtn");
  if (inviteBtn) {
    inviteBtn.addEventListener("click", () => {
      alert("Share your referral code with friends and earn 15% off on your next order!");
    });
  }
});
