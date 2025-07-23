function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}
let currentSlide = 0;
const slides = document.querySelectorAll('.slider .slide');
const totalSlides = slides.length;
function moveSlide(direction) {
    slides[currentSlide].style.display = 'none';
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    slides[currentSlide].style.display = 'block';
}
slides.forEach((slide, index) => {
    if (index !== currentSlide) {
        slide.style.display = 'none';
    } else {
        slide.style.display = 'block';
    }
});
setInterval(() => {
    moveSlide(1); 
}, 5000); 

const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");


function openModal(imageSrc) {
    modal.style.display = "block";
    modalImage.src = imageSrc;
}


function closeModal() {
    modal.style.display = "none";
}


window.addEventListener("click", function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

