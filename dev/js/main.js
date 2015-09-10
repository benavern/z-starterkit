(function() {
  scrollingThings();
  smoothScroll();
  createSocialLinks();
})();


function scrollingThings() {

  // the title
  var title = document.getElementById('title');
  var titleBottomBox = document.getElementById('header').offsetHeight;

  window.addEventListener('scroll', function() {
    var wScroll = window.pageYOffset;

    // page title effects
    if (wScroll <= titleBottomBox){
      // title scrolling 2 times slower that the page
      title.style.transform = 'translate(0px, '+ wScroll /2 +'%)';
      // it fades out when scrolling down
      title.style.opacity = 1/titleBottomBox*(titleBottomBox-wScroll);
    }

  });
}

function smoothScroll() {

  var links = document.getElementsByTagName('a');

  for(var i=0; i<links.length; i++){
    if(links[i].getAttribute('data-scroll')){

      (function(i){
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

// social links made easy
function createSocialLinks() {
  var here = window.location.href;
  var URL = {
    facebook: "http://www.facebook.com/sharer.php?u=" + here,
    twitter: "https://twitter.com/share?url="+ here +"&text=Just%20found%20something%20awesome!&via=benavern",
    googlePlus: "https://plus.google.com/share?url=" + here,
    mail: "mailto:?subject=Just%20found%20something%20awesome!&body=Hey!%20What%20do%20you%20think%20about%20" + here + " ?"
  };
  var sp = document.getElementById('social-wrapper');

  for(var x in URL){
    var el = document.createElement("a");
    el.title = "Share via " + x;
    el.className = "social-btn " + x;
    el.href = URL[x];
    sp.appendChild(el);
  }


}
