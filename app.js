let inputs = document.querySelectorAll('input');
let cc_input = document.getElementById('input_cc');
let cardHolderName = document.querySelector('.card-name');
let btnSubmit = document.getElementById('submit');
let form = document.querySelector('form');
let inputNumbers = document.querySelectorAll('#number');
let success = document.querySelector('.success');

inputs.forEach((input) => {
  input.oninput = () => {
    input.value = cc_format(input.value);
    document.getElementById(input.name).innerText = cc_format(input.value);
  };
  input.addEventListener('focus', () => {
    input.classList.remove('red-border');
    let el = input.nextElementSibling;

    el.classList.remove('show-error');
  });
});

//Credit Card formatter in Javascript
// code taken from https://www.peterbe.com/plog/cc-formatter

function cc_format(value) {
  var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  var matches = v.match(/\d{4,16}/g);
  var match = (matches && matches[0]) || '';
  var parts = [];
  for (i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  if (parts.length) {
    return parts.join(' ');
  } else {
    return value;
  }
}

function validCC(cc_input) {
  let string = cc_input.value;
  let regExp = /[a-zA-Z]/g;
  if (regExp.test(string)) {
    cc_input.classList.add('red-border');
    let el = cc_input.nextElementSibling;
    el.innerText = 'Wrong format,numbers only';
    el.classList.add('show-error');
  } else if (cc_input.value.length < 19 && cc_input.value.length > 0) {
    cc_input.classList.add('red-border');
    let el = cc_input.nextElementSibling;
    el.innerText = 'Card number must have 16 digits!';
    el.classList.add('show-error');
  }
}

function ifEmpty(inputs) {
  inputs.forEach((input) => {
    if (input.value === '') {
      input.classList.add('red-border');
      let el = input.nextElementSibling;
      el.innerText = "Can't be blank";
      el.classList.add('show-error');
    }
  });
}

function ifNotNumber(inputs) {
  inputs.forEach((input) => {
    let string = input.value;
    let regExp = /[a-zA-Z]/g;
    let el = input.nextElementSibling;

    if (regExp.test(string)) {
      el.innerText = '';
      input.classList.add('red-border');

      el.innerText = 'Wrong format ,numbers only';
      el.classList.add('show-error');
      el.style.bottom = '-15px';
      el.style.fontSize = '0.7rem';
    }
  });
}
function chekError(inputs) {
  let newInputs = Object.values(inputs);
  return newInputs.some((input) => {
    return input.classList.contains('red-border') || input.value === '';
  });
}

btnSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  ifEmpty(inputs);
  validCC(cc_input);
  ifNotNumber(inputNumbers);

  console.log(chekError(inputs));

  setTimeout(() => {
    if (!chekError(inputs)) {
      form.classList.add('hide');
      setTimeout(success.classList.add('show-success'), 400);
    }
  }, 500);
  // form.classList.add('hide');
});
