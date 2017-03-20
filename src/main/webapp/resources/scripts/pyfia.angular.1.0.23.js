if (typeof pyfia === 'undefined') pyfia = {};

pyfia.ngApp = angular.module('pfNgApp', ['ngRoute', 'ngResource'])
.factory('forecast', ['$resource', function($resource) {
	return $resource(context+'/forecast/:cls/:attrib/:dt/:hist/:sd/:img', {
		cls: '@cls',attrib: '@attrib', dt: '@dt', hist: '@hist', sd: '@sd', img: '@img'
	});
}])
.service('pfmsg', ['$rootScope', function($rootScope){
	$rootScope.debug = true;
	this.msg = function(t, m) {
		pyfia.show_warning(m);
	};
	this.clr = function() {
		pyfia.clear_warning();
	};
}])
.controller('pfCtrl', ['$rootScope', '$scope', 'forecast', 'pfmsg', '$route', '$routeParams', '$location', 
    function($rootScope, $scope, forecast, pfmsg, $route, $routeParams, $location) {
	$scope.data = {
		cls: '',attrib: '', dt: '', hist: 0, sd: ''
	};
	$scope.prediction = null;
	$scope.state = null;
	$scope.showview = false;

	$scope.panel = function() {
			pf.comp.noresize = true;
			pyfia.show_ppanel();
			$('.navbar-collapse').toggle();
			pf.comp.noresize = false;
	};
	$scope.chart = function() { //show chart
		pf.comp.noresize = true;
		pyfia.show_chart();
		$('.navbar-collapse').toggle();
		pf.comp.noresize = false;
	};
	$scope.contactus = function() { //show contact
		pf.comp.noresize = true;
		pyfia.show_contact();
		$('.navbar-collapse').toggle();
		pf.comp.noresize = false;			
	};
	$scope.aboutus = function() { //show about us
		pf.comp.noresize = true;
		pyfia.show_aboutus();
		$('.navbar-collapse').toggle();
		pf.comp.noresize = false;			
	};
	$scope.help = function() { //show help
		pf.comp.noresize = true;
		pyfia.help();
		$('.navbar-collapse').toggle();
		pf.comp.noresize = false;		
	};
	$scope.disclaimer = function() { //show disclaimer
		pf.comp.noresize = true;
		pyfia.show_disclaimer();
		$('.navbar-collapse').toggle();
		pf.comp.noresize = false;		
	};
	$scope.facebook = function() {
		pf.comp.noresize = true;
		pyfia.show_fb();
		$('.navbar-collapse').toggle();
		pf.comp.noresize = false;
	};
	$scope.predict = function() {
		pf.comp.noresize = true;
		pfmsg.clr();
		var req = pyfia.validate();
		if (typeof req === 'undefined' || req==null) {
			pf.comp.noresize = false;
			return;
		}
		pf.comp.util.wait();
		forecast.get({
			cls: encodeURIComponent(req.cls).replace('+', '%20'),
			attrib: encodeURIComponent(req.attrib).replace('+', '%20'),
			dt: encodeURIComponent(req.dt).replace('+', '%20'),
			hist: encodeURIComponent(req.hist).replace('+', '%20'),
			sd: encodeURIComponent(req.sd).replace('+', '%20'),
			img: 1
		}).$promise.then(function(d){
			$scope.data = d.response;
			$scope.reldg = d.imgstr;
			pyfia.data = d.response;
			pyfia.reldg = d.imgstr;
			$scope.prediction();
		},
		function(d){
			pf.comp.util.done();
			pfmsg.msg('Error', 'Cannot predict.');
		});
		
	};
	$scope.prediction = function() { //show prediction
		pf.comp.noresize = true;
		if (pyfia.data && pyfia.data.exception) {
			pfmsg.msg('Warning', 
				pyfia.data.exception + ((pyfia.data && pyfia.data.clazz ? ' Please double check ' + pyfia.data.clazz + '.' : '')));
		} else if (pyfia.reqpnl && pyfia.reqpnl=='chart') {
			pyfia.show_chart();
		} else {
			pyfia.show_forecast();
		}
		pf.comp.util.done();
		
	};	
	$scope.chart_callback = function() {
	    $scope.chart = new AmCharts.AmStockChart();
	    $scope.chart.pathToImages = "/resouces/scripts/amcharts/images/";
	    $scope.dataSet = new AmCharts.DataSet();
	    $scope.dataSet.color = "#b0de09";
	    $scope.dataSet.dataProvider = pyfia.get_chart_data();
	    $scope.dataSet.fieldMappings = [{fromField:"val", toField:"value"}];
	    $scope.dataSet.categoryField = "date";
	    $scope.chart.dataSets = [$scope.dataSet];
	    $scope.stockPanel = new AmCharts.StockPanel();
	    $scope.chart.panels = [$scope.stockPanel];
	    $scope.panelsSettings = new AmCharts.PanelsSettings();
	    $scope.panelsSettings.startDuration = 1;
	    $scope.chart.panelsSettings = $scope.panelsSettings;
	    $scope.graph = new AmCharts.StockGraph();
	    $scope.graph.bullet = "round";
	    $scope.graph.valueField = "value";
	    $scope.graph.title = pyfia.data.clazz;
	    $scope.stockPanel.addStockGraph($scope.graph);
	    $scope.chart.write("chartPanel");
	}
	$scope.contact_us = function() {
		pf.comp.noresize = true;
		pfmsg.clr();
		pyfia.contact_us();
	};
	$scope.help = function() {
		pyfia.help();
	};
	$scope.data = function() {
		
	};
	$scope.$on('$stateChangeSuccess',
		function(event, toState, toParams, fromState, fromParams){
			switch($scope.state) {
			case 'chart':
				$scope.chart_callback();
			case 'prediction':
				$scope.prediction_callback();
			}
		});
		//$routeChangeError
}]);