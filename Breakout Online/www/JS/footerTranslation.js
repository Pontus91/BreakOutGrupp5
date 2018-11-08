$(document).ready(function () {
    $.getJSON('/json/footerTranslation.json', function (data) {
        $.each(data.footerCardEng, function () {
            $('.kontaktText').append("<p>" + this['firstFooterEngText'] + "<p/>");
            $('.telefonText').append("<p>" + this['secondFooterEngText'] + "<p/>");
            $('.emailText').append("<p>" + this['thirdFooterEngText'] + "<p/>");
            $('.kontaktText p').addClass('engFooterText');
            $('.telefonText p').addClass('engPhoneText');
            $('.emailText p').addClass('engEmailText');
            $('.engFooterText').hide()
            $('.engPhoneText').hide()
            $('.engEmailText').hide()


        })
    })
})

$(document).ready(function () {
    $.getJSON('/json/footerTranslation.json', function (data) {
        $.each(data.footerCardSv, function () {
            $('.kontaktText').append("<p>" + this['firstFooterSweText'] + "<p/>");
            $('.telefonText').append("<p>" + this['secondFooterSweText'] + "<p/>");
            $('.emailText').append("<p>" + this['thirdFooterSweText'] + "<p/>");
            $('.kontaktText p').addClass('sweFooterText');
            $('.telefonText p').addClass('swePhoneText');
            $('.emailText p').addClass('sweEmailText');
        })
    })
})


$('.britFlag').click(function () {
    $('.sweFooterText').hide()
    $('.swePhoneText').hide()
    $('.sweEmailText').hide()
    $('.engFooterText').show()
    $('.engPhoneText').show()
    $('.engEmailText').show()
})

$('.sweFlag').click(function () {
    $('.engFooterText').hide()
    $('.engPhoneText').hide()
    $('.engEmailText').hide()
    $('.sweFooterText').show()
    $('.swePhoneText').show()
    $('.sweEmailText').show()
    $('.engFooterText').hide()
    $('.engPhoneText').hide()
    $('.engEmailText').hide()
})