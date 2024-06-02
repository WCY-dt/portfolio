fetch('./assets/data/skill.json')
    .then(response => response.json())
    .then(skills => {
        const paint_white = ['rust', 'flask', 'github']

        const skill = document.querySelector('.skill')

        skills.forEach((data, index) => {
            const category = data.category
            const items = data.item

            const title = document.createElement('div')
            title.classList.add('skill-title')
            title.textContent = category
            skill.appendChild(title)

            const ul = document.createElement('ul')
            items.forEach(item => {
                const li = document.createElement('li')
                const img = document.createElement('img')
                img.src = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${item}/${item}-original.svg`
                img.alt = item
                if (paint_white.includes(item)) {
                    img.classList.add('white-img')
                }
                img.loading = 'lazy'
                li.appendChild(img)
                ul.appendChild(li)
            })
            skill.appendChild(ul)

            if (index !== skills.length - 1) {
                skill.appendChild(document.createElement('hr'))
            }
        })
    })