document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. GESTIONE NAVBAR (Effetto Vetro allo scroll) ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. ANIMAZIONE INGRESSO HERO SECTION ---
    const heroSection = document.querySelector('.hero-section');
    
    setTimeout(() => {
        if (heroSection) {
            heroSection.classList.add('hero-visible');
        }
    }, 300); 

    // --- 3. SMOOTH SCROLL (Per i link interni) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement){
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. NAVBAR SCROLL EFFECT ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. MOBILE MENU TOGGLE ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-times');
            hamburger.querySelector('i').classList.add('fa-bars');
        });
    });

    // --- 3. ANIMAZIONI HERO ---
    const heroSection = document.querySelector('.hero-section');
    setTimeout(() => {
        if(heroSection) heroSection.classList.add('hero-visible');
    }, 200);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    // --- 4. GESTIONE ACCORDION (Support Section) ---
    const accordions = document.querySelectorAll('.accordion-item');

    accordions.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            accordions.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-body').style.maxHeight = null;
                }
            });
            item.classList.toggle('active');
            
            const body = item.querySelector('.accordion-body');
            if (item.classList.contains('active')) {
                body.style.maxHeight = body.scrollHeight + "px";
            } else {
                body.style.maxHeight = null;
            }
        });
    });
    // --- 5. SIDE NAVIGATION SCROLL SPY ---
    // Seleziona tutti i link del menu laterale
    const sideLinks = document.querySelectorAll('.side-link');
    const sections = document.querySelectorAll('section');

    function changeLinkState() {
        let index = sections.length;

        // Cerca quale sezione è visibile
        while(--index && window.scrollY + 300 < sections[index].offsetTop) {}
        
        // Rimuovi 'active' da tutti
        sideLinks.forEach((link) => link.classList.remove('active'));
        
        // Aggiungi 'active' a quello corrente (se esiste corrispondenza)
        // L'indice 0 potrebbe essere problematico se l'header non è una section, 
        // ma nel nostro caso la hero è la prima section.
        if(index >= 0) {
            // Verifica che l'id della sezione corrisponda all'href del link
            const currentId = sections[index].id;
            const activeLink = document.querySelector(`.side-link[href="#${currentId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }

    // Attiva la funzione allo scroll
    window.addEventListener('scroll', changeLinkState);
    // Attiva anche al caricamento
    changeLinkState();
   // GESTIONE MODAL POPUP (Multi-Button Support)
function setupModalGroup(btnClass, modalId, specificCloseClass) {
    const modal = document.getElementById(modalId);
    const buttons = document.querySelectorAll('.' + btnClass);

    if (modal && buttons.length > 0) {
        
        // --- 1. CERCA IL TASTO CHIUDI (Logica Intelligente) ---
        let btnClose = null;

        // Se hai passato una classe specifica (vecchio metodo), proviamo a usarla
        if (specificCloseClass) {
            // Aggiungi il punto se manca (es. "close-gold-a" diventa ".close-gold-a")
            let selector = specificCloseClass.startsWith('.') ? specificCloseClass : '.' + specificCloseClass;
            btnClose = modal.querySelector(selector);
        }

        // Se non l'abbiamo trovato (o non hai passato nulla), cerchiamo la classe standard ".close-modal"
        if (!btnClose) {
            btnClose = modal.querySelector('.close-modal');
        }

        // --- 2. GESTIONE EVENTI ---
        
        // Apertura
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Chiusura (Click sulla X)
        if (btnClose) {
            btnClose.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }

        // Chiusura (Click sullo sfondo)
        window.addEventListener('click', (e) => {
            if (e.target == modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Inizializza i gruppi (Nota: non usiamo # per l'ID del bottone, ma il nome della classe)
// 1. Tutti i pulsanti con classe 'js-open-gold' aprono 'modal-gold'
setupModalGroup('js-open-gold', 'modal-gold', '.close-modal'); 

// 2. Tutti i pulsanti con classe 'js-open-platinum' aprono 'modal-platinum'
setupModalGroup('js-open-platinum', 'modal-platinum', '.close-platinum'); 
setupModalGroup('js-open-gold-annual', 'modal-gold-annual', 'close-gold-a');
setupModalGroup('js-open-platinum-annual', 'modal-platinum-annual', 'close-platinum-a');
});