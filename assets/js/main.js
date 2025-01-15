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

    setTimeout(function() {
        if (tooltip) tooltip.style.opacity = 1;
        
        // Start at home section
        if (typeof $.fn.fullpage !== 'undefined') {
            $.fn.fullpage.silentMoveTo(1,1);
        }

        // Fade out background
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

// Cursor functionality
function initializeCursor() {
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', e => {
        cursor.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX - 10)+"px;");
    });
    document.addEventListener('click', () => {
        cursor.classList.add("expand");
        setTimeout(() => {
            cursor.classList.remove("expand");
        }, 500);
    });
}

// Initialize FullPage.js
function initializeFullPage() {
    $('#fullpage').fullpage({
        sectionsColor: ['#000000', '#000000'],
        anchors: ['home', 'design'],
        navigation: true,
        slidesNavigation: true,
        navigationTooltips: ['home', 'design'],
        showActiveTooltip: true,
        scrollOverflow: true,
        scrollingSpeed: 1700,
        onLeave: function(index, nextIndex, direction){
            if(nextIndex === 2 && index === 1) { // If going from home to design
                $.fn.fullpage.moveSlideRight();
            }
        }
    });
}

// Store initial load time
window.initialLoadTime = new Date().getTime();

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    initializeAudio();
    initializeCursor();
    initializeFullPage();
});

// Terminal typing effect
function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
        document.getElementById("AboutDevTypeText").innerHTML = text.substring(0, i+1);
        setTimeout(function() {
            typeWriter(text, i + 1, fnCallback)
        }, 100);
    } else if (typeof fnCallback == 'function') {
        setTimeout(fnCallback, 700);
    }
}

// Start the typing animation
setTimeout(function() {
    typeWriter("Agone Studio", 0, function() {
        // Callback after typing completes
    });
}, 2000);
