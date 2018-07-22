function a(v){console.log(v)};

(function($){

	/*************************
	  basicScript for all pages
	*************************/
	function basicScript() {
		window.windowWidth = $(window).outerWidth();

		/*----------------------
	  	Main menu
		-----------------------*/
		// SmartMenus init
	  $('#main-menu').smartmenus({
	    markCurrentItem: true, //добавлять currentкласс к <a>элементу элемента, ссылающегося на текущий URL-адрес страницы
	    markCurrentTree: true, // добавлять currentкласс к <a>элементам всех элементов-предков текущего элемента
	  });

		// SmartMenus mobile menu toggle button
	  var $mainMenuState = $('#main-menu-state');
	  if ($mainMenuState.length) {
	    // animate mobile menu
	    $mainMenuState.change(function(e) {
	      var $menu = $('#main-menu');
	      if (this.checked) {
	        $menu.hide().slideDown(250, function() { $menu.css('display', ''); });
	      } else {
	        $menu.show().slideUp(250, function() { $menu.css('display', ''); });
	      }
	    });
	    // hide mobile menu beforeunload
	    $(window).bind('beforeunload unload', function() {
	      if ($mainMenuState[0].checked) {
	        $mainMenuState[0].click();
	      }
	    });
	  };

		/*----------------------
	  	Top line mobile button
		-----------------------*/
		$(".top-line-toogle").on("click", function (event) {
			$("header").toggleClass("active-1");
		});

	};/*****END basicScript*****/


	/*************************
	  Sticky header
	*************************/
	function stickyHeader(){
		if ( $(window).scrollTop() > 80 ) {
	  	$("header").addClass("active");
	  }else{
	  	$("header").removeClass("active");
	  }
	}

	/*************************
	  contactForm
	*************************/
	function contactForm(){
		if($("#form-book").length){

		  $("#form-book").submit(function(event) {
				event.preventDefault();

				var form = $(this);
				var phone = form.find('input[type=phone]');
				var error = 0;

	      if (phone.val().length < 7){
				  phone.addClass('error');
				  if (!error) phone.focus();
	        error++;
	      }else {
				  phone.removeClass('error');
	      }

				if (error) return;


				$.ajax({
					type: "POST",
			  	url: 'mail.php',
			  	data: form.serialize(),
			  	dataType: "json",
			  	beforeSend: function(jqXHR, settings) {
			  	},
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

	/*************************
	  choose tabs
	*************************/
	function chooseTabs() {
		if($(".s-choose").length){

			$(".choose-tab_i").on("click", function() {

				var tab_nav = $(this);
				var tab_content = $("#choose-content").children("[data-tab-name = " + tab_nav.attr("data-tab-target") + "]");

				tab_nav.addClass("active").siblings().removeClass("active");
				tab_content.addClass("active").siblings().removeClass("active");

				tab_content.find(".choose-nav").slick("refresh");//refresh slider in this tab
				tab_content.find(".choose-car").slick("refresh");//refresh slider in this tab
				
			});
			
		};//if
	};//choose tabs


	/*************************
	  choose-carousel
	*************************/
	function chooseCarousel() {
		if($("#choose-content").length){

			$("#choose-content").find(".choose-content_i").each(function(indx, element){
	  		
	  		var choose_car = $(this).find('.choose-car');
	  		var choose_nav = $(this).find('.choose-nav');

				choose_car.slick({
				  slidesToShow: 1,
				  slidesToScroll: 1,
				  arrows: false,
				  fade: true,
				  asNavFor: choose_nav,
				  autoplay: true,
				  infinite: true,
				});
				choose_nav.slick({
				  slidesToShow: 6,
				  slidesToScroll: 1,
				  asNavFor: choose_car,
				  dots: false,
				  arrows: false,
				  centerMode: true,
				  focusOnSelect: true,
				  centerPadding: "0",
				  autoplay: true,
				  infinite: true,
				 	responsive: [
						{
						  breakpoint: 1200,
						  settings: {
						  	slidesToShow: 5,
						  	dots: false,
						    arrows: false,
						  }
						},
						{
						  breakpoint: 992,
						  settings: {
						    slidesToShow: 4,
						  	dots: false,
						    arrows: false,
						  }
						},
						{
						  breakpoint: 768,
						  settings: {
						    slidesToShow: 3,
						  	dots: false,
						    arrows: false,
						  }
						},
						{
						  breakpoint: 480,
						  settings: {
						    slidesToShow: 2,
						  	dots: false,
						    arrows: false,
						  }
						},
					]
				});

			});//each
		};//if
	};//chooseCarousel


	/*************************
	  animate numbers (counters)
	*************************/
	function animateCounters(argument) {
		if($("[id*='counters_wrapper-']").length) {

			var counters_inview = [];

			$( "[id*='counters_wrapper-']" ).each(function (){

				var wrapper = $(this);
				var wrapper_indx = 0;
						wrapper_indx = wrapper.attr('id').split("-")[1];

				counters_inview[wrapper_indx] = new Waypoint.Inview({
					
				  element: wrapper,
				  enter: function(direction) {

				  	wrapper.find(".counter").each(function() {
				  		$this = $(this);
				  		$this_number = $this.attr("data-counter-number");
				  		$this.animateNumber({ number: $this_number }, 4000);
				  	})

				  },
				  exited: function(direction) {
				    counters_inview[wrapper_indx].destroy();
				  }

				});
			});//each

		};//if
	};


	/*************************
	  testimonial-carousel
	*************************/
	function testimonialCarousel() {
		if($("#testimonial-car").length){

			$('#testimonial-car').slick({
			  asNavFor: '#testimonial-nav',
			  slidesToShow: 1,
			  slidesToScroll: 1,
			  arrows: false,
			  dots: false,
			  fade: true,
			  speed: 300, //default
			  autoplay: false,
			  infinite: true,
			});

			$('#testimonial-nav').slick({
			  asNavFor: '#testimonial-car',
			  slidesToShow: 3,
			  slidesToScroll: 1,
			  dots: false,
			  arrows: false,
			  speed: 100, //при переходе на клонированный слайд запаздывает выполнение css привязанного к slick-center
			  centerMode: true,
			  focusOnSelect: true,
			  centerPadding: "0",
			  // autoplay: true,
			  // autoplaySpeed: 1000,
			  infinite: true,
			 	responsive: [
					{
					  breakpoint: 768,
					  settings: {
					  	dots: true,
					    arrows: false,
					    slidesToShow: 1
					  }
					}
				]
			});

		};//if
	};


	/*************************
	  accordion
	*************************/
	function accordion() {
		if ($(".accordion").length){

			$(".accordion").each(function(){
				$this = $(this);

				$this.find(".accordion_header").each(function(indx){
					if ( indx == 0 ){
						$(this).addClass("active");
						return;
					}
				});

				$this.find(".accordion_content").each(function(indx){
					if ( indx == 0 ){
						$(this).addClass("active")
					}else{
						$(this).slideUp(0);
					}
				});

			});


			$(".accordion_header").on("click", function(){
				var $this = $(this);
				var $accordion = $(this).parents(".accordion");

				if ($this.hasClass("active")){return};

				$accordion.find(".accordion_header").removeClass("active");
				$accordion.find(".accordion_content").removeClass("active").slideUp(300);

				$this.addClass("active");
				$this.next().addClass("active").slideDown(300);
			})

		}//if
	};




	$(document).ready(function(){
		basicScript();
		stickyHeader();
		contactForm();
		chooseTabs();
		chooseCarousel();
		animateCounters();
		testimonialCarousel();
		accordion();
	});

	$(window).on( "load", function(){
		stickyHeader();
		
	});
	$(window).on( "resize", function(){
		stickyHeader();

	});
	$(window).on( "scroll", function() {
		stickyHeader();

	});

})(jQuery);


