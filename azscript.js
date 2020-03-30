//by Azer Sadykhzadeh
//https://github.com/sadykhzadeh
function kvadratnoye_uravneniye() {
    var a = prompt("Введите a в уравнении ax2 + bx + c= 0", "");
    if (a != Null) {
        var b = prompt("Введите b в уравнении ax2 + bx + c= 0", "");
        if (b != Null) {
            var c = prompt("Введите c в уравнении ax2 + bx + c= 0", "");
            if (c != Null) {
                var d = b * b - 4 * a * c;
                var xz = (-b + Math.sqrt(d)) / (2 * a);
                var xx = (-b - Math.sqrt(d)) / (2 * a);
                alert("Дискриминант D = " + d);
                if (d > 0) {
                    alert("Поэтому данное квадратное уравнение будет иметь два корня: " + Math.min(xz, xx) + " и " + Math.max(xz, xx));
                }
                if (d === 0) {
                    alert("Поэтому данное квадратное уравнение будет иметь один корень: " + xz);
                }
                if (d < 0) {
                    alert("Поэтому данное квадратное уравнение не будет иметь корней");
                }
            }
        }
    }
}

function svoistvo() {
    var text = [""];
    var a = prompt("Введите число: ", "");
    text += ("Вы ввели число: " + a + "\n");
    if (Math.abs(a) != 1) {
        var sum = 0,
            temp, alla = a,
            alla2 = a;
        a = Math.abs(a);
        while (a !== 0) {
            temp = a % 10;
            sum += temp;
            a = (a - temp) / 10;
        }
        text += ("Сумма цифр данного числа равна: " + sum + "\n");
        var pro = 1;
        if (alla === 0) pro = 0;
        else {
            alla = Math.abs(alla);
            while (alla !== 0) {
                if ((alla % 10) !== 0) {
                    pro *= (alla % 10);
                }
                alla = (alla - (alla % 10)) / 10;
            }
        }
        text += ("Произведение цифр данного числа равна: " + pro + "\n");
        var n = alla2;
        var y = 0,
            d, m, p = 1,
            p1, q = 0;
        var n1, nf, b, ns;
        n1 = nf = b = Math.abs(n);
        ns = n;
        var a1 = 2;
        if (n1 === 0) {
            text += ("На это число нельзя делить ;)" + "\n");
        } else {
            if (ns !== 0 && ns !== 1 && ns !== 2) {
                if (ns < 0) {
                    text += ("Это отрицательное ");
                } else if (ns > 0) {
                    text += ("Это положительное ");
                }
                ns = Math.abs(ns);
            }
            if (ns == 2 || ns == -2) {
                text += ("простое число." + "\n");
            } else {
                while (a1 != ns) {
                    if (ns % a1 === 0) {
                        text += ("составное число делится без остатка: " + "\n");
                        break;
                    } else a1++;
                }
                if (ns - a1 === 0) {
                    text += ("простое число." + "\n");
                }
            }
            if (ns - a1 !== 0) {
                a1 = 2;
                var stu = 1;
                while (a1 <= (ns / 2)) {
                    if (ns % a1 === 0) {
                        text += (stu + ") на " + a1 + "    ");
                        stu++;
                    }
                    a1++;
                }
            }
        }
        text += ("\n" + "Спасибо за использование программы" + "\n" + "by Azer Sadykhzadeh");
        alert(text);
    } else alert("Это число 1(или -1), информации о них, думаю, писать не имеет смысла :)")
}


function to_roman() {
    var n = prompt("Введите арабское число \n Например 46");
    var num = parseInt(n);
    var ans = "";
    if (num > 3888) {
        return "Invalid #";
    }
    if (num >= 1000) {
        while (num >= 1000) {
            ans += "M";
            num -= 1000
        }
    }
    if (num >= 900) {
        ans += "CM";
        num -= 900;
    } else if (num >= 500) {
        ans += "D";
        num -= 500;
    } else if (num >= 400) {
        ans += "CD";
        num -= 400;
    }
    if (num >= 100) {
        while (num >= 100) {
            ans += "C";
            num -= 100;
        }
    }
    if (num >= 90) {
        ans += "XC";
        num -= 100;
    } else if (num >= 50) {
        ans += "L";
        num -= 50;
    } else if (num >= 40) {
        ans += "XL";
        num -= 40;
    }
    if (num >= 10) {
        while (num >= 10) {
            ans += "X";
            num -= 10;
        }
    }
    if (num >= 9) {
        ans += "IX";
        num -= 9;
    } else if (num >= 5) {
        ans += "V";
        num -= 5;
    } else if (num >= 4) {
        ans += "IV";
        num -= 4;
    }
    if (num >= 1) {
        while (num >= 1) {
            ans += "I";
            num -= 1;
        }
    }
    alert("Арабское число: " + n + "\n" + "Римское число: " + ans);

}

function from_roman() {
    var n = prompt("Введите римское число" + "\n" + "Например, X (английская раскладка)");
    var num = n;
    var ans = 0;
    for (a = 0; a < num.length; a++) {
        if (num[a] == "M") {
            ans += 1000;
        } else if (num[a] == "C" && num[a + 1] == "M") {
            ans += 900;
            a += 1;
        } else if (num[a] == "D") {
            ans += 500;
        } else if (num[a] == "C" && num[a + 1] == "D") {
            ans += 400;
            a += 1;
        } else if (num[a] == "C") {
            ans += 100;
        } else if (num[a] == "X" && num[a + 1] == "C") {
            ans += 90;
            a += 1;
        } else if (num[a] == "L") {
            ans += 50;
        } else if (num[a] == "X" && num[a + 1] == "L") {
            ans += 40;
            a += 1;
        } else if (num[a] == "X") {
            ans += 10;
        } else if (num[a] == "I" && num[a + 1] == "X") {
            ans += 9;
            a += 1;
        } else if (num[a] == "V") {
            ans += 5;
        } else if (num[a] == "I" && num[a + 1] == "V") {
            ans += 4;
        } else if (num[a] == "I") {
            ans += 1;
        }
    }
    alert("Римское число: " + n + "\n" + "Арабское число: " + ans);

}