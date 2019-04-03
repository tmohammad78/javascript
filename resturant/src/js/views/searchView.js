// export const add=(a,b)=> a + b;
// export const multiply=(a,b)=> a*b;
// export const ID =23;
import { elements } from './base';
export const getInput = ()=> elements.searchInput.value;
export const clearInput=()=>{
    elements.searchInput.value='';
}
export const clearResult=()=>{
    elements.searchResult.innerHTML='';
}

const limitrecipetitle=(title,limit=17)=>{
    const newtitle=[];
    if(title.length > limit){
        title.split(" ").reduce((acc,cur)=>{
            if(acc + cur.length <= limit){
                newtitle.push(cur);
            }
            return acc + cur.length;//????
        },0);

        return `${newtitle.join(' ')} ...`;
    }
}
const renderrecipe = recipe =>{
    const markup=`
        <li>
            <a class="results__link results__link--active" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitrecipetitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResult.insertAdjacentHTML('beforeend',markup);
}
const createbutton=(page,type)=>`
    <button class="btn-inline results__btn--${type}">
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type==='prev' ? 'left' :'right' }"></use>
    </svg>
    <span>Page ${type==='prev' ? page-1 : page+1 }</span>
    </button>
`;
export const renderbutton=(page,numResults,resperpage) => {
    const pages=Math.ceil(numResults/resperpage);
    let button;
    if(page === 1 && pages>1){
        //only one button
        button=createbutton(page,'next');
    }else if(page<pages){
        //both button
        button=`
        ${createbutton(page,'prev')}
        ${createbutton(page,'next')}
        `;
    }else if(page===pages && pages>1){
        //only prev button
        button=createbutton(page,'prev');

        
    }
}
export const renderResult = (recipes,page=3,resperpage=10) =>{
    const start=(page-1)*resperpage;
    const end=page*resperpage;
    // console.log(recipes);
    recipes.slice(start,end).forEach(renderrecipe);
}   