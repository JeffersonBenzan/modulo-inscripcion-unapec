$(document).ready(function() {

    $('.wprMenu > ul > li').mouseover(function() {
        $('.wprMenu > ul > li').removeClass('visible');
        $(this).addClass('visible');
        if (typeof SetTimeOut !== 'undefined') { clearTimeout(SetTimeOut); }
    });

    $('.wprMenu').mouseleave(function() {
        SetTimeOut = setTimeout(function() {
            $('.wprMenu > ul > li').removeClass('visible');
            $('.actual').addClass('visible').find('ul').addClass('visible');
        }
                                               , 1500);
    });
	var elemento = $('#ctl00_contenedorPrincipal_lblMontoFormaPago11 > .fpblk2');
	if(elemento)
	{
		var montoTotal = parseFloat(elemento.text().replace(/[^0-9\.]/g,''));
		var sinDescuento = montoTotal * 0.10;
		var totalCreditoEducativo = montoTotal + sinDescuento;
		var totalCreditoEducativo = totalCreditoEducativo.toFixed(2);
		var spnMontoFinal = $('<span class="fpblk2"></span>');
		var spnMontoFinalMoneda = $('<span class="fpblk1">RD$</span>');
	
		var montoFormateado = commaSeparateNumber(totalCreditoEducativo.toString());
		console.log(montoFormateado);
		$(spnMontoFinal).text(montoFormateado);
		$('#ctl00_contenedorPrincipal_lblMontoFormaPagoCreditoEducativo').append(spnMontoFinal);
		$('#ctl00_contenedorPrincipal_lblMontoFormaPagoCreditoEducativo').append(spnMontoFinalMoneda);
	
			//console.log(sinDescuento);
	}
});
 function commaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
  }

function infoPopup(claseID) {
    $('.infoPopup' + claseID + ' a').mouseover(function() {
        $('.infoPopup' + claseID + ' div').css('display', 'block');
        $(this).mouseout(function() {
            $('.infoPopup' + claseID + ' div').css('display', 'none');
        });
    });
}

function CerrarBloqueaDiv() {
    $(".ui-overlay").fadeOut();
}

function AbreBloqueaDiv() {
    var overlay = $('<div class="ui-overlay"  style="position: absolute; top: 0pt; left: 0pt; display: inline-block; overflow: hidden;"><div class="ui-widget-overlay" style="top: 0pt; left: 0pt; width: 9999px; height: 99999px;"></div></div>').hide().appendTo($('body'));
    $(overlay).width('100%');
    $(overlay).height('100%');
    $(overlay).fadeIn();
}