function a(v) {
	console.log(v);
};
	// if (document.getElementById("")) {}

(function($){

	window.myScript = {
		windowStartWidth: $(window).outerWidth(),

		basic: function() {

			//niceScroll
			if (myScript.windowStartWidth >= 1200){
			  $("body").niceScroll({
			    scrollspeed: 60,
			    mousescrollstep: 35,
			    cursorwidth: 10,
			    cursorborder: 0,
			    cursorcolor: 'rgba(47,15,2,0.8)',
			    cursorborderradius: 2,
			    autohidemode: true,
			    horizrailenabled: false
			  });
			};

			//img popap magnificPopup
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

			//call modal form
			$('.button-form').magnificPopup({
					type: 'inline',
					fixedContentPos: true,
					fixedBgPos: true,
					overflowY: 'auto',
					closeBtnInside: true,
					preloader: false,
					midClick: true,
					removalDelay: 300,
					mainClass: 'my-mfp-zoom-in',
					callbacks: {
						open: function() {

							setTimeout(function(){ 
	    					$("#form-modal .input-name-wrap").find("input").focus();
							}, 300);//time for open window

	  				},
	  			}
			});

			//scroll to id
			var scroll = new SmoothScroll('nav a[href*="#"]');

			//maskedPhone
		  $(".input-phone-wrap input").mask("(999) 999-9999");

		},//end basic

		header: function(){
			if ( $(window).scrollTop() > 800 ) {
				$("nav").addClass("active")
			}else{
				$("nav").removeClass("active")
			}
		},//end header

		aboutUsAnimate: function () {
		  window.animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

		  $("#about-us-items > div").each(function() {
		  	var itemIcon = $(this).find(".icon");
		  	var itemTitle = $(this).find(".title");

				itemIcon.one(animationEnd, function() { itemIcon.removeClass('animated jello'); });// fix если остатся на элемнте -класс не всегда удаляется
				itemTitle.one(animationEnd, function() { itemTitle.removeClass('animated swing'); });// fix если остатся на элемнте -класс не всегда удаляется

				itemIcon.hover(function(){

				  itemIcon.addClass('animated jello');
	        itemTitle.addClass('animated swing');

				},function(){

					itemIcon.one(animationEnd, function() {
	          itemIcon.removeClass('animated jello');
	        });
					itemTitle.one(animationEnd, function() {
	          itemTitle.removeClass('animated swing');
	        });

				});
		  });
		},//end aboutUsAnimate

		solutionsAnimate: function () {

			if ( typeof myScript.solutions_animation_completed !== 'undefined')return;
			
			if ( typeof myScript.solutions_box == 'undefined'){
				myScript.solutions_box = $("#solutions-items")
			};

			var windowScroll = $(window).scrollTop() + $(window).height();

			if (windowScroll > myScript.solutions_box.offset().top ){

				myScript.solutions_box.find(" > div").each(function(indx, element){
					$(this).css("animation-delay", ("0." + indx*300 + "s")).addClass("animated fadeInUp");
				})

				myScript.solutions_animation_completed = true;
			};
		},//end solutionsAnimate

		advantagesAnimate: function () {
		  window.animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

		  $("#adv-items").find(".adv-item").each(function() {
		  	var itemIcon = $(this).find(".adv-icon");
		  	var itemTitle = $(this).find(".adv-title");

				itemIcon.one(animationEnd, function() { itemIcon.removeClass('animated rubberBand'); });
				itemTitle.one(animationEnd, function() { itemTitle.removeClass('animated swing'); });

				itemIcon.hover(function(){
				  itemIcon.addClass('animated rubberBand');
	        itemTitle.addClass('animated swing');
				},function(){
					itemIcon.one(animationEnd, function() {
	          itemIcon.removeClass('animated rubberBand');
	        });
					itemTitle.one(animationEnd, function() {
	          itemTitle.removeClass('animated swing');
	        });
				});
		  });
		},//end advantagesAnimate

		howWeAnimate: function () {
			if ( typeof myScript.howWe_animation_completed !== 'undefined')return;
			if ( typeof myScript.howWe_box == 'undefined'){ myScript.howWe_box = $(".how-we-items") };

			var windowScroll = $(window).scrollTop() + $(window).height();

			if (windowScroll > myScript.howWe_box.offset().top ){

				myScript.howWe_box.find(" > div").each(function(indx, element){
					if ($(this).hasClass("how-we5")){
						$(this).addClass(" animated bounceIn").find("span").addClass("animated tada");
					}else{
						$(this).addClass("animated fadeInLeft");
					}
				})

				myScript.howWe_animation_completed = true;
			};
		},//end howWeAnimate

		stProjects: function(){

			//init carousel
			$('#st-projects-car').owlCarousel({
			  items:1,
			  loop:false,
			  center:true,
			  margin:0,
			  mouseDrag: false,
			  URLhashListener:true,
			  autoplayHoverPause:false,
			  startPosition: 'URLHash',
			  touchDrag: true,
			  autoplay: false,
			});

			//build modal window
			$('.st-project_modal').magnificPopup({
				type: 'inline',
				fixedContentPos: true,
				fixedBgPos: true,
				overflowY: 'auto',
				closeBtnInside: true,
				preloader: true,
				midClick: true,
				removalDelay: 300,
				mainClass: 'my-mfp-zoom-in',
				callbacks: {
					beforeOpen: function() {

						//generate project html
						var project = {};
						project.element = $(this.st.el).parent();// this.st.el - trigered button
						project.name = project.element.find(".name b").html();
						project.sizes = project.element.find(".sizes b").html(); 
						project.area = project.element.find(".area b").html(); 
						project.imgs_number = project.element.attr("data-images");

						for (var i = project.imgs_number; i > 0; i--){
							project.slider_html += "<div><a class='st-gallery' href='img/projects/" +
																		 project.name + "/" + (project.imgs_number - i + 1) +  "-b.jpg'><img src='img/projects/" + 
																		 project.name + "/" + (project.imgs_number - i + 1) +  ".jpg' width='450px' height='295px' alt=''></a></div>";
							project.nav_html += "<div><img src='img/projects/" + project.name + "/" + (project.imgs_number - i + 1) + "-s.jpg' width='88px' height='58px' alt=''></div>";
						};

						project.html = "<div class='col-left'><p class='title'>Проект дома: <b>" + 
													 project.name + "</b></p><div class='m-slider-wrap'><div id='st-project-slider' class='st-project-slider'>" + 
													 project.slider_html + "</div><div id='st-project-slider-nav' class='m-slider-nav'>" + 
													 project.nav_html + "</div></div></div><div class='col-right'><p class='phone'>+38 (050) <b>204-34-28</b></p><a data-featherlight='image' href='img/projects/" + 
													 project.name + "/graph-b.jpg'><img src='img/projects/" + 
													 project.name + "/graph.jpg' alt='Проект'></a><p class='area'>Площадь: <b>" + 
													 project.area + "</b></p><p class='sizes'>Размеры: <b>" + 
													 project.sizes + "</b></p><p class='notice'>Оставьте заявку, чтобы получить подробную комплектацию и цену проекта</p><span class='button button-form'>Оставить заявку</span></div>";

						//append project html							 
						$("#st-project_modal").html(project.html);

						//init new button for popap form
						$("#st-project_modal").find(".button-form").on("click", function(){
							$.magnificPopup.close();

							setTimeout(function(){ 
								$.magnificPopup.open({
										items: { src: '#form-modal' },
										type: 'inline',
										fixedContentPos: true,
										fixedBgPos: true,
										overflowY: 'auto',
										closeBtnInside: true,
										preloader: false,
										midClick: true,
										removalDelay: 300,
										mainClass: 'my-mfp-zoom-in',
										callbacks: {
											open: function() {

												setTimeout(function(){ 
						    					$("#form-modal .input-name-wrap").find("input").focus();
												}, 300);//time for open window

						  				},
						  			}
								});
							}, 320);//time for close animation this popap(300)

						});

						//init slider
						$('#st-project-slider').slick({
						  slidesToShow: 1,
						  slidesToScroll: 1,
						  arrows: false,
						  fade: true,
						  asNavFor: '#st-project-slider-nav',
						});
						$('#st-project-slider-nav').slick({
						  slidesToShow: 3.9,
						  slidesToScroll: 1,
						  asNavFor: '#st-project-slider',
						  dots: false,
						  arrows: false,
						  centerMode: true,
						  focusOnSelect: true,
						});

						//lightbox
						$('#st-project-slider .st-gallery').featherlightGallery({
								galleryFadeIn: 300,
								openSpeed: 300,
								galleryFadeIn: 1, //100,
								galleryFadeOut: 1, //300,
								closeSpeed: 250, 
						});
						$.featherlight.defaults.closeIcon = '';
						$.featherlight.defaults.otherClose = ".featherlight-image";


				  },
				  afterClose: function() {
		        $('#st-project-slider').slick('unslick');
		        $('#st-project-slider-nav').slick('unslick');
				  }
				}
			});
		},//end stProjects

		requestCallback: function () {
	    $('.request-callback').submit(function(event) {
				event.preventDefault();
			  var form = $(this);
			  var validation = true;

			  form.find("input").each(function(){
			 		var item = $(this);

			    if (item.attr("type") == "hidden") return;

			  	if(item.val().length != 0){
			      item.parent().removeClass('error');
			  	}else{
			      item.parent().addClass('error');
			      item.focus();
			      validation = false;
			  		return false;
			  	};
				});
				
				if (!validation) return;

				$.ajax({
					type: "POST",
			  	url: 'mail.php',
			  	data: form.serialize(),
			  	dataType: "json",
			  	beforeSend: function(jqXHR, settings) {},
			  	success: function(data, textStatus, jqXHR) {
			  		if (data === 'OK') {
			        alert('Данные успешно отправленны');
			      }
			  	},
			  	error: function(jqXHR, textStatus, errorThrown) {
			  		alert('Ошибка отправки данных. Попробуйте еще раз.');
			  	},
			  	complete: function(jqXHR, textStatus) {},
			  });
			});
		},//end requestCallback

	};//end myScript

	$(document).ready(function(){
		myScript.basic();
		myScript.stProjects();
		myScript.solutionsAnimate();
		myScript.howWeAnimate();
		myScript.requestCallback();
		myScript.header();
		myScript.aboutUsAnimate();
		myScript.advantagesAnimate();
	});

	$(window).on( "load", function(){});

	$(window).on( "resize", function(){});

	$(window).on( "scroll", function() {
		myScript.solutionsAnimate();
		myScript.howWeAnimate();
		myScript.header();
	});


})(jQuery);
