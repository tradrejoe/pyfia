//jQuery.noConflict();

if (typeof (pf) == 'undefined')
	pf = {};
if (typeof (pf.comp) == 'undefined')
	pf.comp = {device: 'normal'};
if (typeof (pf.comp.activeDialog) == 'undefined')
	pf.comp.activeDialog = {};
pf.comp.setDevice = function(a){
	pf.comp.device = a;
};
pf.comp.getDevice = function() {
	return pf.comp.device;
};
pf.comp.isNotNormal = function() {
	return !/normal/.test(pf.comp.device);
};
pf.comp.menuitem = function(prop, p) {
	this.prop = prop;
	this.parent = p;
	this.getcomp = function() {
		return this.comp;
	};
	this.init = function() {
		var mi = document.createElement('div');
		this.comp = mi;
		if (prop && prop.text) {
			mi.innerHTML = prop.text;
		} else if (prop && prop.img) {
			var tmpwidth = prop && prop.imgwidth ? prop.imgwidth : (prop
					&& prop.width ? prop.width : null);
			var tmpheight = prop && prop.imgheight ? prop.imgheight : (prop
					&& prop.height ? prop.height : null);
			mi.innerHTML = '<img '
					+ (tmpwidth ? 'width="' + tmpwidth + '"' : '')
					+ (tmpheight ? 'height="' + tmpheight + '"' : '')
					+ ' style="margin:auto;'
					+ (tmpwidth ? 'width:' + tmpwidth + ';' : '')
					+ (tmpheight ? 'height:' + tmpheight + ';' : '')
					+ '" src="' + prop.img + '"/>';
		} else if (prop && prop.content) {
			mi.innerHTML = prop.content;
		} else {
			mi.innerHTML = 'menu item';
		}
		mi.style.display = 'table-cell';
		mi.style.height = prop && prop.height ? prop.height : '100%';
		mi.style.borderLeftStyle = 'inset';
		mi.style.borderLeftColor = '#080808';
		mi.style.borderWidth = '1px';
		if (prop && prop.width)
			mi.style.width = prop.width;
		if (prop && prop.color)
			mi.style.color = prop.color;
		if (prop && prop.bgcolor)
			mi.style.backgroundColor = prop.bgcolor;
		if (prop && prop.opacity)
			mi.style.opacity = prop.opacity;
		if (prop && prop.zindex)
			mi.style.zIndex = prop.zindex;
		mi.style.fontWeight = '900';
		mi.style.textAlign = 'center';
		mi.style.cssFloat = prop && prop.float && prop.float == 'left' ? prop.float
				: 'right';
		mi.style.cursor = 'pointer';
		if (prop && prop.separation) {
			mi.style.paddingLeft = prop.separation;
			mi.style.paddingRight = prop.separation;
		}
		if (prop && prop.margin) {
			mi.style.paddingTop = prop.margin;
			mi.style.paddingBottom = prop.margin;
		}
		if (prop && prop.submenuitems && prop.submenuitems.length > 0) {
			this.submenu = new pf.comp.submenu(prop.submenuitems, this);
			var ctl = this.submenu;
			mi.onclick = function(e) {
				ctl.toggle();
			};
			mi.onmouseover = function(e) {
				ctl.show();
			};
			mi.onmouseout = function(e) {
				if (!pf.comp.util.inside(ctl.getcomp(), e))
					ctl.hide();
			};
		} else {
			mi.onclick = prop && prop.onclick ? prop.onclick : null;
		}
		return mi;
	};
};

pf.comp.submenuitem = function(cfg) {
	this.$super = new pf.comp.menuitem(cfg);
	$.extend(true, this, this.$super);
	this.init = function() {
		var tmp = this.$super.init();
		tmp.style.cssFloat = 'none';
		tmp.style.clear = 'both';
		tmp.style.borderStyle = 'solid';
		tmp.style.borderColor = '#080808';
		tmp.style.borderWidth = '1px';
		tmp.style.verticalAlign = 'middle';
		return tmp;
	};
};

pf.comp.topmenu = function(prop) {
	var tm = document.createElement('div');
	tm.style.position = 'absolute';
	tm.style.display = 'table';
	tm.style.top = prop && prop.top ? prop.top : 0;
	tm.style.left = prop && prop.left ? prop.left : 0;
	tm.style.width = "100%";
	if (prop.height)
		tm.style.height = prop.height;
	tm.style.verticalAlign = 'middle';
	if (prop && prop.id) {
		tm.id = prop.id;
		tm.setAttribute("id", prop.id);
	}
	if (prop && prop.opacity)
		tm.style.opacity = prop.opacity;
	if (prop.icon.src) {
		var img = document.createElement('img');
		img.src = prop.icon.src;
		img.style.cssFloat = prop && prop.icon.float ? prop.icon.float : 'left';
		if (prop && prop.icon && prop.icon.width)
			img.style.width = prop.icon.width;
		if (prop && prop.icon && prop.icon.height)
			img.style.height = prop.icon.height;
		if (prop && prop.icon && prop.icon.margin)
			img.style.margin = prop.icon.margin;
		if (prop && prop.icon && prop.icon.padding)
			img.style.padding = prop.icon.padding;
		tm.appendChild(img);
	}
	if (prop.menuitems) {
		for (var i = 0; i < prop.menuitems.length; i++) {
			var mi = new pf.comp.menuitem(prop.menuitems[i], this);
			tm.appendChild(mi.init());
		}
	}
	var bgcolorFrom = prop && prop.bgcolorFrom ? prop.bgcolorFrom : '#99CCFF';
	var bgcolorTo = prop && prop.bgcolorTo ? prop.bgcolorTo : '#081f6a';
	try {
		tm.style.backgroundImage = '-webkit-gradient(linear, 0% 0%, 0% 100%, from('
				+ bgcolorFrom + '), to(' + bgcolorTo + '))';
	} catch(e) {}
	tm.style.backgroundColor = bgcolorFrom;
	var doorstop = document.createElement('div');
	doorstop.style.clear = 'both';
	tm.appendChild(doorstop);
	this.comp = tm;
	this.getcomp = function() {
		return this.comp;
	};
	if (prop && prop.zindex)
		tm.style.zIndex = prop.zindex;
	document.body.appendChild(tm);
};

pf.comp.submenu = function(prop, p) {
	this.sm = document.createElement('div');
	this.comp = this.sm;
	this.getcomp = function() {
		return this.comp;
	};
	this.sm.style.position = 'absolute';
	this.sm.style.display = 'none';
	this.init = false;
	document.body.appendChild(this.sm);
	this.parent = p;
	for (var s = 0; s < prop.length; s++) {
		var sm = prop[s];
		var osm = new pf.comp.submenuitem(sm).init();
		this.sm.appendChild(osm);
	}
	var ctl = this;
	this.comp.onmouseout = function(e) {
		ctl.hide();
	};
	this.show = function() {
		if (!this.init) {
			if (this.parent) {
				if (this.sm)
					this.sm.style.display = 'inline';
				this.sm.style.left = this.parent.getcomp().offsetLeft + 'px';
				this.sm.style.top = (this.parent.getcomp().offsetTop + this.parent
						.getcomp().offsetHeight)
						+ 'px';
			}
			var ctn = this.parent;
			if (ctn)
				ctn = ctn.parent;
			if (ctn && ctn.getcomp && ctn.getcomp().style)
				this.comp.style.zIndex = ctn.getcomp().style.zIndex;
			this.init = true;
		}
		if (this.sm)
			this.sm.style.display = 'inline';
	};
	this.hide = function() {
		if (this.sm)
			this.sm.style.display = 'none';
	};
	this.toggle = function() {
		if (this.sm)
			this.sm.style.display = (this.sm.style.display == 'none' ? 'inline'
					: 'none');
	};
};

pf.comp.vtoolbaritem = function(prop) {
	this.init = function() {
		var mi = document.createElement('div');
		mi.style.textAlign = 'center';

		mi.style.verticalAlign = 'middle';

		if (prop && prop.content) {
			mi.innerHTML = prop.content;
		} else {
			if (prop && prop.icon) {
				var icon = document.createElement('img');
				icon.src = prop.icon;
				icon.style.clear = 'both';
				icon.style.textAlign = 'center';
				if (prop && prop.width) {
					icon.style.width = prop.width;
				}
				if (prop && prop.height) {
					icon.style.height = prop.height;
				}
				icon.style.cursor = 'pointer';
				mi.appendChild(icon);
			}
			if (prop && prop.text) {
				var lbl = document.createElement('div');

				lbl.style.verticalAlign = 'middle';

				if (prop && prop.color)
					lbl.style.color = prop.color;
				lbl.innerHTML = prop.text;
				lbl.style.clear = 'both';
				lbl.style.cursor = 'pointer';
				lbl.style.margin = 'auto';
				lbl.style.textAlign = 'center';
				lbl.style.fontWeight = '900';
				lbl.style.fontSize = '18px';
				lbl.style.clear = 'both';
				mi.appendChild(lbl);
			}
			mi.onclick = prop && prop.onclick ? prop.onclick : null;
		}
		mi.style.cursor = 'pointer';
		mi.style.clear = 'both';
		if (prop && prop.separation) {
			mi.style.marginTop = prop.separation;
			mi.style.marginBottom = prop.separation;
		}
		return mi;
	};
};

pf.comp.vtoolbar = function(prop) {
	var tm = document.createElement('div');
	this.tm = tm;
	tm.style.position = 'absolute';
	tm.style.display = 'table';
	tm.style.top = prop && prop.top ? prop.top : 0;
	tm.style.right = prop && prop.right ? prop.right : 0;
	tm.style.height = "100%";
	if (prop.width)
		tm.style.width = prop.width;
	tm.style.marginLeft = '0px';
	tm.style.marginRight = '0px';
	if (prop && prop.opacity)
		tm.style.opacity = prop.opacity;
	if (prop.toolbaritems) {
		var toolbarcontainer = document.createElement('div');
		if (prop && prop.bgcolor)
			toolbarcontainer.style.backgroundColor = prop.bgcolor;
		// toolbarcontainer.style.borderRadius = '8px';
		toolbarcontainer.style.display = 'table-cell';
		toolbarcontainer.style.verticalAlign = 'middle';
		/*
		 * toolbarcontainer.style.backgroundColor = '#fffff0';
		 * toolbarcontainer.style.opacity = '.7';
		 * toolbarcontainer.style.borderRadius = '6px';
		 */
		for (var i = 0; i < prop.toolbaritems.length; i++) {
			var mi = new pf.comp.vtoolbaritem(prop.toolbaritems[i]);
			toolbarcontainer.appendChild(mi.init());
		}
		tm.appendChild(toolbarcontainer);
	}
	if (prop && prop.zindex)
		tm.style.zIndex = prop.zindex;
	document.body.appendChild(tm);
	this.remove = function() {
		if (this.tm)
			document.removeChild(tm);
	};
	this.hide = function() {
		if (this.tm)
			tm.style.display = 'none';
	};
	this.show = function() {
		if (this.tm)
			tm.style.display = 'table';
	};
};

pf.comp.ribbon = function(cfg) {
	this.getComp = function() {
		return this.div;
	};
	this.init = function() {
		if (!cfg || !cfg.ribbons || !cfg.ribbons.length
				|| cfg.ribbons.length == 0)
			return;
		var prop = cfg.ribbons[cfg.idx];
		if (cfg.div) {
			document.body.removeChild(cfg.div);
		}
		cfg.div = document.createElement('div');
		this.div = cfg.div;
		document.body.appendChild(cfg.div);
		cfg.div.style.position = 'absolute';
		cfg.div.style.bottom = prop && prop.bottom ? prop.bottom : 0;
		cfg.div.style.left = prop && prop.left ? prop.left : 0;
		cfg.div.style.width = "100%";
		cfg.div.style.verticalAlign = 'middle';
		cfg.div.style.cursor = 'pointer';
		if (cfg && cfg.id) {
			cfg.div.id = cfg.id;
			cfg.div.setAttribute("id", cfg.id);
		}
		if (prop && prop.opacity)
		cfg.div.style.opacity = prop.opacity;
		var tmpheight = pf.comp.isNotNormal() && cfg && typeof cfg.mheight === 'function' ? cfg.mheight.call(this) : prop.icon.height;	
		if (prop.icon && prop.icon.src || prop.message) {
			var tmpwidth = pf.comp.isNotNormal() && cfg && typeof cfg.mheight === 'function' ? cfg.mheight.call(this) : $(window).width()/2;
			var tmpwidth2 = $(window).width() - tmpwidth;
			var ribbonContent = '<table class="transparent" id="adctn" align="center" border="0" cellspacing="0" cellpadding="0" width="100%" height="'+tmpheight+'" style="width:100%;height:'+tmpheight+'px;"><tr>';
			if (prop.icon && prop.icon.src) {
				ribbonContent += '<td class="transparent"  align="left" valign="middle" align="center" style="text-align:center;cursor:pointer">'+
					'<img class="transparent" id="imgad" width="'+ (/mobile/.test(pf.comp.getDevice()) ? Math.round(tmpwidth/2) : tmpwidth)+
					'" height="'+(/mobile/.test(pf.comp.getDevice()) ? Math.round(tmpheight/2) : tmpheight)+'" valign="middle" align="left" style="width:'+tmpwidth+'px;height:'+tmpheight+'px;" src="'+prop.icon.src+'"></td>';
			}
			if (prop.message) {
				ribbonContent += '<td class="transparent" width="'+tmpwidth2+'" height="'+tmpheight+'" valign="top" align="center" style="text-align:center;cursor:pointer;">'+
					'<div id="divadmsg" style="overflow:hidden;width:'+tmpwidth2+'px;height:'+tmpheight+'px;">'+prop.message+'</div></td>';
			}
			ribbonContent += '</tr></table>';			
			cfg.div.innerHTML = ribbonContent;
		} else if (prop.src) {
			var ifr = document.createElement('iframe');
			ifr.style.width = cfg.div.style.width;
			ifr.style.height = cfg.div.style.height;
			ifr.border = 0;
			ifr.src = prop.src;
			cfg.div.appendChild(ifr);
		}
		var bgcolorFrom = prop && prop.bgcolorFrom ? prop.bgcolorFrom
				: '#99CCFF';
		var bgcolorTo = prop && prop.bgcolorTo ? prop.bgcolorTo : '#081f6a';
		try {
			cfg.div.style.backgroundImage = '-webkit-gradient(linear, 0% 0%, 0% 100%, from('
				+ bgcolorFrom + '), to(' + bgcolorTo + '))';
		} catch(e) {}
		cfg.div.style.backgroundColor = bgcolorFrom;
		if (prop && prop.zindex)
			cfg.div.style.zIndex = prop.zindex;
		if (prop && prop.onclick)
			cfg.div.onclick = prop.onclick;
		if (pf.comp.isNotNormal()) $('#divadmsg').touchScroll();
		//else new iScroll('divadmsg');
		cfg.idx = cfg.idx == cfg.ribbons.length - 1 ? 0 : cfg.idx + 1;
		$('#adctn').height(tmpheight);
		$('#imgad').height(tmpheight);
		$('#divadmsg').height(tmpheight);
		this.div.className += " transparent";
		// setInterval(this.init, cfg.pause);

		return this;
	};
};

pf.comp.fixedbtn = function() {
	this.getComp = function() {
		return this.divbtn;
	};
	this.init = function(cfg) {
		if (typeof cfg === 'undefined' || !cfg || 
			typeof cfg.width === 'undefined' || !cfg.width ||
			typeof cfg.height === 'undefined' || !cfg.height ||
			(typeof cfg.left === 'undefined' || !cfg.left) && (typeof cfg.right === 'undefined' || !cfg.right) ||
			(typeof cfg.top === 'undefined' || !cfg.top) && (typeof cfg.bottom === 'undefined' || !cfg.bottom) ||
			typeof cfg.html !== 'string' || !cfg.html) 
		return;
		this.divbtn = document.createElement('div');
		this.divbtn.style.position = 'fixed';
		if (typeof cfg.left !== 'undefined' && cfg.left) {
			this.divbtn.style.left = cfg.left;
		} else if (typeof cfg.right !== 'undefined' && cfg.right) {
			this.divbtn.style.right = cfg.right;
		} else {
			this.divbtn.style.left = 0;
		}		
		if (typeof cfg.top !== 'undefined' && cfg.top) {
			this.divbtn.style.top = cfg.top;
		} else if (typeof cfg.bottom !== 'undefined' && cfg.bottom) {
			this.divbtn.style.bottom = cfg.bottom;
		} else {
			this.divbtn.style.top = 0;
		}		
		this.divbtn.style.top = cfg.top;
		this.divbtn.style.width = cfg.width;
		this.divbtn.style.height = cfg.height;
		this.divbtn.innerHTML = cfg.html;
		this.divbtn.style.border = 'none';
		if (typeof cfg.click !== 'undefined' && typeof cfg.click === 'function') 
			this.divbtn.onclick = cfg.click;
		document.appendChild(this.divbtn);
		return this;
	}
	this.show = function() {
		this.divbtn.style.display = 'inline';
	}
	this.hide = function() {
		this.divbtn.style.display = 'none';
	}
};

pf.comp.getVPD = function() {
	var body = document.body,
    html = document.documentElement;

	return { h: Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight ),
             w: Math.max( body.scrollWidth, body.offsetWidth, 
                     html.clientWidth, html.scrollWidth, html.offsetWidth )};
};

pf.comp.bgCarouselWrapper = function(prop) {
	var bgdiv = document.createElement('div');
	if (prop && prop.zindex)
		bgdiv.style.zIndex = prop.zindex;
	bgdiv.style.position = 'absolute';
	var vpd = pf.comp.getVPD();
	bgdiv.style.width = vpd.w + 'px';
	bgdiv.style.height = vpd.h + 'px';
	bgdiv.style.padding = '0px';
	bgdiv.style.margin = '0px';
	bgdiv.style.top = '0px';
	bgdiv.style.left = '0px';
	bgdiv.setAttribute('id', prop && prop.wrapperid ? prop.wrapperid
			: 'pyfiaBgdiv');
	document.body.appendChild(bgdiv);
	jQuery.extend(prop, {
		width : vpd.w,
		height : vpd.h
	});
	var tmp = new pf.comp.bgCarousel(prop);
	return tmp;
};

pf.comp.bgCarousel = function(options) {
	pf.comp.noresize = true;
	var $ = jQuery;
	this.setting = {
		displaymode : {
			type : 'auto',
			pause : 2000,
			stoponclick : false,
			cycles : 0,
			pauseonmouseover : true
		},
		activeslideclass : 'selectedslide',
		orientation : 'h',
		persist : true,
		slideduration : 500
	}; // default settings
	jQuery.extend(this.setting, options); // merge default settings with
											// options
	this.setting.displaymode.pause += 400 + this.setting.slideduration; // 400ms
																		// is
																		// default
																		// fade
																		// in
																		// time
	var curslide = (this.setting.persist) ? pf.comp.bgCarousel.routines
			.getCookie("slider-" + this.setting.wrapperid) : 0;
	this.curslide = (curslide == null || curslide > this.setting.imagearray.length - 1) ? 0
			: parseInt(curslide); // make sure curslide index is within bounds
	this.curstep = 0;
	this.animation_isrunning = false; // variable to indicate whether an image
										// is currently being slided in
	this.posprop = (this.setting.orientation == "h") ? "left" : "top";
	options = null;
	var slideshow = this, setting = this.setting, preloadimages = [], imagesloaded = 0, slidesHTML = '';
	for (var i = 0, max = setting.imagearray.length; i < max; i++) { // preload
																		// images
		preloadimages[i] = new Image();
		$(preloadimages[i]).bind('load error', function() {
			imagesloaded++;
			if (imagesloaded == max) { // when all images have preloaded
				$(function() { // on document.ready
					slideshow.init($, slidesHTML);
				});
			}
		});
		preloadimages[i].src = setting.imagearray[i][0];
		slidesHTML += pf.comp.bgCarousel.routines.getSlideHTML(setting,
				setting.imagearray[i], this.setting.width, this.setting.height,
				this.posprop)
				+ '\n';
	}
	$(window).bind(
			'onload',
			function() {
				$(window).bind(
						'onfocus',
						function() { // on window onload
							if (slideshow.setting.persist) // remember last
															// shown slide's
															// index?
								pf.comp.bgCarousel.routines
										.setCookie("slider-"
												+ setting.wrapperid,
												slideshow.curslide);
						});
			});
	pf.comp.noresize = false;
};

pf.comp.bgCarousel.prototype = {

	slide : function(nextslide, dir) { // possible values for dir: "left",
										// "right", "top", or "down"
		pf.comp.noresize = true;
		if (this.curslide == nextslide)
			return;
		var slider = this, setting = this.setting;
		var createobj = pf.comp.bgCarousel.routines.createobj;
		var nextslide_initialpos = setting.dimensions[(dir == "right" || dir == "left") ? 0
				: 1]
				* ((dir == "right" || dir == "down") ? -1 : 1);
		var curslide_finalpos = -nextslide_initialpos;
		var posprop = this.posprop;
		if (this.animation_isrunning != null)
			this.animation_isrunning = true; // indicate animation is running
		this.$imageslides.eq(nextslide).show()
				.css(
						createobj([ posprop, nextslide_initialpos ], [
								'opacity', 0.3 ])) // show upcoming slide
				.stop().animate(createobj([ posprop, 0 ]),
						setting.slideduration, function() {
							var $this = jQuery(this);
							$this.addClass(setting.activeslideclass).animate({
								opacity : 0.95
							}).find('div.desc').stop().slideDown();
							slider.animation_isrunning = false;
						}).find('div.desc').hide();

		this.$imageslides.eq(this.curslide).removeClass(
				setting.activeslideclass).stop().animate(
				createobj([ posprop, curslide_finalpos ]),
				setting.slideduration, function() {
					var $this = jQuery(this);
					$this.hide();
				}); // hide outgoing slide

		this.curslide = nextslide;
		pf.comp.noresize = false;
	},

	navigate : function(keyword) { // keyword: "back" or "forth"
		pf.comp.noresize = true;
		var slideshow = this, setting = this.setting;
		clearTimeout(this.rotatetimer);
		if (!setting.displaymode.stoponclick
				&& setting.displaymode.type != "manual") { // if slider should
															// continue auto
															// rotating after
															// nav buttons are
															// clicked on
			this.curstep = (keyword == "back") ? this.curstep - 1
					: this.curstep + 1; // move curstep counter explicitly back
										// or forth depending on direction of
										// slide
			this.rotatetimer = setTimeout(function() {
				slideshow.rotate();
			}, setting.displaymode.pause);
		}
		var dir = (keyword == "back") ? (setting.orientation == "h" ? "right"
				: "down") : (setting.orientation == "h" ? "left" : "up");
		var targetslide = (keyword == "back") ? this.curslide - 1
				: this.curslide + 1;
		targetslide = (targetslide < 0) ? this.$imageslides.length - 1
				: (targetslide > this.$imageslides.length - 1) ? 0
						: targetslide; // wrap around
		if (this.animation_isrunning == false)
			this.slide(targetslide, dir);
		pf.comp.noresize = false;
	},

	rotate : function() {
		pf.comp.noresize = true;
		var slideshow = this, setting = this.setting;
		if (this.ismouseover) { // pause slideshow onmouseover
			this.rotatetimer = setTimeout(function() {
				slideshow.rotate();
			}, setting.displaymode.pause);
			return;
		}
		var nextslide = (this.curslide < this.$imageslides.length - 1) ? this.curslide + 1
				: 0;
		this.slide(nextslide, this.posprop); // go to next slide, either to
												// the left or upwards depending
												// on setting.orientation
												// setting
		if (setting.displaymode.cycles == 0 || this.curstep < this.maxsteps - 1) {
			this.rotatetimer = setTimeout(function() {
				slideshow.rotate();
			}, setting.displaymode.pause);
			this.curstep++;
		}
		pf.comp.noresize = false;
	},

	init : function($, slidesHTML) {
		pf.comp.noresize = true;
		var slideshow = this, setting = this.setting;
		this.$wrapperdiv = $('#' + setting.wrapperid);
		setting.dimensions = [ this.$wrapperdiv.width(),
				this.$wrapperdiv.height() ];
		this.$wrapperdiv.css({
			position : 'relative',
			visibility : 'visible',
			overflow : 'hidden',
			backgroundImage : 'none',
			width : setting.dimensions[0],
			height : setting.dimensions[1]
		}); // main DIV
		if (this.$wrapperdiv.length == 0) { // if no wrapper DIV found
			if (console && console.log)
				console.log("Error: DIV with ID \"" + setting.wrapperid
						+ "\" not found on page.");
			return;
		}
		this.$wrapperdiv.html(slidesHTML);
		this.$imageslides = this.$wrapperdiv.find('div.slide').hide();
		this.$imageslides.eq(this.curslide).show().css(
				pf.comp.bgCarousel.routines.createobj([ 'opacity', 0.5 ], [
						this.posprop, 0 ])) // set current slide's CSS position
											// (either "left" or "top") to 0
		.addClass(setting.activeslideclass).stop().animate({
			opacity : 1
		}).find('div.desc').slideDown();
		var orientation = setting.orientation;
		var controlpaths = (orientation == "h") ? setting.navbuttons
				.slice(0, 2) : setting.navbuttons.slice(2);
		var $controls = $(
				'<img class="navbutton" src="'
						+ controlpaths[1]
						+ '" data-dir="forth" style="position:absolute; z-index:5; cursor:pointer; '
						+ (orientation == 'v' ? 'bottom:0; left:46%'
								: 'top:46%; right:0;')
						+ '" />'
						+ '<img class="navbutton" src="'
						+ controlpaths[0]
						+ '" data-dir="back" style="position:absolute; z-index:5; cursor:pointer; '
						+ (orientation == 'v' ? 'top:0; left:45%'
								: 'top:45%; left:0;') + '" />')
				.click(
						function() {
							var keyword = this.getAttribute('data-dir');
							setting.curslide = (keyword == "right") ? (setting.curslide == setting.content.length - 1 ? 0
									: setting.curslide + 1)
									: (setting.curslide == 0 ? setting.content.length - 1
											: setting.curslide - 1);
							slideshow.navigate(keyword);
						});
		if (this.setting.showControl)
			$controls.appendTo(this.$wrapperdiv);
		if (setting.displaymode.type == "auto") { // auto slide mode?
			setting.displaymode.pause += setting.slideduration;
			this.maxsteps = setting.displaymode.cycles
					* this.$imageslides.length;
			if (setting.displaymode.pauseonmouseover) {
				this.$wrapperdiv.mouseenter(function() {
					slideshow.ismouseover = true;
				});
				this.$wrapperdiv.mouseleave(function() {
					slideshow.ismouseover = false;
				});
			}
			this.rotatetimer = setTimeout(function() {
				slideshow.rotate();
			}, setting.displaymode.pause);
		}
		pf.comp.noresize = true;
	}

};

pf.comp.bgCarousel.routines = {

	getSlideHTML : function(setting, imgref, w, h, posprop) {
		var posstr = posprop + ":" + ((posprop == "left") ? w : h);
		/*return '<div style="position:absolute;top:0px;left:0px;" class="slide" style="background-size:'
				+ w
				+ 'px '
				+ h
				+ 'px;background-image:url('
				+ imgref[0]
				+ '); position:absolute;'
				+ posstr
				+ ';width:'
				+ w
				+ 'px; height:'
				+ h
				+ 'px;">'
				+ ((imgref[1]) ? '<div class="desc" style="display:none">'
						+ imgref[1] + '</div>\n' : '') + '</div>';*/
		return '<div class="slide" style="top:0px;left:0px;padding:0px;margin:0px;width:'
				+ w
				+ 'px;'
				+ 'height:'
				+ h
				+ 'px;position:absolute;"><img width="'+w+'" height="'+h+'" src="'
				+ imgref[0]
				+ '" style="width:'
				+ w
				+ 'px;'
				+ 'height:'
				+ h
				+ 'px;"></div>';
	},

	getCookie : function(Name) {
		var re = new RegExp(Name + "=[^;]+", "i"); // construct RE to search
													// for target name/value
													// pair
		if (document.cookie.match(re)) // if cookie found
			return document.cookie.match(re)[0].split("=")[1]; // return its
																// value
		return null;
	},

	setCookie : function(name, value) {
		document.cookie = name + "=" + value + ";path=/";
	},

	createobj : function() {
		var obj = {};
		for (var i = 0; i < arguments.length; i++) {
			obj[arguments[i][0]] = arguments[i][1];
		}
		return obj;
	}
};

pf.extend = function(sub, sup, proto) {
	if (!sub || !sup)
		return;
	var obj = function() {
	};
	obj.prototype = sup.prototype;
	sub.prototype = new obj;
	if (proto) {
		for ( var p in proto) {
			sub.prototype[p] = proto[p];
		}
	}
};

pf.center = function(div) {
	if (div && div.length > 0) {
		div.css({
			'top' : ($(window).height() - div.height()) / 2
					+ $(document).scrollTop(),
			'left' : ($(document).width() - div.width()) / 2,
			'display' : 'inline'
		});
	}
};

pf.comp.panel = function(cfg) {
	this.setHeight = function() {
		var tmptop = this.cfg && typeof this.cfg.mheight === 'function' ? this.cfg.mheight.call(this) : 0;
		var tmpbot = this.cfg && typeof this.cfg.mbottom === 'function' ? this.cfg.mbottom.call(this) : 0;
		$('#'+this.panel.id).height(pf.comp.isNotNormal() ? 
				$(window).height()- tmptop - tmpbot : 
				(cfg && cfg.height ? cfg.height : $(window).height() / 2));
	};
	this.panel = document.createElement('div');
	this.cfg = cfg;
	if (!this.appended) {
		document.body.appendChild(this.panel);
		this.appended = true;
	}	
	this.panel.style.position = 'absolute';
	this.panel.style.width = cfg && cfg.width ? cfg.width : (pf.comp.isNotNormal() ? 
			$(window).width()  : $(window).width() / 2)
			+ 'px';
	var tmptop = cfg && typeof cfg.mheight === 'function' ? cfg.mheight.call(this) : 0;
	var tmpbot = cfg && typeof cfg.mbottom === 'function' ? cfg.mbottom.call(this) : 0;
	this.panel.style.borderRadius = pf.comp.isNotNormal() ? '0px' : '10px';
	this.panel.style.borderWidth = '1px';
	this.panel.style.borderColor = '#00000f';
	this.panel.style.borderStyle = 'solid';
	this.panel.style.zIndex = cfg && cfg.zindex ? cfg.zindex : 10;
	this.panel.style.padding = '0px';
	if (this.cfg && this.cfg.id) {
		this.panel.id = cfg.id;
		this.panel.setAttribute('id', cfg.id);
	}
	this.appended = false;
	this.prepareLeftSlide = function(div) {
		if (div && div.length > 0) {
			div.css({
				'top' : ($(window).height() - div.height()) / 2
						+ $(document).scrollTop(),
				'left' : ($(document).width() - div.width()) / 2 + div.width(),
				'display' : 'inline'
			});
		}
	};
	this.prepareLeftSlideM = function(div) {
		if (div && div.length > 0) {
			div.css({
				'top' : cfg && typeof cfg.mheight === 'function' ?
						cfg.mheight.call(this) : ($(window).height() - div.height()) / 2 + $(document).scrollTop(),
				'left' : 0+div.width(),
				'display' : 'inline'
			});
		}
	};
	this.getTitleIcon = function() {
		return "";
	};
	this.getStyledMsg = function(msg) {
		return msg;
	};
	this.createToolbar = function() {
		this.title = document.createElement('div');
		// this.title.style.backgroundColor = '#cccccc';
		this.title.style.clear = 'both';
		this.title.style.padding = '1px';
		/*
		 * this.title.style.backgroundColor = '#DCDCDC';
		 * this.title.style.borderTopLeftRadius = '10px';
		 * this.title.style.borderTopRightRadius = '10px';
		 * this.title.style.backgroundImage = '-webkit-gradient(linear, 0% 0%,
		 * 0% 100%, from(#DCDCDC), to(#d3d3d3))';
		 */
		this.panel.appendChild(this.title);
		this.title.id = "title_"
				+ (this.cfg.id ? this.cfg.id : (Math.random()));
		// this.title.style.padding = '0px';
		$('#' + this.title.id).css({
			width : parseInt(this.panel.style.width),
			height : 24,
			clear : 'both',
			zIndex : 2000,
			'border-bottom' : '1px solid #666666;',
			display: 'table',
			textAlign: 'left'
		});
		this.title.style.borderBottom = '1px inset #666666';
		this.title.style.height = '24px';
		this.title.style.width = this.panel.style.width;
		this.title.style.display = 'table';
		this.title.style.textAlign = 'left';
		this.title.style.fontWeight = 900;
		this.hidebtnid = (this.cfg.id ? this.cfg.id : (Math.random()))+'_hide';
		this.title.innerHTML = '<nobr><span id="titletxt_"'+(this.cfg.id ? this.cfg.id : (Math.random()))+' width="95%" style="float:left;width:95%">&nbsp;&nbsp;'+
			this.getTitleIcon()+'&nbsp;'+((this.cfg.title ? this.cfg.title : (pyfia && pyfia.data && pyfia.data.clazz ? pyfia.data.clazz : '')))+'</span></nobr>'+
			'<img id="'+ this.hidebtnid + '" src="/resources/images/close_button_grey.png" '+
			'title="close" style="pointer:cursor;width:20px;height:20px;text-align:left;'+
			'position:absolute;top:3px;right:16px;" onclick="javascript:pf.comp.noresize = true;if(pyfia.activePanel)pyfia.activePanel.hide();pf.comp.noresize = false;"/>';
		var ctl = this;
		this.hidebtn = $('#'+this.hidebtnid);
		this.hidebtn.click(function() {
			ctl.hide();
		});
		this.pnlmsg = document.createElement('div');
		this.pnlmsg.id = this.cfg.id + '_pnlmsg';
		this.pnlmsg.style.width = this.panel.style.width;
		this.pnlmsg.style.height = '26px';
		this.pnlmsg.style.textAlign = 'center';
		this.pnlmsg.style.verticalAlign = 'bottom';
		this.panel.appendChild(this.pnlmsg);
	};
	this.showWarning = function(msg) {
		if (typeof msg === 'undefined' || !msg) return;
		$('#'+this.pnlmsg.id).html('<span style="color:#ff0000;text-align:center;">'+msg+'</span>');
	};
	this.hideWarning = function() {
		this.pnlmsg.innerHTML = '';
	};
	this.centerDlg = function(dlg) {
		if (dlg) {
			var realdim = {
				h : 60,
				w : 100
			};
			if (dlg.offsetHeight) {
				realdim = {
					h : dlg.offsetHeight,
					w : dlg.offsetWidth
				};
			} else if (dlg.clientHeight) {
				try {
					realdim = {
						h : dlg.clientHeight,
						w : dlg.clientWidth
					};
				} catch (ignored) {
				}
			}
			dlg.style.top = (document.body.offsetHeight - realdim.h) / 2
					+ document.body.scrollTop;
			dlg.style.left = (document.body.offsetWidth - realdim.w) / 2;
			dlg.style.display = 'inline';
		}
	};
	this.show = function() {
		var tmpdiv = $('#' + this.panel.getAttribute('id')).css({
			'display' : 'inline'
		});
		this.setHeight();
		if (pf.comp.isNotNormal())
			this.prepareLeftSlideM(tmpdiv);
		else
			this.prepareLeftSlide(tmpdiv);
		if (this.show_callback)
			tmpdiv.animate({
				left : '-=' + tmpdiv.width()
			}, 500, 'swing', this.show_callback);
		else
			tmpdiv.animate({
				left : '-=' + tmpdiv.width()
			}, 500, 'swing');
		/*
		 * this.center(tmpdiv); var div =
		 * document.getElementById(this.panel.getAttribute('id'));
		 * this.centerDlg(div);
		 */
		if (!this.cfg || this.cfg
				&& typeof (this.cfg.draggable) === 'undefined' || this.cfg
				&& typeof (this.cfg.draggable) !== 'undefined'
				&& this.cfg.draggable)
			tmpdiv.draggable();
		if (this.cfg && this.cfg.callbackShow) this.cfg.callbackShow.call(this);
		return this.panel;
	};
	this.hide = function() {
		if (!this.panel)
			return;
		// var tmpdiv = $('#'+this.panel.getAttribute('id'));
		// tmpdiv.animate({left: '-='+tmpdiv.width()}, 500);
		this.panel.style.display = 'none';
		if (this.cfg && this.cfg.callbackHide) this.cfg.callbackHide.call(this);
	};
	this.destroy = function() {
		if (!this.panel)
			return;
		this.panel.style.display = 'none';
		document.body.removeChild(this.panel);
		this.panel = null;
	};
	if (cfg && !cfg.notoolbar)
		this.createToolbar();
};

pf.comp.panelWizard = function(cfg) {
	this.$super = new pf.comp.panel(cfg);
	$.extend(this, this.$super);
	this.show = function() {
		this.$super.show();
		this.btnctn = document.createElement('div');
		this.btnctn.style.position = 'absolute';
		this.btnctn.style.width = this.$super.style.width;
		this.btnctn.style.bottom = 0;
		this.btnctn.style.borderTop = '1px inset #666666';
		this.$super.appendChild(this.btnctn);
		if (typeof tp.cfg !== 'undefined' && tp.cfg && typeof tp.cfg.arbtn !== 'undefined' && tp.cfg.arbtn && Array.isArray(tp.cfg.arbtn)) {
			var ab = tp.cfg.arbtn;
			if (ab.length==2) {
				var btn = document.createElement(tp.cfg.arbtn[0].lbl);
				btn.onclick = tp.cfg.arbtn[0].fn();
				btn.style.class = 'pf-button-forms';
				btn.style.float = 'left';
				this.btnctn.appendChild(btn);
				btn = document.createElement(tp.cfg.arbtn[1].lbl);
				btn.onclick = tp.cfg.arbtn[1].fn();
				btn.style.float = 'right';
				this.btnctn.appendChild(btn);
			} else {
				for (var i=0; i<tp.cfg.arbtn.length; i++) {
					var b = tp.cfg.arbtn[i];
					var btn = document.createElement(b.lbl);
					btn.onclick = b.fn();
					btn.style.class = 'pf-button-forms';
					btn.style.float = 'right';					
				}
			}
		}
		return this.panel;
	}
}

pf.comp.dialog = function(cfg) {
	this.cfg = (typeof cfg === 'undefined' || !cfg) ? {} : cfg;
	this.cfg.notoolbar = true;
	this.$super = new pf.comp.panel(this.cfg);
	$.extend(this, this.$super);
	this.panel.style.width = this.cfg && this.cfg.width ? this.cfg.width : ($(window)
			.innerWidth() / 4)
			+ 'px';
	this.panel.style.height = this.cfg && this.cfg.height ? this.cfg.height : ($(window)
			.innerHeight() / 6)
			+ 'px';
	this.panel.style.zIndex = 2000;
	this.panel.style.opacity = .9;
	this.panel.style.backgroundColor = '#fffff0';
	this.panel.style.textAlign = 'center';
	this.panel.style.padding = '0px';
	this.show = function(msg) {
		this.createToolbar();
		if (this.cfg && this.cfg.msg) {
			var divmsg = document.createElement('div');
			divmsg.style.position = 'absolute';
			divmsg.style.top = parseInt(this.title.style.height)+20+'px';
			divmsg.style.left = '0px';
			divmsg.innerHTML = this.getStyledMsg(this.cfg.msg);
			this.panel.appendChild(divmsg);
		}		
		if (pf.comp.activeDialog && pf.comp.activeDialog.destroy)
			pf.comp.activeDialog.destroy();
		if (!this.appended) {
			document.body.appendChild(this.panel);
			this.appended = true;
		}
		pf.comp.activeDialog = this;
		this.panel.style.display = 'inline';
		return this.panel;
	};
};

pf.comp.confirmDialog = function(cfg) {
	this.$super = new pf.comp.dialog(cfg);
	$.extend(this, this.$super);
	this.getTitleIcon = function() {
		return '<img style="width:18px;height:18px;" src="/resources/images/Warning.png">';
	};
	this.getStyledMsg = function(msg) {
		return '<center><span style="color:#ff0000;text-align:center;">'+msg+'</span></center>';
	};
	this.prepareLeftSlide = function(div) {
		if (div && div.length > 0) {
			div.css({
				'top' : ($(window).height() - div.height()) / 4
						+ $(document).scrollTop(),
				'left' : ($(document).width() - div.width()) / 6 + div.width(),
				'display' : 'inline'
			});
		}
	};	
	this.show = function() {
		this.createToolbar();
		this.$super.show();
		if (this.cfg && this.cfg.msg) {
			var divmsg = document.createElement('div');
			divmsg.style.position = 'absolute';
			divmsg.style.top = parseInt(this.title.style.height)+20+'px';
			divmsg.style.left = '0px';
			divmsg.style.width = '100%';
			divmsg.innerHTML = this.getStyledMsg(this.cfg.msg);
			this.panel.appendChild(divmsg);
		}		
		if (pf.comp.activeDialog && pf.comp.activeDialog.destroy)
			pf.comp.activeDialog.destroy();
		if (!this.appended) {
			document.body.appendChild(this.panel);
			this.appended = true;
		}
		pf.comp.activeDialog = this;
		this.panel.style.display = 'inline';
		var btnctn = document.createElement('div');
		btnctn.style.width = '100%';
		btnctn.style.textAlign = 'center';
		btnctn.align = 'center';
		btnctn.setAttribute('align', 'center');
		btnctn.style.position = 'absolute';
		btnctn.style.bottom = '0px';
		btnctn.style.paddingBottom = '20px';
		this.panel.appendChild(btnctn);
		var btn = document.createElement('div');
		btn.style.width = '60px';
		btn.style.height = '20px';
		btn.style.fontWeight = 700;
		btn.style.border = '1px solid #00000f';
		btn.innerHTML = 'OK';
		btn.style.backgroundColor = '#cccccc';
		btn.style.margin = '0px auto';
		btn.style.cursor = 'pointer';
		var ctl = this;
		btn.onclick = function() {
			ctl.destroy();
			pf.comp.noresize = false;
		};
		btnctn.appendChild(btn);
		return out;
	};
};

pf.comp.promptDialog = function(cfg) {
	this.$super = new pf.comp.dialog(cfg);
	$.extend(this, this.$super);
	this.show = function() {
		var out = this.$super.show();
		this.panel.style.textAlign = 'left';
		this.panel.style.padding = '20px';
		var btnctn = document.createElement('div');
		btnctn.style.width = '90%';
		btnctn.style.position = 'absolute';
		btnctn.style.bottom = '0px';
		btnctn.style.paddingBottom = '20px';
		this.panel.appendChild(btnctn);
		var btn = document.createElement('div');
		btn.style.width = this.cfg && this.cfg.button_width ? this.cfg.button_width
				: '60px';
		btn.style.textAlign = 'center';
		btn.style.height = '20px';
		btn.style.fontWeight = 700;
		btn.style.border = '1px solid #00000f';
		btn.style.cssFloat = 'left';
		btn.innerHTML = (this.cfg && this.cfg.yes ? this.cfg.yes : 'Yes');
		btn.style.backgroundColor = '#cccccc';
		btn.style.margin = '0px auto';
		btn.style.cursor = 'pointer';
		var ctl = this;
		btn.onclick = function() {
			ctl.destroy();
		};
		btnctn.appendChild(btn);

		btn = document.createElement('div');
		btn.style.width = this.cfg && this.cfg.button_width ? this.cfg.button_width
				: '60px';
		btn.style.textAlign = 'center';
		btn.style.height = '20px';
		btn.style.fontWeight = 700;
		btn.style.border = '1px solid #00000f';
		btn.style.cssFloat = 'right';
		btn.innerHTML = (this.cfg && this.cfg.no ? this.cfg.no : 'No');
		btn.style.backgroundColor = '#cccccc';
		btn.style.margin = '0px auto';
		btn.style.cursor = 'pointer';
		btn.onclick = function() {
			window.location.href = 'http://www.google.com';
		};
		btnctn.appendChild(btn);
		return out;
	};
};

pf.comp.corrgraph = function(opt) {

	this.option = opt || {};
	this.model = {};
	this.view = {};
	this.controller = {};
	var option= this.option;
	var model = this.model;
	var view = this.view;
	var controller = this.controller;
	
	option.default_width = 100;
	option.default_height = 100;
	option.tgtcorr = .102;
	option.dscale = 200;
	option.dlscale = 200;
	option.dcorr = .3;
	var oparent = document.getElementById(opt.parentid);
	var pstyle = typeof oparent === 'undefined' ? {width: this.default_width, height: this.default_height} : oparent.style;
	option.width = parseInt(opt.width || (option.width = pstyle.width));
	option.height =parseInt(opt.height || (option.height = pstyle.height));
	
	model.links = [];
	opt.links.forEach(function(l) {
		model.links.push({source: l.source, target: l.target, corr: l.corr});
	});
	//model.links = opt.links;
	model.nodes = {};
	model.corrs = {};

	var nodes = model.nodes;
	var corrs = model.corrs;
	var links = model.links;	
	
	/************************** class methods *************************************/
	this.controller.tick = function() {
	  view.path.attr("d", controller.linkArc);
	  view.circle.attr("transform", controller.transform);
	  view.text.attr("transform", controller.transform);
	  view.ltext.attr("transform", controller.ltransform);
	}

	this.controller.cirRadius = function(n) {
		return Math.abs(typeof corrs[n.name] !== 'undefined' ? corrs[n.name] : option.dcorr) * option.dscale;
	};
	
	this.controller.linkArc = function(d) {
	  var dx = d.target.x - d.source.x,
		  dy = d.target.y - d.source.y,
		  dr = Math.sqrt(dx * dx + dy * dy);
	  return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
	  //return "M" + d.source.x + "," + d.source.y + "L" + d.target.x + "," + d.target.y;
	};
	
	this.controller.transform = function(d) {
	  return "translate(" + d.x + "," + d.y + ")";
	};

	this.controller.ltransform = function(l) {
	  return "translate(" + ((l.source.x+l.target.x)/2) + "," + ((l.source.y+l.target.y)/2) + ")";
	};

	this.controller.getRgbFromRng = function(n) {
		var mn = -1.0, mx = 1.0;
		if ( mn >= mx || typeof n === 'undefined' || !n) return "#FFFFFF";
		var x = n<mn ? mn : (n>mx ? mx : n);
		var o = Math.round(((x - mn)/ (mx - mn)) * parseInt('FFFFFF', 16)).toString(16);
		return '#' + '0'.repeat(o.length<6 ? 6-o.length : 0) + o;
	};	
	/************************** end of class methods *************************************/
		
	// Compute the distinct nodes from the links.
	this.model.links.forEach(function(link) {		
		link.source = nodes[link.source] || (nodes[link.source] = {name: link.source, istarget: false});
		link.target = nodes[link.target] || (nodes[link.target] = {name: link.target, istarget: true});
		corrs[link.source.name] = link.corr;
		corrs[link.target.name] = option.tgtcorr;
	});

	view.force = d3.layout.force()
		.nodes(d3.values(model.nodes))
		.links(model.links)
		.size([option.width, option.height])
		.linkDistance(function(n) {
			return (1 - Math.abs(n.corr)) * option.dlscale;
		})
		.charge(-300)
		.on("tick", controller.tick)
		.start();

	view.svg = d3.select('#'+option.parentid).append("svg")
		.attr("width", option.width)
		.attr("height", option.height);

	// Per-type markers, as they don't inherit styles.
	view.svg.append("defs").selectAll("marker")
		.data(view.force.links())
		.enter().append("marker")
		.attr("id", function(l) { 
			return l.source.name + '-' + l.target.name; 
		})
		.attr("viewBox", "0 -5 10 10")
		.attr("refX", 15)
		.attr("refY", -1.5)
		.attr("markerWidth", 15)
		.attr("markerHeight", 15)
		.attr("orient", "auto")
		.style("fill", function(l) {
			return controller.getRgbFromRng(l.corr);
		})
		.append("path")
		//.attr("d", "M0,-5L10,0L0,5");
		.attr("d", "M-5,-5L5,0L-5,5");

	view.path = view.svg.append("g").selectAll("path")
		.data(view.force.links())
		.enter().append("path")
		.attr("stroke", function(d) { 
			return controller.getRgbFromRng(d.corr); 
		})
		.style("stroke-width", function(n) {
			return '1.5px';
		})
		//.style("stroke-dasharray", function(n) { return '0,2 1'; })	
		.attr("fill", function(d) { 
			return "none"; 
		})	
		.attr("marker-end", function(l) { 
			return "url(#"+l.source.name + '-' + l.target.name+")"; 
		});

	view.circle = view.svg.append("g").selectAll("circle")
		.data(view.force.nodes())
		.enter().append("circle")
		.attr("r", function(n) {
			return controller.cirRadius(n);
		})
		.style("fill", function(n) {
			return n.istarget ? '#CCCCCC' : controller.getRgbFromRng(corrs[n.name]);
		})
		.style("stroke", function(n) {
			return '#333';
		})
		.style("stroke-width", function(n) {
			return '1.5px';
		})	
		.call(view.force.drag);

	view.text = view.svg.append("g").selectAll("text")
		.data(view.force.nodes())
		.enter().append("text")
		.attr("x", function(n) {
			return "-1.6em";
		})
		.attr("y", function(n) {
			return "0.4em";;
		})
		.style('font-weight', 'bold')
		.style('font', '10px sans-serif')
		.attr('pointer-events', 'none')
		.style('text-shadow', '0 1px 0 #fff, 1px 0 0 #fff, 0 -1px 0 #fff, -1px 0 0 #fff')
		.text(function(d) { 
			return d.name; 
		});
		
	view.ltext = view.svg.append("g").selectAll("text")
		.data(view.force.links())
		.enter().append("text")
		.attr("x", function(n) {
			return "-1.6em";
		})
		.attr("y", function(n) {
			return 0;
		})
		.style('font-weight', 'bold')
		.style("stroke", function(l) {
			return controller.getRgbFromRng(l.corr);
		})
		.style('font', '10px sans-serif')
		.attr('pointer-events', 'none')
		.style('text-shadow', '0 1px 0 #fff, 1px 0 0 #fff, 0 -1px 0 #fff, -1px 0 0 #fff')
		.text(function(l) { 
			return Math.round(l.corr * 100) + ' %'; 
		});	
		
};


pf.comp.util = {
	divwait : null,
	dload : function(filename, filetype) {
		var fileref = {};
		if (filetype == "js") { // if filename is a external JavaScript file
			fileref = document.createElement('script');
			fileref.setAttribute("type", "text/javascript");
			fileref.setAttribute("src", filename);
		} else if (filetype == "css") { // if filename is an external CSS file
			fileref = document.createElement("link");
			fileref.setAttribute("rel", "stylesheet");
			fileref.setAttribute("type", "text/css");
			fileref.setAttribute("href", filename);
		}
		if (typeof fileref != "undefined")
			document.getElementsByTagName("head")[0].appendChild(fileref);

	},
	wait : function() {
		if (!this.divwait) {
			this.divwait = document.createElement('div');
			document.body.appendChild(this.divwait);
			this.divwait.style.display = 'none';
			this.divwait.id = "divwait";
			this.divwait.style.position = 'absolute';
			$('#divwait').width($(document).width());
			$('#divwait').height($(document).height());
			$('#divwait').css({
				top : 0,
				left : 0,
				zIndex : 1001,
				'background-image' : 'url(/resources/images/ajax-loader.gif)',
				'background-position' : 'center center',
				'background-repeat' : 'no-repeat',
				'opacity' : .7
			});
		}
		this.divwait.style.display = 'block';
	},
	done : function() {
		if (this.divwait)
			this.divwait.style.display = 'none';
	},
	inside : function(c, e) {
		if (!c || !e)
			return false;
		var pos = this.getxy(e);
		var rect = c.getBoundingClientRect();
		return (pos && rect && rect.top && rect.left && rect.width
				&& rect.height && rect.left <= pos.x
				&& pos.x <= (rect.left + rect.width) && rect.top <= pos.y && pos.y <= (rect.top + rect.height));
	},
	getxy : function(e) {
		e = e || window.event;
		var pageX = e.pageX;
		var pageY = e.pageY;
		if (pageX === undefined) {
			pageX = e.clientX + document.body.scrollLeft
					+ document.documentElement.scrollLeft;
			pageY = e.clientY + document.body.scrollTop
					+ document.documentElement.scrollTop;
		}
		return {
			x : pageX,
			y : pageY
		};
	},
	trim : function(e) {
		return !e ? e : (e + '').replace(/^\s*(\w*)\s*$/, '$1');
	}, 
	isie : function() {
		return /Explorer/.test(BrowserDetect.browser) || /rv:11.0/.test(navigator.userAgent); 
	}
};
