import axios from 'axios';
import { key } from '../config';
 export default class Recipe{
     constructor(id){
        this.id=id;
     }
     async getRecipe(){
         try {
            const res=await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title= res.data.recipe.title;
            this.author= res.data.recipe.publisher;
            this.img= res.data.recipe.image_url; 
            this.url= res.data.recipe.source_url; 
            this.ingredients=res.data.recipe.ingredients; 
            console.log(res);
         } catch (error) {
            console.log(error);
         }
     }
     calctime(){
         const numIng=this.ingredients.length;
         const periods=Math.ceil(numIng/3);
         this.time=periods*15;
     }
     calcserving(){
        this.serving=4;
     }

     parsIngredient(){
        const unitslong=['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','pounds'];
        const unitsshort=['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];
        const units=[...unitsshort,'kg','g'];
        const newingredient=this.ingredients.map(el =>{
           //1.uniform unit
            let ingredient= el.toLowerCase();
            unitslong.forEach((unit,i)=>{
               ingredient=ingredient.replace(unit,unitsshort[i]);
            });

            //2.remove parantes
            ingredient=ingredient.replace(/ *\([^)]*\) */g,'');

            //3.parse ingredient into count,unit and ingredient
            const arrIng=ingredient.split(' ');
            const unitindex=arrIng.findIndex(el2 => units.includes(el2));  
            let objIng;
            if(unitindex >-1){
               //there is unit
               // 4 1/2 cups ,arrcount [4,1/2]
               const arrcount=arrIng.slice(0,unitindex);
               let count;
               if(arrcount.length === 1){
                  count=eval(arrIng[0].replace('-','+'));
               }else{
                  count=eval(arrIng.slice(0,unitindex).join('+'));
               }

               objIng = {
                  count,
                  unit:arrIng[unitindex],
                  ingredient:arrIng.slice(1).join(' ')
               };
            }else if(parseInt(arrIng[0],10)){
               //there is no unit but there is number is first position
               objIng = {
                  count:parseInt(arrIng[0],10),
                  unit:'',
                  ingredient:arrIng.slice(1).join(' ')
               };
            }
            else if(unitindex== -1){
               //there is no unit and no number in first position 
            objIng = {
               count:1,
               unit:'',
               ingredient
            };
            
            }
            return objIng;
        });

        this.ingredients=newingredient;
     }
 }