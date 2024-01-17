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

async function share() {
    var div = document.getElementById("card");
    var title = "quote";

    try {
        var canvas = await html2canvas(div, { scrollX: 0, scrollY: 0, allowTaint: true, useCORS: true });
        var image = encodeURIComponent(canvas.toDataURL("image/png"));
        console.log(image);
        console.log(canvas.toDataURL("image/png"));

        var shareUrl = 'https://www.facebook.com/sharer/sharer.php?picture=' + image + '&quote=' + encodeURIComponent(title);
        window.open(shareUrl, '_blank');
    } catch (error) {
        console.error("Error capturing image:", error);
    }

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
async function sdilet() {
    console.log("kliknuto")
    var div = document.getElementById("card");
    var canvas = await html2canvas(div, { scrollX: 0, scrollY: 0, allowTaint: true, useCORS: true });
    var data = encodeURIComponent(canvas.toDataURL("image/png"));
    let blob;
    try {
        blob = dataURItoBlob(data);
    } catch (e) {
        console.log(e);
    }
    FB.getLoginStatus(function (response) {
        console.log(response);
        if (response.status === "connected") {
            postImageToFacebook(response.authResponse.accessToken, "Canvas to Facebook/Twitter", "image/png", blob, window.location.href);
        } else if (response.status === "not_authorized") {
            FB.login(function (response) {
                postImageToFacebook(response.authResponse.accessToken, "Canvas to Facebook/Twitter", "image/png", blob, window.location.href);
            }, {scope: "publish_actions"});
        } else {
            FB.login(function (response) {
                postImageToFacebook(response.authResponse.accessToken, "Canvas to Facebook/Twitter", "image/png", blob, window.location.href);
            }, {scope: "publish_actions"});
        }
    });
}

function postImageToFacebook(token, filename, mimeType, imageData, message) {
    var fd = new FormData();
    fd.append("access_token", token);
    fd.append("source", imageData);
    fd.append("no_story", true);

    // Upload image to facebook without story(post to feed)
    $.ajax({
        url: "https://graph.facebook.com/me/photos?access_token=" + token,
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            console.log("success: ", data);

            // Get image source url
            FB.api(
                "/" + data.id + "?fields=images",
                function (response) {
                    if (response && !response.error) {
                        //console.log(response.images[0].source);

                        // Create facebook post using image
                        FB.api(
                            "/me/feed",
                            "POST",
                            {
                                "message": "",
                                "picture": response.images[0].source,
                                "link": window.location.href,
                                "name": 'Look at the cute panda!',
                                "description": message,
                                "privacy": {
                                    value: 'SELF'
                                }
                            },
                            function (response) {
                                if (response && !response.error) {
                                    /* handle the result */
                                    console.log("Posted story to facebook");
                                    console.log(response);
                                }
                            }
                        );
                    }
                });
        },
        error: function (shr, status, data) {
            console.log("error " + data + " Status " + shr.status);
        },
        complete: function (data) {
            //console.log('Post to facebook Complete');
        }
    });
}