// app.js

$(document).ready(function() {
    const navbar = $('.custom-navbar');
    const logoImg = $('.navbar-brand .logo-img');
    const navbarBrand = $('.navbar-brand');
    const heroSection = $('.hero-section');

    // --- Navbar & Logo Scroll Effect ---
    $(window).on('scroll', function() {
        const scrollDistance = 50;
        const isScrolled = $(window).scrollTop() > scrollDistance;

        if (isScrolled) {
            navbar.addClass('navbar-scrolled');
            logoImg.addClass('logo-scrolled');
            navbarBrand.addClass('scrolled');
        } else {
            navbar.removeClass('navbar-scrolled');
            logoImg.removeClass('logo-scrolled');
            navbarBrand.removeClass('scrolled');
        }
    });

    // --- Keep logo centered (handles resize/orientation) ---
    $(window).on('resize', function() {
        navbarBrand.css({
            left: '50%',
            transform: 'translateX(-50%)'
        });
    }).trigger('resize');
});

// --- WHO CAN JOIN interactive hover logic ---
$(document).ready(function() {
  const joinCards = $('.join-card');

  joinCards.on('mouseenter', function() {
    const index = $(this).closest('.col-6').index(); // position within parent row
    const allCards = $(this).closest('.row').find('.join-card');

    // Reset all first
    allCards.removeClass('expanded-up expanded-down hidden-card');

    // Determine if card is top or bottom (0–1 = top row, 2–3 = bottom)
    if (index <= 1) {
      // Top row card: expands downward, hides its below counterpart
      $(this).addClass('expanded-down');
      const belowCard = allCards.eq(index + 2);
      belowCard.addClass('hidden-card');
    } else {
      // Bottom row card: expands upward, hides its above counterpart
      $(this).addClass('expanded-up');
      const aboveCard = allCards.eq(index - 2);
      aboveCard.addClass('hidden-card');
    }
  });

  joinCards.on('mouseleave', function() {
    const allCards = $(this).closest('.row').find('.join-card');
    allCards.removeClass('expanded-up expanded-down hidden-card');
  });
});

// --- Tab Switching Logic for Training Section ---
$(document).ready(function() {
  $('.tab-btn').on('click', function() {
    const target = $(this).data('tab');

    // Switch active button
    $('.tab-btn').removeClass('active');
    $(this).addClass('active');

    // Switch content
    $('.tab-content').removeClass('active');
    $('#' + target).addClass('active');
  });
});

// --- Parallax effect for About Page Hero Icons ---
const aboutHero = $('.about-hero');
const aboutIcons = $('.about-hero i');

aboutHero.on('mousemove', function(e) {
  if ($(window).width() < 992) return; // skip on small screens

  const x = e.pageX - aboutHero.offset().left;
  const y = e.pageY - aboutHero.offset().top;
  const centerX = aboutHero.width() / 2;
  const centerY = aboutHero.height() / 2;

  const diffX = x - centerX;
  const diffY = y - centerY;

  aboutIcons.each(function() {
    const icon = $(this);
    const speed = parseFloat(icon.data('speed'));
    const translateX = -diffX * 0.02 * speed;
    const translateY = -diffY * 0.02 * speed;
    icon.css('transform', `translate(${translateX}px, ${translateY}px)`);
  });
});

aboutHero.on('mouseleave', function() {
  if ($(window).width() < 992) return;
  aboutIcons.css('transform', 'translate(0px, 0px)');
});


// --- Fade-in effect on scroll ---
$(window).on('scroll', function() {
  $('.step-card').each(function() {
    const cardTop = $(this).offset().top;
    const windowBottom = $(window).scrollTop() + $(window).height();

    if (cardTop < windowBottom - 100) {
      $(this).addClass('visible');
    }
  });
});

// --- FAQ Toggle Logic ---
$(document).ready(function() {
  $('.faq-question').on('click', function() {
    const answer = $(this).next('.faq-answer');
    $('.faq-answer').not(answer).slideUp(); // close others
    answer.slideToggle(); // toggle current
  });
});


$(document).ready(function() {
    // Select elements once
    const navbar = $('.custom-navbar');
    const heroSection = $('.hero-section');
    const icons = $('.hero-section i'); 
    const logoImg = $('.navbar-brand .logo-img'); // The logo image
    const navbarBrand = $('.navbar-brand'); // The entire logo container

    // --- Navbar and Logo Scroll Effect ---
    $(window).on('scroll', function() {
        const scrollDistance = 50;
        const isScrolled = $(window).scrollTop() > scrollDistance;
        
        // 1. Navbar background and general scrolled class
        if (isScrolled) {
            // Apply primary color to navbar
            navbar.css('background-color', 'var(--primary-color)'); 
            navbar.addClass('navbar-scrolled'); 
            
            // 2. Logo resizing and repositioning
            logoImg.addClass('logo-scrolled');
            // This class repositions the logo container and hides the text on desktop
            navbarBrand.addClass('scrolled');
            
            // Adjust hero padding (only applies on desktop >= 992px)
            if ($(window).width() >= 992) {
                heroSection.addClass('scrolled');
            }
        } else {
            // Revert navbar to transparent
            navbar.css('background-color', 'transparent'); 
            navbar.removeClass('navbar-scrolled'); 

            // Revert logo size and position
            logoImg.removeClass('logo-scrolled');
            navbarBrand.removeClass('scrolled');
            
            // Revert hero padding
            heroSection.removeClass('scrolled');
        }
    });

    // --- Mouse Parallax Effect for Background Icons ---
    heroSection.on('mousemove', function(e) {
        // Only run parallax on desktop/larger screens (optional optimization)
        if ($(window).width() < 992) return; 

        // Get mouse position relative to the hero section
        const x = e.pageX - heroSection.offset().left;
        const y = e.pageY - heroSection.offset().top;

        // Calculate center of the hero section
        const centerX = heroSection.width() / 2;
        const centerY = heroSection.height() / 2;

        // Get difference from center
        const diffX = x - centerX;
        const diffY = y - centerY;

        icons.each(function() {
            const icon = $(this);
            const speed = parseFloat(icon.data('speed')); 

            const translateX = -diffX * 0.02 * speed; 
            const translateY = -diffY * 0.02 * speed; 

            icon.css('transform', `translate(${translateX}px, ${translateY}px)`);
        });
    });

    // Reset icon positions when mouse leaves the hero section
    heroSection.on('mouseleave', function() {
        // Only reset parallax on desktop/larger screens
        if ($(window).width() < 992) return; 
        icons.css('transform', 'translate(0px, 0px)');
    });

    // --- Mobile Menu Logo Sizing ---
    const mobileMenu = $('#navbarNavAltMarkup'); // Your collapsible menu element
    
    // When the mobile menu is about to be shown (opening)
    mobileMenu.on('show.bs.collapse', function() {
        if ($(window).width() < 992) { // Only apply on tablet/mobile screens
            logoImg.addClass('mobile-menu-active');
            navbarBrand.addClass('mobile-menu-active'); 
        }
    });

    // When the mobile menu is about to be hidden (closing)
    mobileMenu.on('hide.bs.collapse', function() {
        if ($(window).width() < 992) { // Only apply on tablet/mobile screens
            logoImg.removeClass('mobile-menu-active');
            navbarBrand.removeClass('mobile-menu-active');
        }
    });
});
