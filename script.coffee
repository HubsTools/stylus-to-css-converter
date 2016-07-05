input = document.querySelector('[data-action=input]')
output = document.querySelector('[data-action=output]')
convert = document.querySelector('[data-action=convert]')
download = document.querySelector('[data-action=download]')
clear = document.querySelector('[data-action=clear]')

# Convert Stylus2CSS
Stylus2CSS = ->
  stylus(input.value).render (err, out) ->
    if err != null
      alertify.error 'something went wrong'
    else
      output.value = out

# Convert Stylus2CSS when input changes
input.onchange = ->
  Stylus2CSS()
input.onkeyup = ->
  Stylus2CSS()

# Convert Stylus2CSS when convert button is clicked
convert.onclick = ->
  Stylus2CSS()
  
# Select all text when output is clicked
output.onclick = ->
  this.select()

# Download file
download.onclick = ->
  if !output.value
    alertify.error 'No output defined!'
  else
    alertify.prompt('Save file name', '', ((evt, value) ->
      blob = new Blob([ output.value ], type: 'text/css')
      saveAs blob, value + '.css'
    ), ->
      # User clicked cancel
      alertify.error 'Download operation aborted.'
    ).set 'basic', true

# Clear input
clear.onclick = ->
  input.value  = ''
  output.value = ''