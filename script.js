// Daftar produk dengan gambar
const products = [
    { id: 1, name: 'SLAI OLAI', price: 2000, img: 'img/slai-olai.jpeg'},
    { id: 2, name: 'GERY SALUUT WAFER', price: 1000, img: 'img/gery-salut-wafer.jpeg'},
    { id: 3, name: 'GERY SALUUT MALKIS', price: 2000, img: 'img/gery-salut-malkis.jpeg'},
    { id: 4, name: 'BENG-BENG', price: 2000, img: 'img/beng-beng.jpeg'},
    { id: 5, name: 'ROMA SARI GANDUM', price: 1000, img: 'img/roma-sari-gandum.jpeg'}
];

// keranjang belanja
let cart = [];

// Fungsi untuk menampilkan daftar produk
function displayProducts() {
    const productscontainer = document.getElementById('products');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
           <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Rp ${product.price}</p>
            <button onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
        `;
        productscontainer.appendChild(productDiv);
    });
}

// Fungsi untuk menambah produk ke keranjang belanja
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Fungsi untuk menampilkan isi keranjang belanja
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML ='';


    let totalPrice = 0;
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} x ${item.quantity} - RP ${item.price * item.quantity}`;
        cartItemsContainer.appendChild(listItem);

        totalPrice += item.price * item.quantity;
});

    document.getElementById(`total-price`).textContent = totalPrice;
}

// Fungsi untuk melakukan checkout
function checkout() {
    if (cart.length === 0) {
        alert('Keranjang Anda kosong.');
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const payment = Number(prompt(`Total belanja Anda Rp ${total}. Masukan jumlah pembayaran:`));

    if (payment >= total) {
        alert(`Pembayaran berhasil! Kembalian Anda: Rp ${payment - total}`);
        cart = [];
        updateCart();
    } else {
        alert(`Uang Anda tidak mencukupi.`);
    }
}

//even listener untuk tombol checkout
document.getElementById('checkout-btn').addEventListener('click', checkout);
//tampilkan produk saat halaman di muat
displayProducts();