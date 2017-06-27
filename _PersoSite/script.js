var navHeight = $('nav').offset().top;
var navSize = $('nav').height()+20;
var scrollSpeed = 1000;
var pastNav = false;



$(document).ready(function(){
	
	$('#front').css('color','white');
	console.log(navSize);
	
	$(window).scroll(function(){
		if($(window).scrollTop() > 3){
			console.log("should show BLOOD");
			
			$('#drip').animate({
				opacity: 0.8,
			},2000);
			
		}

		if($(window).scrollTop()>navHeight){ //navigation sticking
			$('nav').css('position','fixed');
			if(pastNav == false){
				$('nav ul').prepend('<li id="home"><a>Home</a></li>');
				buttonClick('#front', '#home');
				
			}
			pastNav = true;
		}
		else{
			$('nav').css('position','relative');
			$('#home').fadeOut().remove();
			pastNav = false;
			
		}
		
		
	})

	
	buttonClick('#projectContent','#project');
	buttonClick('#aboutContent','#about');
	buttonClick('#reflectionContent','#reflection');
	
	$("#muckUp").click(function(){
		console.log('clicked');
		$('.random').css('position','fixed');
		$('body').append('<img src="img/face.jpg" class="random">');
		
		$(".random").hover(function(){
			$(".random").css('opacity','0.5');
		})
		$(".random").click(function(){
			$(".random").remove();
		})
	})
	
})

function buttonClick(id , button){
	var scrollPos = ($(id).offset().top)-navSize; //gets the position to scroll to
	$(button).click(function(){
		$('html, body').animate({
			scrollTop : scrollPos
		},scrollSpeed);
	})
}
