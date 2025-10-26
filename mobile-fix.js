// mobile-fix.js
class MobileMenuFix {
    constructor() {
        this.init();
    }
    
    init() {
        this.toggle = document.querySelector('.mobile-nav-toggle');
        this.menu = document.querySelector('.mobile-nav');
        this.closeBtn = document.querySelector('.mobile-close-btn');
        
        if (this.toggle && this.menu) {
            this.toggle.addEventListener('click', () => this.openMenu());
        }
        
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeMenu());
        }
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (this.menu.classList.contains('active') && 
                !this.menu.contains(e.target) && 
                e.target !== this.toggle) {
                this.closeMenu();
            }
        });
    }
    
    openMenu() {
        this.menu.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('Menu opened');
    }
    
    closeMenu() {
        this.menu.classList.remove('active');
        document.body.style.overflow = '';
        console.log('Menu closed');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new MobileMenuFix();
    console.log('Mobile menu fix loaded');
});
