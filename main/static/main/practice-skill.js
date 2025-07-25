localStorage.setItem('last-visited-url', window.location.href)
localStorage.setItem('last-visited-title', document.querySelector(".display-5").innerHTML.trim())

document.addEventListener("DOMContentLoaded", function(event) {

    viewIntro();
    
    
    document.querySelectorAll(".nav-intro").forEach( function(item) {
        item.addEventListener('click', () => {
            viewIntro()

        })
    })

    if (skill === 'reading') {
        document.querySelectorAll(".nav-connectors").forEach( function(item) {
            item.addEventListener('click', () => {
                viewConnectors()
    
            })
        })
    
        document.querySelectorAll(".nav-MPQ").forEach( function(item) {
            item.addEventListener('click', () => {
                viewMPQ()
    
            })
        })
        
        document.querySelectorAll(".nav-simword").forEach( function(item) {
            item.addEventListener('click', () => {
                viewSimWord()
    
            })
        })
    
        document.querySelectorAll(".nav-truefalse").forEach( function(item) {
            item.addEventListener('click', () => {
                viewTrueFalse()
    
            })
        })
    }

    if (skill === 'reading' || skill === 'listening') {
        document.querySelectorAll(".nav-MCQ").forEach( function(item) {
            item.addEventListener('click', () => {
                viewMCQ()
    
            })
        })
    
        document.querySelectorAll(".nav-short").forEach( function(item) {
            item.addEventListener('click', () => {
                viewShort()
    
            })
        })
    }


    if (skill === 'writing' || skill === 'speaking') {
        document.querySelectorAll(".nav-structureQ").forEach( function(item) {
            item.addEventListener('click', () => {
                viewStructureQ()
    
            })
        })
    }


    if (skill === 'speaking') {
        document.querySelectorAll(".nav-innot").forEach( function(item) {
            item.addEventListener('click', () => {
                viewInnot()
    
            })
        })

        document.querySelectorAll(".nav-pronoun").forEach( function(item) {
            item.addEventListener('click', () => {
                viewPronoun()
    
            })
        })
    }


    if (skill === 'writing') {
        document.querySelectorAll(".nav-gramtenQ").forEach( function(item) {
            item.addEventListener('click', () => {
                viewGramTenQ()
    
            })
        })
    }


    if (skill === 'listening') {
        document.querySelectorAll(".nav-who").forEach( function(item) {
            item.addEventListener('click', () => {
                viewWho()
    
            })
        })
    }

   document.addEventListener('click', function(event) {
        const clickedElement = event.target
        if (clickedElement.classList.contains("choose-btn")) {
            const questionid = clickedElement.dataset.questionid
            const choicenum = clickedElement.dataset.choicenum
    
        fetch(`/practice-questions/${questionid}`, {
            method: "GET"
        })
        .then(response => response.json())
        .then(result => {
            if (result['status'] == 'false'){
            } else {
            }
        })
        .catch(error => {
            console.log(error)
        });

    }



   })

})

const skill = document.querySelector("#practice-skill-nav").dataset.skill


function viewNone() {
    document.querySelector(".practice-intro").style.display = 'none';
    document.querySelector('.nav-link.nav-intro').classList.remove("active")
    if (skill === 'reading') {
        document.querySelector(".practice-connectors").style.display = 'none';
        document.querySelector(".practice-MPQ").style.display = 'none';
        document.querySelector(".practice-simword").style.display = 'none';
        document.querySelector(".practice-truefalse").style.display = 'none';
        document.querySelector('.nav-link.nav-connectors').classList.remove("active")
        document.querySelector('.nav-link.nav-MPQ').classList.remove("active")
        document.querySelector('.nav-link.nav-simword').classList.remove("active")
        document.querySelector('.nav-link.nav-truefalse').classList.remove("active")
    } 
    if (skill === 'reading' || skill === 'listening') {
        document.querySelector(".practice-MCQ").style.display = 'none';
        document.querySelector(".practice-short").style.display = 'none';
        document.querySelector('.nav-link.nav-MCQ').classList.remove("active")
        document.querySelector('.nav-link.nav-short').classList.remove("active")
    }
    if (skill === 'writing' || skill === 'speaking') {
        document.querySelector(".practice-structureQ").style.display = 'none';
        document.querySelector('.nav-link.nav-structureQ').classList.remove("active")
    }
    if (skill === 'writing') {
        document.querySelector(".practice-gramtenQ").style.display = 'none';
        document.querySelector('.nav-link.nav-gramtenQ').classList.remove("active")
    }
    if (skill === 'speaking') {
        document.querySelector(".practice-innot").style.display = 'none';
        document.querySelector(".practice-pronoun").style.display = 'none';
        document.querySelector('.nav-link.nav-innot').classList.remove("active")
        document.querySelector('.nav-link.nav-pronoun').classList.remove("active")
    }
    if (skill === 'listening') {
        document.querySelector(".practice-who").style.display = 'none';
        document.querySelector('.nav-link.nav-who').classList.remove("active")
    }

    document.querySelector('.practice-previous').replaceWith(document.querySelector('.practice-previous').cloneNode(true));
    document.querySelector('.practice-next').replaceWith(document.querySelector('.practice-next').cloneNode(true));
}


function viewIntro() {
    viewNone();
    document.querySelector(".practice-intro").style.display = 'block';
    document.querySelector('.nav-link.nav-intro').classList.add("active");

    document.querySelector('.practice-next').style.display='block';
    document.querySelector('.practice-previous').style.display='none';

    if (skill === 'reading' || skill === "listening") {
        document.querySelector('.practice-next-text').innerHTML = 'Multiple Choice Questions';
        document.querySelector('.practice-next').addEventListener('click', () => {
            viewMCQ()
        })
    } else if (skill === 'speaking' || skill === 'writing') {
        document.querySelector('.practice-next-text').innerHTML = `Questions on Structure of ${skill}`;
        document.querySelector('.practice-next').addEventListener('click', () => {
            viewStructureQ()
        })
    }
    document.querySelector('.practice-previous-text').innerHTML = '';

}


function viewStructureQ() {
    viewNone();
    document.querySelector(".practice-structureQ").style.display = 'block';
    document.querySelector('.nav-link.nav-structureQ').classList.add("active");

    document.querySelector('.practice-previous').style.display='block';
    document.querySelector('.practice-next').style.display='block';

    document.querySelector('.practice-previous-text').innerHTML = 'Intro';
    if (skill === "writing") {
        document.querySelector('.practice-next-text').innerHTML = 'Grammer and Tense Practice';
        document.querySelector('.practice-next').addEventListener('click', () => {
            viewGramTenQ()
        })
    } else if (skill === "speaking") {
        document.querySelector('.practice-next-text').innerHTML = 'Innotation Practice';
        document.querySelector('.practice-next').addEventListener('click', () => {
            viewInnot()
        })
    }

    document.querySelector('.practice-previous').addEventListener('click', () => {
        viewIntro()
    })

}


function viewInnot() {
    viewNone();
    document.querySelector(".practice-innot").style.display = 'block';
    document.querySelector('.nav-link.nav-innot').classList.add("active");

    document.querySelector('.practice-previous').style.display='block';
    document.querySelector('.practice-next').style.display='block';

    document.querySelector('.practice-previous-text').innerHTML = `Questions on Structure of ${skill}`;
    document.querySelector('.practice-next-text').innerHTML = 'Pronounciation Questions';
    
    document.querySelector('.practice-previous').addEventListener('click', () => {
        viewStructureQ()
    })
    document.querySelector('.practice-next').addEventListener('click', () => {
        viewPronoun()
    })
}


function viewPronoun() {
    viewNone();
    document.querySelector(".practice-pronoun").style.display = 'block';
    document.querySelector('.nav-link.nav-pronoun').classList.add("active");

    document.querySelector('.practice-previous').style.display='block';
    document.querySelector('.practice-next').style.display='none';

    document.querySelector('.practice-previous-text').innerHTML = 'Innotation Practice';
    document.querySelector('.practice-next-text').innerHTML = '';

    document.querySelector('.practice-previous').addEventListener("click", () => {
        viewInnot()
    })
}


function viewGramTenQ() {
    viewNone();
    document.querySelector(".practice-gramtenQ").style.display = 'block';
    document.querySelector('.nav-link.nav-gramtenQ').classList.add("active");

    document.querySelector('.practice-previous').style.display='block';
    document.querySelector('.practice-next').style.display='none';

    document.querySelector('.practice-previous-text').innerHTML = `Questions on Structure of ${skill}`;
    document.querySelector('.practice-next-text').innerHTML = '';

    document.querySelector('.practice-previous').addEventListener("click", () => {
        viewStructureQ()
    })

}


function viewMCQ() {
    viewNone();
    document.querySelector(".practice-MCQ").style.display = 'block';
    document.querySelector('.nav-link.nav-MCQ').classList.add("active");

    document.querySelector('.practice-previous').style.display='block';
    document.querySelector('.practice-next').style.display='block';

    document.querySelector('.practice-previous-text').innerHTML = 'Intro';
    document.querySelector('.practice-next-text').innerHTML = 'Short-Answer Question';

    document.querySelector('.practice-previous').addEventListener("click", () => {
        viewIntro()
    })
    document.querySelector('.practice-next').addEventListener("click", () => {
        viewShort()
    })
}


function viewShort() {
    viewNone();
    document.querySelector(".practice-short").style.display = 'block';
    document.querySelector('.nav-link.nav-short').classList.add("active");

    document.querySelector('.practice-previous').style.display='block';
    document.querySelector('.practice-next').style.display='block';

    document.querySelector('.practice-previous-text').innerHTML = 'Multiple Choice Questions';
    if (skill === "listening") {
        document.querySelector('.practice-next-text').innerHTML = "'Who said What' Questions";
        document.querySelector('.practice-next').addEventListener("click", () => {
            viewWho()
        })
    } else if (skill === "reading") {
        document.querySelector('.practice-next-text').innerHTML = "Connector Questions";
        document.querySelector('.practice-next').addEventListener("click", () => {
            viewConnectors()
        })
    }

    document.querySelector('.practice-previous').addEventListener("click", () => {
        viewMCQ()
    })
}


function viewConnectors() {
    viewNone();
    document.querySelector(".practice-connectors").style.display = 'block';
    document.querySelector('.nav-link.nav-connectors').classList.add("active");

    document.querySelector('.practice-previous').style.display='block';
    document.querySelector('.practice-next').style.display='block';

    document.querySelector('.practice-previous-text').innerHTML = 'Short-Answer Questions';
    document.querySelector('.practice-next-text').innerHTML = 'Main Point Questions';

    document.querySelector('.practice-previous').addEventListener("click", () => {
        viewShort()
    })
    document.querySelector('.practice-next').addEventListener("click", () => {
        viewMPQ()
    })
}


function viewMPQ() {
    viewNone();
    document.querySelector(".practice-MPQ").style.display = 'block';
    document.querySelector('.nav-link.nav-MPQ').classList.add("active");

    document.querySelector('.practice-previous').style.display='block';
    document.querySelector('.practice-next').style.display='block';

    document.querySelector('.practice-previous-text').innerHTML = 'Connector Questions';
    document.querySelector('.practice-next-text').innerHTML = 'Similar Word or Phrase Questions';

    document.querySelector('.practice-previous').addEventListener("click", () => {
        viewConnectors()
    })
    document.querySelector('.practice-next').addEventListener("click", () => {
        viewSimWord()
    })
}


function viewSimWord() {
    viewNone();
    document.querySelector(".practice-simword").style.display = 'block';
    document.querySelector('.nav-link.nav-simword').classList.add("active");

    document.querySelector('.practice-previous').style.display='block';
    document.querySelector('.practice-next').style.display='block';

    document.querySelector('.practice-previous-text').innerHTML = 'Main Point Questions';
    document.querySelector('.practice-next-text').innerHTML = 'True or False Questions';

    document.querySelector('.practice-previous').addEventListener("click", () => {
        viewMPQ()
    })
    document.querySelector('.practice-next').addEventListener("click", () => {
        viewTrueFalse()
    })
}


function viewTrueFalse() {
    viewNone();
    document.querySelector(".practice-truefalse").style.display = 'block';
    document.querySelector('.nav-link.nav-truefalse').classList.add("active");

    document.querySelector('.practice-previous').style.display='block';
    document.querySelector('.practice-next').style.display='none';

    document.querySelector('.practice-previous-text').innerHTML = 'Similar Word or Phrase Questions';
    document.querySelector('.practice-next-text').innerHTML = '';

    document.querySelector('.practice-previous').addEventListener("click", () => {
        viewSimWord()
    })
}


function viewWho() {
    viewNone();
    document.querySelector(".practice-who").style.display = 'block';
    document.querySelector('.nav-link.nav-who').classList.add("active");

    document.querySelector('.practice-previous').style.display='block';
    document.querySelector('.practice-next').style.display='none';

    document.querySelector('.practice-previous-text').innerHTML = 'Short-Answer Questions';
    document.querySelector('.practice-next-text').innerHTML = '';

    document.querySelector('.practice-previous').addEventListener("click", () => {
        viewShort()
    })
}