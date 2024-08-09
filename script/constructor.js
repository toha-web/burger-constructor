import ingridients from "./constructor-ingridients.js";
import {openModal} from "./main.js";

function addIngridientsInfo(card, ingridient) {
    const [...cardItems] = card.children;

    const cardInfo = cardItems.find(item => item.classList.contains("card-info"));
    const [...infoItems] = cardInfo.children;

    const caloriesItem = infoItems.find(item => item.classList.contains("calories"));
    const [...caloriesInfo] = caloriesItem.children;
    const calories = caloriesInfo.find(item => item.classList.contains("info"));
    calories.innerText = `${ingridient.calories} kcal`;

    const timeItem = infoItems.find((item) => item.classList.contains("time"));
    const [...timeInfo] = timeItem.children;
    const time = timeInfo.find((item) => item.classList.contains("info"));
    time.innerText = `${ingridient.time} min`;

    const weightItem = infoItems.find(item => item.classList.contains("weight"));
    const [...weightInfo] = weightItem.children;
    const weight = weightInfo.find((item) => item.classList.contains("info"));
    weight.innerText = `${ingridient.weight} g`;
}

export function burgerConstructor(){
    const bottomBun = ingridients.find(item => item.name === "bottom-bun");
    let zIndex = 0;

    const burger = [];
    burger.push(bottomBun);

    addIngridient(bottomBun, zIndex);
    countSummary(burger);

    const [...ingridientCards] = document.querySelectorAll(".ingridient-card");
    ingridientCards.forEach(card => {
        const [...cardItems] = card.children;

        const ingridientImage = cardItems.find(item => item.classList.contains("card-image"));

        const ingridient = findIngridient(ingridientImage.nextElementSibling.innerText);
        addIngridientsInfo(card, ingridient);

        const [...cardCounter] = card.lastElementChild.children;

        const counter = cardCounter.find(item => item.classList.contains("quantity"));
        counter.innerText = ingridient.quantity;

        const decrementBtn = cardCounter.find(item => item.classList.contains("decrement-btn"));
        decrementBtn.addEventListener("click", () => {
            setTimeout(() => {
                if (ingridient.quantity > 0) {
                    ingridient.quantity --;
                    counter.innerText = ingridient.quantity;
                    burger.splice(burger.findIndex(el => el.name.toLocaleLowerCase() === ingridient.name.toLocaleLowerCase()), 1)
                    deleteIngridient(ingridient);
                    countSummary(burger);
                }
            }, 300);
        });

        const incrementBtn = cardCounter.find(item => item.classList.contains("increment-btn"));
        incrementBtn.addEventListener("click", () => {
            ingridient.quantity ++;
            zIndex ++;
            counter.innerText = ingridient.quantity;
            burger.unshift(ingridient);
            addIngridient(ingridient, zIndex, ingridientImage);
            countSummary(burger);
        });

        ingridientImage.addEventListener("click", () => {
            ingridient.quantity ++;
            zIndex ++;
            counter.innerText = ingridient.quantity;
            burger.unshift(ingridient);
            addIngridient(ingridient, zIndex, ingridientImage);
            countSummary(burger);
        })
    });

}

function findIngridient(name){
    return ingridients.find(item => item.name.toLocaleLowerCase() === name.toLowerCase());
}

function addIngridient(ingridient, zIndex, currentContainer){ 
    const burgerContainer = document.querySelector("#constructor .constructor-ingridients");
    let changeSrc = false;

    const ingridientContainer = document.createElement("div");
    ingridientContainer.className = "constructor-ingridient";
    ingridientContainer.style.zIndex = zIndex;
    ingridientContainer.style.marginBottom = `-${ingridient.margin}%`
    ingridientContainer.setAttribute("name", `${ingridient.name}`);

    const ingridientImage = document.createElement("img");
    ingridientImage.src = ingridient.image;

    if(burgerContainer.firstElementChild){
        if(burgerContainer.firstElementChild.innerHTML.includes("top-bun")){
            burgerContainer.firstElementChild.firstElementChild.src = "./images/ingridients/bun.png";
            changeSrc = true; 
        }
    }

    ingridientContainer.append(ingridientImage);
    burgerContainer.prepend(ingridientContainer);

    ingridientImage.addEventListener("load", () => {
        countHeight();
        if(ingridient.name !== "bottom-bun" && ingridient.name !== "bun"){
            animateIngridient(currentContainer, ingridient, ingridientContainer);
        }
        else if(ingridient.name === "bun" && !changeSrc){ 
            animateIngridient(currentContainer, ingridient, ingridientContainer);
        }
        changeSrc = true;
    })
}

function countSummary(burger){
    const orderBtn = document.querySelector(".order");
    const summaryCalories = document.querySelector(".burger-info .calories span");
    const summaryTime = document.querySelector(".burger-info .time span");
    const summaryWeight = document.querySelector(".burger-info .weight span");
    const totalCost = document.querySelector(".total-price span");

    let sumCal = 0;
    let sumTime = 0;
    let sumWeight = 0;
    let sumCost = 0;

    burger.forEach(ingri => {
        sumCal += ingri.calories;
        sumTime += ingri.time;
        sumWeight += ingri.weight;
        sumCost += ingri.cost;
    });

    summaryCalories.innerText = sumCal;
    summaryTime.innerText = sumTime;
    summaryWeight.innerText = sumWeight;
    totalCost.innerText = sumCost.toFixed(2)

    if(sumCost > 0){
        orderBtn.classList.add("active");
        orderBtn.removeAttribute("disabled");
        orderBtn.addEventListener("click", orderBurger);
    }
    else{
        orderBtn.classList.remove("active");
        orderBtn.disabled = true;
        orderBtn.removeEventListener("click", orderBurger);
    }

    if(sumCost >= 5){
        document.querySelector(".proposal").style.display = "none";
        document.querySelector(".gift").style.display = "block";
    }
    if(sumCost < 5){
        document.querySelector(".proposal").style.display = "block";
        document.querySelector(".gift").style.display = "none";
    }
}

function countHeight(){
    const burgerContainer = document.querySelector("#constructor .constructor-ingridients");
    const [...burgerChildren] = burgerContainer.children;
    const maxHeight = burgerContainer.clientHeight;
    const marginSize = burgerContainer.clientWidth / 100;
    const sureLabel = document.querySelector(".sure");
    let childrenHeight = 0;

    burgerChildren.forEach(item => {
        const itemHeight = item.clientHeight + parseInt(item.style.marginBottom) * marginSize;
        childrenHeight += itemHeight;
    })
    
    if(childrenHeight > maxHeight + 30){
        sureLabel.style.display = "block";
    }
    else{
        sureLabel.style.display = "none";
    }
}

function deleteIngridient(ingridient){
    const burgerContainer = document.querySelector("#constructor .constructor-ingridients");
    const [...burgerChildren] = burgerContainer.children;

    const deletedIngridient = burgerChildren.find(item => item.getAttribute("name") === ingridient.name);

    deletedIngridient.style.transition = "all 0.2s";
    deletedIngridient.style.opacity = 0;

    setTimeout(() => {
        burgerContainer.removeChild(deletedIngridient);
        countHeight();
    }, 120)
}

function orderBurger(){
    const modalClose = document.querySelector(".modal-close");

    const orderBtn = document.querySelector(".order");
    const burger = document.querySelector(".constructor-ingridients");
    const orderBurger = burger.cloneNode(true);
    orderBurger.className = "order-ingridients";

    const orderContainer = document.createElement("div");
    orderContainer.className = "orderContainer";

    const text = document.createElement("div");
    text.innerText = "The order has been accepted and is already being prepared. Thank you.";

    const form = document.createElement("form");

    const input = document.createElement("input");
    input.placeholder = "Enter Email";

    const mask = IMask(input, {
        mask: /[a-z0-9.-_]+@[a-z0-9_.-]+\.[a-z]{2,10}/,
    });

    const submit = document.createElement("button");
    submit.type = "button";
    submit.innerText = "Ok";

    submit.addEventListener("click", () => {
        alert(`Order Completed`);
        modalClose.click();
    });

    form.append(input, submit);

    const infoContainer = document.createElement("div");
    infoContainer.className = "orderInfo";

    infoContainer.append(text, form);

    orderContainer.append(orderBurger, infoContainer);
    orderBtn.classList.remove("active");
    orderBtn.disabled = true;
    openModal(orderContainer, true);
}

function animateIngridient(currentContainer, ingridient, targetContainer) {
    const startTop = currentContainer.getBoundingClientRect().top + window.scrollY;
    const startLeft = currentContainer.getBoundingClientRect().left + window.scrollX;
    const startWidth = currentContainer.getBoundingClientRect().width;

    const targetTop = targetContainer.getBoundingClientRect().top + window.scrollY;
    const targetLeft = targetContainer.getBoundingClientRect().left + window.scrollX;
    const targetWidth = targetContainer.getBoundingClientRect().width;

    let x = startLeft + (startWidth / 100) * 5;
    let y = startTop;
    let width = startWidth / 100 * 90;

    const animateImage = document.createElement("img");
    animateImage.src = `${ingridient.image}`;
    animateImage.style.position = "absolute";
    animateImage.style.top = `${y}px`;
    animateImage.style.left = `${x}px`;
    animateImage.style.width = `${width}px`;
    animateImage.style.objectFit = "contain";
    animateImage.style.zIndex = 99;

    const dx = targetLeft - startLeft;
    const dy = targetTop - startTop;
    const dw = targetWidth - startWidth;
    const duration = 0.2;

    let counter = 0;
    let time1 = null;
    function animate(time2){
        if(!time1) time1 = time2;
        const deltaTime = time2 - time1;
        time1 = time2;
        const fps = 1000 / deltaTime;
        
        const stepX = dx / (fps * duration);
        const stepY = dy / (fps * duration);
        const stepWidth = dw / (fps * duration);

        y += stepY;
        x += stepX;
        width += stepWidth;

        animateImage.style.top = `${y}px`;
        animateImage.style.left = `${x}px`;
        animateImage.style.width = `${width}px`;

        counter++;
        if (counter < (fps * duration)) {
            requestAnimationFrame(animate);
        }
        else{
            document.body.removeChild(animateImage);
        }
    }

    document.body.append(animateImage);
    requestAnimationFrame(animate);
}