const menuIcon = document.querySelector(".hamburger");
const navigation = document.querySelector(".nav-links");
const a = document.querySelectorAll(".nav-links li");

menuIcon.addEventListener('click', ()=>{
    navigation.classList.toggle("open");
    a.forEach(link => {
        link.classList.toggle("fade");
    });
    menuIcon.classList.toggle("toggle");
});