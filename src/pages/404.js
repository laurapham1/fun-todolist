import * as React from 'react';

const pageStyles = {
	color: '#232129',
	padding: '96px',
	fontFamily: '-apple-system, Roboto, sans-serif, serif',
};

const NotFoundPage = () => {
	return (
		<main style={pageStyles}>
			<p> This page doesn't exist 🤷🏻‍♀️</p>
		</main>
	);
};

export default NotFoundPage;

export const Head = () => {
	<>
		<title>Not found</title>
		<link rel='icon' type='image/x-icon' href='/images/favicon.ico' />
	</>;
};
