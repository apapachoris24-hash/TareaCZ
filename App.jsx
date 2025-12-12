import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,capital,currencies,languages,population"
    )
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Paises del Mundo </h1>

      <Row>
        {countries.map((country, index) => (
          <Col key={index} md={4} lg={3} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={country.flags?.png}
                alt={country.name?.common}
              />
              <Card.Body>
                <Card.Title>{country.name?.common}</Card.Title>

                <p><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>

                <p>
                  <strong>Población:</strong> {country.population?.toLocaleString()}
                </p>

                <p>
                  <strong>Idiomas:</strong>{" "}
                  {country.languages
                    ? Object.values(country.languages).join(", ")
                    : "N/A"}
                </p>

                <p>
                  <strong>Monedas:</strong>{" "}
                  {country.currencies
                    ? Object.values(country.currencies)
                        .map((c) => c.name)
                        .join(", ")
                    : "N/A"}
                </p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;

