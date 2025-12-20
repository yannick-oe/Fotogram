const galleryImages = document.querySelectorAll(".gallery img");

const dialogEl = document.getElementById("imageDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogImage = document.getElementById("dialogImage");
const dialogCounter = document.getElementById("dialogCounter");

const closeBtn = document.getElementById("closeDialog");
const prevBtn = document.getElementById("prevButton");
const nextBtn = document.getElementById("nextButton");

let currentIndex = 0;

function updateDialog(index) {
  const img = galleryImages[index];

  dialogTitle.textContent = img.dataset.title;
  dialogImage.src = img.src;
  dialogImage.alt = img.dataset.title;
  dialogCounter.textContent = `${index + 1}/${galleryImages.length}`;
}

function openDialogAt(index) {
  currentIndex = index;
  updateDialog(currentIndex);
  dialogEl.showModal();
}

function closeDialog() {
  dialogEl.close();
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  updateDialog(currentIndex);
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  updateDialog(currentIndex);
}

galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => openDialogAt(index));
});

closeBtn.addEventListener("click", closeDialog);
prevBtn.addEventListener("click", showPrev);
nextBtn.addEventListener("click", showNext);