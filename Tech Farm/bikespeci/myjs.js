//<![CDATA[
/*! Theia Sticky Sidebar | v1.7.0 - https://github.com/WeCodePixels/theia-sticky-sidebar */
(function($){$.fn.theiaStickySidebar=function(options){var defaults={'containerSelector':'','additionalMarginTop':0,'additionalMarginBottom':0,'updateSidebarHeight':true,'minWidth':0,'disableOnResponsiveLayouts':true,'sidebarBehavior':'modern','defaultPosition':'relative','namespace':'TSS'};options=$.extend(defaults,options);options.additionalMarginTop=parseInt(options.additionalMarginTop)||0;options.additionalMarginBottom=parseInt(options.additionalMarginBottom)||0;tryInitOrHookIntoEvents(options,this);function tryInitOrHookIntoEvents(options,$that){var success=tryInit(options,$that);if(!success){console.log('TSS: Body width smaller than options.minWidth. Init is delayed.');$(document).on('scroll.'+options.namespace,function(options,$that){return function(evt){var success=tryInit(options,$that);if(success){$(this).unbind(evt)}}}(options,$that));$(window).on('resize.'+options.namespace,function(options,$that){return function(evt){var success=tryInit(options,$that);if(success){$(this).unbind(evt)}}}(options,$that))}}function tryInit(options,$that){if(options.initialized===true){return true}if($('body').width()<options.minWidth){return false}init(options,$that);return true}function init(options,$that){options.initialized=true;var existingStylesheet=$('#theia-sticky-sidebar-stylesheet-'+options.namespace);if(existingStylesheet.length===0){$('head').append($('<style id="theia-sticky-sidebar-stylesheet-'+options.namespace+'">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>'))}$that.each(function(){var o={};o.sidebar=$(this);o.options=options||{};o.container=$(o.options.containerSelector);if(o.container.length==0){o.container=o.sidebar.parent()}o.sidebar.parents().css('-webkit-transform','none');o.sidebar.css({'position':o.options.defaultPosition,'overflow':'visible','-webkit-box-sizing':'border-box','-moz-box-sizing':'border-box','box-sizing':'border-box'});o.stickySidebar=o.sidebar.find('.theiaStickySidebar');if(o.stickySidebar.length==0){var javaScriptMIMETypes=/(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;o.sidebar.find('script').filter(function(index,script){return script.type.length===0||script.type.match(javaScriptMIMETypes)}).remove();o.stickySidebar=$('<div>').addClass('theiaStickySidebar').append(o.sidebar.children());o.sidebar.append(o.stickySidebar)}o.marginBottom=parseInt(o.sidebar.css('margin-bottom'));o.paddingTop=parseInt(o.sidebar.css('padding-top'));o.paddingBottom=parseInt(o.sidebar.css('padding-bottom'));var collapsedTopHeight=o.stickySidebar.offset().top;var collapsedBottomHeight=o.stickySidebar.outerHeight();o.stickySidebar.css('padding-top',1);o.stickySidebar.css('padding-bottom',1);collapsedTopHeight-=o.stickySidebar.offset().top;collapsedBottomHeight=o.stickySidebar.outerHeight()-collapsedBottomHeight-collapsedTopHeight;if(collapsedTopHeight==0){o.stickySidebar.css('padding-top',0);o.stickySidebarPaddingTop=0}else{o.stickySidebarPaddingTop=1}if(collapsedBottomHeight==0){o.stickySidebar.css('padding-bottom',0);o.stickySidebarPaddingBottom=0}else{o.stickySidebarPaddingBottom=1}o.previousScrollTop=null;o.fixedScrollTop=0;resetSidebar();o.onScroll=function(o){if(!o.stickySidebar.is(":visible")){return}if($('body').width()<o.options.minWidth){resetSidebar();return}if(o.options.disableOnResponsiveLayouts){var sidebarWidth=o.sidebar.outerWidth(o.sidebar.css('float')=='none');if(sidebarWidth+50>o.container.width()){resetSidebar();return}}var scrollTop=$(document).scrollTop();var position='static';if(scrollTop>=o.sidebar.offset().top+(o.paddingTop-o.options.additionalMarginTop)){var offsetTop=o.paddingTop+options.additionalMarginTop;var offsetBottom=o.paddingBottom+o.marginBottom+options.additionalMarginBottom;var containerTop=o.sidebar.offset().top;var containerBottom=o.sidebar.offset().top+getClearedHeight(o.container);var windowOffsetTop=0+options.additionalMarginTop;var windowOffsetBottom;var sidebarSmallerThanWindow=(o.stickySidebar.outerHeight()+offsetTop+offsetBottom)<$(window).height();if(sidebarSmallerThanWindow){windowOffsetBottom=windowOffsetTop+o.stickySidebar.outerHeight()}else{windowOffsetBottom=$(window).height()-o.marginBottom-o.paddingBottom-options.additionalMarginBottom}var staticLimitTop=containerTop-scrollTop+o.paddingTop;var staticLimitBottom=containerBottom-scrollTop-o.paddingBottom-o.marginBottom;var top=o.stickySidebar.offset().top-scrollTop;var scrollTopDiff=o.previousScrollTop-scrollTop;if(o.stickySidebar.css('position')=='fixed'){if(o.options.sidebarBehavior=='modern'){top+=scrollTopDiff}}if(o.options.sidebarBehavior=='stick-to-top'){top=options.additionalMarginTop}if(o.options.sidebarBehavior=='stick-to-bottom'){top=windowOffsetBottom-o.stickySidebar.outerHeight()}if(scrollTopDiff>0){top=Math.min(top,windowOffsetTop)}else{top=Math.max(top,windowOffsetBottom-o.stickySidebar.outerHeight())}top=Math.max(top,staticLimitTop);top=Math.min(top,staticLimitBottom-o.stickySidebar.outerHeight());var sidebarSameHeightAsContainer=o.container.height()==o.stickySidebar.outerHeight();if(!sidebarSameHeightAsContainer&&top==windowOffsetTop){position='fixed'}else if(!sidebarSameHeightAsContainer&&top==windowOffsetBottom-o.stickySidebar.outerHeight()){position='fixed'}else if(scrollTop+top-o.sidebar.offset().top-o.paddingTop<=options.additionalMarginTop){position='static'}else{position='absolute'}}if(position=='fixed'){var scrollLeft=$(document).scrollLeft();o.stickySidebar.css({'position':'fixed','width':getWidthForObject(o.stickySidebar)+'px','transform':'translateY('+top+'px)','left':(o.sidebar.offset().left+parseInt(o.sidebar.css('padding-left'))-scrollLeft)+'px','top':'0px'})}else if(position=='absolute'){var css={};if(o.stickySidebar.css('position')!='absolute'){css.position='absolute';css.transform='translateY('+(scrollTop+top-o.sidebar.offset().top-o.stickySidebarPaddingTop-o.stickySidebarPaddingBottom)+'px)';css.top='0px'}css.width=getWidthForObject(o.stickySidebar)+'px';css.left='';o.stickySidebar.css(css)}else if(position=='static'){resetSidebar()}if(position!='static'){if(o.options.updateSidebarHeight==true){o.sidebar.css({'min-height':o.stickySidebar.outerHeight()+o.stickySidebar.offset().top-o.sidebar.offset().top+o.paddingBottom})}}o.previousScrollTop=scrollTop};o.onScroll(o);$(document).on('scroll.'+o.options.namespace,function(o){return function(){o.onScroll(o)}}(o));$(window).on('resize.'+o.options.namespace,function(o){return function(){o.stickySidebar.css({'position':'static'});o.onScroll(o)}}(o));if(typeof ResizeSensor!=='undefined'){new ResizeSensor(o.stickySidebar[0],function(o){return function(){o.onScroll(o)}}(o))}function resetSidebar(){o.fixedScrollTop=0;o.sidebar.css({'min-height':'1px'});o.stickySidebar.css({'position':'static','width':'','transform':'none'})}function getClearedHeight(e){var height=e.height();e.children().each(function(){height=Math.max(height,$(this).height())});return height}})}function getWidthForObject(object){var width;try{width=object[0].getBoundingClientRect().width}catch(err){}if(typeof width==="undefined"){width=object.width()}return width}return this}})(jQuery);

/*! MenuIfy by Templateify | v1.0.0 - https://www.templateify.com */
!function(a){a.fn.menuify=function(){return this.each(function(){var $t=a(this),b=$t.find('.LinkList ul > li').children('a'),c=b.length;for(var i=0;i<c;i++){var d=b.eq(i),h=d.text();if(h.charAt(0)!=='_'){var e=b.eq(i+1),j=e.text();if(j.charAt(0)==='_'){var m=d.parent();m.append('<ul class="sub-menu m-sub"/>');}}if(h.charAt(0)==='_'){d.text(h.replace('_',''));d.parent().appendTo(m.children('.sub-menu'));}}for(var i=0;i<c;i++){var f=b.eq(i),k=f.text();if(k.charAt(0)!=='_'){var g=b.eq(i+1),l=g.text();if(l.charAt(0)==='_'){var n=f.parent();n.append('<ul class="sub-menu2 m-sub"/>');}}if(k.charAt(0)==='_'){f.text(k.replace('_',''));f.parent().appendTo(n.children('.sub-menu2'));}}$t.find('.LinkList ul li ul').parent('li').addClass('has-sub');});}}(jQuery);

/*! Tabify by Templateify | v1.0.0 - https://www.templateify.com */
!function(a){a.fn.tabify=function(b){b=jQuery.extend({onHover:false,animated:true,transition:'fadeInUp'},b);return this.each(function(){var e=a(this),c=e.children('[tab-ify]'),d=0,n='tab-animated',k='tab-active';if(b.onHover==true){var event='mouseenter'}else{var event='click'}e.prepend('<ul class="select-tab"></ul>');c.each(function(){if(b.animated==true){a(this).addClass(n)}e.find('.select-tab').append('<li><a href="javascript:;">'+a(this).attr('tab-ify')+'</a></li>')}).eq(d).addClass(k).addClass('tab-'+b.transition);e.find('.select-tab a').on(event,function(){var f=a(this).parent().index();a(this).closest('.select-tab').find('.active').removeClass('active');a(this).parent().addClass('active');c.removeClass(k).removeClass('tab-'+b.transition).eq(f).addClass(k).addClass('tab-'+b.transition);return false}).eq(d).parent().addClass('active')})}}(jQuery);

/*! jQuery replaceText by "Cowboy" Ben Alman | v1.1.0 - http://benalman.com/projects/jquery-replacetext-plugin/ */
(function($){$.fn.replaceText=function(b,a,c){return this.each(function(){var f=this.firstChild,g,e,d=[];if(f){do{if(f.nodeType===3){g=f.nodeValue;e=g.replace(b,a);if(e!==g){if(!c&&/</.test(e)){$(f).before(e);d.push(f)}else{f.nodeValue=e}}}}while(f=f.nextSibling)}d.length&&$(d).remove()})}})(jQuery);
var _$_obify3 = ["lazyify", "fn", "data-image", "attr", "width", "round", "height", "/w", "-h", "-p-k-no-nu", "", "s72-c", "match", "/s72-c", "replace", "w72-h", "/w72-h72-p-k-no-nu", "load resize scroll", "on", "scrollTop", "top", "offset", "onload", "lazy-ify", "addClass", "style", "background-image:url(", "src", ")", "each", "menuify", "#magify-main-menu", "show-menu", "#magify-main-menu .widget", "click", "search-active", "toggleClass", "body", ".search-toggle", "text", ".blog-posts-title a.more,.related-title a.more", ".follow-by-email-text", "trim", "$ads={1}", "<div id=\"new-before-ad\"/>", "replaceWith", "$ads={2}", "<div id=\"new-after-ad\"/>", ".post-body strike", "length", "appendTo", "#before-ad", "#new-before-ad", "#after-ad", "#new-after-ad", "#main-before-ad .widget", "#main-after-ad .widget", ".count", "find", "content", "data", "$", "split", "href", "#social-counter ul.social-icons li a", "//resources.blogblog.com/img/blank.gif", "//4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/s35-r/avatar.jpg", "//img1.blogblog.com/img/blank.gif", ".avatar-image-container img", "/", "pop", "button", "css", "colored-button", ".post-body a", "html", "contact-form", "<div class=\"contact-form\"/>", "#ContactForm1", "append", ".contact-form", "alert-success", "<div class=\"alert-message alert-success short-b\">", "</div>", "alert-info", "<div class=\"alert-message alert-info short-b\">", "alert-warning", "<div class=\"alert-message alert-warning short-b\">", "alert-error", "<div class=\"alert-message alert-error short-b\">", "left-sidebar", "<style>.item #main-wrapper{float:right}.item #sidebar-wrapper{float:left}</style>", "right-sidebar", "<style>.item #main-wrapper{float:left}.item #sidebar-wrapper{float:right}</style>", "full-width", "<style>.item #main-wrapper{width:100%}.item #sidebar-wrapper{display:none}</style>", "code-box", "<pre class=\"code-box short-b\">", "</pre>", "b", ".post-body .short-b", "url", "screen", "_blank", "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=", ",height=", ",left=", ",top=", "open", "focus", ".share-links .window-ify,.entry-share .window-ify", ".show-hid a", "show-hidden", ".share-links", "<li class=\"", "\"><a href=\"", "\" title=\"", "\" target=\"_blank\"/></li>", ".author-description span li", ".author-description", "show-icons", ".about-author .author-description span a", "a", "toLowerCase", "getmega", "has-sub mega-menu", "msimple", "#magify-main-menu li", "featured", "#featured .HTML .widget-content", ".block-posts .HTML .widget-content", ".widget-ready .HTML .widget-content", "data-label", ".related-tag", "related", "getrelated", ".related-content", "<span class=\"no-posts\"><b>Error:</b> No Results Found</span>", "<div class=\"no-posts error-503\"><b>Error loading feeds!</b> Maybe because the connection failed or the blogger server did not respond to the request.</div>", "<div class=\"loader\"/>", "/feeds/posts/summary?alt=json&max-results=", "recent", "list", "/feeds/comments/summary?alt=json&max-results=", "/feeds/posts/summary/-/", "?alt=json&max-results=", "comments", "link", "rel", "alternate", "$t", "title", "media$thumbnail", "img.youtube.com", "/default.", "/0.", "https://4.bp.blogspot.com/-eALXtf-Ljts/WrQYAbzcPUI/AAAAAAAABjY/vptx-N2H46oFbiCqbSe2JgVSlHhyl0MwQCK4BGAYYCw/s72-c/nth-ify.png", "name", "author", "postAuthor", "true", "<span class=\"entry-author\">", "</span>", "published", "substring", " ", ", ", "postDate", "<span class=\"entry-time\"><time class=\"published\" datetime=\"", "\">", "</time></span>", "<div class=\"entry-meta\">", "category", "term", "<span class=\"entry-category\">", "/s113", "/w55-h55-p-k-no-nu", "gd$image", "//4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/w55-h55-p-k-no-nu/avatar.jpg", "<article class=\"custom-item item-", "\"><a class=\"entry-image-link cmm-avatar\" href=\"", "\"><span class=\"entry-thumb\" data-image=\"", "\"/></a><h2 class=\"entry-title\"><a href=\"", "</a></h2><p class=\"cmm-snippet excerpt\">", "</p></article>", ".id-", "-", " .entry-category{background-color:", ";color:#fff}.id-", " .loader:after{border-color:", ";border-right-color:rgba(155,155,155,0.2)}", " .title-wrap:after,.id-", " .title-wrap > a.more:hover,.id-", " .entry-header:not(.entry-info) .entry-title a:hover{color:", "}.id-", "block1", "col-left", "col-right", "grid1", "videos", "geterror404", "GET", "json", "prepend", "#page-skin-2", "id-", " show-ify", "parent", "column-left block-column id-", "column-right block-column id-", "show-ify", "<ul class=\"mega-widget\">", "<div class=\"featured-posts\">", "<div class=\"block-posts-1\">", "<div class=\"column-posts\">", "<div class=\"grid-posts-1\">", "<div class=\"block-videos\">", "<div class=\"custom-widget\">", "<div class=\"related-posts\">", "entry", "feed", "<article class=\"mega-item\"><div class=\"mega-content\"><a class=\"entry-image-link\" href=\"", "</a></h2>", "</div></article>", "<article class=\"featured-item post item-", "\"><div class=\"featured-item-inner\"><a class=\"entry-image-link before-mask\" href=\"", "\"/></a>", "<div class=\"entry-header entry-info\"><h2 class=\"entry-title\"><a href=\"", "</div></div></article>", "<article class=\"block-item item-", "\"><div class=\"block-inner\">", "<a class=\"entry-image-link before-mask\" href=\"", "\"/></a><div class=\"entry-header entry-info\"><h2 class=\"entry-title\"><a href=\"", "\"><a class=\"entry-image-link\" href=\"", "\"/></a><div class=\"entry-header\"><h2 class=\"entry-title\"><a href=\"", "<article class=\"column-item item-", "\"><div class=\"column-inner\">", "<article class=\"grid-item item-", "\"><div class=\"entry-image\"><a class=\"entry-image-link\" href=\"", "\"/></a></div><div class=\"entry-header\"><h2 class=\"entry-title\"><a href=\"", "<article class=\"videos-item item-", "\"/><span class=\"video-icon\"/></a></div><div class=\"entry-header\"><h2 class=\"entry-title\"><a href=\"", "<article class=\"related-item post item-", "</ul>", "/search", "/search/label/", "a:first", "span.entry-thumb", "<ul>", "ajax", "getfeatured", "getblock", "showMore", "<a class=\"more\" href=\"/search/label/", "</a>", ".widget-title", "getwidget", "<div class=\"fb-comments\" data-width=\"100%\" data-href=\"", "\" order_by=\"time\" data-numposts=\"5\"></div>", "comments-system-", "show", ".entry-meta .entry-comments-link", "blogger", "disqus", "#comments", "facebook", "hide", "comments-system-default", ".comments .toplevel-thread > ol > .comment .comment-actions .comment-reply", ".comments .toplevel-thread > #top-continue", ".blog-post-comments", ".index-post .entry-image-link .entry-thumb, .PopularPosts .entry-image-link .entry-thumb, .FeaturedPost .entry-image-link .entry-thumb,.about-author .author-avatar", "clone", "#main-logo .header-widget a", "remove", "#h1-tag", ".mobile-logo", "#magify-main-menu-nav", "id", "main-mobile-nav", ".getMega, .mega-widget, .mega-tab", "class", "sub-menu m-sub", ".complex-tabs > ul.select-tab", ".complex-tabs", ".mega-menu > a", ".mega-tabs ul li > a", "nav-active", ".show-mobile-menu, .hide-mobile-menu, .overlay", "<div class=\"submenu-toggle\"/>", ".mobile-menu .has-sub", ".submenu-toggle", ".mobile-menu .mega-menu", ".mobile-menu .mega-tabs", "has-sub", "hasClass", "preventDefault", "slideToggle", ".m-sub", "children", "> .m-sub", "removeClass", ".mobile-menu ul li .submenu-toggle", "#mobile-menu", "#about-section ul.social-footer", "social-bg-hover", ".social-mobile", "#footer-wrapper", "is-fixed", "scroll", "#header-wrapper .headerify", "theiaStickySidebar", "#main-wrapper,#sidebar-wrapper", "visibility:visible!important;opacity:1!important;position:relative!important;z-index:1!important;font-size:14px!important;color:#fff!important;", "Blogger Templates", "", "a#templateify", "a#templateify:visible", "location", "fadeIn", "fadeOut", "on-footer", "animate", "html, body", ".back-top", "<img src=\"$1\"/>", "replaceText", "<iframe id=\"youtube\" width=\"100%\" height=\"358\" src=\"https://www.youtube.com/embed/$1\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>", "p.comment-content", "load", "#load-more-link", ".blog-posts", "post-animated post-fadeInUp", ".index-post", "#blog-pager .no-more", ".index-post .entry-image-link .entry-thumb", "#blog-pager .loading"];

var _$_obify2 = [_$_obify3[0], _$_obify3[1], _$_obify3[2], _$_obify3[3], _$_obify3[4], _$_obify3[5], _$_obify3[6], _$_obify3[7], _$_obify3[8], _$_obify3[9], _$_obify3[10], _$_obify3[11], _$_obify3[12], _$_obify3[13], _$_obify3[14], _$_obify3[15], _$_obify3[16], _$_obify3[17], _$_obify3[18], _$_obify3[19], _$_obify3[20], _$_obify3[21], _$_obify3[22], _$_obify3[23], _$_obify3[24], _$_obify3[25], _$_obify3[26], _$_obify3[27], _$_obify3[28], _$_obify3[29], _$_obify3[30], _$_obify3[31], _$_obify3[32], _$_obify3[33], _$_obify3[34], _$_obify3[35], _$_obify3[36], _$_obify3[37], _$_obify3[38], _$_obify3[39], _$_obify3[40], _$_obify3[41], _$_obify3[42], _$_obify3[43], _$_obify3[44], _$_obify3[45], _$_obify3[46], _$_obify3[47], _$_obify3[48], _$_obify3[49], _$_obify3[50], _$_obify3[51], _$_obify3[52], _$_obify3[53], _$_obify3[54], _$_obify3[55], _$_obify3[56], _$_obify3[57], _$_obify3[58], _$_obify3[59], _$_obify3[60], _$_obify3[61], _$_obify3[62], _$_obify3[63], _$_obify3[64], _$_obify3[65], _$_obify3[66], _$_obify3[67], _$_obify3[68], _$_obify3[69], _$_obify3[70], _$_obify3[71], _$_obify3[72], _$_obify3[73], _$_obify3[74], _$_obify3[75], _$_obify3[76], _$_obify3[77], _$_obify3[78], _$_obify3[79], _$_obify3[80], _$_obify3[81], _$_obify3[82], _$_obify3[83], _$_obify3[84], _$_obify3[85], _$_obify3[86], _$_obify3[87], _$_obify3[88], _$_obify3[89], _$_obify3[90], _$_obify3[91], _$_obify3[92], _$_obify3[93], _$_obify3[94], _$_obify3[95], _$_obify3[96], _$_obify3[97], _$_obify3[98], _$_obify3[99], _$_obify3[100], _$_obify3[101], _$_obify3[102], _$_obify3[103], _$_obify3[104], _$_obify3[105], _$_obify3[106], _$_obify3[107], _$_obify3[108], _$_obify3[109], _$_obify3[110], _$_obify3[111], _$_obify3[112], _$_obify3[113], _$_obify3[114], _$_obify3[115], _$_obify3[116], _$_obify3[117], _$_obify3[118], _$_obify3[119], _$_obify3[120], _$_obify3[121], _$_obify3[122], _$_obify3[123], _$_obify3[124], _$_obify3[125], _$_obify3[126], _$_obify3[127], _$_obify3[128], _$_obify3[129], _$_obify3[130], _$_obify3[131], _$_obify3[132], _$_obify3[133], _$_obify3[134], _$_obify3[135], _$_obify3[136], _$_obify3[137], _$_obify3[138], _$_obify3[139], _$_obify3[140], _$_obify3[141], _$_obify3[142], _$_obify3[143], _$_obify3[144], _$_obify3[145], _$_obify3[146], _$_obify3[147], _$_obify3[148], _$_obify3[149], _$_obify3[150], _$_obify3[151], _$_obify3[152], _$_obify3[153], _$_obify3[154], _$_obify3[155], _$_obify3[156], _$_obify3[157], _$_obify3[158], _$_obify3[159], _$_obify3[160], _$_obify3[161], _$_obify3[162], _$_obify3[163], _$_obify3[164], _$_obify3[165], _$_obify3[166], _$_obify3[167], _$_obify3[168], _$_obify3[169], _$_obify3[170], _$_obify3[171], _$_obify3[172], _$_obify3[173], _$_obify3[174], _$_obify3[175], _$_obify3[176], _$_obify3[177], _$_obify3[178], _$_obify3[179], _$_obify3[180], _$_obify3[181], _$_obify3[182], _$_obify3[183], _$_obify3[184], _$_obify3[185], _$_obify3[186], _$_obify3[187], _$_obify3[188], _$_obify3[189], _$_obify3[190], _$_obify3[191], _$_obify3[192], _$_obify3[193], _$_obify3[194], _$_obify3[195], _$_obify3[196], _$_obify3[197], _$_obify3[198], _$_obify3[199], _$_obify3[200], _$_obify3[201], _$_obify3[202], _$_obify3[203], _$_obify3[204], _$_obify3[205], _$_obify3[206], _$_obify3[207], _$_obify3[208], _$_obify3[209], _$_obify3[210], _$_obify3[211], _$_obify3[212], _$_obify3[213], _$_obify3[214], _$_obify3[215], _$_obify3[216], _$_obify3[217], _$_obify3[218], _$_obify3[219], _$_obify3[220], _$_obify3[221], _$_obify3[222], _$_obify3[223], _$_obify3[224], _$_obify3[225], _$_obify3[226], _$_obify3[227], _$_obify3[228], _$_obify3[229], _$_obify3[230], _$_obify3[231], _$_obify3[232], _$_obify3[233], _$_obify3[234], _$_obify3[235], _$_obify3[236], _$_obify3[237], _$_obify3[238], _$_obify3[239], _$_obify3[240], _$_obify3[241], _$_obify3[242], _$_obify3[243], _$_obify3[244], _$_obify3[245], _$_obify3[246], _$_obify3[247], _$_obify3[248], _$_obify3[249], _$_obify3[250], _$_obify3[251], _$_obify3[252], _$_obify3[253], _$_obify3[254], _$_obify3[255], _$_obify3[256], _$_obify3[257], _$_obify3[258], _$_obify3[259], _$_obify3[260], _$_obify3[261], _$_obify3[262], _$_obify3[263], _$_obify3[264], _$_obify3[265], _$_obify3[266], _$_obify3[267], _$_obify3[268], _$_obify3[269], _$_obify3[270], _$_obify3[271], _$_obify3[272], _$_obify3[273], _$_obify3[274], _$_obify3[275], _$_obify3[276], _$_obify3[277], _$_obify3[278], _$_obify3[279], _$_obify3[280], _$_obify3[281], _$_obify3[282], _$_obify3[283], _$_obify3[284], _$_obify3[285], _$_obify3[286], _$_obify3[287], _$_obify3[288], _$_obify3[289], _$_obify3[290], _$_obify3[291], _$_obify3[292], _$_obify3[293], _$_obify3[294], _$_obify3[295], _$_obify3[296], _$_obify3[297], _$_obify3[298], _$_obify3[299], _$_obify3[300], _$_obify3[301], _$_obify3[302], _$_obify3[303], _$_obify3[304], _$_obify3[305], _$_obify3[306], _$_obify3[307], _$_obify3[308], _$_obify3[309], _$_obify3[310], _$_obify3[311], _$_obify3[312], _$_obify3[313], _$_obify3[314], _$_obify3[315], _$_obify3[316], _$_obify3[317], _$_obify3[318], _$_obify3[319], _$_obify3[320], _$_obify3[321], _$_obify3[322], _$_obify3[323], _$_obify3[324], _$_obify3[325], _$_obify3[326], _$_obify3[327], _$_obify3[328], _$_obify3[329], _$_obify3[330], _$_obify3[331], _$_obify3[332], _$_obify3[333], _$_obify3[334], _$_obify3[335], _$_obify3[336]];
var _$_obify1 = [_$_obify2[0], _$_obify2[1], _$_obify2[2], _$_obify2[3], _$_obify2[4], _$_obify2[5], _$_obify2[6], _$_obify2[7], _$_obify2[8], _$_obify2[9], _$_obify2[10], _$_obify2[11], _$_obify2[12], _$_obify2[13], _$_obify2[14], _$_obify2[15], _$_obify2[16], _$_obify2[17], _$_obify2[18], _$_obify2[19], _$_obify2[20], _$_obify2[21], _$_obify2[22], _$_obify2[23], _$_obify2[24], _$_obify2[25], _$_obify2[26], _$_obify2[27], _$_obify2[28], _$_obify2[29], _$_obify2[30], _$_obify2[31], _$_obify2[32], _$_obify2[33], _$_obify2[34], _$_obify2[35], _$_obify2[36], _$_obify2[37], _$_obify2[38], _$_obify2[39], _$_obify2[40], _$_obify2[41], _$_obify2[42], _$_obify2[43], _$_obify2[44], _$_obify2[45], _$_obify2[46], _$_obify2[47], _$_obify2[48], _$_obify2[49], _$_obify2[50], _$_obify2[51], _$_obify2[52], _$_obify2[53], _$_obify2[54], _$_obify2[55], _$_obify2[56], _$_obify2[57], _$_obify2[58], _$_obify2[59], _$_obify2[60], _$_obify2[61], _$_obify2[62], _$_obify2[63], _$_obify2[64], _$_obify2[65], _$_obify2[66], _$_obify2[67], _$_obify2[68], _$_obify2[69], _$_obify2[70], _$_obify2[71], _$_obify2[72], _$_obify2[73], _$_obify2[74], _$_obify2[75], _$_obify2[76], _$_obify2[77], _$_obify2[78], _$_obify2[79], _$_obify2[80], _$_obify2[81], _$_obify2[82], _$_obify2[83], _$_obify2[84], _$_obify2[85], _$_obify2[86], _$_obify2[87], _$_obify2[88], _$_obify2[89], _$_obify2[90], _$_obify2[91], _$_obify2[92], _$_obify2[93], _$_obify2[94], _$_obify2[95], _$_obify2[96], _$_obify2[97], _$_obify2[98], _$_obify2[99], _$_obify2[100], _$_obify2[101], _$_obify2[102], _$_obify2[103], _$_obify2[104], _$_obify2[105], _$_obify2[106], _$_obify2[107], _$_obify2[108], _$_obify2[109], _$_obify2[110], _$_obify2[111], _$_obify2[112], _$_obify2[113], _$_obify2[114], _$_obify2[115], _$_obify2[116], _$_obify2[117], _$_obify2[118], _$_obify2[119], _$_obify2[120], _$_obify2[121], _$_obify2[122], _$_obify2[123], _$_obify2[124], _$_obify2[125], _$_obify2[126], _$_obify2[127], _$_obify2[128], _$_obify2[129], _$_obify2[130], _$_obify2[131], _$_obify2[132], _$_obify2[133], _$_obify2[134], _$_obify2[135], _$_obify2[136], _$_obify2[137], _$_obify2[138], _$_obify2[139], _$_obify2[140], _$_obify2[141], _$_obify2[142], _$_obify2[143], _$_obify2[144], _$_obify2[145], _$_obify2[146], _$_obify2[147], _$_obify2[148], _$_obify2[149], _$_obify2[150], _$_obify2[151], _$_obify2[152], _$_obify2[153], _$_obify2[154], _$_obify2[155], _$_obify2[156], _$_obify2[157], _$_obify2[158], _$_obify2[159], _$_obify2[160], _$_obify2[161], _$_obify2[162], _$_obify2[163], _$_obify2[164], _$_obify2[165], _$_obify2[166], _$_obify2[167], _$_obify2[168], _$_obify2[169], _$_obify2[170], _$_obify2[171], _$_obify2[172], _$_obify2[173], _$_obify2[174], _$_obify2[175], _$_obify2[176], _$_obify2[177], _$_obify2[178], _$_obify2[179], _$_obify2[180], _$_obify2[181], _$_obify2[182], _$_obify2[183], _$_obify2[184], _$_obify2[185], _$_obify2[186], _$_obify2[187], _$_obify2[188], _$_obify2[189], _$_obify2[190], _$_obify2[191], _$_obify2[192], _$_obify2[193], _$_obify2[194], _$_obify2[195], _$_obify2[196], _$_obify2[197], _$_obify2[198], _$_obify2[199], _$_obify2[200], _$_obify2[201], _$_obify2[202], _$_obify2[203], _$_obify2[204], _$_obify2[205], _$_obify2[206], _$_obify2[207], _$_obify2[208], _$_obify2[209], _$_obify2[210], _$_obify2[211], _$_obify2[212], _$_obify2[213], _$_obify2[214], _$_obify2[215], _$_obify2[216], _$_obify2[217], _$_obify2[218], _$_obify2[219], _$_obify2[220], _$_obify2[221], _$_obify2[222], _$_obify2[223], _$_obify2[224], _$_obify2[225], _$_obify2[226], _$_obify2[227], _$_obify2[228], _$_obify2[229], _$_obify2[230], _$_obify2[231], _$_obify2[232], _$_obify2[233], _$_obify2[234], _$_obify2[235], _$_obify2[236], _$_obify2[237], _$_obify2[238], _$_obify2[239], _$_obify2[240], _$_obify2[241], _$_obify2[242], _$_obify2[243], _$_obify2[244], _$_obify2[245], _$_obify2[246], _$_obify2[247], _$_obify2[248], _$_obify2[249], _$_obify2[250], _$_obify2[251], _$_obify2[252], _$_obify2[253], _$_obify2[254], _$_obify2[255], _$_obify2[256], _$_obify2[257], _$_obify2[258], _$_obify2[259], _$_obify2[260], _$_obify2[261], _$_obify2[262], _$_obify2[263], _$_obify2[264], _$_obify2[265], _$_obify2[266], _$_obify2[267], _$_obify2[268], _$_obify2[269], _$_obify2[270], _$_obify2[271], _$_obify2[272], _$_obify2[273], _$_obify2[274], _$_obify2[275], _$_obify2[276], _$_obify2[277], _$_obify2[278], _$_obify2[279], _$_obify2[280], _$_obify2[281], _$_obify2[282], _$_obify2[283], _$_obify2[284], _$_obify2[285], _$_obify2[286], _$_obify2[287], _$_obify2[288], _$_obify2[289], _$_obify2[290], _$_obify2[291], _$_obify2[292], _$_obify2[293], _$_obify2[294], _$_obify2[295], _$_obify2[296], _$_obify2[297], _$_obify2[298], _$_obify2[299], _$_obify2[300], _$_obify2[301], _$_obify2[302], _$_obify2[303], _$_obify2[304], _$_obify2[305], _$_obify2[306], _$_obify2[307], _$_obify2[308], _$_obify2[309], _$_obify2[310], _$_obify2[311], _$_obify2[312], _$_obify2[313], _$_obify2[314], _$_obify2[315], _$_obify2[316], _$_obify2[317], _$_obify2[318], _$_obify2[319], _$_obify2[320], _$_obify2[321], _$_obify2[322], _$_obify2[323], _$_obify2[324], _$_obify2[325], _$_obify2[326], _$_obify2[327], _$_obify2[328], _$_obify2[329], _$_obify2[330], _$_obify2[331], _$_obify2[332], _$_obify2[333], _$_obify2[334], _$_obify2[335], _$_obify2[336]];
! function (_0xaf1cx3) {
    _0xaf1cx3[_$_obify1[1]][_$_obify1[0]] = function () {
        return this[_$_obify1[29]](function () {
            var _0xaf1cx4 = _0xaf1cx3(this),
                _0xaf1cx5 = _0xaf1cx4[_$_obify1[3]](_$_obify1[2]),
                _0xaf1cx6 = Math[_$_obify1[5]](_0xaf1cx4[_$_obify1[4]]()),
                _0xaf1cx7 = Math[_$_obify1[5]](_0xaf1cx4[_$_obify1[6]]()),
                _0xaf1cx8 = _$_obify1[7] + _0xaf1cx6 + _$_obify1[8] + _0xaf1cx7 + _$_obify1[9],
                _0xaf1cx9 = _$_obify1[10];
            if (_0xaf1cx5[_$_obify1[12]](_$_obify1[11])) {
                _0xaf1cx9 = _0xaf1cx5[_$_obify1[14]](_$_obify1[13], _0xaf1cx8)
            } else {
                if (_0xaf1cx5[_$_obify1[12]](_$_obify1[15])) {
                    _0xaf1cx9 = _0xaf1cx5[_$_obify1[14]](_$_obify1[16], _0xaf1cx8)
                } else {
                    _0xaf1cx9 = _0xaf1cx5
                }
            };
            _0xaf1cx3(window)[_$_obify1[18]](_$_obify1[17], _0xaf1cxa);
            function _0xaf1cxa() {
                var _0xaf1cxb = _0xaf1cx3(window)[_$_obify1[6]](),
                    _0xaf1cxc = _0xaf1cx3(window)[_$_obify1[19]](),
                    _0xaf1cxd = _0xaf1cx4[_$_obify1[21]]()[_$_obify1[20]];
                if (_0xaf1cxc + _0xaf1cxb > _0xaf1cxd) {
                    var _0xaf1cxe = new Image();
                    _0xaf1cxe[_$_obify1[22]] = function () {
                        _0xaf1cx4[_$_obify1[3]](_$_obify1[25], _$_obify1[26] + this[_$_obify1[27]] + _$_obify1[28])[_$_obify1[24]](_$_obify1[23])
                    }, _0xaf1cxe[_$_obify1[27]] = _0xaf1cx9
                }
            }
            _0xaf1cxa()
        })
    }
}(jQuery);
$(_$_obify1[31])[_$_obify1[30]]();
$(_$_obify1[33])[_$_obify1[24]](_$_obify1[32]);
$(_$_obify1[38])[_$_obify1[18]](_$_obify1[34], function () {
    $(_$_obify1[37])[_$_obify1[36]](_$_obify1[35])
});
$(_$_obify1[40])[_$_obify1[29]](function () {
    var _0xaf1cxf = $(this),
        _0xaf1cx10 = showMoreText;
    if (_0xaf1cx10 != _$_obify1[10]) {
        _0xaf1cxf[_$_obify1[39]](_0xaf1cx10)
    }
});
$(_$_obify1[41])[_$_obify1[29]](function () {
    var _0xaf1cxf = $(this),
        _0xaf1cx11 = followByEmailText;
    if (_0xaf1cx11 != _$_obify1[10]) {
        _0xaf1cxf[_$_obify1[39]](_0xaf1cx11)
    }
});
$(_$_obify1[48])[_$_obify1[29]](function () {
    var _0xaf1cxf = $(this),
        _0xaf1cx12 = _0xaf1cxf[_$_obify1[39]]()[_$_obify1[42]]();
    if (_0xaf1cx12 == _$_obify1[43]) {
        _0xaf1cxf[_$_obify1[45]](_$_obify1[44])
    };
    if (_0xaf1cx12 == _$_obify1[46]) {
        _0xaf1cxf[_$_obify1[45]](_$_obify1[47])
    }
});
$(_$_obify1[52])[_$_obify1[29]](function () {
    var _0xaf1cxf = $(this);
    if (_0xaf1cxf[_$_obify1[49]]) {
        $(_$_obify1[51])[_$_obify1[50]](_0xaf1cxf)
    }
});
$(_$_obify1[54])[_$_obify1[29]](function () {
    var _0xaf1cxf = $(this);
    if (_0xaf1cxf[_$_obify1[49]]) {
        $(_$_obify1[53])[_$_obify1[50]](_0xaf1cxf)
    }
});
$(_$_obify1[55])[_$_obify1[29]](function () {
    var _0xaf1cxf = $(this);
    if (_0xaf1cxf[_$_obify1[49]]) {
        _0xaf1cxf[_$_obify1[50]]($(_$_obify1[51]))
    }
});
$(_$_obify1[56])[_$_obify1[29]](function () {
    var _0xaf1cxf = $(this);
    if (_0xaf1cxf[_$_obify1[49]]) {
        _0xaf1cxf[_$_obify1[50]]($(_$_obify1[53]))
    }
});
$(_$_obify1[64])[_$_obify1[29]](function () {
    var _0xaf1cxf = $(this),
        _0xaf1cx13 = _0xaf1cxf[_$_obify1[58]](_$_obify1[57]),
        _0xaf1cx14 = _0xaf1cxf[_$_obify1[60]](_$_obify1[59])[_$_obify1[42]](),
        _0xaf1cx15 = _0xaf1cx14[_$_obify1[62]](_$_obify1[61]),
        _0xaf1cx16 = _0xaf1cx15[0],
        _0xaf1cx17 = _0xaf1cx15[1];
    _0xaf1cxf[_$_obify1[3]](_$_obify1[63], _0xaf1cx16);
    _0xaf1cx13[_$_obify1[39]](_0xaf1cx17)
});
$(_$_obify1[68])[_$_obify1[3]](_$_obify1[27], function (_0xaf1cx18, _0xaf1cx19) {
    _0xaf1cx19 = _0xaf1cx19[_$_obify1[14]](_$_obify1[65], _$_obify1[66]);
    _0xaf1cx19 = _0xaf1cx19[_$_obify1[14]](_$_obify1[67], _$_obify1[66]);
    return _0xaf1cx19
});
$(_$_obify1[74])[_$_obify1[29]](function () {
    var _0xaf1cx18 = $(this),
        _0xaf1cx1a = _0xaf1cx18[_$_obify1[39]]()[_$_obify1[42]](),
        _0xaf1cx1b = _0xaf1cx1a[_$_obify1[62]](_$_obify1[69]),
        _0xaf1cx1c = _0xaf1cx1b[0],
        _0xaf1cx1d = _0xaf1cx1b[1],
        _0xaf1cx1e = _0xaf1cx1b[_$_obify1[70]]();
    if (_0xaf1cx1a[_$_obify1[12]](_$_obify1[71])) {
        _0xaf1cx18[_$_obify1[24]](_$_obify1[71])[_$_obify1[39]](_0xaf1cx1c);
        if (_0xaf1cx1d != _$_obify1[71]) {
            _0xaf1cx18[_$_obify1[24]](_0xaf1cx1d)
        };
        if (_0xaf1cx1e != _$_obify1[71]) {
            _0xaf1cx18[_$_obify1[24]](_$_obify1[73])[_$_obify1[72]]({
                "background-color": _0xaf1cx1e
            })
        }
    }
});
$(_$_obify1[48])[_$_obify1[29]](function () {
    var _0xaf1cx18 = $(this),
        _0xaf1cx1a = _0xaf1cx18[_$_obify1[39]]()[_$_obify1[42]](),
        _0xaf1cx1f = _0xaf1cx18[_$_obify1[75]]();
    if (_0xaf1cx1a[_$_obify1[12]](_$_obify1[76])) {
        _0xaf1cx18[_$_obify1[45]](_$_obify1[77]);
        $(_$_obify1[80])[_$_obify1[79]]($(_$_obify1[78]))
    };
    if (_0xaf1cx1a[_$_obify1[12]](_$_obify1[81])) {
        _0xaf1cx18[_$_obify1[45]](_$_obify1[82] + _0xaf1cx1f + _$_obify1[83])
    };
    if (_0xaf1cx1a[_$_obify1[12]](_$_obify1[84])) {
        _0xaf1cx18[_$_obify1[45]](_$_obify1[85] + _0xaf1cx1f + _$_obify1[83])
    };
    if (_0xaf1cx1a[_$_obify1[12]](_$_obify1[86])) {
        _0xaf1cx18[_$_obify1[45]](_$_obify1[87] + _0xaf1cx1f + _$_obify1[83])
    };
    if (_0xaf1cx1a[_$_obify1[12]](_$_obify1[88])) {
        _0xaf1cx18[_$_obify1[45]](_$_obify1[89] + _0xaf1cx1f + _$_obify1[83])
    };
    if (_0xaf1cx1a[_$_obify1[12]](_$_obify1[90])) {
        _0xaf1cx18[_$_obify1[45]](_$_obify1[91])
    };
    if (_0xaf1cx1a[_$_obify1[12]](_$_obify1[92])) {
        _0xaf1cx18[_$_obify1[45]](_$_obify1[93])
    };
    if (_0xaf1cx1a[_$_obify1[12]](_$_obify1[94])) {
        _0xaf1cx18[_$_obify1[45]](_$_obify1[95])
    };
    if (_0xaf1cx1a[_$_obify1[12]](_$_obify1[96])) {
        _0xaf1cx18[_$_obify1[45]](_$_obify1[97] + _0xaf1cx1f + _$_obify1[98])
    };
    var _0xaf1cx20 = $(_$_obify1[100])[_$_obify1[58]](_$_obify1[99]);
    _0xaf1cx20[_$_obify1[29]](function () {
        var _0xaf1cx21 = $(this),
            _0xaf1cxf = _0xaf1cx21[_$_obify1[39]]()[_$_obify1[42]]();
        if (_0xaf1cxf[_$_obify1[12]](_$_obify1[81]) || _0xaf1cxf[_$_obify1[12]](_$_obify1[84]) || _0xaf1cxf[_$_obify1[12]](_$_obify1[86]) || _0xaf1cxf[_$_obify1[12]](_$_obify1[88]) || _0xaf1cxf[_$_obify1[12]](_$_obify1[96])) {
            _0xaf1cx21[_$_obify1[45]](_$_obify1[10])
        }
    })
});
$(_$_obify1[110])[_$_obify1[18]](_$_obify1[34], function () {
    var _0xaf1cx18 = $(this),
        _0xaf1cx22 = _0xaf1cx18[_$_obify1[60]](_$_obify1[101]),
        _0xaf1cx23 = _0xaf1cx18[_$_obify1[60]](_$_obify1[4]),
        _0xaf1cx24 = _0xaf1cx18[_$_obify1[60]](_$_obify1[6]),
        _0xaf1cx25 = window[_$_obify1[102]][_$_obify1[4]],
        _0xaf1cx26 = window[_$_obify1[102]][_$_obify1[6]],
        _0xaf1cx27 = Math[_$_obify1[5]](_0xaf1cx25 / 2 - _0xaf1cx23 / 2),
        _0xaf1cx28 = Math[_$_obify1[5]](_0xaf1cx26 / 2 - _0xaf1cx24 / 2),
        _0xaf1cx29 = window[_$_obify1[108]](_0xaf1cx22, _$_obify1[103], _$_obify1[104] + _0xaf1cx23 + _$_obify1[105] + _0xaf1cx24 + _$_obify1[106] + _0xaf1cx27 + _$_obify1[107] + _0xaf1cx28);
    _0xaf1cx29[_$_obify1[109]]()
});
$(_$_obify1[113])[_$_obify1[29]](function () {
    var _0xaf1cxf = $(this),
        _0xaf1cx21 = _0xaf1cxf[_$_obify1[58]](_$_obify1[111]);
    _0xaf1cx21[_$_obify1[18]](_$_obify1[34], function () {
        _0xaf1cxf[_$_obify1[36]](_$_obify1[112])
    })
});
$(_$_obify1[121])[_$_obify1[29]](function () {
    var _0xaf1cx18 = $(this),
        _0xaf1cx2a = _0xaf1cx18[_$_obify1[39]]()[_$_obify1[42]](),
        _0xaf1cx22 = _0xaf1cx18[_$_obify1[3]](_$_obify1[63]);
    _0xaf1cx18[_$_obify1[45]](_$_obify1[114] + _0xaf1cx2a + _$_obify1[115] + _0xaf1cx22 + _$_obify1[116] + _0xaf1cx2a + _$_obify1[117]);
    $(_$_obify1[119])[_$_obify1[79]]($(_$_obify1[118]));
    $(_$_obify1[119])[_$_obify1[24]](_$_obify1[120])
});
function regxify(_0xaf1cx19) {
    var _0xaf1cx2c = /[^{\}]+(?=})/g;
    return String(_0xaf1cx19[_$_obify1[12]](_0xaf1cx2c))[_$_obify1[42]]()
}
$(_$_obify1[127])[_$_obify1[29]](function (_0xaf1cx2d) {
    var _0xaf1cx2e = $(this),
        _0xaf1cx18 = _0xaf1cx2e,
        _0xaf1cx2f = _0xaf1cx2e[_$_obify1[58]](_$_obify1[122]),
        _0xaf1cx1c = _0xaf1cx2f[_$_obify1[3]](_$_obify1[63])[_$_obify1[42]](),
        _0xaf1cx30 = _0xaf1cx1c[_$_obify1[123]](),
        _0xaf1cx31 = _0xaf1cx1c[_$_obify1[62]](_$_obify1[61]);
    _0xaf1cx31[1] != undefined ? _0xaf1cx2d = regxify(_0xaf1cx31[1]) : _0xaf1cx2d = _$_obify1[10];
    if (_0xaf1cx30[_$_obify1[12]](_$_obify1[124])) {
        _0xaf1cx18[_$_obify1[24]](_$_obify1[125])
    };
    ajaxMega(_0xaf1cx18, _$_obify1[126], 5, _0xaf1cx2d, _0xaf1cx30)
});
$(_$_obify1[129])[_$_obify1[29]](function (_0xaf1cx2d, _0xaf1cx1e) {
    var _0xaf1cx18 = $(this),
        _0xaf1cx1c = _0xaf1cx18[_$_obify1[39]]()[_$_obify1[42]](),
        _0xaf1cx30 = _0xaf1cx1c[_$_obify1[123]](),
        _0xaf1cx31 = _0xaf1cx1c[_$_obify1[62]](_$_obify1[61]);
    _0xaf1cx31[1] != undefined ? _0xaf1cx2d = regxify(_0xaf1cx31[1]) : _0xaf1cx2d = _$_obify1[10];
    _0xaf1cx31[2] != undefined ? _0xaf1cx1e = regxify(_0xaf1cx31[2]) : _0xaf1cx1e = _$_obify1[10];
    ajaxFeatured(_0xaf1cx18, _$_obify1[128], 4, _0xaf1cx2d, _0xaf1cx30, _0xaf1cx1e)
});
$(_$_obify1[130])[_$_obify1[29]](function (_0xaf1cx32, _0xaf1cx2d, _0xaf1cx1a, _0xaf1cx1e) {
    var _0xaf1cx18 = $(this),
        _0xaf1cx1c = _0xaf1cx18[_$_obify1[39]]()[_$_obify1[42]](),
        _0xaf1cx30 = _0xaf1cx1c[_$_obify1[123]](),
        _0xaf1cx31 = _0xaf1cx1c[_$_obify1[62]](_$_obify1[61]);
    _0xaf1cx31[1] != undefined ? _0xaf1cx32 = regxify(_0xaf1cx31[1]) : _0xaf1cx32 = _$_obify1[10];
    _0xaf1cx31[2] != undefined ? _0xaf1cx2d = regxify(_0xaf1cx31[2]) : _0xaf1cx2d = _$_obify1[10];
    _0xaf1cx31[3] != undefined ? _0xaf1cx1a = regxify(_0xaf1cx31[3]) : _0xaf1cx1a = _$_obify1[10];
    _0xaf1cx31[4] != undefined ? _0xaf1cx1e = regxify(_0xaf1cx31[4]) : _0xaf1cx1e = _$_obify1[10];
    ajaxBlock(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d, _0xaf1cx30, _0xaf1cx1e)
});
$(_$_obify1[131])[_$_obify1[29]](function (_0xaf1cx32, _0xaf1cx2d, _0xaf1cx1a) {
    var _0xaf1cx18 = $(this),
        _0xaf1cx1c = _0xaf1cx18[_$_obify1[39]]()[_$_obify1[42]](),
        _0xaf1cx30 = _0xaf1cx1c[_$_obify1[123]](),
        _0xaf1cx31 = _0xaf1cx1c[_$_obify1[62]](_$_obify1[61]);
    _0xaf1cx31[1] != undefined ? _0xaf1cx32 = regxify(_0xaf1cx31[1]) : _0xaf1cx32 = _$_obify1[10];
    _0xaf1cx31[2] != undefined ? _0xaf1cx2d = regxify(_0xaf1cx31[2]) : _0xaf1cx2d = _$_obify1[10];
    _0xaf1cx31[3] != undefined ? _0xaf1cx1a = regxify(_0xaf1cx31[3]) : _0xaf1cx1a = _$_obify1[10];
    ajaxWidget(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d, _0xaf1cx30)
});
$(_$_obify1[136])[_$_obify1[29]](function () {
    var _0xaf1cx18 = $(this),
        _0xaf1cx2d = _0xaf1cx18[_$_obify1[58]](_$_obify1[133])[_$_obify1[3]](_$_obify1[132]),
        _0xaf1cx32 = relatedPostsNum;
    ajaxRelated(_0xaf1cx18, _$_obify1[134], _0xaf1cx32, _0xaf1cx2d, _$_obify1[135])
});
function msgError() {
    return _$_obify1[137]
}
function msgServerError() {
    return _$_obify1[138]
}
function beforeLoader() {
    return _$_obify1[139]
}
function getFeedUrl(_0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d) {
    var _0xaf1cx37 = _$_obify1[10];
    switch (_0xaf1cx2d) {
    case _$_obify1[141]:
        _0xaf1cx37 = _$_obify1[140] + _0xaf1cx32;
        break;
    case _$_obify1[146]:
        if (_0xaf1cx1a == _$_obify1[142]) {
            _0xaf1cx37 = _$_obify1[143] + _0xaf1cx32
        } else {
            _0xaf1cx37 = _$_obify1[144] + _0xaf1cx2d + _$_obify1[145] + _0xaf1cx32
        };
        break;
    default:
        _0xaf1cx37 = _$_obify1[144] + _0xaf1cx2d + _$_obify1[145] + _0xaf1cx32;
        break
    };
    return _0xaf1cx37
}
function getPostLink(_0xaf1cx39, _0xaf1cx19) {
    for (var _0xaf1cx3a = 0; _0xaf1cx3a < _0xaf1cx39[_0xaf1cx19][_$_obify1[147]][_$_obify1[49]]; _0xaf1cx3a++) {
        if (_0xaf1cx39[_0xaf1cx19][_$_obify1[147]][_0xaf1cx3a][_$_obify1[148]] == _$_obify1[149]) {
            var _0xaf1cx3b = _0xaf1cx39[_0xaf1cx19][_$_obify1[147]][_0xaf1cx3a][_$_obify1[63]];
            break
        }
    };
    return _0xaf1cx3b
}
function getPostTitle(_0xaf1cx39, _0xaf1cx19) {
    var _0xaf1cxe = _0xaf1cx39[_0xaf1cx19][_$_obify1[151]][_$_obify1[150]];
    return _0xaf1cxe
}
function getPostImage(_0xaf1cx39, _0xaf1cx19) {
    if (_$_obify1[152] in _0xaf1cx39[_0xaf1cx19]) {
        var _0xaf1cx3e = _0xaf1cx39[_0xaf1cx19][_$_obify1[152]][_$_obify1[101]];
        if (_0xaf1cx3e[_$_obify1[12]](_$_obify1[153])) {
            _0xaf1cx3e = _0xaf1cx3e[_$_obify1[14]](_$_obify1[154], _$_obify1[155])
        };
        var _0xaf1cx9 = _0xaf1cx3e
    } else {
        _0xaf1cx9 = _$_obify1[156]
    };
    return _0xaf1cx9
}
function getPostAuthor(_0xaf1cx39, _0xaf1cx19) {
    var _0xaf1cxe = _0xaf1cx39[_0xaf1cx19][_$_obify1[158]][0][_$_obify1[157]][_$_obify1[150]];
    if (messages[_$_obify1[159]] == _$_obify1[160]) {
        var _0xaf1cx40 = _$_obify1[161] + _0xaf1cxe + _$_obify1[162]
    } else {
        var _0xaf1cx40 = _$_obify1[10]
    };
    return _0xaf1cx40
}
function getPostDate(_0xaf1cx39, _0xaf1cx19) {
    var _0xaf1cx42 = _0xaf1cx39[_0xaf1cx19][_$_obify1[163]][_$_obify1[150]],
        _0xaf1cx43 = _0xaf1cx42[_$_obify1[164]](0, 4),
        _0xaf1cx44 = _0xaf1cx42[_$_obify1[164]](5, 7),
        _0xaf1cx45 = _0xaf1cx42[_$_obify1[164]](8, 10),
        _0xaf1cx46 = monthFormat[parseInt(_0xaf1cx44, 10) - 1] + _$_obify1[165] + _0xaf1cx45 + _$_obify1[166] + _0xaf1cx43;
    if (messages[_$_obify1[167]] == _$_obify1[160]) {
        var _0xaf1cx40 = _$_obify1[168] + _0xaf1cx42 + _$_obify1[169] + _0xaf1cx46 + _$_obify1[170]
    } else {
        _0xaf1cx40 = _$_obify1[10]
    };
    return _0xaf1cx40
}
function getPostMeta(_0xaf1cx48, _0xaf1cx49) {
    if (messages[_$_obify1[159]] == _$_obify1[160] || messages[_$_obify1[167]] == _$_obify1[160]) {
        var _0xaf1cx4a = _$_obify1[171] + _0xaf1cx48 + _0xaf1cx49 + _$_obify1[83]
    } else {
        _0xaf1cx4a = _$_obify1[10]
    };
    if (messages[_$_obify1[167]] == _$_obify1[160]) {
        var _0xaf1cx4b = _$_obify1[171] + _0xaf1cx49 + _$_obify1[83]
    } else {
        _0xaf1cx4b = _$_obify1[10]
    };
    var _0xaf1cx40 = [_0xaf1cx4a, _0xaf1cx4b];
    return _0xaf1cx40
}
function getPostLabel(_0xaf1cx39, _0xaf1cx19) {
    if (_0xaf1cx39[_0xaf1cx19][_$_obify1[172]] != undefined) {
        var _0xaf1cx4d = _0xaf1cx39[_0xaf1cx19][_$_obify1[172]][0][_$_obify1[173]],
            _0xaf1cx40 = _$_obify1[174] + _0xaf1cx4d + _$_obify1[162]
    } else {
        _0xaf1cx40 = _$_obify1[10]
    };
    return _0xaf1cx40
}
function getPostComments(_0xaf1cx39, _0xaf1cx19, _0xaf1cx3b) {
    var _0xaf1cxe = _0xaf1cx39[_0xaf1cx19][_$_obify1[158]][0][_$_obify1[157]][_$_obify1[150]],
        _0xaf1cx4f = _0xaf1cx39[_0xaf1cx19][_$_obify1[158]][0][_$_obify1[177]][_$_obify1[27]][_$_obify1[14]](_$_obify1[175], _$_obify1[176]),
        _0xaf1cx46 = _0xaf1cx39[_0xaf1cx19][_$_obify1[151]][_$_obify1[150]];
    if (_0xaf1cx4f[_$_obify1[12]](_$_obify1[67])) {
        var _0xaf1cx9 = _$_obify1[178]
    } else {
        var _0xaf1cx9 = _0xaf1cx4f
    };
    var _0xaf1cx40 = _$_obify1[179] + _0xaf1cx19 + _$_obify1[180] + _0xaf1cx3b + _$_obify1[181] + _0xaf1cx9 + _$_obify1[182] + _0xaf1cx3b + _$_obify1[169] + _0xaf1cxe + _$_obify1[183] + _0xaf1cx46 + _$_obify1[184];
    return _0xaf1cx40
}
function getCustomStyle(_0xaf1cx1a, _0xaf1cx2d, _0xaf1cx1e) {
    if (_0xaf1cx1e != _$_obify1[10]) {
        if (_0xaf1cx1a == _$_obify1[128]) {
            var _0xaf1cx40 = _$_obify1[185] + _0xaf1cx1a + _$_obify1[186] + _0xaf1cx2d + _$_obify1[187] + _0xaf1cx1e + _$_obify1[188] + _0xaf1cx1a + _$_obify1[186] + _0xaf1cx2d + _$_obify1[189] + _0xaf1cx1e + _$_obify1[190]
        } else {
            _0xaf1cx40 = _$_obify1[185] + _0xaf1cx1a + _$_obify1[186] + _0xaf1cx2d + _$_obify1[191] + _0xaf1cx1a + _$_obify1[186] + _0xaf1cx2d + _$_obify1[187] + _0xaf1cx1e + _$_obify1[188] + _0xaf1cx1a + _$_obify1[186] + _0xaf1cx2d + _$_obify1[192] + _0xaf1cx1a + _$_obify1[186] + _0xaf1cx2d + _$_obify1[193] + _0xaf1cx1e + _$_obify1[194] + _0xaf1cx1a + _$_obify1[186] + _0xaf1cx2d + _$_obify1[189] + _0xaf1cx1e + _$_obify1[190]
        }
    } else {
        _0xaf1cx40 = _$_obify1[10]
    };
    return _0xaf1cx40
}
function getAjax(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d, _0xaf1cx1e) {
    switch (_0xaf1cx1a) {
    case _$_obify1[126]:
        ;
    case _$_obify1[128]:
        ;
    case _$_obify1[195]:
        ;
    case _$_obify1[196]:
        ;
    case _$_obify1[197]:
        ;
    case _$_obify1[198]:
        ;
    case _$_obify1[199]:
        ;
    case _$_obify1[142]:
        ;
    case _$_obify1[134]:
        if (_0xaf1cx2d == undefined) {
            _0xaf1cx2d = _$_obify1[200]
        };
        var _0xaf1cx37 = getFeedUrl(_0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d);
        $[_$_obify1[249]]({
            url: _0xaf1cx37,
            type: _$_obify1[201],
            dataType: _$_obify1[202],
            cache: true,
            beforeSend: function (_0xaf1cx52) {
                var _0xaf1cx53 = getCustomStyle(_0xaf1cx1a, _0xaf1cx2d, _0xaf1cx1e);
                switch (_0xaf1cx1a) {
                case _$_obify1[128]:
                    $(_$_obify1[204])[_$_obify1[203]](_0xaf1cx53);
                    _0xaf1cx18[_$_obify1[75]](beforeLoader())[_$_obify1[207]]()[_$_obify1[24]](_$_obify1[205] + _0xaf1cx1a + _$_obify1[186] + _0xaf1cx2d + _$_obify1[206]);
                    break;
                case _$_obify1[195]:
                    ;
                case _$_obify1[198]:
                    ;
                case _$_obify1[199]:
                    $(_$_obify1[204])[_$_obify1[203]](_0xaf1cx53);
                    _0xaf1cx18[_$_obify1[75]](beforeLoader())[_$_obify1[207]]()[_$_obify1[24]](_$_obify1[205] + _0xaf1cx1a + _$_obify1[186] + _0xaf1cx2d + _$_obify1[206]);
                    break;
                case _$_obify1[196]:
                    $(_$_obify1[204])[_$_obify1[203]](_0xaf1cx53);
                    _0xaf1cx18[_$_obify1[75]](beforeLoader())[_$_obify1[207]]()[_$_obify1[24]](_$_obify1[208] + _0xaf1cx1a + _$_obify1[186] + _0xaf1cx2d + _$_obify1[206]);
                    break;
                case _$_obify1[197]:
                    $(_$_obify1[204])[_$_obify1[203]](_0xaf1cx53);
                    _0xaf1cx18[_$_obify1[75]](beforeLoader())[_$_obify1[207]]()[_$_obify1[24]](_$_obify1[209] + _0xaf1cx1a + _$_obify1[186] + _0xaf1cx2d + _$_obify1[206]);
                    break;
                case _$_obify1[142]:
                    _0xaf1cx18[_$_obify1[75]](beforeLoader());
                    break;
                case _$_obify1[134]:
                    _0xaf1cx18[_$_obify1[75]](beforeLoader())[_$_obify1[207]]()[_$_obify1[24]](_$_obify1[210]);
                    break
                }
            },
            success: function (_0xaf1cx52) {
                var _0xaf1cx1f = _$_obify1[10];
                switch (_0xaf1cx1a) {
                case _$_obify1[126]:
                    _0xaf1cx1f = _$_obify1[211];
                    break;
                case _$_obify1[128]:
                    _0xaf1cx1f = _$_obify1[212];
                    break;
                case _$_obify1[195]:
                    _0xaf1cx1f = _$_obify1[213];
                    break;
                case _$_obify1[196]:
                    ;
                case _$_obify1[197]:
                    _0xaf1cx1f = _$_obify1[214];
                    break;
                case _$_obify1[198]:
                    _0xaf1cx1f = _$_obify1[215];
                    break;
                case _$_obify1[199]:
                    _0xaf1cx1f = _$_obify1[216];
                    break;
                case _$_obify1[142]:
                    _0xaf1cx1f = _$_obify1[217];
                    break;
                case _$_obify1[134]:
                    _0xaf1cx1f = _$_obify1[218];
                    break
                };
                var _0xaf1cx54 = _0xaf1cx52[_$_obify1[220]][_$_obify1[219]];
                if (_0xaf1cx54 != undefined) {
                    for (var _0xaf1cx19 = 0, _0xaf1cx39 = _0xaf1cx54; _0xaf1cx19 < _0xaf1cx39[_$_obify1[49]]; _0xaf1cx19++) {
                        var _0xaf1cx3b = getPostLink(_0xaf1cx39, _0xaf1cx19),
                            _0xaf1cx55 = getPostTitle(_0xaf1cx39, _0xaf1cx19, _0xaf1cx3b),
                            _0xaf1cx56 = getPostImage(_0xaf1cx39, _0xaf1cx19, _0xaf1cx3b),
                            _0xaf1cx48 = getPostAuthor(_0xaf1cx39, _0xaf1cx19),
                            _0xaf1cx49 = getPostDate(_0xaf1cx39, _0xaf1cx19),
                            _0xaf1cx57 = getPostMeta(_0xaf1cx48, _0xaf1cx49),
                            _0xaf1cx4d = getPostLabel(_0xaf1cx39, _0xaf1cx19);
                        var _0xaf1cx58 = _$_obify1[10];
                        switch (_0xaf1cx1a) {
                        case _$_obify1[126]:
                            _0xaf1cx58 += _$_obify1[221] + _0xaf1cx3b + _$_obify1[181] + _0xaf1cx56 + _$_obify1[182] + _0xaf1cx3b + _$_obify1[169] + _0xaf1cx55 + _$_obify1[222] + _0xaf1cx57[1] + _$_obify1[223];
                            break;
                        case _$_obify1[128]:
                            switch (_0xaf1cx19) {
                            case 0:
                                ;
                            case 1:
                                _0xaf1cx58 += _$_obify1[224] + _0xaf1cx19 + _$_obify1[225] + _0xaf1cx3b + _$_obify1[181] + _0xaf1cx56 + _$_obify1[226] + _0xaf1cx4d + _$_obify1[227] + _0xaf1cx3b + _$_obify1[169] + _0xaf1cx55 + _$_obify1[222] + _0xaf1cx57[0] + _$_obify1[228];
                                break;
                            default:
                                _0xaf1cx58 += _$_obify1[224] + _0xaf1cx19 + _$_obify1[225] + _0xaf1cx3b + _$_obify1[181] + _0xaf1cx56 + _$_obify1[226] + _0xaf1cx4d + _$_obify1[227] + _0xaf1cx3b + _$_obify1[169] + _0xaf1cx55 + _$_obify1[222] + _0xaf1cx57[1] + _$_obify1[228];
                                break
                            };
                            break;
                        case _$_obify1[195]:
                            switch (_0xaf1cx19) {
                            case 0:
                                _0xaf1cx58 += _$_obify1[229] + _0xaf1cx19 + _$_obify1[230] + _0xaf1cx4d + _$_obify1[231] + _0xaf1cx3b + _$_obify1[181] + _0xaf1cx56 + _$_obify1[232] + _0xaf1cx3b + _$_obify1[169] + _0xaf1cx55 + _$_obify1[222] + _0xaf1cx57[0] + _$_obify1[228];
                                break;
                            default:
                                _0xaf1cx58 += _$_obify1[229] + _0xaf1cx19 + _$_obify1[233] + _0xaf1cx3b + _$_obify1[181] + _0xaf1cx56 + _$_obify1[234] + _0xaf1cx3b + _$_obify1[169] + _0xaf1cx55 + _$_obify1[222] + _0xaf1cx57[1] + _$_obify1[223];
                                break
                            };
                            break;
                        case _$_obify1[196]:
                            ;
                        case _$_obify1[197]:
                            switch (_0xaf1cx19) {
                            case 0:
                                _0xaf1cx58 += _$_obify1[235] + _0xaf1cx19 + _$_obify1[236] + _0xaf1cx4d + _$_obify1[231] + _0xaf1cx3b + _$_obify1[181] + _0xaf1cx56 + _$_obify1[232] + _0xaf1cx3b + _$_obify1[169] + _0xaf1cx55 + _$_obify1[222] + _0xaf1cx57[0] + _$_obify1[228];
                                break;
                            default:
                                _0xaf1cx58 += _$_obify1[235] + _0xaf1cx19 + _$_obify1[233] + _0xaf1cx3b + _$_obify1[181] + _0xaf1cx56 + _$_obify1[234] + _0xaf1cx3b + _$_obify1[169] + _0xaf1cx55 + _$_obify1[222] + _0xaf1cx57[1] + _$_obify1[223];
                                break
                            };
                            break;
                        case _$_obify1[198]:
                            _0xaf1cx58 += _$_obify1[237] + _0xaf1cx19 + _$_obify1[238] + _0xaf1cx3b + _$_obify1[181] + _0xaf1cx56 + _$_obify1[239] + _0xaf1cx3b + _$_obify1[169] + _0xaf1cx55 + _$_obify1[222] + _0xaf1cx57[1] + _$_obify1[223];
                            break;
                        case _$_obify1[199]:
                            _0xaf1cx58 += _$_obify1[240] + _0xaf1cx19 + _$_obify1[238] + _0xaf1cx3b + _$_obify1[181] + _0xaf1cx56 + _$_obify1[241] + _0xaf1cx3b + _$_obify1[169] + _0xaf1cx55 + _$_obify1[222] + _0xaf1cx57[1] + _$_obify1[223];
                            break;
                        case _$_obify1[142]:
                            switch (_0xaf1cx2d) {
                            case _$_obify1[146]:
                                var _0xaf1cx40 = getPostComments(_0xaf1cx39, _0xaf1cx19, _0xaf1cx3b);
                                _0xaf1cx58 += _0xaf1cx40;
                                break;
                            default:
                                _0xaf1cx58 += _$_obify1[179] + _0xaf1cx19 + _$_obify1[233] + _0xaf1cx3b + _$_obify1[181] + _0xaf1cx56 + _$_obify1[234] + _0xaf1cx3b + _$_obify1[169] + _0xaf1cx55 + _$_obify1[222] + _0xaf1cx57[1] + _$_obify1[223];
                                break
                            };
                            break;
                        case _$_obify1[134]:
                            _0xaf1cx58 += _$_obify1[242] + _0xaf1cx19 + _$_obify1[238] + _0xaf1cx3b + _$_obify1[181] + _0xaf1cx56 + _$_obify1[239] + _0xaf1cx3b + _$_obify1[169] + _0xaf1cx55 + _$_obify1[222] + _0xaf1cx57[1] + _$_obify1[223];
                            break
                        };
                        _0xaf1cx1f += _0xaf1cx58
                    }
                } else {
                    switch (_0xaf1cx1a) {
                    case _$_obify1[126]:
                        _0xaf1cx1f = _$_obify1[211] + msgError() + _$_obify1[243];
                        break;
                    default:
                        _0xaf1cx1f = msgError();
                        break
                    }
                };
                switch (_0xaf1cx1a) {
                case _$_obify1[126]:
                    _0xaf1cx1f += _$_obify1[243];
                    _0xaf1cx18[_$_obify1[79]](_0xaf1cx1f)[_$_obify1[24]](_$_obify1[126]);
                    _0xaf1cx18[_$_obify1[58]](_$_obify1[246])[_$_obify1[3]](_$_obify1[63], function (_0xaf1cx18, _0xaf1cx59) {
                        switch (_0xaf1cx2d) {
                        case _$_obify1[141]:
                            _0xaf1cx59 = _0xaf1cx59[_$_obify1[14]](_0xaf1cx59, _$_obify1[244]);
                            break;
                        default:
                            _0xaf1cx59 = _0xaf1cx59[_$_obify1[14]](_0xaf1cx59, _$_obify1[245] + _0xaf1cx2d);
                            break
                        };
                        return _0xaf1cx59
                    });
                    break;
                case _$_obify1[195]:
                    ;
                case _$_obify1[198]:
                    ;
                case _$_obify1[196]:
                    ;
                case _$_obify1[197]:
                    ;
                case _$_obify1[199]:
                    _0xaf1cx1f += _$_obify1[83];
                    _0xaf1cx18[_$_obify1[75]](_0xaf1cx1f);
                    break;
                default:
                    _0xaf1cx1f += _$_obify1[83];
                    _0xaf1cx18[_$_obify1[75]](_0xaf1cx1f);
                    break
                };
                _0xaf1cx18[_$_obify1[58]](_$_obify1[247])[_$_obify1[0]]()
            },
            error: function () {
                switch (_0xaf1cx1a) {
                case _$_obify1[126]:
                    _0xaf1cx18[_$_obify1[79]](_$_obify1[248] + msgServerError() + _$_obify1[243]);
                    break;
                default:
                    _0xaf1cx18[_$_obify1[75]](msgServerError());
                    break
                }
            }
        })
    }
}
function ajaxMega(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d, _0xaf1cx30) {
    if (_0xaf1cx30[_$_obify1[12]](_$_obify1[124])) {
        if (_0xaf1cx1a == _$_obify1[126]) {
            return getAjax(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d)
        } else {
            _0xaf1cx18[_$_obify1[24]](_$_obify1[125])[_$_obify1[79]](_$_obify1[211] + msgError() + _$_obify1[243])
        }
    }
}
function ajaxFeatured(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d, _0xaf1cx30, _0xaf1cx1e) {
    if (_0xaf1cx30[_$_obify1[12]](_$_obify1[250])) {
        if (_0xaf1cx1a == _$_obify1[128]) {
            return getAjax(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d, _0xaf1cx1e)
        } else {
            _0xaf1cx18[_$_obify1[75]](beforeLoader())[_$_obify1[207]]()[_$_obify1[24]](_$_obify1[210]);
            setTimeout(function () {
                _0xaf1cx18[_$_obify1[75]](msgError())
            }, 500)
        }
    }
}
function ajaxBlock(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d, _0xaf1cx30, _0xaf1cx1e) {
    if (_0xaf1cx30[_$_obify1[12]](_$_obify1[251])) {
        if (_0xaf1cx1a == _$_obify1[195] || _0xaf1cx1a == _$_obify1[196] || _0xaf1cx1a == _$_obify1[197] || _0xaf1cx1a == _$_obify1[198] || _0xaf1cx1a == _$_obify1[199]) {
            var _0xaf1cx5d = showMoreText,
                _0xaf1cx5e = _$_obify1[10];
            if (_0xaf1cx5d != _$_obify1[10]) {
                _0xaf1cx5e = _0xaf1cx5d
            } else {
                _0xaf1cx5e = messages[_$_obify1[252]]
            };
            _0xaf1cx18[_$_obify1[207]]()[_$_obify1[58]](_$_obify1[255])[_$_obify1[79]](_$_obify1[253] + _0xaf1cx2d + _$_obify1[169] + _0xaf1cx5e + _$_obify1[254]);
            return getAjax(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d, _0xaf1cx1e)
        } else {
            _0xaf1cx18[_$_obify1[75]](msgError())[_$_obify1[207]]()[_$_obify1[24]](_$_obify1[210])
        }
    }
}
function ajaxWidget(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d, _0xaf1cx30) {
    if (_0xaf1cx30[_$_obify1[12]](_$_obify1[256])) {
        if (_0xaf1cx1a == _$_obify1[142]) {
            return getAjax(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d)
        } else {
            _0xaf1cx18[_$_obify1[75]](msgError())
        }
    }
}
function ajaxRelated(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d, _0xaf1cx30) {
    if (_0xaf1cx30[_$_obify1[12]](_$_obify1[135])) {
        return getAjax(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d)
    }
}
$(_$_obify1[270])[_$_obify1[29]](function () {
    var _0xaf1cx18 = $(this),
        _0xaf1cx61 = commentsSystem,
        _0xaf1cx62 = _$_obify1[257] + disqus_blogger_current_url + _$_obify1[258],
        _0xaf1cx63 = _$_obify1[259] + _0xaf1cx61;
    switch (_0xaf1cx61) {
    case _$_obify1[262]:
        _0xaf1cx18[_$_obify1[24]](_0xaf1cx63)[_$_obify1[260]]();
        $(_$_obify1[261])[_$_obify1[24]](_$_obify1[260]);
        break;
    case _$_obify1[263]:
        _0xaf1cx18[_$_obify1[24]](_0xaf1cx63)[_$_obify1[260]]();
        break;
    case _$_obify1[265]:
        _0xaf1cx18[_$_obify1[24]](_0xaf1cx63)[_$_obify1[58]](_$_obify1[264])[_$_obify1[75]](_0xaf1cx62);
        _0xaf1cx18[_$_obify1[260]]();
        break;
    case _$_obify1[266]:
        _0xaf1cx18[_$_obify1[266]]();
        break;
    default:
        _0xaf1cx18[_$_obify1[24]](_$_obify1[267])[_$_obify1[260]]();
        $(_$_obify1[261])[_$_obify1[24]](_$_obify1[260]);
        break
    };
    var _0xaf1cx64 = _0xaf1cx18[_$_obify1[58]](_$_obify1[268]),
        _0xaf1cx17 = _0xaf1cx18[_$_obify1[58]](_$_obify1[269]);
    _0xaf1cx64[_$_obify1[18]](_$_obify1[34], function () {
        _0xaf1cx17[_$_obify1[260]]()
    });
    _0xaf1cx17[_$_obify1[18]](_$_obify1[34], function () {
        _0xaf1cx17[_$_obify1[266]]()
    })
});
$(function () {
    $(_$_obify1[271])[_$_obify1[0]]();
    $(_$_obify1[276])[_$_obify1[29]](function () {
        var _0xaf1cxf = $(this),
            _0xaf1cx65 = $(_$_obify1[273])[_$_obify1[272]]();
        _0xaf1cx65[_$_obify1[58]](_$_obify1[275])[_$_obify1[274]]();
        _0xaf1cx65[_$_obify1[50]](_0xaf1cxf)
    });
    $(_$_obify1[303])[_$_obify1[29]](function () {
        var _0xaf1cxf = $(this),
            _0xaf1cx66 = $(_$_obify1[277])[_$_obify1[272]]();
        _0xaf1cx66[_$_obify1[3]](_$_obify1[278], _$_obify1[279]);
        _0xaf1cx66[_$_obify1[58]](_$_obify1[280])[_$_obify1[274]]();
        _0xaf1cx66[_$_obify1[58]](_$_obify1[284])[_$_obify1[45]](_0xaf1cx66[_$_obify1[58]](_$_obify1[283])[_$_obify1[3]](_$_obify1[281], _$_obify1[282]));
        _0xaf1cx66[_$_obify1[58]](_$_obify1[285])[_$_obify1[29]](function () {
            var _0xaf1cx13 = $(this),
                _0xaf1cx67 = _0xaf1cx13[_$_obify1[3]](_$_obify1[63])[_$_obify1[42]]()[_$_obify1[123]]();
            if (_0xaf1cx67[_$_obify1[12]](_$_obify1[124])) {
                _0xaf1cx13[_$_obify1[3]](_$_obify1[63], _$_obify1[244])
            }
        });
        _0xaf1cx66[_$_obify1[58]](_$_obify1[286])[_$_obify1[29]](function () {
            var _0xaf1cx13 = $(this),
                _0xaf1cx65 = _0xaf1cx13[_$_obify1[39]]()[_$_obify1[42]]();
            _0xaf1cx13[_$_obify1[3]](_$_obify1[63], _$_obify1[245] + _0xaf1cx65)
        });
        _0xaf1cx66[_$_obify1[50]](_0xaf1cxf);
        $(_$_obify1[288])[_$_obify1[18]](_$_obify1[34], function () {
            $(_$_obify1[37])[_$_obify1[36]](_$_obify1[287])
        });
        $(_$_obify1[290])[_$_obify1[79]](_$_obify1[289]);
        $(_$_obify1[292])[_$_obify1[58]](_$_obify1[291])[_$_obify1[274]]();
        $(_$_obify1[293])[_$_obify1[79]](_$_obify1[289]);
        $(_$_obify1[302])[_$_obify1[18]](_$_obify1[34], function (_0xaf1cx18) {
            if ($(this)[_$_obify1[207]]()[_$_obify1[295]](_$_obify1[294])) {
                _0xaf1cx18[_$_obify1[296]]();
                if (!$(this)[_$_obify1[207]]()[_$_obify1[295]](_$_obify1[260])) {
                    $(this)[_$_obify1[207]]()[_$_obify1[24]](_$_obify1[260])[_$_obify1[299]](_$_obify1[298])[_$_obify1[297]](170)
                } else {
                    $(this)[_$_obify1[207]]()[_$_obify1[301]](_$_obify1[260])[_$_obify1[58]](_$_obify1[300])[_$_obify1[297]](170)
                }
            }
        })
    });
    $(_$_obify1[306])[_$_obify1[29]](function () {
        var _0xaf1cxf = $(this),
            _0xaf1cx65 = $(_$_obify1[304])[_$_obify1[272]]();
        _0xaf1cx65[_$_obify1[301]](_$_obify1[305]);
        _0xaf1cx65[_$_obify1[50]](_0xaf1cxf)
    });
    $(_$_obify1[310])[_$_obify1[29]](function () {
        var _0xaf1cx18 = $(this);
        if (fixedMenu == true) {
            if (_0xaf1cx18[_$_obify1[49]] > 0) {
                var _0xaf1cx4 = $(document)[_$_obify1[19]](),
                    _0xaf1cx68 = _0xaf1cx18[_$_obify1[21]]()[_$_obify1[20]],
                    _0xaf1cx69 = _0xaf1cx18[_$_obify1[6]](),
                    _0xaf1cx46 = (_0xaf1cx68 + _0xaf1cx69);
                $(window)[_$_obify1[309]](function () {
                    var _0xaf1cxe = $(document)[_$_obify1[19]](),
                        _0xaf1cx44 = $(_$_obify1[307])[_$_obify1[21]]()[_$_obify1[20]],
                        _0xaf1cx45 = (_0xaf1cx44 - _0xaf1cx69);
                    if (_0xaf1cxe < _0xaf1cx45) {
                        if (_0xaf1cxe > _0xaf1cx46) {
                            _0xaf1cx18[_$_obify1[24]](_$_obify1[308])
                        } else {
                            if (_0xaf1cxe <= 0) {
                                _0xaf1cx18[_$_obify1[301]](_$_obify1[308])
                            }
                        };
                        if (_0xaf1cxe > _0xaf1cx4) {
                            _0xaf1cx18[_$_obify1[301]](_$_obify1[260])
                        } else {
                            _0xaf1cx18[_$_obify1[24]](_$_obify1[260])
                        };
                        _0xaf1cx4 = $(document)[_$_obify1[19]]()
                    }
                })
            }
        }
    });
    $(_$_obify1[312])[_$_obify1[29]](function () {
        if (fixedSidebar == true) {
            $(this)[_$_obify1[311]]({
                additionalMarginTop: 30,
                additionalMarginBottom: 30
            })
        }
    });
    $(_$_obify1[316])[_$_obify1[3]](_$_obify1[63], _$_obify1[315])[_$_obify1[39]](_$_obify1[314])[_$_obify1[3]](_$_obify1[25], _$_obify1[313]);
    setInterval(function () {
        if (!$(_$_obify1[317])[_$_obify1[49]]) {
            window[_$_obify1[318]][_$_obify1[63]] = _$_obify1[315]
        }
    }, 1000);
    $(_$_obify1[324])[_$_obify1[29]](function () {
        var _0xaf1cxf = $(this);
        $(window)[_$_obify1[18]](_$_obify1[309], function () {
            $(this)[_$_obify1[19]]() >= 100 ? _0xaf1cxf[_$_obify1[319]](250) : _0xaf1cxf[_$_obify1[320]](250);
            _0xaf1cxf[_$_obify1[21]]()[_$_obify1[20]] >= $(_$_obify1[307])[_$_obify1[21]]()[_$_obify1[20]] - 32 ? _0xaf1cxf[_$_obify1[24]](_$_obify1[321]) : _0xaf1cxf[_$_obify1[301]](_$_obify1[321])
        }), _0xaf1cxf[_$_obify1[34]](function () {
            $(_$_obify1[323])[_$_obify1[322]]({
                scrollTop: 0
            }, 500)
        })
    });
    $(_$_obify1[328])[_$_obify1[29]](function () {
        var _0xaf1cxf = $(this);
        _0xaf1cxf[_$_obify1[326]](/(https:\/\/\S+(\.png|\.jpeg|\.jpg|\.gif))/g, _$_obify1[325]);
        _0xaf1cxf[_$_obify1[326]](/(?:https:\/\/)?(?:www\.)?(?:youtube\.com)\/(?:watch\?v=)?(.+)/g, _$_obify1[327])
    });
    $(_$_obify1[330])[_$_obify1[29]](function () {
        var _0xaf1cx18 = $(this),
            _0xaf1cx6a = _0xaf1cx18[_$_obify1[60]](_$_obify1[329]);
        if (_0xaf1cx6a) {
            $(_$_obify1[330])[_$_obify1[260]]()
        };
        $(_$_obify1[330])[_$_obify1[18]](_$_obify1[34], function (_0xaf1cx3) {
            $(_$_obify1[330])[_$_obify1[266]]();
            $[_$_obify1[249]]({
                url: _0xaf1cx6a,
                success: function (_0xaf1cx52) {
                    var _0xaf1cx6b = $(_0xaf1cx52)[_$_obify1[58]](_$_obify1[331]);
                    _0xaf1cx6b[_$_obify1[58]](_$_obify1[333])[_$_obify1[24]](_$_obify1[332]);
                    $(_$_obify1[331])[_$_obify1[79]](_0xaf1cx6b[_$_obify1[75]]());
                    _0xaf1cx6a = $(_0xaf1cx52)[_$_obify1[58]](_$_obify1[330])[_$_obify1[60]](_$_obify1[329]);
                    if (_0xaf1cx6a) {
                        $(_$_obify1[330])[_$_obify1[260]]()
                    } else {
                        $(_$_obify1[330])[_$_obify1[266]]();
                        $(_$_obify1[334])[_$_obify1[24]](_$_obify1[260])
                    };
                    $(_$_obify1[335])[_$_obify1[0]]()
                },
                beforeSend: function () {
                    $(_$_obify1[336])[_$_obify1[260]]()
                },
                complete: function () {
                    $(_$_obify1[336])[_$_obify1[266]]()
                }
            });
            _0xaf1cx3[_$_obify1[296]]()
        })
    })
})
/*! jQuery v2.2.4 | (c) jQuery Foundation | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=a.document,e=c.slice,f=c.concat,g=c.push,h=c.indexOf,i={},j=i.toString,k=i.hasOwnProperty,l={},m="2.2.4",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return e.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:e.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a){return n.each(this,a)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(e.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:g,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){var b=a&&a.toString();return!n.isArray(a)&&b-parseFloat(b)+1>=0},isPlainObject:function(a){var b;if("object"!==n.type(a)||a.nodeType||n.isWindow(a))return!1;if(a.constructor&&!k.call(a,"constructor")&&!k.call(a.constructor.prototype||{},"isPrototypeOf"))return!1;for(b in a);return void 0===b||k.call(a,b)},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?i[j.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=d.createElement("script"),b.text=a,d.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b){var c,d=0;if(s(a)){for(c=a.length;c>d;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):g.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:h.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,g=0,h=[];if(s(a))for(d=a.length;d>g;g++)e=b(a[g],g,c),null!=e&&h.push(e);else for(g in a)e=b(a[g],g,c),null!=e&&h.push(e);return f.apply([],h)},guid:1,proxy:function(a,b){var c,d,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(d=e.call(arguments,2),f=function(){return a.apply(b||this,d.concat(e.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:l}),"function"==typeof Symbol&&(n.fn[Symbol.iterator]=c[Symbol.iterator]),n.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){i["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=!!a&&"length"in a&&a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ga(),z=ga(),A=ga(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+M+"))|)"+L+"*\\]",O=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+N+")*)|.*)\\)|)",P=new RegExp(L+"+","g"),Q=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),R=new RegExp("^"+L+"*,"+L+"*"),S=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),T=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),U=new RegExp(O),V=new RegExp("^"+M+"$"),W={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M+"|[*])"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},X=/^(?:input|select|textarea|button)$/i,Y=/^h\d$/i,Z=/^[^{]+\{\s*\[native \w/,$=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,_=/[+~]/,aa=/'|\\/g,ba=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),ca=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},da=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(ea){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fa(a,b,d,e){var f,h,j,k,l,o,r,s,w=b&&b.ownerDocument,x=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==x&&9!==x&&11!==x)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==x&&(o=$.exec(a)))if(f=o[1]){if(9===x){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(w&&(j=w.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(o[2])return H.apply(d,b.getElementsByTagName(a)),d;if((f=o[3])&&c.getElementsByClassName&&b.getElementsByClassName)return H.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==x)w=b,s=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(aa,"\\$&"):b.setAttribute("id",k=u),r=g(a),h=r.length,l=V.test(k)?"#"+k:"[id='"+k+"']";while(h--)r[h]=l+" "+qa(r[h]);s=r.join(","),w=_.test(a)&&oa(b.parentNode)||b}if(s)try{return H.apply(d,w.querySelectorAll(s)),d}catch(y){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(Q,"$1"),b,d,e)}function ga(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ha(a){return a[u]=!0,a}function ia(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ja(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function ka(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function la(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function na(a){return ha(function(b){return b=+b,ha(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function oa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=fa.support={},f=fa.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fa.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ia(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ia(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Z.test(n.getElementsByClassName),c.getById=ia(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return"undefined"!=typeof b.getElementsByClassName&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=Z.test(n.querySelectorAll))&&(ia(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ia(function(a){var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Z.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ia(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",O)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Z.test(o.compareDocumentPosition),t=b||Z.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return ka(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?ka(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},fa.matches=function(a,b){return fa(a,null,null,b)},fa.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(T,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fa(b,n,null,[a]).length>0},fa.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fa.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fa.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fa.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fa.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fa.selectors={cacheLength:50,createPseudo:ha,match:W,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ba,ca),a[3]=(a[3]||a[4]||a[5]||"").replace(ba,ca),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fa.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fa.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return W.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&U.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ba,ca).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fa.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(P," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fa.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ha(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ha(function(a){var b=[],c=[],d=h(a.replace(Q,"$1"));return d[u]?ha(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ha(function(a){return function(b){return fa(a,b).length>0}}),contains:ha(function(a){return a=a.replace(ba,ca),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ha(function(a){return V.test(a||"")||fa.error("unsupported lang: "+a),a=a.replace(ba,ca).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Y.test(a.nodeName)},input:function(a){return X.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:na(function(){return[0]}),last:na(function(a,b){return[b-1]}),eq:na(function(a,b,c){return[0>c?c+b:c]}),even:na(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:na(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:na(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:na(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=la(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=ma(b);function pa(){}pa.prototype=d.filters=d.pseudos,d.setFilters=new pa,g=fa.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=R.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=S.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(Q," ")}),h=h.slice(c.length));for(g in d.filter)!(e=W[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fa.error(a):z(a,i).slice(0)};function qa(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function ra(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j,k=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(j=b[u]||(b[u]={}),i=j[b.uniqueID]||(j[b.uniqueID]={}),(h=i[d])&&h[0]===w&&h[1]===f)return k[2]=h[2];if(i[d]=k,k[2]=a(b,c,g))return!0}}}function sa(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ta(a,b,c){for(var d=0,e=b.length;e>d;d++)fa(a,b[d],c);return c}function ua(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function va(a,b,c,d,e,f){return d&&!d[u]&&(d=va(d)),e&&!e[u]&&(e=va(e,f)),ha(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ta(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ua(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ua(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ua(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function wa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ra(function(a){return a===b},h,!0),l=ra(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[ra(sa(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return va(i>1&&sa(m),i>1&&qa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(Q,"$1"),c,e>i&&wa(a.slice(i,e)),f>e&&wa(a=a.slice(e)),f>e&&qa(a))}m.push(c)}return sa(m)}function xa(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=F.call(i));u=ua(u)}H.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&fa.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ha(f):f}return h=fa.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xa(e,d)),f.selector=a}return f},i=fa.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ba,ca),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=W.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ba,ca),_.test(j[0].type)&&oa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qa(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,!b||_.test(a)&&oa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ia(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ia(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ja("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ia(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ja("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ia(function(a){return null==a.getAttribute("disabled")})||ja(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fa}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.uniqueSort=n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},v=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},w=n.expr.match.needsContext,x=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,y=/^.[^:#\[\.,]*$/;function z(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(y.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return h.call(b,a)>-1!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(z(this,a||[],!1))},not:function(a){return this.pushStack(z(this,a||[],!0))},is:function(a){return!!z(this,"string"==typeof a&&w.test(a)?n(a):a||[],!1).length}});var A,B=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=n.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||A,"string"==typeof a){if(e="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:B.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),x.test(e[1])&&n.isPlainObject(b))for(e in b)n.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}return f=d.getElementById(e[2]),f&&f.parentNode&&(this.length=1,this[0]=f),this.context=d,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?void 0!==c.ready?c.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};C.prototype=n.fn,A=n(d);var D=/^(?:parents|prev(?:Until|All))/,E={children:!0,contents:!0,next:!0,prev:!0};n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=w.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?h.call(n(a),this[0]):h.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.uniqueSort(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function F(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return u(a,"parentNode")},parentsUntil:function(a,b,c){return u(a,"parentNode",c)},next:function(a){return F(a,"nextSibling")},prev:function(a){return F(a,"previousSibling")},nextAll:function(a){return u(a,"nextSibling")},prevAll:function(a){return u(a,"previousSibling")},nextUntil:function(a,b,c){return u(a,"nextSibling",c)},prevUntil:function(a,b,c){return u(a,"previousSibling",c)},siblings:function(a){return v((a.parentNode||{}).firstChild,a)},children:function(a){return v(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(E[a]||n.uniqueSort(e),D.test(a)&&e.reverse()),this.pushStack(e)}});var G=/\S+/g;function H(a){var b={};return n.each(a.match(G)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?H(a):n.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){n.each(b,function(b,c){n.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==n.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return n.each(arguments,function(a,b){var c;while((c=n.inArray(b,f,c))>-1)f.splice(c,1),h>=c&&h--}),this},has:function(a){return a?n.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=g=[],c||(f=c=""),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().progress(c.notify).done(c.resolve).fail(c.reject):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=e.call(arguments),d=c.length,f=1!==d||a&&n.isFunction(a.promise)?d:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?e.call(arguments):d,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(d>1)for(i=new Array(d),j=new Array(d),k=new Array(d);d>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().progress(h(b,j,i)).done(h(b,k,c)).fail(g.reject):--f;return f||g.resolveWith(k,c),g.promise()}});var I;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(I.resolveWith(d,[n]),n.fn.triggerHandler&&(n(d).triggerHandler("ready"),n(d).off("ready"))))}});function J(){d.removeEventListener("DOMContentLoaded",J),a.removeEventListener("load",J),n.ready()}n.ready.promise=function(b){return I||(I=n.Deferred(),"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll?a.setTimeout(n.ready):(d.addEventListener("DOMContentLoaded",J),a.addEventListener("load",J))),I.promise(b)},n.ready.promise();var K=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)K(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},L=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function M(){this.expando=n.expando+M.uid++}M.uid=1,M.prototype={register:function(a,b){var c=b||{};return a.nodeType?a[this.expando]=c:Object.defineProperty(a,this.expando,{value:c,writable:!0,configurable:!0}),a[this.expando]},cache:function(a){if(!L(a))return{};var b=a[this.expando];return b||(b={},L(a)&&(a.nodeType?a[this.expando]=b:Object.defineProperty(a,this.expando,{value:b,configurable:!0}))),b},set:function(a,b,c){var d,e=this.cache(a);if("string"==typeof b)e[b]=c;else for(d in b)e[d]=b[d];return e},get:function(a,b){return void 0===b?this.cache(a):a[this.expando]&&a[this.expando][b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=a[this.expando];if(void 0!==f){if(void 0===b)this.register(a);else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in f?d=[b,e]:(d=e,d=d in f?[d]:d.match(G)||[])),c=d.length;while(c--)delete f[d[c]]}(void 0===b||n.isEmptyObject(f))&&(a.nodeType?a[this.expando]=void 0:delete a[this.expando])}},hasData:function(a){var b=a[this.expando];return void 0!==b&&!n.isEmptyObject(b)}};var N=new M,O=new M,P=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Q=/[A-Z]/g;function R(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(Q,"-$&").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:P.test(c)?n.parseJSON(c):c;
}catch(e){}O.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return O.hasData(a)||N.hasData(a)},data:function(a,b,c){return O.access(a,b,c)},removeData:function(a,b){O.remove(a,b)},_data:function(a,b,c){return N.access(a,b,c)},_removeData:function(a,b){N.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=O.get(f),1===f.nodeType&&!N.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),R(f,d,e[d])));N.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){O.set(this,a)}):K(this,function(b){var c,d;if(f&&void 0===b){if(c=O.get(f,a)||O.get(f,a.replace(Q,"-$&").toLowerCase()),void 0!==c)return c;if(d=n.camelCase(a),c=O.get(f,d),void 0!==c)return c;if(c=R(f,d,void 0),void 0!==c)return c}else d=n.camelCase(a),this.each(function(){var c=O.get(this,d);O.set(this,d,b),a.indexOf("-")>-1&&void 0!==c&&O.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){O.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=N.get(a,b),c&&(!d||n.isArray(c)?d=N.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return N.get(a,c)||N.access(a,c,{empty:n.Callbacks("once memory").add(function(){N.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=N.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),U=["Top","Right","Bottom","Left"],V=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)};function W(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return n.css(a,b,"")},i=h(),j=c&&c[3]||(n.cssNumber[b]?"":"px"),k=(n.cssNumber[b]||"px"!==j&&+i)&&T.exec(n.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,n.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var X=/^(?:checkbox|radio)$/i,Y=/<([\w:-]+)/,Z=/^$|\/(?:java|ecma)script/i,$={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};$.optgroup=$.option,$.tbody=$.tfoot=$.colgroup=$.caption=$.thead,$.th=$.td;function _(a,b){var c="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function aa(a,b){for(var c=0,d=a.length;d>c;c++)N.set(a[c],"globalEval",!b||N.get(b[c],"globalEval"))}var ba=/<|&#?\w+;/;function ca(a,b,c,d,e){for(var f,g,h,i,j,k,l=b.createDocumentFragment(),m=[],o=0,p=a.length;p>o;o++)if(f=a[o],f||0===f)if("object"===n.type(f))n.merge(m,f.nodeType?[f]:f);else if(ba.test(f)){g=g||l.appendChild(b.createElement("div")),h=(Y.exec(f)||["",""])[1].toLowerCase(),i=$[h]||$._default,g.innerHTML=i[1]+n.htmlPrefilter(f)+i[2],k=i[0];while(k--)g=g.lastChild;n.merge(m,g.childNodes),g=l.firstChild,g.textContent=""}else m.push(b.createTextNode(f));l.textContent="",o=0;while(f=m[o++])if(d&&n.inArray(f,d)>-1)e&&e.push(f);else if(j=n.contains(f.ownerDocument,f),g=_(l.appendChild(f),"script"),j&&aa(g),c){k=0;while(f=g[k++])Z.test(f.type||"")&&c.push(f)}return l}!function(){var a=d.createDocumentFragment(),b=a.appendChild(d.createElement("div")),c=d.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var da=/^key/,ea=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,fa=/^([^.]*)(?:\.(.+)|)/;function ga(){return!0}function ha(){return!1}function ia(){try{return d.activeElement}catch(a){}}function ja(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)ja(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=ha;else if(!e)return a;return 1===f&&(g=e,e=function(a){return n().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=n.guid++)),a.each(function(){n.event.add(this,b,e,d,c)})}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=N.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return"undefined"!=typeof n&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(G)||[""],j=b.length;while(j--)h=fa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=N.hasData(a)&&N.get(a);if(r&&(i=r.events)){b=(b||"").match(G)||[""],j=b.length;while(j--)if(h=fa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&N.remove(a,"handle events")}},dispatch:function(a){a=n.event.fix(a);var b,c,d,f,g,h=[],i=e.call(arguments),j=(N.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())a.rnamespace&&!a.rnamespace.test(g.namespace)||(a.handleObj=g,a.data=g.data,d=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==d&&(a.result=d)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&("click"!==a.type||isNaN(a.button)||a.button<1))for(;i!==this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>-1:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,e,f,g=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||d,e=c.documentElement,f=c.body,a.pageX=b.clientX+(e&&e.scrollLeft||f&&f.scrollLeft||0)-(e&&e.clientLeft||f&&f.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||f&&f.scrollTop||0)-(e&&e.clientTop||f&&f.clientTop||0)),a.which||void 0===g||(a.which=1&g?1:2&g?3:4&g?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,e,f=a.type,g=a,h=this.fixHooks[f];h||(this.fixHooks[f]=h=ea.test(f)?this.mouseHooks:da.test(f)?this.keyHooks:{}),e=h.props?this.props.concat(h.props):this.props,a=new n.Event(g),b=e.length;while(b--)c=e[b],a[c]=g[c];return a.target||(a.target=d),3===a.target.nodeType&&(a.target=a.target.parentNode),h.filter?h.filter(a,g):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==ia()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===ia()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ga:ha):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={constructor:n.Event,isDefaultPrevented:ha,isPropagationStopped:ha,isImmediatePropagationStopped:ha,isSimulated:!1,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ga,a&&!this.isSimulated&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ga,a&&!this.isSimulated&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ga,a&&!this.isSimulated&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||n.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),n.fn.extend({on:function(a,b,c,d){return ja(this,a,b,c,d)},one:function(a,b,c,d){return ja(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=ha),this.each(function(){n.event.remove(this,a,c,b)})}});var ka=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,la=/<script|<style|<link/i,ma=/checked\s*(?:[^=]|=\s*.checked.)/i,na=/^true\/(.*)/,oa=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function pa(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function qa(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function ra(a){var b=na.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function sa(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(N.hasData(a)&&(f=N.access(a),g=N.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}O.hasData(a)&&(h=O.access(a),i=n.extend({},h),O.set(b,i))}}function ta(a,b){var c=b.nodeName.toLowerCase();"input"===c&&X.test(a.type)?b.checked=a.checked:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}function ua(a,b,c,d){b=f.apply([],b);var e,g,h,i,j,k,m=0,o=a.length,p=o-1,q=b[0],r=n.isFunction(q);if(r||o>1&&"string"==typeof q&&!l.checkClone&&ma.test(q))return a.each(function(e){var f=a.eq(e);r&&(b[0]=q.call(this,e,f.html())),ua(f,b,c,d)});if(o&&(e=ca(b,a[0].ownerDocument,!1,a,d),g=e.firstChild,1===e.childNodes.length&&(e=g),g||d)){for(h=n.map(_(e,"script"),qa),i=h.length;o>m;m++)j=e,m!==p&&(j=n.clone(j,!0,!0),i&&n.merge(h,_(j,"script"))),c.call(a[m],j,m);if(i)for(k=h[h.length-1].ownerDocument,n.map(h,ra),m=0;i>m;m++)j=h[m],Z.test(j.type||"")&&!N.access(j,"globalEval")&&n.contains(k,j)&&(j.src?n._evalUrl&&n._evalUrl(j.src):n.globalEval(j.textContent.replace(oa,"")))}return a}function va(a,b,c){for(var d,e=b?n.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||n.cleanData(_(d)),d.parentNode&&(c&&n.contains(d.ownerDocument,d)&&aa(_(d,"script")),d.parentNode.removeChild(d));return a}n.extend({htmlPrefilter:function(a){return a.replace(ka,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=_(h),f=_(a),d=0,e=f.length;e>d;d++)ta(f[d],g[d]);if(b)if(c)for(f=f||_(a),g=g||_(h),d=0,e=f.length;e>d;d++)sa(f[d],g[d]);else sa(a,h);return g=_(h,"script"),g.length>0&&aa(g,!i&&_(a,"script")),h},cleanData:function(a){for(var b,c,d,e=n.event.special,f=0;void 0!==(c=a[f]);f++)if(L(c)){if(b=c[N.expando]){if(b.events)for(d in b.events)e[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);c[N.expando]=void 0}c[O.expando]&&(c[O.expando]=void 0)}}}),n.fn.extend({domManip:ua,detach:function(a){return va(this,a,!0)},remove:function(a){return va(this,a)},text:function(a){return K(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=a)})},null,a,arguments.length)},append:function(){return ua(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=pa(this,a);b.appendChild(a)}})},prepend:function(){return ua(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=pa(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return ua(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return ua(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(_(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return K(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!la.test(a)&&!$[(Y.exec(a)||["",""])[1].toLowerCase()]){a=n.htmlPrefilter(a);try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(_(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return ua(this,arguments,function(b){var c=this.parentNode;n.inArray(this,a)<0&&(n.cleanData(_(this)),c&&c.replaceChild(b,this))},a)}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),f=e.length-1,h=0;f>=h;h++)c=h===f?this:this.clone(!0),n(e[h])[b](c),g.apply(d,c.get());return this.pushStack(d)}});var wa,xa={HTML:"block",BODY:"block"};function ya(a,b){var c=n(b.createElement(a)).appendTo(b.body),d=n.css(c[0],"display");return c.detach(),d}function za(a){var b=d,c=xa[a];return c||(c=ya(a,b),"none"!==c&&c||(wa=(wa||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=wa[0].contentDocument,b.write(),b.close(),c=ya(a,b),wa.detach()),xa[a]=c),c}var Aa=/^margin/,Ba=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ca=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)},Da=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e},Ea=d.documentElement;!function(){var b,c,e,f,g=d.createElement("div"),h=d.createElement("div");if(h.style){h.style.backgroundClip="content-box",h.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===h.style.backgroundClip,g.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",g.appendChild(h);function i(){h.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",h.innerHTML="",Ea.appendChild(g);var d=a.getComputedStyle(h);b="1%"!==d.top,f="2px"===d.marginLeft,c="4px"===d.width,h.style.marginRight="50%",e="4px"===d.marginRight,Ea.removeChild(g)}n.extend(l,{pixelPosition:function(){return i(),b},boxSizingReliable:function(){return null==c&&i(),c},pixelMarginRight:function(){return null==c&&i(),e},reliableMarginLeft:function(){return null==c&&i(),f},reliableMarginRight:function(){var b,c=h.appendChild(d.createElement("div"));return c.style.cssText=h.style.cssText="-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",h.style.width="1px",Ea.appendChild(g),b=!parseFloat(a.getComputedStyle(c).marginRight),Ea.removeChild(g),h.removeChild(c),b}})}}();function Fa(a,b,c){var d,e,f,g,h=a.style;return c=c||Ca(a),g=c?c.getPropertyValue(b)||c[b]:void 0,""!==g&&void 0!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),c&&!l.pixelMarginRight()&&Ba.test(g)&&Aa.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f),void 0!==g?g+"":g}function Ga(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Ha=/^(none|table(?!-c[ea]).+)/,Ia={position:"absolute",visibility:"hidden",display:"block"},Ja={letterSpacing:"0",fontWeight:"400"},Ka=["Webkit","O","Moz","ms"],La=d.createElement("div").style;function Ma(a){if(a in La)return a;var b=a[0].toUpperCase()+a.slice(1),c=Ka.length;while(c--)if(a=Ka[c]+b,a in La)return a}function Na(a,b,c){var d=T.exec(b);return d?Math.max(0,d[2]-(c||0))+(d[3]||"px"):b}function Oa(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+U[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+U[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+U[f]+"Width",!0,e))):(g+=n.css(a,"padding"+U[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+U[f]+"Width",!0,e)));return g}function Pa(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ca(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Fa(a,b,f),(0>e||null==e)&&(e=a.style[b]),Ba.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Oa(a,b,c||(g?"border":"content"),d,f)+"px"}function Qa(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=N.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&V(d)&&(f[g]=N.access(d,"olddisplay",za(d.nodeName)))):(e=V(d),"none"===c&&e||N.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Fa(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Ma(h)||h),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=T.exec(c))&&e[1]&&(c=W(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(n.cssNumber[h]?"":"px")),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Ma(h)||h),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=Fa(a,b,d)),"normal"===e&&b in Ja&&(e=Ja[b]),""===c||c?(f=parseFloat(e),c===!0||isFinite(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?Ha.test(n.css(a,"display"))&&0===a.offsetWidth?Da(a,Ia,function(){return Pa(a,b,d)}):Pa(a,b,d):void 0},set:function(a,c,d){var e,f=d&&Ca(a),g=d&&Oa(a,b,d,"border-box"===n.css(a,"boxSizing",!1,f),f);return g&&(e=T.exec(c))&&"px"!==(e[3]||"px")&&(a.style[b]=c,c=n.css(a,b)),Na(a,c,g)}}}),n.cssHooks.marginLeft=Ga(l.reliableMarginLeft,function(a,b){return b?(parseFloat(Fa(a,"marginLeft"))||a.getBoundingClientRect().left-Da(a,{marginLeft:0},function(){return a.getBoundingClientRect().left}))+"px":void 0}),n.cssHooks.marginRight=Ga(l.reliableMarginRight,function(a,b){return b?Da(a,{display:"inline-block"},Fa,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+U[d]+b]=f[d]||f[d-2]||f[0];return e}},Aa.test(a)||(n.cssHooks[a+b].set=Na)}),n.fn.extend({css:function(a,b){return K(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=Ca(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Qa(this,!0)},hide:function(){return Qa(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){V(this)?n(this).show():n(this).hide()})}});function Ra(a,b,c,d,e){return new Ra.prototype.init(a,b,c,d,e)}n.Tween=Ra,Ra.prototype={constructor:Ra,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||n.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Ra.propHooks[this.prop];return a&&a.get?a.get(this):Ra.propHooks._default.get(this)},run:function(a){var b,c=Ra.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Ra.propHooks._default.set(this),this}},Ra.prototype.init.prototype=Ra.prototype,Ra.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[n.cssProps[a.prop]]&&!n.cssHooks[a.prop]?a.elem[a.prop]=a.now:n.style(a.elem,a.prop,a.now+a.unit)}}},Ra.propHooks.scrollTop=Ra.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},n.fx=Ra.prototype.init,n.fx.step={};var Sa,Ta,Ua=/^(?:toggle|show|hide)$/,Va=/queueHooks$/;function Wa(){return a.setTimeout(function(){Sa=void 0}),Sa=n.now()}function Xa(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=U[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ya(a,b,c){for(var d,e=(_a.tweeners[b]||[]).concat(_a.tweeners["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Za(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&V(a),q=N.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?N.get(a,"olddisplay")||za(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Ua.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?za(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=N.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;N.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ya(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function $a(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function _a(a,b,c){var d,e,f=0,g=_a.prefilters.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Sa||Wa(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{},easing:n.easing._default},c),originalProperties:b,originalOptions:c,startTime:Sa||Wa(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for($a(k,j.opts.specialEasing);g>f;f++)if(d=_a.prefilters[f].call(j,a,k,j.opts))return n.isFunction(d.stop)&&(n._queueHooks(j.elem,j.opts.queue).stop=n.proxy(d.stop,d)),d;return n.map(k,Ya,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(_a,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return W(c.elem,a,T.exec(b),c),c}]},tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.match(G);for(var c,d=0,e=a.length;e>d;d++)c=a[d],_a.tweeners[c]=_a.tweeners[c]||[],_a.tweeners[c].unshift(b)},prefilters:[Za],prefilter:function(a,b){b?_a.prefilters.unshift(a):_a.prefilters.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,null!=d.queue&&d.queue!==!0||(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(V).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=_a(this,n.extend({},a),f);(e||N.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=N.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Va.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=N.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Xa(b,!0),a,d,e)}}),n.each({slideDown:Xa("show"),slideUp:Xa("hide"),slideToggle:Xa("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(Sa=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),Sa=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Ta||(Ta=a.setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){a.clearInterval(Ta),Ta=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(b,c){return b=n.fx?n.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a=d.createElement("input"),b=d.createElement("select"),c=b.appendChild(d.createElement("option"));a.type="checkbox",l.checkOn=""!==a.value,l.optSelected=c.selected,b.disabled=!0,l.optDisabled=!c.disabled,a=d.createElement("input"),a.value="t",a.type="radio",l.radioValue="t"===a.value}();var ab,bb=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return K(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),e=n.attrHooks[b]||(n.expr.match.bool.test(b)?ab:void 0)),void 0!==c?null===c?void n.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=n.find.attr(a,b),null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(G);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)}}),ab={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=bb[b]||n.find.attr;bb[b]=function(a,b,d){var e,f;return d||(f=bb[b],bb[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,bb[b]=f),e}});var cb=/^(?:input|select|textarea|button)$/i,db=/^(?:a|area)$/i;n.fn.extend({prop:function(a,b){return K(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&n.isXMLDoc(a)||(b=n.propFix[b]||b,e=n.propHooks[b]),
void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=n.find.attr(a,"tabindex");return b?parseInt(b,10):cb.test(a.nodeName)||db.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),l.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var eb=/[\t\r\n\f]/g;function fb(a){return a.getAttribute&&a.getAttribute("class")||""}n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,fb(this)))});if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=fb(c),d=1===c.nodeType&&(" "+e+" ").replace(eb," ")){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=n.trim(d),e!==h&&c.setAttribute("class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,fb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=fb(c),d=1===c.nodeType&&(" "+e+" ").replace(eb," ")){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=n.trim(d),e!==h&&c.setAttribute("class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):n.isFunction(a)?this.each(function(c){n(this).toggleClass(a.call(this,c,fb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=n(this),f=a.match(G)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=fb(this),b&&N.set(this,"__className__",b),this.setAttribute&&this.setAttribute("class",b||a===!1?"":N.get(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+fb(c)+" ").replace(eb," ").indexOf(b)>-1)return!0;return!1}});var gb=/\r/g,hb=/[\x20\t\r\n\f]+/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(gb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a)).replace(hb," ")}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],(c.selected||i===e)&&(l.optDisabled?!c.disabled:null===c.getAttribute("disabled"))&&(!c.parentNode.disabled||!n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(n.valHooks.option.get(d),f)>-1)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>-1:void 0}},l.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var ib=/^(?:focusinfocus|focusoutblur)$/;n.extend(n.event,{trigger:function(b,c,e,f){var g,h,i,j,l,m,o,p=[e||d],q=k.call(b,"type")?b.type:b,r=k.call(b,"namespace")?b.namespace.split("."):[];if(h=i=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!ib.test(q+n.event.triggered)&&(q.indexOf(".")>-1&&(r=q.split("."),q=r.shift(),r.sort()),l=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=r.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},f||!o.trigger||o.trigger.apply(e,c)!==!1)){if(!f&&!o.noBubble&&!n.isWindow(e)){for(j=o.delegateType||q,ib.test(j+q)||(h=h.parentNode);h;h=h.parentNode)p.push(h),i=h;i===(e.ownerDocument||d)&&p.push(i.defaultView||i.parentWindow||a)}g=0;while((h=p[g++])&&!b.isPropagationStopped())b.type=g>1?j:o.bindType||q,m=(N.get(h,"events")||{})[b.type]&&N.get(h,"handle"),m&&m.apply(h,c),m=l&&h[l],m&&m.apply&&L(h)&&(b.result=m.apply(h,c),b.result===!1&&b.preventDefault());return b.type=q,f||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!L(e)||l&&n.isFunction(e[q])&&!n.isWindow(e)&&(i=e[l],i&&(e[l]=null),n.event.triggered=q,e[q](),n.event.triggered=void 0,i&&(e[l]=i)),b.result}},simulate:function(a,b,c){var d=n.extend(new n.Event,c,{type:a,isSimulated:!0});n.event.trigger(d,null,b)}}),n.fn.extend({trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),l.focusin="onfocusin"in a,l.focusin||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a))};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=N.access(d,b);e||d.addEventListener(a,c,!0),N.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=N.access(d,b)-1;e?N.access(d,b,e):(d.removeEventListener(a,c,!0),N.remove(d,b))}}});var jb=a.location,kb=n.now(),lb=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(b){var c;if(!b||"string"!=typeof b)return null;try{c=(new a.DOMParser).parseFromString(b,"text/xml")}catch(d){c=void 0}return c&&!c.getElementsByTagName("parsererror").length||n.error("Invalid XML: "+b),c};var mb=/#.*$/,nb=/([?&])_=[^&]*/,ob=/^(.*?):[ \t]*([^\r\n]*)$/gm,pb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,qb=/^(?:GET|HEAD)$/,rb=/^\/\//,sb={},tb={},ub="*/".concat("*"),vb=d.createElement("a");vb.href=jb.href;function wb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(G)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function xb(a,b,c,d){var e={},f=a===tb;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function yb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function zb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Ab(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:jb.href,type:"GET",isLocal:pb.test(jb.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":ub,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?yb(yb(a,n.ajaxSettings),b):yb(n.ajaxSettings,a)},ajaxPrefilter:wb(sb),ajaxTransport:wb(tb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var e,f,g,h,i,j,k,l,m=n.ajaxSetup({},c),o=m.context||m,p=m.context&&(o.nodeType||o.jquery)?n(o):n.event,q=n.Deferred(),r=n.Callbacks("once memory"),s=m.statusCode||{},t={},u={},v=0,w="canceled",x={readyState:0,getResponseHeader:function(a){var b;if(2===v){if(!h){h={};while(b=ob.exec(g))h[b[1].toLowerCase()]=b[2]}b=h[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===v?g:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return v||(a=u[c]=u[c]||a,t[a]=b),this},overrideMimeType:function(a){return v||(m.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>v)for(b in a)s[b]=[s[b],a[b]];else x.always(a[x.status]);return this},abort:function(a){var b=a||w;return e&&e.abort(b),z(0,b),this}};if(q.promise(x).complete=r.add,x.success=x.done,x.error=x.fail,m.url=((b||m.url||jb.href)+"").replace(mb,"").replace(rb,jb.protocol+"//"),m.type=c.method||c.type||m.method||m.type,m.dataTypes=n.trim(m.dataType||"*").toLowerCase().match(G)||[""],null==m.crossDomain){j=d.createElement("a");try{j.href=m.url,j.href=j.href,m.crossDomain=vb.protocol+"//"+vb.host!=j.protocol+"//"+j.host}catch(y){m.crossDomain=!0}}if(m.data&&m.processData&&"string"!=typeof m.data&&(m.data=n.param(m.data,m.traditional)),xb(sb,m,c,x),2===v)return x;k=n.event&&m.global,k&&0===n.active++&&n.event.trigger("ajaxStart"),m.type=m.type.toUpperCase(),m.hasContent=!qb.test(m.type),f=m.url,m.hasContent||(m.data&&(f=m.url+=(lb.test(f)?"&":"?")+m.data,delete m.data),m.cache===!1&&(m.url=nb.test(f)?f.replace(nb,"$1_="+kb++):f+(lb.test(f)?"&":"?")+"_="+kb++)),m.ifModified&&(n.lastModified[f]&&x.setRequestHeader("If-Modified-Since",n.lastModified[f]),n.etag[f]&&x.setRequestHeader("If-None-Match",n.etag[f])),(m.data&&m.hasContent&&m.contentType!==!1||c.contentType)&&x.setRequestHeader("Content-Type",m.contentType),x.setRequestHeader("Accept",m.dataTypes[0]&&m.accepts[m.dataTypes[0]]?m.accepts[m.dataTypes[0]]+("*"!==m.dataTypes[0]?", "+ub+"; q=0.01":""):m.accepts["*"]);for(l in m.headers)x.setRequestHeader(l,m.headers[l]);if(m.beforeSend&&(m.beforeSend.call(o,x,m)===!1||2===v))return x.abort();w="abort";for(l in{success:1,error:1,complete:1})x[l](m[l]);if(e=xb(tb,m,c,x)){if(x.readyState=1,k&&p.trigger("ajaxSend",[x,m]),2===v)return x;m.async&&m.timeout>0&&(i=a.setTimeout(function(){x.abort("timeout")},m.timeout));try{v=1,e.send(t,z)}catch(y){if(!(2>v))throw y;z(-1,y)}}else z(-1,"No Transport");function z(b,c,d,h){var j,l,t,u,w,y=c;2!==v&&(v=2,i&&a.clearTimeout(i),e=void 0,g=h||"",x.readyState=b>0?4:0,j=b>=200&&300>b||304===b,d&&(u=zb(m,x,d)),u=Ab(m,u,x,j),j?(m.ifModified&&(w=x.getResponseHeader("Last-Modified"),w&&(n.lastModified[f]=w),w=x.getResponseHeader("etag"),w&&(n.etag[f]=w)),204===b||"HEAD"===m.type?y="nocontent":304===b?y="notmodified":(y=u.state,l=u.data,t=u.error,j=!t)):(t=y,!b&&y||(y="error",0>b&&(b=0))),x.status=b,x.statusText=(c||y)+"",j?q.resolveWith(o,[l,y,x]):q.rejectWith(o,[x,y,t]),x.statusCode(s),s=void 0,k&&p.trigger(j?"ajaxSuccess":"ajaxError",[x,m,j?l:t]),r.fireWith(o,[x,y]),k&&(p.trigger("ajaxComplete",[x,m]),--n.active||n.event.trigger("ajaxStop")))}return x},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax(n.extend({url:a,type:b,dataType:e,data:c,success:d},n.isPlainObject(a)&&a))}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return n.isFunction(a)?this.each(function(b){n(this).wrapInner(a.call(this,b))}):this.each(function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return!n.expr.filters.visible(a)},n.expr.filters.visible=function(a){return a.offsetWidth>0||a.offsetHeight>0||a.getClientRects().length>0};var Bb=/%20/g,Cb=/\[\]$/,Db=/\r?\n/g,Eb=/^(?:submit|button|image|reset|file)$/i,Fb=/^(?:input|select|textarea|keygen)/i;function Gb(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||Cb.test(a)?d(a,e):Gb(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Gb(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Gb(c,a[c],b,e);return d.join("&").replace(Bb,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&Fb.test(this.nodeName)&&!Eb.test(a)&&(this.checked||!X.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(Db,"\r\n")}}):{name:b.name,value:c.replace(Db,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new a.XMLHttpRequest}catch(b){}};var Hb={0:200,1223:204},Ib=n.ajaxSettings.xhr();l.cors=!!Ib&&"withCredentials"in Ib,l.ajax=Ib=!!Ib,n.ajaxTransport(function(b){var c,d;return l.cors||Ib&&!b.crossDomain?{send:function(e,f){var g,h=b.xhr();if(h.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(g in b.xhrFields)h[g]=b.xhrFields[g];b.mimeType&&h.overrideMimeType&&h.overrideMimeType(b.mimeType),b.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest");for(g in e)h.setRequestHeader(g,e[g]);c=function(a){return function(){c&&(c=d=h.onload=h.onerror=h.onabort=h.onreadystatechange=null,"abort"===a?h.abort():"error"===a?"number"!=typeof h.status?f(0,"error"):f(h.status,h.statusText):f(Hb[h.status]||h.status,h.statusText,"text"!==(h.responseType||"text")||"string"!=typeof h.responseText?{binary:h.response}:{text:h.responseText},h.getAllResponseHeaders()))}},h.onload=c(),d=h.onerror=c("error"),void 0!==h.onabort?h.onabort=d:h.onreadystatechange=function(){4===h.readyState&&a.setTimeout(function(){c&&d()})},c=c("abort");try{h.send(b.hasContent&&b.data||null)}catch(i){if(c)throw i}},abort:function(){c&&c()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(e,f){b=n("<script>").prop({charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&f("error"===a.type?404:200,a.type)}),d.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Jb=[],Kb=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Jb.pop()||n.expando+"_"+kb++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Kb.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Kb.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Kb,"$1"+e):b.jsonp!==!1&&(b.url+=(lb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?n(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Jb.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||d;var e=x.exec(a),f=!c&&[];return e?[b.createElement(e[1])]:(e=ca([a],b,f),f&&f.length&&n(f).remove(),n.merge([],e.childNodes))};var Lb=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Lb)return Lb.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};function Mb(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,n.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(e=d.getBoundingClientRect(),c=Mb(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Ea})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c="pageYOffset"===b;n.fn[a]=function(d){return K(this,function(a,d,e){var f=Mb(a);return void 0===e?f?f[b]:a[d]:void(f?f.scrollTo(c?f.pageXOffset:e,c?e:f.pageYOffset):a[d]=e)},a,d,arguments.length)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=Ga(l.pixelPosition,function(a,c){return c?(c=Fa(a,b),Ba.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return K(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)},size:function(){return this.length}}),n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Nb=a.jQuery,Ob=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Ob),b&&a.jQuery===n&&(a.jQuery=Nb),n},b||(a.jQuery=a.$=n),n});
//]]>
