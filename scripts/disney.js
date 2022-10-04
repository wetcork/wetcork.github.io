function main()
{
    var url = document.getElementById("disney-url").value;
    var disney_id = get_disney_id(url);
    var movie = is_movie(url);

    var region = document.getElementById("disney-region").value;
    var lang = document.getElementById("disney-language").value;

    if (movie){
        get_images_movie(disney_id, region, lang);
    }
    else {
        get_images_serie(disney_id, region, lang);
    }
}

function get_disney_id(url){
    if (url.startsWith("https://www.disneyplus.com")){
        var disney_id = url.split("/")[6];
        return disney_id;
    }
    else if (url.startsWith("www.disneyplus.com")){
        var disney_id = url.split("/")[4];
        return disney_id;
    }
}

function is_movie(url){
    if (url.startsWith("https://www.disneyplus.com")){
        var movie = url.split("/")[4];
    }
    if (url.startsWith("www.disneyplus.com")){
        var movie = url.split("/")[2];
    }
    
    if (movie == "movies"){
        return true;
    }
    else {
        return false;
    }
}

function get_images_movie(disney_id, region, lang)
{
    const corsProxy = "https://crossorigin-originchanger.herokuapp.com/";
    const url = "https://disney.content.edge.bamgrid.com/svc/content/DmcVideoBundle/version/5.1/region/" + region + "/audience/k-false,l-true/maturity/1850/language/" + lang + "/encodedFamilyId/" + disney_id;
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", corsProxy + url, true);
    xhr.setRequestHeader("X-Requested-With", "WetDisneyScraper");
    xhr.setRequestHeader("Cors-Origin-Set", "https://www.disneyplus.com");
    xhr.onload = function() {
        var json_data =  JSON.parse(xhr.responseText);

        //var title = json_data["data"]["DmcVideoBundle"]["video"]["text"]["title"]["full"]["program"]["default"]["content"];
        //var year =  json_data["data"]["DmcVideoBundle"]["video"]["releases"][0]["releaseYear"];
        //document.getElementById("content").insertAdjacentHTML("beforeend", `<h2>${title} (${year})</h2>`);

        try {
            var poster_portrait = json_data["data"]["DmcVideoBundle"]["video"]["image"]["tile"]["0.71"]["program"]["default"]["url"];
            insert_card("Poster", poster_portrait);
        } catch(e){}
        try {
            var poster_landscape = json_data["data"]["DmcVideoBundle"]["video"]["image"]["tile"]["1.78"]["program"]["default"]["url"];
            insert_card("Poster 16:9", poster_landscape);
        } catch(e){}
        try {
            var poster_43 = json_data["data"]["DmcVideoBundle"]["video"]["image"]["tile"]["1.33"]["program"]["default"]["url"];
            insert_card("Poster 4:3", poster_43);
        } catch(e){}
        try {
            var logo = json_data["data"]["DmcVideoBundle"]["video"]["image"]["title_treatment"]["1.78"]["program"]["default"]["url"];
            insert_card("Logo", logo);
        } catch(e){}
        try {
            var logo_v2 = json_data["data"]["DmcVideoBundle"]["video"]["image"]["title_treatment_centered"]["1.78"]["program"]["default"]["url"];
            insert_card("Logo [v2]", logo_v2);
        } catch(e){}
        try {
            var background = json_data["data"]["DmcVideoBundle"]["video"]["image"]["background"]["1.78"]["program"]["default"]["url"];
            insert_card("Background", background);
        } catch(e){}
        try {
            var background_V2 = json_data["data"]["DmcVideoBundle"]["video"]["image"]["background_details"]["1.78"]["program"]["default"]["url"];
            insert_card("Background [v2]", background_V2);
        } catch(e){}
        try {
            var background_V3 = json_data["data"]["DmcVideoBundle"]["video"]["image"]["background_up_next"]["1.78"]["program"]["default"]["url"];
            insert_card("Background [v3]", background_V3);
        } catch(e){}
        try {
            var background_43 = json_data["data"]["DmcVideoBundle"]["video"]["image"]["background"]["1.33"]["program"]["default"]["url"];
            insert_card("Background 4:3", background_43);
        } catch(e){}
        try {
            var background_43_V2 = json_data["data"]["DmcVideoBundle"]["video"]["image"]["background_details"]["1.33"]["program"]["default"]["url"];
            insert_card("Background 4:3 [v2]", background_43_V2);
        } catch(e){}
        try {
            var background_43_V3 = json_data["data"]["DmcVideoBundle"]["video"]["image"]["background_up_next"]["1.33"]["program"]["default"]["url"];
            insert_card("Background 4:3 [v3]", background_43_V3);
        } catch(e){}
    };
    xhr.send(null);
}

function get_images_serie(disney_id, region, lang)
{
    const corsProxy = "https://crossorigin-originchanger.herokuapp.com/";
    const url = "https://disney.content.edge.bamgrid.com/svc/content/DmcSeriesBundle/version/5.1/region/" + region + "/audience/k-false,l-true/maturity/1850/language/" + lang + "/encodedSeriesId/" + disney_id;
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", corsProxy + url, true);
    xhr.setRequestHeader("X-Requested-With", "WetDisneyScraper");
    xhr.setRequestHeader("Cors-Origin-Set", "https://www.disneyplus.com");
    xhr.onload = function() {
        var json_data =  JSON.parse(xhr.responseText);

        //var title = json_data["data"]["DmcVideoBundle"]["video"]["text"]["title"]["full"]["program"]["default"]["content"];
        //var year =  json_data["data"]["DmcVideoBundle"]["video"]["releases"][0]["releaseYear"];
        //document.getElementById("content").insertAdjacentHTML("beforeend", `<h2>${title} (${year})</h2>`);

        try {
            var poster_portrait = json_data["data"]["DmcSeriesBundle"]["series"]["image"]["tile"]["0.71"]["series"]["default"]["url"];
            insert_card("Poster", poster_portrait);
        } catch(e){}
        try {
            var poster_landscape = json_data["data"]["DmcSeriesBundle"]["series"]["image"]["tile"]["1.78"]["series"]["default"]["url"];
            insert_card("Poster 16:9", poster_landscape);
        } catch(e){}
        try {
            var poster_43 = json_data["data"]["DmcSeriesBundle"]["series"]["image"]["tile"]["1.33"]["series"]["default"]["url"];
            insert_card("Poster 4:3", poster_43);
        } catch(e){}
        try {
            var logo = json_data["data"]["DmcSeriesBundle"]["series"]["image"]["title_treatment"]["1.78"]["series"]["default"]["url"];
            insert_card("Logo", logo);
        } catch(e){}
        try {
            var logo_v2 = json_data["data"]["DmcSeriesBundle"]["series"]["image"]["title_treatment_centered"]["1.78"]["series"]["default"]["url"];
            insert_card("Logo [v2]", logo_v2);
        } catch(e){}
        try {
            var background = json_data["data"]["DmcSeriesBundle"]["series"]["image"]["background"]["1.78"]["series"]["default"]["url"];
            insert_card("Background", background);
        } catch(e){}
        try {
            var background_V2 = json_data["data"]["DmcSeriesBundle"]["series"]["image"]["background_details"]["1.78"]["series"]["default"]["url"];
            insert_card("Background [v2]", background_V2);
        } catch(e){}
        try {
            var background_V3 = json_data["data"]["DmcSeriesBundle"]["series"]["image"]["background_up_next"]["1.78"]["series"]["default"]["url"];
            insert_card("Background [v3]", background_V3);
        } catch(e){}
        try {
            var background_43 = json_data["data"]["DmcSeriesBundle"]["series"]["image"]["background"]["1.33"]["series"]["default"]["url"];
            insert_card("Background 4:3", background_43);
        } catch(e){}
        try {
            var background_43_V2 = json_data["data"]["DmcSeriesBundle"]["series"]["image"]["background_details"]["1.33"]["series"]["default"]["url"];
            insert_card("Background 4:3 [v2]", background_43_V2);
        } catch(e){}
        try {
            var background_43_V3 = json_data["data"]["DmcSeriesBundle"]["series"]["image"]["background_up_next"]["1.33"]["series"]["default"]["url"];
            insert_card("Background 4:3 [v3]", background_43_V3);
        } catch(e){}
    };
    xhr.send(null);
}

function insert_card(imgType, imgUrl)
{
    var newDiv = `<div class="card border-info mb-3" style="max-width: 20rem;"><div class="card-header">${imgType}</div><div class="card-body"><a target=”_blank” href="${imgUrl}"><img style="max-width: 100%;" src="${imgUrl + "/scale?width=500"}"></a></div></div>`;
    document.getElementById("images-row").insertAdjacentHTML("afterbegin", newDiv);
}