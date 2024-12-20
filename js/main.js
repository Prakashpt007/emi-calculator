var currency = 'INR';

var toIndianCurrency = ( num ) => {
	let curr = Number( num ).toLocaleString( 'en-IN', {
		style: 'currency',
		currency: currency
	} );
	return curr;
};

$( "#form" ).on( 'submit', function ( e ) {
	e.preventDefault();
	getValues();
} );

function changeProcessFeeType () {
	document.getElementById( "processFee" ).value = 0;
}
function getValues () {
	var balance = parseFloat( document.getElementById( "principal" ).value );
	var interestRate = parseFloat( document.getElementById( "interest" ).value / 100.0 );
	var year = parseInt( document.getElementById( "year" ).value );
	var months = parseInt( document.getElementById( "months" ).value );
	var terms = year * 12 + months;
	var processFeeType = document.getElementById( "processFeeType" ).value;
	var addProcessingFee = document.getElementById( "addProcessingFee" ).checked;






	var processFee = 0;
	if ( processFeeType === 'percent' )
	{
		processFee = parseFloat( document.getElementById( "processFee" ).value ) * balance / 100;
	} else
	{
		processFee = parseFloat( document.getElementById( "processFee" ).value ) || 0;
	}

	if ( addProcessingFee )
	{
		balance += processFee;
	}

	var div = document.getElementById( "Result" );
	div.innerHTML = "";

	var balVal = validateInputs( balance );
	var intrVal = validateInputs( interestRate );

	if ( balVal && intrVal )
	{
		div.innerHTML += amort( balance, interestRate, terms, processFee );
	} else
	{
		div.innerHTML += `Please Check your inputs and retry - invalid values.`;
	}
}

function amort ( balance, interestRate, terms, processFee ) {
	var monthlyRate = interestRate / 12;
	var payment = balance * ( monthlyRate / ( 1 - Math.pow( 1 + monthlyRate, -terms ) ) );

	var result = `
        <div class='table-responsive'>
            <table class='table table1 table-hover'>
                <tr>
                    <th style='width: 250px;'>Loan amount : </th>
                    <td>${ toIndianCurrency( balance ) }</td>
                </tr>
                <tr>
                    <th>Processing Fee : </th>
                    <td>${ toIndianCurrency( processFee ) }</td>
                </tr>
                <tr>
                    <th>Interest rate : </th>
                    <td>${ ( interestRate * 100 ).toFixed( 2 ) } %</td>
                </tr>
                <tr>
                    <th>Number of months : </th>
                    <td>${ terms }</td>
                </tr>
                <tr>
                    <th>Monthly payment : </th>
                    <td>${ toIndianCurrency( payment.toFixed( 2 ) ) }</td>
                </tr>
                <tr>
                    <th>Total paid : </th>
                    <td>${ toIndianCurrency( ( payment * terms ).toFixed( 2 ) ) }</td>
                </tr>
            </table>
        </div>`;

	result += `<div class='table-responsive'>
                <table class='table table1 table-hover'>
                    <thead>
                        <tr style='--bs-table-accent-bg: rgb(109 109 109 / 50%);color: #212529;'>
                            <th style='width: 130px;'># Month</th>
                            <th>Balance</th>
                            <th>EMI</th>
                            <th>Interest</th>
                            <th>[EMI - Interest] = Principal Paid</th>
                            <th>Remaining Amount</th>
                        </tr>
                    </thead>`;

	for ( var count = 0; count < terms; ++count )
	{
		var interest = balance * monthlyRate;
		var monthlyPrincipal = payment - interest;

		result += `<tr align=left>`;
		result += `<td>${ ( count + 1 ) }</td>`;
		result += `<td>${ toIndianCurrency( balance.toFixed( 2 ) ) }</td>`;
		result += `<td>${ toIndianCurrency( payment.toFixed( 2 ) ) }</td>`;
		result += `<td>${ toIndianCurrency( interest.toFixed( 2 ) ) }</td>`;
		result += `<td>[${ payment.toFixed( 2 ) } - ${ interest.toFixed( 2 ) }] = ${ toIndianCurrency( monthlyPrincipal.toFixed( 2 ) ) }</td>`;
		result += `<td>${ toIndianCurrency( Math.abs( balance - monthlyPrincipal ).toFixed( 2 ) ) }</td>`;
		result += `</tr>`;

		balance = balance - monthlyPrincipal;
	}

	result += `</table></div>`;
	return result;
}

function validateInputs ( value ) {
	return !isNaN( value ) && value !== null && value !== '';
}
