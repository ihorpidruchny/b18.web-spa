// click on notification icon
document.getElementById("main-notify").onclick = function(){
	if(this.children[1].style.display == "block")
		this.children[1].style.display = "none";
	else
		this.children[1].style.display = "block";
};


// click on pane switch
var ul = document.getElementById('pane-switch-group'),
	li = ul.getElementsByTagName("li");

ul.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI'){
      if(e.target.className != "active") {
      	e.target.className = "active";
      } else {
      	e.target.className = "";
      }
  }
});

function hideMainMenu(){
	document.getElementById("sidebar-menu").style.marginLeft = "-120px";
	document.getElementById("main-content").style.marginLeft = "0";
}
function showMainMenu(){
	document.getElementById("sidebar-menu").style.marginLeft = "0";
	document.getElementById("main-content").style.marginLeft = "120px";
}

/* click on switch pane */

var pane1 = document.getElementById("toggle-first"),
	pane2 = document.getElementById("toggle-second"),
	pane3 = document.getElementById("toggle-third"),
	pane4 = document.getElementById("toggle-fourth"),
	block1 = document.getElementById("pane-1"),
	block2 = document.getElementById("pane-2"),
	block3 = document.getElementById("pane-3");


pane1.onclick = function(e){
	if(e.target.className != "active"){
		console.log("hide");
		hideMainMenu();
	} else {
		console.log("show");
		showMainMenu();
	}
}

document.addEventListener("mousemove", handleMouseMove);

function handleMouseMove(event) {
	if(pane1.className != "active"){
		return;
	}else if(pane1.className == "active"){
        if (event.clientX <= 50) {
        	showMainMenu();
        } else if(event.clientX >= 50){
        	hideMainMenu();
        }
	}
}




function removeElement(element){
	element.style.display = "none";
};

function addFlexElement(element){
	element.style.display = "flex";
};

// click on pane switch 2
pane2.addEventListener("click", function(e){
	if(e.target.className == "active"){
		removeElement(block1);
	} else{
		addFlexElement(block1);
	}
});

// click on pane switch 3
pane3.addEventListener("click", function(e){
	if(e.target.className == "active"){
		removeElement(block2);
	} else{
		addFlexElement(block2);
	}
});

// click on pane switch 4
pane4.addEventListener("click", function(e){
	if(e.target.className == "active"){
		removeElement(block3);
	} else{
		addFlexElement(block3);
	}
});

/* mobile version */

document.getElementById("mobile-switch").onclick = function(e){
	if(block1.style.display != "none"){
		block1.style.display = "none";
		block2.style.display = "flex";
	} else{
		block2.style.display = "none";
		block1.style.display = "flex";
	}
};

document.getElementById("mobile-menu-btn").onclick = function(e){
	if(e.target.className == "glyphicon glyphicon-align-justify"){
		document.getElementById("sidebar-menu").style.marginLeft = "0";
		e.target.className = "glyphicon glyphicon-chevron-left";
} else{
		document.getElementById("sidebar-menu").style.marginLeft = "-100vw";
		e.target.className = "glyphicon glyphicon-align-justify";
}

};

(function () {

  $(document).ready(function () {

    /*****button events*****/

    $("#left-load-button").on('click', function () {
      $(this).addClass("active-button");
      $("#right-load-button").removeClass("active-button");
    });

    $("#right-load-button").on('click', function () {
      $(this).addClass("active-button");
      $("#left-load-button").removeClass("active-button");
    });

    $("#left-freight-button").on('click', function () {
      $(this).addClass("active-button");
      $("#right-freight-button").removeClass("active-button");
    });

    $("#right-freight-button").on('click', function () {
      $(this).addClass("active-button");
      $("#left-freight-button").removeClass("active-button");
    });

    $("#left-driver-button").on('click', function () {
      $(this).addClass("active-button");
      $("#right-driver-button").removeClass("active-button");
    });

    $("#right-driver-button").on('click', function () {
      $(this).addClass("active-button");
      $("#left-driver-button").removeClass("active-button");
    });

    $("#company-loading-button-id").on('click', function () {
      $(this).addClass("active-button");
      $("#customer-loading-button-id").removeClass("active-button");
      $("#none-loading-button-id").removeClass("active-button");

    });

    $("#customer-loading-button-id").on('click', function () {
      $(this).addClass("active-button");
      $("#company-loading-button-id").removeClass("active-button");
      $("#none-loading-button-id").removeClass("active-button");
    });

    $("#none-loading-button-id").on('click', function () {
      $(this).addClass("active-button");
      $("#company-loading-button-id").removeClass("active-button");
      $("#customer-loading-button-id").removeClass("active-button");
    });

    $("#company-palletExch-button-id").on('click', function () {
      $(this).addClass("active-button");
      $("#customer-palletExch-button-id").removeClass("active-button");
      $("#none-palletExch-button-id").removeClass("active-button");
    });

    $("#customer-palletExch-button-id").on('click', function () {
      $(this).addClass("active-button");
      $("#company-palletExch-button-id").removeClass("active-button");
      $("#none-palletExch-button-id").removeClass("active-button");
    });

    $("#none-palletExch-button-id").on('click', function () {
      $(this).addClass("active-button");
      $("#company-palletExch-button-id").removeClass("active-button");
      $("#customer-palletExch-button-id").removeClass("active-button");
    });

    /*****input advice logic*****/

  });

  $("#customer-input-id").on('keyup', function (event) {
    event.stopImmediatePropagation();

    var inputValue = $("#customer-input-id").val();
    var companyAdviceBlock = $("#companies-advice-block");
    var hiddenAdviceBlock = $("#hidden-advice");

    companyAdviceBlock.empty();
    if (!inputValue) {
      hiddenAdviceBlock.addClass("hidden-advice-block");
    }
    for (var i = 0; i < customerListJson.length; i++) {
      if (!inputValue) {
        return;
      } else {
        hiddenAdviceBlock.removeClass("hidden-advice-block");
        if (inputValue.toLowerCase() === customerListJson[i].companyName.slice(0, inputValue.length).toLowerCase()) {
          companyAdviceBlock.append($("<span></span>").addClass("company-name").text(customerListJson[i].companyName));
          companyAdviceBlock.append($("<span></span>").addClass("company-mc").text(customerListJson[i].IdNumber));
          companyAdviceBlock.append($("<span></span>").addClass("company-address").text(customerListJson[i].address));
          $("#companies-advice-block > span").wrapAll("<div></div>");
        }
        $("#companies-advice-block > div").addClass("company-data");
      }
    }

    /*$("div.company-data").on('click', function () {
     console.log("blablabla");
     console.log($("div.company-data div:first").html());
     });*/

  });

  $("#contact-select-id").on('click', function () {
    $("#hidden-contact-info").removeClass("hidden");
  });

  $("#contactPerson-info-block").on('click', function () {
    $("#contactPerson-address-wrapper").removeClass("hidden");
    $("#hidden-contact-info").addClass("hidden");
  });

  $("#add-new-contact").on('click', function () {
    /*$("#contactPerson-address-wrapper").removeClass("hidden");*/
    $("#hidden-contact-info").addClass("hidden");
  });

  $("#companies-advice-block").on('click', function () {
    $("#customer-data-section").removeClass("hidden");
    $("#hidden-advice").addClass("hidden-advice-block");
  });

  $("#create-new-customer").on('click', function () {
    $("#add-customer-wrapper").removeClass("hidden");
    $("#hidden-advice").addClass("hidden-advice-block");
  });

  $("#add-customer-button").on('click', function () {
    $("#add-customer-wrapper").addClass("hidden")
  });



  var customerListJson =
    [
      {
        "companyName": "Atlanta Logistic",
        "address": "78-008, Main str., Atlanta, Georgia",
        "IdNumber": "8941315",
        "customerType": "Broker",
        "status": "Active",
        "detailedAddress": {
          "street": "17745 Boullevard",
          "postIndex": "STE 203",
          "area": "Reddington Shores",
          "state": "GE",
          "stateIndex": "33708",
          "phone": "775-378-698"
        },
        "contactPerson": "Vasya Pupkin"
      },
      {
        "companyName": "Alabama Trucks Service",
        "address": "99-888, Black str., Montgomery, Alabama",
        "IdNumber": "9876542",
        "customerType": "Broker",
        "status": "Active",
        "detailedAddress": {
          "street": "17745 Boullevard",
          "postIndex": "STE 203",
          "area": "Reddington Shores",
          "state": "Al",
          "stateIndex": "33708",
          "phone": "775-378-698"
        },
        "contactPerson": "John Smith"
      },
      {
        "companyName": "New York Worldwide Carrier",
        "address": "11-111, Broadway str., New York, New York",
        "IdNumber": "6432135",
        "customerType": "Broker",
        "status": "Active",
        "detailedAddress": {
          "street": "17745 Boullevard",
          "postIndex": "STE 203",
          "area": "Reddington Shores",
          "state": "NY",
          "stateIndex": "33708",
          "phone": "775-378-698"
        },
        "contactPerson": "Jack Daniels"
      },
      {
        "companyName": "Los Angeles Logistic",
        "address": "44-444, Latinos str., Los Angelos, California",
        "IdNumber": "7456258",
        "customerType": "Broker",
        "status": "Active",
        "detailedAddress": {
          "street": "17745 Boullevard",
          "postIndex": "STE 203",
          "area": "Reddington Shores",
          "state": "CA",
          "stateIndex": "33708",
          "phone": "775-378-698"
        },
        "contactPerson": "Daniel Williams"
      },
      {
        "companyName": "Chicago Trucks Service",
        "address": "33-555, AlCapone str., Chicago, Illinois",
        "IdNumber": "1324658",
        "customerType": "Broker",
        "status": "Active",
        "detailedAddress": {
          "street": "17745 Boullevard",
          "postIndex": "STE 203",
          "area": "Reddington Shores",
          "state": "IL",
          "stateIndex": "33708",
          "phone": "775-378-698"
        },
        "contactPerson": "Trevor Miller"
      }
    ];

})();
