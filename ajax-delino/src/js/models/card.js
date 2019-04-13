import { key } from '../config';
import axios from 'axios';
export default class card {
    async getfood(){
        let delinodata;
        try{
            const API=await axios(`https://api.delino.com/restaurant/menu/${key}`);
            // console.log(API);
            delinodata = API.data.categories;
            console.log(delinodata);
            delinodata.map((item,i)=>{
                console.log(item);
            });
            // $.get(`https://api.delino.com/restaurant/menu/${key}`)
            // .done(result => {
            //   delinodata = result.categories;
            //   for (var i = 0; i < delinodata.length; i++) {
            //     renderfood(delinodata[i]);
            //  }
            //   $wrapper.find("h1").each((i, h1) => {
            //     const top = $(h1).offset().top;
            //     itemsTop.push(parseInt(top));
            //   });
            //   $('button[data-buy="buyfood"]').on("click",function(){
            //       $(this).closest('.food_section-last-cart').css({
            //           "padding":"0"
            //       });
            //       rendercart($(this));
            //     });
            //     // const situation =sessionStorage.getItem(key);
            //     // alert(situation);
            //     // rendercart().updateUI(situation);
            //   console.log(itemsTop);
            // })
            // .fail(xhr => {
            //   if (xhr.status == 404) {
            //     alert("not found");
            //   }
            // });
        }catch(error){
            console.log(error);
        }
        return delinodata;
    }
}
