import { Container, Row, Col, Image } from 'react-bootstrap';
import { PageIDs } from '@/utilities/ids';

export default function Home() {
  return (
    <main>
      <div id={PageIDs.landingPage}>
        <div className="landing-hero">
          <Container className="text-center landing-hero">
            <h1
              style={{ fontSize: '36pt', textShadow: '2px 2px 10px var(--navbar-text-color)' }}
            >
              find your perfect spot!
            </h1>
          </Container>
        </div>
        <div>
          <Container
            className="landing-white-background justify-content-center text-center"
            style={{ backgroundColor: 'white' }}
          >
            <h2>
              trending spots
            </h2>
            <Row md={1} lg={2}>
              <Col xs={6}>
                <Image src="/images/home-page.png" width={500} alt="homepage" />
              </Col>
              <Col xs={6}>
                <Image
                  src="/images/profiles-page.png"
                  width={500}
                  alt="profile"
                />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </main>
  );
}
