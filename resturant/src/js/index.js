import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
// import * as recipeView from './views/recipeView';
import { elements, renderloader, clearloader } from './views/base';
import { stat } from 'fs';
const state={};//Like prototype ??

/* search controler*/


const controlsearch = async ()=>{
    //1)get query from view
    const query=searchView.getInput();
    console.log(query);
    if(query){
        //2)new search and add to state 
        state.search=new Search(query);
        //3) prepare UI for result
        searchView.clearInput();
        searchView.clearResult();
        renderloader(elements.searchRs);
        //4)search for recipe
        await state.search.getResult();
        //5)render result
        clearloader();
        searchView.renderResult(state.search.result);
    }
}
elements.searchForm.addEventListener('submit',e=>{
    e.preventDefault();
    controlsearch();
});

/* recipe controler*/

const controlRecipe=async ()=>{
    //GET id from URL
    const id=window.location.hash.replace('#','');
    console.log(id);

    if(id){
        //prepare UI for changes


        //create new recipe object

        state.recipe=new Recipe(id);

        try {
            //get recipe data
         await state.recipe.getRecipe();


         //calling function
 state.recipe.calctime();
 state.recipe.calcserving();
 
         //render the recipe
         console.log(state.recipe);
        } catch (error) {
            alert('error processing recipe');
        }
        
    }

}
window.addEventListener('hashchange',controlRecipe);









// 36833e2f2d29f546b4599c757b1394c4
//https://www.food2fork.com/api/search