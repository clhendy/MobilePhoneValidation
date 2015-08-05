The purpose of this function is to check that the number being input is a valid MSISDN number for the country, and will also, if the information is available, format the number to the recognised format for that country.

It will strip white space from numbers if/when they are put in. This is done as people will sometimes put in the spaces automatically, but will be placed back in, or corrected, if the msisdnFormat has been populated for that country .

A leading '0' is also removed when a user may place this in automatically. For instance in the UK when dialling from within the country the user will dial: 07795 for the code, however international dialing requires this to be removed and it will become +44 7795

Dependancies
This function is including the following dependancies:

js/filters.js - this is where all the cool action happens
js/app.js - Usual module, includes the call to the countryCodeService to load the countries
js/services/countryCodeService.js
The services to get the codes from the JSON file and 2 functions to sort the list by country code descending (required for the country code validation) and by displayFirst Ascending followed by Alphabetically (currently used for the select order)
js/controllers/gsmController.js - this gives you the basic working on how to call the filter
js/countryCodes.json - this is the file which contains all of the country codes and the workings. See extra panel for full details on how this file works
js/directives.js - ngBlur allows the onBlur() function to work on form inputs etc.

Detailed information on the country code file:

You can either put it into a seperate API call or do as I have here and reference to it directly.
It is editable and can be updated manually to show more or less countries at the top of the list. Change the order of the list, and set countries inactive (not to show) etc.
The information obtained in the current list was from Wikipedia and may need checking against for potential changes or adding further countries information.


name - The full name of the country. Currently used for display on the select options
dialCode - The international dialing code of the country WIHTOUT the '+'. If you include a new country the '+' is not required
code - Country short code. Can be used instead of full name perhaps for the select options
prefixNo - An integer value of how many characters at the start of an msisdn needs checking against. I.E: Norway is 1, Poland is 2
prefixVal - A comma seperated list of special numbers used by certain countries to define that the number is specifically a mobile/cell number. This can be 1, 2 or more numbers. I.e: Norway is 4,9; Poland is 50,51,53,57,60,66,... You can be very specific as required and update this list if and when required
msisdnCount - The amount of characters expected to validate it as a mobile number or how many characters there are for that country. I.E: Norway is 9, UK is 10
displayFirst- If you want specific countries at the top of the country select list define them here by numbering them from importance ascending (1-10). Label all the other countries that you wish to be displayed alphabetically as 999.
active - Sets that country should be shown in the list
validation - You require this country to be validated in the filter with prefix checking and msisdn count
msisdnFormat - A comma separated list so that you can format the number to display as that country displays . IE: Norway is 3,2,3 - 3 numbers, space, 2 numbers, space, 3 numbers; UK is 4 - 4 numbers, rest of numbers

NB: United States has been hard coded in, along with US colony countries which have country code length of 4

Plunker to view this is at: http://plnkr.co/edit/DKtQgIVGZrMhZESiCgLa?p=preview

