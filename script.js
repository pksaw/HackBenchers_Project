let games = [];

if (localStorage['games']) {
    games = JSON.parse(localStorage['games'])
}


function getUsers(done) {
    if (games && games.length > 0) {
        return done(games)
    }
    $.getJSON('http://starlord.hackerearth.com/gamesext', (data) => {
        done(data)
    })
}


var icon;
var num = 0;
var store_title = [];
var store_platform = [];
var store_editors_choice = [];
var store_genre = [];
var store_score = [];
var max_score = 0;


function refreshUsers(games) {
    var j = 0;
    var i = 1;
    games.forEach((game) => {

        store_title[j] = game.title;
        store_platform[j] = game.platform;
        store_editors_choice[j] = game.editors_choice;
        store_genre[j] = game.genre;
        store_score[j] = game.score;

        j++;
        max_score = Math.max(max_score, game.score)
        if (j > 40) {
            i = 20;
        }

        if (game.editors_choice === 'Y') {
            icon = '⭐️'
        } else {
            icon = '';
        }
        $('#row-games').append(
                `
            <div class="col-lg-6 col-md-12 col-sm-12">
               <div class="card m-2">
                   <div class="card-body">
                      <div class="row">
                        <div class="col-4">
                         <img src='css/image-${i}.jpg' id="image_logo">
                        </div> 
                        <div class="col" id="header">
                         <a href='${game.url}'> <h5 class="card-title">${game.title}</h5></a>
                          <p class="card-text text-muted" id="game_platform">${game.platform}</p>
                        </div>
                         <div class="col-1">

                         <span class="float-right text-success">${icon}</span>
                         </div>
                      </div>
                   </div>
                  
                   <div class="card-footer text-muted">
                     <span>Genre:${game.genre}</span>
                     <span class="float-right">${game.score}</span>
                   </div>
                </div>
           </div>
           
            `
            )
            ++i;
    })
}


function searchEngine(games) {

    $("#input").on("keyup", function() {

        PageReader(0);
        $('#row-games').html('')
        $('#score_input').val('')
        var value = $(this).val().toLowerCase();

        games.forEach((game) => {


            if ((game.title.toLowerCase()).indexOf(value) === 0) {
                if (game.editors_choice === 'Y') {
                    icon = '⭐️'
                } else {
                    icon = '';
                }
                $('#row-games').append(
                    `
                   <div class="col-lg-6 col-md-12 col-sm-12" id="find_col">
                       <div class="card m-2">
                           <div class="card-body">
                              <div class="row">
                                <div class="col-4">
                                 <img src='css/image-${15}.jpg' id="image_logo">
                                </div> 
                                <div class="col" id="header">
                                  <h5 class="card-title">${game.title}</h5>
                                  <p class="card-text text-muted" id="game_platform">${game.platform}</p>
                                </div>
                                 <div class="col-1">

                                 <span class="float-right text-success">${icon} </span>
                                 </div>
                              </div>
                           </div>
                          
                           <div class="card-footer text-muted">
                             <span>Genre:${game.genre}</span>
                             <span class="float-right">${game.score}</span>
                           </div>
                        </div>
                   </div>

                    `
                )
            }
        })
    });
}


function FilterSort(games) {
    $("#score_input").on("keyup", function() {

        PageReader(0);
        $('#row-games').html('')
        $('#input').val('')
        var score_value = parseFloat($('#score_input').val());

        games.forEach((game) => {
            if (score_value === game.score) {

                if (game.editors_choice === 'Y') {
                    icon = '⭐️'
                } else {
                    icon = '';
                }

                $('#row-games').append(
                    `
                   <div class="col-lg-6 col-md-12 col-sm-12" id="find_col">
                       <div class="card m-2">
                           <div class="card-body">
                              <div class="row">
                                <div class="col-4">
                                 <img src='css/image-${35}.jpg' id="image_logo">
                                </div> 
                                <div class="col" id="header">
                                  <h5 class="card-title">${game.title}</h5>
                                  <p class="card-text text-muted" id="game_platform">${game.platform}</p>
                                </div>
                                 <div class="col-1">

                                 <span class="float-right text-success">${icon} </span>
                                 </div>
                              </div>
                           </div>
                           
                           <div class="card-footer text-muted">
                             <span>Genre:${game.genre}</span>
                             <span class="float-right">${game.score}</span>
                           </div>
                        </div>
                   </div>

                    `
                )
            }
        })
    });
}


var Totalitems = 2499;
var itemsPerPages = 4;
var itemsofLastPage = (Totalitems % itemsPerPages);
var TotalPages = Math.ceil(Totalitems / itemsPerPages);
var FastBtn = 10;

function refreshPagination(num) {
    if (num === TotalPages) {
        var start = itemsPerPages * (num - 1);
        var end = start + itemsofLastPage;
    } else {
        var start = itemsPerPages * (num - 1);
        var end = start + itemsPerPages;
    }

    $('#input').val('')
    $('#row-games').html('')
    $('#score_input').val('')
    while (start < end) {
        if (store_editors_choice[start] === 'Y') {
            icon = '⭐️'
        } else {
            icon = '';
        }
        if (start < 40) {
            var m = start + 1;
        } else {
            var m = 37;
        }

        $('#row-games').append(
            `
                   <div class="col-lg-6 col-md-12 col-sm-12" id="find_col">
                       <div class="card m-2">
                           <div class="card-body">
                              <div class="row">
                                <div class="col-4">
                                 <img src='css/image-${m}.jpg' id="image_logo">
                                </div> 
                                <div class="col" id="header">
                                  <h5 class="card-title">${store_title[start]}</h5>
                                  <p class="card-text text-muted" id="game_platform">${store_platform[start]}</p>
                                </div>
                                 <div class="col-1">

                                 <span class="float-right text-success">${icon}</span>
                                 </div>
                              </div>
                           </div>
                          
                           <div class="card-footer text-muted">
                             <span>Genre:${store_genre[start]}</span>
                             <span class="float-right">${store_score[start]}</span>
                           </div>
                        </div>
                   </div>

                    `
        )
        start++;

    }
}


function PageReader(num) {
    if (num == 0) {
        $('#page_reader').html('')
        $('#page_reader').append(`
        <span> Complete ${Totalitems} Games</span>
        `)
    } else {
        $('#page_reader').html('')
        $('#page_reader').append(`
    <span> Page </span>
    <span id="page_number">${num}</span>
    <span>of &nbsp; ${TotalPages}</span>
    `)
    }
}

$(() => {
    getUsers((games) => refreshUsers(games))
    getUsers((games) => searchEngine(games))
    getUsers((games) => FilterSort(games))
    PageReader(num);
    $('#next_btn').click(function() {
        if (num < TotalPages) {

            num++;
            refreshPagination(num);
            PageReader(num);
        }

    })
    $('#next_fast_btn').click(function() {
        if (num < (TotalPages - FastBtn)) {

            num = num + 10;
            refreshPagination(num)
            PageReader(num);
        }

    })
    $('#previous_btn').click(function() {
        if (num >= 2) {
            num--;
            refreshPagination(num)
            PageReader(num);

        }
    })
    $('#previous_fast_btn').click(function() {
        if (num >= FastBtn + 1) {

            num = num - 10;
            refreshPagination(num)
            PageReader(num);
        }

    })
    $('#clear_input').click(function() {
        refreshPagination(num)
        PageReader(num);
    })


})