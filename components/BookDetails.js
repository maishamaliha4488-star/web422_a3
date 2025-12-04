import { Container, Row, Col, Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";
import { useState, useEffect } from "react";

export default function BookDetails({ book, workId, showFavouriteBtn = true }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);
  console.log(workId)
  useEffect(() => {
    if (workId) {
      setShowAdded(favouritesList?.includes(workId));
    }
  }, [favouritesList]);

  async function favouritesClicked() {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(workId));
    } else {
      setFavouritesList(await addToFavourites(workId));
    }
  }

  return (
    <Container>
      <Row>
        <Col lg="4">
          <img
            className="img-fluid w-100"
            src={`https://covers.openlibrary.org/b/id/${book?.covers?.[0]}-L.jpg`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/400x600?text=No+Cover";
            }}
            alt="Cover Image"
          />
          <br />
          <br />
        </Col>
        <Col lg="8">
          <h3>{book.title}</h3>

          {book.description && (
            <p>
              {typeof book.description === "string"
                ? book.description
                : book.description.value}
            </p>
          )}

          <br />

          {book.subject_people && (
            <>
              <h5>Characters</h5>
              <p>{book.subject_people.join(", ")}</p>
              <br />
            </>
          )}

          {book.subject_places && (
            <>
              <h5>Settings</h5>
              <p>{book.subject_places.join(", ")}</p>
              <br />
            </>
          )}

          {book.links && (
            <>
              <h5>More Information</h5>
              {book.links.map((link, i) => (
                <span key={i}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.title}
                  </a>
                  <br />
                </span>
              ))}
            </>
          )}

          {showFavouriteBtn && workId && (
            <div className="mt-3">
              <Button
                variant={showAdded ? "primary" : "outline-primary"}
                onClick={favouritesClicked}
              >
                {showAdded ? "+ Favourite (added)" : "+ Favourite"}
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
