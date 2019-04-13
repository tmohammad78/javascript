$(document).ready(function() {
  const $categoryWrapper = $(".categories");
  const $wrapper = $(".food_section-info");
  const $modal = $(".modal");
  // const $wrapper=$('');
  let delinoData,
    cart=[],

    itemsTop = [],
    scrolling = false;
  let number = 1;
  let count = {};
  // const key='2a54ea59-76ad-4f8b-9856-1a7bdbc22c4c';
  //const key = '48ff20a8-c1a4-4843-8826-ae0ba77f4254';
  //a5fa43c3-234d-462a-990a-9ec7ed82159f
  const key = "890d958f-9e64-4211-a2fa-d732c7a3920f"; // https://www.delino.com/restaurant/toasthouse



  const tempCart = sessionStorage.getItem("cart");
  if (tempCart){
     cart = JSON.parse(tempCart) || [];
  }





  $.get(`https://api.delino.com/restaurant/menu/${key}`)
    .done(result => {
      delinoData = result.categories;
      rendercategory(delinoData);
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
        rendercart($(this));
      });
      // const situation =sessionStorage.getItem(key);
      // alert(situation);
      // rendercart().updateUI(situation);
      console.log(itemsTop);
    })
    .fail(xhr => {
      if (xhr.status == 404) {
        alert("not found");
      }
    });
  function rendercategory(data) {
    let html = "";
    if (data) {
      data.sort(function(a, b) {
        return a.index - b.index;
      });
      console.log(data);

      const tpl_catItem = tmpl($("#template-category").html());

      const itemmenue = data.map((item, i) => {
        return tpl_catItem({
          id: item.id,
          title: item.title,
          logo: item.logo ? item.logo + ".png" : ""
        });
      });
      html = itemmenue.join("");
    }
    $categoryWrapper.html(html);
  }
  function renderFood(data) {
    let html =
      '<h1 style="font-size: 20px; text-align: center">' + data.title + "</h1>";
    for (var i = 0; i < data.sub.length; i++) {
      if (data.sub[i].id == 0) {
        const subdata = data.sub[i].food;
        if (subdata) {
          const tpl_catItem1= tmpl($("#template-food").html());
          const itemsBox = subdata.map((item, i) => {
            let image = item.img
              ? '<img  class="food_section-category__img" src="' +
                item.img.replace("#SIZEOFIMAGE#", "280x175") +
                '"/>'
              : "";
              return tpl_catItem1({
                image=
              })
            return `
                   
                `;
          });
          html +=
            ` <div style="border: 1px solid #eee" class="food_section-infobox" id="box-${
              data.id
            }">` +
            itemsBox.join("") +
            `</div>`;
        }
      } else {
        let image = data.sub[i].img
          ? '<img  class="food_section-category__img" src="' +
            data.sub[i].img.replace("#SIZEOFIMAGE#", "280x175") +
            '"/>'
          : "";

        const id = data.sub[i].id;
      const quantity = cart[id] || [];


        html += `
                <div class="food_section-category col-1-of-3" data-food-id="${
                  id
                }">
                    <div class="food_section-img">
                        ${image}    
                    </div>
                    <div class="food_section-description">
                        <div class="food_section-description-index">
                            <h3 class="food_section-description-title">${
                              data.sub[i].title
                            }</h3>
                            <span >${helper.truncate(
                              data.sub[i].priceLabel
                            )}</span>
                        </div>
                    </div>
                    <div class="food_section-last clearfix">
                        <div class="food_section-last-price">
                            ${helper.currancy(data.sub[i].priceLabel || 0)}
                        </div>
                        <div class="food_section-last-cart">
                            <a class="food_section-last-carticon" href=""><span >
                            <sopn id="qty_${id}">${quantity}</span>
                            <i class="fas fa-shopping-cart"></i></span></a>
                        </div>
                    </div>
                </div>
            `;
      }
    }
    $wrapper.append(html);
  }

  function renderPopup(data) {
    console.log(data);
    $id = data.id;
    console.log($id);
    let image = data.img
      ? '<img  class="popup__content-img--inner"" src="' +
        data.img.replace("#SIZEOFIMAGE#", "560x350") +
        '"/>'
      : ""; //560×350

    $modal.addClass("popup").html(`
           <div class="popup__content">
                <div class="popup__content-close">
                    <img class="popup__content-close--icon" src="img/close.svg"  />
                </div>
                <div class="popup__content-img">
                    ${image}
                </div>
                <div class="popup__content-text">
                    <div class="popup__content-title">
                        ${data.title}
                    </div>
                    <div class="popup__content-ingredient">
                        ${data.ingredient}
                    </div>
                    <footer class="footerpopup">
                    <span class="popup__content-price">${helper.currancy(
                      data.price
                    )} </span>
                        <button class="popup__content-addbtn" data-buy="buyfood">
                            <img class="plusbtn" src="img/plus.svg" alt="plus">
                        </button>
                    </footer>
                </div>
                <div class="popup__content-holder">
                    <button class="popup__content-btn" data-modal-button="false" >افزودن به سبد خرید</button>
                </div>
            </div>
           `);
    //for style before click on plus bottom
    let $modaling = $(".popup__content-btn").data("modal-button");
    console.log("test", $modaling);
    if ($modaling === false) {
      $(".popup__content-btn").css({
        background: "#d2d2d2",
        cursor: "default"
      });
      $modaling = $(".popup__content-btn").attr("data-modal-button", "true");
    }
  }

  $modal.on("click", 'button[data-buy="buyfood"]', function(e) {
    e.preventDefault();

    $(".popup__content-addbtn").addClass("countcart").html(`
          <button class="minus_btn" data-cmd="delete" ><i class="fas fa-minus"></i></button>
          <span class="count-span">${number}</span>
          <button class="add_btn" data-cmd="add"><i class="fas fa-plus"></i></button>
          `);

    function check(type) {
      const situation = type === "add" ? (number += 1) : (number -= 1);
      if (type === "add") {
        count[$id] = number;
      } else {
        count[$id] = number;
      }
      console.log(count);
      // updateUI(count);
    }
    function updateUI(...count) {
      //console.log (Object.keys());
      console.log(count);
    }
    $(".add_btn").on("click", function() {
      check("add");
    });
    $(".minus_btn").on("click", function() {
      if (number > 1) {
        check("minus");
      } else if (number == 1) {
        $(".popup__content-btn").attr("data-modal-button", "false");
      }
    });
    // else if(number == 1){
    //   $('.popup__content-addbtn').removeClass('countcart');
    // }

    // rendercart('.popup__content-addbtn',data.id);
    // sessionStorage.setItem(data.id,number);
    $(".popup__content-btn").css({
      background: "linear-gradient(-60deg, #ef4123, #ef2379)",
      cursor: "pointer"
    });
    // for(var i=0; i<number;i++){
    //   console.log(data);
    // }

    // const situation1 =sessionStorage.getItem(data.id);

    // alert(situation1);
  });

  // function rendercart(classname,number){
  //     $(classname).addClass('countcart').html(`
  //     <button class="minus_btn" data-cmd="delete" ><i class="fas fa-minus"></i></button>
  //     <span class="count-span" >${number}</span>
  //     <button class="add_btn" data-cmd="add"><i class="fas fa-plus"></i></button>
  //     `);
  //     function check(type){
  //       const situation= type === 'add' ? number += 1 : number -= 1;
  //       count.push($(this).number);
  //      console.log(count);
  //       updateUI(situation);
  //     }
  //     function updateUI(situation){
  //       $('.count-span').text()==situation;
  //     }
  //   $('.add_btn').on("click",function(){
  //       check('add');
  //   });
  //   $('.minus_btn').on("click",function(){
  //     if(number>1){
  //       check('minus');
  //     }else if(number==1){
  //       $('.popup__content-btn').attr("data-modal-button","false");
  //     }
  //   });
  //   // else if(number == 1){
  //   //   $('.popup__content-addbtn').removeClass('countcart');
  //   // }
  // }
  //popup
  $categoryWrapper.on("click", "a", function(e) {
    e.preventDefault();
    //e.stopPropagation()''

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
          scrollTop: itemsTop[itemTopIndex] - 100
        },
        600
      );
    setTimeout(() => {
      scrolling = false;
    }, 600);

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
  });
  $modal.on("click", ".popup__content-close", function() {
    $(".modal").removeClass("popup");
  });
  $wrapper.on("click", "img", function() {
    const itemData = $(this)
      .closest(".food_section-category")
      .data("food");
    renderPopup(itemData);
  });
  //scrollwatcher
  $(window).scroll(function() {
    if (!scrolling) {
      var scrollposition = $(window).scrollTop();
      //console.log(scrollposition);
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
