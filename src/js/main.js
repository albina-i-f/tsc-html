$(document).ready(function() {
  $('.home-content .choose-town a').click(function(e) {
    e.preventDefault();
    getRegion($(this));
  });
});

$(window).load(function () {
  // Добавление интерактивности к карте:
  $('.imap').each(function() { 

    var svgobject = this.querySelector('object');

    // Проверка на наличие содержимого в объекте
    if ('contentDocument' in svgobject) {
      // Получение доступа к SVG DOM
      var svgdom = svgobject.contentDocument;

      // Правильное масштабирование карты в IE
      if(getInternetExplorerVersion()!==-1) {
      	fixHeight(svgobject);
      }

      // Добавление всплывающей подсказки к регионам
      $('[data-type="region"]', svgdom).qtip({
        content: {
          attr: 'data-title'
        },
        position: {
          my: 'center center',
          at: 'top right'
        }
      });

      // Отправка запроса на сервер при клике по региону
      $('[data-class="js-map-item"]', svgdom).click(function() {
        getRegion($(this));
      });
    }
  });

  // Переключение карт
  $('.map-toggle').click(function(e) {
    e.preventDefault();

    $(this)
      .addClass('hidden')
      .siblings().removeClass('hidden');

    $('.map-container').toggleClass('shifted');
  });
});

function getInternetExplorerVersion() {
	var rv = -1;
	if (navigator.appName == 'Microsoft Internet Explorer') {
		var ua = navigator.userAgent;
		var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null) {
			rv = parseFloat( RegExp.$1 );
		}
	}
	else if (navigator.appName == 'Netscape')	{
		var ua = navigator.userAgent;
		var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null) {
			rv = parseFloat( RegExp.$1 );
		}
	}
	return rv;
}

function fixHeight(svgobject) {
	var viewBox = svgobject
									.contentDocument
									.rootElement
									.getAttribute('viewBox')
									.split(' ');
  var aspectRatio = viewBox[2] / viewBox[3];
  svgobject.height = parseInt(svgobject.offsetWidth / aspectRatio);
}

function getRegion(target) {
	var regionId = target.attr('data-region');

	$('.home-content').addClass('hidden');
	$('.inner-content').removeClass('hidden');

	/*$.ajax({
		type: 'GET',
		url: '../test1.php',
		data: { regionId },
		success: function(data) {
			$('<div class="result">Результат: ' + data + '</div>').appendTo('.inner-content');
		},
		error: function(data,err) {
			alert(err);
		}
	});*/
}