// https://github.com/RobinHerbots/Inputmask
// 2010 - 2014

// этот файл из проекта demodom.
// 26kb минифицированный.
// старая версия.

$('.phone input').inputmask({'mask' : '+38(999) 999-99-99'});

/////////////-------////////////
var phone = form.find('input[name=phone]');
/*регулярка*/
var rePhone = /_/; //empty symbol inputmask
/*проверка*/
if (!phone.val().length || rePhone.test(phone.val())){};
