import React, { Component, Fragment } from 'react';
import { Table, Col, Spinner, Row, Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { history } from '../../_helpers'

import { connect } from 'react-redux';
import { taskActions } from '../../actions';
import AddTaskModal from './AddTaskModal'
import EditTaskModal from './EditTaskModal';
import CompleteTaskComponent from './CompleteTaskComponent';
import TasksPaginationHelper from './TasksPaginationHelper';

export class TaskList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: '',
            pageSize: 5,
            baseUrl: 'https://localhost:44339/api/v1/tasks/getall?',
            currentPage: 1
        }

        this.onClickPageLink = this.onClickPageLink.bind(this);
    }

    componentDidMount() {
        this.props.getTasks();
    }

    handleDeleteTask(id) {
        return (e) => this.props.deleteTask(id)
    }


    onClickNextPage = (uri, next) => {
        return (e) => {
            this.setState({
                currentPage: next === true ? this.state.currentPage + 1 : this.state.currentPage - 1
            });
            this.props.getPrevNextTasks(`${uri}&searchText=${this.state.searchText}`);
        }
    }

    onClickPageLink = (pageNumber) => {
        return (e) => {
            this.setState({
                currentPage: pageNumber
            });

            this.props.getPrevNextTasks(`${this.state.baseUrl}pageNumber=${pageNumber}&pageSize=${this.state.pageSize}&searchText=${this.state.searchText}`);
        }
    }

    onChangeSearchText = (event) => {
        this.setState({
            searchText: [event.target.value],
        });

        this.props.getPrevNextTasks(`${this.state.baseUrl}searchText=${event.target.value}&pageSize=${this.state.pageSize}`);
    }

    onChangeDropDown = (event) => {
        this.setState({
            pageSize: [event.target.value],
        });
        this.props.getPrevNextTasks(`${this.state.baseUrl}pageSize=${event.target.value}&pageNumber=${this.state.currentPage}&searchText=${this.state.searchText}`);
    }

    onDoubleClick = (id) => {
        return (e) => history.push(`/tasks/${id}`);
    }

    render() {
        const { tasks, isAdmin } = this.props;
        console.log(tasks)
        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col>
                            <h2>Tasks</h2>
                            <AddTaskModal />
                        </Col>
                        <Col>
                            <Input
                                className="col-md-6"
                                style={{ float: "right", marginTop: "4rem" }}
                                type="text" name="searchText"
                                onChange={this.onChangeSearchText}
                                placeholder="Search"
                            />
                        </Col>
                    </Row>
                </Container>

                <Table className="table table-striped" responsive hover striped>
                    <thead>
                        <tr>
                            <th>#No.</th>
                            {/* <th>Id</th> */}
                            <th>Task Name</th>
                            <th>Description</th>
                            <th>Completed</th>
                            {/* <th>Complete task</th> */}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks && tasks.items && tasks.items.data
                            && tasks.items.data.map((task, index) =>
                                (
                                    <tr key={task.id} onDoubleClick={this.onDoubleClick(task.id)}>
                                        <td>{((this.state.currentPage - 1) * this.state.pageSize) + index + 1}</td>
                                        {/* <td>{task.id}</td> */}
                                        <td>{task.taskName}</td>
                                        <td>{task.description}</td>
                                        {/* <td>{task.completed ? 'Yes' : 'No'}</td> */}
                                        <td><CompleteTaskComponent task={task} /> </td>
                                        <td className="tightcell">
                                            {' '}
                                            <EditTaskModal task={task} /> &nbsp;
                                        <Button className="btn btn-danger btn-sm" onClick={this.handleDeleteTask(task.id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}

                    </tbody>

                </Table>
                {tasks.loading && <Spinner type="grow" color="dark" />}
                <TasksPaginationHelper tasks={tasks && tasks.items}
                    onClickNextPage={this.onClickNextPage(tasks && tasks.items && tasks.items.nextPage, true)}
                    onClickPrevPage={this.onClickNextPage(tasks && tasks.items && tasks.items.previousPage, false)}
                    onClickPageLink={this.onClickPageLink}
                    currentPage={this.state.currentPage}
                />
                <select className="custom-select col-md-3" name="pageSize" onChange={this.onChangeDropDown}>
                    <option value="5">Page Size</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </Fragment>
        )
    }
}



const mapStateToProps = state => ({
    tasks: state.tasks,
    task: state.task,
    isAdmin: state.authentication.user.isAdmin
});

const actionCreators = {
    getTasks: taskActions.getAll,
    deleteTask: taskActions.delete,
    getPrevNextTasks: taskActions.getPrevNextTasks

}

export default connect(mapStateToProps, actionCreators)(TaskList)
