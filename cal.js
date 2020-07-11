console.log("start.........");
var exp = "(+ 2 7)";

function isNumberChar(char) {
    if (!char) {
        return false;
    }
    var charCode = char.charCodeAt(0);
    return charCode >= 48 && charCode <= 57;
}
var Types = {
    LEFT_BRACKET: 'LEFT_BRACKET',
    RIGHT_BRACKET: 'RIGHT_BRACKET',
    PLUS: 'PLUS',
    MINUS: 'MINUS',
    MULTIPLE: 'MULTIPLE',
    DIVISION: 'DIVISION',
    NUMBER: 'NUMBER',

    BLANK: 'BLANK',
    ERROR: 'ERROR',
    END: 'END',
}

function Token(type, value) {
    this.type = type;
    this.value = value;
}

function Exp(exp) {
    var i = 0;

    function readToken() {

        var char = exp[i++];


        if (char === ' ') {
            return new Token(Types.BLANK, char);
        } else if (char === '(') {
            return new Token(Types.LEFT_BRACKET, char);
        } else if (char === ')') {
            return new Token(Types.RIGHT_BRACKET, char);

        } else if (char === '+') {
            return new Token(Types.PLUS, char);

        } else if (char === '-') {
            return new Token(Types.MINUS, char);

        } else if (char === '*') {
            return new Token(Types.MULTIPLE, char);

        } else if (char === '/') {
            return new Token(Types.DIVISION, char);

        } else if (isNumberChar(char)) {
            var chars = [char];
            for (; i < exp.length; i++) {
                char = exp[i];
                if (isNumberChar(char)) {
                    chars.push(char);
                } else if (char === '.') {
                    if (exp[i - 1] === '.') {
                        return new Token(Types.ERROR, "不允许连续两个小数点" + i);
                    } else {
                        chars.push(char);
                    }
                } else {
                    break;
                }
            }
            if (chars[chars.length - 1] === '.') {
                return new Token(Types.ERROR, "数值不能已小数点结尾");
            }
            return new Token(Types.NUMBER, chars.join(''));
        } else if (i >= exp.length) {

            return new Token(Types.END, '');
        } else {
            console.error("非法字符【" + char + "】", exp, i);
            return new Token(Types.ERROR, char);
        }


    }

    function desc() {
        var tokens = [];
        while (true) {
            var token = readToken();
            if (token.type === Types.BLANK) {
                console.log("空格...");
                continue;
            } else if (token.type === Types.ERROR) {
                console.log(token.value);
            } else if (token.type === Types.END) {
                console.log("read end...");
                console.log(tokens);
                return;
            }
            tokens.push(token);
        }
    }

    desc();
}
console.log("end...........");