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

// Fungsi untuk menampilkan produk
function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#ringkasan-produk");

  // Pengaman agar halaman lain tidak mengalami error
  if (!grid || !ringkasan) {
    return;
  }

  let jumlahTersedia = 0;
  let htmlProduk = "";

  daftarProduk.forEach((produk) => {
    // Conditional 1: menentukan status stok
    let statusStok = "";
let kelasStok = "";

if (produk.stok === 0) {
  statusStok = "Habis";
  kelasStok = "habis";
} else if (produk.stok <= 5) {
  statusStok = "Stok terbatas";
  kelasStok = "terbatas";
  jumlahTersedia++;
} else {
  statusStok = "Tersedia";
  kelasStok = "tersedia";
  jumlahTersedia++;
}

    // Conditional 2: menampilkan badge produk unggulan
    let badgeUnggulan = "";

    if (produk.unggulan) {
      badgeUnggulan =
        '<span class="product-badge">Produk unggulan</span>';
    }

    htmlProduk += `
      <article class="product-card">
        <div class="product-content">
          ${badgeUnggulan}
          <h3>${produk.nama}</h3>
          <p>${produk.deskripsi}</p>
          <p>Kategori: ${produk.kategori}</p>
          <p class="price">${formatRupiah(produk.harga)}</p>
          <span class="stock-badge ${kelasStok}">
  ${statusStok}
</span>
        </div>
      </article>
    `;
  });

  grid.innerHTML = htmlProduk;

  ringkasan.textContent =
    `${daftarProduk.length} produk ditampilkan. ` +
    `${jumlahTersedia} produk memiliki stok tersedia.`;

  console.table(daftarProduk);
}

// Jalankan setelah struktur HTML siap
document.addEventListener("DOMContentLoaded", renderProduk);
