$.getJSON('/json/highscore.json', function (data) {
  HighscoreTranslation(data, 'sv');
});

function HighscoreTranslation(translation, language) {
  let lang = language;
  let titles = translation.title;
  for (let title of titles[lang]) {
    $('.highscore-title').empty().append(title.text);
  }

  let thead = $('thead').empty();
  let tbody = $('tbody').empty();
  let tr = $('<tr/>');

  let rankTitles = translation.ranktitle;
  for (let rankTitle of rankTitles[lang]) {
    tr.append('<th scope="col">' + rankTitle.text + '</th>');
  }

  let scoreTitles = translation.scoretitle;
  for (let scoreTitle of scoreTitles[lang]) {
    tr.append('<th scope="col">' + scoreTitle.text + '</th>');
  }

  let nameTitles = translation.nametitle;
  for (let nameTitle of nameTitles[lang]) {
    tr.append('<th scope="col">' + nameTitle.text + '</th>');
  }

  thead.append(tr);

  let ranks = translation.rank;
  let i = 0;
  for (let rank of ranks[lang]) {
    let tr = $('<tr/>').addClass(`${i}`);
    tr.append('<th scope="row">' + rank.text + '</th>');
    let highscores = translation.highscore;
    tr.append('<td class="score"/>');
    tr.append('<td class="name"/>');
    tbody.append(tr);
    i++;
  }
  $.getJSON('/json/highscoreonly.json', function (data) {
    let highscorelist = data;
    let i = 0;
    for (let highscore of highscorelist) {
      $(`tr.${i} td.score`).empty().append(highscore.score);
      $(`tr.${i} td.name`).empty().append(highscore.name);

      i++;
    }
  });

}

$('.sweFlag').click(function () {
  $.getJSON('/json/highscore.json', function (data) {
    HighscoreTranslation(data, 'sv');
  });
})

$('.britFlag').click(function () {
  $.getJSON('/json/highscore.json', function (data) {
    HighscoreTranslation(data, 'en');
  });
})