var blog = document.querySelector('.cluster1 .link-title');
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

var mind = document.querySelector('.cluster2 .link-title');
var originalContent2 = mind.textContent;
var originalFontSize2 = mind.style.fontSize;
mind.addEventListener('mouseover', function() {
    mind.textContent = 'mind.ch3nyang.top';
    mind.style.fontSize = '1.5em';
    mind.style.textDecoration = 'underline';
});
mind.addEventListener('mouseout', function() {
    mind.textContent = originalContent2;
    mind.style.fontSize = originalFontSize2;
    mind.style.textDecoration = 'none';
});