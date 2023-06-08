import React from 'react'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useFormContext } from "react-hook-form"

const Input = ({ label, name, validate}) => {

    const { register, formState: { errors } } = useFormContext()

    return (
        <>
            <Typography color="#616161" sx={{ fontWeight: 'bold', fontSize: 14 }}>{label}</Typography>
            <TextField sx={{ mb: 0.5 }}
                name={name}
                error = {errors[name] ? true : false}
                helperText= {errors[name] ? errors[name].message : ""}
                required
                fullWidth
                variant="outlined"
                size='small'
                {...register(name, validate)}
            />
        </>
    )
}


export default Input