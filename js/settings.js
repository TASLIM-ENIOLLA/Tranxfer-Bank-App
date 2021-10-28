var $ = (query) => {
	return document.querySelector(query);
}
var $$ = (query) => {
	return document.querySelectorAll(query);
}
$(".back-btn").addEventListener(
	"click",
	(e) => {
		window.history.back();
	}
);