(function() {
	pyfia = {
		debug: true,
		data: null,
		activePanel: null,
		reqpnl: 'forecast',
		disclaimer: "Pyfia.com predictions include forecast, projections and other predictive statements that represent your own assumptions and expectations in light of currently available data. These forecasts are based on the parameters of your own selection,and they involve risks, variables and uncertainties. Future events may differ from pyfia.com predictions. No guarantee is presented or implied as to the accuracy of specific forecasts, projections or predictive statements contained herein. Pyfia.com will not be liable for any lost in any form as a result of action based on your forecasts.",
		getHeight: function() { return 50; },
		getBottom: function() { return $(window).width()>$(window).height() ? 50 : 100; },		
		grouped_predictors: [
			{group: "NYSE",
				list:[
				{symbol: "^NYA", desc: "Composite"},
				{symbol: "^NY", desc: "U.S 100"},
				{symbol: "^NYI", desc: "International 100"},
				{symbol: "^NYL", desc: "World Leaders"},
				{symbol: "^NYY", desc: "TMT Index"}
				]
			},
			{group: "NASDAQ",
				list:[
				{symbol: "^IXIC", desc: "Composite"},
				{symbol: "^NDX", desc: "Nasdaq 100"},
				{symbol: "^BANK", desc: "Banks"},
				{symbol: "^OFIN", desc: "Financials"},
				{symbol: "^INDS", desc: "Industrials"},
				{symbol: "^INSR", desc: "Insurance"},
				{symbol: "^IXCO", desc: "Computers"},
				{symbol: "^TRAN", desc: "Transportation"},
				{symbol: "^IXTC", desc: "Telecommunications"},
				{symbol: "^NBI", desc: "Biotechnology"}				
				]
			},
			{group: "S&amp;P",
				list: [
				{symbol: "^MID", desc: "400 MidCap"},
				{symbol: "^GSPC", desc: "S&amp;P 500"},
				{symbol: "^SML", desc: "S&amp;P 600"},
				{symbol: "^OEX", desc: "S&amp;P100INDEX"}
				]
			},
			{group: "Treasury",
				list: [
				{symbol: "^IRX", desc: "13-Week Bill"},
				{symbol: "^TNX", desc: "10-Year Note"},
				{symbol: "^TYX", desc: "30-Year Bond"},
				{symbol: "^FVX", desc: "5-Year Note"}
				]
			},
			{group: "Currencies",
				list: [
				{symbol: "FXA", desc: 'CurrencyShares Australian Dollar Trust'},
				{symbol: "FXB", desc: 'CurrencyShares British Pound Sterling '},
				{symbol: "FXC", desc: 'CurrencyShares Canadian Dollar Trust'},
				{symbol: "FXE", desc: 'Euro Exchange Rate'},
				{symbol: "FXY", desc: 'CurrencyShares Japanese Yen Trust'},
				{symbol: "FXS", desc: 'CurrencyShares Swedish Krona Trust'}
				]
			},
			{group: "Commodities",
				list: [
				{symbol: "^DJC", desc: 'Dow Jones AIG Commodity'},
				{symbol: "^XAU", desc: 'Philadelphia Gold &amp; Silver'}
				]
			},			
			{group: "Other",
				list: [
				{symbol: "^XAX", desc: "AMEX Composite"},
				{symbol: "^NWX", desc: "AMEX Networking"},
				{symbol: "^XMI", desc: "Major Market"},
				{symbol: "^PSE", desc: "Pacific Exchange Technology"},
				{symbol: "^RUI", desc: "Russell 1000"},
				{symbol: "^RUT", desc: "Russell 2000"},
				{symbol: "^RUA", desc: "Russell 3000"},
				{symbol: "GLD", desc: 'SPDR Gold Shares'},
				{symbol: "OIL", desc: 'iPath S&P GSCI Crude Oil TR ETN'},
				{symbol: "^VIX", desc: 'Volatility S&P 500'}
				]
			}
			],
		MAX_PCOUNT: 10,
		panel: null,
		config: {
			topmenu: {

				zindex: 11, opacity: 0.7, bgcolorFrom: '#202020', bgcolorTo: '#181818', id: 'topmenu', height: '45px',

				icon: {'src': '/resources/images/pythialogo.jpg', opacity: .75,

				'width': '45px', 'height': '45px', 'margin' : '0px'},

				menuitems: [
		            {content: '<a target="_blank" style="text-align:left;color:#fffff0;font-weight:700;text-decoration:none;border:none;" href="https://twitter.com/share" class="twitter-share-button" data-url="http://www.pyfia.com" data-text="Do your own forecasting." data-count="none"><img width="40" height="20" style="width:30px;height:20px;text-decoration:none;border:none;" src="/resources/images/twitter-logo.png"/></a>'+

		            	'<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?"http":"https";if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document, "script", "twitter-wjs");</script>',

	            		'margin' : '10px', 'separation' : '10px', 'color': '#ffffff', 'width': '40px'},

		            {'img' : '/resources/images/facebook5.png', 'margin' : '10px', 'separation' : '10px', 'color': '#ffffff', 'width': '40px',
	            		'imgwidth': '30px', 'imgheight': '20px', onclick: function(){ pyfia.facebookClick();} },
		            {'text' : 'Contact Us', 'margin' : '10px', 'separation' : '16px', 'color': '#ffffff', 'width': '80px',
		            	onclick: function() { pyfia.show_contact(); } },
		            {'text' : 'About Us', 'margin' : '10px', 'separation' : '16px', 'color': '#ffffff', 'width': '70px',
						onclick: function() { pyfia.show_aboutus();}},
		            {'text' : 'Help', 'margin' : '10px', 'separation' : '16px', 'color': '#ffffff', 'width': '70px',
		            	onclick: function() { pyfia.help(); } },
		            {'text' : 'Disclaimer', 'margin' : '10px', 'separation' : '16px', 'color': '#ffffff', 'width': '70px',
						onclick: function() { pyfia.show_disclaimer();}}
					]
			},
			toolbar: {
				zindex: 10, width: '80px', opacity: 0.75,
				toolbaritems: [
		            {'color': '#ffffff', 'icon': '/resources/images/chart.png', 'text' : 'Chart',

		            	width: '40px', height: '40px', 'separation' : '16px',

		            	onclick: function() {
		            		pyfia.show_chart();
		            	}},
		            {'color': '#ffffff', 'icon': '/resources/images/search.png', 'text' : 'Prediction',

		            		width: '40px', height: '40px', 'separation' : '16px',

		            	onclick: function() {
		            		pyfia.show_forecast();
		            	}}

		            ]
			},
			ribbon: { ribbonId: 'pf_footer', opacity: 0.6, idx: 0, div: null, pause: 10000, id: 'ribbon', ribbons: [

				{zindex: 10, bgcolorFrom: '#202020', bgcolorTo: '#181818',

				icon: {'src': '/resources/images/mbtglobelogo.png',

				'width': '640px', 'height': '80px', 'margin' : '0px'},

				message: '<a target="_blank" href="http://mbtrading.com" style="color:#fffff0;text-decoration:none;"><br/>MB Trading, great execution and cutting edge software platform. One of the low price commission leaders.</a>'
				},

				{zindex: 10, bgcolorFrom: '#202020', bgcolorTo: '#181818',

				icon: {'src': '/resources/images/l_sm.gif',

				'width': '640px', 'height': '80px', 'margin' : '0px'},

				message: '<a target="_blank" href="http://www.elitetrader.com" style="color:#fffff0;text-decoration:none;"><br/>Are you in search of a source for valuable insight into stocks, futures, options, and currencies?  You?ve come to the right place!  At Elite Trader, you can become a part of the leading community of traders...</a>'
				},

				{zindex: 10, bgcolorFrom: '#202020', bgcolorTo: '#181818',

					icon: {'src': '/resources/images/cboe_pagebar.png',

					'width': '640px', 'height': '80px', 'margin' : '0px'},

					message: '<a target="_blank" href="http://www.cboe.com" style="color:#fffff0;text-decoration:none;"><br/>Welcome to CBOE.com: the definitive source for options trading information. CBOE is the world\'s largest options exchange and the leader in product innovation, options education and trading volume.</a>'
				},

				{zindex: 10, bgcolorFrom: '#202020', bgcolorTo: '#181818',

					icon: {'src': '/resources/images/yahoo-finance-940x350.jpg',

					'width': '640px', 'height': '80px', 'margin' : '0px'},

					message: '<a target="_blank" href="http://finance.yahoo.com" style="color:#fffff0;text-decoration:none;"><br/>At Yahoo! Finance, you get free stock quotes, up to date news, portfolio management resources, international market data, message boards, and mortgage rates ...</a>'
				}
			]},
			bgcarousel: {
				wrapperid: 'pyfiaBgdiv', //ID of blank DIV on page to house carousel
				imagearray: [
					[pf.comp.getDevice()=='mobile' ? '/resources/images/New_York_Midtown_Skyline_at_night_Jan_2006_phone.jpg' : 
						'/resources/images/New_York_Midtown_Skyline_at_night_Jan_2006.jpg', ''],
					[pf.comp.getDevice()=='mobile' ? '/resources/images/city-london-night_phone.jpg' : 
						'/resources/images/city-london-night.jpg', ''],
					[pf.comp.getDevice()=='mobile' ? '/resources/images/Hong_Kong_Skyline_Restitch_Dec_2007_phone.jpg' :
						'/resources/images/Hong_Kong_Skyline_Restitch_Dec_2007.jpg', ''],
					['/resources/images/English-Arabic-Translation-Services-in-Dubai-UAE-10.jpg', ''],
					[pf.comp.getDevice()=='mobile' ? '/resources/images/chicago_loop_phone.jpg' : 
						'/resources/images/chicago_loop.jpg', '']
				],
				displaymode: {type:'auto', pause:10000, cycles:0, stoponclick:false, pauseonmouseover:false},
				navbuttons: [], // path to nav images
				showControl: false,
				//activeslideclass: 'selectedslide', // CSS class that gets added to currently shown DIV slide
				orientation: 'h', //Valid values: "h" or "v"
				persist: true, //remember last viewed slide and recall within same session?
				slideduration: 500 //transition duration (milliseconds)
			}
		},
		noresize: false,
		bgVid: {
			list: [{videoId: 'D_XuLVEsS2M', start: 8}, 
				{videoId: '3uH3D4i-yNs', start: 0},
				{videoId: 'PoClrqhEfm0', start: 0}, 
				{videoId: 'ssyFx8tuYJY', start: 0}, 
				{videoId: 'MHPlR3G3UZI', start: 0}],
			getVid: function() { return this.list[Math.round((this.list.length-1)*Math.random())]; }
		},
//		init: function() {
//			document.body.style.margin = "0px";
//			/*if (BrowserDetect.OS != 'iPad' && BrowserDetect.OS != 'iPhone/iPod')
//				pyfia.config.topmenu.menuitems.push({'text' : 'Data', 'margin' : '10px', 'separation' : '16px', 'color': '#ffffff', 'width': '70px',
//						'submenuitems' : [
//						    {'text' : 'Correlation', 'margin' : '0px', 'separation' : '16px', 'color': '#ffffff', 'width': '70px', 'height': '45px',
//						    'bgcolor': '#181818', opacity: 0.7, zindex: 11, onclick: function() { pyfia.show_data_correlation();}}
//						 ]
//					});	*/
//			pyfia.config.topmenu.menuitems.push({'text' : 'Forecast', 'margin' : '10px', 'separation' : '16px', 'color': '#ffffff', 'width': '70px',
//					'submenuitems' : [
//					    {'text' : 'Equity', 'margin' : '0px', 'separation' : '16px', 'color': '#ffffff', 'width': '70px', 'height': '45px',
//					    'bgcolor': '#181818', opacity: 0.7, zindex: 11, onclick: function() { pyfia.show_ppanel();}}
//					 ]
//				});
//			this.topmenu = new pf.comp.topmenu(pyfia.config.topmenu);
//			this.toolbar = new pf.comp.vtoolbar(pyfia.config.toolbar);
//			this.ribbon = (new pf.comp.ribbon(pyfia.config.ribbon)).init();
//
//			setInterval(this.ribbon.init, pyfia.config.ribbon.pause);
//			//retiring sliding background images, use random videos
//			//this.bgcarousel = new pf.comp.bgCarouselWrapper(pyfia.config.bgcarousel);
//			this.show_ppanel();
//			window.onresize = function() { location.reload(true); };
//		},
		init: function() {
			if (pyfia.fullui) {
				pf.comp.noresize = true;
				this.ribbon = (new pf.comp.ribbon($.extend({}, pyfia.config.ribbon, {mheight: pyfia.getBottom}))).init();
				setInterval(this.ribbon.init, pyfia.config.ribbon.pause);				
				//this.bgcarousel = new pf.comp.bgCarouselWrapper(pyfia.config.bgcarousel);
				$(document.body).append(this.fcbtn);
				pf.comp.cbtn = document.getElementById('centerbtn');
				pf.center($('#centerbtn'));
				pyfia.config.lastWindowHeight = $(window).innerHeight();
				pyfia.config.lastWindowWidth = $(window).innerWidth();
				$(window).resize(function(evt) {
					if (pf.comp.noresize) {
						if (evt!=null) {
							evt.returnValue = false;
							if (typeof evt.preventDefault !== 'undefined') evt.preventDefault();
							if (typeof evt.stopPropagation !== "undefined") {
								evt.stopPropagation();
							} else {
								evt.cancelBubble = true;
							}
						}
					} else if (pyfia.config.lastWindowHeight!=$(window).innerHeight()||pyfia.config.lastWindowWidth!=$(window).innerWidth()) {
						location.reload(true);
						pyfia.config.lastWindowHeight = $(window).innerHeight();
						pyfia.config.lastWindowWidth = $(window).innerWidth();						
					}
				});
				this.btnsocfg = {width: 50, height: 50};
				this.btnfb = (new pf.comp.fixedbtn({
					top: this.ribbon.getComp().style.top - this.btnsocfg.height,
					right: this.btnsocfg.width,
					width: this.btnsocfg.width,
					height: this.btnsocfg.height,
					html: 'Test'
				})).init();
				pf.comp.noresize = false;
			}
		},
		click_centerbtn: function() { 
			if (typeof pf.comp.cbtn !== undefined && pf.comp.cbtn != null && pf.comp.cbtn.style.display=='none') return;
			pf.comp.noresize = true;
			pyfia.show_ppanel();
			$('.navbar-collapse').toggle();
			pf.comp.noresize = false; 
		},
		hide_cbtn: function() { if (pf.comp.cbtn) pf.comp.cbtn.style.display = 'none'; },
		show_cbtn: function() { if (pf.comp.cbtn) pf.comp.cbtn.style.display = 'block'; },
		show_warning: function(msg) {
			if (pyfia.activePanel) pyfia.activePanel.showWarning(msg);
		},
		clear_warning: function() {
			if (pyfia.activePanel) pyfia.activePanel.hideWarning();
		},
		show_ppanel: function() {
			if (pyfia.activePanel) pyfia.activePanel.hide();
			if (!this.panel) {
				this.panel = new pf.comp.panel.forecast({id: 'mainPanel', predictors: pyfia.predictors, 
					title: 'Forecast', draggable: false, callbackShow: pyfia.hide_cbtn, callbackHide: pyfia.show_cbtn,
					height: pf.comp.util.getDlgHeight(), mheight: pyfia.getHeight, mbottom: pyfia.getBottom});
			}
			pyfia.activePanel = this.panel;
			this.panel.show();
			if (this.toolbar && this.toolbar.show) this.toolbar.show();
		},
		show_fb: function() {
			var fbobj =  {
					   method: 'stream.share',
					   u: 'http://www.pyfia.com'
					  };
			if (!document.getElementById('facebook-jssdk')) {
				js = document.createElement('script');
				js.id = 'facebook-jssdk';
				js.async = true;
				js.src = '//connect.facebook.net/en_US/all.js';
				parent.fbPostData = fbobj;
				var ref = document.getElementsByTagName('script')[0];
				if (ref) ref.parentNode.insertBefore(js, ref);
			}
			FB.ui(fbobj,
					function(response) {
						if (response && response.post_id) {
						  //alert('Post was shared.');
						} else {
						  //alert('Post was not shared.');
						}
					  }
					);
		},
		signin: function() {
			pf.comp.util.wait();
			pf.comp.util.done();
		},
		logout: function() {
			$.ajax({url: '/logout', type: 'GET', success: function(data) {}, failure: function() {}});
		},
		validate: function() {
			var req = {};
			var attr = [];
			var pcount = 0;
			if (pf.comp.isNotNormal()) {
				$('#predLst option').each(function() {
					if ($(this).attr('selected')==true || $(this).prop('selected')==true) {
						attr.push($(this).val());
						pcount++;
					}
				});
			} else {
				$('[id="pinput"]').each(function() {
					if ($(this).attr('checked')==true || $(this).prop('checked')==true) {
						attr.push($(this).val());
						pcount++;
					}
				});				
			}
			if (pcount>pyfia.MAX_PCOUNT) {
				pyfia.show_warning('Please choose ' + pyfia.MAX_PCOUNT + ' predictors or less.');
				pf.comp.util.done();
				return null;
			}			
			req.cls = $('#symbol').val();
			if (!req.cls || req.cls=='') {
				pyfia.show_warning('Please specify stock symbol.');
				$('#symbol').focus();
				pf.comp.util.done();
				return null;
			}
			if (!pyfia.target) pyfia.target = {};
			pyfia.target.cls = req.cls;
			pyfia.target.attr = attr;
			req.attrib = attr.join(',');
			if (req.attrib==null||req.attrib=='') req.attrib = 'unknown';
			req.dt = $("#targetDate").val();
			if (!req.dt || req.dt=='') {
				pyfia.show_warning('Please specify a target date within 30 days in the future.');
				$('#targetDate').focus();
				pf.comp.util.done();
				return null;
			}
			req.hist = $('#history').val();
			if (!req.hist || req.hist=='' || isNaN(req.hist)) {
				pyfia.show_warning('Please specify length of historical data to use in the number of years.');
				$('#history').focus();
				pf.comp.util.done();
				return null;
			}
			//req.sd = $('#sd').attr('checked') ? true : false;
			req.img = 1;
			req.sd = false;
			$.cookie('data.pyfia.com', JSON.stringify(req), {expires: 252});	
			return req;
		},
		predict: function() {
			pf.comp.util.wait();
			var req = pyfia.validate();
			if (typeof req === 'undefined' || req==null) {
				pf.comp.util.done();
				return;
			}
			$.ajax({
				url: '/forecast',
				data: req,
				type: 'POST',
				success: function(result) {
					//alert(result);
					pyfia.data = result.response;
					pyfia.reldg = result.imgstr;
					if (pyfia.data && pyfia.data.exception) {
						pyfia.show_warning(pyfia.data.exception +
								(pyfia.data && pyfia.data.clazz ? ' Please double check ' + pyfia.data.clazz + '.' : ''));
					} else if (pyfia.reqpnl && pyfia.reqpnl=='chart') {
						pyfia.show_chart();
					} else {
						pyfia.show_forecast();
					}
					pf.comp.util.done();
				},
				error: function(jqXHR, textStatus, errorThrown) {
					pf.comp.util.done();
				}
			});
		},
		show_forecast: function() {
			if (pyfia.activePanel) pyfia.activePanel.hide();
			if (!pyfia.data) {
				pyfia.reqpnl = 'forecast';
				pyfia.show_ppanel();
				return;
			}
			if (this.result_panel && this.result_panel.destroy) {
				this.result_panel.destroy();
				this.result_panel = null;
			}
			this.result_panel = new pf.comp.panel.forecastResult({id: 'resultPanel', 
				title: 'Prediction', height: pf.comp.util.getDlgHeight(),
				mheight: pyfia.getHeight, mbottom: pyfia.getBottom,
				callbackShow: pyfia.hide_cbtn, callbackHide: pyfia.show_cbtn});
			pyfia.activePanel = this.result_panel;
			this.result_panel.show();
			if (this.toolbar && this.toolbar.show) this.toolbar.show();
		},
		get_amchart_candlestick_data: function(data) {
			var tmpdata = [];
            for(var i=0; i<pyfia.data.cases.length && i<pyfia.data.caseValues.length; i++) {
            	var casestr = pyfia.data.casesStr[i];
            	var casevstr = pyfia.data.caseValues[i];
            	var casevstro = pyfia.data.caseValuesO[i];
            	var casevstrh = pyfia.data.caseValuesH[i];
            	var casevstrl = pyfia.data.caseValuesL[i];
            	var casevstrsd = pyfia.data.caseValuesSD[i];
            	try {
            		tmpdata.push({"date": casestr,
            			"open": casevstro,
            			"high": casevstrh,
            			"low": casevstrl,
						"close": casevstr,
						"volume": casevstrsd
					});
            	} catch(err) {}
            }
            return tmpdata;
        },
		get_amchart_candlestick_data_v3: function(data) {
			var tmpdata = [];
            for(var i=0; i<pyfia.data.cases.length && i<pyfia.data.caseValues.length; i++) {
            	var casestr = pyfia.data.casesStr[i];
            	var casevstr = pyfia.data.caseValues[i];
            	var casevstro = pyfia.data.caseValuesO[i];
            	var casevstrh = pyfia.data.caseValuesH[i];
            	var casevstrl = pyfia.data.caseValuesL[i];
            	var casevstrsd = pyfia.data.caseValuesSD[i];
            	try {
            		tmpdata.push({"date": new Date(casestr),
            			"open": casevstro,
            			"high": casevstrh,
            			"low": casevstrl,
						"close": casevstr,
						"volume": casevstrsd,
						"value": casevstr
					});
            	} catch(err) {}
            }
            return tmpdata;
        },        
		get_fusioncharts_data: function(data) {
			var tmpdata = [];
            for(var i=0; i<pyfia.data.cases.length && i<pyfia.data.caseValues.length; i++) {
            	var casestr = pyfia.data.casesStr[i];
            	var casevstr = pyfia.data.caseValues[i];
            	var casevstro = pyfia.data.caseValuesO[i];
            	var casevstrh = pyfia.data.caseValuesH[i];
            	var casevstrl = pyfia.data.caseValuesL[i];
            	var casevstrsd = pyfia.data.caseValuesSD[i];
            	try {
            		tmpdata.push({"date": casestr,
            			"open": casevstro,
            			"high": casevstrh,
            			"low": casevstrl,
						"close": casevstr,
						"x": i+1,
						"volume": casevstrsd,
						"Date": casestr
					});
            	} catch(err) {}
            }			
			var out = {
				"chart": {
					"caption": "Daily Stock Price " + data.clz,
					"numberprefix": "$",
					"vNumberPrefix": " ",
					"pyaxisname": "Price",
					"vyaxisname": "Volume (In Millions)",
					"bgColor": "#ffffff",
					"showBorder": "1",
					"canvasBgColor": "#ffffff",
					"showCanvasBorder": "0",
					"showAlternateHGridColor": "0",
					"baseFontColor": "#333333",
					"baseFont": "Helvetica Neue,Arial",
					"captionFontSize": "14",
					"subcaptionFontSize": "14",
					"subcaptionFontBold": "0",
					"toolTipColor": "#ffffff",
					"toolTipBorderThickness": "0",
					"toolTipBgColor": "#000000",
					"toolTipBgAlpha": "80",
					"toolTipBorderRadius": "2",
					"toolTipPadding": "5",
					"divlineAlpha": "100",
					"divlineColor": "#999999",
					"divlineThickness": "1",
					"divLineDashed": "1",
					"divLineDashLen": "1",
					"divLineGapLen": "1",
					"plotPriceAs": "CANDLESTICK"
				},
				"categories": [
					{
						"category": [
							{
								"label": data.cases.length + "days ago",
								"x": "1"
							},
							{
								"label": "Today",
								"x": data.cases.length + ""
							}
						]
					}
				],
				"dataset": [{
					"data": tmpdata
				}]				
			};
			return out;
		},
		get_chart_data: function() {
			if (!pyfia.data) return null;
	        function get_chart_date(str) {
				var at = str.split('-');
				return new Date(parseInt(at[0]), parseInt(at[1])-1, parseInt(at[2]), 0, 0, 0, 0);
			}			
            var chartData = [];
            for(var i=0; i<pyfia.data.cases.length && i<pyfia.data.caseValues.length; i++) {
            	var casestr = pyfia.data.casesStr[i];
            	var casevstr = pyfia.data.caseValues[i];
            	try {
            		chartData.push({date: get_chart_date(casestr), val:parseFloat(casevstr)});
            	} catch(err) {}
            }
            return chartData;
		},
		get_highchart_data: function() {
			if (!pyfia.data) return null;
            var chartData = [];
            function get_chart_date(str) {
            	var at = str.split('-');
            	return new Date(parseInt(at[0]), parseInt(at[1])-1, parseInt(at[2]), 0, 0, 0, 0);
            }
            for(var i=0; i<pyfia.data.cases.length && i<pyfia.data.caseValues.length; i++) {
            	var casestr = pyfia.data.casesStr[i];
            	var casevstr = pyfia.data.caseValues[i];
            	try {
					var tmparr = [];
					tmparr.push(get_chart_date(casestr).getTime());
					tmparr.push(parseFloat(casevstr));
            		chartData.push(tmparr);
            	} catch(err) {}
            }
            return chartData;
		},	
		show_chart: function() {
			pf.comp.util.wait();
			try {
				if (pyfia.activePanel) pyfia.activePanel.hide();
				if (!pyfia.data) {
					pyfia.reqpnl = 'chart';
					pyfia.show_ppanel();
					return;
				}
				if (this.chart_panel && this.chart_panel.destroy) {
					this.chart_panel.destroy();
					this.chart_panel = null;
				}
				this.chart_panel = new pf.comp.panel.chart({id: 'chartPanel', title: 'Chart' + (pyfia.data.clazz ?
						' - ' + pyfia.data.clazz.toUpperCase() : ''), height: pf.comp.util.getDlgHeight(), 
						mheight: pyfia.getHeight, mbottom: pyfia.getBottom, callbackShow: pyfia.hide_cbtn, callbackHide: pyfia.show_cbtn});
				pyfia.activePanel = this.chart_panel;
				this.chart_panel.show();
				if (this.toolbar && this.toolbar.show) this.toolbar.show();
			} catch(e) {}
			pf.comp.util.done();
		},
		show_disclaimer: function() {
			if (pyfia.activePanel) pyfia.activePanel.hide();
			if (!this.disclaimer_panel) {
				this.disclaimer_panel = new pf.comp.panel.disclaimer({id: 'disclaimerPanel', 
					title: 'Disclaimer', height: pf.comp.util.getDlgHeight(), draggable: false, 
					mheight: pyfia.getHeight, mbottom: pyfia.getBottom,
					callbackShow: pyfia.hide_cbtn, callbackHide: pyfia.show_cbtn});
			}
			pyfia.activePanel = this.disclaimer_panel;
			this.disclaimer_panel.show();
			/*new pf.comp.promptDialog({id: 'disclaimerPanel', title: 'Disclaimer', button_width: '100px',
				msg: '<br/>' + '<br/>' + pyfia.disclaimer, yes: 'Agree', no: 'Disagree',
				width: (window.innerWidth / 2) + 'px', height: (window.innerHeight / 2) + 'px'}).show();*/
			if (this.toolbar && this.toolbar.hide) this.toolbar.hide();
		},
		show_contact: function() {
			if (pyfia.activePanel) pyfia.activePanel.hide();
			if (!this.contact_panel) {
				this.contact_panel = new pf.comp.panel.contact({id: 'contactPanel', title: 'Contact Us', 
					height: pf.comp.util.getDlgHeight(), 
					mheight: pyfia.getHeight, mbottom: pyfia.getBottom,
					callbackShow: pyfia.hide_cbtn, callbackHide: pyfia.show_cbtn});
			}
			pyfia.activePanel = this.contact_panel;
			this.contact_panel.show();
			if (this.toolbar && this.toolbar.hide) this.toolbar.hide();
		},
		show_aboutus: function() {
			if (pyfia.activePanel) pyfia.activePanel.hide();
			if (!this.aboutus_panel) {
				this.aboutus_panel = new pf.comp.panel.aboutus({id: 'aboutusPanel', title: 'About Us', height: pf.comp.util.getDlgHeight(), 
					mheight: pyfia.getHeight, mbottom: pyfia.getBottom,
					callbackShow: pyfia.hide_cbtn, callbackHide: pyfia.show_cbtn });
			}
			pyfia.activePanel = this.aboutus_panel;
			this.aboutus_panel.show();
			if (this.toolbar && this.toolbar.hide) this.toolbar.hide();
		},
		contact_us: function() {
			pf.comp.util.wait();
			var req = {};
			req.from = $('#contactFrom').val();
			if (!req.from || req.from=='') {
				pyfia.show_warning('Please specify your email address.');
				$('#contactFrom').focus();
				pf.comp.util.done();
				pf.comp.noresize = false;
				return;
			}
			req.subj = $('#contactSubject').val();
			if (!req.subj || req.subj=='') {
				pyfia.show_warning('Please specify your subject.');
				$('#contactSubject').focus();
				pf.comp.util.done();
				pf.comp.noresize = false;
				return;
			}
			req.msg = tinyMCE.get('contactMessage').getContent();
			if (!req.msg || req.msg=='') {
				pyfia.show_warning('Please create a message.');
				$('#contactMessage').focus();
				pf.comp.util.done();
				pf.comp.noresize = false;
				return;
			}
			$.ajax({
				url: '/contactus',
				data: req,
				type: 'POST',
				success: function(result) {
					if (pyfia.contact_panel) pyfia.contact_panel.hide();
					pf.comp.util.done();
					pf.comp.noresize = false;
				},
				error: function(jqXHR, textStatus, errorThrown) {
					if (pyfia.contact_panel) pyfia.contact_panel.hide();
					pf.comp.util.done();
					pf.comp.noresize = false;
				}
			});
		},
		help: function() {
			if (pyfia.activePanel) pyfia.activePanel.hide();
			if (!this.panel_help) {
				this.panel_help = new pf.comp.panel.help({id: 'help', title: 'Help', notoolbar: true, draggable: false, height: pf.comp.util.getDlgHeight()});
			}
			this.panel_help.show();
			if (this.toolbar && this.toolbar.hide) this.toolbar.hide();
		},
		show_data_correlation: function() {
			if (pyfia.activePanel) pyfia.activePanel.hide();
			if (!$.cookie('pyfia.com.sessionid')) {
				if (!this.panel_signin)
					this.panel_signin = new pf.comp.panel.signin({id: 'signin', title: 'Sign In', draggable: true, height: pf.comp.util.getDlgHeight(), 
						mheight: pyfia.getHeight, mbottom: pyfia.getBottom});
				this.panel_signin.show();
				return;
			}
			if (!this.panel_correlation) {
				this.panel_correlation = new pf.comp.panel.correlation({id: 'help', title: 'Download Correlation', draggable: true,
					height: pf.comp.util.getDlgHeight(), mheight: pyfia.getHeight, mbottom: pyfia.getBottom,
					callbackShow: pyfia.hide_cbtn, callbackHide: pyfia.show_cbtn});
			}
			this.panel_correlation.show();
			if (this.toolbar && this.toolbar.hide) this.toolbar.hide();
		},
		download_correlation: function() {
			if (!pyfia.ifrDownload) {
				pyfia.ifrDownload = document.createElement('iframe');
				pyfia.ifrDownload.id = 'ifrdnld';
				pyfia.ifrDownload.width = 0;
				pyfia.ifrDownload.height= 0;
				pyfia.ifrDownload.style.display = 'none';
				pyfia.ifrDownload.onload = function() {
					var f = document.getElementById(pyfia.ifrDownload.id);
					if (f && f.contentWindow &&
							f.contentWindow.document &&
							f.contentWindow.document.documentElement &&
							f.contentWindow.document.documentElement.innerHTML) {
						console.log('ifrdnld.innerHTML='+f.contentWindow.document.documentElement.innerHTML);
					}
				};
				document.body.appendChild(pyfia.ifrDownload);
			}
			pyfia.ifrDownload.src = '/download/corr';
		}
	};
})();

pf.comp.panel.forecastResult = function(cfg) {
	this.$super = new pf.comp.panel(cfg);
	$.extend(this, this.$super);
	this.panel.style.opacity = .75;
	this.panel.style.backgroundColor = '#fffff0';
	this.panel.style.textAlign = 'center';
	this.panel.style.padding = '0px';
	
	this.lst = document.createElement('div');
	this.lst.id = 'corrgraphctn';
	this.lst.style.fontWeight = 700;
	this.lst.style.fontSize = '15px';
	this.lst.style.textAlign = 'left';
	this.lst.style.padding = '5px';
	this.panel.appendChild(this.lst);

	this.show = function() {
		if (!pyfia.data) {
			pyfia.show_ppanel();
			return;
		}
		var dirstr = (pyfia.data.predictionLabel==1 ? 'up' : 'down') + ' <img style="width:20px;height:20px;" src="/resources/images/' +
			(pyfia.data.predictionLabel==1 ? 'uparrow.png' : 'downarrow.png') + '"/> ';
		var content = '<div id="predMsg" style="text-align:left;"><nobr>'+(pyfia.data.clazz+'').toUpperCase() + ' will go ' + dirstr +
			'to $' + pyfia.data.predVal + ' by ' + pyfia.data.target + 
			'.&nbsp;&nbsp;&nbsp;&nbsp;<button style="position:absolute;right:20px;top:40px;z-index:2000;" class="pf-button-forms" '+
			'onclick="javascript:var $scope = angular.element(document.body).scope(); $scope.$apply(function(){$scope.chart();});"'+
			'><i class="fa fa-line-chart"></i>&nbsp;Chart</button>' +
			'</nobr></div>';

		this.$super.show();
		/* if (typeof pyfia.reldg !== 'undefined' && pyfia.reldg != null) {
			var wpadding = 6;
			var defaultImgHeight = 50;
			if (pyfia.reldg) {
				//content += '<img id="imgreldg" onload="javascript:pf.comp.fSizeReldg(\'imgreldg\', false);" alt="relational diagram" src="'+pyfia.reldg+'" />';
				content += '<br/><br/><center><img id="imgreldg" alt="relational diagram" src="'+pyfia.reldg+'" /></center>';
			}
			this.lst.innerHTML = content;
		} else { */
			// D3		
			this.lst.innerHTML = content;
			this.relctn = document.createElement("div");
			this.relctn.id = "relctn";
			this.relctn.align = 'center';
			this.panel.appendChild(this.relctn);
			if (typeof pyfia.data !== 'undefined' && typeof pyfia.data.corrGraphLinks !== 'undefined' && pyfia.data.corrGraphLinks) {
				pf.comp.fSizeReldg('relctn', true);
				new pf.comp.corrgraph({parentid: 'relctn', links: pyfia.data.corrGraphLinks});
			}
			
			// MX Graph
			//var graph = new mxGraph(this.relctn);	
			
			//  Disables basic selection and cell handling
			
			//graph.setEnabled(false);	
			
			//  Changes the default vertex style in-place
			
			//var style = graph.getStylesheet().getDefaultVertexStyle();
			//style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ELLIPSE;
			//style[mxConstants.STYLE_PERIMETER] = mxPerimeter.EllipsePerimeter;
			//style[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
			//style[mxConstants.STYLE_FONTSIZE] = '10';
			
			// Updates the size of the container to match
			// the size of the graph when it changes. If
			// this is commented-out, and the DIV style's
			// overflow is set to "auto", then scrollbars
			// will appear for the diagram. If overflow is
			// set to "visible", then the diagram will be
			// visible even when outside the parent DIV.
			// With the code below, the parent DIV will be
			// resized to contain the complete graph.
			
			//graph.setResizeContainer(true);
				
			//  Larger grid size yields cleaner layout result
			
			//graph.gridSize = 40;	
			
			// Gets the default parent for inserting new cells. This
			// is normally the first child of the root (ie. layer 0).
			
			//var parent = graph.getDefaultParent();	
			
			// Creates a layout algorithm to be used with the graph
			
			//var layout = new mxFastOrganicLayout(graph);
	
			// Moves stuff wider apart than usual
			
			//layout.forceConstant = 80;
	
			// Reference to the transition checkbox
			
			//document.getElementById('animate');
	
			// Adds cells to the model in a single step
			
			//graph.getModel().beginUpdate();
			// w = 30;
			//var h = 30;
			//try {
			//	var vt = graph.insertVertex(parent, null, pyfia.target.cls, 0, 0, w, h);
			//	for (var i=0; i<pyfia.target.attr.length; i++) {
			//		var vp = graph.insertVertex(parent, null, pyfia.target.attr[i], 0, 0, w, h);
			//		graph.insertEdge(parent, null, pyfia.target.attr[i]+'=>'+pyfia.target.cls, vp, vt);
			//
			//	}
	
			//	  Executes the layout
			//	layout.execute(parent);
			//}
			//finally
			//{
			//    Updates the display
			//	graph.getModel().endUpdate();
			//}
		//}
	};
};
pf.comp.fSizeReldg = function(corrgraphid, bstretch) {
	var wpadding = 8;
	var hpadding = 8;
	var maxwidth = $('#resultPanel').width()-wpadding;
	var imgreldg = $('#'+corrgraphid);
	var oimgreldg = document.getElementById(corrgraphid);
	var maxheight = $('#resultPanel').height() - $('#title_resultPanel').height() - $('#resultPanel_pnlmsg').height() - $('#predMsg').height() - hpadding;	
	if (bstretch || imgreldg.width()>maxwidth) imgreldg.width(maxwidth); oimgreldg.style.width = maxwidth + 'px';
	if (bstretch || imgreldg.height()>maxheight) imgreldg.height(maxheight); oimgreldg.style.height = maxheight + 'px';
};
pf.comp.panel.forecast = function(cfg) {
	//pf.comp.panel.call(this, cfg);
	this.$super = new pf.comp.panel(cfg);
	this.$super.id = 'forecastPanel';
	$.extend(this, this.$super);
	this.loaded = false;
	this.predictors = cfg.predictors;
	this.panel.style.opacity = .75;
	this.panel.style.backgroundColor = '#fffff0';
	this.panel.style.textAlign = 'left';
	this.panel.style.padding = '0px';
	this.lst = document.createElement('table');
	this.lst.id = 'predfrm';
	this.lst.align = "center";
	this.lst.border = "3";
	this.lst.cellSpacing = "4";
	this.lst.cellPadding = "4";
	this.lst.style.textAlign = 'center';
	this.lst.style.width = '90%';
	this.lst.style.borderSpacing = "4px";
	this.lst.setAttribute("cellpadding", "4");
	this.lst.setAttribute("cellspacing", "4");
	this.lst.setAttribute("border", "0");
	this.lst.setAttribute("nowrap", "nowrap");
	this.panel.appendChild(this.lst);

	var li = document.createElement('tr');

	this.searchlbl = document.createElement('td');
	this.searchlbl.style.fontWeight = '900';
	this.searchlbl.style.marginTop = '5px';
	this.searchlbl.style.fontSize = '16px';
	this.searchlbl.style.display = 'table-cell';
	this.searchlbl.style.textAlign = 'right';
	this.searchlbl.style.verticalAlign = 'middle';
	this.searchlbl.setAttribute("align", "right");
	this.searchlbl.setAttribute("valign", "middle");
	//this.searchlbl.style.width = '20%';
	this.searchlbl.style.width = '20px';
	this.searchlbl.style.whiteSpace = "nowrap";
	this.searchlbl.style.display = 'table-cell';
	this.searchlbl.innerHTML = 'Stock Symbol&nbsp;&nbsp;&nbsp;';
	li.appendChild(this.searchlbl);

	this.searchctn = document.createElement('td');
	this.search = document.createElement('input');
	this.search.id = 'symbol';
	this.search.style.borderStyle = 'solid';
	this.search.style.borderWidth = '1px';
	this.search.style.borderColor = '#00000f';
	this.search.style.cssFloat = 'left';
	this.search.style.fontSize = '16px';
	this.search.style.width = '100%';
	this.search.style.whiteSpace = "nowrap";
	this.search.style.display = 'table-cell';	
	this.searchctn.style.textAlign = 'left';
	this.searchctn.appendChild(this.search);
	li.appendChild(this.searchctn);
	this.lst.appendChild(li);

	li = document.createElement('tr');
	this.callbl = document.createElement('td');
	this.callbl.style.fontWeight = '900';
	this.callbl.style.marginTop = '5px';
	this.callbl.style.fontSize = '16px';
	this.callbl.style.textAlign = 'right';
	this.callbl.style.verticalAlign = 'middle';
	this.callbl.setAttribute("align", "right");
	this.callbl.setAttribute("valign", "middle");
	this.callbl.style.whiteSpace = "nowrap";
	this.callbl.style.display = 'table-cell';
	this.callbl.innerHTML = 'Target Date&nbsp;&nbsp;&nbsp;';
	li.appendChild(this.callbl);

	this.calctn = document.createElement('td');
	this.calctn.style.textAlign = 'left';
	this.cal = document.createElement('input');
	this.cal.style.borderStyle = 'solid';
	this.cal.style.borderWidth = '1px';
	this.cal.style.borderColor = '#00000f';
	this.cal.style.fontSize = '16px';
	this.cal.style.display = 'table-cell';
	this.cal.style.width = '100%';
	this.cal.id = 'targetDate';
	this.calctn.appendChild(this.cal);
	li.appendChild(this.calctn);
	this.initCal = false;

	this.lst.appendChild(li);

	li = document.createElement('tr');

	this.histlbl = document.createElement('td');
	this.histlbl.style.fontWeight = '900';
	this.histlbl.style.marginTop = '5px';
	this.histlbl.style.fontSize = '16px';
	this.histlbl.innerHTML = 'History (Years)&nbsp;&nbsp;&nbsp;';
	this.histlbl.style.textAlign = 'right';
	this.histlbl.style.verticalAlign = 'middle';
	this.histlbl.setAttribute("align", "right");
	this.histlbl.setAttribute("valign", "middle");
	this.histlbl.style.whiteSpace = "nowrap";
	this.histlbl.style.display = 'table-cell';
	li.appendChild(this.histlbl);

	this.histctn = document.createElement('td');
	this.histctn.style.textAlign = 'left';
	this.hist = document.createElement('input');
	this.hist.style.borderStyle = 'solid';
	this.hist.style.borderWidth = '1px';
	this.hist.style.borderColor = '#00000f';
	this.hist.style.fontSize = '16px';
	this.hist.style.width = '100%';
	this.hist.id = 'history';
	this.hist.style.whiteSpace = "nowrap";
	this.hist.style.display = 'table-cell';	
	this.histctn.appendChild(this.hist);
	li.appendChild(this.histctn);

	this.lst.appendChild(li);

	/*li = document.createElement('tr');

	this.sdlbl = document.createElement('td');
	this.sdlbl.style.fontWeight = '900';
	this.sdlbl.style.marginTop = '5px';
	this.sdlbl.style.fontSize = '16px';
	this.sdlbl.innerHTML = 'Use Volume Data&nbsp;&nbsp;&nbsp;';
	this.sdlbl.style.textAlign = 'right';
	this.sdlbl.style.verticalAlign = 'middle';
	this.sdlbl.setAttribute("align", "right");
	this.sdlbl.setAttribute("valign", "middle");
	li.appendChild(this.sdlbl);

	this.sdctn = document.createElement('td');
	this.sdctn.colspan = 2;
	this.sd = document.createElement('input');
	this.sd.type = 'checkbox';
	this.sdctn.style.textAlign = 'left';
	this.sdctn.style.verticalAlign = 'middle';
	this.sdctn.setAttribute("align", "left");
	this.sdctn.setAttribute("valign", "middle");
	this.sd.id = 'sd';
	this.sdctn.appendChild(this.sd);
	li.appendChild(this.sdctn);*/

	this.lst2 = document.createElement('table');
	this.lst2.id = 'predlbl';
	this.lst2.align = "center";
	this.lst2.border = "3";
	this.lst2.cellSpacing = "4";
	this.lst2.cellPadding = "4";
	this.lst2.style.textAlign = 'center';
	this.lst2.style.width = '90%';
	this.lst2.setAttribute("cellpadding", "4");
	this.lst2.setAttribute("cellspacing", "4");
	this.lst2.setAttribute("border", "0");
	//this.container.appendChild(this.lst);
	this.panel.appendChild(this.lst2);
	
	li = document.createElement('tr');
	this.pprompt = document.createElement('td');
	this.pprompt.align = 'left';
	this.pprompt.setAttribute('align', 'left');
	this.pprompt.style.textAlign = 'center';
	this.pprompt.style.verticalAlign = 'middle';
	this.pprompt.style.fontWeight = 900;
	this.pprompt.innerHTML = '&nbsp;&nbsp;Choose major market indices besides stock\'s historical price:';
	li.appendChild(this.pprompt);
	
	this.searchbtnctn = document.createElement('td');
	this.searchbtnctn.style.width = '20%';
	this.searchbtnctn.setAttribute("nowrap", "nowrap");
	this.searchbtnctn.style.verticalAlign = 'middle';
	try { this.searchbtnctn.align = 'center'; } catch(e) {}
	this.searchbtnctn.setAttribute("align", "center");
	this.searchbtnctn.style.textAlign = 'center';
	this.searchbtnctn.setAttribute("valign", "middle");
	this.searchbtnctn.innerHTML = '&nbsp;<button id="searchbtn" title="Predict" class="pf-button-forms" onclick="javascript:var $scope = angular.element(document.body).scope(); if (typeof $scope !== \'undefined\' && $scope != null) { $scope.$apply(function() { $scope.predict(); }); }">'+
	'<i class="fa fa-magic"></i>&nbsp;Predict'+
	'</button>';
	li.appendChild(this.searchbtnctn);
	
	this.lst2.appendChild(li);
	
	function getSelectHtml(id) {
		var buf = '<div style="width:100%;text-align:left;"><select  style="width:90%;" multiple="multiple" id="' + id +'">';
		for (var igp = 0; igp < pyfia.grouped_predictors.length; igp++) {
			var opgroup = pyfia.grouped_predictors[igp];
			var pgroup = opgroup.group;
			var list = opgroup.list;
			buf += '<optgroup label="'+pgroup+'">';
			for (var il = 0; il<list.length; il++) {
				var ilsymbol = list[il].symbol;
				var ildesc = list[il].desc;
				buf += '<option value="'+ilsymbol+'">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+ilsymbol + ' - '+ ildesc+'</option>';
			}
			buf += '</optgroup>';
		}
		buf += '</select></div>';
		return buf;
	} //end getSelectHtml
	function createIdxTabs(pnl) {
		var divtabs = document.createElement('div');
		divtabs.style.margin = '3px';
		divtabs.id = 'tabspredictor';
		pnl.appendChild(divtabs);
		var ultabs = document.createElement('ul');
		divtabs.appendChild(ultabs);
		for (var igp = 0; igp < pyfia.grouped_predictors.length; igp++) {
			var opgroup = pyfia.grouped_predictors[igp];
			var pgroup = opgroup.group;
			var list = opgroup.list;
			var litab = document.createElement('li');
			var atab = document.createElement('a');
			atab.innerHTML = pgroup;
			var tabid = 'tab-' + pgroup;
			atab.href = '#'+tabid;
			litab.appendChild(atab);
			ultabs.appendChild(litab);
			var divtab = document.createElement('div');
			divtab.style.overflowX = 'hidden';
			divtab.style.overflowY = 'scroll';
			try {
				divtab.style.height = (parseInt(pnl.style.height)/5) + 'px';
			} catch(e) {}
			divtab.id = tabid;
			divtabs.appendChild(divtab);
			for (var il = 0; il<list.length; il++) {
				try {
				var ilsymbol = list[il].symbol;
				var ildesc = list[il].desc;
				var ildiv = document.createElement('div');
				ildiv.style.whiteSpace = 'nowrap';
				ildiv.style.clear = 'right';
				ildiv.style.width = '100%';
				ildiv.style.textAlign = 'left';
				divtab.appendChild(ildiv);
				var pinput = document.createElement('input');
				pinput.type = 'checkbox';
				//pinput.style.cssFloat = 'left';
				//pinput.style.display = 'table-cell';
				pinput.id = 'pinput';
				pinput.value = ilsymbol;
				ildiv.appendChild(pinput);
				var pspan = document.createElement('span');
				//pspan.style.width= '80%';
				//pspan.style.cssFloat = 'right';
				pspan.style.textAlign = 'left';
				//pspan.style.display = 'table-cell';
				pspan.style.fontSize = '14px';
				pspan.style.fontWeight = '700';
				pspan.innerHTML = '&nbsp;&nbsp;&nbsp;'+(!/^\^/.test(ilsymbol) ? '&nbsp;' : '') + ilsymbol + ' - '+ ildesc;
				ildiv.appendChild(pspan);
				} catch(e) {
					if (typeof console !== 'undefined' && console != null && typeof console.log !== 'undefined' && console.log != null) {console.log('error: ' + e);}
				}
			}
		}
	} //end createIdxTabs
	if (pf.comp.isNotNormal()) {
		li = document.createElement('tr');
		this.ctnpred = document.createElement('td');
		this.ctnpred.colspan = 3;
		this.ctnpred.setAttribute('colspan', 3);
		this.ctnpred.align = 'center';
		this.ctnpred.setAttribute('align', 'center');	
		this.ctnpred.style.textAlign = 'center';
		this.ctnpred.innerHTML = getSelectHtml('predLst');
		li.appendChild(this.ctnpred);
		this.lst.appendChild(li);
	} else {
		createIdxTabs(this.panel);
	}
	this.show = function() {
		this.$super.show();
		if (!this.initCal) {
			try {
				$("#targetDate").datepicker({minDate: 1, maxDate: "30D", opacity: 0.75});
				//$("#targetDate").datepicker();
			} catch(e) { }
			this.initCal = true;
		}
		if (!this.loaded) {
			this.load();
			var hpadding = 60;
			var tmpheight = $('#'+this.panel.id).height() - $('#title_'+this.panel.id).height() - 
				$('#predfrm').height() - $('#'+this.pnlmsg.id).height() - hpadding;
			if (pf.comp.isNotNormal()) {
				$('#predLst').dropdownchecklist({maxDropHeight: tmpheight});
			} else {
				var tmp = $("#tabspredictor");
				if (tmp && tmp.length) {
					tmp.tabs();
				}			
				$('[role="tab"]').each(function(){
					$(this).css({'font-size': '10px', 'font-weight': 700});
				});
				//tmp.height(tmpheight);
			}
			this.loaded=true;
		}
	};
	this.load = function() {
		var strdata = $.cookie('data.pyfia.com');
		if (!strdata) return;
		var req = JSON.parse(strdata);
		$('#symbol').val(req.cls);
		$("#targetDate").val(req.dt);
		$('#history').val(req.hist);
		//$('#sd').attr('checked', req.sd == true ? true : false);
		var arp = ',' + req.attrib + ',';
		(pf.comp.isNotNormal() ? $("#predLst option") : $("[id='pinput']")).each(function(){
			$(this).attr('checked', arp.indexOf(','+$(this).val()+',')>-1);
			$(this).attr('selected', arp.indexOf(','+$(this).val()+',')>-1);
			$(this).prop('checked', arp.indexOf(','+$(this).val()+',')>-1);
			$(this).prop('selected', arp.indexOf(','+$(this).val()+',')>-1);
		});
	};
};

pf.comp.panel.chart = function(cfg) {
	this.chart = function() {
		try {
			var tmpbr = document.createElement('br');
			this.panel.appendChild(tmpbr);
			this.pchart = document.createElement('div');
			this.pchart.id = 'chartPanelContent';
			this.pchart.style.position = 'absolute';
			this.pchart.style.top = '30px';
			this.pchart.style.left = '2px';
			this.pchart.style.padding = '0px';
			this.panel.appendChild(this.pchart);
			var tmpdiv = $('#'+this.panel.getAttribute('id'));
			var tmpwidth = tmpdiv.width()-10;
			var tmpheight = tmpdiv.height()-54;

			//Fusion Chart - Performance issue.
			//this.fusionChart = pf.comp.panel.chart_fusion({id: this.pchart.id, width: tmpwidth, height: tmpheight, data: pyfia.get_fusioncharts_data(pyfia.data)});

			//Highcharts: Deprecated, performance issue.
			//pf.comp.panel.chart_high({id: this.pchart.id, data: pyfia.get_highchart_data()});
			
			//AmStocks: Deprecated.
			/*
			this.chart = pf.comp.panel.chart_amstocks({id: this.pchart.id, title: pyfia.data.clazz, 
				fromField: "val", toField: "value", categoryField: "date", data: pyfia.get_chart_data(),
				imgPath: "/resouces/scripts/amcharts/images/"});
			*/

			//pf.comp.panel.chart_amcharts({id: this.pchart.id, width: tmpwidth, height: tmpheight, data: pyfia.get_amchart_candlestick_data(pyfia.data)});
			
			pf.comp.panel.chart_amchartv3({id: this.pchart.id, width: tmpwidth, height: tmpheight, title: pyfia.data.clazz, data: pyfia.get_amchart_candlestick_data_v3(pyfia.data)});

		} catch(err) {
			if (console && typeof(console)!=='undefined') console.log(err && err.message ? err.message : 'Error drawing chart.');
		}	
	}

	this.$super = new pf.comp.panel(cfg);
	$.extend(this, this.$super);
	this.panel.style.opacity = .75;
	this.panel.style.backgroundColor = '#fffff0';
	this.panel.style.textAlign = 'center';
	this.panel.style.padding = '0px';
	this.panel.innerHTML += '&nbsp;<button id="searchbtn" title="Predict" class="pf-button-forms" style="position:absolute;right:20px;top:40px;z-index:999;" onclick="javascript:var $scope = angular.element(document.body).scope(); if (typeof $scope !== \'undefined\' && $scope != null) { $scope.$apply(function() { $scope.prediction(); }); }">'+
		'<i class="fa fa-magic"></i>&nbsp;Prediction'+
		'</button>';
	this.show = function() {
		this.$super.show();
		this.chart();
		//this.volumeChart();
	};
};

pf.comp.panel.chart_amchartv3 = function(cfg) {
	$('#'+cfg.id).width(cfg.width).height(cfg.height).css({padding: '0px'});
	var chart = AmCharts.makeChart(cfg.id, {
	  "type": "stock",
	  "theme": "light",
	  "dataSets": [ {
		"fieldMappings": [ {
		  "fromField": "open",
		  "toField": "open"
		}, {
		  "fromField": "close",
		  "toField": "close"
		}, {
		  "fromField": "high",
		  "toField": "high"
		}, {
		  "fromField": "low",
		  "toField": "low"
		}, {
		  "fromField": "volume",
		  "toField": "volume"
		}, {
		  "fromField": "value",
		  "toField": "value"
		} ],
		"color": "#7f8da9",
		"dataProvider": cfg.data,
		"title": cfg.title,
		"categoryField": "date"
	  } ],


	  "panels": [ {
		  "title": "Value",
		  "showCategoryAxis": false,
		  "percentHeight": 70,
		  "valueAxes": [ {
			"id": "v1",
			"dashLength": 5
		  } ],

		  "categoryAxis": {
			"dashLength": 5
		  },

		  "stockGraphs": [ {
			"type": "candlestick",
			"id": "g1",
			"openField": "open",
			"closeField": "close",
			"highField": "high",
			"lowField": "low",
			"valueField": "close",
			"lineColor": "#7f8da9",
			"fillColors": "#7f8da9",
			"negativeLineColor": "#db4c3c",
			"negativeFillColors": "#db4c3c",
			"fillAlphas": 1,
			"useDataSetColors": false,/*
			"comparable": true,
			"compareField": "value",*/
			"showBalloon": false,
			"proCandlesticks": true
		  } ],

		  "stockLegend": {
			"valueTextRegular": undefined /*,
			"periodValueTextComparing": "[[percents.value.close]]%" */
		  }
		},

		{
		  "title": "Volume",
		  "percentHeight": 30,
		  "marginTop": 1,
		  "showCategoryAxis": true,
		  "valueAxes": [ {
			"dashLength": 5
		  } ],

		  "categoryAxis": {
			"dashLength": 5
		  },

		  "stockGraphs": [ {
			"valueField": "volume",
			"type": "column",
			"showBalloon": false,
			"fillAlphas": 1
		  } ],

		  "stockLegend": {
			"markerType": "none",
			"markerSize": 0,
			"labelText": "",
			"periodValueTextRegular": "[[value.close]]"
		  }
		}
	  ],

	  "chartScrollbarSettings": {
		"graph": "g1",
		"graphType": "line",
		"usePeriod": "WW"
	  },

	  "chartCursorSettings": {
		"valueLineBalloonEnabled": true,
		"valueLineEnabled": true
	  },

	  "periodSelector": {
		"position": "bottom",
		"periods": [ {
		  "period": "DD",
		  "count": 10,
		  "label": "10 days"
		}, {
		  "period": "MM",
		  "selected": true,
		  "count": 1,
		  "label": "1 month"
		}, {
		  "period": "YYYY",
		  "count": 1,
		  "label": "1 year"
		}, {
		  "period": "YTD",
		  "label": "YTD"
		}, {
		  "period": "MAX",
		  "label": "MAX",
		  "selected": true
		} ]
	  },
	  "export": {
		"enabled": false
	  }
	} );
};

pf.comp.panel.chart_fusion = function(cfg) {
	var fusionChart = new FusionCharts({
		"type": "candlestick",
		"renderAt": cfg.id,
		"width": cfg.width + "",
		"height": cfg.height + "",
		"dataFormat": "json",
		"dataSource": ffg.data
		});
	fusionChart.render();
	return fusionChart;
};

pf.comp.panel.chart_high = function(cfg) {
	$('#' + cfg.id).highcharts('StockChart', {
		rangeSelector : {
			selected : 1
		},
		title : {
			text : pyfia.data.clazz
		},

		series : [{
			name : pyfia.data.clazz,
			data : cfg.data,
			tooltip: {
				valueDecimals: 2
			}
		}]
	});
};

pf.comp.panel.chart_amstocks = function(cfg) {
	var chart = new AmCharts.AmStockChart();
	chart.pathToImages = cfg.imgPath;
	var dataSet = new AmCharts.DataSet();
	dataSet.color = "#0099CC";
	dataSet.dataProvider = cfg.data;
	dataSet.fieldMappings = [{fromField: cfg.fromField, toField: cfg.toField}];
	dataSet.categoryField = cfg.categoryField;
	chart.dataSets = [dataSet];
	var stockPanel = new AmCharts.StockPanel();
	chart.panels = [stockPanel];
	var panelsSettings = new AmCharts.PanelsSettings();
	panelsSettings.startDuration = 1;
	chart.panelsSettings = panelsSettings;
	var graph = new AmCharts.StockGraph();
	graph.bullet = "round";
	graph.valueField = "value";
	graph.title = cfg.title;
	stockPanel.addStockGraph(graph);
	chart.write(cfg.id);
	return chart;
}

pf.comp.panel.chart_amcharts = function(cfg) {
	$('#'+cfg.id).width(cfg.width).height(cfg.height).css({padding: '0px'});
	var chart = AmCharts.makeChart( cfg.id, {
	  "type": "serial",
	  "theme": "light",
	  "dataDateFormat":"YYYY-MM-DD",
	  "path": "/resources/scripts/amcharts3/",
	  "valueAxes": [ {
		"position": "left"
	  } ],
	  "graphs": [ {
		"id": "g1",
		"balloonText": "Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b><br>",
		"closeField": "close",
		"fillColors": "#7f8da9",
		"highField": "high",
		"lineColor": "#7f8da9",
		"lineAlpha": 1,
		"lowField": "low",
		"fillAlphas": 0.9,
		"negativeFillColors": "#db4c3c",
		"negativeLineColor": "#db4c3c",
		"openField": "open",
		"title": "Price:",
		"type": "candlestick",
		"valueField": "close"
	  } ],
	  "chartCursor": {
		"valueLineEnabled": true,
		"valueLineBalloonEnabled": true
	  },
	  "categoryField": "date",
	  "categoryAxis": {
		"parseDates": true
	  },
	  "dataProvider": cfg.data
	} );

	//var volumeChart = function() {
		  var chart = AmCharts.charts[ 0 ];
		  if ( chart.panels.length == 1 ) {
			var newPanel = new AmCharts.StockPanel();
			newPanel.allowTurningOff = true;
			newPanel.title = "Volume";
			newPanel.showCategoryAxis = false;

			var graph = new AmCharts.StockGraph();
			graph.valueField = "volume";
			graph.fillAlphas = 0.15;
			newPanel.addStockGraph( graph );

			var legend = new AmCharts.StockLegend();
			legend.markerType = "none";
			legend.markerSize = 0;
			newPanel.stockLegend = legend;

			chart.addPanelAt( newPanel, 1 );
			chart.validateNow();
		  }		
	//}
}

pf.comp.panel.disclaimer = function(cfg) {
	//pf.comp.panel.call(this, cfg);
	this.$super = new pf.comp.panel(cfg);
	$.extend(this, this.$super);
	this.panel.style.opacity = .75;
	this.panel.style.backgroundColor = '#fffff0';
	this.panel.style.textAlign = 'center';
	this.panel.style.padding = '0px';
	
	this.dpnl = document.createElement('div');
	this.dpnl.id = 'disclaimer_txt';
	this.dpnl.style.textAlign = 'left';
	this.dpnl.style.overflow = 'auto';
	this.dpnl.style.whiteSpace = 'normal';
	this.dpnl.style.wordWrap = 'normal';
	$('#'+this.dpnl.id).css({'text-align': 'left'});
	this.dpnl.style.fontSize = '16px';
	this.dpnl.style.padding = '10px';
	this.dpnl.innerHTML = pyfia.disclaimer;
	this.panel.appendChild(this.dpnl);
	
	this.btnctn = document.createElement('table');
	this.btnctn.id = 'disclaimer_ctn';
	this.btnctn.style.width = '100%';
	this.btnctn.style.position = 'absolute';
	this.btnctn.style.bottom = '8px';
	this.btnctn.style.padding = '20px';
	this.panel.appendChild(this.btnctn);
	var btnrow = document.createElement('tr');
	this.btnctn.appendChild(btnrow);
	var btnleft = document.createElement('td');
	btnleft.align='center';
	btnleft.setAttribute('align', 'center');
	btnleft.width = '50%';
	btnrow.appendChild(btnleft);
	btnleft.innerHTML = '<button style="width:80%;" class="pf.button.forms" onclick="javascript:if (pyfia.activePanel) pyfia.activePanel.hide();pyfia.show_cbtn();"><i class="fa fa-thumbs-up"></i>&nbsp;&nbsp;&nbsp;Agree&nbsp;&nbsp;&nbsp;</button>';
	var btnright = document.createElement('td');
	btnright.align='center';
	btnright.setAttribute('align', 'center');
	btnright.width = '50%';
	btnrow.appendChild(btnright);
	btnright.innerHTML = '<button style="width:80%;" class="pf.button.forms" onclick="javascript:location.href=\'http://www.google.com\';"><i class="fa fa-thumbs-down"></i>&nbsp;&nbsp;&nbsp;Disagree&nbsp;&nbsp;&nbsp;</button>';

	this.show = function() {
		this.$super.show();
		var tmppanel = $('#'+this.panel.id);
		var tmpbtnctn = $('#'+this.btnctn.id);
		var tmpdpnl = $('#'+this.dpnl.id);
		var tmptitle = $('#'+this.title.id);
		var wpadding = 10;
		
		var tmpheight = tmppanel.height()-tmpbtnctn.height()*2-tmptitle.height()-parseInt(this.btnctn.style.bottom);
		var tmpwidth = tmppanel.width()-wpadding; 
		tmpdpnl.height(tmpheight);
		tmpdpnl.width(tmpwidth);	
	};
};

pf.comp.panel.aboutus = function(cfg) {
	//pf.comp.panel.call(this, cfg);
	this.$super = new pf.comp.panel(cfg);
	$.extend(this, this.$super);
	this.panel.style.opacity = .75;
	this.panel.style.backgroundColor = '#fffff0';
	this.panel.style.textAlign = 'center';
	this.panel.style.padding = '0px';
	if (!pf.comp.isNotNormal()) {
		this.panel.style.height = Math.round($(window).height() * 2 / 3)+'px';
	}	
	var tmpbr = document.createElement('br');
	this.panel.appendChild(tmpbr);
	tmpbr = document.createElement('br');
	this.panel.appendChild(tmpbr);
	this.dpnl = document.createElement('div');
	this.dpnl.id = 'aboutus';
	this.dpnl.style.textAlign = 'left';
	this.dpnl.style.clear = 'both';
	$('#'+this.dpnl.id).css({'text-align': 'left'});
	this.dpnl.style.padding = '10px';
	this.dpnl.innerHTML = 'Pyfia.com is a premium provider of data, service and software for your big data analytics needs. Visit us on the Android Playstore and the Apple iTunes Store. <a href="javascript:pyfia.show_contact();" style="text-decoration:none;color:#000000;">Or contact us.</a>';
	this.panel.appendChild(this.dpnl);
	var btnctn = document.createElement('table');
	btnctn.id = 'storeButtonsContainer';
	btnctn.style.width = '100%';
	//btnctn.style.position = 'absolute';
	//btnctn.style.bottom = '8px';
	btnctn.style.padding = '20px';
	this.panel.appendChild(btnctn);
	var btnrow = document.createElement('tr');
	btnctn.appendChild(btnrow);
	var btnleft = document.createElement('td');
	btnrow.appendChild(btnleft);
	btnleft.width = '50%';
	btnleft.align = 'center';
	btnleft.innerHTML = '<a href="https://play.google.com/store" target="_blank" style="text-decoration:none;border:none;background-color:#cccccc;margin:0px auto;cursor:pointer;"><img style="text-decoration:none;border:none;" src="/resources/images/google_play_en.png"/></a>';
	var btnright = document.createElement('td');
	btnright.width = '50%';
	btnrow.appendChild(btnright);
	btnright.align = 'center';
	btnright.innerHTML = '<a href="http://www.apple.com/itunes" target="_blank" style="text-decoration:none;border:none;background-color:#cccccc;margin:0px auto;cursor:pointer;"><img style="text-decoration:none;border:none;" src="/resources/images/apple_store_en.png"/></a>';
	this.dpnlContent = document.createElement('div');
	this.dpnlContent.id = 'roundabout-container';
	function getHtmlIE() {
		return '<div id="roundabout-1" class="roundabout">'+
	    '<div class="roundabout-feature">'+
	      '<a href="#"><img class="roundabout-image" style="width:200px;height:101px" alt="" src="/resources/images/aboutus/roundabout/pyfia.png"></a>'+
	    '</div>'+
	    '<div class="roundabout-feature">'+
	      '<a href="#"><img class="roundabout-image" style="width:200px;height:132px" alt="" src="/resources/images/aboutus/roundabout/pyfia.android.png"></a>'+
	    '</div>'+
	    '<div class="roundabout-feature">'+
	      '<a href="#"><img class="roundabout-image" style="width:200px;height:188px" alt="" src="/resources/images/aboutus/roundabout/pyfia.android_phone.png"></a>'+
	    '</div>'+
		'</div>';
	}
	function getHtml() {
		return '<ul style="list-style: none;width:'+(parseInt(window.innerWidth / 3.2))+'px;height:'+(parseInt(window.innerHeight / 5))+'px;" id="roundabout_aboutus">'+
        '<li style="text-align: center;cursor: pointer;"><img src="/resources/images/aboutus/roundabout/pyfia.png"></li>'+
        '<li style="text-align: center;cursor: pointer;"><img src="/resources/images/aboutus/roundabout/pyfia.android.png"></li>'+
        '<li style="text-align: center;cursor: pointer;"><img src="/resources/images/aboutus/roundabout/pyfia.android_phone.png"></li>'+
        '</ul>';
	}
	//this.dpnlContent.innerHTML = pf.comp.util.isie() ? getHtmlIE() : getHtml();
	this.dpnlContent.innerHTML = getHtmlIE();
	this.panel.appendChild(this.dpnlContent);		
	this.initRoundAbout = false;
	
	this.show = function() {
		this.$super.show();
		var wpadding = 10;
		$('#roundabout-container').height($('#'+this.panel.id).height()-$('#roundabout-container').position().top)
			.width($('#'+this.panel.id).width()-wpadding);		
		if (!this.initRoundAbout) {
			//if (pf.comp.util.isie()) {
				pf.comp.roundabout = {
					dimlu: {},
					init: function() {
						$.each($.find('.roundabout-image'), function() {
							pf.comp.roundabout.dimlu[$(this).attr('src')] = {w: $(this).width(), h: $(this).height()};
						});
						if (typeof console !== 'undefined' && console.log)
						for (s in pf.comp.roundabout.dimlu) {
							var d = pf.comp.roundabout.getldim(s);
							console.log('pf.comp.roundabout.init(), s='+s+',w='+d.w+',h='+d.h);
						}
					},
					getldim: function(s) {
						var out = pf.comp.roundabout.dimlu[s];
						//if (typeof console !== 'undefined' && console.log) console.log('getldim() for '+s+', w='+out.w+',h='+out.h);
						return out;
					},
					getsdim: function(s) {
						var d = pf.comp.roundabout.dimlu[s];
						//if (typeof console !== 'undefined' && console.log) console.log('getsdim() for '+s+', w='+(d.w/2)+',h='+(d.h/2));
						return {w: d.w/2, h: d.h/2};
					}
				};
				pf.comp.roundabout.init();					
				$("#roundabout-1").featureCarousel({
				    largeFeatureWidth:  roundabout_options.roundabout_largeFeatureWidth,
				    largeFeatureHeight:	roundabout_options.roundabout_largeFeatureHeight,
				    smallFeatureWidth:  roundabout_options.roundabout_smallFeatureWidth,
				    smallFeatureHeight:	roundabout_options.roundabout_smallFeatureHeight,
				    topPadding:         roundabout_options.roundabout_topPadding,
				    sidePadding:        roundabout_options.roundabout_sidePadding,
				    smallFeatureOffset:	roundabout_options.roundabout_smallFeatureOffset,
				    startingFeature:    roundabout_options.roundabout_startingFeature,
				    roundaboutSpeed:      roundabout_options.roundabout_roundaboutSpeed,
				    autoPlay:           roundabout_options.roundabout_autoPlay,
				    pauseOnHover:       roundabout_options.roundabout_pauseOnHover,
				    stopOnHover:        roundabout_options.roundabout_stopOnHover,
				    trackerSummation:   'false',
				    preload:            'true',
				    displayCutoff:      roundabout_options.roundabout_displayCutoff,
				    animationEasing:    roundabout_options.roundabout_animationEasing,
				    captionBelow:       roundabout_options.roundabout_captionBelow,
				    fadeOpacity:		roundabout_options.roundabout_fadeOpacity,
					getldim: 			pf.comp.roundabout.getldim,
					getsdim: 			pf.comp.roundabout.getsdim
				        });
			/*} else {
				$('#roundabout_aboutus').roundabout({autoplay: true,
			    autoplayDuration: 5000,
			    autoplayPauseOnHover: true});
			}*/
			this.initRoundAbout=true;
		}
	};
};

pf.comp.panel.contact = function(cfg) {
	this.$super = new pf.comp.panel(cfg);
	$.extend(this, this.$super);
	if (!pf.comp.isNotNormal()){
		this.panel.style.height = Math.round($(window).height() * 2 / 3)+'px';
	}
	this.panel.style.opacity = .75;
	this.panel.style.backgroundColor = '#fffff0';
	this.panel.style.textAlign = 'center';
	this.panel.style.padding = '0px';
	
	this.pbody = document.createElement('table');
	this.pbody.id = "bodyContactus";
	this.pbody.setAttribute("width", "100%");
	this.pbody.setAttribute("cellpadding", "0");
	this.pbody.setAttribute("cellspacing", "0");
	this.pbody.cellpadding = 0;
	this.pbody.cellspacing = 0;
	this.pbody.style.width = '100%';
	$('#'+this.pbody.id).css({width: '100%'});
	//From Row
	var tmptr = document.createElement('tr');
	tmptr.id = 'rowContactFrom';
	this.pbody.appendChild(tmptr);
	//From Label
	var tmptd = document.createElement('td');
	tmptd.setAttribute('width', '10%');
	tmptd.width = '10%';
	tmptd.style.width = '10%';
	tmptd.style.height = '24px';
	tmptd.align = 'right';
	tmptd.setAttribute('align', 'right');
	tmptd.style.verticalAlign = 'top';
	tmptd.verticalAlign = 'top';
	tmptd.setAttribute('verticalAlign', 'top');
	tmptd.innerHTML = 'From:&nbsp;&nbsp;&nbsp;';
	tmptr.appendChild(tmptd);
	//From Input
	tmptd = document.createElement('td');
	tmptd.setAttribute('width', '80%');
	tmptd.width = '80%';
	tmptd.style.height = '24px';
	tmptd.align = 'left';
	tmptd.setAttribute('align', 'left');
	tmptd.style.verticalAlign = 'top';
	tmptd.verticalAlign = 'top';
	tmptd.setAttribute('verticalAlign', 'top');	
	tmptd.innerHTML = '<input type="text" id="contactFrom" name="contactFrom" style="width:90%; border:1px solid #00000f;border-radius:0px;">';
	tmptr.appendChild(tmptd);
	//Send Button
	tmptd = document.createElement('td');
	tmptd.setAttribute('width', '10%');
	tmptd.width = '10%';
	tmptd.style.height = '24px';
	tmptd.align = 'left';
	tmptd.setAttribute('align', 'left');
	tmptd.innerHTML = '<button class="pf-button-forms" id="contactSend" onclick="javascript:var $scope=angular.element(document.body).scope(); $scope.$apply(function(){ $scope.contact_us();});"><i class="fa fa-paper-plane"></i>&nbsp;Send</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	tmptr.appendChild(tmptd);	
	//Subject Row
	var tmptr2 = document.createElement('tr');
	tmptr2.id = 'rowContactSubject';
	this.pbody.appendChild(tmptr2);
	//Subject Label
	tmptd = document.createElement('td');
	tmptd.style.height = '24px';
	tmptd.align = 'right';
	tmptd.setAttribute('align', 'right');
	tmptd.style.verticalAlign = 'top';
	tmptd.verticalAlign = 'top';
	tmptd.setAttribute('verticalAlign', 'top');	
	tmptd.innerHTML = 'Subject:&nbsp;&nbsp;&nbsp;';
	tmptr2.appendChild(tmptd);
	//Subject Input
	tmptd = document.createElement('td');
	tmptd.style.height = '24px';
	tmptd.align = 'left';
	tmptd.setAttribute('align', 'left');
	tmptd.style.verticalAlign = 'top';
	tmptd.verticalAlign = 'top';
	tmptd.setAttribute('verticalAlign', 'top');	
	tmptd.innerHTML = '<input type="text" id="contactSubject" name="contactSubject" style="width:90%; border:1px solid #00000f;border-radius:0px;">';
	tmptr2.appendChild(tmptd);
	//Subject Row Empty 3rd Cell
	tmptd = document.createElement('td');
	tmptd.setAttribute('width', '10%');
	tmptd.width = '10%';
	tmptd.style.height = '24px';
	tmptd.align = 'right';
	tmptd.setAttribute('align', 'right');
	tmptd.innerHTML = '&nbsp;';
	tmptr.appendChild(tmptd);
	//Message
	var tmptr3 = document.createElement('tr');
	this.pbody.appendChild(tmptr3);
	tmptd = document.createElement('td');
	tmptd.setAttribute('colspan', '3');
	tmptd.colspan = '3';
	tmptd.setAttribute('align', 'center');
	tmptd.align = 'center';
	tmptd.style.margin = '0px';
	tmptr3.appendChild(tmptd);
	tmptd.innerHTML = '<textarea id="contactMessage" ' +
		(pf.comp.isNotNormal() ? '' : 'width="98%" ') +
		(pf.comp.isNotNormal() ? '' : 'style="width:98%;" ') + ' name="contactMessage"></textarea>';
	//Send button
	/*this.btnrow = document.createElement('tr');
	this.pbody.appendChild(this.btnrow);
	this.btnctn = document.createElement('td');
	this.btnctn.setAttribute('colspan', '2');
	this.btnctn.style.height = '24px';
	this.btnctn.colspan = '2';
	this.btnrow.appendChild(this.btnctn);
	this.btnctn.align = 'right';
	this.btnctn.nowrap = 'nowrap';
	this.btnctn.setAttribute('nowrap', 'nowrap');
	this.btnctn.style.whiteSpace = 'nowrap';
	this.btnctn.setAttribute('align', 'right');
	this.btnctn.innerHTML = '<button style="position:absolute;right:20px;top:40px;z-index:999;" class="pf-button-forms" id="contactSend" onclick="javascript:var $scope=angular.element(document.body).scope(); $scope.$apply(function(){ $scope.contact_us();});"><i class="fa fa-paper-plane"></i>&nbsp;Send</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	*/
	this.panel.appendChild(this.pbody);
	this.init = false;
	this.show = function() {
		this.$super.show();
		var cmth = parseInt(this.panel.style.height) -  $('#rowContactFrom').height() - 
		$('#rowContactSubject').height() - $('#'+'title_'+this.panel.id).height() - 
		$('#'+this.panel.id+'_pnlmsg').height() - 70;		
		if (!this.init) {
			tinyMCE.init({
				// General options
				mode : "textareas",
				theme : "advanced",
				plugins : "autolink,lists,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,wordcount,advlist,autosave,visualblocks",

				// Theme options
				theme_advanced_buttons1 : "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,cut,copy,paste,pastetext,pasteword",
				theme_advanced_buttons2 : "search,replace,|,bullist,numlist,|,outdent,indent,|,link,unlink",
				theme_advanced_toolbar_location : "top",
				theme_advanced_toolbar_align : "left",
				theme_advanced_statusbar_location : "bottom",
				theme_advanced_resizing : true,

				// Example content CSS (should be your site CSS)
				content_css : "/resources/scripts/tiny_mce/themes/advanced/skins/o2k7/content.css",

				// Style formats
				style_formats : [
					{title : 'Bold text', inline : 'b'},
					{title : 'Red text', inline : 'span', styles : {color : '#ff0000'}},
					{title : 'Red header', block : 'h1', styles : {color : '#ff0000'}},
					{title : 'Example 1', inline : 'span', classes : 'example1'},
					{title : 'Example 2', inline : 'span', classes : 'example2'},
					{title : 'Table styles'},
					{title : 'Table row 1', selector : 'tr', classes : 'tablerow1'}
				],
				height: cmth
			});
			this.init = true;
		}
	};
};

pf.comp.panel.help = function(cfg) {
	this.$super = new pf.comp.panel(cfg);
	$.extend(this, this.$super);
	this.panel.style.opacity = 1;
	this.panel.style.backgroundColor = '#ffffff';
	this.panel.style.textAlign = 'center';
	this.panel.style.padding = '0px';
	this.panel.style.border = 'none';
	this.panel.style.borderRadius = '0px';
	this.panel.style.zIndex = 2000;
	this.$super.show_callback = function() {
		var hpadding=5;
		var new_height = $(window).height()-24-(pf.comp.util.isie() ? hpadding : 0);
		function getVideoHtml5(nh) {
			return '<video width="'+$(window).width()+'" height="'+nh+'" id="pyfia_help" style="position:absolute;top:24px;left:0px;z-index:1003;" poster="/resources/images/pyfia.png" controls="controls" preload="none" src="/resources/videos/pyfia.mp4">'
				+ '<source type="video/mp4" src="/resources/videos/pyfia.mp4" />'
				+ '<source type="video/webm" src="/videos/pyfia.webm" />'
				+ '<source type="video/ogg" src="/videos/pyfia.ogg" />'
				+ '<object width="'+$(window).width()+'" height="'+nh+'" type="application/x-shockwave-flash" data="/resources/videos/pyfia.swf">'
					+'<param name="movie" value="/resources/videos/pyfia.swf" />'
					+'<param name="allowFullScreen" value="true" />'
					+'<param name="wmode" value="transparent" />'
					+'<param name="flashvars" value="controls=true&file=/resources/videos/pyfia.mp4" />'
					//+'<param name="flashVars" value="config={'playlist':['http%3A%2F%2Fsandbox.thewikies.com%2Fvfe-generator%2Fimages%2Fbig-buck-bunny_poster.jpg',{'url':'http%3A%2F%2Fclips.vorwaerts-gmbh.de%2Fbig_buck_bunny.mp4','autoPlay':false}]}" />'
					+'<img alt="No video playback capabilities" src="/resources/images/pyfia.png" width="'+$(window).width()+'" height="'+nh+'" title="No video playback capabilities" />'
				+ '</object>'
				+ '</video>';
		}
		function getVideoObject(nh) {
			return '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="'+$(window).width()+'" height="'+nh+'" id="pyfia_help" style="position:absolute;top:24px;left:0px;z-index:1003;"  align="middle">'+
			    '<param name="movie" value="/resources/videos/pyfia.swf"/>'+
			    '<!--[if !IE]>-->'+
			    '<object type="application/x-shockwave-flash" data="/resources/videos/pyfia.swf" width="'+$(window).width()+'" height="'+nh+'">'+
			    '    <param name="movie" value="/resources/videos/pyfia.swf"/>'+
			    '<!--<![endif]-->'+
			    '    <a href="http://www.adobe.com/go/getflash">'+
			    '        <img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player"/>'+
			    '    </a>'+
			    '<!--[if !IE]>-->'+
			    '</object>'+
			    '<!--<![endif]-->'+
			    '</object>';
		}
		function getVideoEmbedded(nh) {
			return '<embed src="/resources/videos/pyfia.swf" id="pyfia_help" style="position:absolute;top:24px;left:0px;z-index:1003;" '+
					    'quality="high" '+
					    '    bgcolor="#ffffff" '+
					    '    width="'+$(window).width()+'" '+
					    '    height="'+nh+'" '+
					    '    name="pyfia_help" '+
					    '    align="middle" '+
					    '    allowScriptAccess="sameDomain" '+
					    '    allowFullScreen="false" '+
					    '    type="application/x-shockwave-flash" '+
					    '    pluginspage="http://www.adobe.com/go/getflash" ' +
					    '	CONTROLS="true" '+
					    '/>';
		}
		var p = $('#help');
		p.width($(window).width());
		p.height($(window).height());
		p.css({top: 0, left: 0});
		var videoEmbedded = pf.comp.isNotNormal() ? getVideoHtml5(new_height) : (/Firefox/.test(BrowserDetect.browser) ? getVideoEmbedded(new_height) : getVideoObject(new_height));
		var htmlbtn = '<img onclick="javascript:$(\'#help\').hide();" src="/resources/images/close_button_grey.png" style="position:absolute;top:5px;right:16px;'+
		'cursor:pointer;width:20px;height:20px;z-index:1004;" width="20" height="20"/>';
		p.html(videoEmbedded+htmlbtn);
	};
	this.show = function() {
		this.$super.show();
	};
};

pf.comp.panel.correlation = function(cfg) {
	//pf.comp.panel.call(this, cfg);
	this.$super = new pf.comp.panel(cfg);
	$.extend(this, this.$super);
	this.panel.style.opacity = .75;
	this.panel.style.backgroundColor = '#fffff0';
	this.panel.style.textAlign = 'center';
	this.panel.style.padding = '0px';
	var tmpbr = document.createElement('br');
	this.panel.appendChild(tmpbr);
	this.dpnl = document.createElement('div');
	this.dpnl.id = 'disclaimer_txt';
	this.dpnl.style.textAlign = 'left';
	$('#'+this.dpnl.id).css({'text-align': 'left'});
	this.dpnl.style.fontSize = '18px';
	this.dpnl.style.padding = '20px';
	this.dpnl.innerHTML = '<br/><br/>Download historical correction data between the most common stocks and the major indices.';
	this.panel.appendChild(this.dpnl);
	var btnctn = document.createElement('div');
	btnctn.style.width = '95%';
	btnctn.style.position = 'absolute';
	btnctn.style.bottom = '0px';
	btnctn.style.padding = '20px';
	this.panel.appendChild(btnctn);
	var btn = document.createElement('div');
	btn.style.width = this.cfg && this.cfg.button_width ? this.cfg.button_width : '120px';
	btn.style.textAlign = 'center';
	btn.style.height = '20px';
	btn.style.fontWeight = 700;
	btn.style.border = '1px solid #00000f';
	btn.innerHTML = "Download";
	btn.style.backgroundColor = '#cccccc';
	btn.style.margin = '0px auto';
	btn.style.cursor = 'pointer';
	btn.onclick = function() { pyfia.download_correlation(); };
	btnctn.appendChild(btn);
	this.show = function() {
		this.$super.show();
	};
};
pf.comp.panel.signin = function(cfg) {
	//pf.comp.panel.call(this, cfg);
	this.$super = new pf.comp.panel(cfg);
	$.extend(this, this.$super);
	this.panel.style.opacity = .75;
	this.panel.style.backgroundColor = '#fffff0';
	this.panel.style.textAlign = 'center';
	this.panel.style.padding = '0px';
	this.panel.style.width = (parseInt(this.panel.style.width)/2) + 'px';
	this.sp = document.createElement('div');
	this.panel.appendChild(this.sp);
	this.sp.style = 'width:100%;font-size:20px';
	this.sp.innerHTML = '<p>&nbsp;</p><table align="center" width="95%"> ' +
		'<tr> ' +
		'<td align="left"><input style="width:100%" type="text" placeholder="Email"></td> ' +
		'</tr> ' +
		'<tr> ' +
		'<td align="left"><input style="width:100%" type="password" placeholder="Password"></td> ' +
		'</tr> ' +
		'<tr> ' +
		'<td align="center"><a style="text-decoration:none;cursor:pointer;color:#00000f;font-weight:700;" href="javascript:void();" onclick="pyfia.forgotPwd();">Forgot Password</a></td> ' +
		'</tr> ' +
		'<tr> ' +
		'<td align="center"><a style="text-decoration:none;cursor:pointer;color:#00000f;font-weight:700;" href="javascript:void();" onclick="pyfia.register();">Register</a></td> ' +
		'</tr> ' +
		'<tr> ' +
		'<td align="center"><input style="text-underline:none;cursor:pointer;color:#00000f;font-weight:700;width:100%" type="button" value="Sign In" onclick="pyfia.signin();"></td> ' +
		'</tr> ' +
		'</table>';
	this.show = function() {
		this.$super.show();
	};
};

pf.comp.util.getDlgHeight = function() {
	var menuHeight = 45;
	var ribbonHeight = 60;
	var sep = 25;
	return ($(window).innerHeight() - menuHeight - ribbonHeight - 3 * sep) + 'px';
};

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

