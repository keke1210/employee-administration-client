import React, { Fragment } from 'react'
import { Pagination, PaginationItem, PaginationLink, Dropdown } from 'reactstrap';

const PaginationHelper = ({ users, onClickNextPage, onClickPageLink, onClickPrevPage, currentPage }) => {

    console.log(currentPage)
    const pageNumbers = [];
    let totalPg = users && users.totalPages;

    if ((users && users.data && users.data.length !== 0) && totalPg !== 1) {
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
                <PaginationItem disabled={users && users.previousPage === null ? true : false}>
                    <PaginationLink previous href="#" onClick={onClickPrevPage} />
                </PaginationItem>

                {pageNumbers}

                <PaginationItem disabled={users && users.nextPage === null ? true : false}>
                    <PaginationLink next href="#" onClick={onClickNextPage} />
                </PaginationItem>
            </Pagination>

        </div>
    )
}

export default PaginationHelper
