// password

// Ambil elemen input password dan ikon
const passwordInput = document.getElementById("password");
const eyeIcon = document.getElementById("eye-icon");

// Tambahkan event listener untuk ikon mata
eyeIcon.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    // Jika password tersembunyi, tampilkan
    passwordInput.type = "text";
    eyeIcon.src = "assets/img/eye-open.png"; // Ubah ikon ke "mata terbuka"
  } else {
    // Jika password terlihat, sembunyikan
    passwordInput.type = "password";
    eyeIcon.src = "assets/img/eye-close.png"; // Ubah ikon ke "mata tertutup"
  }
});

// tampilan informasi  "Link Reset akan dikirim di Email Anda"
function showAlert() {
  // Buat elemen modal
  const modal = document.createElement("div");
  modal.className = "custom-modal"; // Tambahkan kelas CSS

  //  teks ke modal
  const message = document.createElement("p");
  message.textContent = "Link Reset akan dikirim di Email Anda";
  modal.appendChild(message);

  // Tambahkan tombol OK ke modal
  const button = document.createElement("button");
  button.textContent = "Ok";
  button.onclick = function () {
    document.body.removeChild(modal); // Hapus modal saat tombol diklik
  };
  modal.appendChild(button);

  // Tambahkan modal ke body
  document.body.appendChild(modal);
}
