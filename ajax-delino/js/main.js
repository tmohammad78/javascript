$(document).ready(function(){
    const $categorywrapper=$('.categories');
    const $wrapper=$('.american__pizza-info');
    const $wrapper2=$('.italian');
    const $wrapper3=$('.burger');
    const $wrapper4=$('.pasta');

    let delinodata;
    const key='2a54ea59-76ad-4f8b-9856-1a7bdbc22c4c';
    $.get(`https://api.delino.com/restaurant/menu/${key}`).done(result=>{
            delinodata=result.categories;
            // console.log(delinodata);
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
    function rendercategory(data){
        let html="";
        if(data){
            const itemmenue=data.map((item,i)=>{
                return `
                <div class="categories__indexbox">
                    <span class="categories__span clearfix">
                        <a href="${item.id}"><img class="categories__img" src="img/pizzaamerican.png" alt="pizza"></a>
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
        let html = "";
        // console.log(data.sub[0].food[0]);
        // console.log(data.sub[0]);
        const subdata=data.sub[0].food;
        if(subdata){
            // const itemcategory=$.each(data,(i,item)=>{
            //     // const image =  item.food[i].img ? '<img  class="american__pizza-category__img" src="' + item.food[i].img.replace("#SIZEOFIMAGE#", "280x175") +'"/>' : "";
            //     return `
            //         <div class="american__pizza-category col-1-of-3">
                      
            //             <b class="american__pizza__caption">${item.food[i]}</b>
            //         </div>
            //     </div>
            //     `;
            // });
            // console.log(itemcategory);

            const fake=subdata.map((item,i)=>{
                console.log(item);
                const image =  item.img ? '<img  class="american__pizza-category__img" src="' + item.img.replace("#SIZEOFIMAGE#", "280x175") +'"/>' : "";
                return `
                <div class="american__pizza-category col-1-of-3">
                    ${image}
                    <b class="american__pizza__caption">${item.title}</b>
                </div>
               </div>
            `;
            })
            // const itemcategory=data.map((item,i)=>{
            //     // console.log(item);
            //     console.log(item);
            //     const image =  item.food[i].img ? '<img  class="american__pizza-category__img" src="' + item.food[i].img.replace("#SIZEOFIMAGE#", "280x175") +'"/>' : "";
            //     return `
            //         <div class="american__pizza-category col-1-of-3">
            //             ${image}
            //             <b class="american__pizza__caption">${item.food[i].title}</b>
            //         </div>
            //     </div>
            //     `;
            // });
            html=fake.join("");
        }
        $wrapper.html(html);
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















































            // renderitalianpizza(delinodata[1].sub[0].food);
            // renderburger(delinodata[2].sub[0].food);
            // renderpasta(delinodata[3].sub[0].food);










 // function renderitalianpizza(data){
    //     let html = "";
        
    //     if(data){
    //         const itemcategory=data.map((item,i)=>{
    //             // console.log(item.title);
    //             return `
    //                 <div class="american__pizza-category col-1-of-3">
    //                     <img class="american__pizza-category__img" src="img/pizza5.jpg" alt="pizza3">
    //                     <b class="american__pizza__caption">${item.title}</b>
    //                 </div>
    //             </div>
    //             `;
    //         });
    //         html=itemcategory.join("");
    //     }
    //     $wrapper2.html(html);
    // }
    // function renderburger(data){
    //     let html = "";
        
    //     if(data){
    //         const itemcategory=data.map((item,i)=>{
    //             // console.log(item.title);
    //             return `
    //                 <div class="american__pizza-category col-1-of-3">
    //                     <img class="american__pizza-category__img" src="img/burger.jpg" alt="pizza3">
    //                     <b class="american__pizza__caption">${item.title}</b>
    //                 </div>
    //             </div>
    //             `;
    //         });
    //         html=itemcategory.join("");
    //     }
    //     $wrapper3.html(html);
    // }
    // function renderpasta(data){
    //     let html = "";
        
    //     if(data){
    //         const itemcategory=data.map((item,i)=>{
    //             console.log(item.title);
    //             return `
    //                 <div class="american__pizza-category col-1-of-3">
    //                     <img class="american__pizza-category__img" src="img/pasta.jpg" alt="pizza3">
    //                     <b class="american__pizza__caption">${item.title}</b>
    //                 </div>
    //             </div>
    //             `;
    //         });
    //         html=itemcategory.join("");
    //     }
    //     $wrapper4.html(html);
    // }
    // function renderfood(data){
    //     let html='';
    //     const itemfood=data.array.map((item,i) => {
    //         const image =  item.food[0].img ? '<img  class="american__pizza-category__img" src="' + item.food[i].img.replace("#SIZEOFIMAGE#", "280x175") +'"/>' : "";
    //         return `                   
    //         <div class="american__pizza-category col-1-of-3">
    //             ${image}
    //             <b class="american__pizza__caption">${item.title}</b>
    //          </div>
    // </div>`;
    //     });
    // }
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

