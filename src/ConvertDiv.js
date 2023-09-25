import {useEffect} from "react";

function sendAmount(){
    const formData = new FormData();
    formData.append("from", document.querySelector("#from").value);
    formData.append("to", document.querySelector("#to").value);
    formData.append("amount", document.getElementById("amount").value);

    const requestOptions = {
        method: 'POST',
        body: formData
    };

    fetch("http://localhost:8080/convert", requestOptions)
        .then(r => {r.json().then(r => {
            document.getElementById("converted").value = r})})

    /*fetch("http://api.exchangeratesapi.io/v1/convert?access_key=eddebd0aea69f5339121630cafa978ac&from="
    + document.querySelector("#from").value +"&to=" + document.querySelector("#to").value + "&amount=" +
        document.getElementById("amount").value, {method: 'POST'}).then(r => {r.json().then(r => {
        document.getElementById("converted").value = r
    })})*/
}

function Check(){
    let checked = false;
    try {
        checked = document.getElementById("toggle").checked;
    } catch (e) {

    }
    console.log(checked)
    return checked;

}
(function loadSymbols(){


    if(Check()){
    fetch("http://api.exchangeratesapi.io/v1/symbols?access_key=eddebd0aea69f5339121630cafa978ac", {method: 'GET'}).then(r =>
       r.json().then(r => {
           let values = Object.keys(r['symbols']);
           let fromSelect = document.getElementById("from");
           let toSelect = document.getElementById("to");
           let dfFrom = document.createDocumentFragment();
           for(let i = 0; i < values.length; i++){
               let option = document.createElement('option')
               option.value = values[i];
               option.appendChild(document.createTextNode(values[i]));
               dfFrom.appendChild(option);
           }
           fromSelect.appendChild(dfFrom);
           let dfTo = document.createDocumentFragment();
           for(let i = 0; i < values.length; i++){
               let option = document.createElement('option')
               option.value = values[i];
               option.appendChild(document.createTextNode(values[i]));
               dfTo.appendChild(option);
           }
           toSelect.appendChild(dfTo);
       }));
    }
    else {
        fetch('http://localhost:8080/currencies', {method: 'GET'}).then(r => r.json().then(
            r => {
                let fromSelect = document.getElementById("from");
                let toSelect = document.getElementById("to");
                let dfFrom = document.createDocumentFragment();
                for (let i = 0; i < r.length; i++) {
                    let option = document.createElement('option')
                    option.value = r[i];
                    option.appendChild(document.createTextNode(r[i]));
                    dfFrom.appendChild(option);
                }
                fromSelect.appendChild(dfFrom);
                let dfTo = document.createDocumentFragment();
                for (let i = 0; i < r.length; i++) {
                    let option = document.createElement('option')
                    option.value = r[i];
                    option.appendChild(document.createTextNode(r[i]));
                    dfTo.appendChild(option);
                }
                toSelect.appendChild(dfTo);
            }
        ));
    }

}())

function ConvertDiv(){
    return(
        <div style={{alignItems: "center", justifyContent: "center"}}>
            <div style={{display: "flex", margin: "auto", paddingTop: "20%", paddingLeft: "30%"}}>
                <input id={"amount"} placeholder={"Enter from Amount"} style={{borderRadius: "10px", fontSize: "x-large"}}/>
                <div> <b>>>>>>></b> </div>
                <input id={"converted"} disabled={true} style={{borderRadius: "10px", fontSize: "x-large"}}/>
            </div>
            <div style={{display: "flex", margin: "auto", paddingTop: "3%", paddingLeft: "44%"}}>
                <select id={"from"} style={{fontSize: "large"}} ></select>
                <button onClick={sendAmount} style={{borderRadius: "10px", padding: "3px"}}>Convert</button>
                <select id={"to"} style={{fontSize: "large"}}></select>
                <span>Use API?</span>
                <input id={"toggle"} type={"checkbox"} onChange={() => Check()}/>
            </div>
        </div>
        );
}

export default ConvertDiv;