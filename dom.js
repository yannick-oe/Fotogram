const galleryEl = document.querySelector(".gallery");

const dialogEl = document.getElementById("imageDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogImage = document.getElementById("dialogImage");
const dialogCounter = document.getElementById("dialogCounter");

const closeBtn = document.getElementById("closeDialog");
const prevBtn = document.getElementById("prevButton");
const nextBtn = document.getElementById("nextButton");

let currentIndex = 0;
const ANIMATION_MS = 220;

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
    { src: "./img/frozen-tree.jpg", title: "Frozen Tree in Winter", alt: "Frozen Tree in Winter" },
];

function renderGallery() {
    galleryEl.innerHTML = "";

    images.forEach((imgData, index) => {
        const img = document.createElement("img");

        img.src = imgData.src;
        img.alt = imgData.alt || imgData.title || "Image";
        img.dataset.title = imgData.title || "Untitled";

        img.tabIndex = 0;

        img.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openDialogAt(index);
            }
        });

        img.addEventListener("click", () => openDialogAt(index));

        galleryEl.appendChild(img);
    });
}

function getGalleryImages() {
    return document.querySelectorAll(".gallery img");
}

function updateDialog(index) {
    const galleryImages = getGalleryImages();
    const img = galleryImages[index];

    dialogTitle.textContent = img.dataset.title || "Untitled";
    dialogImage.src = img.src;
    dialogImage.alt = img.alt || img.dataset.title || "Image";
    dialogCounter.textContent = `${index + 1}/${galleryImages.length}`;
}

function openDialogAt(index) {
    currentIndex = index;
    updateDialog(currentIndex);

    dialogEl.showModal();
    dialogEl.classList.add("opened");

    closeBtn.focus();
}

function closeDialog() {
    dialogEl.classList.remove("opened");

    window.setTimeout(() => {
        dialogEl.close();
    }, ANIMATION_MS);
}

function showPrev() {
    const galleryImages = getGalleryImages();
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateDialog(currentIndex);
}

function showNext() {
    const galleryImages = getGalleryImages();
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateDialog(currentIndex);
}

function addGalleryListeners() {
    const galleryImages = getGalleryImages();

    galleryImages.forEach((img, index) => {
        img.addEventListener("click", () => openDialogAt(index));
    });
}

closeBtn.addEventListener("click", closeDialog);
prevBtn.addEventListener("click", showPrev);
nextBtn.addEventListener("click", showNext);

dialogEl.addEventListener("cancel", (e) => {
    e.preventDefault();
    closeDialog();
});

document.addEventListener("keydown", (e) => {
    if (!dialogEl.open) return;

    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "Escape") closeDialog();
});

dialogEl.addEventListener("click", (e) => {
    if (e.target === dialogEl) closeDialog();
});

renderGallery();
addGalleryListeners();