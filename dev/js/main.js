(function() {
  scrollingThings();
  smoothScroll();
})();


function scrollingThings() {

  // the title
  var title = document.getElementById('title');
  var titleBottomBox = document.getElementById('header').offsetHeight;

  window.addEventListener('scroll', function() {
    var wScroll = window.pageYOffset;

    // title scrolling 2 times slower that the page
    // it fades out when scrolling down
    if (wScroll <= titleBottomBox){
      title.style.transform = 'translate(0px, '+ wScroll /2 +'%)';
      title.style.opacity = 1/titleBottomBox*(titleBottomBox-wScroll);
    }

  });
}

function smoothScroll() {

  var links = document.getElementsByTagName('a');

  for(var i=0; i<links.length; i++){
    if(links[i].getAttribute('data-scroll')){

      (function(i){
        // linksScroll.push(links[0]);
        links[i].addEventListener('click', function(e) {
          e.preventDefault();
          var currentPosition = window.pageYOffset;
          var page = links[i].getAttribute('data-scroll');
          var target = document.getElementById(page).offsetTop;
          var distance = target - currentPosition;
          var speed = 750;
          var increments = distance/(speed/16);

          // if scrolling down
          if ( increments >= 0 ) {
            // Stop when you reach the target OR the bottom of the page
            stopAnimation = function () {
              var travelled = window.pageYOffset;
              if ( (travelled >= (target - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight) ) {
                clearInterval(animation);
              }
            };
          }
          // If scrolling up
          else {
            // Stop when you reach the target OR the top of the page
            stopAnimation = function () {
              var travelled = window.pageYOffset;
              if ( travelled <= (target || 0) ) {
                clearInterval(animation);
              }
            };
          }

          var scroll = function(){
            window.scrollBy(0, increments);
            stopAnimation();
          };
          var animation = setInterval(scroll, 16);

        });
      })(i);

    }
  }

}
