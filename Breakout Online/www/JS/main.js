//used to position the text when printing
let index = 1;
//used to set the language between swedish and english
let langSwe = true;

function start(translations) {

    let inSwe = 1;
    let inEng = 1;
    let ulSwe = $('<ul/>');
  let ulEng = $('<ul/>');
    console.log('Now we have JSON');
    // please note when
    // writing tags with jQuery
    // we create new HTML elements
    // (here we create an ul-element
    // as a jQuery objekt)

    //prints swedish translation
        for (let transl of translations.sv) {
            let pSwe = $('<p/>');
            // append - add something
            // last inside me
            pSwe.append(transl.text);
            $('.testSwe' + inSwe).append(pSwe);
            inSwe++;
        }

    //prints english translation
    for (let transl of translations.en) {
        let pEng = $('<p/>');
        // append - add something
        // last inside me
        pEng.append(transl.text);
        $('.testEng' + inEng).append(pEng);
        inEng++;
    }
    // jQuery grab the body element
    // and append the ul inside it
    // add a click event to show/hide
    // chore descriptions
}

//click functionality for changing language
//on click changes the flag shown and sets the language to what it isn't right now
let langSwitch = false;

$('.flag').click(function () {
  if (!langSwitch) {
    $('.testSwe1').hide();
    $('.testEng1').show();
    $('.testSwe2').hide();
    $('.testEng2').show();
    $('.testSwe3').hide();
    $('.testEng3').show();
    $('.britFlag').hide();
    $('.sweFlag').show();
  }
  else if (langSwitch) {
    $('.testEng1').hide();
    $('.testSwe1').show();
    $('.testEng2').hide();
    $('.testSwe2').show();
    $('.testEng3').hide();
    $('.testSwe3').show();
    $('.sweFlag').hide();
    $('.britFlag').show();
  }
  langSwitch = !langSwitch;
});

// Ask jQuery to load some json data
// from a url-path and then run the function start
$.getJSON('/json/translations.json', start);
// This will be displayed first
// because the JSON isn't loaded instantly
console.log('No JSON yet');
  // When the JSON has loaded we will see
  // the console.log inisde the function start

//Changes the language from swedish to english when the british flag is pressed
$(document).ready(function() {
    let navJSON;

    const createNavLink = function(href, text) {
        const a = document.createElement('a');

        a.setAttribute('href', href);
        a.setAttribute('class', 'NavSweLang');
        a.innerHTML = text;

        return a;
    }

    const createNavLinkWrapper = function() {
        const navWrapper = document.createElement('div');
        navWrapper.setAttribute('class', 'navbar-nav');

        return navWrapper;
    }

    const createNav = function(jsonData, lang) {
        const links = jsonData['nav'+lang].map((navVal) => {
            return createNavLink(navVal.href, navVal.nav);
        });

        links.splice(2, 0, createLogo());

        const linkWrapper = createNavLinkWrapper();
        
        links.forEach(element => {
            linkWrapper.append(element);
        });

        return linkWrapper;
    };

    const createLogo = function() {
        const a = document.createElement('a');
        const img = document.createElement('img');

        a.setAttribute('href', '/');
        a.setAttribute('class', 'logo');
        img.setAttribute('src', '/images/logobild.jpg');

        a.appendChild(img);

        return a;
    }

    const insertHeaderToDom = function(lang) {
        const links = createNav(navJSON, lang);
        document.getElementById('navbarNavAltMarkup').append(links);
    }

    const initHeader = function() {
        $.getJSON('/json/navbartranslation.json', function(data) {
            navJSON = data;
            insertHeaderToDom('sv');
        })
    }

    const changeLanguage = function(lang) {
        $('.navbar-nav').remove();
        insertHeaderToDom(lang);
    }

    $('.britFlag').click(function(){
        changeLanguage('en');
    });

    $('.sweFlag').click(function(){
        changeLanguage('sv');
    })

    initHeader();
});


/*
//hides the swedish headliner and shows the english headliner
//on the start page when the british flag is clicked
$('.britFlag').click(function() {
    $('.textClassSwe').hide()
    $('.textClassEng').show()
})

//hides the english headliner and shows the swedish headliner
//on the start page when the swedish flag is clicked
$('.sweFlag').click(function () {
    $('.textClassEng').hide()
    $('.textClassSwe').show()
    $('.textClassEng').hide()
    
})
*/