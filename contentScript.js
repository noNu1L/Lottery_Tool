// var timer;
var sy_time = "";
var actionflag = false
var money, column, xz_num, xz_time, quick_select_checkbox, quick_select_num, quick_select_money
var temp_stop = false

setInterval(function () {
    sy_time = document.querySelector(".stoptime").innerHTML
    chrome.runtime.sendMessage(
        {
            sy_time: sy_time,
            result: 1
        },
        function (response) {
            actionflag = response.actionflag
            money = response.money
            column = response.column
            xz_num = response.xz_num
            xz_time = response.xz_time
            quick_select_checkbox = response.quick_select_checkbox
            quick_select_num = response.quick_select_num
            quick_select_money = response.quick_select_money
        }
    );

    if (actionflag) {
        if (money == "#") {
            console.log("当前时间" + time_format_m(sy_time) + ";   选取时间" + xz_time + "分钟0秒" + "|| 一字定已跳过 ||" + ";  快打:" + quick_select_checkbox + ";  快打号码:" + quick_select_num + ";  快打金额:" + quick_select_money)

        } else {
            console.log("当前时间" + time_format_m(sy_time) + ";   选取时间" + xz_time + "分钟0秒" + ";   下注金额" + money + ";   下注栏目" + column + ";" +
                "  下注个数" + xz_num + ";  快打:" + quick_select_checkbox + ";  快打号码:" + quick_select_num + ";  快打金额:" + quick_select_money)
        }
    }


    if (actionflag && (xz_time + "分钟0秒") == time_format_m(sy_time) && !temp_stop) {
        if (document.querySelector("#TabMenuBox > li:nth-child(1)").className != "active") {
            document.querySelector("#TabMenuBox > li:nth-child(1) > a").click()
            setTimeout(function () {
                select_num(money, column, xz_num)
            }, 1000)
        } else {
            select_num(money, column, xz_num)
        }

        temp_stop = true
        setTimeout(function () {
            temp_stop = false
        }, 2000)
    }

}, 500)

//固定时间刷新
setTimeout(function () {
    history.go(0)
}, 1000 * 10 * 60)


function select_num(s_money, s_column, s_xz_num) {

    if (s_money == "#") {
        quick_select(quick_select_checkbox, quick_select_num, quick_select_money)
    } else {
        var clean_sel = document.querySelectorAll(".yellow")
        var sel = document.querySelectorAll(".onefix-item")
        var ran_numbers = [];
        var column_numbers = s_column;
        var ran_i = s_xz_num;

        for (let i = 0; i < clean_sel.length; i++) {
            clean_sel[i].click()
        }

        function make_random() {
            var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            for (let i = 0; i < ran_i; i++) {
                let ran_arr_num = Math.floor(Math.random() * arr.length)
                ran_numbers.push(arr[ran_arr_num])
                arr.splice(ran_arr_num, 1)
            }

        }

        for (let i = 0; i < column_numbers.length; i++) {
            make_random()
            for (let j = 0; j < s_xz_num; j++) {
                // console.log((ran_numbers[j] + (column_numbers[i] * 10)));
                sel[(ran_numbers[j] + (column_numbers[i] * 10))].click()
            }
            ran_numbers = [];
        }

        // //改变金额
        $("#Money").val("")  //清空
        $('#Money').trigger({type: 'keydown', key: s_money + ""});

        //确认
        setTimeout(function () {
            document.querySelectorAll(".btn")[1].click()
            quick_select(quick_select_checkbox, quick_select_num, quick_select_money)
        }, 500)
    }
}

function quick_select(quick_select_checkbox, quick_select_num, quick_select_money) {
    if (quick_select_checkbox == true) {
        document.querySelector("#TabMenuBox > li:nth-child(3) > a").click()
        setTimeout(function () {
            $("#NumberFastBeat").val("")
            $('#NumberFastBeat').trigger({type: 'keydown', key: quick_select_num.substr(0, 4) + ""});
            $("#SumFastBeat").val("")
            $('#SumFastBeat').trigger({type: 'keydown', key: quick_select_money + ""});
            if (quick_select_num.charAt(quick_select_num.length - 1) == "#") {
                document.querySelector("#QZCheckbox").click()
            }
            setTimeout(function () {
                document.querySelector("#confirm").click()
            }, 200)
        }, 1000)

    }
}

function time_format_m(y_time) {
    return y_time.substr(25, 5)
}
