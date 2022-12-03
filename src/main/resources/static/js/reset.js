var email = "username@example.com";

// 正則表達式，用於檢查電子郵件地址的格式
var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// 檢查電子郵件地址是否符合格式
if (emailRegex.test(email)) {
    // 顯示電子郵件地址
    console.log(email);
} else {
    // 顯示錯誤訊息
    console.log("Invalid email address");
}