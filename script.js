// === Navigation Toggle ===
function toggleNav() {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('active');
}

// Schließen des Menüs, wenn man außerhalb klickt (Mobile)
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
        const nav = document.getElementById('mainNav');
        const toggle = document.querySelector('.nav-toggle');
        if (!nav.contains(e.target) && !toggle.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    }
});

// Dropdown Handling für Mobile (Tap statt Hover)
// Wir listen jetzt auf .nav-link (den Text) statt auf das .nav-item (den Container)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            const parent = this.parentElement; // Das li.nav-item
            const dropdown = parent.querySelector('.dropdown-menu');

            // Nur reagieren, wenn ein Dropdown existiert
            if (dropdown) {
                e.preventDefault(); // Verhindert das Springen nach oben (#)
                e.stopPropagation();

                // Toggle active class für dieses Item
                parent.classList.toggle('active');

                // Alle anderen offenen Dropdowns schließen
                document.querySelectorAll('.nav-item').forEach(otherItem => {
                    if (otherItem !== parent) {
                        otherItem.classList.remove('active');
                    }
                });
            }
        }
    });
});

// === Scroll Animation (Intersection Observer) ===
// Fügt die Klasse 'active' zu Elementen hinzu, wenn sie in den Sichtbereich scrollen
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: Observer stoppen, nachdem das Element sichtbar war
            // observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    threshold: 0.15, // Auslöst, wenn 15% des Elements sichtbar sind
    rootMargin: "0px 0px -50px 0px" // Kleiner Offset unten
};

const observer = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    observer.observe(el);
});