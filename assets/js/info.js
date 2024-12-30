let typed = null

function generateTyped() {
    typed = new Typed('#info__text', {
        strings: [
            'Hi there!',
            'Here is Chenyang, a full-st',
            'Here is <u>Ch3nyang</u>, a <u>full-stack</u> developer from China.'
        ],
        typeSpeed: 100,
    })
}

document.addEventListener('DOMContentLoaded', function() {
    let observer = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
            generateTyped()
            observer.disconnect()
        }
    }, { threshold: 0.2 })
    
    observer.observe(document.getElementById('info__text'))
})