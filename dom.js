const galleryContainer = document.getElementById("gallery");

const dialog = document.getElementById("imageDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogImage = document.getElementById("dialogImage");
const dialogCounter = document.getElementById("dialogCounter");

const closeBtn = document.getElementById("closeDialog");
const prevBtn = document.getElementById("prevButton");
const nextBtn = document.getElementById("nextButton");

let currentIndex = 0;

const images = [
  { src: "./img/glacier-lake.jpg", title: "Glacier Lake in Alaska", alt: "Glacier Lake in Alaska" },
  { src: "./img/cyberpunk-city.jpg", title: "Neon City at Night", alt: "Neon City at Night" },
  { src: "./img/storm-clouds.jpg", title: "Dramatic Storm Clouds", alt: "Dramatic Storm Clouds" },
  { src: "./img/blue-tit-branch.jpg", title: "Blue Tit on a Branch", alt: "Blue Tit on a Branch" },
  { src: "./img/hurricane-eye.jpg", title: "Eye of the Storm", alt: "Eye of the Storm" },
  { src: "./img/mountain-lake-winter.jpg", title: "Winter Mountain Lake", alt: "Winter Mountain Lake" },
  { src: "./img/duck-on-water.jpg", title: "Duck on Calm Water", alt: "Duck on Calm Water" },
  { src: "./img/man-on-rock.jpg", title: "Lonely Figure at Sea", alt: "Lonely Figure at Sea" },
  { src: "./img/small-bird-rock.jpg", title: "Bird Resting on a Rock", alt: "Bird Resting on a Rock" },
  { src: "./img/snow-leopard-cub.jpg", title: "Snow Leopard Cub", alt: "Snow Leopard Cub" },
  { src: "./img/mountain-sky.jpg", title: "Mountain Peaks", alt: "Mountain Peaks under Blue Sky" },
  { src: "./img/frozen-tree.jpg", title: "Frozen Tree in Winter", alt: "Frozen Tree in Winter" }
];

function renderGallery() {
  let html = "";

  for (let i = 0; i < images.length; i++) {
    html += codeHTML(i);
  }

  function codeHTML(i) {
    return `
      <button
        class="thumb"
        type="button"
        onclick="openDialogAt(${i})"
        aria-label="Open image: ${images[i].title}"
      >
        <img src="${images[i].src}" alt="${images[i].alt}">
      </button>
    `;
  }

  galleryContainer.innerHTML = html;
}

function updateDialog(index) {
  const img = images[index];

  dialogTitle.textContent = img.title;
  dialogImage.src = img.src;
  dialogImage.alt = img.alt;
  dialogCounter.textContent = (index + 1) + "/" + images.length;
}

function openDialogAt(index) {
  currentIndex = index;
  updateDialog(currentIndex);

  dialog.showModal();
  dialog.classList.add("opened");
  document.body.classList.add("no-scroll");
  closeBtn.focus();
}

function closeDialog() {
  dialog.classList.remove("opened");
  dialog.close();
  document.body.classList.remove("no-scroll");
}

function changeSlide(step) {
  currentIndex = currentIndex + step;

  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }

  if (currentIndex >= images.length) {
    currentIndex = 0;
  }

  updateDialog(currentIndex);
}

function closeDialogByBackdrop(event) {
  if (event.target === dialog) {
    closeDialog();
  }
}

document.addEventListener("keydown", (e) => {
  if (!dialog.open) return;

  if (e.key === "ArrowLeft") changeSlide(-1);
  if (e.key === "ArrowRight") changeSlide(1);
  if (e.key === "Escape") closeDialog();
});

function init() {
  renderGallery();

  closeBtn.onclick = closeDialog;
  prevBtn.onclick = function () { changeSlide(-1); };
  nextBtn.onclick = function () { changeSlide(1); };
}