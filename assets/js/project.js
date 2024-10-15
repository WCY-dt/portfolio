let dataHTMLs = []
const container = document.getElementById('project-content');
let currentDataIndex = 2
let totDataNum = 0

function getIndexDelta(idx, delta) {
    return (idx + delta + totDataNum) % totDataNum
}

fetch('./assets/data/project.json')
    .then(response => response.json())
    .then(datas => {
        datas.forEach((data, index) => {
            const div = document.createElement('div')
            div.classList.add('project-item')
            div.innerHTML = `
                <div class="project-info">
                    <span>${data.title}</span>
                </div>
                <div class="project-tech">
                    ${data.tech.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <div class="project-desc">${data.description}</div>
                <menu class="project-link">
                    ${!data.link ? `` : `
                        <a href="${data.link}" target="_blank">
                            <span>Demo</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="hsl(163, 100%, 21%)">
                                <path d="M120-120v-720h360v80H200v560h560v-280h80v360H120Zm268-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
                            </svg>
                        </a>
                    `}
                    ${!data.repolink ? `` : `
                        <a href="${data.repolink}" target="_blank">
                            <span>GitHub</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="hsl(163, 100%, 21%)">
                                <path d="M120-120v-720h360v80H200v560h560v-280h80v360H120Zm268-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
                            </svg>
                        </a>
                    `}
                </menu>
            `
            dataHTMLs.push(div)
        })

        totDataNum = dataHTMLs.length
        currentDataIndex = 2

        dataHTMLs.slice(getIndexDelta(currentDataIndex, -2), getIndexDelta(currentDataIndex, 2) + 1).forEach(dataHTML => {
            container.appendChild(dataHTML)
        })

        container.scrollTo({
            left: container.scrollWidth / 2 - container.clientWidth / 2,
            behavior: 'smooth'
        })
    })

function moveRight() {
    lastElementIdx = getIndexDelta(currentDataIndex, -3)
    currentDataIndex = getIndexDelta(currentDataIndex, -1)
    container.removeChild(container.children[container.children.length - 1])
    container.insertBefore(dataHTMLs[lastElementIdx], container.children[0])

    container.scrollTo({
        left: container.scrollWidth / 2 - container.clientWidth / 2,
        behavior: 'smooth'
    })
}

function moveLeft() {
    nextElementIdx = getIndexDelta(currentDataIndex, 3)
    currentDataIndex = getIndexDelta(currentDataIndex, 1)
    container.removeChild(container.children[0])
    container.appendChild(dataHTMLs[nextElementIdx])

    container.scrollTo({
        left: container.scrollWidth / 2 - container.clientWidth / 2,
        behavior: 'smooth'
    })
}

let isMouseDown = false;
let isScrolling = false;

container.addEventListener('mouseenter', (e) => {
    isMouseDown = false;
    isScrolling = false;
    container.addEventListener('mousedown', mouseDownHandler);
    container.addEventListener('mousemove', mouseMoveHandler);
    container.addEventListener('mouseup', mouseUpHandler);
})

container.addEventListener('mouseleave', (e) => {
    container.removeEventListener('mousedown', mouseDownHandler);
    container.removeEventListener('mousemove', mouseMoveHandler);
    container.removeEventListener('mouseup', mouseUpHandler);
    isMouseDown = false;
    isScrolling = false;
})

function mouseDownHandler(e) {
    isMouseDown = true;
}

function mouseMoveHandler(e){
    if (isMouseDown && !isScrolling) {
        isScrolling = true;

        if (e.movementX > 0) {
            moveRight()
        } else {
            moveLeft()
        }

        setTimeout(() => { isScrolling = false; }, 500);
    }
}

function mouseUpHandler(e) {
    isMouseDown = false;
}

let leftArrow = document.getElementById('project-left')
let rightArrow = document.getElementById('project-right')

leftArrow.addEventListener('click', moveRight)
rightArrow.addEventListener('click', moveLeft)