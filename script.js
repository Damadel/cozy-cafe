/* ========================================
   COZY CAFÉ - COMPLETE JAVASCRIPT
   ======================================== */

document.addEventListener("DOMContentLoaded", function () {
  /* ========================================
     LOADING ANIMATION
  ======================================== */
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
      setTimeout(() => {
        loader.classList.add("hidden");
        setTimeout(() => {
          loader.style.display = "none";
        }, 500);
      }, 1000);
    }
  });

  /* ========================================
     MOBILE MENU TOGGLE
  ======================================== */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
      });
    });

    document.addEventListener("click", (e) => {
      if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
      }
    });
  }

  /* ========================================
     NAVBAR SCROLL EFFECT
  ======================================== */
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 100);
  });

  /* ========================================
     SMOOTH SCROLLING
  ======================================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#" || href === "") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: "smooth",
      });
    });
  });

  /* ========================================
     FADE-IN ANIMATION
  ======================================== */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

  /* ========================================
     MENU CATEGORY FILTER
  ======================================== */
  const categoryButtons = document.querySelectorAll(".category-btn");
  const menuItems = document.querySelectorAll(".menu-item");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;

      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      menuItems.forEach((item) => {
        if (category === "all" || item.dataset.category === category) {
          item.classList.remove("hidden");
          item.style.display = "block";
        } else {
          item.classList.add("hidden");
          item.style.display = "none";
        }
      });
    });
  });

  /* ========================================
     ORDER MODAL
  ======================================== */
  const phoneNumber = "254799363883";
  const orderModal = document.getElementById("orderModal");
  const orderModalClose = document.getElementById("orderModalClose");
  const orderProductName = document.getElementById("orderProductName");
  const orderProductPrice = document.getElementById("orderProductPrice");
  const orderQuantity = document.getElementById("orderQuantity");
  const orderLocation = document.getElementById("orderLocation");
  const orderTotal = document.getElementById("orderTotal");
  const confirmOrder = document.getElementById("confirmOrder");
  const orderQtyMinus = document.getElementById("orderQtyMinus");
  const orderQtyPlus = document.getElementById("orderQtyPlus");

  let currentOrderProduct = { name: "", price: 0 };

  // Open Order Modal
  document.querySelectorAll(".order-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      currentOrderProduct = {
        name: btn.dataset.product,
        price: parseInt(btn.dataset.price),
      };

      orderProductName.textContent = currentOrderProduct.name;
      orderProductPrice.textContent = currentOrderProduct.price;
      orderQuantity.value = 1;
      orderLocation.value = "";
      updateOrderTotal();

      orderModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Update Order Total
  function updateOrderTotal() {
    const qty = parseInt(orderQuantity.value) || 1;
    const total = currentOrderProduct.price * qty;
    orderTotal.textContent = `KSh ${total.toLocaleString()}`;
  }

  // Quantity Buttons
  if (orderQtyMinus) {
    orderQtyMinus.addEventListener("click", () => {
      let qty = parseInt(orderQuantity.value) || 1;
      if (qty > 1) {
        orderQuantity.value = qty - 1;
        updateOrderTotal();
      }
    });
  }

  if (orderQtyPlus) {
    orderQtyPlus.addEventListener("click", () => {
      let qty = parseInt(orderQuantity.value) || 1;
      orderQuantity.value = qty + 1;
      updateOrderTotal();
    });
  }

  if (orderQuantity) {
    orderQuantity.addEventListener("input", updateOrderTotal);
  }

  // Close Order Modal
  function closeOrderModal() {
    orderModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  if (orderModalClose) {
    orderModalClose.addEventListener("click", closeOrderModal);
  }

  orderModal.addEventListener("click", (e) => {
    if (e.target === orderModal) closeOrderModal();
  });

  // Confirm Order via WhatsApp
  if (confirmOrder) {
    confirmOrder.addEventListener("click", () => {
      const quantity = parseInt(orderQuantity.value) || 1;
      const location = orderLocation.value.trim();
      const total = currentOrderProduct.price * quantity;

      let message = `Hi Cozy Cafe! ☕\n\n`;
      message += `I would like to order:\n`;
      message += `━━━━━━━━━━━━━━━━━━━━\n`;
      message += `☕ Product: ${currentOrderProduct.name}\n`;
      message += `💰 Price: KSh ${currentOrderProduct.price}\n`;
      message += `🔢 Quantity: ${quantity}\n`;
      message += `💵 Total: KSh ${total.toLocaleString()}\n`;

      if (location) {
        message += `📍 Delivery: ${location}\n`;
      }

      message += `━━━━━━━━━━━━━━━━━━━━\n`;
      message += `\nThank you! 🙏`;

      const whatsappURL =
        "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);
      window.open(whatsappURL, "_blank");

      closeOrderModal();
    });
  }

  /* ========================================
     DETAILS MODAL
  ======================================== */
  const detailsModal = document.getElementById("detailsModal");
  const detailsModalClose = document.getElementById("detailsModalClose");
  const detailsProductName = document.getElementById("detailsProductName");
  const detailsProductPrice = document.getElementById("detailsProductPrice");
  const detailsDesc = document.getElementById("detailsDesc");
  const detailsAbout = document.getElementById("detailsAbout");
  const detailsIngredients = document.getElementById("detailsIngredients");
  const detailsSizes = document.getElementById("detailsSizes");
  const detailsCalories = document.getElementById("detailsCalories");
  const detailsPrep = document.getElementById("detailsPrep");

  // Open Details Modal
  document.querySelectorAll(".details-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      const menuItem = btn.closest(".menu-item");

      detailsProductName.textContent = menuItem.dataset.name;
      detailsProductPrice.textContent = menuItem.dataset.price;
      detailsDesc.textContent = menuItem.dataset.description;
      detailsAbout.textContent = menuItem.dataset.details;
      detailsIngredients.textContent = menuItem.dataset.ingredients;
      detailsSizes.textContent = menuItem.dataset.sizes;
      detailsCalories.textContent = menuItem.dataset.calories;
      detailsPrep.textContent = menuItem.dataset.prep;

      detailsModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Close Details Modal
  function closeDetailsModal() {
    detailsModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  if (detailsModalClose) {
    detailsModalClose.addEventListener("click", closeDetailsModal);
  }

  detailsModal.addEventListener("click", (e) => {
    if (e.target === detailsModal) closeDetailsModal();
  });

  /* ========================================
     CONTACT FORM - SEND VIA WHATSAPP
  ======================================== */
  const contactForm = document.getElementById("contactForm");
  const contactPhone = "254799363883";

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (name && email && message) {
        // Create WhatsApp message (clean format without special emojis)
        let whatsappMessage = `Hello Cozy Cafe!\n\n`;
        whatsappMessage += `--- NEW MESSAGE ---\n\n`;
        whatsappMessage += `Name: ${name}\n`;
        whatsappMessage += `Email: ${email}\n\n`;
        whatsappMessage += `Message:\n${message}\n\n`;
        whatsappMessage += `-------------------\n`;
        whatsappMessage += `Sent from Cozy Cafe Website`;

        // Open WhatsApp
        const whatsappURL =
          "https://wa.me/" +
          contactPhone +
          "?text=" +
          encodeURIComponent(whatsappMessage);
        window.open(whatsappURL, "_blank");

        // Show success feedback
        const submitBtn = contactForm.querySelector(".send-btn");
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = "Message Sent!";
        submitBtn.style.background = "#25D366";

        // Reset form
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = "";
        }, 3000);
      }
    });
  }

  /* ========================================
     BACK TO TOP BUTTON
  ======================================== */
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 300);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ========================================
     ACTIVE NAV LINK HIGHLIGHTING
  ======================================== */
  const sections = document.querySelectorAll("section[id]");

  const highlightNav = () => {
    let scrollY = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      const id = section.getAttribute("id");

      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (!link) return;

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document
          .querySelectorAll(".nav-links a")
          .forEach((a) => a.classList.remove("active-link"));
        link.classList.add("active-link");
      }
    });
  };

  window.addEventListener("scroll", highlightNav);

  /* ========================================
     STATS COUNTER ANIMATION
  ======================================== */
  const counters = document.querySelectorAll(".stat-item h3");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.textContent;
          const target = parseInt(text.replace(/\D/g, ""));
          const suffix = text.replace(/[0-9]/g, "");

          let count = 0;
          const increment = target / 60;

          const updateCounter = () => {
            count += increment;
            if (count < target) {
              el.textContent = Math.floor(count) + suffix;
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = target + suffix;
            }
          };

          updateCounter();
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  /* ========================================
     GALLERY LIGHTBOX
  ======================================== */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.querySelector(".lightbox-caption");
  const lightboxClose = document.querySelector(".lightbox-close");

  let currentImageIndex = 0;
  let galleryImages = [];

  document.querySelectorAll(".gallery-item").forEach((item, index) => {
    const bgImage = item.style.backgroundImage;
    if (!bgImage) return;

    const imageUrl = bgImage.slice(5, -2);
    const title =
      item.querySelector(".gallery-overlay h3")?.textContent || "Gallery Image";

    galleryImages.push({ url: imageUrl, title: title });

    item.addEventListener("click", () => {
      currentImageIndex = index;
      openLightbox(imageUrl, title);
    });
  });

  function openLightbox(imageSrc, caption) {
    lightbox.classList.add("active");
    lightboxImg.src = imageSrc;
    lightboxCaption.textContent = caption;
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  const prevBtn = document.querySelector(".lightbox-prev");
  const nextBtn = document.querySelector(".lightbox-next");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentImageIndex =
        (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
      const img = galleryImages[currentImageIndex];
      lightboxImg.src = img.url;
      lightboxCaption.textContent = img.title;
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
      const img = galleryImages[currentImageIndex];
      lightboxImg.src = img.url;
      lightboxCaption.textContent = img.title;
    });
  }

  /* ========================================
     KEYBOARD SHORTCUTS
  ======================================== */
  document.addEventListener("keydown", (e) => {
    // Lightbox
    if (lightbox.classList.contains("active")) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft" && prevBtn) prevBtn.click();
      if (e.key === "ArrowRight" && nextBtn) nextBtn.click();
    }

    // Order Modal
    if (orderModal.classList.contains("active")) {
      if (e.key === "Escape") closeOrderModal();
    }

    // Details Modal
    if (detailsModal.classList.contains("active")) {
      if (e.key === "Escape") closeDetailsModal();
    }
  });

  /* ========================================
     TESTIMONIALS INFINITE SLIDER
  ======================================== */
  const testimonialsTrack = document.querySelector(".testimonials-track");
  if (testimonialsTrack) {
    // Clone all cards for infinite loop effect
    const cards = testimonialsTrack.querySelectorAll(".testimonial-card");
    cards.forEach((card) => {
      const clone = card.cloneNode(true);
      testimonialsTrack.appendChild(clone);
    });
  }

  /* ========================================
     NEWSLETTER SUBSCRIPTION - SEND TO WHATSAPP
  ======================================== */
  const newsletterForm = document.getElementById("newsletterForm");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector("input");
      const submitBtn = newsletterForm.querySelector("button");
      const email = emailInput.value.trim();

      if (email) {
        // Create WhatsApp message for newsletter subscription
        let whatsappMessage = `Hello Cozy Cafe!\n\n`;
        whatsappMessage += `--- NEW SUBSCRIBER ---\n\n`;
        whatsappMessage += `I would like to subscribe to your newsletter.\n\n`;
        whatsappMessage += `Email: ${email}\n\n`;
        whatsappMessage += `-------------------\n`;
        whatsappMessage += `Sent from Cozy Cafe Website`;

        // Open WhatsApp (using phoneNumber defined earlier)
        const whatsappURL =
          "https://wa.me/" +
          phoneNumber +
          "?text=" +
          encodeURIComponent(whatsappMessage);
        window.open(whatsappURL, "_blank");

        // Show success feedback
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Subscribed!";
        submitBtn.style.background = "#4CAF50";
        emailInput.value = "";

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = "";
        }, 3000);
      }
    });
  }

  /* ========================================
     DYNAMIC OPEN/CLOSED STATUS
  ======================================== */
  function updateOpenStatus() {
    const statusElement = document.querySelector(".footer-status");
    if (!statusElement) return;

    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1-6 = Mon-Sat
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours + minutes / 60;

    // Opening hours
    // Mon-Sat: 7:00 AM - 11:00 PM (7-23)
    // Sunday: 7:00 AM - 10:00 PM (7-22)

    let isOpen = false;
    let closingTime = "";

    if (day === 0) {
      // Sunday: 7AM - 10PM
      if (currentTime >= 7 && currentTime < 22) {
        isOpen = true;
        closingTime = "10:00 PM";
      }
    } else {
      // Mon-Sat: 7AM - 11PM
      if (currentTime >= 7 && currentTime < 23) {
        isOpen = true;
        closingTime = "11:00 PM";
      }
    }

    const statusDot = statusElement.querySelector(".status-dot");
    const statusText = statusElement.querySelector("span:last-child");

    if (isOpen) {
      statusElement.style.background = "rgba(76, 175, 80, 0.2)";
      statusElement.style.color = "#81C784";
      statusDot.style.background = "#4CAF50";
      statusText.textContent = "We're Open Now!";
    } else {
      statusElement.style.background = "rgba(244, 67, 54, 0.2)";
      statusElement.style.color = "#E57373";
      statusDot.style.background = "#F44336";
      statusDot.style.animation = "none";
      statusText.textContent = "Currently Closed";
    }
  }

  // Run on page load
  updateOpenStatus();

  // Update every minute
  setInterval(updateOpenStatus, 60000);

  /* ========================================
     CONSOLE BRANDING
  ======================================== */
  console.log(
    "%c☕ Cozy Café Website",
    "font-size:20px;color:#6F4E37;font-weight:bold;font-family:Georgia"
  );
  console.log(
    "%c🇰🇪 WhatsApp Ordering: +254 799 363 883",
    "font-size:14px;color:#25D366;font-weight:bold"
  );
  console.log(
    "%c✨ Crafted with love and coffee",
    "font-size:12px;color:#D4A574;font-style:italic"
  );
});
