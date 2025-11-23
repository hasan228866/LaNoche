// DATA PRODUK - MUDAH DIUBAH
// Anda hanya perlu mengubah array products di bawah ini untuk menambah/mengubah produk

const products = [
    {
        id: 'performance-tee',
        name: 'Performance Tee',
        price: 'Rp 249.000',
        images: [
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1506629905607-e48b0e67d879?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        description: 'High-performance tee with moisture-wicking technology for intensive training.',
        features: [
            'Material: Premium Cotton Blend',
            'Technology: Moisture-Wicking',
            'Ventilation: Strategic Mesh Panels',
            'Seams: Flatlock Construction',
            'Design: Minimalist with Embroidered Logo'
        ]
    },
    {
        id: 'compression-fit',
        name: 'Compression Fit',
        price: 'Rp 279.000',
        images: [
            'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1506629905607-e48b0e67d879?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        description: 'Compression design for optimal muscle support and faster recovery.',
        features: [
            'Material: Nylon-Spandex Compression Blend',
            'Technology: Muscle Support & Recovery',
            'Feature: Four-Way Stretch',
            'Ventilation: Breathable Mesh Inserts',
            'Design: Slim Fit with Reflective Details'
        ]
    },
    {
        id: 'signature-edition',
        name: 'Signature Edition',
        price: 'Rp 329.000',
        images: [
            'https://images.unsplash.com/photo-1506629905607-e48b0e67d879?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        description: 'Limited edition with exclusive design and premium materials.',
        features: [
            'Material: Ultra-Premium Micro-Modal',
            'Technology: Advanced Moisture Management',
            'Feature: Anti-Odor Treatment',
            'Seams: Seamless Construction',
            'Design: Limited Edition with Numbered Tag'
        ]
    }
];

// Variabel global untuk slider dan data produk yang dipilih
let currentSlideIndex = 0;
let currentProductImages = [];
let selectedProduct = null;
let selectedSize = null;

// Inisialisasi
document.addEventListener('DOMContentLoaded', function() {
    // Render produk
    renderProducts();
    
    // Populate product dropdown
    populateProductDropdown();
    
    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Modal elements
    const sizeGuideModal = document.getElementById('size-guide-modal');
    const productModal = document.getElementById('product-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const sizeGuideBtn = document.getElementById('size-guide-btn');
    const openSizeGuide = document.getElementById('open-size-guide');
    
    // Open size guide modal
    if (sizeGuideBtn) {
        sizeGuideBtn.addEventListener('click', function() {
            sizeGuideModal.style.display = 'block';
        });
    }
    
    if (openSizeGuide) {
        openSizeGuide.addEventListener('click', function() {
            productModal.style.display = 'none';
            sizeGuideModal.style.display = 'block';
        });
    }
    
    // Close modals
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            sizeGuideModal.style.display = 'none';
            productModal.style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === sizeGuideModal) {
            sizeGuideModal.style.display = 'none';
        }
        if (event.target === productModal) {
            productModal.style.display = 'none';
        }
    });
    
    // Back button functionality
    const backButton = document.getElementById('back-button');
    if (backButton) {
        backButton.addEventListener('click', function() {
            productModal.style.display = 'none';
        });
    }
    
    // Order from detail button
    const orderFromDetail = document.getElementById('order-from-detail');
    if (orderFromDetail) {
        orderFromDetail.addEventListener('click', function() {
            const selectedSizeElement = document.querySelector('.size-option.active');
            if (selectedSizeElement) {
                // Simpan data produk dan size yang dipilih
                selectedSize = selectedSizeElement.getAttribute('data-size');
                
                // Auto-fill form order
                autoFillOrderForm(selectedProduct, selectedSize);
                
                // Tutup modal
                productModal.style.display = 'none';
                
                // Scroll ke section order
                document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
                
                // Tampilkan notifikasi
                showAutoFillNotification();
            } else {
                alert('Please select a size first.');
            }
        });
    }
    
    // Form submission untuk WhatsApp
    document.getElementById('order-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Ambil nilai dari form
        const product = document.getElementById('product').value;
        const size = document.getElementById('size').value;
        const quantity = document.getElementById('quantity').value;
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        
        // Validasi form
        if (!product || !size || !quantity || !name || !phone || !address) {
            alert('Please complete all required fields.');
            return;
        }
        
        // Format pesan untuk WhatsApp
        const message = `Hello LA NOCHE, I would like to order:\n\n` +
                       `Product: ${product}\n` +
                       `Size: ${size}\n` +
                       `Quantity: ${quantity}\n` +
                       `Name: ${name}\n` +
                       `WhatsApp Number: ${phone}\n` +
                       `Shipping Address: ${address}\n\n` +
                       `All LA NOCHE products are made through a pre-order system with guaranteed quality. Order now and receive your premium gym wear in 5-7 days.`;
        
        // Encode pesan untuk URL
        const encodedMessage = encodeURIComponent(message);
        
        // Nomor WhatsApp (ganti dengan nomor yang sesuai)
        const whatsappNumber = '628895885691'; // Ganti dengan nomor WhatsApp bisnis Anda
        
        // Buat URL WhatsApp
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Buka WhatsApp
        window.open(whatsappURL, '_blank');
    });
});

// Fungsi untuk render produk
function renderProducts() {
    const productsContainer = document.getElementById('products-container');
    
    if (!productsContainer) return;
    
    productsContainer.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-product', product.id);
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">${product.price}</div>
                <button class="view-details">View Details</button>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
        
        // Add click event to product card
        productCard.addEventListener('click', function() {
            openProductModal(product.id);
        });
    });
}

// Fungsi untuk populate product dropdown
function populateProductDropdown() {
    const productSelect = document.getElementById('product');
    
    if (!productSelect) return;
    
    // Clear existing options except the first one
    while (productSelect.options.length > 1) {
        productSelect.remove(1);
    }
    
    // Add product options
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.name;
        option.textContent = product.name;
        productSelect.appendChild(option);
    });
}

// Fungsi untuk membuka modal produk
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Simpan produk yang sedang dilihat
    selectedProduct = product;
    
    // Update modal content
    document.getElementById('detail-product-name').textContent = product.name;
    document.getElementById('detail-product-price').textContent = product.price;
    document.getElementById('detail-product-description').textContent = product.description;
    
    const featuresList = document.getElementById('detail-product-features');
    featuresList.innerHTML = '';
    product.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    // Setup size options
    setupSizeOptions();
    
    // Setup slider
    setupProductSlider(product.images, product.name);
    
    // Show modal
    document.getElementById('product-modal').style.display = 'block';
}

// Fungsi untuk setup opsi ukuran
function setupSizeOptions() {
    const sizeOptionsContainer = document.getElementById('size-options');
    sizeOptionsContainer.innerHTML = '';
    
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    
    sizes.forEach(size => {
        const sizeOption = document.createElement('button');
        sizeOption.className = 'size-option';
        sizeOption.setAttribute('data-size', size);
        sizeOption.textContent = size;
        
        sizeOption.addEventListener('click', function() {
            // Remove active class from all options
            document.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('active'));
            // Add active class to clicked option
            this.classList.add('active');
            
            // Enable order button
            const orderButton = document.getElementById('order-from-detail');
            orderButton.disabled = false;
        });
        
        sizeOptionsContainer.appendChild(sizeOption);
    });
    
    // Disable order button initially
    const orderButton = document.getElementById('order-from-detail');
    orderButton.disabled = true;
}

// Fungsi untuk auto-fill form order
function autoFillOrderForm(product, size) {
    // Isi product dropdown
    const productSelect = document.getElementById('product');
    productSelect.value = product.name;
    
    // Isi size dropdown
    const sizeSelect = document.getElementById('size');
    sizeSelect.value = size;
    
    // Reset quantity ke 1
    document.getElementById('quantity').value = 1;
    
    // Focus ke field name untuk memudahkan user
    document.getElementById('name').focus();
}

// Fungsi untuk menampilkan notifikasi auto-fill
function showAutoFillNotification() {
    // Hapus notifikasi sebelumnya jika ada
    const existingNotification = document.querySelector('.auto-fill-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Buat notifikasi
    const notification = document.createElement('div');
    notification.className = 'auto-fill-notification';
    notification.innerHTML = `✅ Product <strong>${selectedProduct.name}</strong> with size <strong>${selectedSize}</strong> has been added to your order form!`;
    
    // Sisipkan notifikasi di atas form
    const orderForm = document.querySelector('.order-form');
    orderForm.parentNode.insertBefore(notification, orderForm);
    
    // Hapus notifikasi setelah 5 detik
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Fungsi untuk setup slider produk
function setupProductSlider(images, productName) {
    const slidesContainer = document.getElementById('product-slides');
    const dotsContainer = document.getElementById('slider-dots');
    
    // Reset containers
    slidesContainer.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    // Set current images
    currentProductImages = images;
    currentSlideIndex = 0;
    
    // Create slides
    images.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.innerHTML = `<img src="${image}" alt="${productName} - Image ${index + 1}">`;
        slidesContainer.appendChild(slide);
        
        // Create dot
        const dot = document.createElement('button');
        dot.className = 'slider-dot';
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('data-index', index);
        dotsContainer.appendChild(dot);
        
        // Add click event to dot
        dot.addEventListener('click', function() {
            goToSlide(index);
        });
    });
    
    // Setup navigation buttons
    const prevButton = document.querySelector('.slider-nav.prev');
    const nextButton = document.querySelector('.slider-nav.next');
    
    // Remove existing event listeners
    prevButton.replaceWith(prevButton.cloneNode(true));
    nextButton.replaceWith(nextButton.cloneNode(true));
    
    // Get new references
    const newPrevButton = document.querySelector('.slider-nav.prev');
    const newNextButton = document.querySelector('.slider-nav.next');
    
    // Add event listeners
    newPrevButton.addEventListener('click', function() {
        prevSlide();
    });
    
    newNextButton.addEventListener('click', function() {
        nextSlide();
    });
    
    // Update slider position
    updateSlider();
}

// Fungsi untuk pindah ke slide sebelumnya
function prevSlide() {
    currentSlideIndex--;
    if (currentSlideIndex < 0) {
        currentSlideIndex = currentProductImages.length - 1;
    }
    updateSlider();
}

// Fungsi untuk pindah ke slide berikutnya
function nextSlide() {
    currentSlideIndex++;
    if (currentSlideIndex >= currentProductImages.length) {
        currentSlideIndex = 0;
    }
    updateSlider();
}

// Fungsi untuk pindah ke slide tertentu
function goToSlide(index) {
    currentSlideIndex = index;
    updateSlider();
}

// Fungsi untuk memperbarui tampilan slider
function updateSlider() {
    const slidesContainer = document.getElementById('product-slides');
    const dots = document.querySelectorAll('.slider-dot');
    
    // Update slide position
    slidesContainer.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    
    // Update active dot
    dots.forEach((dot, index) => {
        if (index === currentSlideIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Smooth scrolling untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Sticky header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
    } else {
        header.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
    }
});
