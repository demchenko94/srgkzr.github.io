function a(v){console.log(v)};

// (function () {
  
// })();

(function($){

	/*************************
	  basicScript for all pages
	*************************/
	function basicScript() {

		/*----------------------
	  	slide panel toogle
		-----------------------*/
		$(".sandwich").on("click", function (){
			$("#s-slide-panel-wrap").toggleClass("active");
			$(".sandwich").toggleClass("active");
		})

		/*----------------------
	  	menuCategories
		-----------------------*/
			var categoriesSubMenus = $(".menu-categories-wrap").find("ul");
			categoriesSubMenus.find("ul").each(function (){
				$this = $(this);
	
				$this.hide(0);//hide all menus
				$this.prev().on("click", function (event){
					event.preventDefault();
	
					$this = $(this);
	
					$this.parent().toggleClass("active");
					$this.next().slideToggle(300);
				})
			})
	
			/*----------------------
		  	
			-----------------------*/

	};//basicScript


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
			  slidesToShow: 6,
			  slidesToScroll: 1,
			  asNavFor: '#projects-car',
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
	}//projectsCarousel


	/*************************
	 popapCallback
	*************************/
	function popapCallback(){

		$('.button-call-callback').magnificPopup({
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
					open: function() {
						setTimeout(function(){ 
	  					$("#modal-callback .input-name-wrap").find("input").focus();
						}, 300);//time for open window

	  			},
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


	$(document).ready(function(){
		basicScript();
		servicesCarousel();
		projectsCarousel()
		popapCallback();
		contactForm();
	});

	$(window).on( "load", function(){});
	$(window).on( "resize", function(){

		/*----------------------
	  	slide panel toogle
		-----------------------*/
		if ($(window).outerWidth() < 1349){
			$("#s-slide-panel-wrap").hide(500)
		}else{
			$("#s-slide-panel-wrap").show(500)
		}

	});
	$(window).on( "scroll", function() {});

})(jQuery);
