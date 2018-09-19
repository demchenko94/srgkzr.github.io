(function($){

/*************************
  basicScript for all pages
*************************/
	function basicScript() {
		window.windowWidth = $(window).outerWidth();

		/*--toogle slide panel--*/
		if ($("#m-slide-panel").length){
			$(".m-slide-panel-toogle").on("click", function (){

				$("#m-slide-panel").toggleClass("active");
			});
		}

		/*--toogle search form mobile--*/
		if ($("#icon-search").length){
			var header_search_line = $("#header-search-line");
			if ( !$("#srch_page-wrapper" ).length ){//если не страница поиска обьектов
				$("#icon-search").on("click", function (){
					header_search_line.slideToggle(400);
				});
			}else{
				var srch_page_wrapper = $("#srch_page-wrapper");
				$("#icon-search").on("click", function (){
					srch_page_wrapper.toggleClass("srch_form-open");//дополнительно для страница поиска обьектов
					header_search_line.slideToggle(400);
					console.log(srch_page_wrapper)
				});
			}
		}

		/*--добавление липкого футера, если не IE--*/
		if ( !isIE() && !$("body").hasClass("page-search") ){
			$("#page-wrapper").addClass("sticky-footer");
		}



	};
//END basicScript


//-/*******************************/-//
//-/ FORM ANIMATIONS FUNCTIONS /-//
//-/*******************************/-//
	/*************************
	  searchFormAnimation
	*************************/
	function searchFormAnimation() {
		if($("#search_form").length){

			var form = $("#search_form");
			var items = form.find(".search_list_i");
			var item_extra = form.find(".search_list_i-extra");
			var items_sub = form.find(".search_list_i-sub");

			var search_form_open = false; //открыто ли подменю

		/*-- клик по элементу списка --*/
			form.find(".search_field").on("click", function (){
				$this = $(this);
				if ( !$this.parent().hasClass("active") ){//если закрыто - открываем
					
					$this.parent().addClass("active");

					if ( !$this.hasClass("search_field-adress") ){//если открыли подменю
						$this.siblings().slideToggle(200);
						search_form_open = true;
					}else{
						$this.siblings().slideToggle(0);
						search_form_open = false;
					}

				}else {//если открыто - закрываем //

					$this.parent().removeClass("active");
					$this.siblings().fadeOut(0);

					if ( $this.parents(".search_drop-adress").length === 1 ){//если закрали дочерний АДРЕСА
						search_form_open = false;
					}else if ( $this.parents(".search_drop-extra").length === 1 ){//если закрали дочерний ДОПОЛНИТЕЛЬНО
						search_form_open = true;
					}else{
						search_form_open = false;
					}

				}

			});
		/*-- END клик по элементу списка --*/

		/*-- клик по кнопке ок в sub menu --*/
			$(".search_button-ok").on("click", function (){
					items.filter(".active").each(function(){
						$(this).removeClass("active");
						$(this).find(".search_drop").fadeOut(0);
					});
			});
		/*-- END клик по кнопке ок в sub menu --*/

		/*-- клик по документу и закрытие открытых --*/
			$(document).mouseup(function (e){ // событие клика по веб-документу

				if ( search_form_open ){ //если открыто выпадающее меню

					items.filter(".active").each(function(){
						
						if ( !$(this).is(e.target ) // если клик был не по нашему блоку
						    && $(this).has(e.target).length === 0 ) { // и не по его дочерним элементам

							if ( !items_sub.hasClass("active") ){
								$(this).removeClass("active");
								$(this).find(".search_drop").fadeOut(0);
							}else{
								items_sub.each(function(){
									$(this).removeClass("active");
									$(this).find(".search_drop").fadeOut(0);
								})
							}

							if ( item_extra.hasClass("active") ){//Если открыто меню дополнительно и клик при открытом подменю пришелся по нему
								search_form_open = true;
							}else {
								search_form_open = false;
							}

						}//if target

					})

				}//if

			});
		/*-- END клик по документу и закрытие открытых --*/

		/*-- autocomplete input --*/
			var autocomplete_input = $("#autocomplete");
			autocomplete_input.on("click", function (){
					if ( autocomplete_input.is( ":focus" ) ){
						$(this).val("Харьков, ")//ПОДСТАВЛЯЕМ ГОРОД В INPUT, потому что поиск по всей уркаине
						autocomplete_input.parents(".search_list_i-street").addClass("active");
					}
			});

			autocomplete_input.focusout(function() {
			  autocomplete_input.parents(".search_list_i-street").removeClass("active");
				input = this;
				$this = $(this);

				$drop_box = $(input).parents(".search_drop");//выпадающий элемент

				setTimeout(function($form_items_html){//время чтоб в инпуте появился выбор
					
					if ( input.value.length > 10 ){// добавляем текст родительскому элементу формы

							$(input).parent().parent().addClass("activated");
							formItemText_secondItem($this);

					}else{

							$(input).val("");//Удаляем значение если не выбранно
							$(input).parent().parent().removeClass("activated");
							formItemText_secondItem($this);

						}
					}, 200);//setTimeout
			});//focusout
			
		/*-- END autocomplete input --*/

		/*--Слайдер выбора цены--*/
			var slider_el = $("#price_slider");
			var price = slider_el.parents(".price");//Родитель
			var search_list_price = slider_el.parents(".search_list_i-price");//Родитель элемент меню

			var currency_inputs = price.find(".currency_radio-i");
			var currency_uah = price.find(".currency_radio-i[value='ГРН']");
			var currency_usd = price.find(".currency_radio-i[value='USD']");

			if ( currency_uah.attr("checked") == 'checked' ){
				var price_slider_min = slider_el.attr("data-min-uah");
				var price_slider_max = slider_el.attr("data-max-uah");
			}else if( currency_usd.attr("checked") == 'checked' ){
				var price_slider_min = slider_el.attr("data-min-usd");
				var price_slider_max = slider_el.attr("data-max-usd");
			}

			var slider_from = price.find("#price_from");//позиции бегунка(число)
			var slider_to = price.find("#price_to");//позиции бегунка(число)

			$("#price_slider").ionRangeSlider({
		    type: "double",
		    hide_min_max: true,
		    hide_from_to: true,
		    min: price_slider_min,
		    max: price_slider_max,
		    from: slider_from.val(),
		    to: slider_to.val(),
		    onChange: function (data) {
		    	slider_from.val(data.from);
		    	slider_to.val(data.to);
					priceParentActivated();
		    },
			});
			var price_slider = $("#price_slider").data("ionRangeSlider");//Опции в переменную
			
			slider_from.change(function(){
				price_slider.update({
			    from: slider_from.val(),
				});
				priceParentActivated();
			});
			slider_to.change(function(){
				price_slider.update({
			    to: slider_to.val(),
				});
				priceParentActivated();
			});

			currency_inputs.change(function(){

		    if (this.value == 'ГРН') {
					price_slider_min = slider_el.attr("data-min-uah");
					price_slider_max = slider_el.attr("data-max-uah");
		    	slider_from.val(slider_el.attr("data-min-uah"));
		    	slider_to.val(slider_el.attr("data-max-uah"));
		    }
		    else if (this.value == 'USD') {
					price_slider_min = slider_el.attr("data-min-usd");
					price_slider_max = slider_el.attr("data-max-usd");
		    	slider_from.val(slider_el.attr("data-min-usd"));
		    	slider_to.val(slider_el.attr("data-max-usd"));
		    }

				price_slider.update({//обновляем данные в слайдере
		    	min: price_slider_min,
		    	max: price_slider_max,
		  	  from: slider_from.val(),
		  	  to: slider_to.val(),
				});

				priceParentActivated();

			});

			function priceParentActivated() {
				search_list_price.addClass("activated");
				search_list_price.find(".search_field_text").html(slider_from.val() + " - " + slider_to.val());
			}
		/*-- END Слайдер выбора цены--*/

		/*-- Вызов записывающих функций --*/
			function formItemText(){
				var form = $("#search_form");

				form.find(".search_input-i").change(function(){
					$this = $(this);
					formItemText_firstItem($this);
					formItemText_secondItem($this);
				});
				form.find(".search_radio-i").change(function(){
					$this = $(this);
					formItemText_firstItem($this);
					formItemText_secondItem($this);
					formShowExtraItems(form, $this);


				});

			};//END formItemText
			formItemText();
		/*-- END Вызов записывающих функций при клике по --*/

		/*-- Вызов функции упривления extra меню элементами --*/
			formShowExtraItems(form);
		/*-- END Вызов функции упривления extra меню элементами --*/

		/*-- Вызов записывающей функции при старте --*/
			formOnReadyText(form);
		/*-- END Вызов записывающей функции при старте --*/

		}//if
	}//END searchFormAnimation

	/*************************
	  formItemText_firstItem - //Добавляет колличество выбранных пунктов в родительский меню элемент
	*************************/
	function formItemText_firstItem($this){

		if ( $this.parents(".search_condition").length == 1  ){return}//если это не радиокнопки без родительского пункта

		var $form_items_html = "";
		$drop_box = $($this.parents(".search_drop")[0]);//выпадающий элемент
		$form_list_item = $drop_box.parent();//элемент списка меню формы

		$drop_box.find("input:checked").each(function(){//набиваем строку в цикле из checked инпутов
			$form_items_html += "<span>" + this.value + "</span>";
		})

		if ( $form_items_html ){//были ли checked инпуты
			$form_list_item.addClass("activated");//скрыть placeholder и показать текст
			$drop_box.siblings(".search_field").find(".search_field_text").html($form_items_html);
		}else {
			$form_list_item.removeClass("activated");
		}

	}//END formItemText_firstItem

	/*************************
	  formItemText_secondItem - //Добавляет колличество выбранных пунктов в родителя родительского меню элемена
	*************************/
	function formItemText_secondItem($this){
		var parent_element;
		var options_number = 0;

		if ($this){//если вызов после события

			if ( $this.parents(".search_list-sub").length ){//если элемент дочернний дочернего списка

				parent_element = $this.parents(".search_list-sub").parents(".search_list_i");

				options_number = parent_element.find("input:checked").length;

				if ( parent_element.find("input:text").val() ){
					options_number += 1;
				};
				if ( parent_element.find("textarea").val() ){
					options_number += 1;
				};

				if ( options_number ){//если были выбранны варианты дочернего списка
					parent_element.addClass("activated");

					parent_element.children(".search_field").find(".search_field_text").html(
							parent_element.children(".search_field").find(".search_field_placeholder").html()
							+ " (" + options_number + ")"
							);

				}else {
					parent_element.removeClass("activated");
				}
				
			}

		}//if
	}//END formItemText_secondItem

	/*************************
	  formOnReadyText - вызывается после инициализации всего меню - при вызове записывает все чекнутые и введенные в родителей(form items) и их родителей
	*************************/
	function formOnReadyText(form){

		form.find(".search_input-i, .search_radio-i").each(function () {
			$this = $(this);
			formItemText_firstItem($this);
		})

		parent_element = form.find(".search_list-sub").parents(".search_list_i");

		parent_element.each(function () {
			parent_element = $(this);
			options_number = parent_element.find("input:checked").length;

			if ( parent_element.find("input:text").val() ){
				options_number += 1;
			};
			if ( parent_element.find("textarea").val() ){
				options_number += 1;
			};

			if ( options_number ){//если были выбранны варианты дочернего списка
				parent_element.addClass("activated");

			parent_element.children(".search_field").find(".search_field_text").html(
					parent_element.children(".search_field").find(".search_field_placeholder").html()
					+ " (" + options_number + ")"
					);

			}else {
				parent_element.removeClass("activated");
				}
		})
	}

	/*************************
	  formShowExtraItems - при выборе квартира, дом, участок - меняет дополнительные варианты в дополнительно
	*************************/
	function formShowExtraItems(form, $this) {
		var extra_items = form.find(".search_rooms, .search_baths, .search_commercial, .search_stead");

		if (!$this){//вызов document on ready, $this не передан
			$this = form.find(".search_list_i-property").find(".search_radio-i:checked");
		}//else

		if ( $this.val() == "Квартира" ){

			extra_items.each(function (){
				$this = $(this);
				if ( $this.hasClass("search_rooms") || $this.hasClass("search_baths") ){
					$this.show(0);
				}else{
					$this.hide().find(".search_input-i:checked").click();
				}
			})

		}else if ( $this.val() == "Дом" ){

			extra_items.each(function (){
				$this = $(this);
				if ( $this.hasClass("search_rooms") || $this.hasClass("search_baths") ){
					$this.show(0);
				}else{
					$this.hide().find(".search_input-i:checked").click();
				}
			})

		}else if ( $this.val() == "Участок" ){

			extra_items.each(function (){
				$this = $(this);
				if ( $this.hasClass("search_stead") ){
					$this.show(0);
				}else{
					$this.hide().find(".search_input-i:checked").click();
				}
			})

		}else if ( $this.val() == "Коммерческая недвижимость" ){

			extra_items.each(function (){
				$this = $(this);
				if ( $this.hasClass("search_commercial") ){
					$this.show(0);
				}else{
					$this.hide().find(".search_input-i:checked").click();
				}
			})

		}

	}//END formShowExtraItems
//-/*******************************/-//
//-/ END FORM ANIMATIONS FUNCTIONS /-//
//-/*******************************/-//


/*************************
  searchPageInit
*************************/
	function searchPageInit(){
		if($("#srch_page-wrapper").length){

		var page_wrap = $("#srch_page-wrapper");
		var main_wrap = page_wrap.find("#srch_main > .srch_main-wrap");

	//изменить вид (с картой или без)
		$("#sorting_view").on('change', function() {
			if ( this.value == "map" ){
				main_wrap.addClass("map-show");
			}else if( this.value == "list_map" ){
				main_wrap.removeClass("map-show");
			}
		});
	//изменить вид ( карта или список)
		$("#btn-toggle-mobile").on('click', function() {
				main_wrap.toggleClass("map-show-mobile");
		});

		};//if
	};
//END searchPageInit





//-/*******************************/-//
//-/ GOOGLE FUNCTIONS /-//
//-/*******************************/-//

/*************************
  initAutocomplete
*************************/
	function initAutocomplete(){
		if ($("#autocomplete").length){
	  var autocomplete;
		
	  var cityBounds = new google.maps.LatLngBounds(
	    new google.maps.LatLng(50.098372, 36.115343),
	    new google.maps.LatLng(49.902965, 36.451859));
	  autocomplete = new google.maps.places.Autocomplete(
	    /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
	    {
	      bounds: cityBounds,
	      // strictBounds: true,
	      types: ['address'],
	      componentRestrictions: {country: 'ua'}
	    });
	  // autocomplete.addListener('place_changed', functionName);
		}//if
	}
//END initAutocomplete

/*************************
  initContentMap
*************************/
	window.initContentMap = function (){

		if ($("#map").length){

			var markersData = [
				{
					lat: 50.005375,
					lng: 36.321587,
					name: "Объект 1",
					address:"Адрес 1",
					type: "type1"
				},
				{
					lat: 49.995395,
					lng: 36.321879,
					name: "Объект 2",
					address:"Адрес 2",
					type: "type2"
				},
				{
					lat: 50.010850,
					lng: 36.342411,
					name: "Объект 3",
					address:"Адрес 3",
					type: "type3"
				}
			];

      var icons = {
        type1: {
          icon: 'img/1.png'
        },
        type2: {
          icon: 'img/2.png'
        },
        type3: {
          icon: 'img/3.png'
        }
      };


			var element = document.getElementById('map');
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

	      var type = markersData[i].type;
	        
	      addMarker(latLng, name, address, type);
	    }


			function addMarker(latLng, name, address, type) {
			  var marker = new google.maps.Marker({
			    position: latLng,
			    map: map,
			    icon: icons[type].icon,
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
	}
//END initContentMap


	/*************************
	  projectsCarousel
	*************************/
	function projectsCarousel(){
		if($("#best-slider").length){

			$('#best-slider').slick({
			  slidesToShow: 3, //5
			  slidesToScroll: 1,
			  dots: true,
			  arrows: false,
			  // centerMode: true,
			  focusOnSelect: true,
			  // centerPadding: "100px",
			  autoplay: false, //true,
			 	responsive: [
					{
					  breakpoint: 1200,
					  settings: {
					  	dots: true,
					    arrows: false,
					    slidesToShow: 3
					  }
					},
					{
					  breakpoint: 992,
					  settings: {
					  	dots: true,
					    arrows: false,
					    slidesToShow: 2
					  }
					},
					{
					  breakpoint: 768,
					  settings: {
					  	dots: true,
					    arrows: false,
					    slidesToShow: 1
					  }
					}//,
					// {
					//   breakpoint: 550,
					//   settings: {
					//   	dots: true,
					//     arrows: false,
			  // 			centerMode: false,
					//     slidesToShow: 1
					//   }
					// }

				]
			});

		};
	};//projectsCarousel



/*************************
  formSearchSubmit
*************************/
	function formSearchSubmit() {
		if($("#search_form").length){

			var $this = $("#search_form");

				//submit
			  $this.submit(function(event) {
					event.preventDefault();

				});//submit
		};//if
	};
//END formSearchSubmit


/*************************
  SSS
*************************/
	function SSS(){

	};
//END SSS


/*************************
  other functions
*************************/
	//autoHeightAnimate - функция анимации для блоков height:auto
	function autoHeightAnimate(element, time){
	  var curHeight = element.height();
	  var autoHeight = element.css('height', 'auto').height();
	  element.height(curHeight);
	  element.stop().animate({ height: autoHeight }, time);
	}
	//END 
	//Поиск IE браузеров
	function isIE() {
	  var ua = window.navigator.userAgent;
	  var msie = ua.indexOf('MSIE '); // IE 10 or older
	  var trident = ua.indexOf('Trident/'); //IE 11

	  return (msie > 0 || trident > 0);
	}
	//END Поиск браузеров
//END other functions


	$(document).ready(function(){
		basicScript();
		searchFormAnimation();
		searchPageInit();
		formSearchSubmit();
		projectsCarousel();
	});

	$(window).on( "load", function(){
		initContentMap();
		initAutocomplete();

	});
	$(window).on( "resize", function(){});
	$(window).on( "scroll", function() {});

})(jQuery);

