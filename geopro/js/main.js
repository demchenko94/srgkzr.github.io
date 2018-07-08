function a(v){console.log(v)};

// (function () {
  
// })();

(function($){

	/*************************
	  basicScript for all pages
	*************************/
	function basicScript() {
	
			/*----------------------
		  	
			-----------------------*/

	};//basicScript



	/*************************
	  slidePanel
	*************************/
	function slidePanel(){

		//slide-panel new scroll - niceScroll
		if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) && $(window).outerWidth() > 1200){

			var slidePanelScroll_active = true
			var slidePanelScroll_box = $(".slide-panel_content");
			slidePanelScroll_box.niceScroll(".slide-panel_content-inner",{//
			  scrollspeed: 50,//ms 60
			  mousescrollstep: 30, //35
			  cursorwidth: 5,
			  cursorborder: 0,
			  cursorcolor: 'rgba(255,255,255,0.6)',//'rgba(178, 217, 111, 0.7)', //'rgba(139, 198, 46, 0.5)',
			  cursorborderradius: 2,
			  autohidemode: true,
			  horizrailenabled: false,
			});
			//reset scroll after resize
			window.slidePanelScrollResize = function(delay){
				setTimeout(function(){ 
					slidePanelScroll_box.getNiceScroll().resize(); 
				}, delay);
			};
			
		}//if

	  //toogle slide panel
		$(".site-nav_wrap").fadeToggle(0); //display none чтоб не было скролла при закрытом меню
		
		$(".sandwich").on("click", function (){

			$("#slide-panel").toggleClass("active");
			$(".sandwich").toggleClass("active");
			$(".site-nav_wrap").fadeToggle(400);

			if (slidePanelScroll_active){
				slidePanelScrollResize(430);//fix for scroll - 400 delay before reset
				slidePanelScrollResize(630);//fix for scroll - 400 delay before reset
			}
		});
	  
	  //menuCategories - меню в слайд панели
		var categoriesSubMenus = $(".menu-categories-wrap").find("ul");
		categoriesSubMenus.find("ul").each(function (){
			$this = $(this);
	
			$this.hide(0);//hide all menus
			$this.prev().addClass("sub-menu-sibling");
			$this.prev().on("click", function (event){
				event.preventDefault();
	
				$this = $(this);
	
				$this.parent().toggleClass("active");
				$this.next().slideToggle(300);

				if (slidePanelScroll_active){
					slidePanelScrollResize(300);//fix for scroll - 300 delay before reset
				}
			});
		});

	};//END slidePanel



	/*************************
	  servicesCarousel
	*************************/
	function servicesCarousel(){
		if($("#services-car").length){

			$('#services-car').slick({
			  slidesToShow: 1,
			  slidesToScroll: 1,
			  arrows: false,
			  fade: true,
			  asNavFor: '#services-nav',
			  autoplay: false, //true,
			});
			$('#services-nav').slick({
			  slidesToShow: 6,
			  slidesToScroll: 1,
			  asNavFor: '#services-car',
			  dots: false,
			  arrows: false,
			  // centerMode: true,
			  focusOnSelect: true,
			  // centerPadding: "0",
			  autoplay: false, //true,
			 	responsive: [
					{
					  breakpoint: 1200,
					  settings: {
					  	dots: false,
					    arrows: false,
					    slidesToShow: 5
					  }
					},
					{
					  breakpoint: 992,
					  settings: {
					  	dots: false,
					    arrows: false,
					    slidesToShow: 4
					  }
					},
					{
					  breakpoint: 768,
					  settings: {
					  	dots: false,
					    arrows: false,
					    slidesToShow: 3
					  }
					},
					{
					  breakpoint: 530,
					  settings: {
					  	dots: false,
					    arrows: false,
					    slidesToShow: 2
					  }
					}
				]
			});
		}
	}//servicesCarousel


	/*************************
	  projectsCarousel
	*************************/
	function projectsCarousel(){
		if($("#projects-car").length){

			$('#projects-car').slick({
			  slidesToShow: 1,
			  slidesToScroll: 1,
			  arrows: false,
			  fade: true,
			  asNavFor: '#projects-nav',
			  autoplay: false, //true,
			});
			$('#projects-nav').slick({
			  slidesToShow: 6, //5
			  slidesToScroll: 1,
			  asNavFor: '#projects-car',
			  dots: false,
			  arrows: false,
			  // centerMode: true,
			  focusOnSelect: true,
			  // centerPadding: "100px",
			  autoplay: false, //true,
			 	responsive: [
					{
					  breakpoint: 1200,
					  settings: {
					  	dots: false,
					    arrows: false,
					    slidesToShow: 5
					  }
					},
					{
					  breakpoint: 992,
					  settings: {
					  	dots: false,
					    arrows: false,
					    slidesToShow: 4
					  }
					},
					{
					  breakpoint: 768,
					  settings: {
					  	dots: false,
					    arrows: false,
					    slidesToShow: 3
					  }
					},
					{
					  breakpoint: 530,
					  settings: {
					  	dots: false,
					    arrows: false,
					    slidesToShow: 2
					  }
					}
				]
			});
		}
	}//projectsCarousel


	/*************************
	  partnersCarousel
	*************************/
	function partnersCarousel(){
		if($("#partners-car").length){

			$('#partners-car').slick({
			  slidesToShow: 7,
			  slidesToScroll: 1,
			  dots: false,
			  arrows: false,
			  // centerMode: true,
			  focusOnSelect: true,
			  // centerPadding: "0",
			  autoplay: false, //true,
			  draggable: false,
			  // focusOnSelect: false,
			 	responsive: [
					{
					  breakpoint: 1200,
					  settings: {
					  	dots: false,
					    arrows: false,
					    slidesToShow: 5
					  }
					},
					{
					  breakpoint: 992,
					  settings: {
					  	dots: false,
					    arrows: false,
					    slidesToShow: 4
					  }
					},
					{
					  breakpoint: 768,
					  settings: {
					  	dots: false,
					    arrows: false,
					    slidesToShow: 3
					  }
					},
					{
					  breakpoint: 500,
					  settings: {
					  	dots: false,
					    arrows: false,
					    slidesToShow: 2
					  }
					}
				]
			});
		}
	}//partnersCarousel


	/*************************
	 popapCallback
	*************************/
	function popapCallback(){

		$('.button_modal').magnificPopup({
				type: 'inline',
				fixedContentPos: true,
				fixedBgPos: true,
				overflowY: 'auto',
				closeBtnInside: true,
				preloader: false,
				midClick: true,
				removalDelay: 300,////time open window
				mainClass: 'my-mfp-zoom-in',
				callbacks: {
					// open: function() {
					// 	setTimeout(function(){ 
	  		// 			$("#modal-callback .input-name-wrap").find("input").focus();
					// 	}, 300);//time for open window
	  		// 	},
	  		}
		});

	};//END popapCallback


	/*************************
	  contactForm
	*************************/
	function contactForm() {
		if($("#modal-callback").length){

		  $("#modal-callback").submit(function(event) {

				event.preventDefault();

				var form = $(this);
				var name = form.find('input[name=name]');
				var phone = form.find('input[name=phone]');
				var error = 0;

	      if (!name.val().length){
				  name.parent().addClass('error');
				  if (!error) name.focus();
	        error++;
	      }else {
				  name.parent().removeClass('error');
	      }

	      if (!phone.val().length){
				  phone.parent().addClass('error');
				  if (!error) phone.focus();
	        error++;
	      }else {
				  phone.parent().removeClass('error');
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
	};//END contactForm



function asdf(){
		/*----------------------
	  	slide panel toogle
		-----------------------*/
		if ($(window).outerWidth() < 1340){
			$("#s-slide-panel-wrap").hide(500)
		}else{
			$("#s-slide-panel-wrap").show(500)
		}
}


	$(document).ready(function(){
		basicScript();
		slidePanel();
		servicesCarousel();
		projectsCarousel();
		partnersCarousel();
		popapCallback();
		contactForm();
	});

	$(window).on( "load", function(){
		// asdf();
	});
	$(window).on( "resize", function(){
		// asdf();
	});

	$(window).on( "scroll", function() {});

})(jQuery);
