$(function() {
	nie.use(["nie.util.video", "ui.tab"], function() {
		mss.use('parallax', 'p1', 'p2','p3', 'nav');
	})
})


// 判断是否有支持css3的浏览器
var aBrowser = ['-webkit-', '-moz-', '', '-ms-'],
	dom = document.createElement('div').style,
	browser = 'sb ie';
for (var i = 0; i < aBrowser.length; i++) {
	if (aBrowser[i] + 'transform' in dom) {
		browser = aBrowser[i];
		break;
	}
}

// function
function addVideo(view, control) {
	var getVal = control ? control : view,
		f4v = getVal.data("url"),
		mp4 = f4v.replace(/.f4v$/, ".mp4"),
		startImg = getVal.data("img"),
		w = view.width(),
		h = view.height();
	nie.util.video(view, {
		movieUrl: f4v,
		mp4_movieUrl: mp4,
		width: w,
		height: h,
		wmode: "opaque",
		startImg: startImg,
		autoPlay: true
	})
}

function opends(o) {
	var obj = $(o);
	$("#shade").show();
	obj.fadeIn().css({
		"top": ($(window).height() - obj.height()) / 2 + $(window).scrollTop(),
		"left": ($(window).width() - obj.outerWidth()) / 2 + $(window).scrollLeft()
	});
}

function closeds() {
	$("#shade,#pop").hide();
}

var mss = {
	use: function() {
		if (arguments.length < 1) return false;
		for (var i = 0; i < arguments.length; i++) {
			this[arguments[i]] && this[arguments[i]]();
		}
	},
	parallax: function() {
		var vh = $(window).height(),
			t2 = 1000 - vh,
			t3 = 1960 - vh,
			t4 = 2956 - vh,
			p1p = $(".m-part1").find('.people'),
			p1c = $(".m-part1").find('.cont'),
			p2p = $(".m-part2").find('.people'),
			p2c = $(".m-part2").find('.cont'),
			p3p = $(".m-part3").find('.people'),
			p3c = $(".m-part3").find('.cont'),
			p4p = $(".m-part4").find('.people'),
			p4c = $(".m-part4").find('.cont');

			$(window).scroll(function() {
				var t = $(window).scrollTop(),
					t1i,t2i, t3i, t4i;

				if (t>=0 && t<=1000) {
					t1i=t<1000?t:1000;
					p1p.css({
						backgroundPosition: Math.floor(t1i * 0.1)+1 + 'px ' + (Math.floor(t1i * 0.16)-30) + 'px'
					})
					p1c.css({
						top: -Math.floor(t1i * 0.3) + 'px'
					})
				}
				if (t > t2 && t<=1960) {

					t2i = t>1000?200:t - 800;
					p2p.css({
						backgroundPosition: 37+Math.floor(-t2i * 0.18) + 'px ' +(60- Math.floor(t2i * 0.3)) + 'px'
					})
					p2c.css({
						marginLeft: -980+Math.floor(t2i * 0.1)
					})
				}
				if (t >t3 && t<=2956) {
					t3i = t>1960?200:t - 1760;
					p3p.css({
						backgroundPosition: -101+Math.floor(t3i * 0.5) + 'px 0'
					})
					p3c.css({
						marginLeft: -1000+Math.floor(t3i * 0.2)
					})
				}
				if (t >t4) {
					t4i = t>2956?300:t - 2656;
					p4c.css({
						marginLeft: -1110+Math.floor(t4i * 0.5)
					})
					p4p.css({
						backgroundPosition: '0 '+(241-Math.floor(t4i * 0.8)+'px')
					})
				}
			})
	},
	p1: function() {
		var oPop = $("#pop"),
			oVideo = $("#video");
		$("#j-open-video").click(function() {
			opends(oPop)
			addVideo(oVideo, $(this))
		})

		$("#pop").find('.close').click(function() {
			closeds();
			oVideo.empty();
		})
	},
	nav: function() {
		$('[data-target]').click(function() {
			var _this = $(this),
				target = "." + _this.data('target');
			_this.addClass('curr').siblings().removeClass('curr');
			$('html,body').animate({
				scrollTop: $(target).offset().top
			},1000);
		})

		var oBody = $('body'),
			oNav = $('nav').eq(0);
		$(window).resize(function() {
			var w = $(window).width();
			if (w < 1700) {
				oBody.addClass('g-mini');
				oNav.attr('class', 'm-nav-mini');
			} else {
				oBody.removeClass();
				oNav.attr('class', 'm-nav');
			}
		}).trigger('resize');


		function navSelect(selecter) {
			var arr = $(selecter);
			var ret = [];
			for (var i = 0; i < arr.length; i++) {
				ret.push(arr.eq(i).position().top)
			}
			function scrollFn () {
				var st = $(window).scrollTop();
				var nowModule = null;
				for (var i = 0; i < ret.length; i++) {
					if (st >= ret[i] && st < ret[i + 1]) {
						nowModule = i;
						break;
					}
				}
				if(nowModule == null&&st>ret[0]) nowModule = ret.length - 1;
				$("nav:eq(0) li").removeClass("curr");
				if (nowModule!=null) {
					$("nav:eq(0) li").eq(nowModule).addClass("curr");
				}
			}
			$(window).scroll(function() {
				scrollFn()
			})
			$(function  () {
				scrollFn()
			})
		}

		navSelect('.m-part')
	},
	p2: function() {
		var str = '',
			oSwitch = $(".m-switch"),
			oSwitchItem = oSwitch.find('figure'),
			oSwitchAni = oSwitchItem.find('.ani');

		// 生成小按钮
		for (var i = 0; i < oSwitchItem.length; i++) {
			str += '<span></span>';
		};
		$('.m-switch').find('.trigger').html(str);

		// tab组件使用callback调用动画函数，记数进行扩展自动轮播
		var now = 0,
			timer,
			oSwitchBtn = oSwitch.find('.trigger span');
		$.tab('.m-switch .trigger span', '.m-switch figure', {
			activeClass: "curr",
			fn: function(num) {
				now = num;
				oSwitchAni.stop(true, false).removeAttr('style');
				switch (num) {
					case 0:
						oSwitchAni.eq(0).css({
							visibility: 'visible',
							opacity: '0',
							marginTop: '-200px'
						}).animate({
							marginTop: 0,
							opacity: 1
						}, 1000);
						break;
					case 1:
						oSwitchAni.eq(1).css({
							visibility: 'visible',
							opacity: '0',
							marginTop: '-100px',
							marginLeft: '200px'
						}).animate({
							marginTop: 0,
							marginLeft: 0,
							opacity: 1
						}, 1000);
						break;
					case 2:
						oSwitchAni.eq(2).css({
							visibility: 'visible',
							opacity: '0',
							height: 0
						}).animate({
							height: 419,
							opacity: 1
						}, 1000);
						break;
				}
			}
		});

		function autoPlay() {
			timer = setTimeout(function() {
				oSwitchBtn.eq(now > 1 ? 0 : now + 1).trigger('mouseover');
				autoPlay();
			}, 5000)
		}

		autoPlay()

		oSwitch.mouseenter(function() {
			clearTimeout(timer);
		});

		oSwitch.mouseleave(function() {
			clearTimeout(timer);
			autoPlay();
		});

		$('.u-next').each(function  (num) {
			$(this).click(function  () {
				$('nav:eq(0) li').eq(num+1).trigger('click');
			})
		})
	},
	p3: function() {
		var view = $('.m-view');
		$(".m-control li").each(function(num) {
			$(this).click(function() {
				var _this = $(this);
				view.eq(num).addClass('curr').siblings().removeClass('curr')
				if (browser != 'sb ie') {
					_this.addClass('curr').siblings().find('.icon').each(function() {
						var obj = {},
							that = $(this);
						obj[browser + 'transform'] = 'scale(.554) rotate(0)';
						if ($(this).attr('style')) {
							$(this).css(obj);
							setTimeout(function() {
								that.removeAttr('style').parent().removeClass('curr');
							}, 300)
						}
					});
					setTimeout(function() {
						var obj = {};
						obj[browser + 'transition'] = browser + 'transform .3s linear';
						obj[browser + 'transform'] = 'scale(1) rotate(360deg)';
						_this.find('.icon').css(obj);
					}, 100)
				} else {
					_this.addClass('curr').siblings().removeClass('curr');
				}
			})
		}).eq(1).trigger('click');

		function albumTab(wrap) {
			var imgWrap = wrap.find(".list"),
				imgEle = imgWrap.find("li"),
				imgLen = imgEle.length,
				imgW = imgEle.outerWidth(true),
				oPrev = wrap.find(".prev"),
				oNext = wrap.find(".next"),
				now = 0;
			imgEle.each(function(num) {
				now == num ?
					$(this).css({
						"zIndex": 2
					}).show() :
					$(this).css({
						"zIndex": 1
					}).hide();
			})
			oNext.click(function() {
				++now >= imgLen && (now = 0);
				imgEle.each(function(num) {
					now == num ?
						$(this).css("zIndex", 2).stop(true, true).fadeIn() :
						$(this).css("zIndex", 1).stop(true, true).fadeOut();
				})
			})
			oPrev.click(function() {
				--now < 0 && (now = imgLen - 1);
				imgEle.each(function(num) {
					now == num ?
						$(this).css("zIndex", 2).stop(true, true).fadeIn() :
						$(this).css("zIndex", 1).stop(true, true).fadeOut();
				})
			})
		}

		albumTab($('.m-view2'))
		albumTab($('.m-view1'))
		albumTab($('.m-view3'))
	}
}