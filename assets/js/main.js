document.addEventListener("DOMContentLoaded", () => {
    
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        if(preloader) preloader.classList.add('hidden');
        initAnimations();
    }, 1500);

    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const hoverTargets = document.querySelectorAll('.hover-target, a, button, .class-item');

    if(window.matchMedia("(pointer: fine)").matches && cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        });

        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                cursor.classList.add('hover-active');
                cursorFollower.classList.add('hover-active');
            });
            target.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover-active');
                cursorFollower.classList.remove('hover-active');
            });
        });
    }

    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const classItems = document.querySelectorAll('.class-item');
    const previewContainer = document.querySelector('.class-image-preview');
    
    if(classItems.length > 0 && previewContainer) {
        const previewImage = previewContainer.querySelector('img');
        const classesSection = document.querySelector('.classes-section');

        classItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                const imgSrc = item.getAttribute('data-img');
                if(imgSrc) {
                    previewImage.src = imgSrc;
                    previewContainer.classList.add('active');
                }
            });
            item.addEventListener('mouseleave', () => {
                previewContainer.classList.remove('active');
            });
        });

        classesSection.addEventListener('mousemove', (e) => {
            if(previewContainer.classList.contains('active')) {
                gsap.to(previewContainer, { x: e.clientX, y: e.clientY, xPercent: -50, yPercent: -50, duration: 0.5, ease: "power2.out" });
            }
        });
    }

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    
    if(slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        function animateSlideIn(index) {
            const slide = slides[index];
            const titles = slide.querySelectorAll('.slide-reveal-text');
            gsap.set(titles, { y: 50, opacity: 0 });
            titles.forEach((el) => {
                let delay = 0;
                if(el.classList.contains('delay-1')) delay = 0.2;
                if(el.classList.contains('delay-2')) delay = 0.4;
                gsap.to(el, { y: 0, opacity: 1, duration: 1, delay: delay + 0.3, ease: "power3.out" });
            });
        }

        function showSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
            animateSlideIn(currentSlide);
        }

        function nextSlide() { showSlide(currentSlide + 1); }
        function prevSlide() { showSlide(currentSlide - 1); }

        if(nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
        if(prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => { showSlide(parseInt(e.target.dataset.index)); resetInterval(); });
        });

        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 6000);
        }

        setTimeout(()=> { animateSlideIn(0); resetInterval(); }, 2000); 
    }

    // BMI Calculator
    const bmiForm = document.getElementById('bmiForm');
    const bmiResultBox = document.getElementById('bmiResultBox');
    const bmiValue = document.getElementById('bmiValue');
    const bmiCategory = document.getElementById('bmiCategory');

    if(bmiForm) {
        bmiForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const cm = parseFloat(document.getElementById('bmiHeight').value);
            const kg = parseFloat(document.getElementById('bmiWeight').value);
            
            if(cm > 0 && kg > 0) {
                const heightMeters = cm / 100;
                const bmi = (kg / (heightMeters * heightMeters)).toFixed(1);
                
                let category = "";
                if(bmi < 18.5) category = "Underweight - Focus on a caloric surplus & hypertrophy training.";
                else if(bmi >= 18.5 && bmi < 24.9) category = "Normal Weight - Focus on maintenance & progressive overload.";
                else if(bmi >= 25 && bmi < 29.9) category = "Overweight - Focus on body recomposition & conditioning.";
                else category = "Obese - Focus on fat loss programs & caloric deficit.";

                bmiValue.textContent = bmi;
                bmiCategory.textContent = category;
                
                bmiResultBox.style.display = 'block';
                
                // Scroll to result slightly
                gsap.from(bmiResultBox, { y: 20, opacity: 0, duration: 0.5 });
            }
        });
    }

    // GSAP Scroll
    function initAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        const marquee = document.getElementById('marqueeText');
        if(marquee) { gsap.to(marquee, { xPercent: -50, repeat: -1, duration: 25, ease: "linear" }); }

        document.querySelectorAll('.reveal-up').forEach((el) => {
            let delay = el.classList.contains('delay-1') ? 0.2 : el.classList.contains('delay-2') ? 0.4 : el.classList.contains('delay-3') ? 0.6 : 0;
            gsap.from(el, { scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" }, y: 50, opacity: 0, duration: 0.8, delay: delay, ease: "power3.out" });
        });

        document.querySelectorAll('.reveal-text').forEach((el) => {
            gsap.from(el, { scrollTrigger: { trigger: el, start: "top 85%" }, y: 100, opacity: 0, duration: 1, ease: "power4.out" });
        });

        document.querySelectorAll('.reveal-scale').forEach((el) => {
            let delay = el.classList.contains('delay-1') ? 0.2 : el.classList.contains('delay-2') ? 0.4 : 0;
            gsap.from(el, { scrollTrigger: { trigger: el, start: "top 90%" }, scale: 0.8, opacity: 0, duration: 0.8, delay: delay, ease: "back.out(1.7)" });
        });

        document.querySelectorAll('.parallax-img img').forEach((img) => {
            gsap.to(img, { scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: 1 }, y: "-20%", ease: "none" });
        });

        const pBanner = document.querySelector('.parallax-bg');
        if(pBanner) {
            gsap.to(pBanner, { scrollTrigger: { trigger: '.parallax-banner', start: "top bottom", end: "bottom top", scrub: 1 }, y: 100, ease: "none" });
        }
    }
});
