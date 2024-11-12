import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import HTMLReactParser from 'html-react-parser'

const Pagination = ({
    from,
    to,
    last_page,
    last_page_url,
    links,
    current_page,
    next_page_url,
    prev_page_url,
    total
}) => {
    return (
        <nav className="d-flex justify-items-center justify-content-between">
            <div className="d-none flex-sm-fill d-sm-flex align-items-sm-center justify-content-sm-between">
                <p className="small text-muted">
                    Showing <span className="fw-semibold">&nbsp;{from}&nbsp;</span>
                    to <span className="fw-semibold">&nbsp;{to}&nbsp;</span>
                    of <span className="fw-semibold">&nbsp;{total}&nbsp;</span>
                    results
                </p>
                <ul className="pagination">
                    {
                        links?.map((link, index) => (
                            <li key={index} className={`page-item ${link.active ? 'active' : ''}`} aria-current="page"><span className="page-link">{HTMLReactParser(link.label)}</span></li>
                        ))
                    }
                </ul>
            </div>
        </nav>
    )
}

Pagination.propTypes = {
    to: PropTypes.node.isRequired,
    from: PropTypes.node.isRequired,
    next_page_url: PropTypes.node.isRequired,
    prev_page_url: PropTypes.node.isRequired,
    total: PropTypes.node.isRequired,
    links: PropTypes.node.isRequired,
    current_page: PropTypes.node.isRequired,
    last_page: PropTypes.node.isRequired,
};

export default Pagination