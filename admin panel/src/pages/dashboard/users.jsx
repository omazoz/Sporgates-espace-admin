import { React,useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Button,
    Tooltip,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { PencilSquareIcon, UserPlusIcon, TrashIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { usersTableData } from '@/data';
import { AddUserPopup,EditUserPopup } from '@/widgets/dialogs/index';
import ExcelJS from 'exceljs';
import saveAs from "file-saver";


export const Users = () => {

    const columns = [
        { field: 'id', headerName: 'ID', flex:1, },
        { 
            field: 'picture', 
            headerName: 'Picture', width:60, 
            renderCell: (params) => 
            <Avatar src={params.value} alt={params.row.name} size="sm" className="rounded-full" />,
            sortable: false,
            filterable: false,
        },
        { field: 'name', headerName: 'Name', minWidth: 110, },
        { field: 'userName', headerName: 'User Name', minWidth: 110,},
        { field: 'email', headerName: 'Email', minWidth: 200, },
        { field: 'phoneNumber', headerName: 'Phone Number', minWidth: 150, },
        { field: 'birthday', headerName: 'Birthday', minWidth: 110, },
        { field: 'password', headerName: 'Password', minWidth: 150, },
        { field: 'sexe', headerName: 'Gender', width: 80, },
        { 
            field: 'bio', 
            headerName: 'Bio', 
            width: 200, 
            // renderCell: (params) => <Typography className= 'h-full whitespace-normal'> {params.value} </Typography>, 
        },
        { 
            field: 'online', 
            headerName: 'Online', 
            type: 'boolean',
            width: 60,
            /* renderCell: (params) => <Chip variant="gradient" color={params.value ? "green" : "blue-gray"} value={params.value ? "online" : "offline"} className="py-0.5 px-2 text-[11px] font-medium" /> */ 
        },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            sortable: false,
            filterable: false,
            renderCell: 
            (params) => <div>
                <Button onClick={() => handleClickOpenEditUser(params.row)} variant="text" size="sm" color="green">
                    <Tooltip key="edit" content="edit">
                        <PencilSquareIcon
                            strokeWidth={2}
                            className="h-5 w-5 text-inherit"
                        >
                        </PencilSquareIcon>
                    </Tooltip>
                </Button>
                <Button onClick={() => {(rowSelectionModel.length <= 1) ? handleOpenDelete() : null}} variant="text" size="sm" color="red">
                    <Tooltip key="delete" content="delete">
                        <TrashIcon
                            strokeWidth={2}
                            className="h-5 w-5 text-inherit">
                        </TrashIcon>
                    </Tooltip>
                </Button>
            </div>
        }
    ];
    const rows = usersTableData;

    const [openAddUser, setOpenAddUser] = useState(false); // Popup Add user state
    // addUser popup handlers
    const handleClickOpenAddUser = () => {
        setOpenAddUser(true);
    };
    const handleCloseAddUser = () => {
    setOpenAddUser(false);
    };

    const [openEditUser, setOpenEditUser] = useState(false); // Popup Add user state
    const [userToEdit, setUserToEdit] = useState(null); // set user id that we want to edit 
    // editUser popup handlers
    const handleClickOpenEditUser = (user) => {
        setUserToEdit(user);
        setOpenEditUser(true);
    };
    const handleCloseEditUser = () => {
        setOpenEditUser(false);
    };

    // deleteUser popup
    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = () => setOpenDelete(!openDelete);

    const [rowSelectionModel, setRowSelectionModel] = useState([]); // checkbox selection

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport
                    printOptions= {{ 
                        fileName: 'SporGates users list',
                        fields:['picture','name','userName','email','phoneNumber','birthday','sexe','bio'],
                        hideFooter: true, 
                        hideToolbar: true,
                    }}
                    csvOptions= {{ 
                        fileName: 'SporGates users list',
                        fields:['id','name','userName','email','phoneNumber','birthday','sexe','bio'],
                    }}
                />
                <Button variant='text' onClick={handleExportExcel} className="flex items-center gap-2 text-green-500 p-1">
                    <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> 
                    export excel
                </Button>
            </GridToolbarContainer>
        );
    }

    const handleExportExcel = async () => {
        // Create a new workbook instance
        const workbook = new ExcelJS.Workbook();
        // Add a worksheet to the workbook
        const worksheet = workbook.addWorksheet('Users');
        // Add columns to the worksheet
        worksheet.columns = [
        { header: 'ID', key: 'id', width: 10, style: {font: { color: { rgb: 'ffffff' } }, fill: {type: 'pattern', pattern: 'solid', fgColor: {argb: '264653'}}, alignment: { vertical: 'middle', horizontal: 'center' }, border: { top: {style:'thin'},bottm: {style:'thin'},right: {style:'thin'},left: {style:'thin'}, } } },
        { header: 'Name', key: 'name', width: 25, style: {font: { color: { rgb: 'ffffff' } }, fill: {type: 'pattern', pattern: 'solid', fgColor: {argb: '2a9d8f'}}, alignment: { vertical: 'middle', horizontal: 'center' }, border: { top: {style:'thin'},bottm: {style:'thin'},right: {style:'thin'},left: {style:'thin'}, }  } },
        { header: 'Username', key: 'userName', width: 25, style: {font: { color: { rgb: 'ffffff' } }, fill: {type: 'pattern', pattern: 'solid', fgColor: {argb: 'e9c46a'}}, alignment: { vertical: 'middle', horizontal: 'center' }, border: { top: {style:'thin'},bottm: {style:'thin'},right: {style:'thin'},left: {style:'thin'}, }  } },
        { header: 'Email', key: 'email', width: 25, style: {font: { color: { rgb: 'ffffff' } }, fill: {type: 'pattern', pattern: 'solid', fgColor: {argb: 'f4a261'}}, alignment: { vertical: 'middle', horizontal: 'center' }, border: { top: {style:'thin'},bottm: {style:'thin'},right: {style:'thin'},left: {style:'thin'}, }  } },
        { header: 'Phone Number', key: 'phoneNumber', width: 20, style: {font: { color: { rgb: 'ffffff' } }, fill: {type: 'pattern', pattern: 'solid', fgColor: {argb: 'e76f51'}}, alignment: { vertical: 'middle', horizontal: 'center' }, border: { top: {style:'thin'},bottm: {style:'thin'},right: {style:'thin'},left: {style:'thin'}, }  } },
        { header: 'Birthday', key: 'birthday', width: 15, style: {font: { color: { rgb: 'ffffff' } }, fill: {type: 'pattern', pattern: 'solid', fgColor: {argb: 'd4a373'}}, alignment: { vertical: 'middle', horizontal: 'center' }, border: { top: {style:'thin'},bottm: {style:'thin'},right: {style:'thin'},left: {style:'thin'}, }  } },
        { header: 'Picture', key: 'picture', width: 20, style: {font: { color: { rgb: 'ffffff' } }, fill: {type: 'pattern', pattern: 'solid', fgColor: {argb: 'f2cc8f'}}, alignment: { vertical: 'middle', horizontal: 'center' }, border: { top: {style:'thin'},bottm: {style:'thin'},right: {style:'thin'},left: {style:'thin'}, }  } },
        { header: 'Password', key: 'password', width: 20, style: {font: { color: { rgb: 'ffffff' } }, fill: {type: 'pattern', pattern: 'solid', fgColor: {argb: '1d3557'}}, alignment: { vertical: 'middle', horizontal: 'center' }, border: { top: {style:'thin'},bottm: {style:'thin'},right: {style:'thin'},left: {style:'thin'}, }  } },
        { header: 'Sexe', key: 'sexe', width: 15, style: {font: { color: { rgb: 'ffffff' } }, fill: {type: 'pattern', pattern: 'solid', fgColor: {argb: '06d6a0'}}, alignment: { vertical: 'middle', horizontal: 'center' }, border: { top: {style:'thin'},bottm: {style:'thin'},right: {style:'thin'},left: {style:'thin'}, }  } },
        { header: 'Bio', key: 'bio', width: 50, style: {font: { color: { rgb: 'ffffff' } }, fill: {type: 'pattern', pattern: 'solid', fgColor: {argb: '52796f'}}, alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }, border: { top: {style:'thin'},bottm: {style:'thin'},right: {style:'thin'},left: {style:'thin'}, }  } },
        { header: 'Online', key: 'online', width: 15, style: {font: { color: { rgb: 'ffffff' } }, fill: {type: 'pattern', pattern: 'solid', fgColor: {argb: 'a7c957'}}, alignment: { vertical: 'middle', horizontal: 'center' }, border: { top: {style:'thin'},bottm: {style:'thin'},right: {style:'thin'},left: {style:'thin'}, }  } },
        ];
        // Add rows to the worksheet
        rows.forEach(user => {
        worksheet.addRow({
            id: user.id,
            name: user.name,
            userName: user.userName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            birthday: user.birthday,
            picture: user.picture,
            password: user.password,
            sexe: user.sexe,
            bio: user.bio,
            online: user.online,
        });
        });
        // Save the workbook and export the xlsx file
        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, `users-list-${Date.now()}.xlsx`);
        });
    }

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="blue" className="mb-8 p-6 flex">
                    <Typography variant="h6" color="white" className="flex-1">
                        Users Table
                    </Typography>
                    <div className="flex-2 space-x-4">
                        <Tooltip key="delete" content="delete">
                            <Button onClick={handleOpenDelete} disabled={!(rowSelectionModel.length > 1)} className="bg-blue-gray-50 transition-colors hover:bg-red-200" size="md" color="white" >
                                <TrashIcon 
                                    color="red" 
                                    strokeWidth={2} 
                                    className="h-5 w-5"
                                    />
                            </Button>
                        </Tooltip>
                        <Tooltip key="add" content="add user">
                            <Button onClick={handleClickOpenAddUser} className="bg-blue-gray-50 transition-colors hover:bg-light-blue-200" variant="gradient" size="md" color="white">
                                <UserPlusIcon
                                    color="blue"
                                    strokeWidth={2}
                                    className="h-5 w-5"/>
                            </Button>
                        </Tooltip>
                    </div>
                </CardHeader>
                <CardBody className="overflow-x-scroll flex pb-0 pt-0 h-96">
                <DataGrid
                    className="w-screen h-full min-w-[640px] table-auto"
                    columns={columns}
                    rows={rows}
                    checkboxSelection
                    // manage the selected rows so the delete button could be enabled or disabled
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                        setRowSelectionModel(newRowSelectionModel);
                    }}
                    rowSelectionModel={rowSelectionModel}
                    // Pagination
                    initialState={{
                        ...rows.initialState,
                        pagination: { paginationModel: { pageSize: 5 } },// number of rows to display
                        columns: {
                            columnVisibilityModel: { // Hide columns id and password, the other columns will remain visible
                                id: false,
                                password: false,
                            },
                        },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    slots={{ toolbar: CustomToolbar }} // table toolbar (filtre,export...)
                    sx={{
                        // the style of the exported pdf file
                        '@media print': {
                            border: 0,
                            '.MuiDataGrid-main': {
                                width: 'fit-content',
                                height: 'fit-content',
                                fontSize: '9px',
                            },
                            '.MuiDataGrid-cellContent ': {
                                height: 'fit-content',
                                whiteSpace: 'normal',
                                overflow: 'visible',
                                my: 'auto',
                            },
                        },
                    }}
                />
                <AddUserPopup // addUser popup
                    openPopup = {openAddUser}
                    setOpenPopup = {setOpenAddUser}
                />
                
                { userToEdit != null ? // check if any user is selected to edit
                    <EditUserPopup // editUser popup
                        openPopup = {openEditUser}
                        setOpenPopup = {setOpenEditUser}
                        user = {userToEdit} // pass the user data to editUser popup
                    />
                    :
                    <></>
                }
                <Dialog  // deleteUsers popup
                    open={openDelete}
                    handler={handleOpenDelete}
                    animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0.9, y: -100 },
                    }}
                >
                    <DialogHeader>Delete Users</DialogHeader>
                    <DialogBody divider>
                        Are you sure you want to delete {(rowSelectionModel.length === rows.length) ? 'all' : (rowSelectionModel.length <= 1) ? 'this user' : rowSelectionModel.length + ' users' }  ?
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="gradient"
                            color="red"
                            onClick={handleOpenDelete}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button variant="gradient" color="green" onClick={handleOpenDelete}>
                            <span>Confirm</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
                </CardBody>
            </Card>
        </div>
    );
}

export default Users;