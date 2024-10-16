var blog = document.querySelector('.link-cluster .link-title');
var originalContent1 = blog.textContent;
var originalFontSize1 = blog.style.fontSize;

blog.addEventListener('mouseover', function() {
    blog.textContent = 'blog.ch3nyang.top';
    blog.style.fontSize = '1.5em';
    blog.style.textDecoration = 'underline';
});

blog.addEventListener('mouseout', function() {
    blog.textContent = originalContent1;
    blog.style.fontSize = originalFontSize1;
    blog.style.textDecoration = 'none';
});

async function getRecentBlogs() {
    const feed = "https://blog.ch3nyang.top/feed.xml";
    const response = await fetch(feed);
    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "text/xml");
    const items = xml.querySelectorAll("entry");
    const blogs = [];

    items.forEach(item => {
        const title = item.querySelector("title").textContent;
        const link = item.querySelector("link").getAttribute("href");
        const date = new Date(item.querySelector("published").textContent);
        const formattedDate = date.toLocaleDateString('en-CA');
        blogs.push({ title, link, date: formattedDate.replace(/-/g, '/') });
    });

    return blogs.slice(0, 6);
}

const blogCluster = document.querySelector("#blog-cluster");

getRecentBlogs().then(blogs => {
    blogs.forEach(blog => {
        const blogElement = document.createElement("a");
        blogElement.classList.add("blog-item");
        blogElement.href = blog.link;
        blogElement.innerHTML = `
            <span class="blog-title">${blog.title}</span>&nbsp;&nbsp;&nbsp;<span class="blog-date">(${blog.date})</span>
        `;
        blogCluster.appendChild(blogElement);
    });
});