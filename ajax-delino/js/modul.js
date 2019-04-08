const helper = {
    currancy: function (number) {
        const toman = number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        return toman + " تومان";
    },
    truncate: function (str, num = 50) {
        if (str.length > num) {
            return str.slice(0, num) + "...";
        }
        else {
            return str;
        }
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


