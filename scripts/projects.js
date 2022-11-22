// ===========================================
// Projects
// ===========================================

// import projectJSON from './project-data.json';
import projectJSON from './project-data.json' assert { type: 'JSON' };

const projectData = projectJSON;

// Filter out projects that are disabled or have no title
const filteredProjectData = projectData.filter(project => project.title.length > 0 && !project.disabled);

const numToShow = 6;
let sliceStart = 0,
    sliceEnd = numToShow;

const displayCards = () => {
  console.log("sliceStart", sliceStart);
  console.log("sliceEnd", sliceEnd);
  // Create project card markup
  $.each(filteredProjectData.slice(sliceStart, sliceEnd), (key, val) => {
    const magicCard = `<button id="two" class='projects__card fade-in-section' 
                        data-modal-trigger
                        data-project-title='${val.title}'
                        data-project-platform='${val.platform}'
                        data-project-role='${val.role}'
                        data-project-description='${val.description}'
                        data-project-url='${val.url}'
                        data-project-image-thumbnail='${val.image_thumbnail}'
                        data-project-image-desktop='${val.image_desktop}'
                        data-project-image-mobile='${val.image_mobile}'
                      >
                        <img src='${val.image_thumbnail}'>
                        <div class='projects__card-text-wrap'>
                          <h3 class='projects__card-title'>${val.title}</h3>
                          <p class='projects__card-cta'>Learn More</p>
                        </div>
                      </button>`;
                      
    if  (val.title.length > 0) $('[data-projects-card-grid]').append(magicCard);
  });

  // Hide 'Show More' button once all cards are displayed
  if (sliceEnd >= filteredProjectData.length) {
    console.log("sliceEnd", sliceEnd);
    console.log("filteredProjectData.length", filteredProjectData.length);
    console.log("the end");
    $('[data-projects-show-more]').hide();
  };

  // Increment slice values
  sliceStart = sliceStart + numToShow;
  sliceEnd = sliceEnd + numToShow;

  // Re-bind UI actions
  bindUIActions();
};


// ==========================================
// Bind & Export
// ==========================================

const bindUIActions = () => {

  // ------------------------
  // Open Project Modal
  // ------------------------
  $(document).on('click', '[data-modal-trigger]', function() {
    var buttonId = $(this).attr('id');

    // Build the modal markup
    const projectTitle = $(this).data('project-title');
    const projectPlatform = $(this).data('project-platform');
    const projectDescription = $(this).data('project-description');
    const projectRole = $(this).data('project-role');
    const projectUrl = $(this).data('project-url');
    const projectImageThumbnail = $(this).data('project-image-thumbnail');
    const projectImageDesktop = $(this).data('project-image-desktop');
    const projectImageMobile = $(this).data('project-image-mobile');

    const linkClass = projectUrl.length > 0 ? 'visible' : 'hidden'; 

    const desktopImageMarkup = projectImageDesktop.length > 0 ? `<img src='${projectImageDesktop}' alt='${projectTitle} screenshot' class='modal__image'>` : '';
    const mobileImageMarkup = projectImageMobile.length > 0 ? `<img src='${projectImageMobile}' alt='${projectTitle} screenshot' class='modal__image'>` : '';

    const modalMarkup = `
      <div class='modal__content'>
        <button class='modal__close' data-modal-close>Close Modal</button>
        <div class='modal__text-wrap'>
          <h3 class='modal__title'>${projectTitle}</h3>
          <p class='modal__platform'>Platform: ${projectPlatform}</p>
          <p class='modal__description'><span>Client Description:</span>${projectDescription}</p>
          <p class='modal__role'><span>My Role:</span>${projectRole}</p>
          <a class='modal__url ${linkClass}' href='${projectUrl}' target='_blank'>Visit ${projectTitle}</a>
        </div>
        <div class='modal__image-wrap'>
          ${desktopImageMarkup}
          ${mobileImageMarkup}
        </div>
      </div>
    `;

    // Reveal Modal
    $('#modal-container').removeAttr('class').addClass(buttonId);
    $('body').addClass('modal-active');
    $('[data-modal-window]').scrollTop(0);
    $('[data-modal-window]').html(modalMarkup);
  })

  // ------------------------
  // Close Project Modal
  // ------------------------
  $(document).on('click', '[data-modal-close]', (e) => {
    if ($(e.target).is('[data-modal-close]')) {
      $('#modal-container').addClass('out');
      $('body').removeClass('modal-active');
    }
  });
};

// ------------------------
// 'SHOW MORE' Button
// ------------------------
$(document).on('click', '[data-projects-show-more]', (e) => {
  displayCards();
  const scrollValue = window.innerHeight / 3.5;
  window.scrollBy({
    top: scrollValue,
    left: 0,
    behavior: 'smooth'
  });
});



export const init = () => {
  displayCards();
  bindUIActions();
};

