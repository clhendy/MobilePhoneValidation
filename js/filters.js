app.filter("validateMsisdn", ['countryCodeService','formatNumber', function(countryCodeService, formatNumber){
    return function(countryCode,msisdn){
        var data, code = '',  msisdnFormatted = '', prefix = '', prefixVal = {}, formatSpace = {},errorMessageLength = false, errorMessageInvalid = false,regex, space;

            msisdn = msisdn.replace(/[^0-9]/g, "");
            if(msisdn.charAt(0) === '0'){
                msisdn = msisdn.slice(1);
            }
           data = countryCodeService.sortByDialCode();

            data.forEach(function(itm){
                if(itm.prefixVal){
                    prefixVal = itm.prefixVal.split(',');
                }

                if(itm.msisdnFormat != ''){
                    formatSpace = itm.msisdnFormat.split(',');
                }
                switch (itm.dialCode){
                    case countryCode:

                    if(itm.dialCode.length == 4 && itm.dialCode.substr(0,1) == '1'){
                        code = itm.dialCode.substr(0,1) + "("+ itm.dialCode.substring(1)+")";
                    } else {
                        code = itm.dialCode;
                    }

                    if(itm.validation == '1' && itm.dialCode == countryCode) {

                        if(msisdn.length == itm.msisdnCount) {
                            // msisdnFormatted = "(" + msisdn.substr(0, 3) + ") " + msisdn.substr(3, 3) + "-" + msisdn.substring(6);
                            if (itm.prefixNo != null) {
                                prefix = msisdn.substr(0,itm.prefixNo);
                                if (prefixVal.indexOf(prefix) !== -1) {

                                   msisdnFormatted = formatNumber(itm.msisdnFormat,msisdn);

                                } else {
                                    msisdnFormatted = msisdn;
                                    errorMessageInvalid = true;
                                }

                            }
                        }

                        if(msisdn.length != itm.msisdnCount) {
                            msisdnFormatted = msisdn;
                            errorMessageLength = true;
                        }
                    } else {
                        if (countryCode == 1) {
                            msisdnFormatted = "(" + msisdn.substr(0, 3) + ") " + msisdn.substr(3, 3) + "-" + msisdn.substring(6);
                        } else {
                            msisdnFormatted = formatNumber(itm.msisdnFormat, msisdn);
                        }
                    }
                break;
                default:
                }
            });

        data = countryCodeService.sortByDisplayFirst();
        return {code: code, msisdnFormatted:msisdnFormatted,errorMessageInvalid:errorMessageInvalid,errorMessageLength:errorMessageLength};

    };
}]);

app.factory("formatNumber", function(){
    return function(msisdnFormat, msisdn) {
        var formatSpace = {}, regex, space, msisdnFormatted;
        msisdnFormatted = msisdn;
        if (msisdnFormat) {
            formatSpace = msisdnFormat.split(',');
            if (formatSpace.length > 0) {
                for (var i = 0; i < formatSpace.length; i++) {
                    var id = i + 1;
                    if (i == 0) {
                        regex = '(\\d{' + formatSpace[i] + '})';
                        space = '$' + id + ' ';
                    } else if (id != formatSpace.length) {
                        regex += '(\\d{' + formatSpace[i] + '})';
                        space += '$' + id + ' ';
                    } else {
                        regex += '(\\d{' + formatSpace[i] + '})';
                        space += '$' + id + '';
                    }

                }
                msisdnFormatted = msisdn.replace(new RegExp(regex), space);
            }

        }
        return msisdnFormatted;
    }
});