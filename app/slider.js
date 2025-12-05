// // Auto slide
// const SLIDE_INTERVAL = 5000;
// let currentSlide = 0;
// let isAutoplay = true;
// let timer = SLIDE_INTERVAL / 1000;
// let slideInterval;
// let slides = document.querySelectorAll('.slide');
// let totalSlides = slides.length;

// // Initialize
// function initSlider () {
//     createDots();
//     updateSlider();
//     startAutoPlay();
//     updateTimerDisplay();
// }

// // create dots navigation
// function createDots() {
//     const dotsContainer = document.getElementById('dotsContainer');
//     dotsContainer.innerHTML = '';

//     for (let i = 0; i < totalSlides; i++) {
//         const dot = document.createElement('div');
//         dot.className = 'dot';
//         if(i === currentSlide) dot.classList.add('active');
//         dot.addEventListener('click', () => goToSlide(i));
//         dotsContainer.appendChild(dot);
//     }
// }

// // Update Slider Position
// function updateSlider() {
//     const slider = document.getElementById('slider');
//     slider.style.transform = `translateX(-${currentSlide * 100}%)`;

//     // Update active classes
//     slides.forEach((slide, index) => {
//         slide.classList.toggle('active', index === currentSlide);
//     });
// }

// // Go to spesific slide
// function goToSlide(slideIndex) {
//     currentSlide--;
//     if (currentSlide < 0) currentSlide = totalSlides - 1;
//     updateSlider();
//     resetTimer();
// }

// // Next slide 
// function nextSlide() {
//     currentSlide++;
//     if (currentSlide >= totalSlides) currentSlide = 0;
//     updateSlider();
//     resetTimer();
// }

// // Previous slide
// function prevSlide() {
//     currentSlide--;
//     if (currentSlide <= totalSlides) currentSlide =totalSlides - 1;
//     updateSlider();
//     resetTimer();
// }

// // Auto play slide
// function startAutoPlay() {
//     if (isAutoplay) {
//         slideInterval = setInterval(() => {
//             nextSlide();
//         }, 5000);

//         // start timer countdown
//         startTimer();
//     }
// }

// function stopAutoPlay() {
//     clearInterval(slideInterval);
//     slideInterval = null;
//     stopTimer();
// }

// function toggleAutoPlay() {
//     isAutoplay = !isAutoplay;
//     const btn = document.getElementById('autoPlayBtn');
//     const btnText = btn.querySelector('.btn-text');
//     const playIcon = btn.querySelector('.paly-icon');
// }

// // Event listeners
// document.getElementById('prevBtn').addEventListener('click', () => {
//     prevSlide();
//     if (isAutoplay) resetTimer();
// });

// document.getElementById('nextBtn').addEventListener('click', () => {
//     nextSlide();
//     if (isAutoplay) resetTimer();
// });

// document.getElementById('autoPlayBtn').addEventListener('click', toggleAutoPlay);


// // Auto slide
// setInterval(() => {
//     showSlide(currentSlide + 1);
// }, 5000);

// // quote slider
// const slides = document.querySelectorAll('.quote-slide');
// const dots = document.querySelectorAll('.slider-dot');
// let currentSlide = 0;

// function showSlide(n) {
//     slides.forEach(slide => slide.classList.remove('active'));
//     dots.forEach(dot => dot.classList.remove('active'));

//     currentSlide = (n + slides.length) % slides.length;

//     slides[currentSlide].classList.add('active');
//     dots[currentSlide].classList.add('active');
// }

// dots.forEach((dot, index) => {
//     dot.addEventListener('click', () => {
//         showSlide(index);
//     });
// });