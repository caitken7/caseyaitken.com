// ===========================================
// Scroll Fade
// ===========================================

const triggerFade = () => {
  /* Check the location of each desired element */
  $('.fade-in-section:not(.is-visible)').each((index, element) => {
      const bottom_of_object = $(element).offset().top + $(element).outerHeight() - ($(window).height() / 5);
      const bottom_of_window = $(window).scrollTop() + $(window).height();
      
      /* If the object is completely visible in the window, fade it it */
      if ( bottom_of_window > bottom_of_object ) {
          $(element).addClass('is-visible');
      }
  }); 
};

/* Every time the window is scrolled... */
$(window).scroll(() => {
  triggerFade();
});

// Auto show elements containing on-load class
$('.fade-in-section.fade-in-section--on-load').each((index, element) => {
  $(element).addClass('is-visible');
});


export const init = () => {
  // Auto show anything that's already in view
  triggerFade();
};
