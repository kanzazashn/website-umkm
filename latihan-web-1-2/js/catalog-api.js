const DATA_URL = "data/products.json";

const catalogStatus = document.querySelector("#catalog-status");
const produkGrid = document.querySelector("#produk-dinamis");
const produkRingkasan = document.querySelector("#produk-ringkasan");
const produkUnggulan = document.querySelector("#produk-unggulan");
const tombolFilter = document.querySelectorAll("[data-filter]");

let products = [];
let activeCategory = "Semua";

// Format harga ke Rupiah
const formatRupiah = (harga) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(harga);

// Menentukan status stok
function statusStok(stok) {
  if (stok === 0) {
    return { label: "Habis", className: "habis" };
  } else if (stok <= 5) {
    return { label: "Stok terbatas", className: "terbatas" };
  } else {
    return { label: "Tersedia", className: "tersedia" };
  }
}

// Mengatur status katalog
function setStatus(state, message) {
  catalogStatus.textContent = message;
  catalogStatus.dataset.state = state;
}

// Membuat kartu produk
function buatElemenProduk(product) {
  const card = document.createElement("article");
  card.classList.add("product-card");

  const content = document.createElement("div");
  content.classList.add("product-content");

  if (product.featured) {
    const badge = document.createElement("span");
    badge.classList.add("product-badge");
    badge.textContent = "Produk unggulan";
    content.append(badge);
  }

  const title = document.createElement("h3");
  title.textContent = product.name;

  const description = document.createElement("p");
  description.textContent = product.description;

  const category = document.createElement("p");
  category.textContent = "Kategori: " + product.category;

  const price = document.createElement("p");
  price.classList.add("price");
  price.textContent = formatRupiah(product.price);

  const stock = document.createElement("span");
  const status = statusStok(product.stock);
  stock.classList.add("stock-badge", status.className);
  stock.textContent = status.label;

  content.append(title, description, category, price, stock);
  card.append(content);

  return card;
}

// Membuat tampilan ketika produk kosong
function createEmptyState() {
  const empty = document.createElement("p");
  empty.classList.add("empty-state");
  empty.textContent = "Belum ada produk pada kategori ini.";
  return empty;
}

// Menampilkan produk
function renderProducts(items) {
  produkGrid.replaceChildren();

  if (items.length === 0) {
    produkGrid.append(createEmptyState());
    produkRingkasan.textContent = "0 produk ditemukan.";
    produkUnggulan.textContent = "Tidak ada produk unggulan.";
    setStatus("empty", "Request berhasil, tetapi data kosong.");
    return;
  }

  items.forEach((product) => {
    produkGrid.append(buatElemenProduk(product));
  });

  const featuredProducts = items.filter(
    (product) => product.featured
  );

  produkRingkasan.textContent =
    `${items.length} produk ditampilkan.`;

  produkUnggulan.textContent =
    featuredProducts.length > 0
      ? "Produk unggulan: " +
        featuredProducts.map((product) => product.name).join(", ")
      : "Tidak ada produk unggulan pada kategori ini.";

  setStatus("success", `${items.length} produk berhasil ditampilkan.`);
}

// Menerapkan filter kategori
function applyFilter(category) {
  activeCategory = category;

  const filtered = category === "Semua"
    ? products
    : products.filter(
        (product) => product.category === category
      );

  renderProducts(filtered);
}

// Mengambil data JSON
async function loadProducts() {
  try {
    setStatus("loading", "Memuat data produk...");

    const response = await fetch(DATA_URL);

    if (!response.ok) {
      throw new Error(`HTTP status ${response.status}`);
    }

    products = await response.json();

    applyFilter(activeCategory);
  } catch (error) {
    produkGrid.replaceChildren();
    produkRingkasan.textContent = "Data produk belum tersedia.";
    produkUnggulan.textContent = "Produk unggulan belum dapat ditampilkan.";
    setStatus("error", `Gagal memuat produk: ${error.message}`);
    console.error("Kesalahan memuat katalog:", error);
  }
}

// Mengaktifkan tombol filter
tombolFilter.forEach((button) => {
  button.addEventListener("click", (event) => {
    tombolFilter.forEach((item) => {
      item.classList.remove("is-active");
    });

    event.currentTarget.classList.add("is-active");

    applyFilter(event.currentTarget.dataset.filter ?? "Semua");
  });
});

// Menjalankan pemuatan data
loadProducts();
