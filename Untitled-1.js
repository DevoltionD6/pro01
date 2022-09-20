
const listNew = $('#mainnews');
const section1 = $('#popular__new');
const searchValue = $('#searchbox');
const btn = $('#search__button')
const homePage = $('#button__home');
// lấy giá trị khi bấm tìm kiếm

$('.formdate').datepicker({
    format: "dd/mm/yyyy"
});
renderNew ()
// tính toán thời gian
function dateData (data,i)
{
    return new Date(data.articles[i].publishedAt).toString("dd/MM/yyyy hh:mm:ss");
   
}
// chèn tin thứ nhất
function new1 (data)
{
    
    section1.append(`
    <div class="topnews news" id="firstnew">
            <img src="${data.articles[1].image}" alt="${data.articles[1].title}" >
            <div class="topnews__title ">
                <a href="${data.articles[1].url}" target="_blank"><h2>${data.articles[1].title}</h2></a>
                <h4>${data.articles[1].source.name}</h4>
                <h5>${dateData(data,1)}</h5>
            </div>
        </div>
    `)
}
// chèn tin thứ 2
function new2 (data)
{   
    
    section1.append(`
            <div class="topnews second__news" id="secondnew" >
                    <img src="${data.articles[2].image}" alt="${data.articles[2].title}">
                    <div class="topnews__title ">
                        <a href="${data.articles[2].url}" target="_blank"><h2>${data.articles[2].title}</h2></a>
                        <h4>${data.articles[2].source.name}</h4>
                        <h5>${dateData(data,2)}</h5>
                    </div>
                </div>
            `)
}
// chèn tin thứ 3
function new3 (data)
{
    
    section1.append(`
            <div class="topnews third__news" id="thirdnew" >
                    <img src="${data.articles[3].image}" alt="${data.articles[3].title}">
                    <div class="topnews__title ">
                        <a href="${data.articles[3].url}" target="_blank"><h2>${data.articles[3].title}</h2></a>
                        <h4>${data.articles[3].source.name}</h4>
                        <h5>${dateData(data,3)}</h5>
                    </div>
                </div>
            `)
}
function popularNew (data)
{
    new1(data);
    new2(data);
    new3(data);
}
function manualNew (data) 
{
    for (i = 4 ; i<data.articles.length; i++) 
    {
        
        listNew.append(`
            <div class="list__news manual__new">
                <img src="${data.articles[i].image}" alt="${data.articles[i].title}" >
                <div class="main__news__tittle ">
                    <a href="${data.articles[i].url}" target="_blank"><h2>${data.articles[i].title}</h2></a>
                    <p>${data.articles[i].source.name}</p>
                    <p>${dateData(data,i)}</p>
                    <p>${data.articles[i].description}</p>
                </div>
            </div>
            `)
    }
}
function renderNew ()
{
    //from từ mồng 2-> mồng 3
    
    
    fetch(`https://gnews.io/api/v4/top-headlines?&token=dcce909354a56d10bc4495480fcf7e45&from=&to=`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        popularNew(data);
        manualNew(data);
    });
}
function searchbtn ()
{
    
    var from = $('#from').val();
    var to = $('#to').val(); 
    var searchInput = $('#searchinput').val();
        if (!searchInput.trim())
        {
            alert("Nhập từ khóa cần tìm")
            return
        }
        if (from)
        {
            from = new Date(from).toISOString().replace(".000","");
        }
        if (to)
        {
            to = new Date(to).toISOString().replace(".000","");
        }
    
    
    hideNew ();
    responseSearch (searchInput, from, to);
        
    
}
function responseSearch(searchInput, from, to)
{
    var searchFetch = searchInput;
    fetch(`https://gnews.io/api/v4/search?q=${searchFetch}&token=dcce909354a56d10bc4495480fcf7e45&from=${from}&to=${to}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
       searchHTML(data);
    });
    console.log(fetch);
}
function searchHTML (data)
{
    
    homePage.css("display","block");
    for (i = 0; i < data.articles.length ; i++)
    {
        listNew.append(`
            <div class="list__news search__element">
                <img src="${data.articles[i].image}" alt="${data.articles[i].title}" >
                <div class="main__news__tittle ">
                    <a href="${data.articles[i].url}" target="_blank"><h2>${data.articles[i].title}</h2></a>
                    <p>${data.articles[i].source.name}</p>
                    <p>${dateData(data,i)}</p>
                    <p>${data.articles[i].description}</p>
                </div>
            </div>
            `)
    }
}
// ẩn đi top news, popular news và xóa dữ liệu tìm kiếm lúc trước

function hideNew ()
{   
    listNew.empty(); // xóa dữ liệu search trước đó
    let newManual = $('.manual__new');
    let firstnew = $('#popular__new');
    firstnew.hide();
    newManual.hide();
}
    
function trangchu () 
{
    location.reload();
    // homePage.css("display","none"); // ẩn nút home
    // listNew.empty(); // xóa search
    // popularNew(); // thêm tin
    // manualNew(); // thêm tin
    
}