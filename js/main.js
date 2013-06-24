//arb change
//defining global variables to keep track of the state of all popup objects.
var sidebar=new Number(0);
var search=new Number(0);
var blur=new Number(0);
var cardOverlay=new Number(0);

//on document load implemnt these functions
$(document).ready(function(){
	//hack to ensure the overlay does not display onload
	$('#overlay,.blur,.search,.cardOverlay').removeClass('hidden');
	//moves hidden control to jquery
	$('#overlay,.blur,.search,.cardOverlay').hide(0);
	//controls the search bar.
	$('.search input').quicksearch('#content .card .cardContent span', {
	'delay': 0,
	'show': function () {
		
		
		$(this).parents('article').removeClass('hidden');
		$(this).addClass('searchResult');
		
		
	},
	'hide': function () {
		$(this).removeClass('searchResult');
		if(!$(this).siblings().hasClass('searchResult')){
		$(this).parents('article').addClass('hidden');
		}
	}
	});

	

});

//On click functions, all going to individual functions
$('#lb').click(toggleSideBar);
$('#rb').click(toggleSearch);
$('.blur').click(checkOpen);
$('.logo img').click(reloadPage);
$('.card').click(displayCard);


//reloads the page
function reloadPage(){
	window.location.reload();
}

//implements check open and toggle blur.
function displayCard(){
	var anchorId = $(this).html();
	//.attr('class');
	$(".cardOverlay").html(anchorId);
	$(".cardOverlay>.cardContent>span").removeClass("hidden")
	//console.log(test);
	checkOpen();
	toggleCardOverlay();

}

//Brings the sidebar out or brings it in. Closes all other open windows.
function toggleSideBar(){
	if(sidebar==0){
		checkOpen();
		sidebarSlideOut();
	}else if(sidebar==1){
		sidebarSlideIn();
	}
}

//opens or closes the big card interface.
function toggleCardOverlay(){

	if(cardOverlay==0){
		checkOpen();
		cardSlideIn();
		cardOverlay=1;
	} else if(cardOverlay==1){
		cardSlideOut();
		cardOverlay=0;
	}
}
//brings the search bar out or brings it in, closes all other open windows.
function toggleSearch(){
	
	if(search==0){
		checkOpen();
		searchSlideOut();
	} else if(search==1){
		searchSlideIn();
	}
}
//either hides or displays the blur effect.
function toggleBlur(){
	
	if(blur==0){
		$('.blur').fadeIn(150);
		blur=1;

	}
	else if(blur==1) {
		$('.blur').fadeOut(150);
		blur=0;
	}
}

//checks to see if anyhting is open, if it is it toggles it from its current state.
function checkOpen(){
		if(search==1){
			toggleSearch();
		}
		if(sidebar==1){
			toggleSideBar();
		}
		if(cardOverlay==1){
			toggleCardOverlay();
		}
}

//the animation for the sidebar to slide out and turns on the blur.
function sidebarSlideOut(){
		toggleBlur();
		$('#overlay').show('slide',{direction:'left'},150);
		sidebar=1;
}
//the animation for the sidebar to slide in and turns off the blur.
function sidebarSlideIn(){
		$('#overlay').hide('slide',{direction:'left'});
		toggleBlur();
		sidebar=0;
}
//the animation for the search to slide down.
function searchSlideOut(){
	$('#content').animate({'margin-top': '110px'}, 100);
		
		$('.search').show('slide',{direction:'up'},100);
		search=1;
}
//the animation for the search to slide up.
function searchSlideIn(){
	$('.search').hide('slide',{direction:'up'},100);
		search=0;
		$('#content').animate({
            'margin-top': '55px'
        }, 100);
    $('.search input').focus();

}


//displays the information card to the user
function cardSlideIn(){

		$('.cardOverlay').show(100);
		toggleBlur();
		cardOverlay=0;
}

//hides the infromation card from the user.
function cardSlideOut(){
		toggleBlur();
		$('.cardOverlay').hide(100);
		cardOverlay=1;
}

