window.onload = function () {

    var background_vale = chrome.extension.getBackgroundPage()
    var submit_btn = $("#submit_btn")
    var stop_btn = $("#stop_btn")
    var money = $("#value_money")
    var column = $("input[name='value_column']:checked")
    var xz_num = $("input[name='xz_num']:checked")
    var quick_select_checkbox = $(".quick_select_checkbox")
    var quick_select_num = document.querySelector(".quick_select_num_input")
    var quick_select_money = document.querySelector(".quick_select_money_input")
    var xz_time = $("#value_time")
    var columns = []


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

    {       //快选
        quick_select_checkbox.change(function () {
            if (quick_select_checkbox.attr('checked') == "checked") {
                quick_select_num.disabled = quick_select_money.disabled = false;
            } else {
                quick_select_num.disabled = quick_select_money.disabled = true;
            }

        })

        if ((background_vale.quick_select_checkbox == true) && quick_select_checkbox.attr('checked') != "checked") {
            quick_select_checkbox.click()
            quick_select_num.value = background_vale.quick_select_num
            quick_select_money.value = background_vale.quick_select_money
        } else {

        }
    }

    submit_btn.click(function () {
        columns = background_vale.column
        xz_num = $("input[name='xz_num']:checked")
        column = $("input[name='value_column']:checked") //防止失效
        console.log(quick_select_num.value)
        console.log(quick_select_money.value)

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
                    save_value(money.val(), columns, xz_time.val(), xz_num.val(), quick_select_checkbox.attr('checked') == "checked", quick_select_num.value, quick_select_money.value)

                }
            }
        }

    })

    // 转存到background值
    function save_value(money, column, xz_time, xz_num, quick_select_checkbox, quick_select_num, quick_select_money) {
        background_vale.money = money,
            background_vale.column = column,
            background_vale.xz_time = xz_time,
            background_vale.xz_num = xz_num,
            background_vale.quick_select_checkbox = quick_select_checkbox,
            background_vale.quick_select_num = quick_select_num,
            background_vale.quick_select_money = quick_select_money
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


