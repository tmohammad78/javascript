const helper = {
    currancy: function (number) {
        const toman = number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        return toPersianNum(toman) + " تومان";
    },
    truncate: function (str, num = 5) {
        console.log(str);
        const arrStr=str.split(' ');
        console.log(arrStr);
        if (str.length > num) {
            return arrStr.slice(0, num).join(" ") + "...";
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
function toPersianNum( num, dontTrim ) {

    var i = 0,

        dontTrim = dontTrim || false,

        num = dontTrim ? num.toString() : num.toString().trim(),
        len = num.length,

        res = '',
        pos,

        persianNumbers = typeof persianNumber == 'undefined' ?
            ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'] :
            persianNumbers;

    for (; i < len; i++)
        if (( pos = persianNumbers[num.charAt(i)] ))
            res += pos;
        else
            res += num.charAt(i);

    return res;
}

// const calcute ={
//     number:function(){
   
//         $('.minus_btn').on("click",function(){
//             let currnumber;
//             return currnumber-=1;
//         });
//     }

    
// }


