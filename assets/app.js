var animals = ["Red Panda","Blob Fish","Turritopsis","Slow Loris","snek","Spider Crab","Fossa","The Maned Wolf","Glaucus Atlanticus","Okapi","Axolotl","Rabbits", "Bees", "Cats", "Doggos" ]


//animalGIF function applies the info desired to be sent to the html
// api key.. do not store like this unless you want to get fucked
//dd99d67ec0d04836812ce6059646c1bf
//https://api.giphy.com/v1/gifs/search?api_key=dd99d67ec0d04836812ce6059646c1bf&q=cat&limit=10&offset=0&rating=PG-13&lang=en
function animalGIF() {
	$("#animalGifs").empty();
	
	var animal = $(this).attr("data-name");
	var URL = "https://api.giphy.com/v1/gifs/search?api_key=dd99d67ec0d04836812ce6059646c1bf&q=" + animal + "&limit=10&offset=0&rating=PG-13&lang=en"

	$.ajax({
      url: URL,
      method: 'GET'
    }).done(function(response) {
      console.log(response);


     var results=response.data;
     for (var i = 0; i < results.length; i++) {
     	
     	var animalDiv = $("<div>");

     	var gifIMAGE = response.data[i].images.fixed_height_still.url;
     	var gifACTION = response.data[i].images.fixed_height.url;

     	var p = $("<p>").text("Rating: " + results[i].rating);
     	
     	var animalImage = $("<img>").attr({
     		"src": gifIMAGE,
     		"data-still": gifIMAGE,
     		"data-animate": gifACTION,
     		"data-state": "still",
     		"class": "GIFSTATE"
     	});
     	     	
     	animalDiv.append(p);
     	animalDiv.append(animalImage);
     	

     	$("#animalGifs").prepend(animalDiv);
     	
     }
    
    });
}


function state () {
	var state = $(this).attr("data-state");
	if (state === "still"){


    $(this).attr("src", $(this).attr("data-animate"));
  	$(this).attr("data-state", "animate");

  } else {

    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}
//$('.gif').gifplayer();

 

//function that will generate information to the dom
function renderButtons () {

	$("#animalButtons").empty();

	for (var i = 0; i < animals.length; i++) {

		var buttons = $("<button class = test>");

		buttons.addClass("animal");

		buttons.attr("data-name", animals[i]);

		buttons.text(animals[i]);

		$("#animalButtons").append(buttons);

	}
}
$("#addAnimal").focus().on("click", function(event) {

	event.preventDefault();

	var animal = $("#animalInput").val().trim();

	animals.push(animal);

	renderButtons();

	$("#animalInput").val("");

});



  

//$(document).on("click", ".gif", click);
$(document).on("click", ".animal", animalGIF);
$(document).on("click", ".GIFSTATE", state);
renderButtons();