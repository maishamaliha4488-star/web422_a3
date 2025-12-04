import useSWR from "swr";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import Error from "next/error";

export default function BookCard({ workId }) {
  const { data, error } = useSWR(`https://openlibrary.org/works/${workId}.json`);

  if (error) return <Error statusCode={404} />;
  if (!data) return <div>Loading...</div>;

  const coverUrl = `https://covers.openlibrary.org/b/id/${data?.covers?.[0]}-M.jpg`;

  return (
    <Card>
      <Card.Img
        variant="top"
        src={coverUrl}
        className="img-fluid"
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x450?text=No+Cover"; }}
        alt="Cover"
      />
      <Card.Body>
        <Card.Title>{data.title || ""}</Card.Title>
        <Card.Text>{data.first_published_date || data.first_publish_year || "N/A"}</Card.Text>
          <Button as={Link} href={`/works/${workId}`} variant="primary">View Book</Button>
      </Card.Body>
    </Card>
  );
}
