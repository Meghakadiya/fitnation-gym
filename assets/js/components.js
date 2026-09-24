
class GymHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <!-- Navigation -->
        <header class="navbar">
            <div class="container nav-container">
                <a href="index.html" class="logo"><span class="logo-main">FITNATION</span><span class="logo-gym">GYM</span></a>
                <nav class="nav-links">
                    <a href="index.html" class="nav-link hover-target" data-page="index.html">Home</a>
                    <a href="about.html" class="nav-link hover-target" data-page="about.html">About</a>
                    <a href="programs.html" class="nav-link hover-target" data-page="programs.html">Programs</a>
                    <a href="trainers.html" class="nav-link hover-target" data-page="trainers.html">Trainers</a>
                    <a href="membership.html" class="nav-link hover-target" data-page="membership.html">Membership</a>
                    <a href="transformations.html" class="nav-link hover-target" data-page="transformations.html">Transformations</a>
                    <a href="gallery.html" class="nav-link hover-target" data-page="gallery.html">Gallery</a>
                    <a href="contact.html" class="nav-link hover-target" data-page="contact.html">Contact</a>
                    <!-- Mobile Auth -->
                    <div class="mobile-auth" style="display: none;">
                            <a href="membership.html" class="btn btn-primary hover-target" style="width:100%;">Join FitNation</a>
                    </div>
                </nav>
                <div class="nav-actions" style="display: flex; align-items: center; gap: 1.5rem;">
                        <div class="desktop-auth" style="display:flex; align-items:center; gap:1.5rem;">
                            <a href="membership.html" class="btn btn-primary hover-target nav-cta" style="white-space:nowrap; padding: 0.8rem 1.5rem; border-radius: 4px;">Join FitNation</a>
                        </div>
                    <div class="burger-menu hover-target" id="burgerMenu">
                        <div class="line1"></div>
                        <div class="line2"></div>
                        <div class="line3"></div>
                    </div>
                </div>
            </div>
        </header>
        `;
        
        let path = window.location.pathname;
        let page = path.split("/").pop();
        if (!page) page = "index.html";
        
        const activeLink = this.querySelector(`.nav-link[data-page="${page}"]`);
        if (activeLink) {
            activeLink.classList.add("active");
        }

        const burgerMenu = this.querySelector('#burgerMenu');
        const navLinks = this.querySelector('.nav-links');
        
        burgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            burgerMenu.classList.toggle('toggle');
        });
    }
}

class GymFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="footer">
            <div class="container">
                <div class="footer-grid">

                    <div class="footer-brand">
                        <a href="index.html" class="logo"><span class="logo-main">FITNATION</span><span class="logo-gym">GYM</span></a>
                        <p style="margin-top: 1rem; color: #888;">Premium Strength & Conditioning</p>
                    </div>

                    <div class="footer-links">
                        <h4>Quick Links</h4>
                        <a href="index.html" class="hover-target">Home</a>
                        <a href="about.html" class="hover-target">About</a>
                        <a href="programs.html" class="hover-target">Programs</a>
                        <a href="trainers.html" class="hover-target">Trainers</a>
                        <a href="membership.html" class="hover-target">Memberships</a>
                        <a href="classes.html" class="hover-target">Classes</a>
                        <a href="contact.html" class="hover-target">Contact</a>
                    </div>

                    <div class="footer-links">
                        <h4>Programs</h4>
                        <a href="programs.html" class="hover-target">Strength</a>
                        <a href="programs.html" class="hover-target">Weight Loss</a>
                        <a href="programs.html" class="hover-target">HIIT</a>
                        <a href="programs.html" class="hover-target">Personal Training</a>
                    </div>

                    <div class="footer-contact">
                        <h4>Contact</h4>
                        <p>Ahmedabad, Gujarat</p>
                        <p>+44 7911 123456</p>
                        <p>info@fitnationgym.com</p>

                        <h4 style="margin-top: 1.5rem;">Opening Hours</h4>
                        <p>24/7</p>
                    </div>

                    <div class="footer-social">
                        <h4>Follow Us</h4>
                        <a href="#" class="hover-target">Instagram</a>
                        <a href="#" class="hover-target">Facebook</a>
                        <a href="#" class="hover-target">YouTube</a>
                    </div>

                </div>

                <div class="footer-bottom"
                    style="display: flex; justify-content: center; border-top: 1px solid #222; padding-top: 2rem; margin-top: 2rem; align-items: center; text-align: center;">
                    <p style="margin: 0; text-align: center;">&copy; 2026 FitNation Gym. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
        `;
    }
}

customElements.define('gym-header', GymHeader);
customElements.define('gym-footer', GymFooter);
