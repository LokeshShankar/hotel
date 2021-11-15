import React from 'react'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../../css/paginationandreport/PaginationStyle.css'
    
class Pagination extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
            offset: 0,
            orgtableData: [],
            perPage: 10,
            currentPage: 0
        }

        this.handlePageClick = this.handlePageClick.bind(this);
    }

    handlePageClick = (e) => {
        // console.log('page change');
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        });
    };

    componentDidUpdate(prevProps){
        // console.log('component did update')
        if(prevProps !== this.props)
            this.getData();
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        // console.log('in get data')
        var data = this.props.data;

        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            orgtableData: this.props.data
        })
    }

    render() {
        // console.log('in render')
        // console.log(this.state)
        return (
            <div className="table">
                {React.cloneElement(this.props.children, {results: this.state.orgtableData.slice(this.state.offset, this.state.offset + this.state.perPage)})}
                <div className="paginationcenter">
                 <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    initialPage={0}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
                </div>
            </div>
        )
    }
}

export default Pagination