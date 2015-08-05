var app = angular.module("app", ["ui.bootstrap"]);

app.config(function(){

});

// runs when application finished loading
app.run(function($rootScope, $location,countryCodeService, $log) {
    countryCodeService.loadCodes();

});
