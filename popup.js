window.onload = function () {

    // { //第一次获取时间
    //     send_to_contentScript()
    // }

    var background_vale = chrome.extension.getBackgroundPage()
    var submit_btn = $("#submit_btn")
    var stop_btn = $("#stop_btn")
    var money = $("#value_money")
    var column = $("input[name='value_column']:checked")
    var xz_num = $("input[name='xz_num']:checked")
    var xz_time = $("#value_time")
    var columns = []
    // var actionflag = false

    //使用background值
    money.val(background_vale.money)
    xz_time.val(background_vale.xz_time)

    deal_column();
    $("input[name='xz_num']").eq((background_vale.xz_num - 6)).click(); //6:0 7:1 8:2 9:3

    function deal_column() {
        for (let i = 0; i < background_vale.column.length; i++) {
            $("input[name='value_column']").eq(background_vale.column[i]).click();
        }
    }


    submit_btn.click(function () {
        columns = background_vale.column
        xz_num = $("input[name='xz_num']:checked")
        column = $("input[name='value_column']:checked") //防止失效
        // xz_num = $("input[name='xz_num']:checked") //6:0 7:1 8:2 9:3


        if (null_vale(money)) {
            alert("金额不能为 空 或 0 ")
        } else {
            if (xz_time.val() == null) {
                alert("时间不能为 空 ")
            } else {
                if (null_vale(column)) {
                    alert("下注的栏目不能为 空 ")
                } else {
                    columns = []
                    for (let i = 0; i < column.size(); i++) {
                        columns.push(column[i].value - 1)
                    }
                    background_vale.actionflag = true
                    save_value(money.val(), columns, xz_time.val(), xz_num.val())

                }
            }
        }

    })

    // 转存到background值
    function save_value(money, column, xz_time, xz_num) {
        background_vale.money = money,
            background_vale.column = column,
            background_vale.xz_time = xz_time,
            background_vale.xz_num = xz_num

    }

    stop_btn.click(function () {
        background_vale.actionflag = false
    })


    //空值判断
    function null_vale(obj) {
        if (obj.val() == null || obj.val() == undefined || obj.val() == 0) {
            return true
        }
    }

    setInterval(function () {
        $(".p_now_time")[0].innerHTML = background_vale.sy_time
        // console.log(background_vale.sy_time);
    }, 100)

}


