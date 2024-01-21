let imageSource;
function generate() {
    const photoApiKey = 'QuD0hiQZNs0X9udPoRDInjSeoUehIBbmSpo0DQ2FxyYh0yC3XJ2CkAHx';
    var dropdown = document.getElementById("promptDropdown");
    var prompt = dropdown.options[dropdown.selectedIndex].value;
    const imagePool = 20;
    const photoApiUrl = 'https://api.pexels.com/v1/search?query=' + prompt + '&per_page=' + imagePool;

    fetch(photoApiUrl, {
        method: 'GET',
        headers: {
            'Authorization': photoApiKey,
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            imageSource = data.photos[Math.floor(Math.random() * imagePool)].src.landscape;
            console.log(imageSource)
            document.getElementById("card").style.backgroundImage= "url(" + imageSource + ")";
        })
        .catch(error => {
            console.error('Error:', error);
        });

    var citatElement = document.getElementById("citat");
    var authorElement = document.getElementById("author");
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/quotes?category=' + prompt,
        headers: {'X-Api-Key': 'FjXnGHeTamrUU5HVLORogg==QM1Pl2a9d520U7pf'},
        contentType: 'application/json',
        success: function (result) {
            console.log(result[0].quote);
            citatElement.innerHTML = result[0].quote;
            authorElement.innerHTML = "- " +result[0].author;

        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}
function reGenerateImage(){
    const photoApiKey = 'QuD0hiQZNs0X9udPoRDInjSeoUehIBbmSpo0DQ2FxyYh0yC3XJ2CkAHx';
    var dropdown = document.getElementById("promptDropdown");
    var prompt = dropdown.options[dropdown.selectedIndex].value;
    var colorTheme = document.getElementById("colorSchemePicker").value;
    const imagePool = 20;
    const photoApiUrl = 'https://api.pexels.com/v1/search?query=' + prompt + '&per_page=' + imagePool + '&color=' + colorTheme;

    fetch(photoApiUrl, {
        method: 'GET',
        headers: {
            'Authorization': photoApiKey,
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            imageSource = data.photos[Math.floor(Math.random() * imagePool)].src.landscape;
            console.log(imageSource)
            document.getElementById("card").style.backgroundImage= "url(" + imageSource + ")";
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function changeColor(){
    var textColor = document.getElementById("colorPicker").value;
    document.getElementById("citat").style.color = textColor;
    document.getElementById("author").style.color = textColor;
}

function changeSize(){
    var textSize = document.getElementById("sizePicker").value;
    document.getElementById("citat").style.fontSize = textSize + "px";
    document.getElementById("author").style.fontSize = textSize + "px";
}
function colorCorrect(){
    var color = document.getElementById("colorSchemePicker").value;
    var field = document.getElementById("colorSchemePicker");
    switch(color) {
        case 'red':
            field.style.color = 'red';
            break;
        case 'orange':
            field.style.color = 'orange';
            break;
        case 'yellow':
            field.style.color = 'yellow';
            break;
        case 'green':
            field.style.color = 'green';
            break;
        case 'turquoise':
            field.style.color = 'turquoise';
            break;
        case 'blue':
            field.style.color = 'blue';
            break;
        case 'violet':
            field.style.color = 'violet';
            break;
        case 'pink':
            field.style.color = 'pink';
            break;
        case 'brown':
            field.style.color = 'brown';
            break;
        case 'black':
            field.style.color = 'black';
            break;
        case 'gray':
            field.style.color = 'gray';
            break;
        case 'white':
            field.style.color = 'white';
            break;
        default:
            field.style.color = '';
            break;
    }
}



function obrazek() {
    console.log("kliknuto");
    html2canvas(document.querySelector("#card"), {
        allowTaint: true,
        useCORS: true
    }).then(canvas => {
        canvas.toBlob(function (blob) {
            window.saveAs(blob, 'citat.jpg');
            return blob;
        });
    });
}

function facebookShared() {

    URLParams={
        imgSrc:imageSource,
        quote: document.getElementById("citat").innerHTML,
        author: document.getElementById("author").innerHTML,
        textSize: document.getElementById("sizePicker").value,
        textColor: document.getElementById("colorPicker").value,
        prompt: document.getElementById("promptDropdown").value,
        colorScheme: document.getElementById("colorSchemePicker").value
    }
    console.log(URLParams)
    var url = "//www.facebook.com/sharer/sharer.php?u=" + encodeURI("filip-dvorak.github.io") + '?' + encodeURIComponent($.param(URLParams)) ;
    var windowProperties = "toolbar=0,status=0,width=" + 500 + ",height=" + 500;

    window.open(url, "sharer", windowProperties);
}
function parseUrlParameters(url) {
    var params = {};
    var queryString = url.split('?')[1];

    if (queryString) {
        var paramPairs = queryString.split('&');

        for (var i = 0; i < paramPairs.length; i++) {
            var pair = paramPairs[i].split('=');
            var key = decodeURIComponent(pair[0]);
            params[key] = decodeURIComponent(pair[1] || '');
        }
    }
    return params;
}

function init(){
    var url = window.location.href;
    var parametry = parseUrlParameters(url);
    var card = document.getElementById("card");
    var citat = document.getElementById("citat");
    var author = document.getElementById("author");
    var sizePicker = document.getElementById("sizePicker");
    var colorPicker = document.getElementById("colorPicker");
    var colorSchemePicker = document.getElementById("colorSchemePicker");
    var promptDropdown = document.getElementById("promptDropdown");

    if(parametry.imgSrc!==undefined) {
        card.style.backgroundImage= "url(" + parametry.imgSrc + ")";
    }
    if(parametry.quote!==undefined) {
        citat.innerHTML = parametry.quote;
    }
    citat.style.color = parametry.textColor;
    citat.style.fontSize = parametry.textSize + "px";

    if(parametry.author!==undefined) {
        author.innerHTML = parametry.author;
    }
    author.style.color = parametry.textColor;
    author.style.fontSize = parametry.textSize + "px";

    if(parametry.textSize!==undefined) {
        sizePicker.value = parametry.textSize;
    }
    if(parametry.textColor!==undefined) {
        colorPicker.value = parametry.textColor;
    }
    if(parametry.colorScheme!==undefined) {
        colorSchemePicker.value = parametry.colorScheme;
    }
    if(parametry.prompt!==undefined) {
        promptDropdown.value = parametry.prompt;
    }
}


