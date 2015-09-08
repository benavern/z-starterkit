(function() {
  scrollingThings();
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

  })
}
