window.addEventListener('scroll', function() {
    var menuItems = document.querySelectorAll('#menu a');
    menuItems.forEach(function(menuItem) {
        var targetElement = document.querySelector(menuItem.getAttribute('href'));
        var rect = targetElement.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom >= 0) {
            menuItem.parentElement.classList.add('active');
        } else {
            menuItem.parentElement.classList.remove('active');
        }
    });
});