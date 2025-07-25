document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggles = document.querySelectorAll('ul.dropdown-menu [data-toggle=dropdown]');
    const lastVisitedLink = document.querySelector('#last-visited-page')

    if (localStorage.getItem('last-visited-url')) {
      document.querySelector('#last-visited-container').style.display = 'block'
      document.querySelector('#last-visited-page').innerHTML = localStorage.getItem('last-visited-title')
      document.querySelector('#last-visited-page').href = localStorage.getItem('last-visited-url')
    } else {
      document.querySelector('#last-visited-container').style.display = 'none'
    }
  
    dropdownToggles.forEach(function(dropdownToggle) {
      dropdownToggle.addEventListener('click', function(event) {
        const parent = this.parentNode;
        const siblings = parent.parentNode.children;
        
        for (let i = 0; i < siblings.length; i++) {
          if (siblings[i] !== parent) {
            siblings[i].classList.remove('open');
          }
        }
        
        parent.classList.toggle('open');
        event.preventDefault();
        event.stopPropagation();
      });
    });
});
