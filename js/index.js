var $ = (query) => {
	// if(document.querySelectorAll(query).length > 1){
	// 	return document.querySelectorAll(query);
	// }
	// else{
		return document.querySelector(query);
	// }
}
var $$ = (query) => {
	return document.querySelectorAll(query);
}
var containsClassNode = (element, classNode) => {
	if(element.classList.contains(classNode)){
		return true;
	}
	else{
		return false;
	}
}
var classNodeReplace = (element, classNode, replacement) => {
	element.classList.remove(classNode);
	element.classList.add(replacement);
}

class Index{
	constructor(){
		window.addEventListener(
			"touchstart",
			(e) => {
				this.XCoordsStart = e.touches[0].pageX;
				this.YCoordsStart = e.touches[0].pageY;
			}
		);
		$$(".menu-list > div").forEach(
			item => {
				item.addEventListener(
					"click",
					(e) => {
						$$(".menu-list > div").forEach(
							item => {
								item.classList.remove("main-list-selected");
							}
						);
						e.srcElement.classList.add("main-list-selected");
					}
				);
			}
		);
		window.addEventListener(
			"touchend",
			(e) => {
				this.XCoordsEnd = e.changedTouches[0].pageX;
				this.YCoordsEnd = e.changedTouches[0].pageY;
				
				this.XCoordDiff = this.XCoordsEnd - this.XCoordsStart;
				this.YCoordDiff = this.YCoordsEnd - this.YCoordsStart;

				if(this.XCoordDiff > 70 && containsClassNode($(".side-pane"), "left-translate-negative-100pcent")){
					$(".side-pane").focus();
					e.srcElement.title = "opened";
				}
				else if(this.XCoordDiff < -70 && containsClassNode($(".side-pane"), "left-translate-0")){
					$(".side-pane").blur();
					e.srcElement.title = "closed";
				}
			}
		);
		$(".side-pane-opener").addEventListener(
			"click",
			(e) => {
				if(e.srcElement.title == "closed"){
					$(".side-pane").focus();
					e.srcElement.title = "opened";
				}
				else{
					$(".side-pane").blur();
					e.srcElement.title = "closed";
				}
			}
		);
		$(".side-pane").addEventListener(
			"focusin",
			(e) => {
				if(containsClassNode(e.srcElement, "left-translate-negative-100pcent")){
					classNodeReplace($(".side-pane"), "left-translate-negative-100pcent", "left-translate-0");
				}
			}
		);
		$(".side-pane").addEventListener(
			"focusout",
			(e) => {
				if(containsClassNode(e.srcElement, "left-translate-0")){
					classNodeReplace($(".side-pane"), "left-translate-0", "left-translate-negative-100pcent");
				}
				e.srcElement.title = "closed";
			}
		);
		["resize", "load"].forEach(
			item => {
				window.addEventListener(
					item,
					() => {
						let parentHeight = $(".side-pane-item-list").getBoundingClientRect().height;
						let totalChildHeight = () => {
							let total = 0;
							$$(".side-pane-item-list > *").forEach(
								item => {
									total = total + item.getBoundingClientRect().height;
								}
							);
							return total;
						}
						this.totalChildenHeightOfSidePaneList = totalChildHeight();
						this.parentHeightOfSidePaneList = parentHeight;
						if(totalChildHeight() <= parentHeight){
							$(".side-pane-item-list").classList.remove("bt");		
							$(".side-pane-item-list").classList.remove("bb");		
						}
					}
				);
			}
		);
		$(".side-pane-item-list").addEventListener(
			"scroll",
			(e) => {
				let totalChildenHeightOfSidePaneList = Math.floor(this.totalChildenHeightOfSidePaneList);
				let parentHeightOfSidePaneList = Math.floor(this.parentHeightOfSidePaneList);
				let scrollLength = Math.floor(e.srcElement.scrollTop);
				if(scrollLength == 0){
					$(".side-pane-item-list").classList.remove("bt");
				}
				if(scrollLength > 0){
					$(".side-pane-item-list").classList.add("bt");
				}
				if(scrollLength < parseInt(totalChildenHeightOfSidePaneList - parentHeightOfSidePaneList)){
					$(".side-pane-item-list").classList.add("bb");
				}
				if(scrollLength == parseInt(totalChildenHeightOfSidePaneList - parentHeightOfSidePaneList)){
					$(".side-pane-item-list").classList.remove("bb");	
				}
			}
		);
		$$(".menu-list > div").forEach(
			item => {
				item.addEventListener(
					"click",
					(e) => {
						let title = e.srcElement.title.replace(/\s/, "_");
						document.location = "menu/" + title + ".php";
					}
				);
			}
		);
	}
}

var index = new Index();