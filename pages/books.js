import useSWR from "swr";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Table, Pagination } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";

export default function Books() {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const router = useRouter();

  // Build query string from router.query
  const queryString = typeof window === "undefined"
    ? "" : new URLSearchParams(router.query).toString();

  const { data, error } = useSWR(
    queryString ? `https://openlibrary.org/search.json?${queryString}&page=${page}&limit=10` : null
  );

  useEffect(() => {
    if (data) setPageData(data.docs || []);
  }, [data]);

  function previous() { if (page > 1) setPage(page - 1); }
  function next() { setPage(page + 1); }

  // Build subtext to show query parameters
  const subtext = Object.keys(router.query).length
    ? Object.entries(router.query).map(([k, v]) => `${k}: ${v}`).join(" • ")
    : "No search parameters";

  return (
    <>
      <PageHeader text="Search Results" subtext={subtext} />
      <Table striped hover>
        <thead>
          <tr><th>Title</th><th>First Published</th></tr>
        </thead>
        <tbody>
          {pageData?.map((book, i) => (
            <tr key={i} onClick={() => router.push(`${book.key}`)}>
              <td>{book.title}</td>
              <td>{book.first_publish_year || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev onClick={previous} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={next} />
      </Pagination>
    </>
  );
}
