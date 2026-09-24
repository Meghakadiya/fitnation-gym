
// -------------------------------------------------------- //

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

    const burger = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    if(burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }

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

        const counters = document.querySelectorAll('.counter');
        const speed = 200;
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText;
                        const inc = target / speed;
                        if (count < target) {
                            counter.innerText = Math.ceil(count + inc);
                            setTimeout(updateCount, 15);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.2 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });

        // Trainer Modal Logic
        const viewProfileBtns = document.querySelectorAll('.view-profile-btn');
        const trainerModal = document.getElementById('trainerModal');
        const trainerModalClose = document.querySelector('.modal-close');
        
        if(trainerModal) {
            viewProfileBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const data = JSON.parse(btn.getAttribute('data-trainer'));
                    document.getElementById('modalImg').src = data.img;
                    document.getElementById('modalName').innerText = data.name;
                    document.getElementById('modalRole').innerText = data.role;
                    document.getElementById('modalExp').innerText = data.experience;
                    document.getElementById('modalCerts').innerText = data.certifications;
                    document.getElementById('modalSpec').innerText = data.specialization;
                    document.getElementById('modalAch').innerText = data.achievements;
                    document.getElementById('modalAvail').innerText = data.availability;
                    document.getElementById('modalClasses').innerText = data.classes;
                    
                    trainerModal.classList.add('active');
                });
            });

            trainerModalClose.addEventListener('click', () => {
                trainerModal.classList.remove('active');
            });

            trainerModal.addEventListener('click', (e) => {
                if(e.target === trainerModal) {
                    trainerModal.classList.remove('active');
                }
            });
        }
        
        // Testimonial Carousel Logic
        const track = document.querySelector('.testimonial-track');
        if(track) {
            const slides = Array.from(track.children);
            const nextButton = document.querySelector('.next-btn');
            const prevButton = document.querySelector('.prev-btn');
            
            let currentIndex = 0;
            const updateTransform = () => {
                track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
            };
            
            if(nextButton) {
                nextButton.addEventListener('click', () => {
                    currentIndex = (currentIndex + 1) % slides.length;
                    updateTransform();
                });
            }
            if(prevButton) {
                prevButton.addEventListener('click', () => {
                    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                    updateTransform();
                });
            }
            
            // Auto slide
            setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateTransform();
            }, 6000);
        }

        // Transformation Filtering Logic
        const filterBtns = document.querySelectorAll('.filter-btn');
        const transformCards = document.querySelectorAll('.transform-card');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                transformCards.forEach(card => {
                    if (filterValue === 'all' || card.classList.contains(filterValue)) {
                        card.style.display = 'block';
                        setTimeout(() => { card.style.opacity = '1'; }, 10);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => { card.style.display = 'none'; }, 300);
                    }
                });
            });
        });

        // Transformation Modal Logic
        const transModal = document.getElementById('transModal');
        const transModalClose = document.querySelector('.trans-close');
        
        if(transModal) {
            transformCards.forEach(card => {
                card.addEventListener('click', (e) => {
                    e.preventDefault();
                    const data = JSON.parse(card.getAttribute('data-modal'));
                    document.getElementById('transImgBefore').src = data.imgBefore;
                    document.getElementById('transImgAfter').src = data.imgAfter;
                    document.getElementById('transName').innerText = data.name;
                    document.getElementById('transProgram').innerText = data.program;
                    document.getElementById('transResult').innerText = data.result;
                    document.getElementById('transDuration').innerText = data.duration;
                    
                    transModal.classList.add('active');
                });
            });

            transModalClose.addEventListener('click', () => {
                transModal.classList.remove('active');
            });

            transModal.addEventListener('click', (e) => {
                if(e.target === transModal) {
                    transModal.classList.remove('active');
                }
            });
        }

        // Gallery Filtering & Lightbox Logic
        const galFilterBtns = document.querySelectorAll('.gallery-filter-btn');
        const galItems = document.querySelectorAll('.gallery-item-new');
        
        if (galFilterBtns.length > 0) {
            galFilterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    galFilterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    const filterValue = btn.getAttribute('data-filter');
                    galItems.forEach(item => {
                        if (filterValue === 'all' || item.classList.contains(filterValue)) {
                            item.style.display = 'block';
                            setTimeout(() => { item.style.opacity = '1'; }, 10);
                        } else {
                            item.style.opacity = '0';
                            setTimeout(() => { item.style.display = 'none'; }, 300);
                        }
                    });
                });
            });
        }
        
        const lightboxModal = document.getElementById('lightboxModal');
        const lightboxImg = document.getElementById('lightboxImg');
        const lightboxClose = document.querySelector('.lightbox-close');
        
        if (lightboxModal && lightboxImg) {
            galItems.forEach(item => {
                item.addEventListener('click', () => {
                    lightboxImg.src = item.getAttribute('data-src');
                    lightboxModal.style.display = 'flex';
                    setTimeout(() => { lightboxModal.style.opacity = '1'; }, 10);
                });
            });
            
            lightboxClose.addEventListener('click', () => {
                lightboxModal.style.opacity = '0';
                setTimeout(() => { lightboxModal.style.display = 'none'; }, 300);
            });
            
            lightboxModal.addEventListener('click', (e) => {
                if (e.target === lightboxModal) {
                    lightboxModal.style.opacity = '0';
                    setTimeout(() => { lightboxModal.style.display = 'none'; }, 300);
                }
            });
        }
        
        // FAQ Accordion Logic (Single Open Accordion)
        const faqQuestions = document.querySelectorAll('.faq-question');
        if (faqQuestions.length > 0) {
            faqQuestions.forEach(question => {
                question.addEventListener('click', () => {
                    const answer = question.nextElementSibling;
                    const icon = question.querySelector('.faq-icon');
                    const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';
                    
                    // Close ALL FAQ items explicitly
                    document.querySelectorAll('.faq-answer').forEach(ans => {
                        ans.style.maxHeight = '0px';
                    });
                    document.querySelectorAll('.faq-icon').forEach(ic => ic.style.transform = 'rotate(0deg)');
                    document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
                    
                    // Open clicked item ONLY if it was closed
                    if (!isOpen) {
                        answer.style.maxHeight = answer.scrollHeight + "px";
                        icon.style.transform = 'rotate(45deg)';
                        question.classList.add('active');
                    }
                });
            });
        }

        // Book a Call Multi-Step Flow Logic
        const callModal = document.getElementById('bookCallModal');
        if(callModal) {
            const bookCallBtns = document.querySelectorAll('.book-call-btn');
            const callModalCloses = document.querySelectorAll('.call-modal-close');
            
            const step1 = document.getElementById('callStep1');
            const step2 = document.getElementById('callStep2');
            const step3 = document.getElementById('callStep3');
            
            const ind1 = document.getElementById('step1Indicator');
            const ind2 = document.getElementById('step2Indicator');
            const ind3 = document.getElementById('step3Indicator');
            
            const goalBtns = document.querySelectorAll('.goal-btn');
            const btnNextToStep2 = document.getElementById('btnNextToStep2');
            const btnBackToStep1 = document.getElementById('btnBackToStep1');
            
            const form = document.getElementById('bookCallForm');
            const selectedGoalInput = document.getElementById('selectedGoalInput');
            const displaySelectedGoal = document.getElementById('displaySelectedGoal');

            let currentSelectedGoal = "";

            const openCallModal = (e) => {
                e.preventDefault();
                step1.style.display = 'block';
                step2.style.display = 'none';
                step3.style.display = 'none';
                
                ind1.style.color = 'var(--accent-color)';
                ind2.style.color = '#555';
                ind3.style.color = '#555';
                
                form.reset();
                goalBtns.forEach(b => b.classList.remove('selected'));
                btnNextToStep2.style.display = 'none';
                currentSelectedGoal = "";
                
                callModal.style.display = 'flex';
                setTimeout(() => { callModal.style.opacity = '1'; }, 10);
            };

            bookCallBtns.forEach(btn => btn.addEventListener('click', openCallModal));
            
            const closeCallModal = () => {
                callModal.style.opacity = '0';
                setTimeout(() => { callModal.style.display = 'none'; }, 300);
            };
            
            callModalCloses.forEach(btn => btn.addEventListener('click', closeCallModal));
            callModal.addEventListener('click', (e) => {
                if(e.target === callModal) closeCallModal();
            });

            goalBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    goalBtns.forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    currentSelectedGoal = btn.textContent;
                    btnNextToStep2.style.display = 'block';
                });
            });

            btnNextToStep2.addEventListener('click', () => {
                if (!currentSelectedGoal) return;
                selectedGoalInput.value = currentSelectedGoal;
                displaySelectedGoal.textContent = currentSelectedGoal;
                
                step1.style.display = 'none';
                step2.style.display = 'block';
                
                ind1.style.color = '#555';
                ind2.style.color = 'var(--accent-color)';
            });
            
            btnBackToStep1.addEventListener('click', () => {
                step2.style.display = 'none';
                step1.style.display = 'block';
                
                ind2.style.color = '#555';
                ind1.style.color = 'var(--accent-color)';
            });

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                step2.style.display = 'none';
                step3.style.display = 'block';
                
                ind2.style.color = '#555';
                ind3.style.color = 'var(--accent-color)';
            });
        }
    }
});
