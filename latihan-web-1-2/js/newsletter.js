
const newsletterCheckbox = document.querySelector("#newsletter");
const newsletterStatus = document.querySelector("#newsletter-status");
const tombolSimpan = document.querySelector("#simpan-preferensi");
const hapusPreferensi = document.querySelector("#hapus-preferensi");

const NEWSLETTER_KEY = "kopi-nusantara-newsletter";

// Fungsi menyimpan preferensi
function simpanPreferensiNewsletter() {
  const preferensi = {
    menerimaPromo: newsletterCheckbox.checked
  };

  try {
    localStorage.setItem(
      NEWSLETTER_KEY,
      JSON.stringify(preferensi)
    );

    newsletterStatus.textContent =
      "Preferensi berhasil disimpan.";
  } catch (error) {
    newsletterStatus.textContent =
      "Preferensi gagal disimpan.";
    console.warn("Gagal menyimpan preferensi.", error);
  }
}

// Fungsi memuat preferensi
function muatPreferensiNewsletter() {
  try {
    const tersimpan = localStorage.getItem(NEWSLETTER_KEY);

    if (!tersimpan) return;

    const preferensi = JSON.parse(tersimpan);

    newsletterCheckbox.checked =
      Boolean(preferensi.menerimaPromo);
  } catch (error) {
    newsletterStatus.textContent =
      "Preferensi tidak dapat dibaca.";
    console.warn("Gagal membaca preferensi.", error);
  }
}

// Fungsi menghapus preferensi
function hapusDataPreferensi() {
  try {
    localStorage.clear();

    newsletterCheckbox.checked = false;

    newsletterStatus.textContent =
      "Semua preferensi berhasil dihapus.";
  } catch (error) {
    newsletterStatus.textContent =
      "Preferensi gagal dihapus.";
    console.warn("Gagal menghapus preferensi.", error);
  }
}

// Tombol simpan
tombolSimpan.addEventListener(
  "click",
  simpanPreferensiNewsletter
);

// Tombol hapus
hapusPreferensi.addEventListener(
  "click",
  hapusDataPreferensi
);

// Memuat data saat halaman dibuka
muatPreferensiNewsletter();
