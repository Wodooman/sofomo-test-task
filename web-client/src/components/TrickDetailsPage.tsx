import * as React from 'react';
import { Table, TableRow, TableBody, TableCell } from 'material-ui';
import { Link } from 'react-router-dom';

import * as ApiService from '../services/ApiService';
import SurfingTrick from '../models/SurfingTrick';

interface ITrickDetailsPageProps {
    match: {
        params: {
            name: string
        }
    };
}
interface ITrickDetailsPageState {
    isLoading: boolean;
    trick: SurfingTrick | null;
}

class TrickDetailsPage extends React.Component<ITrickDetailsPageProps, ITrickDetailsPageState> {
    constructor(props: ITrickDetailsPageProps) {
        super(props);
        this.state = {
            isLoading: true,
            trick: null
        };
    }

    async componentDidMount() {
        let trick = await ApiService.getTrickByName(this.props.match.params.name);
        this.setState({
            isLoading: false,
            trick: trick
          }
        );
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div>
                    Loading trick details...
             </div>
            );
        }
        return (
            <div>
                <h2>Trick details</h2>

                 <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Name:</TableCell>
                            <TableCell>{this.state.trick ? this.state.trick.name : ''}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Complexity:</TableCell>
                            <TableCell>{this.state.trick ? this.state.trick.complexity : ''}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Required speed:</TableCell>
                            <TableCell>{this.state.trick ? this.state.trick.requiredSpeed : ''}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Example 1:</TableCell>
                            <TableCell>{this.state.trick ? this.state.trick.youTubeLinkExample1 : ''}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Example 2:</TableCell>
                            <TableCell>{this.state.trick ? this.state.trick.youTubeLinkExample2 : ''}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Link to={'/'}>Back</Link>
            </div>
        );
    }
}

export default TrickDetailsPage;
