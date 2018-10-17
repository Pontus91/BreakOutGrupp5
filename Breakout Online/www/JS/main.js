//used to position the text when printing
let index = 1;
//used to set the language between swedish and english
let langSwe = true;

function start(translations) {
    console.log('Now we have JSON');
    // please note when
    // writing tags with jQuery
    // we create new HTML elements
    // (here we create an ul-element
    // as a jQuery objekt)

    //prints swedish translation
    if (langSwe) {
        for (let transl of translations.sv) {
            // append - add something
            // last inside me
            $('.test' + index).append(transl.text);
            index++;
        }
    }

    //prints english translation
    if (!langSwe) {
        for (let transl of translations.en) {
            // append - add something
            // last inside me
            $('.test' + index).append(transl.text);
            index++;
        }
    }
    // jQuery grab the body element
    // and append the ul inside it
    // add a click event to show/hide
    // chore descriptions
}

//click functionality for changing language
//on click changes the flag shown and sets the language to what it isn't right now
$('.flag').click(function () {
    if (langSwe) {
      $('.britFlag').hide();
      $('.sweFlag').show();
    }
    else if (!langSwe) {
      $('.sweFlag').hide();
      $('.britFlag').show();
    }
    langSwe = !langSwe;
  });

// Ask jQuery to load some json data
// from a url-path and then run the function start
$.getJSON('/js/translations.json', start);
// This will be displayed first
// because the JSON isn't loaded instantly
console.log('No JSON yet');
  // When the JSON has loaded we will see
  // the console.log inisde the function start