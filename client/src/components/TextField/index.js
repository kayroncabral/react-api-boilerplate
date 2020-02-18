import React from 'react'
import TextFieldBase from '@material-ui/core/TextField'

const TextField = ({ input: { name, onChange, value, ...restInput }, helperText, meta, ...rest }) => (
  <TextFieldBase
    {...rest}
    name={name}
    helperText={helperText && (meta.touched ? meta.error : undefined)}
    error={!!meta.error && meta.touched}
    inputProps={restInput}
    onChange={onChange}
    value={value}
  />
)

export default TextField
