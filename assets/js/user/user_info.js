$(function () {
    layui.form.verify({

        //     nickname: function (value, item) {
        //         if (value.length > 6 || value.length < 1) {
        //             return '昵称长度必须在1-6位之间'
        //         }
        //     }
        // })
        nickname: [
            /^[\S]{1,6}$/, '昵称长度必须在1-6位之间'
        ]
    })

    Inituser_info();
    // 初始化用户信息
    function Inituser_info() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status == 0) {
                    layui.form.val('form_info', res.data)
                } else {
                    layui.layer.msg('获取用户信息失败！')
                }
            }
        })
    }

    //重置表单数据
    $('#btn_reset').on('click', function (e) {
        e.preventDefault();
        Inituser_info();

    })

    // 提交修改表单数据
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    layui.layer.msg('更新用户信息失败')
                }
                else {
                    layui.layer.msg('更新用户信息成功')
                    // 调用父页面中的方法
                    window.parent.getuserinfo();
                }
            }
        })
    })
})