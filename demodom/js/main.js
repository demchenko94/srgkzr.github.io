(function($){

	function basicScript() {

		/*************************
		  new scroll for page - niceScroll
		*************************/
		if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) && $(window).outerWidth() > 1200){
			$("body").niceScroll({
			  scrollspeed: 80,//ms 60
			  mousescrollstep: 33, //35
			  cursorwidth: 10,
			  cursorborder: 0,
			  cursorcolor: 'rgba(255,144,0,0.9)',
			  cursorborderradius: 2,
			  autohidemode: true,
			  horizrailenabled: false,
			});
		};

		/*************************
		  sandwich for main menu
		*************************/
		$(".sandwich").on("click", function (event) {
			$(this).toggleClass("active");
			$(this).parents(".row").find(".col-menu").toggleClass("active");
		});

		/*************************
		  scroll to id
		*************************/
		var scroll = new SmoothScroll('.menu a[href*="#"]');
		var scroll = new SmoothScroll('.button1');
		var scroll = new SmoothScroll('.for-whom-i .button');
		var scroll = new SmoothScroll('.button3');

		/*************************
		  masked input phone
		*************************/
	  $('.phone input').inputmask({'mask' : '+38(999) 999-99-99'});

		/*************************
		  events-carousel
		*************************/
		$("#events-car").owlCarousel({
			lazyLoad: false,
			nav: true,
			navText: ["",""],
			dots: true,
			dotsEach: false,
			margin: 0,
		  loop: true,
		  items: 1,
		  autoplay: true,
		  autoplayTimeout: 10000,
		  autoplaySpeed: 1500,
		  autoplayHoverPause: true,
		  center: false,
		});

		/*************************
		  for-whom-carousel
		*************************/
		$("#for-whom-car").owlCarousel({
			lazyLoad: false,
			nav: true,
			navText: ["",""],
			dots: true,
			dotsEach: false,
			margin: 0,
		  loop: true,
		  items: 1,
		  autoplay: true,
		  autoplayTimeout: 10000,
		  autoplaySpeed: 1500,
		  autoplayHoverPause: true,
		  center: false,
		});

		/*************************
		  photos-carousel
		*************************/
		$("#photos-car").owlCarousel({
			lazyLoad: false,
			nav: true,
			navText: ["",""],
			dots: true,
			dotsEach: false,
			margin: 0,
		  loop: true,
		  items: 3,
		  autoplay: true,
		  autoplayTimeout: 10000,
		  autoplaySpeed: 1500,
		  autoplayHoverPause: true,
		  center: false,
			responsive : {
			  0 : {items: 1},
			  550 : {items: 2},
			  768 : {items: 2},
			  992 : {items: 3}
			},
		});

		/*************************
		  certs-carousel
		*************************/
		$("#certs-car").owlCarousel({
			lazyLoad: false,
			nav: true,
			navText: ["",""],
			dots: true,
			dotsEach: false,
			margin: 0,
		  loop: true,
		  items: 3,
		  autoplay: true,
		  autoplayTimeout: 10000,
		  autoplaySpeed: 1500,
		  autoplayHoverPause: true,
		  center: false,
			responsive : {
			  0 : {items: 1},
			  550 : {items: 2},
			  768 : {items: 2},
			  992 : {items: 3}
			},
		});

		/*************************
		  videos-carousel
		*************************/
		$("#videos-car").owlCarousel({
			lazyLoad: false,
			nav: true,
			navText: ["",""],
			dots: true,
			dotsEach: false,
			margin: 0,
		  loop: true,
		  items: 2,
		  autoplay: true,
		  autoplayTimeout: 10000,
		  autoplaySpeed: 1500,
		  autoplayHoverPause: true,
		  center: false,
			responsive : {
			  0 : {items: 1},
			  550 : {items: 1},
			  768 : {items: 1},
			  992 : {items: 2}
			},
		});

		/*************************
		  media-carousel
		*************************/
		$("#media-car").owlCarousel({
			lazyLoad: false,
			nav: true,
			navText: ["",""],
			dots: true,
			dotsEach: false,
			margin: 0,
		  loop: true,
		  items: 2,
		  autoplay: true,
		  autoplayTimeout: 10000,
		  autoplaySpeed: 1500,
		  autoplayHoverPause: true,
		  center: false,
			responsive : {
			  0 : {items: 1},
			  550 : {items: 1},
			  768 : {items: 1},
			  992 : {items: 2}
			},
		});

		/*************************
		  solutions-carousel
		*************************/
	  $('#solutions-car').slick({
	    slidesToShow: 1,
	    slidesToScroll: 1,
	    arrows: false,
	    fade: true,
	    asNavFor: '#solutions-nav',
	    autoplay: true,
	  });
	  $('#solutions-nav').slick({
	    slidesToShow: 7,
	    slidesToScroll: 1,
	    asNavFor: '#solutions-car',
	    dots: false,
	    arrows: true,
	    centerMode: true,
	    focusOnSelect: true,
	    centerPadding: "0",
	    autoplay: true,
		  responsive: [
				{
				  breakpoint: 1200,
				  settings: {
				  	dots: true,
				    arrows: false,
				  }
				},
				{
				  breakpoint: 992,
				  settings: {
				  	dots: true,
				    arrows: false,
				    slidesToShow: 5
				  }
				},
				{
				  breakpoint: 768,
				  settings: {
				  	dots: true,
				    arrows: false,
				    slidesToShow: 4
				  }
				},
				{
				  breakpoint: 600,
				  settings: {
				  	dots: true,
				    arrows: false,
				    slidesToShow: 3
				  }
				}
			]
	  });

		/*************************
		  img popap magnificPopup
		*************************/
		$('.image-popup-no-margins').magnificPopup({
			type: 'image',
			closeOnContentClick: true,
			closeBtnInside: false,
			fixedContentPos: true,
			mainClass: 'mfp-no-margins mfp-with-zoom',
			image: {
				verticalFit: true
			},
			zoom: {
				enabled: true,
				duration: 300
			}
		});

		/*************************
		  popup-youtube
		*************************/
		$('.popup-youtube').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});

	};//basicScript


	/*************************
	  initMap
	*************************/
	// window.initMap = function () {
	// 	var element = document.getElementById('map');
	// 	var options = {
	// 		zoom: 13,
	//     center: {lat: 50.442869, lng: 30.513638},
	// 	}

	//   var map = new google.maps.Map(element, options);

	//   var marker1 = new google.maps.Marker({
	//     position: {lat: 50.442800, lng: 30.513600},
	//     map: map
	//   });

	//   var info_window1 = new google.maps.InfoWindow({
	//     content: "<p></p>"
	//   });

	// 	info_window1.open(map, marker1);
	// }

	/*************************
	  contactForm
	*************************/
	function contactForm(argument) {
		if($(".form-resp").length){

		  $(".form-resp").submit(function(event) {
				event.preventDefault();

				var form = $(this);
				var name = form.find('input[name=name]');
				var phone = form.find('input[name=phone]');
				var rePhone = /_/; //empty symbol (inputmask)
				var email = form.find('input[name=email]');
				var error = 0;

	      if (!name.val().length){
				  name.parent().addClass('error');
				  if (!error) name.focus();
	        error++;
	      }else {
				  name.parent().removeClass('error');
	      }

	      if (!phone.val().length || rePhone.test(phone.val())){
				  phone.parent().addClass('error');
				  if (!error) phone.focus();
	        error++;
	      }else {
				  phone.parent().removeClass('error');
	      }

	      if (!email.val().length){
				  email.parent().addClass('error');
				  if (!error) email.focus();
	        error++;
	      }else {
				  email.parent().removeClass('error');
	      }

				if (error) return;

				$.ajax({
					type: "POST",
			  	url: 'mail.php',
			  	data: form.serialize(),
			  	dataType: "json",
			  	beforeSend: function(jqXHR, settings) {},
			  	success: function(data, textStatus, jqXHR) {
			  		if (data === 'OK') {
			        form[0].reset();
			        alert('Данные успешно отправленны');
			      }
			  	},
			  	error: function(jqXHR, textStatus, errorThrown) {
			  		alert('Ошибка отправки данных. Попробуйте еще раз.');
			  	},
			  	complete: function(jqXHR, textStatus) {},
			  });
			});
		};
	};//contactForm


	$(document).ready(function(){
		basicScript();
		contactForm();
	});

	$(window).on( "load", function(){});

	$(window).on( "resize", function(){});

	$(window).on( "scroll", function() {});


})(jQuery);
