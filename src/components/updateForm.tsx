import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextareaAutosize } from '@mui/material';

const boxStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    padding: "0 20px 15px",
    color: "black",
};

const closeButton = {
    "&:hover": {
        backgroundColor: "#fd5361",
    },
    color: "#fff",
    minWidth: 50,
    minHeight: 50
}

const headerStyle = {   
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    background: "#213547",
    color: "#fff",
    margin: "0 -20px",
    padding: "0 20px"
}

export default function ModalForm(props: any) {
    let formInfo = props.formInfo
    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyle}>
                    <header style={headerStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {formInfo?.header}
                        </Typography>
                        <Button sx={closeButton} onClick={props.onClose}>
                            <i className="close-btn fa-solid fa-xmark"></i>
                        </Button>
                    </header>
                    <div>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {formInfo?.order}
                        </Typography>
                        <div>
                            <Typography sx={{ mt: 2 }}>
                                Title
                            </Typography>
                            <TextareaAutosize className="title-input" style={{ width: "100%" }} minRows={3} defaultValue={formInfo?.titleValue} />
                        </div>
                        <div>
                            <Typography sx={{ mt: 2 }}>
                                Content
                            </Typography>
                            <TextareaAutosize className="content-input" style={{ width: "100%" }} minRows={3} defaultValue={formInfo?.contentValue} />
                        </div>
                    </div>
                    <footer style={{ display: "flex", justifyContent: "end", marginTop: "5px" }}>
                        <Button onClick={props.onUpdate} variant="contained">{formInfo?.btnText}</Button>
                    </footer>
                </Box>
            </Modal>
        </div>
    );
}