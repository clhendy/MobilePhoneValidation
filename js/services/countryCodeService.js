app.service("countryCodeService", function($http, $rootScope){
    var codes, countryCode = [];

    function predicate() {
        var fields = [],
            n_fields = arguments.length,
            field, name, reverse, cmp;

        var default_cmp = function (a, b) {
                if (a === b) return 0;
                return a < b ? -1 : 1;
            },
            getCmpFunc = function (primer, reverse) {
                var dfc = default_cmp,
                // closer in scope
                    cmp = default_cmp;
                if (primer) {
                    cmp = function (a, b) {
                        return dfc(primer(a), primer(b));
                    };
                }
                if (reverse) {
                    return function (a, b) {
                        return -1 * cmp(a, b);
                    };
                }
                return cmp;
            };

        // preprocess sorting options
        for (var i = 0; i < n_fields; i++) {
            field = arguments[i];
            if (typeof field === 'string') {
                name = field;
                cmp = default_cmp;
            } else {
                name = field.name;
                cmp = getCmpFunc(field.primer, field.reverse);
            }
            fields.push({
                name: name,
                cmp: cmp
            });
        }

        // final comparison function
        return function (A, B) {
            var a, b, name, result;
            for (var i = 0; i < n_fields; i++) {
                result = 0;
                field = fields[i];
                name = field.name;

                result = field.cmp(A[name], B[name]);
                if (result !== 0) break;
            }
            return result;
        };
    }

    this.loadCodes = function () {
        $http.get('js/countryCodes.json').then(function (result) {
            result.data.forEach(function(itm){
                if(itm.active == 1){
                    countryCode.push(itm);
                }
            });
            codes = countryCode;
            //console.log(codes);

            return codes;

        });

    };

    this.getCountryCodes = function(){
        return codes;
    };


    this.sortByDisplayFirst = function () {

        return codes.sort(predicate({
            name:'displayFirst',
            reverse: false},'name'));
    };

    this.sortByDialCode = function () {
        return codes.sort(function(a,b){return b.dialCode - a.dialCode});
    };

});