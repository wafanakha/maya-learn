document.addEventListener("DOMContentLoaded", function () {
  // Mengambil semua tombol upload dan input file
  const uploadBtns = document.querySelectorAll(".add-image-btn");
  const thumbnailInputs = document.querySelectorAll(".thumbnail-input");

  console.log("Upload buttons: ", uploadBtns); // Debugging
  console.log("Thumbnail inputs: ", thumbnailInputs); // Debugging

  // Memastikan bahwa tombol upload dan input file terhubung dengan benar
  uploadBtns.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      console.log(`Tombol upload ${index + 1} diklik!`); // Debugging
      thumbnailInputs[index].click(); // Membuka input file terkait
    });
  });

  // Menangani perubahan pada setiap input file
  thumbnailInputs.forEach((input, index) => {
    input.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file) {
        console.log(`File yang dipilih untuk input ${index + 1}:`, file.name); // Debugging

        // Membaca file dan menampilkan preview
        const reader = new FileReader();
        reader.onload = function (e) {
          const imgPreview = document.createElement("img");
          imgPreview.src = e.target.result;
          imgPreview.style.maxWidth = "200px";
          imgPreview.style.maxHeight = "200px";
          document.body.appendChild(imgPreview); // Menampilkan gambar di halaman
        };
        reader.readAsDataURL(file); // Membaca file sebagai URL untuk preview
      }
    });
  });
});
