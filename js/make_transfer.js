var $ = (query) => {
	return document.querySelector(query);
}
var $$ = (query) => {
	return document.querySelectorAll(query);
}
$(".back-btn").addEventListener(
	"click",
	(e) => {
		window.history.back();
	}
);
class MakeTransfer{
	constructor(){
		this.showLoader();
		this.readBanks();
		this.readForexRatesAndCCN();
		this.onRecipientCurrencySelect();
		this.onAmountFieldClicked();
		this.accountNumberField();
		this.amountDecimalField();
		this.showEquivalentAmountInSendersCurrency();
		this.proceed();
	}
	roundToNthDecimalPlace(value, decimalPlace){
		return Math.round(value * Math.pow(10, decimalPlace)) / Math.pow(10, decimalPlace);
	}
	amountDecimalField(){
		$("#amount_decimal").addEventListener(
			"keypress",
			(e) => {
				if(e.srcElement.value.length > 1){
					e.preventDefault();
				}
				else if(e.srcElement.value.length == 0 && e.keyCode == "backspace"){
					$("#amount").focus();
				}	
			}
		);
		$("#amount_decimal").addEventListener(
			"keyup",
			(e) => {
				if(e.key == "Backspace" && e.srcElement.value.length == 0){
					$("#amount").focus();
				}
			}
		);
		$("#amount_decimal").addEventListener(
			"keydown",
			(e) => {
				if(!Number(e.key) && e.key != "Backspace"){
					e.preventDefault();
				}
			}
		);
	}
	showLoader(){
		let a = document.createElement("div");
		a.className = "po-abs vh100 flex-1 vw100 flex-v j-c-c a-i-c top-0 left-0 loading";
		$(".a").appendChild(a);

			let b = document.createElement("img");
			b.src = "../img/loading.gif";
			b.width = "40";
			a.appendChild(b);
	}
	onRecipientCurrencySelect(){
		$("#recipients_currency").addEventListener(
			"input",
			(e) => {
				const ccn = e.srcElement.selectedOptions[0].innerHTML;
				const rate = e.srcElement.value;
				$("#amount").parentElement.previousElementSibling.firstElementChild.innerHTML = "amount (in " + ccn + ")";
				if($("#amount").value > 0){
					$("#equiv_amount").value = this.roundToNthDecimalPlace($("#amount").value / rate, 2);
				}
			}
		);
	}
	readBanks(){
		let xmlHtttp = new XMLHttpRequest();
        xmlHtttp.onreadystatechange = function(){
            if(xmlHtttp.readyState == 4 && xmlHtttp.status == 200){
                let bank = JSON.parse(xmlHtttp.responseText);
                let recipients_bank = $("#recipients_bank");

                for(const obj in bank){
                	let a = document.createElement("option");
                	a.value = bank[obj]["code"];
                	a.innerHTML = bank[obj]["name"];
                	recipients_bank.appendChild(a);
                }
            }
        };
        xmlHtttp.open(
            "GET",
            "../json/banks.json",
            true
        );
        xmlHtttp.send();		
	}
	readForexRatesAndCCN(){
		let xmlHtttp = new XMLHttpRequest();
        xmlHtttp.onreadystatechange = function(){
            if(xmlHtttp.readyState == 4 && xmlHtttp.status == 200){
                let responseText = JSON.parse(xmlHtttp.responseText);
                let rates = responseText.rates;
                this.rates = rates;

                let xmlHtttp2 = new XMLHttpRequest();
		        xmlHtttp2.onreadystatechange = function(){
		            if(xmlHtttp2.readyState == 4 && xmlHtttp2.status == 200){
		                let ccn = JSON.parse(xmlHtttp2.responseText);
		                let recipients_currency = $("#recipients_currency");
		                this.ccn = ccn;

		                for(const obj in rates){
		                	let a = document.createElement("option");
		                	a.value = rates[obj];
		                	a.innerHTML = obj;
		                	if(ccn[obj]){
		                		a.innerHTML += " - " + ccn[obj]["name"];
		                	}
		                	recipients_currency.appendChild(a);
		                }
		                $(".loading").remove();
		            }
		        };
		        xmlHtttp2.open(
		            "GET",
		            "../json/ccn.json",
		            true
		        );
		        xmlHtttp2.send();
            }
        };
        xmlHtttp.open(
            "GET",
            "../json/forex.json",
            true
        );
        xmlHtttp.send();
	}
	accountNumberField(){
		$("#account_number").addEventListener(
			"keypress",
			(e) => {
				if(e.srcElement.value.length > 19){
					e.preventDefault();
				}
			}
		);
	}
	onAmountFieldClicked(){
		$("#amount").addEventListener(
			"keypress",
			(e) => {
				if(e.key == "."){
					e.preventDefault();
					$("#amount_decimal").focus();
				}
			}
		);
		$("#amount").addEventListener(
			"keydown",
			(e) => {
				if(!Number(e.key) && e.key != "." && e.key != "Backspace"){
					e.preventDefault();
				}
			}
		);
	}
	showEquivalentAmountInSendersCurrency(){
		$$("#amount, #amount_decimal").forEach(
			item => {
				item.addEventListener(
					"input",
					(e) => {
						let a = 0, b = 0;

						($("#amount").value.length < 1) ? a : (a = $("#amount").value);
						($("#amount_decimal").value.length < 1) ? b : (b = $("#amount_decimal").value);

						let amount = parseFloat(a + "." + b);
						let currency_rate = $("#recipients_currency").value;

						$("#equiv_amount").value = this.roundToNthDecimalPlace(amount / currency_rate, 2);
					}
				);
			}
		);
	}
	proceed(){
		$("#proceed").addEventListener(
			"click",
			(e) => {
				let account_number = {
					"element": $("#account_number"),
					"value": $("#account_number").value
				}
				let recipients_bank = {
					"element": $("#recipients_bank"),
					"name": $("#recipients_bank").selectedOptions[0].innerText,
					"value": $("#recipients_bank").value
				}
				let recipients_currency = {
					"element": $("#recipients_currency"),
					"name": $("#recipients_currency").selectedOptions[0].innerText,
					"value": $("#recipients_currency").value
				}
				let amount = {
					"element": $("#amount"),
					"value": $("#amount").value
				}
				let result = 1;

				let array = [account_number, recipients_bank, recipients_currency, amount];
				array.forEach(
					item => {
						item.element.parentElement.classList.remove("error-border");
					}
				);
				array.forEach(
					(item, index) => {
						if(index == 0){
							if(item.value.length < 10 || !Number(item.value)){
								item.element.parentElement.className += " error-border";
								result *= 0;
							}
						}
						else if(index == 1){
							if(item.value.length > 3 || item.value.length < 3){
								item.element.parentElement.className += " error-border";
								result *= 0;
							}
						}
						else if(index == 2){
							if(!item.value){
								item.element.parentElement.className += " error-border";
								result *= 0;
							}
						}
						else if(index == 3){
							if(item.value <= 0){
								item.element.parentElement.className += " error-border";
								result *= 0;
							}
						}
					}
				);
				if(result && result === 1){
					array.forEach(
						item => {
							item.element.parentElement.classList.remove("error-border");
						}
					);
					// move to next procedure
				}
			}
		);
	}
}


var makeTransfer = new MakeTransfer();