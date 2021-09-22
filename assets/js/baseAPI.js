// 注意：每次调用$.get()  $.post()  $.ajax()请求时，
//会先调用ajaxPrefilter这个函数
//在这个函数中，可以拿到我们给ajax提供的配置对象

$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    // console.log(options.url);

    // 统一为有权限的接口，设置请求头
    if (options.url.indexOf('/my/') != -1) {
        options.headers = { Authorization: localStorage.getItem('token') || '' }

    }
})


