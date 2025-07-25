localStorage.setItem('last-visited-url', window.location.href)
localStorage.setItem('last-visited-title', document.querySelector(".display-5").innerHTML.trim())

document.addEventListener("DOMContentLoaded", function(event) {

    viewIntro();
    document.querySelector('.topic-next').addEventListener('click', () => {
        viewSummary()
    })

    
    document.querySelectorAll(".nav-intro").forEach( function(item) {
        item.addEventListener('click', () => {
            viewIntro()

        })
    })

    document.querySelectorAll(".nav-summary").forEach( function(item) {
        item.addEventListener('click', () => {
            viewSummary()

        })
    })

    document.querySelectorAll(".nav-advantages").forEach( function(item) {
        item.addEventListener('click', () => {
            viewAdv()

        })
    })

    document.querySelectorAll(".nav-disadvantages").forEach( function(item) {
        item.addEventListener('click', () => {
            viewDisadv()

        })
    })

    document.querySelectorAll(".nav-culture").forEach( function(item) {
        item.addEventListener('click', () => {
            viewCulture()

        })
    })

    document.querySelectorAll(".nav-idioms").forEach( function(item) {
        item.addEventListener('click', () => {
            viewIdiom()

        })
    })

    document.querySelectorAll(".nav-opinions").forEach( function(item) {
        item.addEventListener('click', () => {
            viewOpinion()

        })
    })

})


function viewNone() {
    document.querySelector(".topic-intro").style.display = 'none';
    document.querySelector(".topic-summary").style.display = 'none';
    document.querySelector(".topic-advantages").style.display = 'none';
    document.querySelector(".topic-disadvantages").style.display = 'none';
    document.querySelector(".topic-langculture").style.display = 'none';
    document.querySelector(".topic-idioms").style.display = 'none';
    document.querySelector(".topic-opinions").style.display = 'none';

    document.querySelector('.nav-link.nav-intro').classList.remove("active")
    document.querySelector('.nav-link.nav-summary').classList.remove("active")
    document.querySelector('.nav-link.nav-advantages').classList.remove("active")
    document.querySelector('.nav-link.nav-disadvantages').classList.remove("active")
    document.querySelector('.nav-link.nav-culture').classList.remove("active")
    document.querySelector('.nav-link.nav-idioms').classList.remove("active")
    document.querySelector('.nav-link.nav-opinions').classList.remove("active")

    document.querySelector('.topic-previous').replaceWith(document.querySelector('.topic-previous').cloneNode(true));
    document.querySelector('.topic-next').replaceWith(document.querySelector('.topic-next').cloneNode(true));
}


function viewIntro() {
    viewNone();
    document.querySelector(".topic-intro").style.display = 'block';
    document.querySelector('.nav-link.nav-intro').classList.add("active");

    document.querySelector('.topic-next').style.display='block';
    document.querySelector('.topic-previous').style.display='none';

    document.querySelector('.topic-next-text').innerHTML = 'Summary';
    document.querySelector('.topic-previous-text').innerHTML = '';

    document.querySelector('.topic-next').addEventListener('click', () => {
        viewSummary()
    })
}


function viewSummary() {
    viewNone();
    document.querySelector(".topic-summary").style.display = 'block';
    document.querySelector('.nav-link.nav-summary').classList.add("active");

    document.querySelector('.topic-previous').style.display='block';
    document.querySelector('.topic-next').style.display='block';

    document.querySelector('.topic-previous-text').innerHTML = 'Intro';
    document.querySelector('.topic-next-text').innerHTML = 'Advantages';

    document.querySelector('.topic-previous').addEventListener('click', () => {
        viewIntro()
    })
    document.querySelector('.topic-next').addEventListener('click', () => {
        viewAdv()
    })
}


function viewAdv() {
    viewNone();
    document.querySelector(".topic-advantages").style.display = 'block';
    document.querySelector('.nav-link.nav-advantages').classList.add("active");

    document.querySelector('.topic-previous').style.display='block';
    document.querySelector('.topic-next').style.display='block';

    document.querySelector('.topic-previous-text').innerHTML = 'Summary';
    document.querySelector('.topic-next-text').innerHTML = 'Disadvantages';
    
    document.querySelector('.topic-previous').addEventListener('click', () => {
        viewSummary()
    })
    document.querySelector('.topic-next').addEventListener('click', () => {
        viewDisadv()
    })
}


function viewDisadv() {
    viewNone();
    document.querySelector(".topic-disadvantages").style.display = 'block';
    document.querySelector('.nav-link.nav-disadvantages').classList.add("active");

    document.querySelector('.topic-previous').style.display='block';
    document.querySelector('.topic-next').style.display='block';

    document.querySelector('.topic-previous-text').innerHTML = 'Advantages';
    document.querySelector('.topic-next-text').innerHTML = 'Langauge Culture';

    document.querySelector('.topic-previous').addEventListener("click", () => {
        viewAdv()
    })
    document.querySelector('.topic-next').addEventListener("click", () => {
        viewCulture()
    })
}


function viewCulture() {
    viewNone();
    document.querySelector(".topic-langculture").style.display = 'block';
    document.querySelector('.nav-link.nav-culture').classList.add("active");

    document.querySelector('.topic-previous').style.display='block';
    document.querySelector('.topic-next').style.display='block';

    document.querySelector('.topic-previous-text').innerHTML = 'Disadvantages';
    document.querySelector('.topic-next-text').innerHTML = 'Idioms';

    document.querySelector('.topic-previous').addEventListener("click", () => {
        viewDisadv()
    })
    document.querySelector('.topic-next').addEventListener("click", () => {
        viewIdiom()
    })
}


function viewIdiom() {
    viewNone();
    document.querySelector(".topic-idioms").style.display = 'block';
    document.querySelector('.nav-link.nav-idioms').classList.add("active");

    document.querySelector('.topic-previous').style.display='block';
    document.querySelector('.topic-next').style.display='block';

    document.querySelector('.topic-previous-text').innerHTML = 'Language Culture';
    document.querySelector('.topic-next-text').innerHTML = 'Example Opinions';

    document.querySelector('.topic-previous').addEventListener("click", () => {
        viewCulture()
    })
    document.querySelector('.topic-next').addEventListener("click", () => {
        viewOpinion()
    })
}


function viewOpinion() {
    viewNone();
    document.querySelector(".topic-opinions").style.display = 'block';
    document.querySelector('.nav-link.nav-opinions').classList.add("active");

    document.querySelector('.topic-previous').style.display='block';
    document.querySelector('.topic-next').style.display='none';

    document.querySelector('.topic-previous-text').innerHTML = 'Idioms';
    document.querySelector('.topic-next-text').innerHTML = '';

    document.querySelector('.topic-previous').addEventListener("click", () => {
        viewIdiom()
    })
}