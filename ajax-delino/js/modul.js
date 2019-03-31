const helper = {
    currancy: function(number){
        
        return `<span class="price-number">تومان</span> <span>${number}<span> `;
    },
    truncate: function (title,limit=15) { 
        const newtitle=[]
        if(title.length > limit){

            console.log(title.split(' '));
            
            title.split(' ').reduce(function(acc,cur){
                if(acc + cur.length > limit ){
                    newtitle.push(cur);
                } 
                // console.log(newtitle);
                return acc+cur.length;
            },0);
            // console.log(newtitle);
            return `${newtitle.join(',')} ...`;
        }
     }
}
