import { Button, DialogBody, DialogFooter, DialogHeader, Input, Textarea, Radio } from '@material-tailwind/react';
import { Dialog, FormControl, FormLabel, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, RadioGroup, Slide } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import  * as React from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const EditUserPopup = (props) => {

    const { user,openPopup,setOpenPopup } = props;
    const [showPassword, setShowPassword] = React.useState(false);
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Dialog
            fullScreen
            open={openPopup}
            TransitionComponent={Transition}
            keepMounted
            >
            <DialogHeader variant="gradient" color="blue">Edit user</DialogHeader>
            <DialogBody divider>
                <form>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <Input label="Name" size="lg" defaultValue={user.name} />
                        </Grid>
                        <Grid item xs={6}>
                            <Input label="Username" size="lg" defaultValue={user.userName} />
                        </Grid>
                        <Grid item xs={6}>
                            <Input label="Email" size="lg" defaultValue={user.email} />
                        </Grid>
                        <Grid item xs={6}>
                            <Input label="Phone Number" size="lg" defaultValue={user.phoneNumber} />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl className="w-full" variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    defaultValue={user.password}
                                    fullWidth={true}
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            >
                                            {showPassword ? <EyeSlashIcon strokeWidth={2} className="h-5 w-5 text-inherit" /> : <EyeIcon strokeWidth={2} className="h-5 w-5 text-inherit" />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                    name="Password"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Select Date"
                                value={dayjs(`${user.birthday}`)}
                                format="DD/MM/YYYY"
                                // onChange={(newDate) => setSelectedDate(newDate)}
                                // slotProps={{ textField: { variant: 'outlined' } }}
                            />
                        </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <Textarea label="Bio" size="lg" defaultValue={user.bio} />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl>
                                <FormLabel >Gender</FormLabel>
                                <RadioGroup row>
                                    <Radio checked={user.sexe === 'female'} id="female" name="type" label="Female" />
                                    <Radio checked={user.sexe === 'male'} id="male" name="type" label="Male" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>
            </DialogBody>
            <DialogFooter>
            <Button
                variant="outlined"
                color="red"
                onClick={() => {setOpenPopup(false)}}
                className="w-25 mr-1"
            >
                <span>Cancel</span>
            </Button>
            <Button
                variant="outlined"
                color="blue"
                onClick={() => {setOpenPopup(false)}}
                className="w-25 mr-1"
            >
                <span>Confirm</span>
            </Button>
            </DialogFooter>
        </Dialog>
    )
}

