 // Data produk UMKM Kopi Nusantara
const daftarProduk = [
  {
    nama: "Kopi Tubruk Signature",
    kategori: "Kopi",
    harga: 38000,
    stok: 12,
    unggulan: true,
    deskripsi: "Kopi dengan rasa kuat dan aroma khas."
  },
  {
    nama: "Cold Brew Aren",
    kategori: "Kopi",
    harga: 30000,
    stok: 0,
    unggulan: true,
    deskripsi: "Kopi dingin dengan manis gula aren."
  },
  {
    nama: "Lemon Tea",
    kategori: "Teh",
    harga: 20000,
    stok: 8,
    unggulan: false,
    deskripsi: "Teh lemon yang segar."
  },
  {
    nama: "Matcha Latte",
    kategori: "Non-kopi",
    harga: 40000,
    stok: 3,
    unggulan: false,
    deskripsi: "Matcha dan susu dengan tekstur lembut."
  }
];

const produkGrid = document.querySelector("#produk-grid");
const produkStatus = document.querySelector("#produk-status");
const tombolFilter = document.querySelectorAll("[data-filter]");

// Format harga ke Rupiah
const formatRupiah = (harga) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(harga);

// Menentukan status stok produk
function statusStok(stok) {
  if (stok === 0) {
    return {
      label: "Habis",
      className: "habis"
    };
  } else if (stok <= 5) {
    return {
      label: "Stok terbatas",
      className: "terbatas"
    };
  } else {
    return {
      label: "Tersedia",
      className: "tersedia"
    };
  }
}

// Membuat elemen kartu produk menggunakan DOM
function buatElemenProduk(produk) {
  const card = document.createElement("article");
  card.classList.add("product-card");

  const content = document.createElement("div");
  content.classList.add("product-content");

  if (produk.unggulan) {
    const badge = document.createElement("span");
    badge.classList.add("product-badge");
    badge.textContent = "Produk unggulan";
    content.append(badge);
  }

  const title = document.createElement("h3");
  title.textContent = produk.nama;

  const description = document.createElement("p");
  description.textContent = produk.deskripsi;

  const category = document.createElement("p");
  category.textContent = "Kategori: " + produk.kategori;

  const price = document.createElement("p");
  price.classList.add("price");
  price.textContent = formatRupiah(produk.harga);

  const stock = document.createElement("span");
  const status = statusStok(produk.stok);

  stock.classList.add("stock-badge");
  stock.classList.add(status.className);
  stock.textContent = status.label;

  const removeButton = document.createElement("button");
removeButton.type = "button";
removeButton.textContent = "Sembunyikan";
removeButton.addEventListener("click", () => {
  card.remove();
});

  content.append(title, description, category, price, stock, removeButton);
  card.append(content);

  return card;
}


// Fungsi untuk menampilkan produk
function buatEmptyState(kategori) {
  const empty = document.createElement("p");
  empty.classList.add("empty-state");
  empty.textContent = `Belum ada produk pada kategori ${kategori}.`;
  return empty;
}

function renderProduk(kategoriAktif = "Semua") {
  if (!produkGrid || !produkStatus) {
    console.warn("Target render produk tidak ditemukan.");
    return;
  }

  const produkDitampilkan = kategoriAktif === "Semua"
    ? daftarProduk
    : daftarProduk.filter(
        (produk) => produk.kategori === kategoriAktif
      );

  // Menghapus tampilan produk sebelumnya
  produkGrid.replaceChildren();

  // Menampilkan pesan jika produk tidak ditemukan
  if (produkDitampilkan.length === 0) {
    produkGrid.append(buatEmptyState(kategoriAktif));
    produkStatus.textContent = "0 produk ditemukan.";
    return;
  }

  // Menampilkan kartu produk
  produkDitampilkan.forEach((produk) => {
    produkGrid.append(buatElemenProduk(produk));
  });

  // Menghitung produk yang memiliki stok
  const produkTersedia = produkDitampilkan.filter(
    (produk) => produk.stok > 0
  );

  produkStatus.textContent =
    `${produkDitampilkan.length} produk ditampilkan. ` +
    `${produkTersedia.length} produk memiliki stok tersedia.`;
}

// Jalankan setelah struktur HTML siap
document.addEventListener("DOMContentLoaded", () => {
  renderProduk();
});


// Mengaktifkan tombol filter produk
tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", (event) => {
    const tombolAktif = event.currentTarget;
    const kategori = tombolAktif.dataset.filter;

    tombolFilter.forEach((item) => {
      item.classList.remove("is-active");
    });

    tombolAktif.classList.add("is-active");

    renderProduk(kategori);
  });
});
