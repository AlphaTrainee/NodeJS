"use strict";

// Whisky Shop Admin Panel - Complete Management System
const BASE_ROUTE = "/api";

// Global state
let allProducts = [];
let filteredProducts = [];
let currentEditingProduct = null;

// DOM Elements
const productsTableBody = document.getElementById('productsTableBody');
const loadingSpinner = document.getElementById('loadingSpinner');
const editModal = document.getElementById('editModal');

// Initialize Admin Panel
document.addEventListener('DOMContentLoaded', function() {
    console.log('Whisky Admin Panel gestartet');
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize forms
    initializeForms();
    
    // Load initial data
    loadAllProducts();
    
    // Load statistics
    loadStatistics();
});

// Navigation Management
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSection = item.getAttribute('data-section');
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Show target section
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(`${targetSection}-section`).classList.add('active');
            
            // Load data based on section
            if (targetSection === 'products') {
                loadAllProducts();
            } else if (targetSection === 'statistics') {
                loadStatistics();
            }
        });
    });
}

// Form Initialization
function initializeForms() {
    // Add Product Form
    const addForm = document.getElementById('addProductForm');
    if (addForm) {
        addForm.addEventListener('submit', handleAddProduct);
    }
    
    // Edit Product Form
    const editForm = document.getElementById('editProductForm');
    if (editForm) {
        editForm.addEventListener('submit', handleEditProduct);
    }
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    // Filter functionality
    const categoryFilter = document.getElementById('categoryFilter');
    const stockFilter = document.getElementById('stockFilter');
    
    if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
    if (stockFilter) stockFilter.addEventListener('change', applyFilters);
}

// API Helper Functions
async function makeRequest(url, options = {}) {
    try {
        console.log(`${options.method || 'GET'} ${url}`);
        if (options.body) console.log('Request Body:', JSON.parse(options.body));

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });

        const data = await response.json();
        console.log(`Response (${response.status}):`, data);
        return { data, status: response.status, ok: response.ok };
    } catch (error) {
        console.error('API Error:', error);
        showToast('Verbindungsfehler: ' + error.message, 'error');
        return {
            data: { success: false, message: error.message },
            status: 0,
            ok: false
        };
    }
}

// Product Management Functions
async function loadAllProducts() {
    showLoading(true);
    
    try {
        const response = await makeRequest(`${BASE_ROUTE}/products`);
        
        if (response.ok && response.data.success) {
            allProducts = response.data.products || [];
            filteredProducts = [...allProducts];
            renderProductsTable();
            updateProductStats();
            showToast(`${allProducts.length} Produkte geladen`, 'success');
        } else {
            showToast('Fehler beim Laden der Produkte', 'error');
        }
    } catch (error) {
        showToast('Unerwarteter Fehler beim Laden', 'error');
    } finally {
        showLoading(false);
    }
}

async function handleAddProduct(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const productData = {
        name: formData.get('name') || document.getElementById('productName').value,
        brand: formData.get('brand') || document.getElementById('productBrand').value,
        price: parseFloat(document.getElementById('productPrice').value),
        alcoholContent: parseFloat(document.getElementById('productAlcohol').value),
        category: document.getElementById('productCategory').value
    };
    
    // Optional fields
    const age = document.getElementById('productAge').value;
    const region = document.getElementById('productRegion').value;
    const stock = document.getElementById('productStock').value;
    const description = document.getElementById('productDescription').value;
    
    if (age) productData.age = parseInt(age);
    if (region) productData.region = region;
    if (stock) productData.inStock = parseInt(stock);
    if (description) productData.description = description;
    
    try {
        const response = await makeRequest(`${BASE_ROUTE}/products`, {
            method: 'POST',
            body: JSON.stringify(productData)
        });
        
        if (response.ok && response.data.success) {
            showToast('Produkt erfolgreich erstellt!', 'success');
            event.target.reset();
            loadAllProducts();
            
            // Switch to products view
            switchToProductsView();
        } else {
            const message = response.data.message || 'Fehler beim Erstellen des Produkts';
            showToast(message, 'error');
        }
    } catch (error) {
        showToast('Unerwarteter Fehler beim Erstellen', 'error');
    }
}

async function handleEditProduct(event) {
    event.preventDefault();
    
    const productId = document.getElementById('editProductId').value;
    if (!productId) return;
    
    const updateData = {
        name: document.getElementById('editProductName').value,
        brand: document.getElementById('editProductBrand').value,
        price: parseFloat(document.getElementById('editProductPrice').value),
        alcoholContent: parseFloat(document.getElementById('editProductAlcohol').value),
        category: document.getElementById('editProductCategory').value
    };
    
    // Optional fields  
    const age = document.getElementById('editProductAge').value;
    const region = document.getElementById('editProductRegion').value;
    const stock = document.getElementById('editProductStock').value;
    const description = document.getElementById('editProductDescription').value;
    
    if (age) updateData.age = parseInt(age);
    if (region) updateData.region = region;
    if (stock !== '') updateData.inStock = parseInt(stock);
    if (description) updateData.description = description;
    
    try {
        const response = await makeRequest(`${BASE_ROUTE}/products/${productId}`, {
            method: 'PUT',
            body: JSON.stringify(updateData)
        });
        
        if (response.ok && response.data.success) {
            showToast('Produkt erfolgreich aktualisiert!', 'success');
            closeEditModal();
            loadAllProducts();
        } else {
            const message = response.data.message || 'Fehler beim Aktualisieren des Produkts';
            showToast(message, 'error');
        }
    } catch (error) {
        showToast('Unerwarteter Fehler beim Aktualisieren', 'error');
    }
}

async function deleteProduct(productId, productName) {
    if (!confirm(`Möchten Sie "${productName}" wirklich löschen?\nDiese Aktion kann nicht rückgängig gemacht werden.`)) {
        return;
    }
    
    try {
        const response = await makeRequest(`${BASE_ROUTE}/products/${productId}`, {
            method: 'DELETE'
        });
        
        if (response.ok && response.data.success) {
            showToast('Produkt erfolgreich gelöscht!', 'success');
            loadAllProducts();
        } else {
            const message = response.data.message || 'Fehler beim Löschen des Produkts';
            showToast(message, 'error');
        }
    } catch (error) {
        showToast('Unerwarteter Fehler beim Löschen', 'error');
    }
}

// UI Rendering Functions
function renderProductsTable() {
    if (!productsTableBody) return;
    
    if (filteredProducts.length === 0) {
        productsTableBody.innerHTML = `
            <tr>
                <td colspan="10" style="text-align: center; padding: 3rem; color: #6c757d;">
                    <i class="fas fa-box-open" style="font-size: 3rem; margin-bottom: 1rem; display: block;"></i>
                    Keine Produkte gefunden
                </td>
            </tr>
        `;
        return;
    }
    
    productsTableBody.innerHTML = filteredProducts.map(product => `
        <tr>
            <td>${product.id}</td>
            <td><strong>${escapeHtml(product.name)}</strong></td>
            <td>${escapeHtml(product.brand)}</td>
            <td>${escapeHtml(product.category)}</td>
            <td>${product.age ? product.age + ' Jahre' : '-'}</td>
            <td>${product.price.toFixed(2)} €</td>
            <td>${product.alcoholContent}%</td>
            <td>${product.inStock}</td>
            <td>${getStatusBadge(product.inStock)}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon btn-edit" onclick="openEditModal(${product.id})" title="Bearbeiten">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon btn-delete" onclick="deleteProduct(${product.id}, '${escapeHtml(product.name)}')" title="Löschen">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function getStatusBadge(stock) {
    if (stock === 0) {
        return '<span class="status-badge status-out">Ausverkauft</span>';
    } else if (stock <= 5) {
        return '<span class="status-badge status-low">Niedrig</span>';
    } else {
        return '<span class="status-badge status-available">Verfügbar</span>';
    }
}

// Modal Management
function openEditModal(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    
    currentEditingProduct = product;
    
    // Populate form fields
    document.getElementById('editProductId').value = product.id;
    document.getElementById('editProductName').value = product.name;
    document.getElementById('editProductBrand').value = product.brand;
    document.getElementById('editProductAge').value = product.age || '';
    document.getElementById('editProductPrice').value = product.price;
    document.getElementById('editProductAlcohol').value = product.alcoholContent;
    document.getElementById('editProductRegion').value = product.region || '';
    document.getElementById('editProductCategory').value = product.category;
    document.getElementById('editProductStock').value = product.inStock;
    document.getElementById('editProductDescription').value = product.description || '';
    
    // Show modal
    if (editModal) {
        editModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeEditModal() {
    if (editModal) {
        editModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    currentEditingProduct = null;
}

// Search and Filter Functions
function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (!searchTerm) {
        filteredProducts = [...allProducts];
    } else {
        filteredProducts = allProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm) ||
            (product.region && product.region.toLowerCase().includes(searchTerm)) ||
            (product.description && product.description.toLowerCase().includes(searchTerm))
        );
    }
    
    applyAdditionalFilters();
    renderProductsTable();
}

function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    // Start with all products or search results
    if (!searchTerm) {
        filteredProducts = [...allProducts];
    } else {
        filteredProducts = allProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm) ||
            (product.region && product.region.toLowerCase().includes(searchTerm))
        );
    }
    
    applyAdditionalFilters();
    renderProductsTable();
}

function applyAdditionalFilters() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const stockFilter = document.getElementById('stockFilter').value;
    
    if (categoryFilter) {
        filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
    }
    
    if (stockFilter === 'true') {
        filteredProducts = filteredProducts.filter(product => product.inStock > 0);
    } else if (stockFilter === 'false') {
        filteredProducts = filteredProducts.filter(product => product.inStock === 0);
    }
}

// Statistics Functions
async function loadStatistics() {
    try {
        const response = await makeRequest(`${BASE_ROUTE}/products`);
        
        if (response.ok && response.data.success) {
            const products = response.data.products || [];
            updateStatisticsDisplay(products);
        }
    } catch (error) {
        console.error('Error loading statistics:', error);
    }
}

function updateStatisticsDisplay(products) {
    const totalProducts = products.length;
    const inStockProducts = products.filter(p => p.inStock > 0).length;
    const lowStockProducts = products.filter(p => p.inStock > 0 && p.inStock <= 5).length;
    const averagePrice = products.length > 0 
        ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)
        : 0;
    
    document.getElementById('totalProducts').textContent = totalProducts;
    document.getElementById('inStockProducts').textContent = inStockProducts;
    document.getElementById('lowStockProducts').textContent = lowStockProducts;
    document.getElementById('averagePrice').textContent = averagePrice + ' €';
}

function updateProductStats() {
    updateStatisticsDisplay(allProducts);
}

// Utility Functions
function showLoading(show) {
    if (loadingSpinner) {
        loadingSpinner.style.display = show ? 'block' : 'none';
    }
}

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <strong>${type === 'success' ? 'Erfolg!' : type === 'error' ? 'Fehler!' : 'Info'}</strong><br>
        ${escapeHtml(message)}
    `;
    
    toastContainer.appendChild(toast);
    
    // Remove toast after 4 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 4000);
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.toString().replace(/[&<>"']/g, m => map[m]);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Navigation Helper Functions
function showAddProductForm() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    
    // Update navigation
    navItems.forEach(nav => nav.classList.remove('active'));
    document.querySelector('[data-section="add-product"]').classList.add('active');
    
    // Show add product section
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById('add-product-section').classList.add('active');
}

function switchToProductsView() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    
    // Update navigation  
    navItems.forEach(nav => nav.classList.remove('active'));
    document.querySelector('[data-section="products"]').classList.add('active');
    
    // Show products section
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById('products-section').classList.add('active');
}

function refreshProducts() {
    loadAllProducts();
}

function searchProducts() {
    handleSearch();
}

// Global functions for onclick handlers
window.openEditModal = openEditModal;
window.closeEditModal = closeEditModal;
window.deleteProduct = deleteProduct;
window.showAddProductForm = showAddProductForm;
window.refreshProducts = refreshProducts;
window.searchProducts = searchProducts;

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target === editModal) {
        closeEditModal();
    }
};