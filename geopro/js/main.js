function aaa(v){console.log(v)};

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
		if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) && widndow_width > 1200){

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
	  servicesTabs
	*************************/
	function servicesTabs(){
		if ($("#serv-tabs").length){

			var tabs_wrap = $("#serv-tabs");
			var nav = tabs_wrap.find(".serv-nav");
			var nav_items = nav.find(".serv-nav_i");
			var tab = tabs_wrap.find(".serv-tab");
			var tab_items = tab.find(".serv-tab_i");
			var tab_item_text_wrap = tabs_wrap.find(".serv-tab_i_text-wrap");
			var tab_item_text_btns = tab_item_text_wrap.children("span");

			nav_items.eq(0).addClass("active");//active first at start
			tab_items.eq(0).addClass("active");//active first at start

			nav_items.on("click", function(){

				nav_items.each(function (){
					$(this).removeClass("active");
				})
				$(this).addClass("active");

				if (widndow_width < 768){
					nav.toggleClass("active");
				}

				tab_items.each(function (){
					$(this).removeClass("active");
				})
				tab_items.eq($(this).index()).addClass("active");

			});//click

			tab_item_text_btns.each(function (){
				$(this).on("click", function(){
					$(this).parent().toggleClass("active");
				});
			})

		};
	};
	//servicesTabs


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
					  breakpoint: 1310,
					  settings: {
					  	dots: false,
					    arrows: false,
					    slidesToShow: 4
					  }
					},
					{
					  breakpoint: 992,
					  settings: {
					  	dots: false,
					    arrows: false,
					    slidesToShow: 3
					  }
					},
					{
					  breakpoint: 768,
					  settings: {
					  	dots: false,
					    arrows: false,
					    slidesToShow: 2
					  }
					},
					{
					  breakpoint: 498,
					  settings: {
					  	dots: false,
					    arrows: false,
			  			centerMode: false,
					    slidesToShow: 2
					  }
					},
					{
					  breakpoint: 385,
					  settings: {
					  	dots: false,
					    arrows: false,
			  			centerMode: true,
					    slidesToShow: 1
					  }
					}
				]
			});
		}
	}//projectsCarousel

	/*************************
	  projectsShowMore
	*************************/
	function projectsShowMore(){
		if ($("#projects-car").length){

			$("#projects-car").find(".projects-car_content_text-wrap > span").each(function (){
				$(this).on("click", function(){
					$(this).parent().toggleClass("active");
				});
			})

		}
	}
	//projectsShowMore


	/*************************
	  scrollIdAnimateMain
	*************************/
	function scrollIdAnimateMain(){
		if ($("#slide-panel").length){
			window.scroll = new SmoothScroll('.menu-pages-wrap a', {speed: 1000});
		}
	}//scrollIdAnimateMain


	/*************************
	 modalWindows
	*************************/
	function modalWindows(){

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
					open: function() {
						//focus on select. if > 1200. 300-time for open window
						$this = this;
						setTimeout(function(){
							$this.content.find(".form_name-wrap").find("input").focus();
						}, 300);
	  			},
	  		}
		});

	};//END modalWindows


	/*************************
	  contactForm
	*************************/
	function contactForm() {
		if($(".form").length){

			var forms = $(".form");

			forms.each(function (){

				$this = $(this);

				//mask for phone
				$this.find(".form_phone-wrap").find("input").mask("+9(999)999-99-99");

				//textarea resize
				$this.find("textarea").each(function(){
					autosize(this);
				})

				//submit
			  $this.submit(function(event) {
					event.preventDefault();

					// var subject = form.find('input[name=subject]');
					// var calltime = form.find('input[name=calltime]');
					// var question = form.find('textarea[name=question]');

					var form = $(this);
					var name = form.find('input[name=name]');
					var phone = form.find('input[name=phone]');
					var email = form.find('input[name=email]');
					var privacy = form.find('input[name=privacy]');
					var error = 0;

					//check privacy
			    if(privacy.prop("checked") != true) { 
			      // window.alert('Дайте свое согласие на обработку данных!');
					  privacy.parent().addClass('error');
			      return false;
			    }else{
					  privacy.parent().removeClass('error');
			    }

					//check name
		      if (!name.val().length){
					  name.addClass('error');
					  if (!error) name.focus();
		        error++;
		      }else {
					  name.removeClass('error');
		      }

		      //check phone
		      if (!phone.val().length){
					  phone.addClass('error');
					  if (!error) phone.focus();
		        error++;
		      }else {
					  phone.removeClass('error');
		      }

		      //check email
		      if (email.length){
			      if (!email.val().length){
						  email.addClass('error');
						  if (!error) email.focus();
			        error++;
			      }else {
						  email.removeClass('error');
			      }
		      }

		      //check error
					if (error) return;

					//sending
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

			})//each
		};//if
	};//END contactForm


	/*************************
	  OTHER
	*************************/
	function saveWindowWidth(){
		window.widndow_width = $(window).outerWidth();
	}
	//END OTHER


	$(document).ready(function(){
		saveWindowWidth();

		basicScript();
		slidePanel();
		servicesTabs();
		projectsCarousel();
		projectsShowMore();
		scrollIdAnimateMain();
		modalWindows();
		contactForm();

	});

	$(window).on( "load", function(){
		
	});
	$(window).on( "resize", function(){
		saveWindowWidth();
	});

	$(window).on( "scroll", function(){});

})(jQuery);
