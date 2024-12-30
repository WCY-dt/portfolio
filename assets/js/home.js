let colorbg_home = null

function generateBg() {
    colorbg_home = new Color4Bg.BlurGradientBg({
        seed: Math.random(),
        dom: "home",
        colors: ["#11694E", "#48BF91", "#8FD9A8", "#15997A", "#01796F", "#11694E"],
        loop: true
    })
}

function destroyBg() {
    if (colorbg_home) {
        colorbg_home.destroy()
    }
}

let observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            generateBg()
        } else {
            destroyBg()
        }
    })
})

observer.observe(document.getElementById('home'))