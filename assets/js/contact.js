// 查找所有的 .contact__detail
contactDetails = document.querySelectorAll('.contact__detail');

// 每个都将innerhtml都复制多份
contactDetails.forEach((contactDetail, i) => {
    contactDetail.innerHTML = contactDetail.innerHTML.repeat(20);
});