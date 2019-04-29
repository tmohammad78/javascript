$(document).ready(function() {
  const $categoryWrapper = $(".categories");
  const $wrapper = $(".food_section-info");
  const $modal = $(".modal");
  const $shop=$('.shop');
  const $test=$('.food_section-infobox');
  const $finalModal= $(".finalModal");
  

  let delinoData,
    CART_NAME = "cart",
    cart = {},
    itemsTop = [],
    scrolling = false;
  // const key='2a54ea59-76ad-4f8b-9856-1a7bdbc22c4c';
  //const key = '48ff20a8-c1a4-4843-8826-ae0ba77f4254';
  //a5fa43c3-234d-462a-990a-9ec7ed82159f
  const key = "890d958f-9e64-4211-a2fa-d732c7a3920f"; // https://www.delino.com/restaurant/toasthouse
  const tempCart = sessionStorage.getItem(CART_NAME);
  if (tempCart) {
    let cart_arr = tempCart.split("-");
    cart_arr.forEach(node => {
      let item = node.split(":");
      const quantity = parseInt(item[1]);
      if (quantity > 0) {
        cart[item[0]] = quantity;
      }
    });
  }

  $.get(`https://api.delino.com/restaurant/menu/${key}`)
    .done(result => {
      delinoData = result.categories;
      renderCategory(true);
      renderFoodList(true); // true: first init
      //$(window).trigger("resize")
      onResize();
    })
    .fail(xhr => {
      if (xhr.status == 404) {
        alert("not found");
      }
    });

  function renderCategory() {
    console.log($(".parent").data("show-category"));
    let html = "",
      data = delinoData;
    if (data) {
      data.sort(function(a, b) {
        return a.index - b.index;
      });
      const tpl_catItem = tmpl($("#template-category").html());

      const itemMenue = data.map((item, i) => {
        return tpl_catItem({
          id: item.id,
          title: item.title,
          logo: item.logo ? item.logo + ".png" : ""
        });
      });
      html = itemMenue.join("");
    }
    $categoryWrapper.html(html);
  }

  function renderFoodList(first = false) {
    if (!first) {
      $wrapper.html("");
    }
    for (var catIndex = 0; catIndex < delinoData.length; catIndex++) {
      const data = delinoData[catIndex];
      let html =
        '<h1 style="font-size: 20px; text-align: center">' +
        data.title +
        "</h1>";
      const tpl_Food = tmpl($("#template-food").html());
      const tpl_foodElse = tmpl($("#template-foodElse").html());
      for (var i = 0; i < data.sub.length; i++) {
        if (data.sub[i].id == 0) {
          const subData = data.sub[i].food;
          if (subData) {
            const itemsBox = [];
            subData.forEach((item, i) => {
              const image = item.img
                ? '<img  class="food_section-category__img" src="' +
                  item.img.replace("#SIZEOFIMAGE#", "280x175") +
                  '"/>'
                : "";
              if (first) {
                item.visible = true;
              }
              // console.log(item.title,  item.visible)
              itemsBox.push(
                tpl_Food({
                  id: item.id,
                  //items: JSON.stringify(item),
                  image,
                  title: item.title,
                  ingredient: helper.truncate(item.ingredient),
                  price: helper.currancy(item.price),
                  quantity: cart[item.id] || "",
                  visible: item.visible
                })
              );
            });

            html +=
              ` <div style="border: 1px solid #eee" class="food_section-infobox" id="box-${
                data.id
              }">` +
              itemsBox.join("") +
              `</div>`;
          }
        } else {
          return;
          let image = data.sub[i].img
            ? '<img  class="food_section-category__img" src="' +
              data.sub[i].img.replace("#SIZEOFIMAGE#", "280x175") +
              '"/>'
            : "";
          const id = data.sub[i].id;
          const quantity = "";
          const itemFood = tpl_foodElse({
            id: id,
            image: image,
            title: data.sub[i].title,
            priceLabel: helper.truncate(data.sub[i].priceLabel),
            currancy: helper.currancy(data.sub[i].priceLabel || 0),
            quantity: 0, //quantity
            visible: false
          });
          html += itemFood;
        }
        $wrapper.append(html);
      }
    }

    updateCart();
  }

  function renderPopup(id) {
    let title = getFood(id).title;
    let ingredient = getFood(id).ingredient;
    let price = getFood(id).price;
    let image = getFood(id).img
      ? '<img  class="imageFood"" src="' +
        getFood(id).img.replace("#SIZEOFIMAGE#", "560x350") +
        '"/>'
      : ""; //560×350
    const tpl_popup = tmpl($("#template-popup").html());
    //Add to html
    const itempopup = tpl_popup({
      id,
      image,
      title,
      ingredient,
      currancy: helper.currancy(price),
      quantity: cart[id] || 0
    });
    $modal.addClass("popup").html(itempopup);
    if (cart[id] > 0) {
      $(".popup__content").addClass("selected");
    }
  }

  function renderModal(){
    const tpl_modal= tmpl($("#template-modal").html());

    $finalModal.addClass("popup").html(tpl_modal);
  }

  $modal.on("click", ".quantity-holder button", updateCart);
  $wrapper.on("click", ".quantity-holder button", updateCart);
  $shop.on("click", ".quantity-holder button", updateCart);
  $shop.on("click",".finalOrder",function(){
    renderModal();
  });

  function updateCart(e) {
    if (e) {
      e.preventDefault();
      const $btn = $(e.target).closest("button");
      const $holder = $btn.parent();
      const data = $btn.data("cmd");
      const id = $btn.closest(".food-box-holder").data("food-id");

      let qty = id ? cart[parseInt(id)] || 0 : 0;
      switch (data) {
        case "increase":
          qty++;
          $holder.addClass("selected");
          break;
        case "decrease":
          qty--;
          if (qty < 1) {
            $(".popup__content").removeClass("selected");
            $holder.removeClass("selected");
          }
          break;
      }
      cart[id] = qty;

      $('.food-box-holder[data-food-id="' + id + '"]')
        .find(".quantity")
        .text(qty);
    }
    const foodList = [];
    const cart_arr = [];
    let totalPrice = 0,
      totalItems = 0;
    for (let [key, quantity] of Object.entries(cart)) {
      const food = getFood(key);
      if (quantity !== 0) {
        foodList.push({
          id: key,
          title: food.title, // food.title
          price: helper.currancy(food.price), // food.price
          quantity
        });
        cart_arr.push(key + ":" + quantity);
        totalPrice += food.price * quantity;
        totalItems += quantity;
      }
    }
    const tpl_Cart = tmpl($("#template-Cart").html());
    $("#cart2").html(
      tpl_Cart({ foodList, totalPrice: helper.currancy(totalPrice) })
    );
    if (!totalItems) {
      $(".totalPrice").remove();
      $(".finalOrder").remove();
      $(".cart-bottom").html(
        `<div><img class="img-free-cart"  src="./img/shopping-cart.svg" alt="cart"><div style="text-align:center" > سبد شما خالی است</div></div>`
      );
    }
    $("#cart-count").text(totalItems || "");

    sessionStorage.setItem(CART_NAME, cart_arr.join("-"));
  }

  $(".btn-showCount").on("click", function() {
    setTimeout(() => {
      $("#cart2").addClass("active-shop");
    }, 50);
    updateCart();
  });

  function getFood(id) {
    let food = null;
    for (var i = 0; i < delinoData.length; i++) {
      for (var j = 0; j < delinoData[i].sub.length; j++) {
        if (delinoData[i].sub[j].id == 0) {
          const subData = delinoData[i].sub[j].food;
          if (subData) {
            for (var z = 0; z < subData.length; z++) {
              if (subData[z].id == id) {
                food = subData[z];
                break;
              }
            }
          }
        } else {
          // loop
        }
        if (food) {
          break;
        }
      }
      if (food) {
        break;
      }
    }

    return food;
  }

  $categoryWrapper.on("click", "a", function(e) {
    e.preventDefault();
    //e.stopPropagation() baes mishe ke event ma edame peida nakone va avalin sath ro begire
    scrolling = true;
    const catId = $(this)
      .parent()
      .data("cat-id");
    actievCategory(catId);
    let itemTopIndex = 0;
    for (var i = 0; i < delinoData.length; i++) {
      if (delinoData[i].id == catId) {
        itemTopIndex = i;
        break;
      }
    }
    $("body")
      .stop()
      .animate(
        {
          scrollTop: itemsTop[itemTopIndex] - 90
        },
        600
      );
    setTimeout(() => {
      scrolling = false;
    }, 600);
  });

  //close popuo
  $modal.on("click", ".anc-close", function() {
    $(".modal").removeClass("popup").hide();
  });

  //show popup after click on img in it
  $wrapper.on("click", "img", function() {
    const itemData = $(this)
      .closest(".food_section-category")
      .data("food-id");
      $(".modal").removeClass("popup").show();

    renderPopup(itemData);
  });

  //for add class after click add btn
  $modal.on("click", ".btn-plus", function() {
    $(this)
      .closest(".popup__content")
      .addClass("selected");
  });

  $(".shop").on("click", "[data-close-modal]", function() {
    $("#cart2").addClass("close-animation");

    setTimeout(() => {
      $("#cart2").removeClass("close-animation active-shop");
    }, 300);
  });

  //scrollwatcher
  $(window).on("resize", onResize);

  function onResize() {
    itemsTop = [];
    $wrapper.find("h1").each((i, h1) => {
      const top = $(h1).offset().top;
      itemsTop.push(parseInt(top));
    });
  }

  const $searchInput = $('input[name="search-input"]').on("keyup", e => {
    const text = $searchInput.val();

    if (text) {
      $(".parent").hide();
      $(".food_section-infobox").css("color","red");
      $(window).scrollTop(0);
    } else {
      $(".parent").show();
    }

    // $(".parent")[text ? "hide" : "show"]();
    //  make food visible
    for (var i = 0; i < delinoData.length; i++) {
      for (var j = 0; j < delinoData[i].sub.length; j++) {
        if (delinoData[i].sub[j].id == 0) {
          const subData = delinoData[i].sub[j].food;
          if (subData) {
            for (var z = 0; z < subData.length; z++) {
              if (text) {
                if (
                  subData[z].title.indexOf(text) > -1 ||
                  subData[z].ingredient.indexOf(text) > -1
                ) {
                  subData[z].visible = true;
                  // console.log(subData[z].title);
                } else {
                  subData[z].visible = false;
                }
              } else {
                subData[z].visible = true;
              }
            }
          }
        } else {
          // loop
        }
      }
    }
    renderFoodList();
  });

  $(window).scroll(function() {
    if (!scrolling) {
      var scrollposition = $(window).scrollTop();
      let activeBoxIndex = 0;
      for (var i = 0; i < itemsTop.length; i++) {
        if (scrollposition < itemsTop[i]) {
          activeBoxIndex = i;
          break;
        }
      }
      const activeBox = delinoData[activeBoxIndex];
      // console.log(activeBox.id);
      actievCategory(activeBox.id);
    }
  });

  function actievCategory(id) {
    $(".categories")
      .find('div[data-cat-id="' + id + '"]')
      .addClass("active-box")
      .siblings()
      .removeClass("active-box");
  }
});
