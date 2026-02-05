
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});


window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const orbs = document.querySelectorAll('.glow-orb');

  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 0.3;
    orb.style.transform = `translateY(${scrolled * speed}px)`;
  });
});


const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);


document.querySelectorAll('.skill-card, .project-card, .timeline-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});


const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
  } else {
    navbar.style.background = 'rgba(10, 10, 15, 0.9)';
    navbar.style.boxShadow = 'none';
  }

  lastScroll = currentScroll;
});


function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + '+';
    }
  }, 16);
}


const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      const number = entry.target.textContent.replace('+', '');
      if (!isNaN(number)) {
        animateCounter(entry.target, parseInt(number));
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
  if (stat.textContent.includes('+')) {
    statsObserver.observe(stat);
  }
});

console.log('Portfolio Quentin Thivand - Prêt! 🚀');
console.log('Recherche de stage: 30 mars - 12 juin 2026');
