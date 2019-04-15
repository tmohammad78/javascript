$(document).ready(function() {
  const $categoryWrapper = $(".categories");
  const $wrapper = $(".food_section-info");
  const $modal = $(".modal");
  let delinoData,
    cart=[],
    itemsTop = [],
    scrolling = false;
  let number = 0;
  //let cart = {};
  // const key='2a54ea59-76ad-4f8b-9856-1a7bdbc22c4c';
  //const key = '48ff20a8-c1a4-4843-8826-ae0ba77f4254';
  //a5fa43c3-234d-462a-990a-9ec7ed82159f
  const key = "890d958f-9e64-4211-a2fa-d732c7a3920f"; // https://www.delino.com/restaurant/toasthouse
  const tempCart = sessionStorage.getItem("cart");
  console.log(tempCart);

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
        $(this).closest(".food_section-last-cart").css({
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
function renderFood(data){
    let html = '<h1 style="font-size: 20px; text-align: center">' + data.title + "</h1>";
    for (var i = 0; i < data.sub.length; i++) {
      if (data.sub[i].id == 0) {
        //const id = data.sub[i].id;
        const subData = data.sub[i].food;
        if (subData) {
          // updateView(id);
          const tpl_Food= tmpl($("#template-food").html());
          const itemsBox = subData.map((item, i) => {
            const quantity = cart[item.id] || 0;
            const image = item.img ? '<img  class="food_section-category__img" src="' + item.img.replace("#SIZEOFIMAGE#", "280x175") + '"/>': "";
            return tpl_Food({
              items:JSON.stringify(item),
              image:image,
              title:item.title,
              truncate:helper.truncate(item.ingredient),
              curancy:helper.currancy(item.price),
              quantity:quantity
            })
          });
          html +=` <div style="border: 1px solid #eee" class="food_section-infobox" id="box-${data.id }">` + itemsBox.join("") + `</div>`;
        }
      }else{
        const tpl_foodElse= tmpl($("#template-foodElse").html());
        let image = data.sub[i].img ? '<img  class="food_section-category__img" src="' + data.sub[i].img.replace("#SIZEOFIMAGE#", "280x175") + '"/>' : "";
        const id = data.sub[i].id;
        const quantity = '';
        const itemFood=tpl_foodElse({
          id:id,
          image:image,
          title:data.sub[i].title,
          priceLabel:helper.truncate(data.sub[i].priceLabel),
          currancy:helper.currancy(data.sub[i].priceLabel || 0),
          quantity:  0//quantity
        })
        html +=itemFood;
      }
    }
    $wrapper.append(html);
}
//End rendering food card

//start rendering popup
function renderPopup(data) {
    console.log(data);
    id = data.id;
    console.log(id);
    let image = data.img ? '<img  class="popup__content-img--inner"" src="' + data.img.replace("#SIZEOFIMAGE#", "560x350") + '"/>': ""; //560×350
    const tpl_popup= tmpl($("#template-popup").html());
    //updateView(id);
    //Add to html
    const itempopup=tpl_popup({
      id: id,
      image:image,
      title:data.title,
      ingredient:data.ingredient,
      currancy:helper.currancy(data.price),
      quantity: cart[id] || 0
    })
    $modal.addClass("popup").html(itempopup);
    // let $modaling = $(".popup__content-btn").data("modal-button");
    // console.log("test", $modaling);
    // if ($modaling === false) {
    //   $(".popup__content-btn").css({
    //     background: "#d2d2d2",
    //     cursor: "default"
    //   });
    //   $modaling = $(".popup__content-btn").attr("data-modal-button", "true");
    // }
    $modal.on("click",'div[data-buy="buyfood"]',function(e){
      e.preventDefault();
      const tpl_countFood= tmpl($("#template-countFood").html());
        const counting=tpl_countFood({
          ////update
          number:number
        });
       $(".popup__content-addbtn").addClass("countcart").html(counting);

    });
}
//End render popup
// function updateView(id){
//   if (tempCart){
//      cart = JSON.parse(tempCart) || [];
//      console.log(cart);
//       if(cart[id]){
//         number=cart[id];
//       }else{
//           number=0;
//       }
//   }
// }

$modal.on("click",".cart-action", function() {
  const $id=$(this).closest('.popup__content').data("popup");  
  calcute("add",$id);
});
$modal.on("click",".minus_btn",function(){
  calcute("minus",$id);
});

function calcute(type,id){



  const operation=type === "add" ? number+=1:number-=1 ;
  cart[id]=number; 

  sessionStorage.setItem("cart",JSON.stringify(cart));
  // console.log();
}

function storeCart(){

}






// $modal.on("click", 'div[data-buy="buyfood"]', function(e) {
//     e.preventDefault();
//     const tpl_countFood= tmpl($("#template-countFood").html());
//     const counting=tpl_countFood({
//       number:number
//     });
//     $(".popup__content-addbtn").addClass("countcart").html(counting);
//     function check(type) {
//       const situation = type === "add" ? (number += 1) : (number -= 1);
//       if (type === "add") {
//         count[$id] = number;
//       } else {
//         count[$id] = number;
//       }
//       console.log(count);
//       // updateUI(count);
//     }
//     function updateUI(...count) {
//       //console.log (Object.keys());
//       console.log(count);
//     }
//     $(".add_btn").on("click", function() {
//       check("add");
//     });
//     $(".minus_btn").on("click", function() {
//       if (number > 1) {
//         check("minus");
//       } else if (number == 1) {
//         $(".popup__content-btn").attr("data-modal-button", "false");
//       }
//     });
//     // else if(number == 1){
//     //   $('.popup__content-addbtn').removeClass('countcart');
//     // }

//     // rendercart('.popup__content-addbtn',data.id);
//     // sessionStorage.setItem(data.id,number);
//     $(".popup__content-btn").css({
//       background: "linear-gradient(-60deg, #ef4123, #ef2379)",
//       cursor: "pointer"
//     });
//     // for(var i=0; i<number;i++){
//     //   console.log(data);
//     // }

//     // const situation1 =sessionStorage.getItem(data.id);

//     // alert(situation1);
//   });
  

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
    //e.stopPropagation() baes mishe ke event ma edame peida nakone va avalin sath ro begire
    scrolling = true;
    const catId = $(this).parent().data("cat-id");
    actievCategory(catId);
    let itemTopIndex = 0;
    for (var i = 0; i < delinoData.length; i++) {
      if (delinoData[i].id == catId) {
        itemTopIndex = i;
        break;
      }
    }
    $("body").stop().animate(
        {
          scrollTop: itemsTop[itemTopIndex] - 100
        },600);
    setTimeout(() => {
      scrolling = false;
    }, 600);
  });
  $modal.on("click", ".popup__content-close", function() {
    $(".modal").removeClass("popup");
  });
  $wrapper.on("click", "img", function(){
    const itemData = $(this).closest(".food_section-category").data("food");
    renderPopup(itemData);
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
    $(".categories").find('div[data-cat-id="' + id + '"]').addClass("active-box").siblings().removeClass("active-box");
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