app.controller("validationController", function ($scope, $rootScope, $log, $filter, $compile, $timeout, $location,$window, countryCodeService){


    $scope.loadData = function(){
        //$scope.countryCodes = countryCodeService.getCountryCodes();
        $scope.countryCodes = countryCodeService.sortByDisplayFirst();
        $scope.countryCode = $scope.countryCodes[0].dialCode;

    };

    $scope.validateNumber = function(countryCode, msisdn){

        if(msisdn) {
            var msisdnResult = $filter("validateMsisdn")(countryCode, msisdn);

            $scope.countryCodeFormatted = '+ ' + msisdnResult.code;
            $scope.msisdn = msisdnResult.msisdnFormatted;

            $scope.errorMessageInvalid = msisdnResult.errorMessageInvalid;
            $scope.errorMessageInvalidText = 'Not a recognised mobile number';
            $scope.errorMessageLength = msisdnResult.errorMessageLength;
            $scope.errorMessageLengthText = 'Wrong length for Mobile number';
        }

    };



    $timeout(function(){
        $scope.loadData();
    },50);

});