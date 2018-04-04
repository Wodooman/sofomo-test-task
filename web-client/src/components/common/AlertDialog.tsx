import * as React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogTitle,
} from 'material-ui/Dialog';

interface IAlertDialogProps {
    isOpen: boolean;
    warningText: string | null;
}
interface IAlertDialogState {
    isOpen: boolean;
}

class AlertDialog extends React.Component<IAlertDialogProps, IAlertDialogState> {
    handleClick: any;
    constructor(props: IAlertDialogProps) {
        super(props);
        this.state = {
            isOpen: props.isOpen
        };
        this.handleClick = this.handleClickFn.bind(this);
    }

    handleClickFn() {
        this.setState({
            isOpen: false
        });
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.isOpen}
                    onClose={this.handleClick}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.props.warningText}</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClick} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AlertDialog;