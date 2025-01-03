document.addEventListener("DOMContentLoaded", () => {
  const subjudulContainer = document.getElementById("subjudul-container");
  const addBtn = document.getElementById("add-btn");
  const removeBtn = document.getElementById("remove-btn");

  // Fungsi untuk membuat elemen subjudul baru
  const createSubjudul = () => {
    // Container utama untuk subjudul
    const subjudulCard = document.createElement("div");
    subjudulCard.className = "subjudul-card";

    // Input subjudul
    const subjudulInput = document.createElement("input");
    subjudulInput.className = "subjudul-input";
    subjudulInput.setAttribute("type", "text");
    subjudulInput.setAttribute("name", "stepTitle");
    subjudulInput.setAttribute("placeholder", "Subjudul");

    // Wrapper deskripsi
    const deskripsiWrapper = document.createElement("div");
    deskripsiWrapper.className = "deskripsi-wrapper";

    // Container untuk gambar (top part of the deskripsiWrapper)
    const imageContainer = document.createElement("div");
    imageContainer.className = "image-container"; // Add class for image container

    // Textarea deskripsi
    const deskripsiArea = document.createElement("textarea");
    deskripsiArea.className = "deskripsi-area";
    deskripsiArea.setAttribute("placeholder", "Deskripsi");
    deskripsiArea.setAttribute("name", "stepText");

    // Tombol tambah gambar
    const addImageBtn = document.createElement("button");
    addImageBtn.className = "add-image-btn";
    addImageBtn.setAttribute("type", "button");

    // Ikon untuk tombol tambah gambar
    const addImageIcon = document.createElement("img");
    addImageIcon.setAttribute(
      "src",
      "https://img.icons8.com/material-outlined/24/000000/add-image.png"
    );
    addImageIcon.setAttribute("alt", "Tambahkan Gambar");
    addImageIcon.style.width = "24px";
    addImageIcon.style.height = "24px";

    // Tambahkan ikon ke dalam tombol
    addImageBtn.appendChild(addImageIcon);

    // Input file tersembunyi untuk unggah gambar
    const fileInput = document.createElement("input");
    fileInput.className = "upload-input";
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("name", "stepImg");
    fileInput.setAttribute("accept", "image/*");
    fileInput.setAttribute("value", " ");
    fileInput.style.display = "none"; // Sembunyikan input file

    const myFile = new File(["Hello World!"], "myFile.txt", {
      type: "text/plain",
      lastModified: new Date(),
    });

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(myFile);
    fileInput.files = dataTransfer.files;

    // Event listener untuk membuka file input saat tombol tambah gambar diklik
    addImageBtn.addEventListener("click", () => {
      fileInput.click();
    });

    // Event listener untuk menangani file yang dipilih
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
          addImageBtn.style.display = "none";
        };
        reader.readAsDataURL(file);
      }
    });

    // Menambahkan jarak antara gambar dan deskripsi
    deskripsiArea.style.marginTop = "10px"; // Add margin between image and description

    // Pastikan textarea tetap aktif untuk mengetik
    deskripsiArea.addEventListener("input", () => {
      deskripsiArea.style.color = "#000"; // Set teks terlihat di atas gambar
    });

    // Susun elemen-elemen ke dalam wrapper
    deskripsiWrapper.appendChild(imageContainer); // Add image container
    deskripsiWrapper.appendChild(deskripsiArea); // Add textarea for description
    deskripsiWrapper.appendChild(addImageBtn);
    deskripsiWrapper.appendChild(fileInput);
    subjudulCard.appendChild(subjudulInput);
    subjudulCard.appendChild(deskripsiWrapper);

    return subjudulCard;
  };

  subjudulContainer.appendChild(createSubjudul());
  subjudulContainer.appendChild(createSubjudul());

  // Tambahkan subjudul baru saat tombol tambah diklik
  addBtn.addEventListener("click", () => {
    const newSubjudul = createSubjudul();
    subjudulContainer.appendChild(newSubjudul);
  });

  // Hapus subjudul terakhir saat tombol hapus diklik
  removeBtn.addEventListener("click", () => {
    if (subjudulContainer.lastChild) {
      subjudulContainer.removeChild(subjudulContainer.lastChild);
    }
  });
});
