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

// Dropdown Handling für Mobile (Tap statt Hover) - KORRIGIERT
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      const parent = this.parentElement;
      const dropdown = parent.querySelector('.dropdown-menu');
      
      // Nur reagieren, wenn ein Dropdown existiert
      if (dropdown) {
        e.preventDefault();
        e.stopPropagation();

        // 1. Prüfen OB das Dropdown bereits offen ist (BEVOR wir etwas ändern)
        const isOpen = parent.classList.contains('active');
        
        // 2. Erst ALLE Dropdowns schließen (inklusive diesem!)
        document.querySelectorAll('.nav-item').forEach(item => {
          item.classList.remove('active');
        });
        
        // 3. Nur wieder öffnen, wenn es vorher NICHT offen war
        if (!isOpen) {
          parent.classList.add('active');
        }
        // Wenn es offen war (isOpen = true), bleibt es jetzt geschlossen ✓
      }
    }
  });
});

// === Scroll Animation (Intersection Observer) ===
const revealElements = document.querySelectorAll('.reveal');
const revealCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
};

const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver(revealCallback, revealOptions);
revealElements.forEach(el => {
  observer.observe(el);
});