var Stylus2CSS, clear, convert, download, input, output;

input = document.querySelector('[data-action=input]');

output = document.querySelector('[data-action=output]');

convert = document.querySelector('[data-action=convert]');

download = document.querySelector('[data-action=download]');

clear = document.querySelector('[data-action=clear]');

Stylus2CSS = function() {
  return stylus(input.value).render(function(err, out) {
    if (err !== null) {
      return alertify.error('something went wrong');
    } else {
      return output.value = out;
    }
  });
};

input.onchange = function() {
  return Stylus2CSS();
};

input.onkeyup = function() {
  return Stylus2CSS();
};

convert.onclick = function() {
  return Stylus2CSS();
};

output.onclick = function() {
  return this.select();
};

download.onclick = function() {
  if (!output.value) {
    return alertify.error('No output defined!');
  } else {
    return alertify.prompt('Save file name', '', (function(evt, value) {
      var blob;
      blob = new Blob([output.value], {
        type: 'text/css'
      });
      return saveAs(blob, value + '.css');
    }), function() {
      return alertify.error('Download operation aborted.');
    }).set('basic', true);
  }
};

clear.onclick = function() {
  input.value = '';
  return output.value = '';
};
