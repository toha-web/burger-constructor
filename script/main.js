import { parallax } from "./parallax.js";
import { burgerConstructor } from "./constructor.js";

let isOpenMenu = false;

function activeMenu(){
    let threshold;
    function setTreshold(){
        if (window.innerWidth > 768) {
            threshold = 0.7;
        } else if (window.innerWidth < 768) {
            threshold = 0.3;
        }
    };
    setTreshold();

    const observer = new IntersectionObserver((sections) => {
        sections.forEach(section => {
            if(section.isIntersecting){
                const menu = document.querySelectorAll("nav a");
                menu.forEach((item) => {
                    item.classList.remove("active");
                    if (item.getAttribute("href").slice(1) === section.target.id) {
                        item.classList.add("active");
                    } 
                    else if (item.getAttribute("href") === "#" && section.target.id === "intro") {
                        item.classList.add("active");
                    }
                });
            }
        });
    }, {
        threshold: threshold
    })
    document.querySelectorAll("section").forEach((section) => {
        observer.observe(section);
    });
}

window.addEventListener("resize", () => {
    activeMenu();
});

function mobileMenu(){
    const icon = document.querySelector(".mobile-menu-icon");
    const iconImage = document.querySelector(".mobile-menu-icon");
    const mobileMenu = document.querySelector(".mobile-menu");
    const body = document.querySelector("body");
    const [...link] = document.querySelectorAll(".mobile-menu a");

    function toggleMenu(){
        mobileMenu.classList.toggle("opened");
        body.classList.toggle("locked");
        iconImage.classList.toggle("opened");
        isOpenMenu = !isOpenMenu;
    }
    icon.addEventListener("click", () => {
        console.log("icon");
        toggleMenu();
    });
    link.forEach(a => {
        a.addEventListener("click", () => {
            toggleMenu();
        });
    });
}

addEventListener("DOMContentLoaded", () => {
    parallax();
    activeMenu();
    burgerConstructor();
    mobileMenu();
    callBack();
});

function callBack(){
    const modalClose = document.querySelector(".modal-close");
    const contentBlock = document.createElement("div");
    contentBlock.className = "callbackContent";

    const text = document.createElement("div");
    text.innerText = "Enter your phone and wait the a call from us."

    const form = document.createElement("form");

    const input = document.createElement("input");
    input.placeholder = "+38 (0____) __________";

    const mask = IMask(input, {
        mask: "+38 (\\000) 000 00 00"
    });

    const submit = document.createElement("button");
    submit.type = "button";
    submit.innerText = "Ok";

    submit.addEventListener("click", () => {
        alert(`Call to ${mask.value}`);
        modalClose.click();
    });

    form.append(input, submit);
    contentBlock.append(text, form);

    const callbackBtns = document.querySelectorAll(".callback");
    callbackBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            openModal(contentBlock);
        });
    })
}

export function openModal(content, reset = false){
    const body = document.querySelector("body");
    const modal = document.querySelector(".modal");
    const modalBody = document.querySelector(".modal-body");
    const modalClose = document.querySelector(".modal-close");

    modalBody.append(content);
    modal.style.display = "flex";

    if(isOpenMenu){
        document.querySelector(".mobile-menu-icon").click();
    }
    body.classList.add("locked");

    modalClose.addEventListener("click", () => {
        if (reset) {
            location.reload();
        }
        else if (modalBody.children.length > 1) {
            modalBody.removeChild(content);
        }
        body.classList.remove("locked");
        modal.style.display = "none";
    })
}