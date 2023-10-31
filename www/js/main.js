
//APIキーの設定
let applicationKey ="40a02906910cd5b4d5bd87115f778b6db6b4c5bd096e6754885d54e1c468975a";
let clientKey ="0677328ab255d58390710d47771195e531a67aaba111c13d6918e8cb8e3d1499"

let ncmb = new NCMB(applicationKey,clientKey);

let TestClass2 = ncmb.DataStore("TestClass2");
let testClass2 = new TestClass2();

testClass2.set("message","Hello,NCMB!").save();