const hasCharRemover = document.querySelector("#charRemover");
const copyTextareaBtn = document.querySelector("#copyButton");
const charRemover = document.querySelector("#charRemoverText");

function submitForms() {
    const input = document.querySelector("#input").value;
    const hasSpaces = document.querySelector("#noSpaces").checked;
    const hasParagraphs = document.querySelector("#noParagraphs").checked;
    const hasIntConverter = document.querySelector("#intConverter").checked;
    const hasStringConverter = document.querySelector("#stringConverter").checked;
    const hasArrayConverter = document.querySelector("#arrayConverter").checked;
    const hasNumberRemover = document.querySelector("#numberRemover").checked;
    const hasLetterRemover = document.querySelector("#letterRemover").checked;
    var text = input;
    if(hasSpaces) {
        text = removeSpaces(text);
    } if(hasParagraphs) {
        text = removeParagraphs(text);
    } if(hasIntConverter) {
        text = convertToInt(text);
    } if(hasStringConverter) {
        text = convertToString(text);
    } if(hasNumberRemover) {
        text = numberRemover(text);
    } if(hasLetterRemover) {
        text = letterRemover(text);
    } if(hasCharRemover.checked) {
        text = characterRemover(text);
    } if(hasArrayConverter) {
        text = convertToArray(text);
    }
    printOnPage(text);
}

function characterRemover(input) {
    // Generates /2/g
    return input.replace(new RegExp(charRemover.value, 'g'), '');
}

function letterRemover(input) {
    input = input.replace(/[a-z]/g, '');
    return input.replace(/[A-Z]/g, '');
}

function numberRemover(input) {
    return input.replace(/[0-9]/g, '');
}

function convertToArray(input) {
    return '[' + input + ']';
}

function convertToString(input) {
    return '\"' + input.replace(/,/g,'\",\"') + '\"';
}

function convertToInt(input) {
    return input.replace(/"/g,'');
}

function removeParagraphs(input) {
    return input.replace(/\n/g, '');
}

function removeSpaces(input) {
    return input.replace(/ /g, '');
}

function printOnPage(value) {
    output.innerHTML = value;
}

if(copyTextareaBtn) {
    copyTextareaBtn.addEventListener('click', function handleClick() {
        var copyTextarea = document.querySelector('#output');
        copyTextarea.focus();
        copyTextarea.select();
        document.execCommand('copy');
    });
}

if(hasCharRemover){
    hasCharRemover.addEventListener('click', function handleClick() {

        if (hasCharRemover.checked) {
            charRemover.style.display = 'block';
        } else {
            charRemover.style.display = 'none';
        }
    });
}