import * as React from 'react';
import { Table, TableRow, TableBody, TableHead, TableCell } from 'material-ui';
import { Link } from 'react-router-dom';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

import * as ApiService from '../services/ApiService';
import SurfingTrick from '../models/SurfingTrick';
import AlertDialog from './common/AlertDialog';

interface ITrickListPageProps {
}
interface ITrickListPageState {
    isLoading: boolean;
    tricks: Array<SurfingTrick>;
    filter: string;
    showErrorDialog: boolean;
    errorMessage: string | null;
}

class TrickListPage extends React.Component<ITrickListPageProps, ITrickListPageState> {
    handleFilter: any;
    constructor(props: ITrickListPageProps) {
        super(props);
        this.state = {
            isLoading: true,
            tricks: [],
            filter: 'All',
            errorMessage: null,
            showErrorDialog: false
        };
        this.handleFilter = this.handleFilterChange.bind(this);
    }

    async componentDidMount() {
        await this.getTricks();
    }

    async getTricks(complexity?: string) {
        try {
            let tricks = await ApiService.getAllTricks(complexity);
            this.setState(Object.assign({}, this.state, {
                isLoading: false,
                tricks: tricks
            }));
        } catch (err) { 
            this.setState(Object.assign({}, this.state, {
                showErrorDialog: true,
                errorMessage: err.message,
                isLoading: false
              }));
        }
    }

    async handleFilterChange(event: any) {
        this.setState(Object.assign({}, this.state, {
            isLoading: true,
            filter: event.target.value,
            tricks: []
          }));
        await this.getTricks(event.target.value);
    }

    render() {
        const tableSettings = {
            fixedHeader: true,
            fixedFooter: true,
            selectable: true,
            multiSelectable: false
        };

        const tableBodySettings = {
            displayRowCheckbox: false,
            deselectOnClickaway: true,
            showRowHover: true,
            stripedRows: true
        };
        
        if (this.state.isLoading) {
            return (
                <div>
                    Loading tricks...
             </div>
            );
        }
        return (
            <div>
                <h2>Trick list</h2>
                <Select
                    value={this.state.filter}
                    onChange={this.handleFilter}
                >
                    <MenuItem value={'All'}>All</MenuItem>
                    <MenuItem value={'Complex'}>Complex</MenuItem>
                    <MenuItem value={'Medium'}>Medium</MenuItem>
                    <MenuItem value={'Easy'}>Easy</MenuItem>
                </Select>
                <Table {...tableSettings}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Complexity</TableCell>
                            <TableCell>
                                Required Speed</TableCell>
                            <TableCell>Example 1</TableCell>
                            <TableCell>Example 2</TableCell>
                            <TableCell >Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody {...tableBodySettings}>
                        {this.state.tricks.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.complexity}</TableCell>
                                <TableCell>{row.requiredSpeed}</TableCell>
                                <TableCell><a href={row.youTubeLinkExample1} target="_blank">
                                    {row.youTubeLinkExample1}</a></TableCell>
                                <TableCell><a href={row.youTubeLinkExample2} target="_blank">
                                    {row.youTubeLinkExample2}</a></TableCell>
                                <TableCell>
                                    <Link to={`/tricks/view/${row.name}`}>
                                        View Details
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <AlertDialog isOpen={this.state.showErrorDialog} warningText={this.state.errorMessage} />
            </div>
        );
    }
}

export default TrickListPage;
