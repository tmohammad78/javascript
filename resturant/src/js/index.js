import Search from './models/Search';
const state={};//Like prototype ??
const controlsearch = async ()=>{
    //1)get query from view
    const query='pizza';
    if(query){
        //2)new search and add to state 
        state.search=new Search(query);
        //3) prepare UI for result
        //4)search for recipe
        await state.search.getResult();
        //5)render result
        console.log(state.search.result);
    }
}
document.querySelector('.search').addEventListener('submit',e=>{
    e.preventDefault();
    controlsearch();
});









// 36833e2f2d29f546b4599c757b1394c4
//https://www.food2fork.com/api/search