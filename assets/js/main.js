/**
* Template Name: MyPortfolio
* Updated: Jul 27 2023 with Bootstrap v5.3.1
* Template URL: https://bootstrapmade.com/myportfolio-bootstrap-portfolio-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * burgerMenu
   */
  const burgerMenu = select('.burger')
  on('click', '.burger', function(e) {
    burgerMenu.classList.toggle('active');
  })

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    // Initialize portfolio grid with Isotope
    let portfolioContainer = select('#portfolio-grid');
    let gridContainer = select('.grid-container');
    let portfolioIsotope;
    
    if (portfolioContainer) {
      portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.item',
      });
    }
    
    // Don't initialize Isotope on grid-container
    // Instead, handle filtering manually for grid items
    let portfolioFilters = select('#filters a', true);

    on('click', '#filters a', function(e) {
      e.preventDefault();
      portfolioFilters.forEach(function(el) {
        el.classList.remove('active');
      });
      this.classList.add('active');

      let filterValue = this.getAttribute('data-filter');
      
      // Handle portfolio grid with Isotope
      if (portfolioIsotope) {
        portfolioIsotope.arrange({
          filter: filterValue
        });
      }
      
      // Handle grid items with plain JavaScript
      if (gridContainer) {
        const gridItems = gridContainer.querySelectorAll('.grid-item');
        gridItems.forEach(item => {
          if (filterValue === '*') {
            item.style.display = '';
          } else if (item.classList.contains(filterValue.replace('.', ''))) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      }

      // Refresh AOS
      if (portfolioIsotope) {
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }
    }, true);
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()