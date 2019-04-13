// import card from './models/card';
// // const state={};
// const controlCategory=()=>{

// }
// controlCategory();
// const controlFood=async ()=>{
//   try{
//     await card.getfood();
//     ViewCard.rendercard();
//   }catch{

//   }
// }

// controlFood();
import card from './models/card';
import * as viewCard from './views/ViewCard';
const controlFood= ()=>{
    try {
        var food=new card;
        var testing;
        food.getfood();
        viewCard.renderCard(food);
    } catch (error) {
        console.log(error);
    }
}
controlFood();
// var test=new card;
// test.getfood();
// console.log(test);