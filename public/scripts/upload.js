const fileInput = document.getElementById("tumb_input");
const formField = document.getElementById("image-field");
const imageContainer = document.createElement("div");
imageContainer.className = "image-container";

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      // Menambahkan gambar sebagai latar belakang deskripsi dengan format square
      imageContainer.style.backgroundImage = `url(${e.target.result})`;
      imageContainer.style.backgroundSize = "contain"; // Use 'contain' to ensure the full image fits inside the container
      imageContainer.style.backgroundPosition = "center"; // Center the image inside the container
      imageContainer.style.backgroundRepeat = "no-repeat"; // Avoid repeating the image
      imageContainer.style.width = "200px"; // Set fixed width for small container
      imageContainer.style.height = "200px"; // Set fixed height to make it square
      imageContainer.style.margin = "0 auto"; // Center the image container itself horizontally

      // Menyembunyikan tombol "Add Image" setelah gambar diunggah
    };
    reader.readAsDataURL(file);
  }
});

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      // Menambahkan gambar sebagai latar belakang deskripsi dengan format square
      imageContainer.style.backgroundImage = `url(${e.target.result})`;
      imageContainer.style.backgroundSize = "contain"; // Use 'contain' to ensure the full image fits inside the container
      imageContainer.style.backgroundPosition = "center"; // Center the image inside the container
      imageContainer.style.backgroundRepeat = "no-repeat"; // Avoid repeating the image
      imageContainer.style.width = "200px"; // Set fixed width for small container
      imageContainer.style.height = "200px"; // Set fixed height to make it square
      imageContainer.style.margin = "0 auto"; // Center the image container itself horizontally

      // Menyembunyikan tombol "Add Image" setelah gambar diunggah
    };
    reader.readAsDataURL(file);
  }
});

formField.appendChild(imageContainer);
