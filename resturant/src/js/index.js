// import string from './models/Search';
// // import { add,multiply,ID } from './views/searchView';
// import * as searchView from './views/searchView';
// console.log(`this is a example ${searchView.add(searchView.ID,2)} and ${searchView.multiply(3,5)}.${string}`)


// 36833e2f2d29f546b4599c757b1394c4
//https://www.food2fork.com/api/search
import Search from './models/Search';
const search=new Search('pizza');
console.log(search);
search.getResult();