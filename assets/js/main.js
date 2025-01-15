// Modal Image Gallery
function initializeGallery() {
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('img01');
    const closeBtn = document.getElementsByClassName('close')[0];
    const images = document.querySelectorAll('.pic img, .bigpic img');

    images.forEach(img => {
        img.onclick = function() {
            modal.style.display = "block";
            modalImg.src = this.src;
        }
    });

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// Page Loading and Animations
window.addEventListener('load', function() {
    const date2 = new Date().getTime();
    const loading = 10000 - (date2 - window.initialLoadTime);
    
    // Hide sneaky menu
    let tooltip = document.querySelector('.fp-tooltip');
    if (tooltip) tooltip.style.opacity = 0;

    // GSAP Animations
    gsap.fromTo("#fp-nav", {x: 300, opacity: 0}, {duration: 18, x: 0, opacity: 1});
    gsap.from(".fp-bottom", {duration: 18, y: 300, opacity: 0});

    setTimeout(function() {
        if (tooltip) tooltip.style.opacity = 1;
        
        // Move to middle silently
        if (typeof fullpage_api !== 'undefined') {
            fullpage_api.silentMoveTo(2,1);
        }

        // More GSAP animations
        gsap.from(".fp-prev", {duration: 7, x: -100, opacity: 0, scale: 0.1});
        gsap.from(".fp-next", {duration: 7, x: 100, opacity: 0, scale: 0.1});
        gsap.to("#background", {duration: 6, delay: 1, opacity: 0});

        // Add loaded class
        document.body.classList.add("loaded");

        // Remove background after animation
        setTimeout(function() {
            const bg = document.querySelector('#background');
            if (bg) bg.remove();
        }, 8000);
    }, loading);
});

// Audio Control
function initializeAudio() {
    const video = document.getElementById('myVideo');
    const audio = document.getElementById('myAudio');
    let audioState = false;

    if (video && audio) {
        video.addEventListener('click', () => {
            if (audioState) {
                audio.pause();
                audioState = false;
            } else {
                audio.play();
                audioState = true;
            }
        });
    }
}

// Carousel Control
function galleryspin(direction) {
    const spinner = document.querySelector("#spinner");
    if (spinner) {
        let angle = parseInt(spinner.getAttribute('data-angle') || '0');
        angle += direction !== '-' ? 45 : -45;
        spinner.setAttribute('data-angle', angle);
        spinner.style.transform = `rotateY(${angle}deg)`;
    }
}

// Initialize FullPage.js
function initializeFullPage() {
    new fullpage('#fullpage', {
        autoScrolling: true,
        scrollHorizontally: true,
        navigation: true,
        navigationPosition: 'right',
        slidesNavigation: true,
        controlArrows: true,
        anchors: ['design', 'home'],
        licenseKey: 'gplv3-license',
        afterLoad: function(origin, destination, direction) {
            // Add any specific section animations here
        }
    });
}

// Store initial load time
window.initialLoadTime = new Date().getTime();

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    initializeAudio();
    initializeFullPage();
});
