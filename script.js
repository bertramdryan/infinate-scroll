const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];


// Unsplash API
const count = 5;
const apiKey = 'e7SBpnZsEFB3cRP8dVfjauysxwfxHXRkesUeRlemr1c';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded() {
 imagesLoaded++;
 if (imagesLoaded === totalImages) {
  ready = true;
  loader.hidden = true;
  count = 30;
 }
}

// Helper function to set attributes on DOM elements
function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}


// Create element for links & photos and Add to Dom
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photoArray.length;
  photoArray.forEach((photo) => {
    // Create <a> </a> to link to Unsplish
    const item = document.createElement('a');
    
    // Create <img> for photo 
    setAttribute(item, {
      href: photo.links.html,
      target: '_blank'
    })
    const img = document.createElement('img');
    
    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });


     // Event listener, check when each is finished loading
     img.addEventListener('load', imageLoaded);

     // put <img> inside <a> then put both into imageContainer
     item.appendChild(img);
     imageContainer.appendChild(item);
     
    });
  }
  



// Get photos from UsplashAPI
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    displayPhotos();
   
  } catch {
    // Catch Error
  }
  
}

// Check to see if scrolling near the bottom of page, load more photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

// onload
getPhotos();
