import React, { Fragment } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';



const PaginationFooter = ({ items, ...rest }) => {

    const testFunc = () => {
        let pageLinks = [];
        for (let index = 0; index < items.totalPages; index++) {
            pageLinks.push(<PaginationItem key={index}>
                <PaginationLink href="#">
                    {index + 1}
                </PaginationLink>
            </PaginationItem>);
        }
        return pageLinks
    }


    console.log(items.totalPages)
    return (
        <Fragment>
            <Pagination aria-label="Page navigation example">
                <PaginationItem>
                    <PaginationLink previous href="#" />
                </PaginationItem>
                <PaginationLink href="#">
                    1
                </PaginationLink>
                <PaginationItem>
                    <PaginationLink next href="#" />
                </PaginationItem>
            </Pagination>
        </Fragment>
    );
}

export default PaginationFooter;