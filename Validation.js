// Object Validator
function Validator(options) {
    function validate (inputElement, rule) {
        var errorElement =inputElement.parentElement.querySelector(options.errorSelector);
        var errorMessage = rule.test(inputElement.value)
        
        if(errorMessage) {
            inputElement.parentElement.classList.add('invalid')
            errorElement.innerText = errorMessage;
        } else {
            inputElement.parentElement.classList.remove('invalid')
            errorElement.innerText = '';
        }
    };

    var formElement= document.querySelector(options.form);
    // console.log(options.rules);

    if (formElement) {
        options.rules.forEach(function (rule) {
            var inputElement= formElement.querySelector(rule.selector);

            if(inputElement) {
                inputElement.onblur = function() {
                    validate(inputElement, rule);
                }

                inputElement.oninput= function() {
                    var errorElement =inputElement.parentElement.querySelector(options.errorSelector);
                    inputElement.parentElement.classList.remove('invalid')
                    errorElement.innerText = '';
                }
            }
        })
    };
};

// tao rules
Validator.isRequired= function(selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : 'Vui lòng nhập tên cửa hàng'
        }
    };
};

Validator.isEmail= function(selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value)?undefined: message || 'Nhập Email không chính xác';
        }
    };
}

Validator.dressLength= function(selector, min, max ) {
    return {
        selector: selector,
        test: function (value) {
            if(value.length >= min && value.length <= max) {
                return undefined;
            } else {
                return `Vui Lòng nhập tối thiểu ${min} ký tự và tối đa ${max} ký tự`;
            }
        }
    };
};

Validator.numberLength= function(selector, min, max) {
    return {
        selector: selector,
        test: function (value) {
            if(value.length >= min && value.length <= max && typeof value === 'number') {
                return undefined;
            } else {
                return `Vui Lòng nhập tối thiểu ${min} số và tối đa ${max} số`;
            }
        }
    };
};

//reset form  ( thẻ button không support reset()- thẻ input thì support reset() )
function myFunction() {
    document.getElementById("form-1").reset();
  }