"use strict";
const slotMachineElement = document.getElementById("slotMachine");
const usernameElement = document.getElementById("username");
const phoneElement = document.getElementById("phone");

const selectInput = document.getElementById("selectionOption");
const letterElements = document.querySelectorAll(".letterRand");

const celebrationEffect = new Audio("./media/yay.mp3");
celebrationEffect.volume = 0.05;

usernameElement.value = "";
phoneElement.value = "";

let currentName = "";
let currentPhone = "";

const TYPE_NAME = 1;
const TYPE_PHONE = 2;

let spins = 0; // Maybe you want to do like... 30 spins if you actually want to get a result anyway.

const randomizeLetters = () => {
    document.getElementById("spinBtn").disabled = true;
    selectInput.disabled = true;
    let selectType = parseInt(selectInput.value);
    let currentInput = (selectType === TYPE_NAME) ? usernameElement : phoneElement;

    // Hacky thingy to make the for loop not async.
    const loopIt = () => {
        return new Promise((resolve) => {
            const loop = (index) => {
                letterElements.forEach((letterEle) => {
                    if (selectType === TYPE_NAME) { //Letters
                        letterEle.value = String.fromCharCode(97 + Math.floor(Math.random() * 26));
                    } else {
                        letterEle.value = Math.floor((Math.random() * 9) + 1);
                    }
                });
                if (index === 89) {
                    resolve();
                }
            }
            
            for (let i = 0 ; i < 90 ; i++) {
                setTimeout(loop, i * 15, i);
            }

        });
    }

    loopIt().then(() => {
        let values = [];

        letterElements.forEach((element) => {
            values.push(element.value);
        })

        // debug, lol.
        // values = (selectType === TYPE_NAME) ? ["a", "a"] : [4, 4];
    
        let allEqual = values.every((letter, index, array) => letter === array[0]);

        if (allEqual) {
            celebrationEffect.play();
            let newValue = "";

            if (selectType === TYPE_NAME) {
                currentName = currentName + values[0];
                newValue = currentName;
            } else {
                currentPhone = currentPhone + values[0];
                newValue = currentPhone;
            }

            currentInput.value = newValue;
        }
    
        if (usernameElement.value.length >= 2 && phoneElement.value.length >= 2) {
            document.getElementById("sendBtn").disabled = false;
        }
    
        spins++;
        if (spins >= 300) {
            document.getElementById("sendBtn").disabled = false;
        }
        document.getElementById("spinBtn").disabled = false;
        selectInput.disabled = false;
    });
}

// I told you, no fiddling
const noFiddling = () => {
    let currentNameVal = usernameElement.value;
    let currentPhoneVal = phoneElement.value;

    if (currentName !== currentNameVal) {
        phoneElement.value = "";
    }

    if (currentPhone !== currentPhoneVal) {
        phoneElement.value = "";
    }

    if (usernameElement.minlength !== 3 || phoneElement.minlength !== 3) {
        usernameElement.minlength = 3;
        phoneElement.minlength = 3;
    }
    
    if (!usernameElement.required || !phoneElement.required) {
        usernameElement.required = true;
        phoneElement.required = true;
    }

    if (!usernameElement.readonly || phoneElement.readonly) {
        usernameElement.readonly = true;
        phoneElement.readonly = true;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setInterval(noFiddling, 100);
    document.getElementById("spinBtn").addEventListener("click", randomizeLetters);

    document.getElementById("mainForm").addEventListener("submit", (evt) => {
        evt.preventDefault();
        // Trully spectacular!
        window.location.href = "https://www.youtube.com/watch?v=oHg5SJYRHA0";
        return false;
    });
});