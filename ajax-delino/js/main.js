$(document).ready(function(){
    const $wrapper=$('.american__pizza-info');
    const $wrapper2=$('.italian');
    const $wrapper3=$('.burger');
    const $wrapper4=$('.pasta');

    let delinodata;
    $.get('https://api.delino.com/restaurant/menu/d8ecd310-a541-452d-957f-5b2e9361a74e').done(result=>{
            delinodata=result.categories;
            console.log(delinodata);
            renderamericanpizza(delinodata[0].sub);
            renderitalianpizza(delinodata[1].sub[0].food);
            renderburger(delinodata[2].sub[0].food);
            renderpasta(delinodata[3].sub[0].food);
        }).fail((xhr)=>{
        if(xhr.status==404)
        {
            alert('not found');
        }
    });
    // const $selection=$('').on("click",show_selection_box);
    // function show_selection_box(e){
    // }
    function renderamericanpizza(data){
        let html = "";
        if(data){
            const itemcategory=data.map((item,i)=>{
                // console.log(item.title);
                return `
                    <div class="american__pizza-category col-1-of-3">
                        <img data-id=""  class="american__pizza-category__img" src="img/pizza3.jpg" alt="pizza3">
                        <b class="american__pizza__caption">${item.title}</b>
                    </div>
                </div>
                `;

            });
            html=itemcategory.join("");
        }
        $wrapper.html(html);
    }
    function renderitalianpizza(data){
        let html = "";
        
        if(data){
            const itemcategory=data.map((item,i)=>{
                // console.log(item.title);
                return `
                    <div class="american__pizza-category col-1-of-3">
                        <img class="american__pizza-category__img" src="img/pizza5.jpg" alt="pizza3">
                        <b class="american__pizza__caption">${item.title}</b>
                    </div>
                </div>
                `;
            });
            html=itemcategory.join("");
        }
        $wrapper2.html(html);
    }
    function renderburger(data){
        let html = "";
        
        if(data){
            const itemcategory=data.map((item,i)=>{
                // console.log(item.title);
                return `
                    <div class="american__pizza-category col-1-of-3">
                        <img class="american__pizza-category__img" src="img/burger.jpg" alt="pizza3">
                        <b class="american__pizza__caption">${item.title}</b>
                    </div>
                </div>
                `;
            });
            html=itemcategory.join("");
        }
        $wrapper3.html(html);
    }
    function renderpasta(data){
        let html = "";
        
        if(data){
            const itemcategory=data.map((item,i)=>{
                // console.log(item.title);
                return `
                    <div class="american__pizza-category col-1-of-3">
                        <img class="american__pizza-category__img" src="img/pasta.jpg" alt="pizza3">
                        <b class="american__pizza__caption">${item.title}</b>
                    </div>
                </div>
                `;
            });
            html=itemcategory.join("");
        }
        $wrapper4.html(html);
    }
    // $.ajax({
    //     method:"GET",
    //     url:'https://api.delino.com/restaurant/menu/d8ecd310-a541-452d-957f-5b2e9361a74e',
    //     crossDomain: true,
    //     dataType: 'jsonp',
    //     success:function(){
    //      console.log('sd');   
    //     }

    // }).done(function(){
    //     console.log('sfdas');
    // });


    $wrapper.on("click","img",function(){
        renderpopup(delinodata[0].sub);
    });

    function renderpopup(data){
        let html= "";
        if(data){

            $('.test').addClass('popup',function(){
                console.log('works');
            });
            const itempoup=data.map((item,id)=>{
                return `
                <div class="popup__content">
                    <a href="" class="popup__close" >&times;</a>
                    <h3 class="popup_description">${item.description} </h3>
                </div>
                `;
            });
            html=itempoup.join("");

            
        }
        $("body").html(html);
    }

    $('.popup__close').on("click",function(){
        $('.test').fadeOute(2000,function(){    });
    });
});