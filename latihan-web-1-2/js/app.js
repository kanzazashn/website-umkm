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

// Membuat HTML untuk satu kartu produk
function buatKartuProduk(produk) {
  const status = statusStok(produk.stok);

  const badgeUnggulan = produk.unggulan
    ? '<span class="product-badge">Produk unggulan</span>'
    : "";

  return `
    <article class="product-card">
      <div class="product-content">
        ${badgeUnggulan}
        <h3>${produk.nama}</h3>
        <p>${produk.deskripsi}</p>
        <p>Kategori: ${produk.kategori}</p>
        <p class="price">${formatRupiah(produk.harga)}</p>
        <span class="stock-badge ${status.className}">
          ${status.label}
        </span>
      </div>
    </article>
  `;
}

// Fungsi untuk menampilkan produk
function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#ringkasan-produk");

  // Pengaman agar halaman lain tidak mengalami error
  if (!grid || !ringkasan) {
    return;
  }

  // Filter produk yang stoknya tersedia
  const produkTersedia = daftarProduk.filter(
    (produk) => produk.stok > 0
  );

  // Membuat HTML semua kartu produk
  const htmlProduk = daftarProduk
    .map((produk) => buatKartuProduk(produk))
    .join("");

  // Mencari produk unggulan
  const produkUnggulan = daftarProduk.find(
    (produk) => produk.unggulan
  );

  // Menampilkan seluruh kartu produk
  grid.innerHTML = htmlProduk;

  // Memperbarui ringkasan produk
  ringkasan.textContent =
    `${daftarProduk.length} produk ditampilkan. ` +
    `${produkTersedia.length} produk memiliki stok tersedia.`;

  // Menampilkan informasi produk unggulan di Console
  if (produkUnggulan) {
    console.log("Produk unggulan:", produkUnggulan.nama);
  }

  // Menampilkan data produk di Console
  daftarProduk.forEach((produk) => {
    console.log("Produk:", produk.nama);
  });

  console.table(daftarProduk);
}

// Jalankan setelah struktur HTML siap
document.addEventListener("DOMContentLoaded", renderProduk);
