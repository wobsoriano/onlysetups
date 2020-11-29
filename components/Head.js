import NextHead from 'next/head';
import PropTypes from 'prop-types';

export default function Head({ title, description }) {
    return (
        <NextHead>
            <title>{title}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="description" content={description} />
            <meta property="og:title" content={title} key="title" />
            <meta property="og:description" content={description} />
            <meta property="og:image" content="https://og-image.vercel.app/OnlySetups.png" />
        </NextHead>
    );
}

Head.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};
