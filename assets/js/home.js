let colorbg_home = null

function generateHomeBg() {
    colorbg_home = new Color4Bg.BlurGradientBg({
        seed: Math.random(),
        dom: "home",
        colors: ["#11694E", "#48BF91", "#8FD9A8", "#15997A", "#01796F", "#11694E"],
        loop: true
    })
}

function destroyHomeBg() {
    if (colorbg_home) {
        colorbg_home.destroy()
    }
}

let homeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            generateHomeBg()
        } else {
            destroyHomeBg()
        }
    })
})

homeObserver.observe(document.getElementById('home'))