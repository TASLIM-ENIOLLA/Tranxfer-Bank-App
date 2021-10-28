<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="../css/font-awesome/font-awesome/font-awesome.css">
    <link rel="stylesheet" type="text/css" href="../css/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../css/css/make_transfer.css">
    <title>Tranxfer Banking App - Make Transfer</title>
</head>
<body>
    <div class="a vh100 vw100 bg-light flex-v po-rel user-select-0">
        <div class="theme-bg p-4 shadow a-i-c j-c-c flex-h po-rel">
            <div class="flex-h j-c-c a-i-c po-abs top-50pcent p-4 top-translate-negative-50pcent left-0 back-btn">
                <span class="fa fa-chevron-left text-white fo-s-18"></span>
            </div>
            <div class="flex-1 flex-h text-c j-c-c a-i-c">
                <span onclick="document.location = document.location;" class="line-height-100pcent m-0 flex-1 single-line text-uppercase text-white mt-1 fo-s-18 bold letter-spacing-1" style="vertical-align: 50%;">make transfer</span>
            </div>
        </div>
        <div class="main po-rel flex-1 p-3 flex-v">
            <div class="flex-1 overflow-y-auto">
                <div class="flex-v mb-3">
                    <div class="flex-h">
                        <span class="my-2 text-capitalize text-dark bold letter-spacing-1 flex-1 single-line">recepient's account number</span>
                    </div>
                    <div class="rounded overflow-0 main-list flex-h transit">
                        <input id = "account_number" placeholder="ACCOUNT_NUMBER_DIGITS" max = '9999999999' min = "1" type="number" class="bg-clear bold letter-spacing-1 text-dark outline-0 rounded d-block main-list flex-1 border-0 p-3">    
                    </div>
                </div>
                <div class="flex-v mb-3">
                    <div class="flex-h">
                        <span class="my-2 text-capitalize text-dark bold letter-spacing-1 flex-1 single-line">recipient's bank</span>
                    </div>
                    <div class="rounded overflow-0 main-list flex-h transit">
                        <select id = "recipients_bank" class="bg-clear bold letter-spacing-1 text-dark outline-0 rounded d-block flex-1 border-0 p-3">
                        </select>
                    </div>
                </div>
                <div class="flex-v mb-3">
                    <div class="flex-h">
                        <span class="my-2 text-capitalize text-dark bold letter-spacing-1 flex-1 single-line">recipient's currency</span>
                    </div>
                    <div class="rounded overflow-0 main-list flex-h transit">
                        <select id = "recipients_currency" class="bg-clear bold letter-spacing-1 text-dark outline-0 rounded d-block flex-1 border-0 p-3">
                        </select>
                    </div>
                </div>
                <div class="flex-v mb-3">
                    <div class="flex-h">
                        <span class="my-2 text-capitalize text-dark bold letter-spacing-1 flex-1 single-line">amount (in recipient's currency)</span>
                    </div>
                    <div class="rounded overflow-0 main-list flex-h a-i-c j-c-c transit">
                        <input id = "amount" placeholder="0" type="number" class="bg-clear bold letter-spacing-1 text-dark outline-0 main-list flex-1 border-0 p-3">
                        <span class="px-2 text-muted bold letter-spacing-1 fa fa-circle" style="font-size: 8px;"></span>
                        <input type="number" placeholder="00" id="amount_decimal" class="text-c bg-clear bold letter-spacing-1 text-dark outline-0 border-0">
                    </div>
                </div>
                <div class="flex-v mb-3">
                    <div class="flex-h">
                        <span class="my-2 text-capitalize text-dark bold letter-spacing-1 flex-1 single-line">equivalent amount in sender's currency (uneditable)</span>
                    </div>
                    <div class="rounded overflow-0 disabled main-list flex-h a-i-c j-c-c transit">
                        <input id = "equiv_amount" placeholder="0.00" type="number" class="bg-clear bold letter-spacing-1 text-dark outline-0 rounded d-block main-list flex-1 border-0 p-3">
                    </div>
                </div>
            </div>
            <div class="p-2">
                <div id = "proceed" class="p-3 bold letter-spacing-1 text-white theme-bg text-c text-uppercase flicker rounded sm-shadow">
                    proceed
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="../js/make_transfer.js"></script>
</body>
</html>
