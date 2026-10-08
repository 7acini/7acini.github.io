const photoImages = document.querySelectorAll(".photo-frame img");

photoImages.forEach((image) => {
  const markAsLoaded = () => image.classList.add("is-loaded");

  if (image.complete && image.naturalWidth > 0) {
    markAsLoaded();
  } else {
    image.addEventListener("load", markAsLoaded, { once: true });
  }
});

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const revealElements = document.querySelectorAll(".reveal");

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px" },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

const dialog = document.querySelector(".surprise-dialog");
const surpriseButton = document.querySelector("[data-surprise]");
const closeDialogButton = document.querySelector("[data-close-dialog]");

surpriseButton.addEventListener("click", () => {
  dialog.showModal();
  document.body.classList.add("dialog-open");
});

const closeDialog = () => {
  dialog.close();
  document.body.classList.remove("dialog-open");
};

closeDialogButton.addEventListener("click", closeDialog);
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeDialog();
});
dialog.addEventListener("close", () =>
  document.body.classList.remove("dialog-open"),
);

const loveButton = document.querySelector("[data-love-button]");
const heartLayer = document.querySelector(".heart-layer");

loveButton.addEventListener("click", () => {
  const heartCount = reducedMotion ? 1 : 28;

  for (let index = 0; index < heartCount; index += 1) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = index % 3 === 0 ? "♥" : "♡";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${1 + Math.random() * 2.2}rem`;
    heart.style.setProperty("--drift", `${-90 + Math.random() * 180}px`);
    heart.style.setProperty("--rotation", `${-80 + Math.random() * 160}deg`);
    heart.style.setProperty("--duration", `${2.7 + Math.random() * 2.3}s`);
    heart.style.animationDelay = `${Math.random() * 0.8}s`;
    heartLayer.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove(), {
      once: true,
    });
  }

  loveButton.textContent = "Eu te amo, Dandara!";
  window.setTimeout(() => {
    loveButton.textContent = "Espalhar amor";
  }, 3500);
});
