
$.getJSON('/json/frontCarsTranslation.json', translate); //calling json
let jsonData;
let languageIsSv = true;

function translate (frontCards) {
 jsonData = frontCards;
 let lang = languageIsSv ? "sv" : "en";

 //$('.card-body').text(frontCards.cardText[lang]);

 $('.card-body').empty();
     for( let text of frontCards.text[lang]){
         let pTag = '<p>'+text+'</p>';
         $('.card-body').append(pTag);
     }
  }

  $('.flag').click(function(){
      $('.flagDesign flagPlacement flag britFlag').toggle();
      $('.flagDesign flagPlacement flag sweFlag').toggle();
      languageIsSv= !languageIsSv;
      translate(jsonData);
  });





