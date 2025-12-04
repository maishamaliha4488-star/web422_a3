/*********************************************************************************
*  WEB422 – Assignment 3
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Maisha Maliha Nava | Student ID: 162380232 | Date: 02-12-2025
*
*  Vercel App (Deployed) Link: ""
*
********************************************************************************/ 

import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Form, Button, Row, Col } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";

export default function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = (data) => {
    router.push({
      pathname: "/books",
      query: Object.fromEntries(Object.entries(data).filter(([k, v]) => v !== "")),
    });
  };

  return (
    <>
      <PageHeader text="Search Books" subtext="Search by author, title, subject, language, or year" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Author *</Form.Label>
              <Form.Control
                {...register("author", { required: true })}
                placeholder="Author name"
                className={errors.author ? "is-invalid" : ""}
              />
              {errors.author && <div className="invalid-feedback">Author is required.</div>}
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control {...register("title")} placeholder="Title" />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control {...register("subject")} placeholder="Subject" />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Language</Form.Label>
              <Form.Control {...register("language")} placeholder="eng" />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>First published year</Form.Label>
              <Form.Control {...register("first_publish_year")} placeholder="e.g., 1995" />
            </Form.Group>
          </Col>

          <Col md={6} className="d-flex align-items-end justify-content-end">
            <Button type="submit">Search</Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
