export const elements ={
    searchForm:document.querySelector('.search'),
    searchInput:document.querySelector('.search__field'),
    searchRs:document.querySelector('.results'),
    searchResult:document.querySelector('.results__list'),
    recipe:document.querySelector('.recipe')
    // searchrespages:document.querySelector('.')
};
export const elementstring={
    loader:'loader'
}
export const renderloader= parent => {
    const loader=`<div class="${elementstring.loader}"><svg><use href="img/icons.svg#icon-cw"></use></svg></div>`;
    parent.insertAdjacentHTML('afterbegin',loader);
}
export const clearloader= () => {
    const loader=document.querySelector(`.${elementstring.loader}`);
    if(loader){
        loader.parentElement.removeChild(loader);
    }
}
