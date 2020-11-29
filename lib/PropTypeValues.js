import PropTypes from 'prop-types';

export const PostPropTypes = PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    src: PropTypes.string,
    author: PropTypes.string,
    ups: PropTypes.number,
    awards: PropTypes.arrayOf(
        PropTypes.exact({
            src: PropTypes.string,
            count: PropTypes.number,
            description: PropTypes.string
        })
    ),
    createdAt: PropTypes.string,
    permalink: PropTypes.string,
    isGallery: PropTypes.bool,
    gallery: PropTypes.arrayOf(PropTypes.string)
}).isRequired;
