// ★プレビュー画面で動作確認をする場合
navigator.geolocation.getCurrentPosition(onSuccess, onError);

//★端末（デバッガー）で動作確認をする場合
 document.addEventListener("deviceready", onDeviceReady, false);
 function onDeviceReady() {
     navigator.geolocation.getCurrentPosition(onSuccess, onError);
 }

var currentGeo = [];

function onSuccess(position) {
    var currentLat = position.coords.latitude;
    var currentLon = position.coords.longitude;
    currentGeo = [currentLat, currentLon];
    makeMap();
    getGeoPoint();
}

function onError(error) {
    console.log("code:" + error.code + ", message:" + error.message);
}

var applicationKey = "******";
var clientKey = "******";
var ncmb = new NCMB(applicationKey, clientKey);

var GeoMemo = ncmb.DataStore("GeoMemo");

function addGeoPoint() {
    var memo = prompt("この場所についてのメモ", "");
    if (memo == null || memo == "") {
        alert("キャンセルされました");
        return
    } else {
        var geoPoint = new ncmb.GeoPoint(currentGeo[0], currentGeo[1]);
        var geoMemo = new GeoMemo();
        geoMemo.set("memo", memo)
            .set("geoPoint", geoPoint)
            .save()
            .then(function(){
                console.log("保存成功");
            })
            .catch(function(error){
                console.log("保存失敗:" + error + ", " + JSON.stringify(error));
            });
    }
}

function getGeoPoint() {
    var currentGeoPoint = new ncmb.GeoPoint(currentGeo[0], currentGeo[1]);
    GeoMemo.withinKilometers("geoPoint", currentGeoPoint, 3)
    .fetchAll()
    .then(function(results){
        console.log("取得成功");
        makeMarkers(results);
    })
    .catch(function(error){
        console.log("取得失敗:" + error + ", " + JSON.stringify(error));
    });
}