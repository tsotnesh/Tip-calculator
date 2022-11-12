'use strict'

const btnFive = document.querySelector("#btn5");
const btnTen = document.querySelector("#btn10");
const btnFifteen = document.querySelector("#btn15");
const btnQuarter = document.querySelector("#btn25");
const btnHalf= document.querySelector("#btn50");
const customField = document.querySelector("#btncustom");
const personField = document.querySelector("#personumbers");
const billField = document.querySelector("#bill");
const alert = document.getElementById("alert");
const reset = document.querySelector(".btn-reset");
//es mchirdeba imistvis rom velshi sheyvanisas dadgindes romel klavishzea dacherili.
let observer = 0;


// amowmebs gadasaxadi mtelia tu ara, imistvis rom tu mtelia ricxvi ori nuli xelovnurad stringit davumato.
function isWhole(n) {
    const result = n - Math.floor(n);
    if (result !==0) {
        return false;
    } else {
        return true;
    }
}

// es mchirdeba rom yovel dacheraze feri sheicvalos klavishebma.
function activeoff() {
    btnFive.classList.remove("active");
    btnTen.classList.remove("active");
    btnFifteen.classList.remove("active");
    btnQuarter.classList.remove("active");
    btnHalf.classList.remove("active");
}


// klikis mere itvlis monacemebs.
const calculateAfterClick = function(percent) {
    const bill = billField.value;
    const fullTip = (bill*percent)/100; 
    const numberOfPersons = personField.value;
    
    if(numberOfPersons!=='0') {
    alert.classList.add("hidden");
    
    const a = Math.ceil((fullTip/numberOfPersons)*100)/100;
    
    if(isWhole(a)) {
    document.querySelector("#tip-person").textContent = "$" + a + ".00";
    } else {
        document.querySelector("#tip-person").textContent = "$" + a;
    }

    const fullMoney = Number(fullTip) + Number(bill);
    const b = Math.ceil((fullMoney/numberOfPersons)*100)/100;
    
    if(isWhole(b)) {
    document.querySelector("#total-person").textContent = "$" + b + ".00";
    } else {
        document.querySelector("#total-person").textContent = "$" + b
    }

    } else {
        alert.classList.remove("hidden");
    }
}
// es funkcia buttonebze dacherisas saertoa amitom, amas viyeneb ra unda xdebodes konkretul
//procentian danamatebze.
const heartFunction = function(a,worker) {
    activeoff();
    observer=a;
    worker.classList.add("active");
    if((document.querySelector("#bill").value !== "") && (document.querySelector("#personumbers").value !== "")) {
        calculateAfterClick(observer);
    } 
}

// es personfield da textfield inputebis listenebs undat rom mati shevsebisas avtomaturad moxdes 
//daangarisheba.
const heartField = function() {
    if((personField.value !== "")&&(billField.value !== "")) {
        if (observer !==0 ) {       
        calculateAfterClick(observer);
        } else {
            calculateAfterClick(customField.value);
        }
    } else {
        document.querySelector("#tip-person").textContent = "$0.00";
        document.querySelector("#total-person").textContent="$0.00";
    }
}

// es aris ra xdeba klavishebze dacheris shemdeg, tu velebi zevit kvevit shevsebulia mimdinareobs tvla.
//anu zeda funkciebs rac gvaqvs gamoviyenebt savaraudod qvemot.
btnFive.addEventListener('click', function() {
    heartFunction(5,btnFive);
})

btnTen.addEventListener('click', function() {
    heartFunction(10,btnTen);
});

btnFifteen.addEventListener('click', function() {
    heartFunction(15,btnFifteen);
});

btnQuarter.addEventListener('click', function() {
    heartFunction(25,btnQuarter);
});

btnHalf.addEventListener('click', function() {
    heartFunction(50,btnHalf);
});

//customfield rom sheivseba eseti rame unda dajdes aseve.
customField.addEventListener('input', function() {
    observer=0;
    activeoff();
    if(customField.value !== "" && (billField.value !== "") && (personField.value !== "")) {
        calculateAfterClick(customField.value);
    } else {
        calculateAfterClick(0);
    }
})

//axla vecadot davwerot ra xdeba klavishebis garda tu calke velebia shevsebuli. qvemot aris personfield.
personField.addEventListener('input', function(){
    heartField();
})

//aq billfieldis shevsebis ambebia ra da rogor unda moxdes.
billField.addEventListener('input', function() {
    heartField();
})

// reset buttoni anulebs yvelafers da magis listeneria es, wesit iolad da chveulebrivad dawerili.
reset.addEventListener('click', function() {
    activeoff();
    observer=0;
    document.querySelector("#tip-person").textContent = "$0.00";
    document.querySelector("#total-person").textContent="$0.00";
    billField.value = "";
    personField.value = "";
    customField.value = " Custom";
})


