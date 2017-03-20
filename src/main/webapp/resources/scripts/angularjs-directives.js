if (typeof util === 'undefined') util = {};
if (typeof util.angularjs === 'undefined') util.angularjs = {};
if (typeof util.angularjs.directive === 'undefined') util.angularjs.directive = {};

//usage: <input type="file" fileread="vm.uploadme" />
util.angularjs.directive.filereads = function () {
    return {
        scope: {
            filereads: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                };
                //reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    };
};
/*usage, in the controller:
$scope.uploadme = {};
$scope.uploadme.src = "";
in html:
<input type="file" fileread="uploadme.src"/>
<input type="text" ng-model="uploadme.src"/>
*/
util.angularjs.directive.fileread = function() {
	return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.$apply(function () {
                	scope.fileread = null;
                	if (typeof changeEvent.target.files !== 'undefined' && 
                			changeEvent.target.files != null &&
                			changeEvent.target.files.length>0) {
                		scope.fileread = changeEvent.target.files[0];
                	} else if (typeof changeEvent.target.value !== 'undefined' &&
                			changeEvent.target.value != null) {
                		scope.fileread = changeEvent.target.value;
                	}
                    // or all selected files:
                    // scope.fileread = changeEvent.target.files;
                });
            });
        }
    };
};
//usage: <input type="file" ng-model="editItem._attachments_uri.image" accept="image/*" app-filereader />
util.angularjs.directive.imgfileread = function($q) {
    var slice = Array.prototype.slice;
    return {
        restrict: 'A', 
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel){
            if(!ngModel) return;
            ngModel.$render = function(){};
            element.bind('change', function(e){
                var element = e.target;
                $q.all(slice.call(element.files, 0).map(readFile))
                .then(function(values){
                    if(element.multiple) ngModel.$setViewValue(values);
                    else ngModel.$setViewValue(values.length ? values[0] : null);
                });
                function readFile(file) {
                    var deferred = $q.defer();
                    var reader = new FileReader();
                    reader.onload = function(e){
                        deferred.resolve(e.target.result);
                    };
                    reader.onerror = function(e) {
                        deferred.reject(e);
                    };
                    reader.readAsDataURL(file);
                    return deferred.promise;
                }
            });//change
        }//link
    };//return
};//appFilereader

