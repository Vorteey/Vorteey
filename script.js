document.addEventListener('DOMContentLoaded', function() {
    const modal = document.querySelector('.modal');
    const modalImg = document.getElementById('img01');
    const captionText = document.getElementById('caption');
    const downloadBtn = document.querySelector('.download-btn');
    const closeBtn = document.querySelector('.close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Page load animation
    function animatePageLoad() {
        galleryItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    animatePageLoad();

    // Hover animation
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        });
    });

    // Open modal animation
    function openModalWithAnimation(img) {
        modal.style.display = 'block';
        modalImg.style.opacity = '0';
        modalImg.style.transform = 'scale(0.9)';
        modalImg.src = img.src;
        captionText.textContent = img.alt;

        setTimeout(() => {
            modalImg.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            modalImg.style.opacity = '1';
            modalImg.style.transform = 'scale(1)';
        }, 50);
    }

    // Close modal animation
    function closeModalWithAnimation() {
        modalImg.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        modalImg.style.opacity = '0';
        modalImg.style.transform = 'scale(0.9)';

        setTimeout(() => {
            modal.style.display = 'none';
            modalImg.src = '';
        }, 300);
    }

    // Open modal
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            openModalWithAnimation(img);
        });
    });

    // Close modal
    closeBtn.addEventListener('click', closeModalWithAnimation);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalWithAnimation();
        }
    });

    // Download button functionality (unchanged)
    downloadBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const imgSrc = modalImg.src;
        const fileName = imgSrc.split('/').pop();
        
        const link = document.createElement('a');
        link.href = imgSrc;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Escape key to close modal (unchanged)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModalWithAnimation();
        }
    });
});