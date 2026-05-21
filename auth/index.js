// 页面切换
const container = document.querySelector('#container');
const signInButton = document.querySelector('#signIn');
const signUpButton = document.querySelector('#signUp');

signUpButton.addEventListener('click',() => container.classList.add('right-panel-active'))
signInButton.addEventListener('click',() => container.classList.remove('right-panel-active'))

// 注册函数 
function register(event) {
    // 阻止页面刷新跳转
    event.preventDefault();

    //先校验验证码
    let inputCode = document.getElementById('verifyInput').value.trim();
    if (inputCode !== currentCode) {
        alert('验证码错误！请重新输入');
        generateCode(); // 错误后刷新验证码
        return false;
    }

    // 精准获取带id的输入框的值
    let username = document.getElementById('regUsername').value.trim();
    let pwd = document.getElementById('regPwd').value.trim();
    let email = document.getElementById('regEmail').value.trim();

    // 非空校验
    if (!username || !pwd || !email) {
        alert('请填写完整账号、密码、邮箱！');
        return false;
    }
    // 获取本地用户列表，如果没有则初始化为空数组
    let userList = JSON.parse(localStorage.getItem('userList')) || [];
    // 检查用户名是否已存在
    let hasUser = userList.some(item => item.username === username);
    if(hasUser) {
        alert('用户名已存在，请重新输入！');
        return false;
    }

    // 组装新用户信息对象
    let newUser = {
        username: username,
        password: pwd,
        email: email
    };
    userList.push(newUser);

    // 数组存本地
    localStorage.setItem('userList', JSON.stringify(userList));

    // 控制台打印用户信息
    console.log(' 注册成功,当前所有用户： ',userList);

    alert('注册成功！请前往登录');
    // 自动切回登录界面
    container.classList.remove('right-panel-active');
    return true;
}

// 登录校验函数
function checkLogin(event){
    event.preventDefault()
    var name = document.getElementById('name').value.trim()
    var password = document.getElementById('password').value.trim()

    if(!name){
        alert('请输入您的用户名')
        return
    }else if(!password){
        alert('请输入您的密码')
        return
    }
     // 取出所有用户
    let userList = JSON.parse(localStorage.getItem('userList')) || [];

     // 判断账号是否未注册，未注册提示并跳回注册页面
    if(userList.length === 0 ){
        alert('该账号未注册，请先注册');
        container.classList.add('right-panel-active');
        return;
    }

   // 查找匹配用户
    let loginUser = userList.find(item=>item.username === name && item.password === password);
      if(!loginUser){
        alert('用户名或密码错误！');
        return;
    }
   
    // JSON字符串转回JS对象
    // let user = JSON.parse(saveUser);

   // 登录成功
    document.cookie = "loginStatus=success;max-age="+7*24*60*60+";path=/";
    alert('登录成功')
    window.location.href = '../index.html';
}

// 保存当前正确验证码(全局)
let currentCode = '';

// 生成4位随机数字验证码
function generateCode() {
  let code = '';
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  currentCode = code;
  //显示到页面
  document.getElementById('codeBox').innerText = code;
}

// 绑定事件
document.getElementById('send_code').addEventListener('click', function() {
  generateCode();
  alert('验证码已生成：' + currentCode + '（模拟发送）');
});
document.getElementById('codeBox').addEventListener('click', function(){
    generateCode();
})

// 页面加载时先生成一个初始验证码
window.onload = function() {
  generateCode();
}
