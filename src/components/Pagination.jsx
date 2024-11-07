import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

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
            <div className="d-flex justify-content-between flex-fill d-sm-none">
                <ul className="pagination">
                    <li className="page-item disabled" aria-disabled="true">
                        <span className="page-link">‹</span>
                    </li>
                    <li className="page-item">
                        <Link className="page-link" to="/dashboard/deposit/history?page=2" rel="next">›</Link>
                    </li>
                </ul>
            </div>
            <div className="d-none flex-sm-fill d-sm-flex align-items-sm-center justify-content-sm-between">
                <div>
                    <p className="small text-muted">
                        Showing <span className="fw-semibold">&nbsp;{from}&nbsp;</span>
                        to <span className="fw-semibold">&nbsp;{to}&nbsp;</span>
                        of <span className="fw-semibold">&nbsp;{total}&nbsp;</span>
                        results
                    </p>
                </div>
                <div>
                    <ul className="pagination">
                        <li className="page-item disabled" aria-disabled="true" aria-label="‹">
                            <span className="page-link" aria-hidden="true">&lsaquo;</span>
                        </li>
                        {
                            links.map((link, index) => (
                                <li key={index} className={`page-item ${link.active ? 'active' : ''}`} aria-current="page"><span className="page-link">{link.label}</span></li>
                            ))
                        }
                        <li className="page-item">
                            <Link className="page-link" to="/dashboard/deposit/history?page=2" rel="next" aria-label="›">&rsaquo;</Link>
                        </li>
                    </ul>
                </div>
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