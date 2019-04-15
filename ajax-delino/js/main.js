$(document).ready(function() {
  const $categoryWrapper = $(".categories");
  const $wrapper = $(".food_section-info");
  const $modal = $(".modal");
  let delinoData,
    cart = [],
    itemsTop = [],
    scrolling = false;
  let objectCart = {};
  // const key='2a54ea59-76ad-4f8b-9856-1a7bdbc22c4c';
  //const key = '48ff20a8-c1a4-4843-8826-ae0ba77f4254';
  //a5fa43c3-234d-462a-990a-9ec7ed82159f
  const key = "890d958f-9e64-4211-a2fa-d732c7a3920f"; // https://www.delino.com/restaurant/toasthouse
  const tempCart = sessionStorage.getItem("cart");
  console.log(tempCart);
console.log(cart);
  $.get(`https://api.delino.com/restaurant/menu/${key}`)
    .done(result => {
      delinoData = result.categories;
      renderCategory(delinoData);
      console.log(delinoData);
      for (var i = 0; i < delinoData.length; i++) {
        renderFood(delinoData[i]);
      }
      $wrapper.find("h1").each((i, h1) => {
        const top = $(h1).offset().top;
        itemsTop.push(parseInt(top));
      });
      $('button[data-buy="buyfood"]').on("click", function() {
        $(this)
          .closest(".food_section-last-cart")
          .css({
            padding: "0"
          });
        renderCart($(this));
      });
      console.log(itemsTop);
    })
    .fail(xhr => {
      if (xhr.status == 404) {
        alert("not found");
      }
    });
  //start rendering category
  function renderCategory(data) {
    let html = "";
    if (data) {
      data.sort(function(a, b) {
        return a.index - b.index;
      });
      console.log(data);
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
  //End rendering category

  // start rendering food card
  function renderFood(data) {
    let html =
      '<h1 style="font-size: 20px; text-align: center">' + data.title + "</h1>";
    for (var i = 0; i < data.sub.length; i++) {
      if (data.sub[i].id == 0) {
        let id = data.sub[i].id;
        console.log(data.sub[i].id);
        const subData = data.sub[i].food;
        if (subData) {
          // updateView(id);
          const tpl_Food = tmpl($("#template-food").html());
          const itemsBox = subData.map((item, i) => {
            // const quantity = cart[item.id] || 0;
            const image = item.img
              ? '<img  class="food_section-category__img" src="' +
                item.img.replace("#SIZEOFIMAGE#", "280x175") +
                '"/>'
              : "";
            return tpl_Food({
              items: JSON.stringify(item),
              image: image,
              title: item.title,
              ingredient: helper.truncate(item.ingredient),
              price: helper.currancy(item.price),
              quantity: cart[id] || ''
            });
          });
          html +=
            ` <div style="border: 1px solid #eee" class="food_section-infobox" id="box-${
              data.id
            }">` +
            itemsBox.join("") +
            `</div>`;
        }
      } else {
        const tpl_foodElse = tmpl($("#template-foodElse").html());
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
          quantity: 0 //quantity
        });
        html += itemFood;
      }
    }
    $wrapper.append(html);
  }
  //End rendering food card

  //start rendering popup
function renderPopup(data) {
  console.log(data);
  let id = data.id;
  console.log(id);
  let image = data.img
    ? '<img  class="imageFood"" src="' +
      data.img.replace("#SIZEOFIMAGE#", "560x350") +
      '"/>'
    : ""; //560×350
  const tpl_popup = tmpl($("#template-popup").html());
  //Add to html
  const itempopup = tpl_popup({
    id: id,
    image: image,
    title: data.title,
    ingredient: data.ingredient,
    currancy: helper.currancy(data.price),
    quantity: cart[id] || 0
  });
  $modal.addClass("popup").html(itempopup);
}
  //End render popup

$modal.on("click", ".quantity-holder button", e => {
  e.preventDefault();
  const $btn = $(e.target).closest("button");
  const $holder = $btn.parent()
  const id = $btn.closest(".popup__content").data("food-id");
  let qty = id ? cart[parseInt(id)] || 0 :  0;
  //debugger
  switch ($btn.data("cmd")) {
    case "increase":
      qty++;
      $holder.addClass("selected") ;
      break;
    case "decrease":
      qty--;
      if (qty<1){
        console.log(true);
        $(".popup__content").removeClass("selected");
        $holder.removeClass("selected") ;
      }
      break;
  }
  cart[id] = qty;
  $holder.find(".quantity").text(qty);
});
  
//its for show count by click btn in card
$wrapper.on("click", ".quantity-holder button", e => {
  e.preventDefault();
  const $btn = $(e.target).closest("button");
  const $holder = $btn.parent();
  const id =$btn.closest(".food_section-category").data("food").id;
  const title =$btn.closest(".food_section-category").data("food").title;
  const price =$btn.closest(".food_section-category").data("food").price;
  let qty = id ? cart[parseInt(id)] || 0 :  0;
  switch ($btn.data("cmd")) {
    case "increase":
      qty++;
      $holder.addClass("selected") ;
      break;
    case "decrease":
      qty--;
      if (qty<1){
        console.log(true);
        $(".popup__content").removeClass("selected");
        $holder.removeClass("selected") ;
      }
      break;
  }
  cart[id] = qty;
  $holder.find(".quantity").text(qty);
  $('.orderNumbers').text(qty);
  $('.foodName').text(title);
  $('.fullPrice').text(calcuteCost(price,qty));
});
function calcuteCost(price,count){
  const newPrice=price*count;
  return newPrice;
}



  // //Add count of food by clicking on btn-plus
  // $modal.on("click", ".btn-plus", function() {
  //   const id = $(this)
  //     .closest(".popup__content")
  //     .data("data-food-id");
  //   calcute("add", id);
  // });

  // //Minus count of food by clicking on btn-minus
  // $modal.on("click", ".btn-minus", function() {
  //   calcute("minus", id);
  // });

  // //calcute for add or minus count of foood
  // function calcute(type, id) {
  //   const operation = type === "add" ? (number += 1) : (number -= 1);
  //   objectCart[id] = number;
  //   sessionStorage.setItem("cart", JSON.stringify(objectCart));
  //   // console.log();
  // }

  //popup
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
    $(".modal").removeClass("popup");
  });

  //show popup after click on img in it
  $wrapper.on("click", "img", function() {
    const itemData = $(this).closest(".food_section-category").data("food");
    renderPopup(itemData);
  });

  //for add class after click add btn
  $modal.on("click", ".btn-plus", function() {
    $(this)
      .closest(".popup__content")
      .addClass("selected");
  });

  //scrollwatcher
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
      console.log(activeBox.id);
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




// const $box = $(
//   "#box-" +
//     $(this)
//       .closest("div")
//       .data("cat-id")
// );
// $(this)
//   .closest("div")
//   .addClass("active-box");
// $(this)
//   .closest("div")
//   .siblings()
//   .removeClass("active-box");
// if ($box.length) {
//   $("body")
//     .stop()
//     .animate(
//       {
//         scrollTop: $box.offset().top - 100
//       },
//       600
//     );
// }
