// Product data - Add your products here
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        description: "Premium wireless headphones with noise cancellation"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
        description: "Fitness tracker with heart rate monitor"
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1589254065875-4f34e2b67425?w=400&h=300&fit=crop",
        description: "Portable speaker with 12-hour battery life"
    },
    {
        id: 4,
        name: "Phone Case",
        price: 19.99,
        image: "https://images.unsplash.com/photo-1588483882448-4e218e7964e2?w=400&h=300&fit=crop",
        description: "Durable protective case for your smartphone"
    },
    {
        id: 5,
        name: "Laptop Stand",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83defb?w=400&h=300&fit=crop",
        description: "Adjustable laptop stand for better ergonomics"
    },
    {
        id: 6,
        name: "Wireless Mouse",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
        description: "Ergonomic wireless mouse with long battery life"
    }
];

let cart = [];

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const cartModal = document.getElementById('cartModal');
const cartCount = document.querySelector('.cart-count');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const closeModal = document.querySelector('.close');
const ctaButton = document.querySelector('.cta-button');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartCount();
    
    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Render products
function renderProducts() {
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartCount();
    updateCartModal();
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Update cart modal
function updateCartModal() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    Remove
                </button>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartModal();
}

// Event listeners
cartCount.closest('.cart-icon').addEventListener('click', () => {
    cartModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

ctaButton.addEventListener('click', () => {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
});

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    let message = "Hello, I want to order:%0A";

    cart.forEach(item => {
        message += `${item.name} x ${item.quantity} - $${item.price}%0A`;
    });

    message += `%0ATotal: $${cartTotal.textContent}`;

    const phoneNumber = "917889236591"; // PUT YOUR WHATSAPP NUMBER

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
});
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});
