export const elements ={
    searchForm:document.querySelector('.search'),
    searchInput:document.querySelector('.search__field'),
    searchResult:document.querySelector('.results__list'),
    searchRs:document.querySelector('.result')
};
export const renderloader=parent=>{
    const loader=`<div class="loader"><svg><use href="img/icons.svg#icon-cw"></use></svg></div>`;
    parent.insertAdjacentHTML('afterbegin',loader);
}
