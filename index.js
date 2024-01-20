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
            let imageSource = data.photos[Math.floor(Math.random() * imagePool)].src.landscape;
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



function obrazek() {
    console.log("kliknuto");
    html2canvas(document.querySelector("#card"), {
        allowTaint: true,
        useCORS: true
    }).then(canvas => {
        canvas.toBlob(function (blob) {
            window.saveAs(blob, 'citat.jpg');
        });
    });
}


function shareOnFacebook(imageData) {
    FB.ui({
        method: 'share',
        href: 'https://filip-dvorak.github.io',
        quote: 'Check out my quote!',
        picture: imageData,
    }, function(response){});
}
function share(){

        html2canvas(document.getElementById('card')).then(function(canvas) {
            var imageData = canvas.toDataURL('image/png');
            shareOnFacebook(imageData);
        });
}

function htmlToImg(){
    let node = document.getElementById("card");
    domtoimage.toPng(node)
        .then(function (dataUrl) {
            document.getElementById("showImg").src = dataUrl;
            console.log(dataUrl);
            return dataUrl;
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
}
function facebookShared() {
    var url = "//www.facebook.com/sharer/sharer.php?u=" + encodeURI("filip-dvorak.github.io");
    var windowProperties = "toolbar=0,status=0,width=" + 500 + ",height=" + 500;

    window.open(url, "sharer", windowProperties);
}
