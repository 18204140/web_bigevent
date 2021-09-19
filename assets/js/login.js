$(function () {
    // 点击注册账号链接
    $('#link_login a').on('click', function () {
        $('#link_login').hide();
        $('#link_reg').show();
    })
    //点击登录账号链接
    $('#link_reg a').on('click', function () {
        $('#link_reg').hide();
        $('#link_login').show();
    })
})

// 表单验证
// form为layui对象
layui.form.verify({
    // username: function (value, item) { //value：表单的值、item：表单的DOM对象
    //     if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
    //         return '用户名不能有特殊字符';
    //     }
    //     if (/(^\_)|(\__)|(\_+$)/.test(value)) {
    //         return '用户名首尾不能出现下划线\'_\'';
    //     }
    //     if (/^\d+\d+\d$/.test(value)) {
    //         return '用户名不能全为数字';
    //     }

    //     //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
    //     if (value === 'xxx') {
    //         alert('用户名不能为敏感词');
    //         return true;
    //     }
    // }

    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [
        /^[\S]{6,12}$/
        , '密码必须6到12位，且不能出现空格'
    ],

    repeat_pwd: function (value, item) {
        if (value != $('.reg_box [name = password]').val()) {
            return '两次密码不一致'
        }
    }
});

// 监听表单注册提交事件
$('#form_reg').on('submit', function (e) {
    e.preventDefault();
    var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() };
    $.post('/api/reguser', data
        , function (res) {

            if (res.status == 0) {
                layui.layer.msg('只想弱弱提示');
            }
            layui.layer.msg(res.message)
            $('#links_login').click();

        })
})

// 监听表单登录提交事件
$('#form_login').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
        method: 'POST',
        url: '/api/login',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status == 0) {
                layui.layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href = '/day_01/index.html'
                // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTUzOSwidXNlcm5hbWUiOiJ6emgiLCJwYXNzd29yZCI6IiIsIm5pY2tuYW1lIjoienpoIiwiZW1haWwiOiIxNThAcXEuY29tIiwidXNlcl9waWMiOiIiLCJpYXQiOjE2MzIwMzYwODMsImV4cCI6MTYzMjA3MjA4M30.L6QzTmr8NXLSEzW__fCqZnPqY1amKnyWsmkX-VBZb-0
            } else {
                layui.layer.msg('登录失败')
            }

        }
    })
})

