let example1Btn;
let example2Btn;
let datasetBtn1;
let datasetBtn2;
let datasetBtn3;
let datasetBtn4;

const prevControl = document.querySelector('#carouselExampleChallenging .carousel-control-prev');
const nextControl = document.querySelector('#carouselExampleChallenging .carousel-control-next');

const prevControl_examples = document.querySelector('#carouselExampleCaptions .carousel-control-prev');
const nextControl_examples = document.querySelector('#carouselExampleCaptions .carousel-control-next');


document.addEventListener('DOMContentLoaded', function() {

    // Select buttons and carousels
    const example1Btn = document.getElementById('example1Btn');
    const example2Btn = document.getElementById('example2Btn');
    const datasetBtn1 = document.getElementById('DatasetBtn1');
    const datasetBtn2 = document.getElementById('DatasetBtn2');
    const datasetBtn3 = document.getElementById('DatasetBtn3');
    const datasetBtn4 = document.getElementById('DatasetBtn4');
    const challengingCarousel = document.getElementById('carouselExampleChallenging');
    const captionsCarousel = document.getElementById('carouselExampleCaptions');
    
    const carouselInnerExmples = captionsCarousel.querySelector('.carousel-inner'); // Get the carousel inner container
    const carouselInnerChallenging = challengingCarousel.querySelector('.carousel-inner'); // Get the carousel inner container

    function getCurrentSlideIndexChallenging() {
        const activeItem = carouselInnerChallenging.querySelector('.carousel-item.active'); // Get the active item
        const items = carouselInnerChallenging.querySelectorAll('.carousel-item'); // Get all items
        return Array.from(items).indexOf(activeItem); // Find the index of the active item
      }

    function getCurrentSlideIndex() {
        const activeItem = carouselInnerExmples.querySelector('.carousel-item.active'); // Get the active item
        const items = carouselInnerExmples.querySelectorAll('.carousel-item'); // Get all items
        return Array.from(items).indexOf(activeItem); // Find the index of the active item
      }

    // Function to update the active button for the challenging carousel
    function updateChallengingButton() {
        
      if (!challengingCarousel || !example1Btn || !example2Btn) return;
      const carouselInstance = bootstrap.Carousel.getInstance(challengingCarousel);
      if (!carouselInstance) return;
  
      const activeItem = challengingCarousel.querySelector('.carousel-item.active');
      if (activeItem && activeItem.classList.contains('example1')) {
        example1Btn.classList.add('active');
        example2Btn.classList.remove('active');
      } else if (activeItem && activeItem.classList.contains('example2')) {
        example2Btn.classList.add('active');
        example1Btn.classList.remove('active');
      } else {
        // Handle initial state or edge cases
        example1Btn.classList.add('active');
        example2Btn.classList.remove('active');
      }
    }
  
    // Function to update the active button for the captions carousel
    function updateDatasetButton(activeButton, current_pos) {

      const buttons = [datasetBtn1, datasetBtn2, datasetBtn3, datasetBtn4];
      buttons.forEach(btn => btn.classList.remove('active'));
      activeButton.classList.add('active');

      captionsCarousel.classList.remove('show-example-1-active');  
      captionsCarousel.classList.remove('show-example-2-active');  
      captionsCarousel.classList.remove('show-example-3-active');  
      captionsCarousel.classList.remove('show-example-4-active');  
      if (current_pos === 0 || current_pos === 1) {
        captionsCarousel.classList.add('show-example-1-active');
        } else if (current_pos === 2 || current_pos === 3) {
            captionsCarousel.classList.add('show-example-2-active');
        } else if (current_pos === 4 || current_pos === 5) {
            captionsCarousel.classList.add('show-example-3-active'); 
        } else if (current_pos === 6 || current_pos === 7) {
            captionsCarousel.classList.add('show-example-4-active');
        }    
    }
  
    // Event listener for Example 1 button
    if (example1Btn) {
      example1Btn.addEventListener('click', () => {
        if (challengingCarousel) {
          challengingCarousel.classList.remove('show-example-2-active');
          challengingCarousel.classList.add('show-example-1-active');
          $(challengingCarousel).carousel(0); // Go to the first Example 1 slide
          updateChallengingButton();
        }
      });
    } else {
      console.error("Element with ID 'example1Btn' not found.");
    }
  
    // Event listener for Example 2 button
    if (example2Btn) {
      example2Btn.addEventListener('click', () => {
        if (challengingCarousel) {
          challengingCarousel.classList.remove('show-example-1-active');
          challengingCarousel.classList.add('show-example-2-active');
          $(challengingCarousel).carousel(2); // Go to the first Example 2 slide
          updateChallengingButton();
        }
      });
    } else {
      console.error("Element with ID 'example2Btn' not found.");
    }
  
    // Listen for Bootstrap's 'slid.bs.carousel' event
    if (challengingCarousel) {
      challengingCarousel.addEventListener('slid.bs.carousel', () => {
        
        const to = getCurrentSlideIndexChallenging();

        if (to === 0 || to === 1) {
            challengingCarousel.classList.remove('show-example-2-active');
            challengingCarousel.classList.add('show-example-1-active');
        } else if (to === 2 || to === 3) {
            challengingCarousel.classList.remove('show-example-1-active');
            challengingCarousel.classList.add('show-example-2-active');
        }

        updateChallengingButton();
      });
    }

    if (captionsCarousel) {
        captionsCarousel.addEventListener('slid.bs.carousel', () => {
        const to = getCurrentSlideIndex();

        if (to === 0 || to === 1) {
            updateDatasetButton(datasetBtn1, to);
        } else if (to === 2 || to === 3) {
            updateDatasetButton(datasetBtn2, to);
        } else if (to === 4 || to === 5) {
            updateDatasetButton(datasetBtn3, to);
        } else if (to === 6 || to === 7) {
            updateDatasetButton(datasetBtn4, to);
        }
        }); 
      }
    
    // Event listeners for Dataset buttons
    if (datasetBtn1) {
      datasetBtn1.addEventListener('click', () => {
        $(captionsCarousel).carousel(0); // Go to the first Example 2 slide
        updateDatasetButton(datasetBtn1, 0);
      });
    }

    if (datasetBtn2) {
      datasetBtn2.addEventListener('click', () => {        
        if (captionsCarousel) {            
            $(captionsCarousel).carousel(2); // Go to the first Example 2 slide
            updateDatasetButton(datasetBtn2, 2);
          }
      });
    }
    if (datasetBtn3) {
      datasetBtn3.addEventListener('click', () => {
        $(captionsCarousel).carousel(4); // Go to the first Example 4 slide
        updateDatasetButton(datasetBtn3, 4);
      });
    }
    if (datasetBtn4) {
      datasetBtn4.addEventListener('click', () => {
        $(captionsCarousel).carousel(6); // Go to the first Example 6 slide
        updateDatasetButton(datasetBtn4, 6);
      }); 
    }

    // Initialize with Example 1 visible on load
    if (challengingCarousel) {
        challengingCarousel.classList.add('show-example-1-active');
        $(challengingCarousel).carousel(0); // Set to the first slide
        updateChallengingButton();
        } else {
        console.error("Element with ID 'carouselExampleChallenging' not found.");
        }
        
    // Initialize with Example 1 visible on load
    if (captionsCarousel) {
        datasetBtn1.classList.add('active');
        $(captionsCarousel).carousel(0); // Set to the first slide
        updateDatasetButton(datasetBtn1, 0);
    } else {
    console.error("Element with ID 'captionsCarousel' not found.");
    }
  });