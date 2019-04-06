$(document).ready(function () {
    const $categorywrapper = $('.categories');




    const $wrapper = $('.food_section-info');
    const $test = $('.test');
    // const $wrapper=$('');
    let delinodata;
    // const key='2a54ea59-76ad-4f8b-9856-1a7bdbc22c4c';
    //const key = '48ff20a8-c1a4-4843-8826-ae0ba77f4254';
    //a5fa43c3-234d-462a-990a-9ec7ed82159f
    const key = "890d958f-9e64-4211-a2fa-d732c7a3920f" // https://www.delino.com/restaurant/toasthouse

    $.get(`https://api.delino.com/restaurant/menu/${key}`).done(result => {
        delinodata = result.categories;
        rendercategory(delinodata);
        console.log(delinodata);
        for (var i = 0; i < delinodata.length; i++) {
            renderfood(delinodata[i]);
        }
    }).fail((xhr) => {
        if (xhr.status == 404) {
            alert('not found');
        }
    });
    function rendercategory(data) {
        let html = "";
        if (data) {
            data.sort(function (a, b) { return a.index - b.index });

            console.log(data);
            const itemmenue = data.map((item, i) => {
                // <a href="" class="clearfix scroll" data-cat-id="${item.id}" >
                // </a>
                return `
                    <div class="categories__indexbox " data-cat-id="${item.id}" >
                            <a id='' href="#${item.id}"><img class="categories__img " src="img/${item.logo}.png" alt="${item.title}"></a>
                        <b class="categories__caption">${item.title}</b>
                    </div>
                `;
            });
            html = itemmenue.join("");
        }
        $categorywrapper.html(html);
    }
    function renderfood(data) {
        let html = '<h1 style="font-size: 20px; text-align: center">' + data.title + '</h1>';
        for (var i = 0; i < data.sub.length; i++) {
            if (data.sub[i].id == 0) {

                const subdata = data.sub[i].food;
                if (subdata) {
                    const itemsBox = subdata.map((item, i) => {
                        let image = item.img ? '<img  class="food_section-category__img" src="' + item.img.replace("#SIZEOFIMAGE#", "280x175") + '"/>' : "";
                        return `
                    <div class="food_section-category col-1-of-3" data-food='${JSON.stringify(item)}'>
                        <div class="food_section-img">
                            ${image}    
                        </div>
                        <div class="food_section-description">
                            <div class="food_section-description-index">
                                <h3 class="food_section-description-title">${item.title}</h3>
                                <span >${helper.truncate(item.ingredient)}</span>
                            </div>
                        </div>
                        <div class="food_section-last clearfix">
                            <div class="food_section-last-price">
                                ${helper.currancy(item.price)}
                            </div>
                            <div class="food_section-last-cart">
                                <a class="food_section-last-carticon" href=""><span >
                                <i class="fas fa-shopping-cart"></i></span></a>
                            </div>
                        </div>
                    </div>
                `;
                    });
                    html += ` <div style="border: 1px solid #eee" class="food_section-infobox" id="box-${data.id}">` + itemsBox.join("") + `</div>`;
                }
            } else {
                let image = data.sub[i].img ? '<img  class="food_section-category__img" src="' + data.sub[i].img.replace("#SIZEOFIMAGE#", "280x175") + '"/>' : "";
                html += `
                <div class="food_section-category col-1-of-3" data-food-id="${data.sub[i].id}">
                    <div class="food_section-img">
                        ${image}    
                    </div>
                    <div class="food_section-description">
                        <div class="food_section-description-index">
                            <h3 class="food_section-description-title">${data.sub[i].title}</h3>
                            <span >${helper.truncate(data.sub[i].priceLabel)}</span>
                        </div>
                    </div>
                    <div class="food_section-last clearfix">
                        <div class="food_section-last-price">
                            ${helper.currancy(data.sub[i].priceLabel || 0)}
                        </div>
                        <div class="food_section-last-cart">
                            <a class="food_section-last-carticon" href=""><span >
                            <i class="fas fa-shopping-cart"></i></span></a>
                        </div>
                    </div>
                </div>
            `;
            }
        }
        $wrapper.append(html);
    }
    // <svg class="popup-close">
    //                  <use xlink:href="img/close.svg" ></use>
    //              </svg>
    
    function renderpopup(data) {
        console.log(data);
        console.log(data.id);
        let image = data.img ? '<img  class="popup__content-img--inner"" src="' + data.img.replace("#SIZEOFIMAGE#", "560x350") + '"/>' : "";//560×350
        $('.test').addClass('popup').html(`
           <div class="popup__content">
                <div class="popup__content-close">
                    <img class="popup__content-close--icon" src="img/close.svg"  />
                </div>
                <div class="popup__content-img">
                    ${image}
                </div>
                <div class="popup__content-text">
                 ${data.title}
                </div>
 
            </div>
           `);
    }
    //popup
    $categorywrapper.on("click", "a", function () {
        //debugger;
        const $box = $("#box-" + $(this).closest("div").data("cat-id"));
        if ($box.length) {
            $('body').stop().animate({
                scrollTop: $box.offset().top - 90
            }, 600);
        }
    });
    $test.on("click", ".popup__content-close", function () {
        $('.test').removeClass("popup")//.fadeOut(.5);
    })
    $wrapper.on("click", "img", function () {
        const itemData = $(this).closest(".food_section-category").data("food")
        // console.log(itemData.id)
        //const data = id//$(this)
        renderpopup(itemData);
    });





    //scrollwatcher


    // $(window).scroll(function(){
    //     var scrollposition=$(window).scrollTop(); 

    //     const $box = $("#box-"+$('.scroll').data("cat-id"));
    //     $('.scroll').each(function(){
    //         var scrollafter=$box.offset().top-20;
    //         if ( scrollafter <= scrollposition ) {
    //             $(this).addClass('active');
    //             $(this).siblings().removeClass('active');
    //           }
    //     });
    // });
});




