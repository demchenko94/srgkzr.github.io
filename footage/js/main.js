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


		/*--добавление липкого футера, если не IE--*/
		if (!isIE()){
			$("#page-wrapper").addClass("sticky-footer");
		}

	};//END basicScript


	/*************************
	  initContentMap
	*************************/
	window.initContentMap = function (){
		if ($("#content-map").length){



		}//if
	}//END initContentMap


	/*************************
	  searchFormAnimation
	*************************/
	function searchFormAnimation() {
		if($("#search_form").length){

			var form = $("#search_form");
			var items = form.find(".search_list_i");
			var items_sub = form.find(".search_list_i-sub");

			var search_form_open = false; //открыто ли подменю

			//клик по элементу списка
			form.find(".search_field").on("click", function (){
				$this = $(this);
				if ( !$this.parent().hasClass("active") ){//если закрыто - открываем
					
					$this.parent().addClass("active");
					$this.siblings().slideToggle(100);

					search_form_open = true;

					if ($this.hasClass("search_field-adress")){//если открыли подменю
						search_form_open = false;
					}

				}else {//если открыто - закрываем

					$this.parent().removeClass("active");
					$this.siblings().fadeOut(100);

					if ( items.filter(".active").length ){//если под меню, то оставляем search_form_open = true; чтоб закрылось основное
						search_form_open = true;
					}else {
						search_form_open = false;
					}

				}//search_drop

			});
			//END клик по элементу списка//.is( ":focus" )

			//клик по кнопке ок в sub menu
			$(".search_button-ok").on("click", function (){
					items.filter(".active").each(function(){
						$(this).removeClass("active");
						$(this).find(".search_drop").fadeOut(100);
					});
			});

			//клик по документу и закрытие открытых
			$(document).mouseup(function (e){ // событие клика по веб-документу

				if ( search_form_open ){ //если открыто выпадающее меню

					items.filter(".active").each(function(){
						
						if ( !$(this).is(e.target ) // если клик был не по нашему блоку
						    && $(this).has(e.target).length === 0 ) { // и не по его дочерним элементам

							if ( !items_sub.hasClass("active") ){
								$(this).removeClass("active");
								$(this).find(".search_drop").fadeOut(100);
							}else{
								items_sub.each(function(){
									$(this).removeClass("active");
									$(this).find(".search_drop").fadeOut(100);
								})
							}

							search_form_open = false;
						}//if target

					})

				}//if

			});
			//END клик по документу и закрытие открытых

			//Изменяем информацию в элементе формы
			form.find(".search_input-i").change(function(){
				$this = $(this);
				$form_items_html = "";
				$drop_box = $this.parents(".search_drop");//выпадающий элемент
				$form_list_item = $drop_box.parent();//элемент списка меню формы

				$($drop_box[0]).find(".search_input-i:checked").each(function(){//набиваем строку в цикле из checked инпутов
					$form_items_html += "<span>" + this.value + "</span>";
				})

				if ( $form_items_html ){//были ли checked инпуты
					$form_list_item.addClass("activated");//скрыть placeholder
					$drop_box.siblings(".search_field").find(".search_field_text").html($form_items_html);
				}else {
					$form_list_item.removeClass("activated");
				}

			});
			//END Изменяем информацию в элементе формы

			//autocomplete input
			var autocomplete_input = $("#autocomplete");
			autocomplete_input.on("click", function (){
					if ( autocomplete_input.is( ":focus" ) ){
						autocomplete_input.parents(".search_list_i-street").addClass("active");
					}
			});

			autocomplete_input.focusout(function() {
			  autocomplete_input.parents(".search_list_i-street").removeClass("active");

				$drop_box = $(this).parents(".search_drop");//выпадающий элемент
				$form_items_html = this.value;
				
					if ( $form_items_html ){// добавляем текст родительскому элементу формы
						
						setTimeout(function($form_items_html){//время чтоб в инпуте появился выбор
							$form_items_html = this.value;
						}, 200);

						$drop_box.siblings(".search_field").find(".search_field_text").html($form_items_html);
						$drop_box.parent().addClass("activated");//скрыть placeholder
						$(this).parent().parent().addClass("activated");
					}else{
						$(this).parent().parent().removeClass("activated");
					}
			});
			//END autocomplete input

		}//if
	}//END searchFormAnimation


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
	};//END formSearchSubmit


	/*************************
	  SSS
	*************************/
	function SSS(){

	};//END SSS

	/*************************
	  other functions
	*************************/
	// 
	function autoHeightAnimate(element, time){
	  var curHeight = element.height();
	  var autoHeight = element.css('height', 'auto').height();
	  element.height(curHeight);
	  element.stop().animate({ height: autoHeight }, time);
	}
	//END 
	//Поиск браузеров
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
		formSearchSubmit();
	});

	$(window).on( "load", function(){
		initContentMap();
	});
	$(window).on( "resize", function(){});
	$(window).on( "scroll", function() {});




})(jQuery);

