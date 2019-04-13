const helper = {
    currancy: function (number) {
        const toman = number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        return toman + " تومان";
    },
    truncate: function (str, num = 50) {
        if (str.length > num) {
            return str.slice(0, num) + "...";
        }
        else {
            return str;
        }
    }
}
export const renderCard=data=>{
    let html =
    '<h1 style="font-size: 20px; text-align: center">' + data.title + "</h1>";
  for (var i = 0; i < data.sub.length; i++) {
    if (data.sub[i].id == 0) {
      const subdata = data.sub[i].food;
      if (subdata) {
        const itemsBox = subdata.map((item, i) => {
          let image = item.img
            ? '<img  class="food_section-category__img" src="' +
              item.img.replace("#SIZEOFIMAGE#", "280x175") +
              '"/>'
            : "";
          return `
                  <div class="food_section-category col-1-of-3" data-food='${JSON.stringify(
                    item
                  )}'>
                      <div class="food_section-img">
                          ${image}    
                      </div>
                      <div class="food_section-description">
                          <div class="food_section-description-index">
                              <h3 class="food_section-description-title">${
                                item.title
                              }</h3>
                              <span >${helper.truncate(
                                item.ingredient
                              )}</span>
                          </div>
                      </div>
                      <div class="food_section-last clearfix">
                          <div class="food_section-last-price">
                              ${helper.currancy(item.price)}
                          </div>
                          <div class="food_section-last-cart">
                              <button class="food_section-last-carticon" data-buy="buyfood"><i class="fas fa-shopping-cart"></i></button>
                          </div>
                      </div>
                  </div>
              `;
        });
        html +=
          ` <div style="border: 1px solid #eee" class="food_section-infobox" id="box-${
            data.id
          }">` +
          itemsBox.join("") +
          `</div>`;
      }
    } else {
      let image = data.sub[i].img
        ? '<img  class="food_section-category__img" src="' +
          data.sub[i].img.replace("#SIZEOFIMAGE#", "280x175") +
          '"/>'
        : "";
      html += `
              <div class="food_section-category col-1-of-3" data-food-id="${
                data.sub[i].id
              }">
                  <div class="food_section-img">
                      ${image}    
                  </div>
                  <div class="food_section-description">
                      <div class="food_section-description-index">
                          <h3 class="food_section-description-title">${
                            data.sub[i].title
                          }</h3>
                          <span >${helper.truncate(
                            data.sub[i].priceLabel
                          )}</span>
                      </div>
                  </div>
                  <div class="food_section-last clearfix">
                      <div class="food_section-last-price">
                          ${helper.currancy(data.sub[i].priceLabel || 0)}
                      </div>
                      <div class="food_section-last-cart">
                          <a class="food_section-last-carticon" href=""><span >
                          <i class="fas fa-shopping-cart"></i></span></a>
                      </div>
                  </div>
              </div>
          `;
    }
  }
  $wrapper.append(html);
}