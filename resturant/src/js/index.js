import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderloader, clearloader } from './views/base';
const state={};//Like prototype ??
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









// 36833e2f2d29f546b4599c757b1394c4
//https://www.food2fork.com/api/search