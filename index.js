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


function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: 'image/png'});
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

//upload blobu na facebook
function share(){
    const upload = async (response, page_token) => {
        let canvas = document.getElementById('card');
        let dataURL = canvas.toDataURL('image/jpeg', 1.0);
        let blob = dataURItoBlob(dataURL);
        let formData = new FormData();
        formData.append('access_token', response.authResponse.accessToken);
        formData.append('source', blob);

        let responseFB = await fetch(`https://graph.facebook.com/me/photos?access_token=${page_token}`, {
            body: formData,
            method: 'post'
        });
        responseFB = await responseFB.json();
        console.log(responseFB);
    };

    FB.login((response) => {
        // TODO: Check if the user is logged in and authorized to publish_pages
        if (response.status === 'connected' && response.authResponse.grantedScopes.includes('publish_pages')) {
            // User is logged in and authorized, proceed to get Page Token for upload
            FB.api('/me/accounts', 'GET', { fields: 'access_token' }, (accountResponse) => {
                if (accountResponse && accountResponse.data && accountResponse.data.length > 0) {
                    // Assuming the first page in the response, you may want to implement your logic here
                    const pageToken = accountResponse.data[0].access_token;

                    // Call the upload function with the obtained page token
                    upload(response, pageToken);
                } else {
                    // Handle the case where no pages are found
                    console.error('No pages found for the user.');
                }
            });
        } else {
            // Handle the case where the user is not logged in or not authorized
            console.error('User is not logged in or not authorized to publish_pages.');
        }
    }, { scope: 'manage_pages,publish_pages' });
}
