import React from 'react';
import PropTypes from 'prop-types';
import MaterialInput from '@material-ui/core/Input/Input';
import MaterialInputLabel from '@material-ui/core/InputLabel/InputLabel';
import MaterialFormControl from '@material-ui/core/FormControl/FormControl';
import _ from 'lodash';

class Input extends React.Component {
  render() {
    const {name, type, value, onChange} = this.props;
    return (
      <MaterialFormControl margin="normal" required fullWidth>
        <MaterialInputLabel htmlFor={name}>{_.capitalize(name)}</MaterialInputLabel>
        <MaterialInput
          id={name}
          name={name}
          type={type}
          autoComplete={name}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </MaterialFormControl>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Input;