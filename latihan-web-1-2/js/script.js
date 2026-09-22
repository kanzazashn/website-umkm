const promoButton = document.querySelector("#promoButton");

if (promoButton) {
  promoButton.addEventListener("click", () => {
    promoButton.textContent = "Promo: Beli 2 gratis 1!";
    console.log("Promo Kopi Nusa berhasil ditampilkan.");
  });
}

const music = document.querySelector("#galleryMusic");
const musicToggle = document.querySelector("#musicToggle");
const musicProgress = document.querySelector("#musicProgress");
const musicCurrent = document.querySelector("#musicCurrent");
const musicDuration = document.querySelector("#musicDuration");

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

music.addEventListener("loadedmetadata", () => {
  musicDuration.textContent = formatTime(music.duration);
  musicProgress.max = music.duration;
});

if (music.readyState >= 1) {
  musicDuration.textContent = formatTime(music.duration);
  musicProgress.max = music.duration;
} else {
  music.addEventListener("loadedmetadata", () => {
    musicDuration.textContent = formatTime(music.duration);
    musicProgress.max = music.duration;
  });
}

music.addEventListener("timeupdate", () => {
  musicCurrent.textContent = formatTime(music.currentTime);
  musicProgress.value = music.currentTime;
});

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    await music.play();
    musicToggle.textContent = "Ⅱ";
    musicToggle.setAttribute("aria-label", "Jeda musik");
  } else {
    music.pause();
    musicToggle.textContent = "▶";
    musicToggle.setAttribute("aria-label", "Putar musik");
  }
});

musicProgress.addEventListener("input", () => {
  music.currentTime = Number(musicProgress.value);
});

music.addEventListener("ended", () => {
  musicToggle.textContent = "▶";
  musicToggle.setAttribute("aria-label", "Putar musik");
  musicProgress.value = 0;
});

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
  link.addEventListener("click", function () {
    navLinks.forEach(item => {
      item.removeAttribute("aria-current");
    });

    this.setAttribute("aria-current", "page");
  });
});