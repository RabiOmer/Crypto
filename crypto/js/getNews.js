var GetNews = function(){
    var init = function(){
            getNewsApi();
            var inter = setInterval(getNewsApi,60*1000*30);
        };
    var getNewsApi = function(){
        $.ajax({
            url:'https://newsapi.org/v2/everything?sources=crypto-coins-news&apiKey=cbd3915999324d548677fef3e94f945f',
            method:'get',
            dataType: 'json'
        }).done(function(r){
            appendNews(r);
        })

        }
    var appendNews = function(r){
        $('#news-title').html('');
        $('#news').html('');
        var img ,url,title,dis,time,author;
        for(var i=0;i<5;i++){
            img = r.articles[i].urlToImage;
            title = r.articles[i].title;
            url = r.articles[i].url;
            dis = r.articles[i].description;
            time = r.articles[i].publishedAt;
            author = r.articles[i].author;
            $newsList =$('<div class="articl"><h3>'+title+'</h3><img src="'+img+'"><p>'+dis+'<span><a  target="_blank" href="'+url+'">Read More</a></span></p><p>This article was written by '+author+' at '+time+'</p>');
            $('#news').append($newsList);
        }
        for(var i=5;i<r.articles.length;i++){
            $list = $('<div><a href="'+r.articles[i].url+'">'+r.articles[i].title+'</a></div>');
            $('#news-title').append($list);
        }
        $('#load-t').hide();
        $('#news').show();
    }
    init();

};