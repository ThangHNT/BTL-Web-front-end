import Header from '~/layouts/Header';
import Container from '~/layouts/Container';
function Logined() {
    return (
        <Container>
            <Header currentUser={true} search={true}></Header>
            <h2>trang home user</h2>
        </Container>
    );
}

export default Logined;
