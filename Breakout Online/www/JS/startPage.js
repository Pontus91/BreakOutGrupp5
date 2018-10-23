$.getJSON('/json/startPage.json', sweTranslation);

function sweTranslation(translation){
  let titles = translation.title;
  for(let title of titles.sv){
    $('.lead').empty().append(title.text);
  }
  let cards = translation.cards;
  for(let card of cards.sv){
    $('.card-text' + '.' + card.name).empty().append(card.text);
    let buttons = translation.buttons;
    for(let button of buttons.sv){
      $('.card-body .btn').empty().append(button.text);
    }
  }
}

function engTranslation(translation){
  let titles = translation.title;
  for(let title of titles.en){
    $('.title .lead').empty().append(title.text);
  }
  let cards = translation.cards;
  for(let card of cards.en){
    $('.card-text' + '.' + card.name).empty().append(card.text);
    let buttons = translation.buttons;
    for(let button of buttons.en){
      $('.card-body .btn').empty().append(button.text);
    }
  }
}

$('.sweFlag').click(function() {
  $.getJSON('/json/startPage.json', sweTranslation);
})

$('.britFlag').click(function() {
  $.getJSON('/json/startPage.json', engTranslation);
})