
/*

$(document).ready(function() {
    $.getJSON('/js/frontCardsTranslation.json', function(data) {
        $.each(data.frontCardSv, function() {
            $('.firstCard').append("<p>"+this['firstCardText']+"</p");
            $('.btn-primary').append("<p>"+this['firstButtonSweText']+"</p>");
            $('.btn-primary p').addClass('buttonSampleText');
            $('.card-text p').addClass('cardSampleText');
        })
        $.each(data.secondCardSv, function() {
            $('.secondCard').append("<p>"+this['secondCardText']+"</p");
            $('.card-text p').addClass('cardSampleText');
        }) 
        $.each(data.thirdCardSv, function() {
            $('.thirdCard').append("<p>"+this['thirdCardText']+"</p");
            $('.card-text p').addClass('cardSampleText');
        })
    })
})

$('.britFlag').click(function() {
    $('.cardSampleText').hide();
    $('.buttonSampleText').hide();
    $.getJSON('/js/frontCardsTranslation.json', function(data){
        $.each(data.frontCardEng, function(){
            $('.firstCard').append("<p>"+this['firstCardText']+"</p");
            $('.btn-primary').append("<p>"+this['firstButtonEngText']+"</p>");
        })
        $.each(data.secondCardEng, function() {
            $('.secondCard').append("<p>"+this['secondCardText']+"</p");
        }) 
        $.each(data.thirdCardEng, function() {
            $('.thirdCard').append("<p>"+this['thirdCardText']+"</p");
        })
    })
})

$('.sweFlag').click(function() {
    $('.btn-primary p').addClass('buttonSampleText');
    $('.card-text p').addClass('cardSampleText');
    $('.cardSampleText').hide();
    $('.buttonSampleText').hide();
    $.getJSON('/js/frontCardsTranslation.json', function(data){
        $.each(data.frontCardSv, function(){
            $('.firstCard').append("<p>"+this['firstCardText']+"</p");
            $('.btn-primary').append("<p>"+this['firstButtonSweText']+"</p>");
            $('.btn-primary p').addClass('buttonSampleText');
            $('.card-text p').addClass('cardSampleText');
        })
        $.each(data.secondCardSv, function() {
            $('.secondCard').append("<p>"+this['secondCardText']+"</p");
            $('.card-text p').addClass('cardSampleText');
        }) 
        $.each(data.thirdCardSv, function() {
            $('.thirdCard').append("<p>"+this['thirdCardText']+"</p");
            $('.card-text p').addClass('cardSampleText');
        })
    })
})

*/

$(document).ready(function() {
    $.getJSON('/js/frontCardsTranslation.json', function(data) {
        $.each(data.frontCardEng, function() {
            $('.firstEngCard').append("<p>"+this['firstEngCardText']+"</p>");
            $('.btn-primary').append("<p>"+this['firstButtonEngText']+"</p>");
            $('.firstEngCard p').addClass('cardEngSampleText');
            $('.btn-primary p').addClass('buttonEngSampleText');
            
        })
        $.each(data.secondCardEng, function() {
            $('.secondEngCard').append("<p>"+this['secondEngCardText']+"</p>");
            $('.secondEngCard p').addClass('cardEngSampleText');
        }) 
        $.each(data.thirdCardEng, function() {
            $('.thirdEngCard').append("<p>"+this['thirdEngCardText']+"</p>");
            $('.thirdEngCard p').addClass('cardEngSampleText');
        })
        $.each(data.frontCardSv, function() {
            $('.firstCard').append("<p>"+this['firstSweCardText']+"</p>");
            $('.btn-primary').append("<p>"+this['firstButtonSweText']+"</p>");
            $('.firstCard p').addClass('cardSweSampleText');
            $('.btn-primary p').addClass('buttonSweSampleText');
        })
        $.each(data.secondCardSv, function() {
            $('.secondCard').append("<p>"+this['secondSweCardText']+"</p>");
            $('.secondCard p').addClass('cardSweSampleText');
        }) 
        $.each(data.thirdCardSv, function() {
            $('.thirdCard').append("<p>"+this['thirdSweCardText']+"</p>");
            $('.thirdCard p').addClass('cardSweSampleText');
        })
        $('.cardEngSampleText').hide();
        $('.buttonEngSampleText').hide();
    })
})

$('.britFlag').click(function() {
    $('.cardEngSampleText').show();
        $('.buttonEngSampleText').show();
        $('.cardSweSampleText').hide();
        $('.buttonSweSampleText').hide();
        $('.buttonEngSampleText').show();
        
})

$('.sweFlag').click(function() {
    $.getJSON('/js/frontCardsTranslation.json', function(data) {
        $.each(data.frontCardSv, function() {
            $('.btn-primary').append("<p>"+this['firstButtonSweText']+"</p>");
            $('.btn-primary p').addClass('buttonSweSampleText');
        })
        $('.cardSweSampleText').show();
        $('.cardEngSampleText').hide();
        $('.buttonEngSampleText').hide();
    })
})
