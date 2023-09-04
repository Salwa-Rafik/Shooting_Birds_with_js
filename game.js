let modal = document.getElementById("myModal");
let modaLost = document.getElementById("lost");
let modalWin = document.getElementById("win");
let btn = document.querySelector(".myBtn");
let againWin=document.getElementById("won");
let againlose=document.getElementById("lose");

let name2 = document.getElementById("welcome");
let name3 = document.getElementById("welcomee");
let gameScore = document.getElementById("score");
let timeLeft = document.getElementById("time");
let killedBirds = document.getElementById("killed");
let newScore = 0;
let allKilled = 0;
let name1 = window.localStorage.getItem("username");
name2.innerHTML = name1;
name3.innerHTML = name1;
btn.onclick = function () {
    modal.style.display = "none";
}



class Animal {
    #imge;
    static #count = 0;
    constructor(src) {
        if (new.target.name == "Animal")
            throw new Error("can't create object from this class");
        let img = document.createElement("img");
        img.style.position = "absolute";
        img.src = src;
        img.height = 100;
        img.width = 100;
        this.#imge = img;
        Animal.#count++;
        document.body.append(this.imge);
    }
    get imge() { return this.#imge };
    static get count() { return Animal.#count };
}


class Bird extends Animal {
    static score = 0;
    static killed = 0;
    constructor(src) {
        super(src);
        this.imge.style.left = innerWidth - Math.ceil(Math.random() * innerWidth) + "px";

        if (parseInt(this.imge.style.left) > innerWidth - this.imge.width)
            this.imge.style.left = innerWidth - this.imge.width + "px";
        this.imge.style.left = 0 + "px";
        this.imge.style.top = innerHeight - Math.ceil(Math.random() * innerHeight) + "px";
        if (parseInt(this.imge.style.top) > innerHeight - this.imge.height)
            this.imge.style.top = 0;


        this.imge.addEventListener("click", () => {
            if (this.imge.src.includes("bird.gif")) {
                newScore = Bird.score += 5;
                gameScore.innerHTML = newScore;

            }
            else if (this.imge.src.includes("black.gif")) {
                newScore = Bird.score -= 10;
                gameScore.innerHTML = newScore;

            }
            else if (this.imge.src.includes("Blue.gif")) {
                newScore = Bird.score += 10;
                gameScore.innerHTML = newScore;

            }
            console.log(Bird.score);

            allKilled = Bird.killed++;
            killedBirds.innerHTML = allKilled;
            console.log(Bird.killed);
            this.imge.remove();
        });


    }
    move() {
        let left1 = parseInt(this.imge.style.left);
        let id = setInterval(() => {
            if (left1 >= window.innerWidth - this.imge.width) {
                this.imge.remove();
            }
            else {
                this.imge.style.left = (left1 += 30) + "px";
            }
        }, 300);
    }

}



setInterval(() => {
    let b1 = new Bird("images/bird.gif");
    let b2 = new Bird("images/black.gif");
    let b3 = new Bird("images/Blue.gif");
    b1.move();
    b2.move();
    b3.move();


}, 3000);


function createBomb() {
    let bomb = new Bomb();
}

setInterval(createBomb, 7000);


function timer() {
    var sec = 60;
    var timer = setInterval(function () {
        document.getElementById('time').innerHTML = '00:' + sec;
        sec--;
        if (sec < 0) {
            clearInterval(timer);
            if (parseInt(gameScore.innerText) >= 50) {
                modalWin.style.display = "inline";
            }
            else {
                modaLost.style.display = "inline";
            }
        }
    }, 1000);
}
timer();

againWin.addEventListener("click",()=>{
    location.reload();
});
againlose.addEventListener("click",()=>{
    location.reload();
});

class Bomb {
    #imge;
    #fallingInterval;

    constructor() {
        let img = document.createElement("img");
        img.style.position = "absolute";
        img.src = "/images/bomb-2025548_1280.webp"; // Change the path to your bomb image
        img.height = 100;
        img.width = 100;
        this.#imge = img;
        document.body.append(this.imge);
        this.imge.style.left = innerWidth - Math.ceil(Math.random() * innerWidth) + "px";
        this.imge.style.top = "0px"; // Start at the top of the page
        this.fall();
        this.imge.addEventListener("click", () => {
            this.explode();
        });
    }

    get imge() {
        return this.#imge;
    }

    fall() {
        let topPosition = 0;
        this.#fallingInterval = setInterval(() => {
            if (topPosition >= innerHeight - this.imge.height) {
                this.imge.remove(); // Remove the bomb when it reaches the bottom
                clearInterval(this.#fallingInterval); // Stop the falling interval
            } else {
                topPosition += 5; // Adjust the falling speed as needed
                this.imge.style.top = topPosition + "px";
            }
        }, 50); // Adjust the falling interval time as needed
    }

    explode() {
        this.imge.remove(); // Remove the bomb's image element
        clearInterval(this.#fallingInterval); // Stop the falling interval
        let birds = document.querySelectorAll("img[src$='bird.gif'], img[src$='black.gif'], img[src$='Blue.gif']");

        birds.forEach((bird) => {
            bird.remove();
            // Increase the score when a bird is killed by the bomb
            if (bird.src.includes("bird.gif")) {
                newScore += 5;
            } else if (bird.src.includes("Blue.gif")) {
                newScore += 10;
            } else if (bird.src.includes("black.gif")) {
                newScore -= 10;
            }
        });

        // Update the game score on the page
        gameScore.innerHTML = newScore;

        // Update the number of killed birds
        allKilled += birds.length;
        killedBirds.innerHTML = allKilled;
    }
}
