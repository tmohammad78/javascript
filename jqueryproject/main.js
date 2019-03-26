$(document).ready(function () {
    var json = [];
    var json1 = [];
    var html = [];
    let i = 0;
    let studentData = null;
    let postresult=null;
    const $wrapper = $('#info');
    $.get("https://reqres.in/api/users?delay=1").done(result => {
        studentData = result.data;
        render(studentData)
    }).fail((xhr) => {
        if (xhr.status == 404) {
            alert("error not found")
        }
    });
    $.post("https://reqres.in/api/users").done(result2 => {
        postresult = result2.data;
        render2(postresult)
    });

    function render(data) {
        let html = "";
        if (data && data.length > 0) {
            const itemList = data.map((item, i) => {
                return `
            <div data-id="${item.id}" class="info__box  clearfix">
                <a href="#" class="close">×</a>
                 <div class="info__box-photo"><img class="img" src="${item.avatar}" /></div>
                <div class="info__box-text">
                    <div class="text-inbox"><span>FirstName: </span>${ item.first_name}</br> <span>LastName:
                    </span>${item.last_name} </div>
                 </div>
            </div>
           `;
            });
            html = itemList.join("")
        } else {
            html = "No data";
        }
        $wrapper.html(html);
    }
    $wrapper.on("click", "img", function () {
        const $div = $(this).closest(".info__box");
        alert($div.data('id'));
    });
    $wrapper.on("click", ".close", function () {
        const $div = $(this).closest(".info__box");
        $div.slideUp("normal", () => {
            $div.remove()
        });
    });
    const $serchInput = $('input[name="search-input"]').on("keyup", search);
    function search(e) {
        const text = $serchInput.val();
        const result = []
        studentData.forEach(item => {
            if (item.first_name.toLowerCase().indexOf(text.toLowerCase()) > -1) {
                result.push(item);
            }
        });
        console.log(result);
        render(result);
    }
    $wrapper.on("click", "img", function () {
        const $div = $(this).closest(".info__box");
        alert($div.data('id'));
    });
    $wrapper.on("click", ".close", function () {
        const $div = $(this).closest(".info__box");
        $div.slideUp("normal", () => {
            $div.remove()
        });
    });

    function render2(data){
        render(data);
    }
    const $showpop = $('button[name="add-input"]').on("click", function(){
        $('.addpopup').addClass("active").append(`
        <div class="addpopup__formbox">
        <a href="" class="close">&#10006;</a>
        <form action="" class="addform">
            <div class="addform__input"><input class="addform__input-1" type="text "  name="add-input-1"  placeholder="first name"></div>
            <div class="addform__input"><input class="addform__input-2" type="text "  name="add-input-2" placeholder="last name"></div>
            <div class="addform__input"><input class="addform__input-3" type="text"  name="add-input-3" placeholder="your ID"></div>
            <div class="addform__input"></div><button type="submit" class="btnsubmit">submit</button><div>
        </form>
        </div>`
        );
    $('.close').removeClass("active");
    });
    const $addindex=$('button[name="submit"]').on("click",add);
    function add(e) {
        
        $('input[name="add-input-1"]').keyup(function () {
            val2 = $(this).val().toLowerCase();
            console.log("val1 : " + val2);
        });
        $('input[name="add-input-2"]').keyup(function () {
            val2 = $(this).val().toLowerCase();
            console.log("val2 : " + val2);
        });
        $('input[name="add-input-3"]').keyup(function () {
            val3 = $(this).val().toLowerCase();
            console.log("val3 : " + val3);
        });
        const result2=[];

        result2.push()




    };
    // function pa() {
    //     return {
    //         add: function () {
    //             var val = [];
    //             var val1, val2, val3;



    //             $('.btnsubmit').on("click", function () {
    //                 console.log(val1);
    //                 $.post("https://reqres.in/api/users", {
    //                     // "first_name":returnvalue('.addform__input-1') ,
    //                     // "last_name":returnvalue('.addform__input-2') ,
    //                     // "id" : returnvalue('.addform__input-3'),

    //                     "first_name": val1,
    //                     "last_name": returnvalue('.addform__input-2'),
    //                     "id": returnvalue('.addform__input-3'),
    //                 });
    //             });
    //         }
    //     };

    // }
});