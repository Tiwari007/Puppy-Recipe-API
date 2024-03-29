$(document).ready(function() {
    $("#query-form").submit(function(e) {
        performSearch(e)
    })
});
var defunctDomains = ["kraftfoods.com", "cookeatshare.com", "find.myrecipes.com"];

function isADefunctSite(e) {
    var t = !1;
    return defunctDomains.forEach(function(s, r) {
        e.includes(s) && (t = !0)
    }), t
}

function formatSearchResults(e) {
    var t = JSON.parse(e),
        s = 0;
    if (0 == t.results.length) setNotFoundMessages();
    else {
        $("#search-results-heading").text("Search Results");
        var r = "";
        t.results.forEach(function(e, t) {
            if (isADefunctSite(e.href)) return;
            s++;
            var i = e.thumbnail;
            "" == i && (i = "images/generic_dish.jpg");
            const a = e.href;
            r += "<div class='dish-image-div'><a  href='" + a + "' target='_blank'><img class='dish-image' width='80' src='" + i + "' alt='recipe picture, link to recipe page'></a></div>", r += "<div class='dish-title-div'><a href='" + a + "' target='_blank'>" + e.title + "</a></div>", r += "<div class='dish-ingredients-div'>Main ingredients: " + e.ingredients + "</div>"
        }), s > 0 ? $("#results").html(r) : setNotFoundMessages()
    }
}

function performSearch(e) {
    var t;
    e.preventDefault(), t && t.abort();
    $(this);
    setFormDisabledProps(!0), $("#search-results-heading").text("Searching ..."), $("#results").text(""), (t = $.ajax({
        url: "https://recipe-puppy.p.rapidapi.com/",  // changins some API
        type: "GET",
        data: {
            i: $("#ingredients").val(),
            q: $("#contains").val()
        }
    })).done(function(e, t, s) {
        formatSearchResults(e)
    }), t.fail(function(e, t, s) {
        $("#search-results-heading").text("An error occurred. Please try again."), $("#results").text("")
    }), t.always(function() {
        setFormDisabledProps(!1)
    })
}

function resetResults() {
    $("#search-results-heading").text(""), $("#results").text("")
}

function refreshInputs() {
    var e = $("#ingredients").val();
    e = (e = e.replace(/[^a-zA-Z 0-9,]/gim, "")).trim(), $("#ingredients").val(e), e = (e = (e = $("#contains").val()).replace(/[^a-zA-Z 0-9]/gim, "")).trim(), $("#contains").val(e)
}

function setFormDisabledProps(e) {
    document.getElementById("ingredients").disabled = e, document.getElementById("contains").disabled = e, document.getElementById("resetButton").disabled = e, document.getElementById("searchButton").disabled = e
}

function setNotFoundMessages() {
    $("#search-results-heading").text("No recipes found, please change search criteria."), $("#results").text("")
}
