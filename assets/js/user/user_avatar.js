$(function () {
    var layer = layui.layer

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)



    //上传文件绑定事件
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })
    //上传头像
    $('#file').on('change', function () {
        if ($(this)[0].files.length === 0) {
            layer.msg('请选择要上传的图片')
        } else {
            // 1.拿到用户选择的文件
            var file = $(this)[0].files[0]
            // 2.将文件转为url路径
            var imageUrl = URL.createObjectURL(file);
            // 3.重新初始化裁剪区域
            $image.cropper('destroy') //销毁旧的裁剪区域
                .attr('src', imageUrl) //重新设置图片路径
                .cropper(options) //重新初始化裁剪区域
        }
    })
})
