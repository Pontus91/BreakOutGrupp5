
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





/*$("#En").click(function () {

  $(".menu-containerEn").show();
  $(".menu-containerSv").hide();
});



$("#Sv").click(function () {
  $(".menu-containerSv").show();
  $(".menu-containerEn").hide();

});

$('.menu-containerEn').hide();






  for (let day in menuData) {
    let dayData = menuData[day];
    let daySw = svTranslations[day];
    ul.append('<h5>' + daySw + '</h5>');


    for (let meal of dayData.sv) {

      let li = $('<li/>');
      li.append('<h6>' + meal.name + '</h6>');
      li.append('<p class = "meal-desc">' + meal.desc + '</p>');
      ul.append(li);
      $('.menu-containerSv').append(ul);

    };

  };



  ul = $('<ul.menu-containerEn/>');
  for (let day in menuData) {
    let dayData = menuData[day];
    ul.append('<h5>' + day + '</h5>');

    for (let meal of dayData.en) {

      li = $('<li/>');
      li.append('<h6>' + meal.name + '</h6>');
      li.append('<p class = "meal-desc">' + meal.desc + '</p>');
      ul.append(li);
      $('.menu-containerEn').append(ul);
    };



  };

}*/