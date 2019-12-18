import React, { Fragment, Component } from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class PaginationHelper extends Component {

    render() {
        const { users, onClickNextPage, onClickPrevPage } = this.props;

        const pageNumbers = [];
        let totalPg = users && users.totalPages;

        for (let i = 1; i <= totalPg; i++) {
            pageNumbers.push(i);
        }

        return (
            <Fragment>
                <Pagination aria-label="Page navigation example">
                    {users && users.previousPage && <PaginationItem>
                        <PaginationLink previous href="#" onClick={onClickPrevPage} />
                    </PaginationItem>}
                    {users && users.totalPages && pageNumbers && pageNumbers.map((index) => (
                        <PaginationItem key={index}>
                            <PaginationLink href="#" onClick={this.props.onClickPageLink(index)}>
                                {index}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {users && users.nextPage && <PaginationItem>
                        <PaginationLink next href="#" onClick={onClickNextPage} />
                    </PaginationItem>}
                </Pagination>
            </Fragment>
        )
    }
}

export default PaginationHelper
