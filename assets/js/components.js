class GymHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <!-- Navigation -->
        <header class="navbar">
            <div class="container nav-container">
                <a href="index.html" class="logo">FIT<span>NATION</span></a>
                <nav class="nav-links">
                    <a href="index.html" class="nav-link hover-target" data-page="index.html">Home</a>
                    <a href="about.html" class="nav-link hover-target" data-page="about.html">About</a>
                    <a href="programs.html" class="nav-link hover-target" data-page="programs.html">Programs</a>
                    <a href="trainers.html" class="nav-link hover-target" data-page="trainers.html">Trainers</a>
                    <a href="membership.html" class="nav-link hover-target" data-page="membership.html">Membership</a>
                    <a href="transformations.html" class="nav-link hover-target" data-page="transformations.html">Transformations</a>
                    <a href="gallery.html" class="nav-link hover-target" data-page="gallery.html">Gallery</a>
                    <a href="contact.html" class="nav-link hover-target" data-page="contact.html">Contact</a>
                </nav>
                <div class="nav-actions">
                    <a href="contact.html" class="btn btn-primary hover-target nav-cta" style="margin-right: 1.5rem;">Book Free Trial</a>
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
                        <a href="index.html" class="logo">FIT<span>NATION</span></a>
                        <p>Where iron and willpower meet. Built for those who are serious about strength.</p>
                    </div>
                    <div class="footer-links">
                        <h4>Explore</h4>
                        <a href="about.html" class="hover-target">Our Story</a>
                        <a href="programs.html" class="hover-target">Programs</a>
                        <a href="trainers.html" class="hover-target">Coaches</a>
                        <a href="membership.html" class="hover-target">Memberships</a>
                    </div>
                    <div class="footer-contact">
                        <h4>Columbus, OH</h4>
                        <p>844 Foundry Way, Warehouse District</p>
                        <p>info@fitnationgym.com</p>
                        <p>+1 (614) 555-IRON</p>
                    </div>
                    <div class="footer-social">
                        <h4>Follow Us</h4>
                        <a href="#" class="hover-target">Instagram</a>
                        <a href="#" class="hover-target">Facebook</a>
                        <a href="#" class="hover-target">YouTube</a>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2026 FitNation Gym. Real Training. Real Results.</p>
                </div>
            </div>
        </footer>
        `;
    }
}

customElements.define('gym-header', GymHeader);
customElements.define('gym-footer', GymFooter);
