const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar .nav-link[href^='#']");
const toggleBtn = document.getElementById("theme-toggle-button");
const htmlEl = document.documentElement;
const savedTheme = localStorage.getItem("theme");
const searchIcon = document.getElementById("search-icon");
const searchInput = document.querySelector(".search-input");
const searchList = document.querySelector(".search-list");
const searchItems = searchList.querySelectorAll("li");
const hero = document.querySelector(".hero-section");
const dots = document.querySelectorAll(".hero-dot");
const navbar = document.querySelector(".main-navbar");
const heroSection = document.querySelector(".hero-section");
const playBtn = document.getElementById("playBtn");
const icon = playBtn.querySelector("i");
const tabs = document.querySelectorAll(".doaa .nav-link");
const contents = document.querySelectorAll(".doaa-content .box");
const track = document.querySelector(".slider-track");
const cards = document.querySelectorAll(".card");
const prev = document.querySelector(".arrow.left");
const next = document.querySelector(".arrow.right");
const dotts = document.querySelectorAll(".dot");
const visibleCards = 4;
let index = 0;
let searchOpen = false;

///// NAV LINKS /////
window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

///// OPEN ICONS /////
document.querySelectorAll(".volumeBtn").forEach((volumeBtn) => {
  let isMuted = false;

  volumeBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    isMuted = !isMuted;

    if (isMuted) {
      volumeBtn.classList.remove("fa-volume-high");
      volumeBtn.classList.add("fa-volume-xmark");
    } else {
      volumeBtn.classList.remove("fa-volume-xmark");
      volumeBtn.classList.add("fa-volume-high");
    }
  });
});

document.querySelectorAll(".playBtn").forEach((playBtn) => {
  playBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    const viewer = playBtn.closest(".image-viewer");
    if (!viewer) return;

    viewer.classList.add("video-open");

    if (playBtn.classList.contains("fa-play")) {
      playBtn.classList.remove("fa-play");
      playBtn.classList.add("fa-circle-play");
    } else {
      playBtn.classList.remove("fa-circle-play");
      playBtn.classList.add("fa-play");
    }
  });
});

///// START VIDEO ////////
document.addEventListener("DOMContentLoaded", () => {
  const openViewer = document.getElementById("openViewer");
  const imageViewer = document.getElementById("imageViewer");
  const closeViewer = document.getElementById("closeViewer");

  if (!openViewer || !imageViewer || !closeViewer) {
    console.log("none");
    return;
  }

  openViewer.addEventListener("click", () => {
    imageViewer.classList.add("show");
  });

  closeViewer.addEventListener("click", () => {
    imageViewer.classList.remove("show");
  });
});

//////// TOGGLE BUTTON ////////
if (savedTheme === "dark") {
  htmlEl.classList.add("dark");
  toggleBtn.setAttribute("aria-pressed", "true");
} else {
  htmlEl.classList.remove("dark");
  toggleBtn.setAttribute("aria-pressed", "false");
}

toggleBtn.addEventListener("click", () => {
  const isDark = htmlEl.classList.toggle("dark");

  toggleBtn.setAttribute("aria-pressed", isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

//////// SEARCH BOX ////////
searchIcon.addEventListener("click", (e) => {
  e.stopPropagation();

  searchOpen = !searchOpen;

  if (searchOpen) {
    searchInput.classList.add("show");
    searchInput.focus();
    searchList.style.display = "block";
  } else {
    closeSearch();
  }
});

searchInput.addEventListener("focus", () => {
  searchList.style.display = "block";
});

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  let hasResults = false;

  searchItems.forEach((item) => {
    const match = item.textContent.toLowerCase().includes(value);
    item.style.display = match ? "block" : "none";
    if (match) hasResults = true;
  });

  searchList.style.display = hasResults ? "block" : "none";
});

searchItems.forEach((item) => {
  item.addEventListener("click", () => {
    searchInput.value = item.textContent;
    closeSearch();
  });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-box")) {
    closeSearch();
  }
});

function closeSearch() {
  searchOpen = false;
  searchInput.classList.remove("show");
  searchList.style.display = "none";
  searchInput.value = "";

  searchItems.forEach((item) => {
    item.style.display = "block";
  });
}

//////// HEADER IMAGES ////////
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const img = dot.getAttribute("data-img");

    hero.style.setProperty("--hero-bg", `url("${img}")`);

    dots.forEach((d) => d.classList.remove("active"));
    dot.classList.add("active");
  });
});

//////// FIXED NAVBAR ////////
window.addEventListener("scroll", () => {
  const heroBottom = heroSection.offsetHeight;

  if (window.scrollY > heroBottom - 0) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});

//////// VIDEO PAUSE  ////////
playBtn.addEventListener("click", () => {
  playBtn.classList.toggle("playing");

  if (playBtn.classList.contains("playing")) {
    icon.classList.replace("fa-play", "fa-pause");
  } else {
    icon.classList.replace("fa-pause", "fa-play");
  }
});

//////// NAVS && TABS ////////
tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    e.preventDefault();

    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    const type = tab.dataset.type;

    contents.forEach((box) => box.classList.remove("active"));

    contents.forEach((box) => {
      if (box.dataset.content === type) {
        box.classList.add("active");
      }
    });
  });
});

///// OPEN PHOTOS && VIDEOS

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", (e) => {
      const targetCard = e.target.closest(".card[data-viewer]");
      if (!targetCard) return;

      const viewerId = targetCard.dataset.viewer;
      const viewer = document.getElementById(viewerId);
      if (viewer) {
        viewer.classList.add("show");
        document.body.style.overflow = "hidden";
      }
    });
  });

  document.querySelectorAll(".image-viewer .close-icon").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const viewer = btn.closest(".image-viewer");
      viewer.classList.remove("show");
      document.body.style.overflow = "auto";
    });
  });

  document.querySelectorAll(".image-viewer").forEach((viewer) => {
    viewer.addEventListener("click", () => {
      viewer.classList.remove("show");
      document.body.style.overflow = "auto";
    });

    viewer
      .querySelector(
        ".image-box-five, .image-box-six, .image-box-seven, .image-box-eight, .image-box-nine, .image-box-ten, .image-box-eleven"
      )
      ?.addEventListener("click", (e) => {
        e.stopPropagation();
      });
  });

  document.querySelectorAll(".box").forEach((box) => {
    const track = box.querySelector(".slider-track");
    const cards = box.querySelectorAll(".card");
    const prev = box.querySelector(".arrow.left");
    const next = box.querySelector(".arrow.right");
    const dotts = box.querySelectorAll(".dot");

    let currentTranslate = 0;
    const gap = 25;
    const visibleCards = 3;

    function updateSlider() {
      const cardWidth = cards[0].offsetWidth;
      const step = cardWidth + gap;

      const visibleWidth = track.parentElement.offsetWidth;
      const totalWidth = track.scrollWidth;

      const maxTranslate = Math.max(0, totalWidth - visibleWidth);

      if (currentTranslate < 0) currentTranslate = 0;
      if (currentTranslate > maxTranslate) currentTranslate = maxTranslate;

      track.style.transform = `translateX(-${currentTranslate}px)`;

      const activeIndex = Math.round(currentTranslate / step);
      dotts.forEach((dot) => dot.classList.remove("active"));
      if (dotts[activeIndex]) dotts[activeIndex].classList.add("active");

      prev.classList.toggle("disabled", currentTranslate === 0);
      next.classList.toggle("disabled", currentTranslate === maxTranslate);
    }

    next.addEventListener("click", () => {
      const cardWidth = cards[0].offsetWidth + gap;
      currentTranslate += cardWidth;
      updateSlider();
    });

    prev.addEventListener("click", () => {
      const cardWidth = cards[0].offsetWidth + gap;
      currentTranslate -= cardWidth;
      updateSlider();
    });

    dotts.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        const cardWidth = cards[0].offsetWidth + gap;
        currentTranslate = i * cardWidth;
        updateSlider();
      });
    });

    updateSlider();
  });
});

///// TESTIMONIALS /////
document.querySelectorAll(".slider-box").forEach((slider) => {
  const track = slider.querySelector(".slider-track");
  const cards = slider.querySelectorAll(".carrdd");
  const prev = slider.querySelector(".arrow.left");
  const next = slider.querySelector(".arrow.right");
  const dots = slider.querySelectorAll(".dot");
  let currentIndex = 0;
  const gap = 25;
  const visibleCards = 3;

  function updateSlider() {
    const cardWidth = cards[0].offsetWidth + gap;
    const maxIndex = cards.length - visibleCards;

    currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));

    track.style.transform = `translateX(${currentIndex * cardWidth}px)`;

    dots.forEach((d) => d.classList.remove("active"));
    if (dots[currentIndex]) dots[currentIndex].classList.add("active");

    prev.classList.toggle("disabled", currentIndex === 0);
    next.classList.toggle("disabled", currentIndex === maxIndex);
  }

  next.addEventListener("click", () => {
    currentIndex++;
    updateSlider();
  });

  prev.addEventListener("click", () => {
    currentIndex--;
    updateSlider();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      currentIndex = i;
      updateSlider();
    });
  });

  updateSlider();
});
