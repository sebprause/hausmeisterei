// ============================================
// MOBILE NAVIGATION & DROPDOWN HANDLING
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  // === Burger-Menü Toggle ===
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.getElementById('mainNav');
  
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      mainNav.classList.toggle('active');
    });
  }
  
  // === Dropdown Toggle für Mobile (z.B. "Regionen") ===
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Nur auf Mobile reagieren
      if (window.innerWidth <= 768) {
        const parentItem = this.closest('.nav-item');
        const dropdown = parentItem.querySelector('.dropdown-menu');
        
        // Nur wenn dieses Item ein Dropdown hat
        if (dropdown) {
          e.preventDefault();
          e.stopPropagation();
          
          // Prüfen: Ist DIESES Dropdown gerade offen?
          const isCurrentlyOpen = parentItem.classList.contains('active');
          
          // Schritt 1: ALLE Dropdowns schließen
          document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
          });
          
          // Schritt 2: Nur öffnen, wenn es vorher ZU war (Toggle-Effekt)
          if (!isCurrentlyOpen) {
            parentItem.classList.add('active');
          }
          // Wenn es offen war, bleibt es jetzt geschlossen ✓
        }
      }
    });
  });
  
  // === Menü schließen beim Klick außerhalb ===
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      const isClickInsideNav = mainNav && mainNav.contains(e.target);
      const isClickOnToggle = navToggle && navToggle.contains(e.target);
      
      if (!isClickInsideNav && !isClickOnToggle) {
        if (mainNav && mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
        }
        
        // Auch alle Dropdowns schließen
        document.querySelectorAll('.nav-item.active').forEach(item => {
          item.classList.remove('active');
        });
      }
    }
  });
  
  // === Dropdowns schließen bei Fenster-Resize (Desktop) ===
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      if (mainNav) {
        mainNav.classList.remove('active');
      }
      document.querySelectorAll('.nav-item.active').forEach(item => {
        item.classList.remove('active');
      });
    }
  });
});

// ============================================
// SCROLL ANIMATIONEN (Intersection Observer)
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if (revealElements.length === 0) return;
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: Nicht mehr beobachten nach erstem Anzeigen
        // observer.unobserve(entry.target);
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
});