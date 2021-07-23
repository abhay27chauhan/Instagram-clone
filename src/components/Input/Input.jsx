import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

function CustomInput({ name, handleChange, label, half, autoFocus, type, handleShowPassword, value }) {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                autoComplete="off"
                name={name}
                value={value}
                onChange={handleChange}
                variant={name === "comment" ? "standard" : "outlined"}
                required={name !== "comment" ? true : false}
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type === 'password' ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                } : null}
            />
        </Grid>
    )
}

export default CustomInput;
