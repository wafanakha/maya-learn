// Mengambil elemen tombol dan carousel
const carousel = document.querySelector(".carousel");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

// Fungsi untuk memperbarui status tombol
const updateButtons = () => {
  prevButton.disabled = carousel.scrollLeft === 0;
  nextButton.disabled = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth;
};

// Event listener untuk tombol navigasi
prevButton.addEventListener("click", () => {
  carousel.scrollBy({ left: -100, behavior: "smooth" });
});

nextButton.addEventListener("click", () => {
  carousel.scrollBy({ left: 100, behavior: "smooth" });
});

// Event listener untuk memperbarui tombol saat scrolling
carousel.addEventListener("scroll", updateButtons);
