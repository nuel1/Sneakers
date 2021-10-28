// Project design source: Frontendmentor.io

(function () {
  "use strict";

  const main_page = document.querySelector(".content-wrapper");
  const icon_cart = document.querySelector(".cart");
  const btn_addtocart = document.querySelector(".btn--add-to-cart");
  const btn_add = document.querySelector(".add--product-count");
  const btn_minus = document.querySelector(".sub--product-count");
  const item_counter = document.querySelector(".product-counter span");
  const icon_cart_itemcount = document.querySelector("#item-count");
  const notification_box = document.querySelector(".notification-box");
  const span_numofitem = document.querySelector(".product-no span");
  const span_total = document.querySelector(".product-accumulated-price span");
  const trash_icon = document.querySelector(".trash-icon-wrapper");
  const notification_product_info = document.querySelector(
    ".notification-info-box"
  );
  const notification_empty_box = document.querySelector(
    ".notification-empty--js"
  );

  // contruct storage for user cart data
  const data = [{}];

  // Get data user cart info from browser local storage
  self.onload = function () {
    if (localStorage.getItem("data")) {
      JSON.parse(localStorage.getItem("data"), (key, value) => {
        if (value) {
          switch (key) {
            case "no.Item":
              span_numofitem.textContent = `${value}`;
              item_counter.textContent = `${value}`;
              icon_cart_itemcount.textContent = `${value}`;
            case "price":
              span_total.textContent = `$${value}`;
          }
        }
      });
    }
    !icon_cart_itemcount.textContent
      ? icon_cart_itemcount.classList.replace("reveal", "hidden")
      : icon_cart_itemcount.classList.replace("hidden", "reveal");
  };

  // Add item
  function addItem(n) {
    return Number.parseInt(n, 10) + 1;
  }
  // Substract item
  function minusItem(n) {
    let item_count = Number.parseInt(n, 10);
    if (item_count > 0) item_count -= 1;
    return item_count;
  }

  // Get accumulated price
  function totalAmt(itemCount) {
    const productInitialCost = 125;
    const total = Number(itemCount) * productInitialCost;
    return total;
  }

  // Number of items
  const noOfItem = () => item_counter.textContent;

  // Add user items to cart
  function addToCart() {
    if (Number.parseInt(noOfItem(), 10) > 0) {
      const items = noOfItem();
      const total = totalAmt(items);
      span_numofitem.textContent = `${items}`;
      span_total.textContent = `$${total}`;
      icon_cart_itemcount.textContent = `${items}`;
      icon_cart_itemcount.classList.replace("hidden", "reveal");

      data[0]["no.Item"] = items;
      data[0]["price"] = total;
      localStorage.setItem("data", JSON.stringify(data));
    } else {
      alert("Cannot add to cart because your product is zero");
    }
  }

  // Clear cart and user cart info in browswer local storage
  function removeCartItem() {
    icon_cart_itemcount.textContent = "";
    icon_cart_itemcount.classList.replace("reveal", "hidden");

    span_total.textContent = "";

    notification_product_info.classList.replace("flx", "hidden");
    notification_empty_box.classList.replace("hidden", "flx");

    data[0]["no.Item"] = 0;
    data[0]["price"] = 0;
    localStorage.setItem("data", JSON.stringify(data));
  }

  function revealCart(e) {
    if (icon_cart_itemcount.textContent) {
      notification_product_info.classList.add("flx");
      notification_empty_box.classList.replace("flx", "hidden");
    }
    if (notification_box.classList.contains("reveal")) {
      notification_box.classList.remove("reveal");
    } else {
      notification_box.classList.add("reveal");
    }
    e.stopPropagation();
  }

  icon_cart.addEventListener("click", function (e) {
    revealCart(e);
  });

  btn_addtocart.addEventListener("click", addToCart);

  trash_icon.addEventListener("click", removeCartItem);

  btn_add.addEventListener("click", () => {
    const value = item_counter.textContent;
    item_counter.textContent = `${addItem(value)}`;
  });

  btn_minus.addEventListener("click", () => {
    const value = item_counter.textContent;
    item_counter.textContent = `${minusItem(value)}`;
  });

  document.querySelector(".cart-box").addEventListener("click", (e) => {
    e.stopPropagation();
    notification_box.classList.add("reveal");
  });

  main_page.addEventListener("click", () => {
    notification_box.classList.remove("reveal");
  });
})();

(function () {
  "use strict";

  const nav_ul = document.querySelector(".navigator-list-d");
  const modelOpener = document.querySelector(".product-d ul");
  const modelCloser = document.querySelector(".close-icon-wrapper");
  const d_navLinks = document.querySelectorAll(".navigator-list-d a");
  const mainPageTab_ul = document.querySelector(".page-tab-list");
  const modelTab_ul = document.querySelector(".onview--js");
  const modelWrapper = document.querySelector(".model");
  const mainPage = document.querySelector("main");
  const nav_mobile = document.querySelector(".nav--mobile");
  const icon_close_nav_mobile = document.querySelector(".nav--icon-close-box");
  const icon_open_nav_mobile = document.querySelector(".nav-toggler-icon");
  const model_sliderItems = document.querySelectorAll(".d li");
  const mobile_slideItems = document.querySelectorAll(".m li");
  const model_tabs = document.querySelectorAll(".onview--js li");
  const productPage_tabs = document.querySelectorAll(".page-tab-list li");
  const mobile_nav_wrapper = document.querySelector(".nav-wrapper-m");
  const btn_right__mobile = document.querySelector(".m .slider--icon-right");
  const btn_left__mobile = document.querySelector(".m .slider--icon-left");
  const btn_right__model = document.querySelector(".d .slider--icon-right");
  const btn_left__model = document.querySelector(".d .slider--icon-left");
  const productPage_img_boxes = document.querySelectorAll(
    ".product-d .product-container li"
  );

  // Navbar tab
  function navTab(e) {
    e.preventDefault();
    const targetIdentifier = document.querySelector(".navigator-list-d span");
    const currTarget = e.target;
    const [prevTarget] = [...d_navLinks].filter(
      (a) => a.className === "m-page"
    );
    const links = [...d_navLinks];
    if (currTarget !== prevTarget) {
      if (links.indexOf(prevTarget) > links.indexOf(currTarget)) {
        const prevTargetDistance = 90 * links.indexOf(prevTarget);
        const currTargetDistance =
          prevTargetDistance -
          (links.indexOf(prevTarget) - links.indexOf(currTarget)) * 90;
        targetIdentifier.style.transform = `translateX(${currTargetDistance}px)`;
      }

      if (links.indexOf(prevTarget) < links.indexOf(currTarget)) {
        const currTargetDistance = links.indexOf(currTarget) * 90;
        targetIdentifier.style.transform = `translateX(${currTargetDistance}px)`;
      }

      currTarget.className = "m-page";
      prevTarget.className = "";
    }
  }

  function showmobileNav() {
    nav_mobile.classList.replace("hidden", "reveal");
    mobile_nav_wrapper.classList.add("slide-in");
  }

  function hideMobileNav() {
    nav_mobile.classList.replace("reveal", "hidden");
    mobile_nav_wrapper.classList.remove("slide-in");
  }

  function nextSlide(slider_container) {
    const slider_item = [
      ...document.querySelectorAll(`.${slider_container} li`),
    ];
    const containerLen = slider_item.length - 1;
    let currSlideIndex;
    slider_item.forEach((li) => {
      if (li.classList.contains("inview")) {
        currSlideIndex = slider_item.indexOf(li);
      }
    });

    if (currSlideIndex + 1 > containerLen) {
      let nextSlide = 0;
      slider_item[nextSlide].style.transform = "translateX(100%)";
      slider_item[nextSlide].style.display = "block";
      slider_item[nextSlide].className = "inview";
      slider_item[currSlideIndex].className = "";
      setTimeout(() => {
        slider_item[currSlideIndex].style.transform = "translateX(-100%)";
        slider_item[nextSlide].style.transform = "translateX(0%)";
      }, 0);
      setTimeout(() => {
        slider_item[currSlideIndex].style.display = "none";
      }, 300);
    } else {
      let nextSlide = currSlideIndex + 1;
      slider_item[nextSlide].style.transform = "translateX(100%)";
      slider_item[nextSlide].style.display = "block";
      slider_item[nextSlide].className = "inview";
      slider_item[currSlideIndex].className = "";
      setTimeout(() => {
        slider_item[currSlideIndex].style.transform = "translateX(-100%)";
        slider_item[nextSlide].style.transform = "translateX(0%)";
      }, 10);

      setTimeout(() => {
        slider_item[currSlideIndex].style.display = "none";
      }, 300);
    }

    sliderTab(model_tabs, getViewedImg(model_sliderItems));
  }

  function prevSlide(slider_container) {
    const slider_item = [
      ...document.querySelectorAll(`.${slider_container} li`),
    ];
    const containerLen = slider_item.length - 1;
    let currSlideIndex;
    slider_item.forEach((li) => {
      if (li.classList.contains("inview")) {
        currSlideIndex = slider_item.indexOf(li);
      }
    });

    if (currSlideIndex - 1 < 0) {
      let nextSlide = containerLen;
      slider_item[nextSlide].style.transform = "translateX(-100%)";
      slider_item[nextSlide].style.display = "block";
      slider_item[nextSlide].className = "inview";
      slider_item[currSlideIndex].className = "";

      setTimeout(() => {
        slider_item[currSlideIndex].style.transform = "translateX(100%)";
        slider_item[nextSlide].style.transform = "translateX(0%)";
      }, 0);

      setTimeout(() => {
        slider_item[currSlideIndex].style.display = "none";
      }, 300);
    } else {
      let nextSlide = currSlideIndex - 1;
      slider_item[nextSlide].style.transform = "translateX(-100%)";
      slider_item[nextSlide].style.display = "block";
      slider_item[nextSlide].className = "inview";
      slider_item[currSlideIndex].className = "";

      setTimeout(() => {
        slider_item[currSlideIndex].style.transform = "translateX(100%)";
        slider_item[nextSlide].style.transform = "translateX(0%)";
      }, 10);

      setTimeout(() => {
        slider_item[currSlideIndex].style.display = "none";
      }, 300);
    }
    sliderTab(model_tabs, getViewedImg(model_sliderItems));
  }

  const model = {
    openModel: () => {
      modelWrapper.style.display = "block";
    },
    closeModel: () => {
      modelWrapper.style.display = "none";
    },
  };

  function sliderTab(items, curr) {
    const tabs = items;
    tabs.forEach((li) => (li.className = ""));
    tabs[curr].className = "tab-inview";
  }

  function modelTab(e) {
    e.preventDefault();
    if (e.target.nodeName === "A") {
      const targetIndex = [
        ...document.querySelectorAll(".onview--js a"),
      ].indexOf(e.target);
      tab_change(model_tabs, targetIndex);
      slider_change(model_sliderItems, targetIndex);
    }
  }

  function productPageTab(e) {
    e.preventDefault();
    if (e.target.nodeName === "A") {
      const targetIndex = [
        ...document.querySelectorAll(".page-tab-list a"),
      ].indexOf(e.target);
      tab_change(productPage_tabs, targetIndex);
      productPageImg_change(targetIndex);
    }
  }
  // Changes image in-view depending on the current view state of the user

  function slider_change(items, curr) {
    const slider_items = [...items];
    slider_items.forEach((li) => (li.className = ""));
    slider_items[curr].className = "inview";
    for (let i = 0; i < slider_items.length; i++) {
      if (slider_items[i].className === "") {
        slider_items[i].style.display = "none";
      } else {
        slider_items[i].style.transform = "translateX(0)";
        slider_items[i].style.display = "block";
      }
    }
  }

  function tab_change(items, curr) {
    const tabs = items;
    tabs.forEach((li) => (li.className = ""));
    tabs[curr].className = "tab-inview";
    return curr;
  }

  function productPageImg_change(curr) {
    const img_boxes = document.querySelectorAll(
      ".product-d .product-container li"
    );
    img_boxes.forEach((li) => (li.className = ""));
    img_boxes[curr].className = "product-inview";
    return curr;
  }

  const getViewedImg = (items) => {
    const wrapper = [...items];
    const [imgInView] = wrapper.filter(
      (li) => li.className === "inview" || li.className === "product-inview"
    );
    return wrapper.indexOf(imgInView);
  };

  const getViewedTab = (items) => {
    const wrapper = [...items];
    const [imgInView] = wrapper.filter((li) => li.className === "tab-inview");
    return wrapper.indexOf(imgInView);
  };

  nav_ul.addEventListener("click", navTab);
  modelTab_ul.addEventListener("click", modelTab);
  icon_open_nav_mobile.addEventListener("click", showmobileNav);
  icon_close_nav_mobile.addEventListener("click", hideMobileNav);

  modelOpener.addEventListener("click", () => {
    const indexOfViewdImg = getViewedImg(productPage_img_boxes);
    const indexOfViewdTab = getViewedTab(productPage_tabs);
    slider_change(model_sliderItems, indexOfViewdImg);
    slider_change(mobile_slideItems, indexOfViewdImg);
    tab_change(model_tabs, indexOfViewdTab);
    model.openModel();
  });

  modelCloser.addEventListener("click", () => {
    const indexOfViewdImg = getViewedImg(model_sliderItems);
    const indexOfViewdTab = getViewedTab(model_tabs);
    slider_change(mobile_slideItems, indexOfViewdImg);
    productPageImg_change(indexOfViewdImg);
    tab_change(productPage_tabs, indexOfViewdTab);
    model.closeModel();
  });

  mainPageTab_ul.addEventListener("click", function (e) {
    productPageTab(e);
    const indexOfViewdImg = getViewedImg(productPage_img_boxes);
    slider_change(mobile_slideItems, indexOfViewdImg);
  });

  btn_right__model.addEventListener("click", function () {
    nextSlide("model ul.slider-item");
    const indexOfViewdImg = getViewedImg(model_sliderItems);
    slider_change(mobile_slideItems, indexOfViewdImg);
  });

  btn_right__mobile.addEventListener("click", function () {
    nextSlide("m ul.slider-item");
    const indexOfViewdImg = getViewedImg(mobile_slideItems);
    tab_change(productPage_tabs, productPageImg_change(indexOfViewdImg));
    slider_change(model_sliderItems, indexOfViewdImg);
  });

  btn_left__model.addEventListener("click", function () {
    prevSlide("model ul.slider-item");
    const indexOfViewdImg = getViewedImg(model_sliderItems);
    slider_change(mobile_slideItems, indexOfViewdImg);
  });

  btn_left__mobile.addEventListener("click", function () {
    prevSlide("m ul.slider-item");
    const indexOfViewdImg = getViewedImg(mobile_slideItems);
    tab_change(productPage_tabs, productPageImg_change(indexOfViewdImg));
    slider_change(model_sliderItems, indexOfViewdImg);
  });
})();
