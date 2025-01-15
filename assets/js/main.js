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

// Page Loading Animation
window.addEventListener('load', function() {
    const body = document.body;
    setTimeout(() => {
        body.classList.add('loaded');
    }, 2000);
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    initializeAudio();
});
