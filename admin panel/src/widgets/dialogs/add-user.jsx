import { Button,DialogBody, DialogFooter, DialogHeader, Input, Textarea, Radio } from '@material-tailwind/react';
import { Button as MuiButton, IconButton, Dialog, FormControl, FormLabel, Grid, InputAdornment, InputLabel, OutlinedInput, RadioGroup, Slide } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import  * as React from 'react';
import { CameraIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const AddUserPopup = (props) => {

    const { openPopup,setOpenPopup } = props;
    const [ selectedDate,setSelectedDate ] = React.useState();
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
            <DialogHeader variant="gradient" color="blue">Add user</DialogHeader>
            <DialogBody divider>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <Input label="Name" size="lg" />
                    </Grid>
                    <Grid item xs={6}>
                        <Input label="Username" size="lg" />
                    </Grid>
                    <Grid item xs={6}>
                        <Input label="Email" size="lg" />
                    </Grid>
                    <Grid item xs={6}>
                        <Input label="Phone Number" size="lg" />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl className="w-full" variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                
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
                            value={selectedDate}
                            onChange={(newDate) => setSelectedDate(newDate)}
                            // slotProps={{ textField: { variant: 'outlined' } }}
                        />
                    </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6}>
                        <Textarea label="Bio" size="lg"/>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container direction="row" columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                            <Grid item xs={4}>
                                <FormControl >
                                    <FormLabel >Gender</FormLabel>
                                    <RadioGroup row>
                                        <Radio id="female" name="type" label="Female" />
                                        <Radio id="male" name="type" label="Male" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl >
                                    <FormLabel className="mb-3" >Profile picture</FormLabel>
                                    <MuiButton variant="outlined" component="label" className="flex items-center gap-2">
                                        <input hidden accept="image/*" multiple type="file" />
                                        <CameraIcon strokeWidth={2} className="w-5 h-5 text-inherit" />
                                        Upload
                                    </MuiButton>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
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

export default AddUserPopup;
