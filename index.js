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
            let imageSource = data.photos[Math.floor(Math.random() * imagePool)].src.landscape;
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

function saveImgToDirecotry(){
    const owner = 'Filip-Dvorak';
    const repo = 'Filip-Dvorak.github.io';
    const branch = 'master'; // Replace with your branch name
    const directoryPath = 'images';
    const fileName = 'image.jpg'; // Replace with your blob image file name
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${directoryPath}/`;

    const divContent = document.getElementById('card').innerHTML; // Replace 'yourDivId' with the actual ID of your div

// Create a canvas element and draw the content of the div onto it
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 400; // Set the width of the canvas based on your content
    canvas.height = 200; // Set the height of the canvas based on your content
    context.fillStyle = 'white'; // Set the background color
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = '16px Arial'; // Set font style
    context.fillStyle = 'black'; // Set text color
    context.fillText(divContent, 10, 20); // Adjust the position based on your content

// Convert the canvas content to a data URL
    const dataURL = canvas.toDataURL('image/jpeg'); // You can change 'image/jpeg' to other image formats if needed

// Extract the base64-encoded image data from the data URL
    const base64Image = dataURL.replace(/^data:image\/(png|jpeg);base64,/, '')

// Make a PUT request to create or update the file in the repository
    fetch(apiUrl, {
        method: 'PUT',
        headers: {
            Authorization: 'Bearer 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', // Replace with your GitHub personal access token
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: 'Add blob image to directory',
            content: base64Image,
            branch,
        }),
    })
        .then(response => response.json())
        .then(data => console.log('Blob image added successfully:', data.commit))
        .catch(error => console.error('Error adding blob image:', error.message));
}

