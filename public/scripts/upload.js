document.addEventListener("DOMContentLoaded", function () {
  const uploadBtns = document.querySelectorAll(".add-image-btn");
  const thumbnailInputs = document.querySelectorAll(".thumbnail-input");

  // Menambahkan event listener pada tombol upload
  uploadBtns.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      thumbnailInputs[index].click(); // Membuka input file terkait
    });
  });

  // Menangani perubahan saat file dipilih
  thumbnailInputs.forEach((input, index) => {
    input.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file) {
        // Membaca file dan menampilkan preview (thumbnail)
        const reader = new FileReader();
        reader.onload = function (e) {
          const imgPreview = document.createElement("img");
          imgPreview.src = e.target.result; // Menetapkan data URL gambar
          imgPreview.style.maxWidth = "150px"; // Ukuran gambar
          imgPreview.style.maxHeight = "150px"; // Ukuran gambar

          // Menemukan deskripsi-wrapper yang terkait dengan input ini
          const deskripsiWrapper = input.closest(".deskripsi-wrapper"); // Mencari elemen terdekat dengan kelas .deskripsi-wrapper

          if (deskripsiWrapper) {
            deskripsiWrapper.appendChild(imgPreview); // Menambahkan gambar sebagai preview
          }
        };
        reader.readAsDataURL(file); // Membaca file untuk preview
      }
    });
  });
});
