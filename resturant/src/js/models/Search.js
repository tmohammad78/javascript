// export default 'i am an exported string';
import axios from 'axios';
export default class Search{
    constructor(query){
        this.query=query;
    }
    async getResult(){
        const key='36833e2f2d29f546b4599c757b1394c4';
        try {
            const res=await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result=res.data.recipes;
            // console.log(this.result);
        } catch (error) {
            alert(error);
        }
    
    }
}

    