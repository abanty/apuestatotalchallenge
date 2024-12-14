import Drawer from "@mui/material/Drawer"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

const MyMedals = ({ isDrawerOpen, toggleDrawer }) => {


    return (
        <Drawer
            anchor="bottom"
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
        >
            <Box
                sx={{
                    height: '50vh',
                    padding: 2,
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <h3>Información Adicional</h3>
                <p>Aquí puedes mostrar contenido relevante relacionado con la acción.</p>
                <Button variant="outlined" color="error" onClick={toggleDrawer(false)}>
                    Cerrar
                </Button>
            </Box>
        </Drawer>
    )


}

export default MyMedals