import * as ingri from "./ingridients.js";

const animArea = document.querySelector("#intro");
let width = document.querySelector(".anim-burger").clientWidth;

export function parallax(){
    let animationProgress = 0;
    animArea.addEventListener("mousemove", (e) => {
        const screenWidth = window.innerWidth;
        const animAreaWidth = animArea.clientWidth;
        const indent = (screenWidth - animAreaWidth) / 2;

        let mousePercentMove =
            ((e.clientX - indent - animAreaWidth / 4) / animAreaWidth) * 100;
        animationProgress = (mousePercentMove / 50) * 100;

        if (animationProgress >= -45 && animationProgress <= 140) {
            animationProgress =
                animationProgress >= 0
                    ? animationProgress <= 100
                        ? animationProgress
                        : 100
                    : 0;

            ingridients.forEach((ingridient) => {
                ingridient.move(animationProgress);
            });
        }
    });
    addEventListener("scroll", () => {
        animationProgress = scrollY / (animArea.clientHeight / 3.5 * 2) * 100;
        if(animationProgress > 0 && animationProgress < 100){
            ingridients.forEach((ingridient) => {
                ingridient.move(animationProgress);
            });
        }
    });
    addEventListener("resize", () => {
        width = document.querySelector(".anim-burger").clientWidth;
        ingridients.forEach((ingridient) => {
            ingridient.move(0);
        });
    });
}

class Ingridient{
    constructor(item, size, destSize, x, dx, y, dy, deg, dDeg, z, dz){
        this.object = item;
        this.currentSize = size || 50;
        this.destSize = destSize || 50;
        this.stepSize = (this.destSize - this.currentSize) / 100;
        this.currentX = x || 0;
        this.destX = dx || 0;
        this.stepX = (this.destX - this.currentX) / 100;
        this.currentY = y || 0;
        this.destY = dy || 0;
        this.stepY = (this.destY - this.currentY) / 100;
        this.currentDeg = deg || 0;
        this.destDeg = dDeg || 0;
        this.stepDeg = (this.destDeg - this.currentDeg) / 100;
        this.transition = Math.abs(Math.random() + 0.5 - 1);
        this.zIndex = z;
        this.destZindex = dz;
        this.stepZindex = (this.destZindex - this.zIndex) / 100;
        this.init();
    }

    init(){
        const y  = (width / 100) * (2.275 * this.currentY);
        this.object.style.top = `calc(50% + ${y}px)`;
    }

    move(progress){
        const y = (width / 100) * (2.275 * this.currentY);
        const stepY = ((width / 100) * (2.275 * this.destY) - y) / 100;
        this.object.style.transition = `all ${this.transition}s`;
        if (this.stepZindex !== 0) {
            this.object.style.zIndex = this.zIndex + this.stepZindex * progress;
        }
        if(this.stepSize !== 0){
            this.object.style.width = `${this.currentSize + this.stepSize * progress}%`;
        }
        if(this.stepX !== 0 && this.stepDeg == 0){
            this.object.style.transform = `translate(${
                this.currentX + this.stepX * progress
            }%) rotate(${this.currentDeg}deg)`;
        }
        if(this.stepX !== 0 && this.stepDeg !== 0){
            this.object.style.transform = `translate(${
                this.currentX + this.stepX * progress
            }%) rotate(${this.currentDeg + this.stepDeg * progress}deg)`;
        }
        if(this.stepY !== 0){
            this.object.style.top = `calc(50% + ${y + stepY * progress}px)`;
        }
    }
}

const ingridients = [
    new Ingridient(ingri.bottomBun, 0, 0, -30, -50, 8.5, 6.5, -14, 0, 0, 0),
    new Ingridient(ingri.mayo2, 0, 0, -32, -50, 8.4, 6.4, -12, 0, 0, 0),
    new Ingridient(ingri.salad2, 68, 50, -45, -50, 4.2, 4.21, 0, 0, 0, 0),
    new Ingridient(ingri.cheese, 55, 50, -35, -50, 4.5, 5, -15, 0, 0, 0),
    new Ingridient(ingri.onion1, 28, 20, 0, -50, -0.5, 4.2, -32, -20, 0, 0),
    new Ingridient(ingri.onion2, 30, 20, 0, -100, -1.5, 3.7, 0, -28, 0, 0),
    new Ingridient(ingri.onion3, 13, 20, 0, 100, -3.8, 4.2, -45, -15, 0, 0),
    new Ingridient(ingri.onion4, 22, 10, 0, 380, 1.5, 4, 5, -20, 0, 0),
    new Ingridient(ingri.onion5, 10, 20, 0, -120, -3.5, 3.3, 0, -20, 0, 0),
    new Ingridient(ingri.onion6, 14, 20, 0, -150, -9, 4, 8, -10, 0, 0),
    new Ingridient(ingri.cutlet, 60, 50, -40, -50, -5, 1.7, -8, 0, 4, 6),
    new Ingridient(ingri.tomato1, 23, 20, 0, -20, -10, 1, 0, 8, 6, 7),
    new Ingridient(ingri.tomato2, 22, 20, 0, 20, -6.5, 2.5, 25, 20, 6, 7),
    new Ingridient(ingri.tomato3, 22, 20, 0, 0, -9, 2, 40, 20, 6, 7),
    new Ingridient(ingri.tomato4, 11, 20, 0, 150, -4, 2, 62, 20, 6, 7),
    new Ingridient(ingri.cucumber1, 21, 20, 0, 20, -13.5, -0.5, 0, -10, 7, 8),
    new Ingridient(ingri.cucumber2, 23, 20, 0, -140, -11, -1, -30, -30, 7, 8),
    new Ingridient(ingri.cucumber3, 20, 20, 0, 20, -14, 0, 10, -10, 7, 8),
    new Ingridient(ingri.cucumber4, 21, 20, 0, -40, -10.5, 0.5, 22, -10, 7, 8),
    new Ingridient(ingri.salad1, 0, 0, 0, -2, -17.5, -0.5, 25, 3, 8, 9),
    new Ingridient(ingri.mayo1, 0, 0, 0, -20, -14, -0.5, 30, 4, 9, 10),
    new Ingridient(ingri.topBun, 55, 50, 0, -20, -21, -7.2, 30, 2, 10, 11),
];