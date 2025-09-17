function openTab(evt, targetTab) {
    var idx, tabContentSection, tabNavigationLinks;
    tabContentSection = document.getElementsByClassName("tab__wrapper");
    for (idx = 0; idx < tabContentSection.length; idx++) {
        tabContentSection[idx].style.display = "none";
    }
    tabNavigationLinks = document.getElementsByClassName("project__tab");
    for (idx = 0; idx < tabNavigationLinks.length; idx++) {
        tabNavigationLinks[idx].className = tabNavigationLinks[idx].className.replace(" active", "");
    }
    document.getElementById(targetTab).style.display = "flex";
    evt.currentTarget.className += " active";
}