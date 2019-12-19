import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const ProjectsPaginationHelper = ({ projects, onClickNextPage, onClickPageLink, onClickPrevPage, currentPage }) => {

    const pageNumbers = [];
    let totalPg = projects && projects.totalPages;

    if ((projects && projects.data && projects.data.length !== 0) && totalPg !== 1) {
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
                <PaginationItem disabled={projects && projects.previousPage === null ? true : false}>
                    <PaginationLink previous href="#" onClick={onClickPrevPage} />
                </PaginationItem>

                {pageNumbers}

                <PaginationItem disabled={projects && projects.nextPage === null ? true : false}>
                    <PaginationLink next href="#" onClick={onClickNextPage} />
                </PaginationItem>
            </Pagination>

        </div>
    )
}

export default ProjectsPaginationHelper;
