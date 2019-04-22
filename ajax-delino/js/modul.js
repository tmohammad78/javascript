const helper = {
    currancy: function (number) {
        const toman = number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        return toman + " تومان";
    },
    truncate: function (str, num = 5) {
        const arrStr=str.split('،');
        if (str.length > num) {
            return arrStr.slice(0, num).join(",") + "...";
        }
        else {
            return str;
        }
    },
    toPersian:function (){
        
    }
}
const counting ={
    count:function (number){

    }
}
// const calcute ={
//     number:function(){
   
//         $('.minus_btn').on("click",function(){
//             let currnumber;
//             return currnumber-=1;
//         });
//     }

    
// }


