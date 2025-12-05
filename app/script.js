// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Gallery Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add sctive class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Quote Slider
// Configuration
const SLIDE_INTERVAL = 5000;
let currentSlide = 0;
let slideInterval;
let slides = document.querySelectorAll('.quote-slide');
let totalSlides = slides.length;

// Initialize
function initSlider() {
    createDots();
    updateSlider();
    startAutoPlay();
}

// Create dots navigation
function createDots() {
    const dotsContainer = document.getElementById('dotsContainer');
    dotsContainer.innerHTML = '';

    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === currentSlide) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

// Update slider position
function updateSlider() {
    const slider = document.getElementById('slider');
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update active classes
    slides.forEach((slider, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });

    // Update dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Go to spesific slide
function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    if (currentSlide >= totalSlides) currentSlide = 0;
    updateSlider();
}

// Next slide
function nextSlide() {
    currentSlide++;
    if (currentSlide >= totalSlides) currentSlide = 0;
    updateSlider();
}
// Previous slide
function prevSlide() {
    currentSlide--;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    updateSlider();
}

// Auto play function
function startAutoPlay() {
    slideInterval = setInterval(() => {
        nextSlide();
    }, SLIDE_INTERVAL);
}

// Stop auto play
function stopAutoPlay() {
    clearInterval(slideInterval);
    slideInterval = null
}

// Event listener
document.getElementById('prevBtn').addEventListener('click', prevSlide);
document.getElementById('nextBtn').addEventListener('click', nextSlide);

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

const sliderWrapper = document.querySelector('.slider-wrapper');

sliderWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.changeTouches[0].screenX;
});

sliderWrapper.addEventListener('touchend', (e) => {
    touchEndX = e.changeTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            nextSlide();
        } else {
            // Swipe right - previous slide
            prevSlide();
        }
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Initialize slider on load
document.addEventListener('DOMContentLoaded', initSlider);

// Pengiriman untuk form contact
// Google Apps Script URL
const GOOGLE_SCRIPT_URL = '1JW_Bugz847cyV0rdo-E1UIsImHKVs-hX_uXGl3R1U18';

// Nomor WhatsApp tujuan
const WHATSAPP_NUMBER = '';

document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Ambil nilai form
    const formData = {
        name: document.getElementById('name').value, 
        email: document.getElementById('email').value, 
        phone: document.getElementById('phone').value, 
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toLocaleString('id-ID'),
        sendToWhatsApp: document.getElementById('sendToWhatsApp').checked,
        saveToGoogleSheet: document.getElementById('saveToGoogleSheet').checked
    };

    // Validasi nomor WhatsApp
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
        showMessage('Nomor WhatsApp tidak valid!', 'error');
        return;
    }

    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    try {
        // Tampilan Loading
        submitBtn.textContent = 'Mengirim...';
        submitBtn.disabled = true;
        showMessage('Mengirim pesan...', 'loading');

        // Array unutk menyimpan semua promise
        const promises = [];

        // Kirim ke WhatsApp jika dicentang
        if (formData.sendToWhatsApp) {
            promises.push(sendToWhatsApp(formData));
        }

        // Simpan ke Google Sheet jika dicentang
        if (formData.saveToGoogleSheet) {
            promises.push(saveToGoogleSheet(formData));
        }

        // Tunggu semua proses selasai
        if (promises.length > 0) {
            await Promise.all(promises);

            // reset form
            document.getElementById('contactForm').reset();

            // Tampilkan pesan sukses
            let successMsg = 'Pesan berhasil dikirim!';
            if (formData.sendToWhatsApp && formData.saveToGoogleSheet) {
                successMsg += '(WhatsApp & Database)';
            } else if (formData.sendToWhatsApp) {
                successMsg += ' (WhatsApp)';
            } else if (formData.saveToGoogleSheet) {
                successMsg += ' (Database)'
            }

            showMessage(successMsg, 'success');

            // Redirect ke WhatsApp jika dikirim ke WhatsApp
            if (formData.sendToWhatsApp) {
                setTimeout(() => {
                    const phoneNumber = formData.phone.replace(/\D/g, '');
                    const whatsappUrl = `https://wa.me/6282131819088?text=${encodeURIComponent(
                        `Halo, saya ${formData.name}.\n\n` + 
                        `Saya menghubungi anda melalui website.\n\n` +
                        `Subject: ${formData.subject}\n` + 
                        `Email: ${formData.email}\n\n` +
                        `Pesan: ${formData.message}`
                    )}`;
                    window.open(whatsappUrl, '_blank');
                }, 1500);
            }
        }
    } catch (error) {
        console.error ('Error:', error)
        showMessage('Terjadi kesalahan. Silahkan coba lagi.', 'error');
    } finally {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Fungsi untuk mengirim ke WhatsApp
function sendToWhatsApp(formData) {
    return new Promise((resolve) => {
        // Format pesan untuk WhatsApp
        const message = `*PESAN DARI WEBSITE*
        Nama:* ${formData.name}
        *Email:* ${formData.email}
        *Phone:* ${formData.phone}
        *Subject:* ${formData.subject}
        
        *Pesan:*
        ${formData.message}
        
        *Waktu:* ${formData.timestamp}`;

            // Endcode message URL
            const encodeMessage = encodeURIComponent(message);

            // Format nomor telepon (hapus karakter non-digit)
            const phoneNumber = WHATSAPP_NUMBER.replace(/\D/g, '');

            // Buat URL Whatsapp
            const whatsappUrl = `https://wa.me/6282131819088?text=${encodeMessage}`;

            // Simpan URL untuk digunakan nanti (akan di-open setelah semua proses selesai)
            resolve(whatsappUrl);
    });
}

// Fungsi untuk menyimpan ke google sheet
async function saveToGoogleSheet(formData) {
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-type': 'aplication/json',
            },
            body: JSON.stringify(formData)
        });

        // Karena no-cors, kita tidak bisa membaca response
        // Tapi kita anggap berhasil jika tidak ada error
        return true;
    } catch (error) {
        throw new Error('Gagal menyimpan ke Google Sheet: ' + error.message);
    }
}

// Fungsi untuk menampilkan pesan
function showMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.textContent = message;
    messageDiv.className = 'form-message' + type;

    // Auto hide setelah 5 detik untuk pesan sukses
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = 'form-message';
        }, 5000);
    }
}

// Modal Functionality
const modal = document.getElementById('imageModal');
const modalImg = document.querySelector('.modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal.desc');
const modalClose = document.querySelector('.modal-close');
const galleryImages = document.querySelectorAll('.gallery-img');

galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        modal.classList.add('active');
        modalImg.src = img.src;

        // Get Artwork info from overlay
        const overlay = img.parentElement.querySelector('.gallery-overlay');
        if (overlay) {
            const title = overlay.querySelector('h3').textContent;
            const desc = overlay.querySelector('p').textContent;
            modalTitle.textContent = title;
            modalDesc.textContent = desc
        }
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Contact Form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Terima kasih! Pesan Anda telah berhasil dikirim. Saya akan menghubungi Anda segera.');
    contactForm.reset();
})

// Close mobile menu when clicking on a link
const navLinksItems = document.querySelectorAll('.nav-links a');
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Footer category link
const footerCategoryLinks = document.querySelectorAll('.footer-column a [data-filter]');
footerCategoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
            e.preventDefault();
            const filterValue = link.getAttribute('data-filter');

            // Update active filter button
            filterButtons.forEach(btn => {
                if (btn.getAttribute ('data-filter') === filterValue) {
                    btn.click();
                }
            });
    
            // Scroll to gallery section
            document.getElementById('gallery').scrollIntoView({
                behavior: 'smooth'
        });
    });
});
