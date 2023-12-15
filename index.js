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