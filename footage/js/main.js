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
	  	Header form animate
		-----------------------*/
	  $(".bottom-line-toogle").on("click", function(){
	  	var animateTime = 300;
	  	var block = $(".header-bottom");

			if(block.height() === 0){
			  autoHeightAnimate(block, animateTime);
			} else {
			  block.stop().animate({ height: '0' }, animateTime);
			}
	  });


	};//END basicScript


	/*************************
	  contentChangeView
	*************************/
	function contentChangeView(){
		if ($("#sorting_view-select").length){
			var primary = $("#primary");

			$("#sorting_view-select").on('change', function() {

				if ( this.value == "map" ){
					primary.addClass("list-map-view");
				}else if( this.value == "list" ){
					primary.removeClass("list-map-view");
				}

			});

		}
	};//END contentChangeView


	/*************************
	  initContentMap
	*************************/
	window.initContentMap = function (){

		if ($("#content-map").length){

			var markersData = [
				{
					lat: 50.005375,
					lng: 36.321587,
					name: "Объект 1",
					address:"Адрес 1"
				},
				{
					lat: 49.995395,
					lng: 36.321879,
					name: "Объект 2",
					address:"Адрес 2"
				},
				{
					lat: 50.010850,
					lng: 36.342411,
					name: "Объект 3",
					address:"Адрес 3"
				}
			];

			var element = document.getElementById('content-map');
			var options = {
				zoom: 14,
		    center: {lat: 50.004934, lng: 36.319111},
			}

		  var map = new google.maps.Map(element, options);


	    infoWindow = new google.maps.InfoWindow();
	    
	    google.maps.event.addListener(map, "click", function() {
	      infoWindow.close();
	    });
	    
	    for (var i = 0; i < markersData.length; i++){
	      var latLng = new google.maps.LatLng(markersData[i].lat, markersData[i].lng);
	      var name = markersData[i].name;
	      var address = markersData[i].address;
	        
	      addMarker(latLng, name, address);
	    }


			function addMarker(latLng, name, address) {
			  var marker = new google.maps.Marker({
			    position: latLng,
			    map: map,
			    title: name
			  });

			  google.maps.event.addListener(marker, "click", function() {

			    var contentString = '<div class="infowindow">' +
			                            '<h3>' + name + '</h3>' +
			                            '<p>' + address + '</p>' +
			                        '</div>';

			    infoWindow.setContent(contentString);

			    infoWindow.open(map, marker);
			  });
			}

		}//if
	}//END initContentMap



	/*************************
	  formSearchContent
	*************************/
	function formSearchContent() {
		if($("#form-choice").length){

			var $this = $("#form-choice");

				//submit
			  $this.submit(function(event) {
					event.preventDefault();

					//sending
					$.ajax({
						type: $this.attr('method'),
				  	url: $this.attr('action'),
				  	data: $this.serialize(),
				  	dataType: "json",
				  	beforeSend: function(jqXHR, settings) {},
				  	success: function(data, textStatus, jqXHR) {

				  	},
				  	error: function(jqXHR, textStatus, errorThrown) {
				  		alert('Ошибка отправки данных. Попробуйте еще раз.');
				  	},
				  	complete: function(jqXHR, textStatus) {},
				  });

				});//submit
		};//if
	};//END formSearchContent




	/*************************
	  SSS
	*************************/
	function SSS(){

	};//END SSS

	/*************************
	  other functions
	*************************/
	function autoHeightAnimate(element, time){
	  var curHeight = element.height();
	  var autoHeight = element.css('height', 'auto').height();
	  element.height(curHeight);
	  element.stop().animate({ height: autoHeight }, time);
	}
	//END other


	$(document).ready(function(){
		basicScript();
		contentChangeView();
		formSearchContent();
	});

	$(window).on( "load", function(){
		initContentMap();
	});
	$(window).on( "resize", function(){});
	$(window).on( "scroll", function() {});

})(jQuery);
