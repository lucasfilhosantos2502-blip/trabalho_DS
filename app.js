/* ==========================================================================
   VOLT — Landing Page Premium
   ========================================================================== */

function initVolt() {
  document.documentElement.classList.add('js-enabled');

  // 1. Navbar: adiciona estilo ao rolar e fecha menu mobile ao clicar em links
  const navbar = document.getElementById('mainNavbar');

  function updateNavbarOnScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  updateNavbarOnScroll();
  window.addEventListener('scroll', updateNavbarOnScroll, { passive: true });

  const navLinks = document.querySelectorAll('#navMenu .nav-link');
  const navMenuEl = document.getElementById('navMenu');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenuEl.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(navMenuEl).hide();
      }
    });
  });

  // 2. Animação de entrada (fade-in com IntersectionObserver)
  const revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealItems.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('is-visible'), index * 70);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  // 3. Filtro de produtos por categoria
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productItems = document.querySelectorAll('.product-item');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      productItems.forEach((item) => {
        const matches = filter === 'todos' || item.dataset.category === filter;
        item.classList.toggle('hidden-item', !matches);
      });
    });
  });

  // 4. Seleção de cor e tamanho
  const colorOptions = document.getElementById('colorOptions');
  const sizeOptions = document.getElementById('sizeOptions');

  if (colorOptions) {
    colorOptions.querySelectorAll('.color-swatch').forEach((swatch) => {
      swatch.addEventListener('click', () => {
        colorOptions.querySelectorAll('.color-swatch').forEach((s) => s.classList.remove('active'));
        swatch.classList.add('active');
      });
    });
  }

  if (sizeOptions) {
    sizeOptions.querySelectorAll('.size-swatch').forEach((swatch) => {
      swatch.addEventListener('click', () => {
        sizeOptions.querySelectorAll('.size-swatch').forEach((s) => s.classList.remove('active'));
        swatch.classList.add('active');
      });
    });
  }

  // 5. Filtro visual de cor na imagem do produto em destaque
  const featuredImg = document.getElementById('featuredImg');
  const colorFilters = {
    'Branco': 'none',
    'Preto': 'brightness(0.65) contrast(1.15)',
    'Vermelho': 'sepia(0.5) saturate(4) hue-rotate(-40deg) brightness(0.9)',
    'Cinza': 'grayscale(0.6) brightness(0.9)'
  };

  if (colorOptions && featuredImg) {
    colorOptions.querySelectorAll('.color-swatch').forEach((swatch) => {
      swatch.addEventListener('click', () => {
        featuredImg.style.transition = 'filter 0.35s ease';
        featuredImg.style.filter = colorFilters[swatch.dataset.color] || 'none';
      });
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVolt);
} else {
  initVolt();
}