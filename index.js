"use strict";

var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
if (isMobile.any()) {
	document.body.classList.add('_touch');

} else {
	document.body.classList.add('_pc');
}


// header-info__like
likeTransparent.addEventListener("click", function (e) {
	likeRed.style.display = 'block';
	likeTransparent.style.display = 'none';
});

likeRed.addEventListener("click", function (e) {
	likeTransparent.style.display = 'block';
	likeRed.style.display = 'none';
});
//------------------------------------------------


// slider swiper

const body = document.querySelector('body');
const swiperMain = document.querySelector('.swiper__main');
const swiperPreview = document.querySelector('.swiper__preview');
const swiperWrapperPopup = document.querySelector('.swiper__wrapper-popup');
const swiperPopup = document.querySelector('.swiper__popup');
const swiperButtonClose = document.querySelector('.swiper-button-close');
const colorsSlider = document.querySelector('.colors__slider');


var mySwiperPreview = new Swiper(swiperPreview, {
	navigation: {
		nextEl: ".swiper-next",
		prevEl: ".swiper-prev"
	},
	// slidesPerView: 0,
	centeredSlides: false,
	centeredSlidesBounds: true,
	direction: "vertical",
	spaceBetween: 10,
	slidesPerView: 'auto',
	freeMode: false,
	observer: true,
	observeParents: true,
	observeSlideChildren: true,
	watchSlidesProgress: true, // Включите эту функцию для расчета прогресса и видимости каждого слайда (слайды в области просмотра будут иметь дополнительный видимый класс)
	watchOverflow: true, // При включении Swiper будет отключен и скроет кнопки навигации, если слайдов для перемещения недостаточно.
	loop: false // Бесконечный слайдер. Не будет работать с Мультирядностью и со скроллом
});


var mySwiperMain = new Swiper(swiperMain, {
	direction: "horizontal",
	spaceBetween: 10,
	loop: true,
	effect: 'slide',
	navigation: {
		nextEl: ".swiper-next__right",
		prevEl: ".swiper-prev__left"
	},
	keyboard: {
		enabled: false,
		onlyInViewport: false
	},
	thumbs: {
		swiper: mySwiperPreview
	},
	observer: true,
	observeParents: true,
	observeSlideChildren: true
});


var myswiperPopup = new Swiper(swiperPopup, {
	slidesPerView: 1,
	direction: "horizontal",
	spaceBetween: 10,
	loop: true,
	effect: 'fade',
	fadeEffect: {
		crossFade: true
	},
	normalizeSlideIndex: true,
	navigation: {
		nextEl: ".swiper-next-popup",
		prevEl: ".swiper-prev-popup"
	},
	keyboard: {
		enabled: false
	},
	observer: true,
	observeParents: true,
	observeSlideChildren: true
});

mySwiperMain.on("click", function () {
	document.body.classList.add('_lock');
	swiperPopup.classList.add("_openGallery");

});

swiperButtonClose.addEventListener("click", function () {
	document.body.classList.remove('_lock');
	swiperPopup.classList.remove('_openGallery');
});

mySwiperMain.controller.control = myswiperPopup;
myswiperPopup.controller.control = mySwiperMain;






var myColorsSlider = new Swiper(colorsSlider, {
	direction: "horizontal",
	effect: 'slider',
	spaceBetween: 10,
	loop: true,
	// slidesPerView: 'auto',
	slidesPerView: 8,
	// slidesPerGroup: 1,
	centeredSlides: false,
	centeredSlidesBounds: true,
	navigation: {
		nextEl: ".swiper-next-colors",
		prevEl: ".swiper-prev-colors"
	},
	keyboard: {
		enabled: false
	},
	observer: true,
	observeParents: true,
	observeSlideChildren: true,
	breakpoints: {
		1100: {
			slidesPerView: 5
		},
		850: {
			slidesPerView: 9
		},
		750: {
			slidesPerView: 7
		},
		650: {
			slidesPerView: 6
		},
		500: {
			slidesPerView: 6
		},
		400: {
			slidesPerView: 5
		},
		300: {
			slidesPerView: 4
		}
	}
});
//------------------------------------------------



// sizes-table__list  Выделяем link которых нет в наличии
const childsSizesTableTooltip = document.querySelectorAll(".sizesTableTooltip");

childsSizesTableTooltip.forEach(link => {
	const data = link.dataset.size_table_info;
	const dataArray = data.split(",");
	if (dataArray[0] == 'false') {
		link.style.backgroundColor = "#c5c5c5";
	}
});
//------------------------------------------------



// tooltip

if (body.classList.contains("_pc")) {
	setTimeout(tooltipInit, 1000);
}

function tooltipInit() {
	const childsSwiper = document.querySelectorAll(".swiper-tooltip");
	const headerInfoShare = document.querySelector(".header-info__share");
	const headerInfoComplaint = document.querySelector(".header-info__complaint");

	initHoverIntent(headerInfoShare);
	initHoverIntent(headerInfoComplaint);
	childsSwiper.forEach(initHoverIntent);
	childsSizesTableTooltip.forEach(initHoverIntent);
};

function initHoverIntent(elem) {
	new HoverIntent({
		elem,
		over() {
			// Для tooltipShare
			if (elem.classList.contains("header-info__share")) {

				tooltipShare.hidden = false;

				let left = elem.getBoundingClientRect().left;

				if (left < 0) left = 0;
				tooltipShare.style.left = left - (tooltipShare.offsetWidth / 2 - elem.offsetWidth / 2) + "px";

				let top = elem.getBoundingClientRect().top - tooltipShare.offsetHeight - 8;
				if (top < 0) {
					top = elem.getBoundingClientRect().top + elem.offsetHeight + 8;
				}
				tooltipShare.style.top = top + pageYOffset + "px";
			}
			//-----------------------------------------------------------

			// Для tooltipComplaint
			if (elem.classList.contains("header-info__complaint")) {

				tooltipComplaint.hidden = false;

				let left = elem.getBoundingClientRect().left;

				if (left < 0) left = 0;
				tooltipComplaint.style.left = left - (tooltipComplaint.offsetWidth / 2 - elem.offsetWidth / 2) + "px";

				let top = elem.getBoundingClientRect().top - tooltipComplaint.offsetHeight - 8;
				if (top < 0) {
					top = elem.getBoundingClientRect().top + elem.offsetHeight + 8;
				}
				tooltipComplaint.style.top = top + pageYOffset + "px";
			}
			//-----------------------------------------------------------

			// Для swiper-tooltip
			if (elem.classList.contains("swiper-tooltip")) {

				const data = elem.dataset.tooltip;
				const dataArray = data.split(",");
				tooltipImage.src = dataArray[0];
				tooltipPriceCurrent.innerText = dataArray[1];
				tooltipPricePrevious.innerText = dataArray[2];

				let sizesTableTooltipLink = document.querySelectorAll(".sizes-table-tooltip__link");
				let sizesTableTooltipList = document.querySelector(".sizes-table-tooltip__list");

				for (let i = 3; i < 8; i++) {
					sizesTableTooltipLink[i - 3].innerText = dataArray[i] + " ";
				}

				if (dataArray.length < 8) {
					let linkRemove = sizesTableTooltipLink.length - (dataArray.length - 3);
					for (let i = linkRemove; i > 0; i--) {
						sizesTableTooltipList.lastElementChild.remove();
					}
				}
				if (dataArray.length > 8) {
					sizesTableTooltipList.insertAdjacentHTML('beforeend', '<li><pre class="sizes-table-tooltip__link">...</pre></li>');
				}

				tooltip.hidden = false;

				let left = elem.getBoundingClientRect().left;

				if (left < 0) left = 0;
				tooltip.style.left = left + pageXOffset + "px";

				let top = elem.getBoundingClientRect().bottom + 15;
				if (top < 0) {
					top = elem.getBoundingClientRect().top + elem.offsetHeight + 45;
				}
				tooltip.style.top = top + pageYOffset + "px";

				tooltip.style.transform = 'scale(1)';
			}
			//-----------------------------------------------------------

			// Для sizesTableTooltip
			if (elem.classList.contains("sizesTableTooltip")) {

				const data = elem.dataset.size_table_info;
				const dataArray = data.split(",");
				let productAvailability = (dataArray[0] == 'true') ? "В наличии" : "Нет в наличии";
				tooltip2Delivery.innerText = productAvailability;
				tooltip2RussiaSize.innerText = dataArray[1];
				tooltip2FootLength.innerText = dataArray[2];

				tooltip2.hidden = false;

				let left = elem.getBoundingClientRect().left;

				if (left < 0) left = 0;
				tooltip2.style.left = left - (tooltip2.offsetWidth / 2 - elem.offsetWidth / 2) + "px";

				let top = elem.getBoundingClientRect().top - tooltip2.offsetHeight - 8;
				if (top < 0) {
					top = elem.getBoundingClientRect().top + elem.offsetHeight + 8;
				}
				tooltip2.style.top = top + pageYOffset + "px";
			}
			//-----------------------------------------------------------
		},

		out() {
			// Для tooltipShare
			if (elem.classList.contains("header-info__share")) {
				tooltipShare.hidden = true;
			}
			//-----------------------------------------------------------

			// Для tooltipComplaint
			if (elem.classList.contains("header-info__complaint")) {
				tooltipComplaint.hidden = true;
			}
			//-----------------------------------------------------------

			// Для swiper-tooltip
			if (elem.classList.contains("swiper-tooltip")) {
				const data = elem.dataset.tooltip;
				const dataArray = data.split(",");
				let sizesTableTooltipList = document.querySelector(".sizes-table-tooltip__list");
				let sizesTableTooltipLink = document.querySelectorAll(".sizes-table-tooltip__link");

				if (dataArray.length < 8) {
					let linkAdd = 5 - sizesTableTooltipLink.length;

					for (let i = linkAdd; i > 0; i--) {
						sizesTableTooltipList.insertAdjacentHTML('beforeend', '<li><pre class="sizes-table-tooltip__link"></pre></li>');
					}
				}

				if (dataArray.length > 8) {
					sizesTableTooltipList.lastElementChild.remove();
				}

				tooltip.style.transform = 'scale(0)';

				setTimeout(function () {
					tooltip.hidden = true;
				}, 200);
			}
			//-----------------------------------------------------------

			// Для sizesTableTooltip
			if (elem.classList.contains("sizesTableTooltip")) {
				tooltip2.hidden = true;
			}
			//-----------------------------------------------------------
		}
	});
}


class HoverIntent {
	constructor({
		sensitivity = 0.1, // скорость ниже 0.1px/ms значит "курсор на элементе"
		interval = 100, // измеряем скорость каждые 100ms
		elem,
		over,
		out
	}) {
		this.sensitivity = sensitivity;
		this.interval = interval;
		this.elem = elem;
		this.over = over;
		this.out = out;

		// убедитесь, что "this" сохраняет своё значение для обработчиков.
		this.onMouseMove = this.onMouseMove.bind(this);
		this.onMouseOver = this.onMouseOver.bind(this);
		this.onMouseOut = this.onMouseOut.bind(this);

		// и в функции, измеряющей время (вызываемой из setInterval)
		this.trackSpeed = this.trackSpeed.bind(this);

		this.elem.addEventListener("mouseover", this.onMouseOver);

		this.elem.addEventListener("mouseout", this.onMouseOut);
	}

	onMouseOver(event) {
		if (this.isOverElement) {
			// Игнорируем событие над элементом,
			// так как мы уже измеряем скорость
			return;
		}

		this.isOverElement = true;

		// после каждого движения измеряем дистанцию
		// между предыдущими и текущими координатами курсора
		// если скорость меньше sensivity, то она считается медленной

		this.prevX = event.pageX;
		this.prevY = event.pageY;
		this.prevTime = Date.now();

		this.elem.addEventListener("mousemove", this.onMouseMove);
		this.checkSpeedInterval = setInterval(this.trackSpeed, this.interval);
	}

	onMouseOut(event) {
		// если ушли с элемента
		if (!event.relatedTarget || !this.elem.contains(event.relatedTarget)) {
			this.isOverElement = false;
			this.elem.removeEventListener("mousemove", this.onMouseMove);
			clearInterval(this.checkSpeedInterval);
			if (this.isHover) {
				// если была остановка движения на элементе
				this.out.call(this.elem, event);
				this.isHover = false;
			}
		}
	}

	onMouseMove(event) {
		this.lastX = event.pageX;
		this.lastY = event.pageY;
		this.lastTime = Date.now();
	}

	trackSpeed() {
		let speed;

		if (!this.lastTime || this.lastTime == this.prevTime) {
			// курсор не двигался
			speed = 0;
		} else {
			speed =
				Math.sqrt(
					Math.pow(this.prevX - this.lastX, 2) +
					Math.pow(this.prevY - this.lastY, 2)
				) /
				(this.lastTime - this.prevTime);
		}

		if (speed < this.sensitivity) {
			clearInterval(this.checkSpeedInterval);
			this.isHover = true;
			this.over.call(this.elem, event);
		} else {
			// скорость высокая, запоминаем новые координаты
			this.prevX = this.lastX;
			this.prevY = this.lastY;
			this.prevTime = this.lastTime;
		}
	}

	destroy() {
		this.elem.removeEventListener("mousemove", this.onMouseMove);
		this.elem.removeEventListener("mouseover", this.onMouseOver);
		this.elem.removeEventListener("mouseout", this.onMouseOut);
	}
}
//-------------------------------------------------------------


// _aside-top
const cardsInfo = document.querySelector(".cards-info");
const headerInfoBreadcrumbs = document.querySelector(".header-info__breadcrumbs");
const headerInfoLike = document.querySelector(".header-info__like");
const bodyInfoMain = document.querySelector(".body-info__main");
const cardsInfoBody = document.querySelector(".cards-info__body");
const mainInfoTitle = document.querySelector(".main-info__title");
const bodyInfoAside = document.querySelector(".body-info__aside");
const mainInfoCommonInf = document.querySelector(".main-info__common-inf");
const asideInfoPriceBlock = document.querySelector(".aside-info__price-block");
const priceBlockTitle = document.querySelector(".price-block__title");
const _asideTop = document.querySelector("._aside-top");
const bodyInfoAsideWrap = document.querySelector(".body-info__aside-wrap");


let clonebodyInfoAside;
let cloneMainInfoCommonInf;
let cloneMainInfoTitle;

window.addEventListener('scroll', function () {

	let cardsInfoHeight = cardsInfo.offsetHeight;
	let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

	if (scrollTop > cardsInfoHeight) {

		if (!cloneMainInfoCommonInf && !cloneMainInfoTitle) {

			clonebodyInfoAside = bodyInfoAside.cloneNode(true);
			cloneMainInfoCommonInf = mainInfoCommonInf.cloneNode(true);
			cloneMainInfoTitle = mainInfoTitle.cloneNode(true);

			bodyInfoAside.classList.add("_aside-top");

			priceBlockTitle.insertAdjacentElement('afterbegin', mainInfoCommonInf);
			priceBlockTitle.insertAdjacentElement('afterbegin', mainInfoTitle);
			asideInfoPriceBlock.insertAdjacentElement('beforeend', headerInfoLike);

			bodyInfoAsideWrap.insertAdjacentElement('afterbegin', clonebodyInfoAside);
			bodyInfoMain.insertAdjacentElement('afterbegin', cloneMainInfoCommonInf);
			bodyInfoMain.insertAdjacentElement('afterbegin', cloneMainInfoTitle);
		}
	}
	if ((scrollTop - 150) > cardsInfoHeight) {
		bodyInfoAside.style.transition = "top 0.5s ease 0s";
		bodyInfoAside.classList.add("_active");
	}

	if (scrollTop < cardsInfoHeight) {

		if (cloneMainInfoCommonInf && cloneMainInfoTitle) {
			clonebodyInfoAside.remove();
			bodyInfoAside.classList.remove("_aside-top");

			cloneMainInfoCommonInf.replaceWith(mainInfoCommonInf);
			cloneMainInfoTitle.replaceWith(mainInfoTitle);

			headerInfoBreadcrumbs.after(headerInfoLike);
			bodyInfoAside.style.transition = "unset";

			clonebodyInfoAside = null;
			cloneMainInfoCommonInf = null;
			cloneMainInfoTitle = null;
		}
	}
	if ((scrollTop - 150) < cardsInfoHeight) {
		bodyInfoAside.classList.remove("_active");
	}
});
//-------------------------------------------------------------


const square = document.querySelector(".square");

square.addEventListener('click', function (e) {
	alert(window.innerWidth);
});

alert(1);