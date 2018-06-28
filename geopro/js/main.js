function a(v){console.log(v)};

(function($){

	/*************************
	  basicScript for all pages
	*************************/
	function basicScript() {

	};//basicScript


	/*************************
	 slidePanel
	*************************/
	function slidePanel() {
		window.windowWidth = $(window).outerWidth();

		var slideout = new Slideout({
		    'panel': document.getElementById('page'),
		    'menu': document.getElementById('s-slide-panel-wrap'),
		    'padding': 280,
		    'tolerance': 100,
		    'touch': false,
		    'easing': 'ease-out',
		    'side': 'left',
			});

		var sandwich = $(".sandwich");
		sandwich.on("click", function (event) {
			slideout.toggle();
		});

		slideout.on('open', function (){  sandwich.addClass("active");  });
		slideout.on('close', function (){  sandwich.removeClass("active");  });
		// slideout.on('beforeopen', function () {});
		// slideout.on('beforeclose', function () {});


		var fixed = document.querySelector('.page-sandwich-wrap');

		slideout.on('translate', function(translated) {
		  fixed.style.transform = 'translateX(' + translated + 'px)';
		});

		slideout.on('beforeopen', function () {
		  fixed.style.transition = 'transform 300ms ease';
		  fixed.style.transform = 'translateX(280px)';
		});

		slideout.on('beforeclose', function () {
		  fixed.style.transition = 'transform 300ms ease';
		  fixed.style.transform = 'translateX(0px)';
		});

		slideout.on('open', function () {
		  fixed.style.transition = '';
		});

		slideout.on('close', function () {
		  fixed.style.transition = '';
		});
	
	};//END slidePanel


	/*************************
	 menuCategories
	*************************/
	function menuCategories(){
		var menu = $(".menu-categories-wrap > ul");

		menu.find("ul").each(function (){
			$this = $(this);

			$this.hide(0);//hide all menus
			$this.prev().on("click", function (){
				$this = $(this);

				$this.parent().toggleClass("active");
				$this.next().slideToggle(300);
			})
		})

	};//END menuCategories


	/*************************
	 popapCallback
	*************************/
	function popapCallback(){

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
		slidePanel();
		menuCategories();
		popapCallback();
		contactForm();
	});

	$(window).on( "load", function(){});
	$(window).on( "resize", function(){});
	$(window).on( "scroll", function() {});

})(jQuery);
