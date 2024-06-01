const skills = [
    {
        category: 'Frontend',
        items: ['html5', 'css3', 'javascript', 'jquery', 'react', 'vuejs', 'sass', 'tailwindcss', 'typescript', 'webpack', 'vitejs'
        ]
    },
    {
        category: 'Backend',
        items: ['c', 'cplusplus', 'python', 'rust', 'go', 'mysql', 'sqlite', 'cmake', 'elasticsearch', 'flask', 'pytorch'
        ]
    },
    {
        category: 'Fullstack',
        items: ['nodejs', 'qt', 'electron', 'tauri', 'cloudflareworkers', 'jekyll'
        ]
    },
    {
        category: 'Tools',
        items: ['linux', 'windows8', 'powershell', 'git', 'github', 'githubactions', 'vim', 'vscode', 'docker', 'cloudflare', 'jupyter', 'postman'
        ]
    }
]

const paint_white = ['rust', 'flask', 'github']

const skill = document.querySelector('.skill')

skills.forEach(({ category, items }, index) => {
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