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
    new fullpage('#fullpage', {
        sectionsColor: ['#000000', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
        anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
        navigation: true,
        slidesNavigation: true,
        navigationTooltips: ['f l a s h', '', 't v'],
        showActiveTooltip: true,
        scrollOverflow: true,
        scrollingSpeed: 1700,
        menu: '#menu',
        licenseKey: '7D72BD02-D9324668-A20A7371-BA347154',
        afterResponsive: function(isResponsive){},
        onLeave: function(origin, destination, direction){
            var params = {
                origin: origin,
                destination:destination,
                direction: direction
            };

            if (params.destination.anchor === "secondPage") {
              if (params.origin.anchor === "firstPage") {
                fullpage_api.moveSlideRight();
              }
              if (params.origin.anchor === "3rdPage") {
                fullpage_api.moveSlideRight();
              }
            }
        },
        onSlideLeave: function(section, origin, destination, direction){
            var params = {
                section: section,
                origin: origin,
                destination: destination,
                direction: direction
            };
            if (params.section.anchor === "secondPage" && params.destination.isFirst === true) {
              gsap.to(".ClassCSS", {
                duration: 1,
                x: 0,
                opacity: 1,
                delay: 0.8,
                stagger: 0.2,
                ease: "expo",
                force3D: true
              });
            } else {
              setTimeout(function() {
                gsap.to(".ClassCSS", {duration: 0.2, x: 400, opacity: 0});
              }, 1500);
            }
        },
        afterLoad: function(origin, destination, direction){
            var params = {
                origin: origin,
                destination: destination,
                direction: direction
            };
            if (params.destination.anchor === "secondPage" && params.destination.index === 1) {
              gsap.to(".ClassCSS", {
                duration: 1,
                x: 0,
                opacity: 1,
                delay: 0.8,
                stagger: 0.2,
                ease: "expo",
                force3D: true
              });
            } else {
              setTimeout(function() {
                gsap.to(".ClassCSS", {duration: 0.2, x: 400, opacity: 0});
              }, 1500);
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
