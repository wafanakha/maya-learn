const addButton = document.getElementById("add-btn");
const removeButton = document.getElementById("remove-btn");
const subjudulContainer = document.getElementById("subjudul-container");

function createSubjudul() {
  const subjudulCard = document.createElement("div");
  subjudulCard.className = "subjudul-card";

  const subjudulInput = document.createElement("input");
  subjudulInput.type = "text";
  subjudulInput.className = "subjudul-input";
  subjudulInput.placeholder = "Sub Judul";

  const deskripsiWrapper = document.createElement("div");
  deskripsiWrapper.className = "deskripsi-wrapper";

  const deskripsiArea = document.createElement("textarea");
  deskripsiArea.className = "deskripsi-area";
  deskripsiArea.placeholder = "Deskripsi";

  deskripsiWrapper.appendChild(deskripsiArea);

  const addImageButton = document.createElement("button");
  addImageButton.className = "add-image-btn";

  const addImageIcon = document.createElement("img");
  addImageIcon.src = "https://img.icons8.com/material-outlined/24/000000/add-image.png";
  addImageIcon.alt = "Tambahkan Gambar";

  addImageButton.appendChild(addImageIcon);

  subjudulCard.appendChild(subjudulInput);
  subjudulCard.appendChild(deskripsiWrapper);
  subjudulCard.appendChild(addImageButton);

  return subjudulCard;
}

addButton.addEventListener("click", () => {
  const newSubjudul = createSubjudul();
  subjudulContainer.appendChild(newSubjudul);
});

removeButton.addEventListener("click", () => {
  if (subjudulContainer.lastChild) {
    subjudulContainer.removeChild(subjudulContainer.lastChild);
  } else {
    alert("Tidak ada subjudul yang dapat dihapus!");
  }
});
