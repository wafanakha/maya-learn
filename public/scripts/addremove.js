document.addEventListener("DOMContentLoaded", () => {
  const subjudulContainer = document.getElementById("subjudul-container");
  const addBtn = document.getElementById("add-btn");
  const removeBtn = document.getElementById("remove-btn");

  // Fungsi untuk membuat sub judul
  const createSubjudul = () => {
    const subjudulCard = document.createElement("div");
    subjudulCard.className = "subjudul-card";

    // Input sub judul
    const subjudulInput = document.createElement("input");
    subjudulInput.className = "subjudul-input";
    subjudulInput.setAttribute("type", "text");
    subjudulInput.setAttribute("name", "stepTitle");
    subjudulInput.setAttribute("placeholder", "Subjudul");

    // Textarea deskripsi
    const deskripsiWrapper = document.createElement("div");
    deskripsiWrapper.className = "deskripsi-wrapper";

    const deskripsiArea = document.createElement("textarea");
    deskripsiArea.className = "deskripsi-area";
    deskripsiArea.setAttribute("placeholder", "Deskripsi");
    deskripsiArea.setAttribute("name", "stepText");

    // Tombol tambah gambar
    const addImageBtn = document.createElement("button");
    addImageBtn.className = "add-image-btn";
    addImageBtn.setAttribute("type", "button");

    const addImageIcon = document.createElement("img");
    addImageIcon.setAttribute(
      "src",
      "https://img.icons8.com/material-outlined/24/000000/add-image.png"
    );
    addImageIcon.setAttribute("alt", "Tambahkan Gambar");

    // Input file tersembunyi
    const fileInput = document.createElement("input");
    fileInput.className = "upload-input";
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("name", "stepImg");
    fileInput.setAttribute("accept", "image/*");
    fileInput.style.display = "none"; // Sembunyikan input file

    // Event listener untuk tombol tambah gambar
    addImageBtn.addEventListener("click", () => {
      fileInput.click();
    });

    // Event listener untuk input file
    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        console.log("File yang dipilih:", file.name);
        // Tambahkan logika untuk menampilkan pratinjau atau mengunggah file
      }
    });

    // Tambahkan elemen ke dalam wrapper
    addImageBtn.appendChild(addImageIcon);
    deskripsiWrapper.appendChild(deskripsiArea);
    deskripsiWrapper.appendChild(addImageBtn);
    deskripsiWrapper.appendChild(fileInput);
    subjudulCard.appendChild(subjudulInput);
    subjudulCard.appendChild(deskripsiWrapper);

    return subjudulCard;
  };

  // Tambahkan sub judul saat tombol add diklik
  addBtn.addEventListener("click", () => {
    const newSubjudul = createSubjudul();
    subjudulContainer.appendChild(newSubjudul); // Tambahkan ke container
  });

  // Hapus sub judul terakhir saat tombol remove diklik
  removeBtn.addEventListener("click", () => {
    if (subjudulContainer.lastChild) {
      subjudulContainer.removeChild(subjudulContainer.lastChild);
    }
  });
});
