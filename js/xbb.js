var qexo_talks = [];
var talk_page = 1;
var talk_count = 0;
var qexoFormatTime = function () {
    var format = arguments[0] !== (void 0) ? arguments[0] : "";
    var num = arguments[1] !== (void 0) ? arguments[1] : new Date().getTime();
    format = format || "YYYY-mm-dd HH:MM:SS";
    var ret,
        date,
        renum;
    if (num.toString().length == 10) {
        date = new Date(parseInt(num) * 1000);
    } else {
        date = new Date(parseInt(num));
    }
    var opt = {
        "Y": date.getFullYear().toString(),
        "m": (date.getMonth() + 1).toString(),
        "d": date.getDate().toString(),
        "H": date.getHours().toString(),
        "M": date.getMinutes().toString(),
        "S": date.getSeconds().toString()
    };
    for (var k in opt) {
        ret = new RegExp("(" + k + "+)").exec(format);
        if (ret) {
            renum = (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0"));
            format = format.replace(ret[1], renum);
        };
    };
    return format;
};

function friendlyFormatTime(stringTime) {
    var second = 1000;
    var minute = second * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var week = day * 7;
    var month = day * 30;
    var time1 = new Date().getTime(); //当前的时间戳
    var time2 = Date.parse(new Date(stringTime)); //指定时间的时间戳
    var time = time1 - time2;

    var result = null;
    if (time < 0) {
        result = "--";
    } else if (time / month >= 1) {
        result = stringTime.split(" ")[0];
    } else if (time / day >= 1) {
        result = parseInt(time / day) + "天前";
    } else if (time / hour >= 1) {
        result = parseInt(time / hour) + "小时前";
    } else if (time / minute >= 1) {
        result = parseInt(time / minute) + "分钟前";
    } else if (time / second >= 1) {
        result = parseInt(time / second) + "秒前";
    } else {
        result = "刚刚";
    }
    return result;
}

function likeQexoTalk(id, url, domid, limit) {
    var uri = url + "/pub/like_talk/";
    var ajax;
    try {
        ajax = new XMLHttpRequest();
    } catch (e) {
        try {
            ajax = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                ajax = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("糟糕,您的浏览器版本过旧，不支持此功能!");
                return false;
            }
        }
    }
    ajax.open("post", uri, true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            if (ajax.status == 200) {
                var res = JSON.parse(ajax.response);
                if (res["status"]) {
                    for (var i = 0; i < qexo_talks.length; i++) {
                        if (qexo_talks[i]["id"] == id) {
                            if (res["action"]) {
                                qexo_talks[i]["like"]++;
                                qexo_talks[i]["liked"] = true;
                            } else {
                                qexo_talks[i]["like"]--;
                                qexo_talks[i]["liked"] = false;
                            }
                            var html = '<section class="qexot"><h2><i class="fa-fw far fa-comment"></i>'+talk_count+'条胡言乱语</h2><div class="qexot-list">';
                            for (var i = 0; i < qexo_talks.length; i++) {
                                html += generateQexoTalkItem(qexo_talks[i]['id'], qexo_talks[i]['content'], qexoFormatTime("YYYY-mm-dd HH:MM:SS", Number(qexo_talks[i]['time'])), qexo_talks[i]['tags'].join(", "), qexo_talks[i]['like'], qexo_talks[i]['liked'], url, domid, limit);
                            }
                            html += '</div></section>';
                            if (document.getElementById("qexot-more")) {
                                html += '<center id="qexot-more"><div class="qexot-more" onclick="showQexoTalks(\'' + domid + '\',\'' + url + '\',\'' + limit + '\',true)">再哔哔五块钱的</div></center>';
                            }
                            document.getElementById(domid).innerHTML = html;
                            break;
                        }
                    }
                } else {
                    console.log(res["data"]["msg"]);
                }
            } else {
                console.log("点赞失败! 网络错误");
            }
        }
    };
    ajax.send("id=" + id);
}

function generateQexoTalkItem(id, content, time, tags, _like, liked, url, domid, limit) {
    tags = tags?"#"+tags:"";
    var like = liked ? ("<a class=\"qexot-like\" onclick=\"likeQexoTalk('" + id + "', '" + url + "', '" + domid + "', '" + limit + "')\"><i class=\"fa-fw fas fa-heart qexot-heart qexot-heart-liked\" ></i>" + _like + "</a>") : ("<a class=\"qexot-like\" onclick=\"likeQexoTalk('" + id + "', '" + url + "', '" + domid + "', '" + limit + "')\">\n  <i class=\"fa-fw far fa-heart qexot-heart qexot-heart-like\" ></i> " + _like + "</a>");
    var html = ("<div class=\"qexot-item\">\n  <div class=\"qexot-top\">\n    <img class=\"qexot-avatar no-lightbox\" src=\"/images/avatar.jpg\">\n    <div class=\"qexot-info\">\n<p class=\"qexot-name\">bakacai</p><p class=\"qexot-timedate\">" + friendlyFormatTime(time) + "</p></div>\n");
    if(tags != ""){
        tags = tags.split("#")[1];
        tags = tags.split(", ");
        html += ("<div class=\" qexot-tags\">");
        for (let tag in tags)
            html += ("<div class=\"qexot-tag\">#" + tags[tag] + "</div>");
        html += ("</div>");
    }
    html += (" </div>\n  <div class=\"qexot-content\">\n    <div class=\"datacont\">\n    " + content + "\n    </div>\n  </div>\n  <div class=\"qexot-bottom\">\n    <div class=\"qexot-info\">\n   </div>" + like + "</div></div>");
    return html;
}

function showQexoTalks(id, url) {
    var limit = arguments[2] !== (void 0) ? arguments[2] : 5;
    var more = arguments[3] !== (void 0) ? arguments[3] : false;
    if (more) {
        document.getElementById("qexot-more").innerHTML = "";
    } else {
        document.getElementById(id).innerHTML = '<div class="qexo_loading"><div class="qexo_part"><div style="display: flex; justify-content: center"><div class="qexo_loader"><div class="qexo_inner one"></div><div class="qexo_inner two"></div><div class="qexo_inner three"></div></div></div></div><p style="text-align: center; display: block">说说加载中...</p></div>';
    }
    var uri = url + "/pub/talks/?page=" + talk_page + "&limit=" + limit;
    var ajax;
    try {
        ajax = new XMLHttpRequest();
    } catch (e) {
        try {
            ajax = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                ajax = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("糟糕,你的浏览器不能上传文件!");
                return false;
            }
        }
    }
    ajax.open("get", uri, true);
    ajax.setRequestHeader("Content-Type", "text/plain");
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            if (ajax.status == 200) {
                var res = JSON.parse(ajax.response);
                if (res["status"]) {
                    talk_count = res["count"];
                    qexo_talks = qexo_talks.concat(res["data"]);
                    var html = '<section class="qexot"><h2><i class="fa-fw far fa-comment"></i>'+talk_count+'条胡言乱语</h2><div class="qexot-list">';
                    for (var i = 0; i < qexo_talks.length; i++) {
                        html += generateQexoTalkItem(qexo_talks[i]['id'], qexo_talks[i]['content'], qexoFormatTime("YYYY-mm-dd HH:MM:SS", Number(qexo_talks[i]['time'])), qexo_talks[i]['tags'].join(", "), qexo_talks[i]['like'], qexo_talks[i]['liked'], url, id, limit);
                    }
                    html += '</div></section>';
                    if (res["count"] > qexo_talks.length) {
                        html += '<center id="qexot-more"><div class="qexot-more" onclick="showQexoTalks(\'' + id + '\',\'' + url + '\',\'' + limit + '\',true)">再哔哔五块钱的</div></center>';
                    }
                    document.getElementById(id).innerHTML = html;
                    talk_page++;
                } else {
                    console.log(res["data"]["msg"]);
                }
            } else {
                console.log("说说获取失败! 网络错误");
            }
        }
    };
    ajax.send(null);
}