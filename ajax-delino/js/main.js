$(document).ready(function(){
    const $categorywrapper=$('.categories');
    const $wrapper=$('.food_section-info');
    let delinodata;
    const key='2a54ea59-76ad-4f8b-9856-1a7bdbc22c4c';
    $.get(`https://api.delino.com/restaurant/menu/${key}`).done(result=>{
            delinodata=result.categories;
            // console.log(delinodata);
            rendercategory(delinodata);
            console.log(delinodata);
            // renderfood(delinodata[2]);
            // renderfood(delinodata[3]);
            // renderfood(delinodata[4]);
            // return;
            for (var i=0 ; i< delinodata.length ; i++){
                renderfood(delinodata[i]);
            }
        }).fail((xhr)=>{
        if(xhr.status==404)
        {
            alert('not found');
        }
    });
    function rendercategory(data){
        let html="";
        if(data){
            const itemmenue=data.map((item,i)=>{
                return `
                <div class="categories__indexbox" >
                    <span class="categories__span clearfix">
                        <a href="#${item.id}"><img class="categories__img" src="img/pizzaamerican.png" alt="pizza"></a>
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
        console.log(data)
        //return;
        // console.log(data.sub[0].food[0]);
        // console.log(data.sub[0]);
        const subdata=data.sub[0].food;
        if(subdata){
            const itemsBox = subdata.map((item,i)=>{
                console.log(item);
                const image =  item.img ? '<img  class="food_section-category__img" src="' + item.img.replace("#SIZEOFIMAGE#", "280x175") +'"/>' : "";
                return `
                <div class="food_section-category col-1-of-3">
                    ${image}
                    <b class="food_section__caption">${item.title}</b>
                </div>
            `;
            });
            
            html=` <div style="border: 1px solid red"  id="${data.id}">`+itemsBox.join("")+`</div>`;
            $wrapper.append(html);
        }
        
    }
    //popup
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
    //popup
});
