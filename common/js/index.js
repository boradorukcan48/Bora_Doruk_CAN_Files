let currentEditIndex = null;
let products = [
    { name: 'Elbise', category: 'Moda', price: '1499.99', stock: '11' },
    { name: 'Mouse', category: 'Elektronik', price: '2199.99', stock: '9' }
];

function showPage(pageName, event) {
    if (event) event.preventDefault();

    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    const selectedPage = document.getElementById(pageName);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    const activeNav = document.querySelector(`[data-page="${pageName}"]`);
    if (activeNav) {
        activeNav.classList.add('active');
    }
}

function openNewProductModal() {
    currentEditIndex = null;
    document.getElementById('modalTitle').innerText = 'Yeni Ürün Ekle';
    document.getElementById('productName').value = '';
    document.getElementById('productCategory').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productStock').value = '';
    document.getElementById('editModal').style.display = 'flex';
}

function openEditModal(rowIndex, name, category, price, stock) {
    currentEditIndex = rowIndex;
    document.getElementById('modalTitle').innerText = 'Ürün Düzenle';
    document.getElementById('productName').value = name;
    document.getElementById('productCategory').value = category;
    document.getElementById('productPrice').value = price;
    document.getElementById('productStock').value = stock;
    document.getElementById('editModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
    currentEditIndex = null;
}

function saveProduct() {
    const name = document.getElementById('productName').value;
    const category = document.getElementById('productCategory').value;
    const price = document.getElementById('productPrice').value;
    const stock = document.getElementById('productStock').value;

    if (!name || !category || !price || !stock) {
        alert('Lütfen tüm alanları doldurunuz!');
        return;
    }

    if (currentEditIndex !== null) {
        products[currentEditIndex] = { name, category, price, stock };
        alert('Ürün başarıyla güncellendi!');
    } else {
        products.push({ name, category, price, stock });
        alert('Ürün başarıyla eklendi!');
    }

    updateProductTable();
    closeModal();
}

function deleteProduct(rowIndex) {
    if (confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
        products.splice(rowIndex, 1);
        updateProductTable();
        alert('Ürün başarıyla silindi!');
    }
}

function updateProductTable() {
    const tbody = document.querySelector('#urunler .table tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    products.forEach((product, index) => {
        const row = `
            <tr>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>₺${product.price}</td>
                <td>${product.stock}</td>
                <td>
                    <button class="btn-small" onclick="openEditModal(${index}, '${product.name}', '${product.category}', '${product.price}', '${product.stock}')">Düzenle</button>
                    <button class="btn-small danger" onclick="deleteProduct(${index})">Sil</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

window.onclick = function (event) {
    const modal = document.getElementById('editModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Sayfa ilk açıldığında tabloyu bas
updateProductTable();