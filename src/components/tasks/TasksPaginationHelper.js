import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const TasksPaginationHelper = ({ tasks, onClickNextPage, onClickPageLink, onClickPrevPage, currentPage }) => {

    const pageNumbers = [];
    let totalPg = tasks && tasks.totalPages;

    if ((tasks && tasks.data && tasks.data.length !== 0) && totalPg !== 1) {
        for (let i = 1; i <= totalPg; i++) {

            pageNumbers.push(<PaginationItem key={i} active={i === currentPage ? true : false}>
                <PaginationLink href="#" onClick={onClickPageLink(i)}>
                    {i}
                </PaginationLink>
            </PaginationItem>);

        }
    }

    return (
        <div style={{ float: "right" }}>
            <Pagination aria-label="Page navigation example">
                <PaginationItem disabled={tasks && tasks.previousPage === null ? true : false}>
                    <PaginationLink previous href="#" onClick={onClickPrevPage} />
                </PaginationItem>

                {pageNumbers}

                <PaginationItem disabled={tasks && tasks.nextPage === null ? true : false}>
                    <PaginationLink next href="#" onClick={onClickNextPage} />
                </PaginationItem>
            </Pagination>

        </div>
    )
}

export default TasksPaginationHelper;
