const helper = {
    currancy: function(){


    },
    truncate: function (title,limit=19) { 
        const newtitle=[]
        if(title.length > limit){
            title.split(',').reduce(function(acc,cur){
                if(acc + cur.length > 19 ){
                    newtitle.push(cur);
                } 
                return acc+cur.length;
            },0);
            return `${newtitle.join(',')} ...`;
        }

     }

}