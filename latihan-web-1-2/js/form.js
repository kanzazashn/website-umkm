const form = document.querySelector("#form-kontak");
const preview = document.querySelector("#preview-form");
const formFeedback = document.querySelector("#form-feedback");

const STORAGE_KEY = "kopi-nusa-preferensi-kontak";

const fields = ["nama", "email", "telepon", "paket", "pesan", "setuju"].map(
  (id) => document.querySelector(`#${id}`)
);

const topikInputs = document.querySelectorAll('input[name="topik"]');

function getFieldError(field) {
  const validity = field.validity;

  if (validity.valueMissing) return "Bagian ini wajib diisi.";
  if (validity.typeMismatch) return "Format data belum sesuai.";
  if (validity.tooShort) {
    return `Isi minimal ${field.minLength} karakter.`;
  }
  if (validity.patternMismatch) {
    return "Format belum sesuai contoh yang diminta.";
  }

  return "";
}

function tampilkanError(field, pesan) {
  const errorElement = document.querySelector(`#${field.id}-error`);

  field.setCustomValidity(pesan);
  field.setAttribute("aria-invalid", pesan ? "true" : "false");

  if (errorElement) {
    errorElement.textContent = pesan;
  }
}

function validasiField(field) {
  field.setCustomValidity("");

  const pesan = getFieldError(field);
  tampilkanError(field, pesan);

  return !pesan;
}

function validasiTopik() {
  const topikDipilih = document.querySelector(
    'input[name="topik"]:checked'
  );

  const inputPertama = topikInputs[0];
  const errorElement = document.querySelector("#topik-error");

  const pesan = topikDipilih ? "" : "Silakan pilih salah satu topik.";

  inputPertama.setCustomValidity(pesan);

  if (errorElement) {
    errorElement.textContent = pesan;
  }

  return !pesan;
}

function simpanPreferensi() {
  const data = new FormData(form);

  const preferensi = {
    paket: data.get("paket"),
    topik: data.get("topik"),
    updatedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferensi));
  } catch (error) {
    console.warn("Preferensi gagal disimpan.", error);
  }
}

function muatPreferensi() {
  try {
    const tersimpan = localStorage.getItem(STORAGE_KEY);

    if (!tersimpan) return;

    const preferensi = JSON.parse(tersimpan);

    document.querySelector("#paket").value = preferensi.paket ?? "";

    topikInputs.forEach((input) => {
      input.checked = input.value === preferensi.topik;
    });
  } catch (error) {
    console.warn("Preferensi tidak dapat dibaca.", error);
  }
}

fields.forEach((field) => {
  field.addEventListener("input", () => validasiField(field));
  field.addEventListener("change", () => validasiField(field));
});

topikInputs.forEach((input) => {
  input.addEventListener("change", validasiTopik);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let semuaValid = true;

  fields.forEach((field) => {
    if (!validasiField(field)) {
      semuaValid = false;
    }
  });

  if (!validasiTopik()) {
    semuaValid = false;
  }

  if (!semuaValid || !form.checkValidity()) {
    form.reportValidity();

    const fieldTidakValid = form.querySelector(":invalid");

    if (fieldTidakValid) {
      fieldTidakValid.focus();
    }

    formFeedback.textContent = "Periksa kembali data yang masih belum benar.";
    formFeedback.className = "form-feedback";
    return;
  }

  const data = new FormData(form);

  preview.textContent = [
    `Nama: ${data.get("nama")}`,
    `Email: ${data.get("email")}`,
    `WhatsApp: ${data.get("telepon")}`,
    `Paket: ${data.get("paket")}`,
    `Topik: ${data.get("topik")}`,
    `Waktu kontak: ${data.get("waktu") || "-"}`,
    `Pesan: ${data.get("pesan")}`,
  ].join("\n");

  simpanPreferensi();

  formFeedback.textContent = "Data berhasil divalidasi dan preview ditampilkan.";
  formFeedback.className = "form-feedback success";
});

muatPreferensi();
