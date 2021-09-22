$(function () {
    getuserinfo();
})

// h获取用户信息
function getuserinfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status != 0) {
                localStorage.removeItem('token')
                location.href = '/day_01/login.html'
            }
            // console.log(res);
            avatar(res.data)
        },



    })
}

// 渲染用户头像
function avatar(user) {
    var name = user.nickname || user.username;

    $('#welcome').html('欢迎&nbsp;' + ':' + name)
    if (user.user_pic == null) {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show()
    }
    else {

        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();

    }
}

// 实现退出功能
$('.btnLogout').on('click', function () {
    layui.layer.confirm('确定退出登录吗?', { icon: 3, title: '提示' }, function (index) {
        //do something
        localStorage.removeItem('token')
        location.href = '/day_01/login.html'
        layer.close(index);
    });
})