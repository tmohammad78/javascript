$(document).ready(function(){
    const $categorywrapper=$('.categories');
    const $wrapper=$('.food_section-info');
    // const $wrapper=$('');
    let delinodata;
    // const key='2a54ea59-76ad-4f8b-9856-1a7bdbc22c4c';
    const key='48ff20a8-c1a4-4843-8826-ae0ba77f4254';
    //a5fa43c3-234d-462a-990a-9ec7ed82159f

    $.get(`https://api.delino.com/restaurant/menu/${key}`).done(result=>{
            delinodata=result.categories;
            rendercategory(delinodata);
            console.log(delinodata);
            for (var i=0 ; i< delinodata.length ; i++){
                renderfood(delinodata[i]);
            }
        }).fail((xhr)=>{
        if(xhr.status==404)
        {
            alert('not found');
        }
    });
    function icon(logo){
        switch(logo){
            //burger
            case 12:
            
            break;
            //soda
            case 3:
            break;
            //pish ghaza
            case 21:
            break;
            //sanswitch
            case 22:
            break;
            //sokhari
            case 25:
            break;
            //pizza
            case 7:
            break;
        }
    }
    function rendercategory(data){
        let html="";
        if(data){
            data.sort(function(a, b){return a.index-b.index});

            console.log(data);            
            let j=0
            const itemmenue=data.map((item,i)=>{
            
                return `
                <div class="categories__indexbox" data-cat-id="${item.id}" >
                    <span class="categories__span clearfix">
                        <a id='' href="#${item.id}"><img class="categories__img " src="img/pizzaamerican.png" alt="pizza"></a>
                        <b class="categories__caption">${item.title}</b>
                    </span>
                </div>
                `;
            });
            html=itemmenue.join("");
        }
        $categorywrapper.html(html);
    }
    function renderfood(data){
        // console.log(data)
        // console.log(data.sub[0]);
        for (var i=0;i<data.sub.length;i++){
        const subdata=data.sub[i].food;
        if(subdata){
            const itemsBox = subdata.map((item,i)=>{
                console.log(helper.truncate(item.ingredient));
                const image =  item.img ? '<img  class="food_section-category__img" src="' + item.img.replace("#SIZEOFIMAGE#", "280x175") +'"/>' : "";
                return `
                <div class="food_section-category col-1-of-3">
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
            html=` <div style="border: 1px solid #eee" class="food_section-infobox" id="box-${data.id}">`+itemsBox.join("")+`</div>`;
            $wrapper.append(html);
        }
        }
    }
    //popup
    $wrapper.on("click","img",function(data){
        // for(var i=0 ;i<data.sub.length;i++){
        //     // renderpopup(delinodata[i].sub);
        //     console.log(data.sub);

        // }
        // // console.log(delinodata);
        // return;
        renderpopup(data);
        
    });
    function renderpopup(data){
        let html= "";
        if(data){
            alert('s');
            $('.test').addClass('popup',function(){
                // console.log('works');
                return ' ';
            });
            // const itempoup=data.map((item,id)=>{
            //     return `
            //     <div class="popup__content">
            //         <a href="" class="popup__close" >&times;</a>
            //         <h3 class="popup_description">${item.ingredient} </h3>
            //     </div>
            //     `;
            // });
            // html=itempoup.join("");            
        }
        // $("body").html(html);
    }
    $('.popup__close').on("click",function(){
        $('.test').fadeOute(2000,function(){    });
    });
    //popup
    $categorywrapper.on("click","a",function(){
        //debugger;
        const $box = $("#box-" + $(this).closest("div").data("cat-id"));
        if ($box.length){
            $('body').stop().animate({
                scrollTop: $box.offset().top - 90
              }, 600 );
        }            
    });
    // $(window).scroll(function(){
    //     var scrolldefault=$(window).scrollTop;
        
    //     const $box = $("#box-" + $(this).closest("div").data("cat-id"));
    //     var scrolllocation=$box.offset().top -20;
    //     if()
    //     $('').

    // });

});




