import PageHeader from "@/components/PageHeader";
import BookDetails from "@/components/BookDetails";

export async function getStaticProps() {
  const res = await fetch("https://openlibrary.org/works/OL453657W.json");
  const data = await res.json();
  return { props: { book: data } };
}

export default function About({ book }) {
  return (
    <>
      <PageHeader text="About the Developer - Maisha Maliha Nava" />
      <p>Hi, I am Maisha Maliha Nava, a student learning React & Next.js. </p>
      <p>Below is one of my favourite book.</p>
      <BookDetails book={book} />
    </>
  );
}
