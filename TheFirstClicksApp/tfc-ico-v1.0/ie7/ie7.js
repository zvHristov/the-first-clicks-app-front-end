/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'tfc-ico\'">' + entity + '</span>' + html;
	}
	var icons = {
		'ico-account-ico': '&#xe900;',
		'ico-arrow-DOWN-ico': '&#xe901;',
		'ico-arrow-LEFT-ico': '&#xe902;',
		'ico-arrow-RIGHT-ico': '&#xe903;',
		'ico-arrow-UP-ico': '&#xe904;',
		'ico-arrowhead-down-ico': '&#xe905;',
		'ico-arrowhead-up-ico': '&#xe906;',
		'ico-checkmark-circle-ico': '&#xe907;',
		'ico-checkmark-icon': '&#xe908;',
		'ico-copy-ico': '&#xe909;',
		'ico-desktop-ico': '&#xe90a;',
		'ico-doc-ico': '&#xe90b;',
		'ico-download-ico': '&#xe90c;',
		'ico-edit-ico': '&#xe90d;',
		'ico-expand-ico': '&#xe90e;',
		'ico-filters-ico': '&#xe90f;',
		'ico-fire-icon': '&#xe910;',
		'ico-from-to-ico': '&#xe911;',
		'ico-full-screen-ico': '&#xe912;',
		'ico-grid-empty-ico': '&#xe913;',
		'ico-grid-ico': '&#xe914;',
		'ico-heat-map-ico': '&#xe915;',
		'ico-img-ico': '&#xe916;',
		'ico-info-ico': '&#xe917;',
		'ico-invoice-ico': '&#xe918;',
		'ico-jobs-ico': '&#xe919;',
		'ico-lightning-icon': '&#xe91a;',
		'ico-link-ico': '&#xe91b;',
		'ico-link-redirect-ico': '&#xe91c;',
		'ico-list-ico-1': '&#xe91d;',
		'ico-list-ico': '&#xe91e;',
		'ico-minus-ico': '&#xe91f;',
		'ico-mobile-ico': '&#xe920;',
		'ico-move-ico': '&#xe921;',
		'ico-options-ico': '&#xe922;',
		'ico-pause-ico': '&#xe923;',
		'ico-pause-page-click': '&#xe924;',
		'ico-payment-ico': '&#xe925;',
		'ico-plus-ico': '&#xe926;',
		'ico-question-mark-ico': '&#xe927;',
		'ico-search-ico': '&#xe928;',
		'ico-settings-full-ico': '&#xe929;',
		'ico-settings-outline-ico': '&#xe92a;',
		'ico-shrink-ico': '&#xe92b;',
		'ico-snippet-ico': '&#xe92c;',
		'ico-stats-ico': '&#xe92d;',
		'ico-tablet-ico': '&#xe92e;',
		'ico-target-click-ico': '&#xe92f;',
		'ico-teams-ico': '&#xe930;',
		'ico-upload-ico-1': '&#xe931;',
		'ico-upload-ico': '&#xe932;',
		'ico-webpage-ico': '&#xe933;',
		'ico-x-ico': '&#xe934;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/ico-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
