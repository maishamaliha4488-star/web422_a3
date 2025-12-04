import { Card } from "react-bootstrap";

export default function PageHeader({ text, subtext }) {
  return (
    <>
      <Card className="bg-light">
        <Card.Body>
          <h2 className="mb-1">{text}</h2>
          {subtext && <div className="text-muted">{subtext}</div>}
        </Card.Body>
      </Card>
      <br />
    </>
  );
}
