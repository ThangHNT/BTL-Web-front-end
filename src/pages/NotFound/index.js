import Container from '~/layouts/Container';
import Header from '~/layouts/Header';

function PageNotFound() {
    return (
        <Container>
            <Header title />
            <img
                style={{ margin: 'calc(var(--header-distance) + 20px' }}
                src="/page not found.png"
                alt="page not found"
            ></img>
        </Container>
    );
}

export default PageNotFound;
