import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import PageHeader from "@/components/PageHeader";
import { Row, Col } from "react-bootstrap";
import BookCard from "@/components/BookCard";

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  if (!favouritesList || favouritesList.length === 0) {
    return (
      <>
        <PageHeader text="Nothing Here" subtext="Add a book" />
      </>
    );
  }

  console.log(favouritesList);

  return (
    <>
      <PageHeader text="Favourites" subtext="Your favourite books" />
      <Row className="gy-4">
        {favouritesList.map((workId) => (
          <Col lg={3} md={6} key={workId}>
            <BookCard workId={workId} />
          </Col>
        ))}
      </Row>
    </>
  );
}
